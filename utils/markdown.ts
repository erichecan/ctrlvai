import { marked } from 'marked';
import DOMPurify from 'dompurify';

export function parseMarkdown(content?: string | null): string {
  if (!content) return '';

  // 配置marked
  marked.setOptions({
    gfm: true,
    breaks: true,
    smartLists: true,
    smartypants: true
  });

  try {
    const html = marked.parse(content);
    // 在浏览器环境下使用DOMPurify
    if (typeof window !== 'undefined') {
      return DOMPurify.sanitize(html);
    }
    return html;
  } catch (error) {
    console.error('Markdown parsing error:', error);
    return content;
  }
}