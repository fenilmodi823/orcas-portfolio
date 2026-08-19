import { describe, it, expect } from 'vitest';
import { renderMarkdown } from './markdown';

describe('renderMarkdown — sanitization', () => {
  const payloads = [
    '<img src=x onerror="alert(1)">',
    '[click me](javascript:alert(1))',
    '![x](data:text/html;base64,PHNjcmlwdD5hbGVydCgxKTwvc2NyaXB0Pg==)',
    '<script>alert(1)</script>',
    '<div "><img src=x onerror=alert(1)>">',
    '<iframe src="javascript:alert(1)"></iframe>',
  ];

  for (const payload of payloads) {
    it(`neutralizes: ${payload.slice(0, 40)}`, () => {
      const html = renderMarkdown(payload);
      expect(html).not.toMatch(/onerror\s*=/i);
      expect(html).not.toMatch(/<script/i);
      expect(html).not.toMatch(/<iframe/i);
      expect(html).not.toMatch(/javascript:/i);
    });
  }

  it('only emits tags the renderer itself produces', () => {
    const html = renderMarkdown('# Title\n\nSome *text* with `code`.');
    const tags = [...html.matchAll(/<\/?([a-z0-9]+)/gi)].map((m) => m[1].toLowerCase());
    const allowed = new Set(['h1', 'h2', 'h3', 'p', 'em', 'strong', 'code', 'pre', 'a', 'ul', 'ol', 'li', 'blockquote', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'img', 'hr']);
    for (const tag of tags) expect(allowed.has(tag)).toBe(true);
  });

  it('rejects a non-whitelisted URL scheme on links', () => {
    const html = renderMarkdown('[x](ftp://evil.example/payload)');
    expect(html).toContain('href="#"');
  });

  it('allows a normal https link with rel=noopener', () => {
    const html = renderMarkdown('[docs](https://example.com)');
    expect(html).toContain('href="https://example.com"');
    expect(html).toContain('rel="noopener noreferrer"');
    expect(html).toContain('target="_blank"');
  });
});
