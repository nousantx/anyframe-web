import DOMPurify from 'dompurify'

export const sanitizeHtml = (html: string) => {
  const config = {
    ADD_TAGS: ['*'], // Allow all tags
    ADD_ATTR: ['*'], // Allow all attributes
    FORBID_TAGS: ['script'], // Forbid script tags
    FORBID_ATTR: [
      'on*', // Forbid all event handler attributes (onclick, onload, etc.)
      'javascript:*' // Forbid javascript: protocol in attributes
    ]
  }

  return DOMPurify.sanitize(html, config)
}
