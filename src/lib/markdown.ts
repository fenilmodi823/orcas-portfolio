/**
 * Sanitizing markdown renderer for untrusted third-party content (GitHub READMEs).
 *
 * Algorithm (per design spec §16):
 *   fence-lift → full-escape → renderer-only-tags → URL allowlist → rel=noopener
 *
 * Ported from fenil-modi-portfolio.html md(src) function.
 */

const SAFE_URL_RE = /^(https?:|mailto:|#|\/)/i;

function safeUrl(u: string): string {
  return SAFE_URL_RE.test(String(u).trim()) ? String(u).trim() : '#';
}

export function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Strip dangerous attribute names and URI schemes from already-escaped text. */
function scrub(s: string): string {
  return s
    .replace(/\bon\w+\s*=/gi, '')
    .replace(/javascript\s*:/gi, '')
    .replace(/data\s*:[^,\s]*/gi, '');
}

function inline(t: string): string {
  return t
    .replace(/`([^`]+)`/g, (_m, c: string) => '<code>' + c + '</code>')
    .replace(
      /!\[([^\]]*)\]\(([^)\s]+)[^)]*\)/g,
      (_m, a: string, u: string) =>
        '<img alt="' + a + '" src="' + safeUrl(u) + '" loading="lazy">',
    )
    .replace(
      /\[([^\]]+)\]\(([^)\s]+)[^)]*\)/g,
      (_m, a: string, u: string) =>
        '<a href="' + safeUrl(u) + '" target="_blank" rel="noopener noreferrer">' + a + '</a>',
    )
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*\w])\*([^*\n]+)\*/g, '$1<em>$2</em>')
    .replace(/(^|\s)_([^_\n]+)_/g, '$1<em>$2</em>');
}

export function renderMarkdown(src: string): string {
  const blocks: string[] = [];
  let s = String(src || '').replace(/\r\n?/g, '\n');

  // pull fenced code out before anything else touches it
  s = s.replace(/```[\w-]*\n([\s\S]*?)```/g, (_m, code: string) => {
    blocks.push('<pre><code>' + esc(code.replace(/\n$/, '')) + '</code></pre>');
    return '\0B' + (blocks.length - 1) + '\0';
  });

  s = scrub(esc(s));

  const out: string[] = [];
  const lines = s.split('\n');
  let i = 0;
  const para: string[] = [];

  const flushPara = (buf: string[]) => {
    if (buf.length) {
      out.push('<p>' + inline(buf.join(' ')) + '</p>');
      buf.length = 0;
    }
  };

  while (i < lines.length) {
    const L = lines[i];

    if (/^\s*$/.test(L)) {
      flushPara(para);
      i++;
      continue;
    }

    // a lifted code block on its own line
    const ph = L.match(/^\0B(\d+)\0\s*$/);
    if (ph) {
      flushPara(para);
      out.push(blocks[+ph[1]]);
      i++;
      continue;
    }

    const h = L.match(/^(#{1,6})\s+(.*)$/);
    if (h) {
      flushPara(para);
      const n = h[1].length;
      out.push('<h' + n + '>' + inline(h[2]) + '</h' + n + '>');
      i++;
      continue;
    }

    if (/^\s*([-*_])\s*\1\s*\1[\s-*_]*$/.test(L)) {
      flushPara(para);
      out.push('<hr>');
      i++;
      continue;
    }

    // table: header row then a separator of dashes
    if (
      /\|/.test(L) &&
      i + 1 < lines.length &&
      /^\s*\|?[\s:|-]+\|[\s:|-]*$/.test(lines[i + 1])
    ) {
      flushPara(para);
      const cells = (r: string) =>
        r
          .replace(/^\s*\|/, '')
          .replace(/\|\s*$/, '')
          .split('|')
          .map((c) => c.trim());
      let t =
        '<table><thead><tr>' +
        cells(L)
          .map((c) => '<th>' + inline(c) + '</th>')
          .join('') +
        '</tr></thead><tbody>';
      i += 2;
      while (i < lines.length && /\|/.test(lines[i]) && !/^\s*$/.test(lines[i])) {
        t +=
          '<tr>' +
          cells(lines[i])
            .map((c) => '<td>' + inline(c) + '</td>')
            .join('') +
          '</tr>';
        i++;
      }
      out.push(t + '</tbody></table>');
      continue;
    }

    if (/^\s*&gt;\s?/.test(L)) {
      flushPara(para);
      const buf: string[] = [];
      while (i < lines.length && /^\s*&gt;\s?/.test(lines[i])) {
        buf.push(lines[i].replace(/^\s*&gt;\s?/, ''));
        i++;
      }
      out.push('<blockquote><p>' + inline(buf.join(' ')) + '</p></blockquote>');
      continue;
    }

    const ul = /^\s*[-*+]\s+/;
    const ol = /^\s*\d+[.)]\s+/;
    if (ul.test(L) || ol.test(L)) {
      flushPara(para);
      const ordered = ol.test(L);
      const re = ordered ? ol : ul;
      const items: string[] = [];
      while (i < lines.length && re.test(lines[i])) {
        let txt = lines[i].replace(re, '');
        i++;
        // fold continuation lines into the same item
        while (
          i < lines.length &&
          !/^\s*$/.test(lines[i]) &&
          !ul.test(lines[i]) &&
          !ol.test(lines[i]) &&
          !/^(#{1,6})\s/.test(lines[i]) &&
          !/^\0B\d+\0/.test(lines[i])
        ) {
          txt += ' ' + lines[i].trim();
          i++;
        }
        items.push('<li>' + inline(txt) + '</li>');
      }
      out.push(
        (ordered ? '<ol>' : '<ul>') + items.join('') + (ordered ? '</ol>' : '</ul>'),
      );
      continue;
    }

    para.push(L.trim());
    i++;
  }
  flushPara(para);

  // restore any code blocks that ended up inside a paragraph
  return out.join('\n').replace(/\0B(\d+)\0/g, (_m, n: string) => blocks[+n]);
}
