// Shared attachment rules for the AI chatbot's file/image upload feature.
// Imported by both the browser (src/components/AIChat) and the serverless
// function (api/ai.js) so validation stays identical on both sides.
//
// Limits are sized around Vercel's fixed 4.5 MB request body cap for
// Serverless Functions: base64 inflates raw bytes by ~1.33x, so a 3 MB raw
// budget per message stays safely under that ceiling alongside the rest of
// the JSON payload (conversation history, etc).

export const MAX_FILE_SIZE_BYTES = 3 * 1024 * 1024; // 3 MB per file
export const MAX_TOTAL_SIZE_BYTES = 3 * 1024 * 1024; // 3 MB combined per message
export const MAX_FILES_PER_MESSAGE = 4;

export const ATTACHMENT_TYPES = [
    { ext: '.jpg', mediaType: 'image/jpeg', kind: 'image', label: 'JPG' },
    { ext: '.jpeg', mediaType: 'image/jpeg', kind: 'image', label: 'JPG' },
    { ext: '.png', mediaType: 'image/png', kind: 'image', label: 'PNG' },
    { ext: '.webp', mediaType: 'image/webp', kind: 'image', label: 'WEBP' },
    { ext: '.pdf', mediaType: 'application/pdf', kind: 'document', label: 'PDF' },
    {
        ext: '.docx',
        mediaType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        kind: 'document',
        label: 'DOCX',
    },
    { ext: '.txt', mediaType: 'text/plain', kind: 'document', label: 'TXT' },
    { ext: '.csv', mediaType: 'text/csv', kind: 'document', label: 'CSV' },
]

// File type is resolved from the filename extension (not the browser-reported
// MIME type, which is unreliable for .docx/.csv across OSes) so the frontend
// and backend always agree on what a file is.
export function resolveAttachmentType(filename) {
    const lower = (filename || '').toLowerCase()
    return ATTACHMENT_TYPES.find((t) => lower.endsWith(t.ext)) || null
}

export const ACCEPT_ATTR = ATTACHMENT_TYPES.map((t) => t.ext).join(',')

export function formatBytes(bytes) {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

// Validates a single browser File before it's read/uploaded. Returns
// { ok: true, type } or { ok: false, error }.
export function validateFile(file) {
    const type = resolveAttachmentType(file.name)
    if (!type) {
        return { ok: false, error: `"${file.name}": unsupported file type. Allowed: PDF, DOCX, TXT, CSV, JPG, PNG, WEBP.` }
    }
    if (file.size > MAX_FILE_SIZE_BYTES) {
        return { ok: false, error: `"${file.name}" is too large (max ${formatBytes(MAX_FILE_SIZE_BYTES)} per file).` }
    }
    return { ok: true, type }
}
