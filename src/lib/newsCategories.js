// Shared category definitions for the AI News Feed — imported by both the
// frontend filter UI (src/components/News) and the backend endpoint
// (api/news.js) so the set of valid category keys stays in sync.

export const NEWS_CATEGORIES = [
    { key: 'all', label: 'All' },
    { key: 'ai', label: 'AI' },
    { key: 'technology', label: 'Technology' },
    { key: 'startups', label: 'Startups' },
    { key: 'business', label: 'Business' },
    { key: 'markets', label: 'Markets' },
]

export const NEWS_CATEGORY_KEYS = NEWS_CATEGORIES.map((c) => c.key)
