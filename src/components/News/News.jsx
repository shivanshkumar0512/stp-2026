import React, { useCallback, useEffect, useState } from 'react'
import { NEWS_CATEGORIES } from '../../lib/newsCategories'

const CATEGORY_META = {
    ai: {
        label: 'AI',
        gradient: 'from-violet-500 to-purple-700',
        icon: (
            <svg className="w-10 h-10 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.611L5 14.5" />
            </svg>
        ),
    },
    technology: {
        label: 'Technology',
        gradient: 'from-blue-500 to-blue-800',
        icon: (
            <svg className="w-10 h-10 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
            </svg>
        ),
    },
    startups: {
        label: 'Startups',
        gradient: 'from-emerald-500 to-teal-700',
        icon: (
            <svg className="w-10 h-10 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
            </svg>
        ),
    },
    business: {
        label: 'Business',
        gradient: 'from-amber-500 to-orange-700',
        icon: (
            <svg className="w-10 h-10 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
        ),
    },
    markets: {
        label: 'Markets',
        gradient: 'from-rose-500 to-red-700',
        icon: (
            <svg className="w-10 h-10 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.25 18L9 11.25l4.306 4.306a11.95 11.95 0 015.814-5.518l2.74-1.22m0 0l-5.94-2.281m5.94 2.28l-2.28 5.941" />
            </svg>
        ),
    },
}

function formatDate(iso) {
    if (!iso) return ''
    const date = new Date(iso)
    if (Number.isNaN(date.getTime())) return ''

    const diffMs = Date.now() - date.getTime()
    const diffHours = Math.floor(diffMs / 3600000)
    if (diffHours < 1) return 'Just now'
    if (diffHours < 24) return `${diffHours}h ago`
    const diffDays = Math.floor(diffHours / 24)
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function NewsCard({ article }) {
    const [imgError, setImgError] = useState(false)
    const meta = CATEGORY_META[article.category] || CATEGORY_META.technology
    const dateLabel = formatDate(article.publishedAt)
    const showImage = Boolean(article.image) && !imgError

    return (
        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100 flex flex-col">
            <div className="h-40 relative flex-shrink-0">
                {showImage ? (
                    <img
                        src={article.image}
                        alt=""
                        onError={() => setImgError(true)}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${meta.gradient} flex items-center justify-center`}>
                        {meta.icon}
                    </div>
                )}
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold bg-white/90 text-gray-800 shadow">
                    {meta.label}
                </span>
            </div>
            <div className="p-6 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-2 leading-snug line-clamp-2">{article.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">{article.summary}</p>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span className="font-semibold text-gray-700 truncate mr-2">{article.source}</span>
                    {dateLabel && <span className="flex-shrink-0">{dateLabel}</span>}
                </div>
                <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 font-semibold text-sm hover:text-blue-800 transition-colors"
                >
                    Read full article
                    <svg className="w-4 h-4 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </a>
            </div>
        </div>
    )
}

function SkeletonCard() {
    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 animate-pulse">
            <div className="h-40 bg-gray-200" />
            <div className="p-6 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-5/6" />
                <div className="h-3 bg-gray-200 rounded w-full" />
                <div className="h-3 bg-gray-200 rounded w-4/6" />
                <div className="h-3 bg-gray-200 rounded w-1/3 mt-4" />
            </div>
        </div>
    )
}

export default function News() {
    const [category, setCategory] = useState('all')
    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    const loadNews = useCallback(async (signal) => {
        setIsLoading(true)
        setError(null)
        try {
            const res = await fetch(`/api/news?category=${encodeURIComponent(category)}`, { signal })
            const data = await res.json().catch(() => null)
            if (!res.ok) throw new Error((data && data.error) || 'Failed to load news')
            setArticles((data && data.articles) || [])
            setIsLoading(false)
        } catch (err) {
            // An aborted request was superseded by a newer one (rapid category
            // switching, or React StrictMode's dev double-invoke) — the newer
            // request already owns the loading state, so leave it alone here.
            if (err && err.name === 'AbortError') return
            setError(err instanceof Error ? err.message : 'Failed to load news. Please try again.')
            setIsLoading(false)
        }
    }, [category])

    useEffect(() => {
        const controller = new AbortController()
        loadNews(controller.signal)
        return () => controller.abort()
    }, [loadNews])

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
                        Updated regularly
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                        AI <span className="text-blue-200">News Feed</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed font-light">
                        The latest AI, technology, startup, business and market headlines — curated for research
                        professionals who need to stay ahead of the trends shaping their industries.
                    </p>
                </div>
            </div>

            {/* Feed */}
            <div className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Category filter */}
                    <div className="flex flex-wrap justify-center gap-2 mb-12">
                        {NEWS_CATEGORIES.map((c) => (
                            <button
                                key={c.key}
                                onClick={() => setCategory(c.key)}
                                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-colors border ${category === c.key
                                    ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                                    : 'bg-white text-gray-600 border-gray-200 hover:text-blue-600 hover:border-blue-300'
                                    }`}
                            >
                                {c.label}
                            </button>
                        ))}
                    </div>

                    {/* Loading */}
                    {isLoading && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <SkeletonCard key={i} />
                            ))}
                        </div>
                    )}

                    {/* Error */}
                    {!isLoading && error && (
                        <div className="max-w-xl mx-auto text-center bg-red-50 border border-red-200 rounded-2xl p-10">
                            <div className="w-14 h-14 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-5">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-red-800 mb-2">Couldn't load the news feed</h3>
                            <p className="text-red-700 mb-6">{error}</p>
                            <button
                                onClick={() => loadNews()}
                                className="inline-flex items-center px-6 py-3 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors"
                            >
                                Try again
                            </button>
                        </div>
                    )}

                    {/* Empty */}
                    {!isLoading && !error && articles.length === 0 && (
                        <div className="max-w-xl mx-auto text-center bg-white border border-gray-200 rounded-2xl p-10">
                            <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-5">
                                <svg className="w-7 h-7 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">No news found</h3>
                            <p className="text-gray-500">
                                There's nothing in this category right now — try a different filter above.
                            </p>
                        </div>
                    )}

                    {/* Results */}
                    {!isLoading && !error && articles.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {articles.map((article) => (
                                <NewsCard key={article.id} article={article} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
