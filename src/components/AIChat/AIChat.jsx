import React, { useEffect, useRef, useState } from 'react'

const WELCOME_MESSAGE = {
    role: 'assistant',
    content:
        "Hi! I'm the IMRI AI assistant. Ask me about our Qualitative, Quantitative, Social, Analytics, Business or Traffic Research services — or how to get a quote.",
}

export default function AIChat() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState([WELCOME_MESSAGE])
    const [input, setInput] = useState('')
    const [isSending, setIsSending] = useState(false)
    const [error, setError] = useState(null)
    const scrollRef = useRef(null)

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messages, isOpen])

    const sendMessage = async (e) => {
        e.preventDefault()
        const text = input.trim()
        if (!text || isSending) return

        const nextMessages = [...messages, { role: 'user', content: text }]
        setMessages(nextMessages)
        setInput('')
        setIsSending(true)
        setError(null)

        try {
            const res = await fetch('/api/ai', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({
                    mode: 'chat',
                    messages: nextMessages.map(({ role, content }) => ({ role, content })),
                }),
            })

            if (!res.ok) throw new Error('Request failed')
            const data = await res.json()
            setMessages((prev) => [...prev, { role: 'assistant', content: data.result }])
        } catch {
            setError('Sorry, something went wrong reaching the AI assistant. Please try again.')
        } finally {
            setIsSending(false)
        }
    }

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {isOpen && (
                <div className="mb-4 w-[22rem] max-w-[calc(100vw-3rem)] h-[28rem] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
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
                                <div
                                    className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm whitespace-pre-wrap leading-relaxed ${m.role === 'user'
                                        ? 'bg-blue-600 text-white rounded-br-sm'
                                        : 'bg-white text-gray-800 border border-gray-200 rounded-bl-sm'
                                        }`}
                                >
                                    {m.content}
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

                    {/* Input */}
                    <form onSubmit={sendMessage} className="border-t border-gray-200 p-3 flex items-center gap-2 bg-white">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your question…"
                            className="flex-1 px-4 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="submit"
                            disabled={isSending || !input.trim()}
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300 transition-colors"
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
