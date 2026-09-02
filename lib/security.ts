import DOMPurify from 'isomorphic-dompurify';
import { z } from 'zod';

/**
 * Sanitizes HTML to prevent XSS attacks while allowing rich text elements.
 */
export function sanitizeHtml(html: string): string {
  if (!html) return '';
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol',
      'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div',
      'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre', 'iframe', 'img'
    ],
    ALLOWED_ATTR: ['href', 'name', 'target', 'src', 'alt', 'class', 'style', 'width', 'height', 'frameborder', 'allow', 'allowfullscreen'],
  });
}

/**
 * Zod schemas for validation
 */
export const contactSchema = z.object({
  name: z.string().min(2, "Name is required").max(100),
  email: z.string().email("Invalid email address"),
  subject: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000),
});

export const newsletterSchema = z.object({
  email: z.string().email("Invalid email address"),
});
