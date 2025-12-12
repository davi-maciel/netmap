import DOMPurify from 'isomorphic-dompurify';

// Input length limits
export const INPUT_LIMITS = {
  NAME: 100,
  BIO: 5000,
  LOCATION_LABEL: 200,
  CONNECTION: 50,
};

/**
 * Sanitize text input to prevent XSS attacks
 * - Removes HTML tags and dangerous content
 * - Safe for names, labels, and general text
 */
export function sanitizeText(text, maxLength = null) {
  if (!text) return '';

  // Strip all HTML tags for plain text fields
  let sanitized = DOMPurify.sanitize(text, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: []
  });

  // Enforce length limit if provided
  if (maxLength && sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength);
  }

  return sanitized;
}

/**
 * Sanitize Markdown content
 * - Allows safe Markdown/HTML formatting
 * - Removes dangerous scripts, event handlers, and protocols
 * - Safe for bio field rendered with ReactMarkdown
 */
export function sanitizeMarkdown(markdown, maxLength = INPUT_LIMITS.BIO) {
  if (!markdown) return '';

  let sanitized = DOMPurify.sanitize(markdown, {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li', 'blockquote', 'code', 'pre', 'a', 'img', 'hr',
      'table', 'thead', 'tbody', 'tr', 'th', 'td', 'del', 'ins'
    ],
    ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class'],
    ALLOWED_URI_REGEXP: /^(?:(?:https?|mailto):)/i, // Only allow http(s) and mailto protocols
  });

  // Enforce length limit
  if (sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength);
  }

  return sanitized;
}

/**
 * Sanitize and truncate text to a maximum length
 */
export function sanitizeAndTruncate(text, maxLength = 1000) {
  const sanitized = sanitizeText(text);
  return sanitized.length > maxLength ? sanitized.substring(0, maxLength) : sanitized;
}
