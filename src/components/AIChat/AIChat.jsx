import React, { useEffect, useRef, useState } from 'react'
import {
    ACCEPT_ATTR,
    MAX_FILES_PER_MESSAGE,
    MAX_TOTAL_SIZE_BYTES,
    formatBytes,
    validateFile,
} from '../../lib/attachments'

const WELCOME_MESSAGE = {
    role: 'assistant',
    content:
        "Hi! I'm the IMRI AI assistant. Ask me about our Qualitative, Quantitative, Social, Analytics, Business or Traffic Research services — or attach a document or image (PDF, DOCX, TXT, CSV, JPG, PNG, WEBP) and ask me about it.",
}

function makeId() {
    return typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result)
        reader.onerror = () => reject(reader.error)
        reader.readAsDataURL(file)
    })
}

function DocumentIcon({ className }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
    )
}

function AttachmentChip({ attachment, onRemove }) {
    const { name, kind, dataUrl, size } = attachment
    return (
        <div className="relative flex items-center gap-2 bg-gray-100 border border-gray-200 rounded-lg pl-1 pr-2 py-1 max-w-[10rem]">
            {kind === 'image' ? (
                <img src={dataUrl} alt={name} className="w-8 h-8 rounded object-cover flex-shrink-0" />
            ) : (
                <div className="w-8 h-8 rounded bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                    <DocumentIcon className="w-4 h-4" />
                </div>
            )}
            <div className="min-w-0">
                <p className="text-xs font-medium text-gray-700 truncate" title={name}>{name}</p>
                {size != null && <p className="text-[10px] text-gray-400">{formatBytes(size)}</p>}
            </div>
            {onRemove && (
                <button
                    type="button"
                    onClick={onRemove}
                    aria-label={`Remove ${name}`}
                    className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-gray-600 text-white flex items-center justify-center hover:bg-red-600"
                >
                    <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            )}
        </div>
    )
}

export default function AIChat() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState([WELCOME_MESSAGE])
    const [input, setInput] = useState('')
    const [isSending, setIsSending] = useState(false)
    const [error, setError] = useState(null)
    const [pendingAttachments, setPendingAttachments] = useState([])
    const [attachError, setAttachError] = useState(null)
    const scrollRef = useRef(null)
    const fileInputRef = useRef(null)
    const attachErrorTimer = useRef(null)

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messages, isOpen, pendingAttachments])

    useEffect(() => () => clearTimeout(attachErrorTimer.current), [])

    const showAttachError = (msg) => {
        setAttachError(msg)
        clearTimeout(attachErrorTimer.current)
        attachErrorTimer.current = setTimeout(() => setAttachError(null), 5000)
    }

    const handleFilesSelected = async (e) => {
        const files = Array.from(e.target.files || [])
        e.target.value = ''
        if (files.length === 0) return

        let nextAttachments = pendingAttachments
        for (const file of files) {
            if (nextAttachments.length >= MAX_FILES_PER_MESSAGE) {
                showAttachError(`You can attach up to ${MAX_FILES_PER_MESSAGE} files per message.`)
                break
            }
            const validation = validateFile(file)
            if (!validation.ok) {
                showAttachError(validation.error)
                continue
            }
            const currentTotal = nextAttachments.reduce((sum, a) => sum + a.size, 0)
            if (currentTotal + file.size > MAX_TOTAL_SIZE_BYTES) {
                showAttachError(`Attachments are too large overall (max ${formatBytes(MAX_TOTAL_SIZE_BYTES)} combined per message).`)
                continue
            }
            try {
                const dataUrl = await readFileAsDataURL(file)
                nextAttachments = [
                    ...nextAttachments,
                    {
                        id: makeId(),
                        name: file.name,
                        mediaType: validation.type.mediaType,
                        kind: validation.type.kind,
                        size: file.size,
                        dataUrl,
                    },
                ]
            } catch {
                showAttachError(`"${file.name}" could not be read.`)
            }
        }
        setPendingAttachments(nextAttachments)
    }

    const removePendingAttachment = (id) => {
        setPendingAttachments((prev) => prev.filter((a) => a.id !== id))
    }

    const sendMessage = async (e) => {
        e.preventDefault()
        const text = input.trim()
        if ((!text && pendingAttachments.length === 0) || isSending) return

        const userMessage = {
            role: 'user',
            content: text,
            ...(pendingAttachments.length > 0 ? { attachments: pendingAttachments } : {}),
        }
        const nextMessages = [...messages, userMessage]
        setMessages(nextMessages)
        setInput('')
        setPendingAttachments([])
        setIsSending(true)
        setError(null)

        try {
            // Only the newest message's attachments are uploaded — earlier
            // turns are resent as plain text so payload size stays small.
            const lastIndex = nextMessages.length - 1
            const payloadMessages = nextMessages.map((m, i) => {
                const base = { role: m.role, content: m.content }
                if (i === lastIndex && m.attachments) {
                    base.attachments = m.attachments.map(({ name, mediaType, dataUrl }) => ({
                        name,
                        mediaType,
                        data: dataUrl.slice(dataUrl.indexOf(',') + 1),
                    }))
                }
                return base
            })

            const res = await fetch('/api/ai', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ mode: 'chat', messages: payloadMessages }),
            })

            const data = await res.json().catch(() => null)
            if (!res.ok) throw new Error((data && data.error) || 'Request failed')
            setMessages((prev) => [...prev, { role: 'assistant', content: data.result }])
        } catch (err) {
            const message = err instanceof Error ? err.message : ''
            setError(
                message && message !== 'Request failed'
                    ? message
                    : 'Sorry, something went wrong reaching the AI assistant. Please try again.'
            )
        } finally {
            setIsSending(false)
        }
    }

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {isOpen && (
                <div className="mb-4 w-[22rem] max-w-[calc(100vw-3rem)] h-[30rem] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-5 py-4 flex items-center justify-between">
                        <div>
                            <p className="font-bold text-sm">IMRI AI Assistant</p>
                            <p className="text-xs text-blue-100">Ask about our research services</p>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            aria-label="Close chat"
                            className="text-white/80 hover:text-white"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Messages */}
                    <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gray-50">
                        {messages.map((m, i) => (
                            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] ${m.role === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-1.5`}>
                                    {m.attachments && m.attachments.length > 0 && (
                                        <div className="flex flex-wrap gap-1.5 justify-end">
                                            {m.attachments.map((a) => (
                                                <AttachmentChip key={a.id} attachment={a} />
                                            ))}
                                        </div>
                                    )}
                                    {m.content && (
                                        <div
                                            className={`px-4 py-2 rounded-2xl text-sm whitespace-pre-wrap leading-relaxed ${m.role === 'user'
                                                ? 'bg-blue-600 text-white rounded-br-sm'
                                                : 'bg-white text-gray-800 border border-gray-200 rounded-bl-sm'
                                                }`}
                                        >
                                            {m.content}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                        {isSending && (
                            <div className="flex justify-start">
                                <div className="bg-white text-gray-500 border border-gray-200 rounded-2xl rounded-bl-sm px-4 py-2 text-sm">
                                    Thinking…
                                </div>
                            </div>
                        )}
                        {error && <p className="text-xs text-red-600 text-center">{error}</p>}
                    </div>

                    {/* Pending attachments preview */}
                    {(pendingAttachments.length > 0 || attachError) && (
                        <div className="border-t border-gray-200 bg-white px-3 pt-3 pb-1">
                            {pendingAttachments.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {pendingAttachments.map((a) => (
                                        <AttachmentChip key={a.id} attachment={a} onRemove={() => removePendingAttachment(a.id)} />
                                    ))}
                                </div>
                            )}
                            {attachError && <p className="text-xs text-red-600 mb-2">{attachError}</p>}
                        </div>
                    )}

                    {/* Input */}
                    <form
                        onSubmit={sendMessage}
                        className={`${pendingAttachments.length > 0 || attachError ? '' : 'border-t border-gray-200'} p-3 flex items-center gap-2 bg-white`}
                    >
                        <input
                            ref={fileInputRef}
                            type="file"
                            multiple
                            accept={ACCEPT_ATTR}
                            onChange={handleFilesSelected}
                            hidden
                        />
                        <button
                            type="button"
                            onClick={() => fileInputRef.current && fileInputRef.current.click()}
                            aria-label="Attach files"
                            title="Attach files (PDF, DOCX, TXT, CSV, JPG, PNG, WEBP)"
                            className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21.44 11.05l-9.19 9.19a5 5 0 01-7.07-7.07l9.19-9.19a3.5 3.5 0 014.95 4.95l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
                            </svg>
                        </button>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your question…"
                            className="flex-1 px-4 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="submit"
                            disabled={isSending || (!input.trim() && pendingAttachments.length === 0)}
                            className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300 transition-colors"
                            aria-label="Send message"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                        </button>
                    </form>
                </div>
            )}

            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center"
                aria-label="Open AI chat assistant"
            >
                {isOpen ? (
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                )}
            </button>
        </div>
    )
}
