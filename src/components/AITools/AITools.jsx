import React, { useState } from 'react'

function ResultCard({ title, text }) {
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch {
            // clipboard not available; ignore
        }
    }

    return (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 mt-8">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">{title}</h3>
                <button
                    onClick={handleCopy}
                    className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                >
                    {copied ? 'Copied!' : 'Copy'}
                </button>
            </div>
            <pre className="whitespace-pre-wrap font-sans text-sm md:text-base text-gray-700 leading-relaxed">
                {text}
            </pre>
        </div>
    )
}

function BriefGenerator() {
    const [form, setForm] = useState({ business: '', industry: '', targetAudience: '', objective: '' })
    const [result, setResult] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)
        setResult(null)
        try {
            const res = await fetch('/api/ai', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ mode: 'brief', ...form }),
            })
            if (!res.ok) throw new Error('Request failed')
            const data = await res.json()
            setResult(data.result)
        } catch {
            setError('Could not generate a brief right now. Please try again in a moment.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-bold text-gray-800 mb-2">Business / Product name</label>
                    <input
                        name="business"
                        value={form.business}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Acme Foods"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-600 transition-all"
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-800 mb-2">Industry</label>
                    <input
                        name="industry"
                        value={form.industry}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Packaged foods & beverages"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-600 transition-all"
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-800 mb-2">Target audience</label>
                    <input
                        name="targetAudience"
                        value={form.targetAudience}
                        onChange={handleChange}
                        placeholder="e.g. Urban millennials, household decision-makers"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-600 transition-all"
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-800 mb-2">Research objective</label>
                    <input
                        name="objective"
                        value={form.objective}
                        onChange={handleChange}
                        placeholder="e.g. Evaluate demand before a new product launch"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-600 transition-all"
                    />
                </div>
                <div className="md:col-span-2 text-center pt-2">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="inline-flex items-center px-10 py-4 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 disabled:bg-gray-400 transition-colors shadow-lg"
                    >
                        {isLoading ? 'Generating…' : 'Generate Research Brief'}
                    </button>
                </div>
            </form>
            {error && <p className="text-red-600 text-center mt-6">{error}</p>}
            {result && <ResultCard title="Your AI-Generated Research Brief" text={result} />}
        </div>
    )
}

function SurveyGenerator() {
    const [form, setForm] = useState({ topic: '', audience: '', researchType: 'quantitative' })
    const [result, setResult] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)
        setResult(null)
        try {
            const res = await fetch('/api/ai', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ mode: 'survey', ...form }),
            })
            if (!res.ok) throw new Error('Request failed')
            const data = await res.json()
            setResult(data.result)
        } catch {
            setError('Could not generate a questionnaire right now. Please try again in a moment.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-800 mb-2">Research topic</label>
                    <input
                        name="topic"
                        value={form.topic}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Customer satisfaction with our mobile banking app"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-600 transition-all"
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-800 mb-2">Target audience</label>
                    <input
                        name="audience"
                        value={form.audience}
                        onChange={handleChange}
                        placeholder="e.g. Existing customers aged 25-45"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-600 transition-all"
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-800 mb-2">Research type</label>
                    <select
                        name="researchType"
                        value={form.researchType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-600 transition-all bg-white"
                    >
                        <option value="quantitative">Quantitative (structured survey)</option>
                        <option value="qualitative">Qualitative (interview guide)</option>
                    </select>
                </div>
                <div className="md:col-span-2 text-center pt-2">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="inline-flex items-center px-10 py-4 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 disabled:bg-gray-400 transition-colors shadow-lg"
                    >
                        {isLoading ? 'Generating…' : 'Generate Questionnaire'}
                    </button>
                </div>
            </form>
            {error && <p className="text-red-600 text-center mt-6">{error}</p>}
            {result && <ResultCard title="Your AI-Generated Questionnaire" text={result} />}
        </div>
    )
}

export default function AITools() {
    const [activeTab, setActiveTab] = useState('brief')

    return (
        <div className="bg-white">
            {/* Hero */}
            <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 py-16 md:py-24 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px),
                                radial-gradient(circle at 75% 75%, white 2px, transparent 2px)`,
                            backgroundSize: '50px 50px',
                        }}
                    ></div>
                </div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <span className="inline-flex items-center px-4 py-2 bg-white/10 border border-white/20 rounded-full text-blue-100 text-sm font-semibold mb-6">
                        Powered by AI
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                        AI Research <span className="text-blue-200">Toolkit</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed font-light">
                        Instantly draft a market research brief or a survey questionnaire using AI — a preview of
                        the kind of work our research team refines and delivers for you.
                    </p>
                </div>
            </div>

            {/* Tools */}
            <div className="py-20 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-center mb-10">
                        <div className="inline-flex bg-white rounded-full shadow-md border border-gray-200 p-1">
                            <button
                                onClick={() => setActiveTab('brief')}
                                className={`px-6 py-3 rounded-full text-sm font-bold transition-colors ${activeTab === 'brief' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-blue-600'
                                    }`}
                            >
                                Research Brief Generator
                            </button>
                            <button
                                onClick={() => setActiveTab('survey')}
                                className={`px-6 py-3 rounded-full text-sm font-bold transition-colors ${activeTab === 'survey' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-blue-600'
                                    }`}
                            >
                                Survey Question Generator
                            </button>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-10">
                        {activeTab === 'brief' ? <BriefGenerator /> : <SurveyGenerator />}
                    </div>

                    <p className="text-center text-sm text-gray-500 mt-8">
                        Have a question instead? Click the chat icon in the bottom-right corner to talk to our AI
                        assistant, or visit the Contact page to reach our research team directly.
                    </p>
                </div>
            </div>
        </div>
    )
}
