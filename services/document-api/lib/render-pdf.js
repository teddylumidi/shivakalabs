/**
 * render-pdf.js — Draws layout blocks into an A4 PDF with pdf-lib.
 * Uses the built-in Helvetica fonts (no font files to bundle), so text is
 * limited to the WinAnsi character set; sanitize() maps everything else.
 */
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

const PAGE_W = 595.28;
const PAGE_H = 841.89;
const MARGIN = 56.7;                       // 2 cm
const WIDTH = PAGE_W - 2 * MARGIN;
const BODY = 10;
const LEADING = 1.32;
const DARK = rgb(0.13, 0.13, 0.13);
const MUTED = rgb(0.33, 0.33, 0.33);
const GOLD = rgb(0.627, 0.518, 0.227);

// Characters outside Latin-1 that WinAnsi (and so Helvetica) can still draw.
const WIN_ANSI_EXTRA = new Set('€‚ƒ„…†‡ˆ‰Š‹ŒŽ‘’“”•–—˜™š›œžŸ');

// Letters with no decomposition, and common symbols, mapped to look-alikes.
const FALLBACK = { 'Ł': 'L', 'ł': 'l', 'Đ': 'D', 'đ': 'd', 'Ħ': 'H', 'ħ': 'h', '−': '-', '‐': '-', '‑': '-', '′': "'", '″': '"', '→': '->', '✓': '' };

export function sanitize(text) {
  let out = '';
  for (const ch of String(text ?? '').normalize('NFC')) {
    const code = ch.codePointAt(0);
    if (ch === '\t') out += ' ';
    else if ((code >= 0x20 && code <= 0x7e) || (code >= 0xa0 && code <= 0xff) || WIN_ANSI_EXTRA.has(ch) || ch === '\n') out += ch;
    else {
      const base = ch.normalize('NFD').replace(/[̀-ͯ]/g, '');
      out += base && base.codePointAt(0) < 0x7f ? base : (FALLBACK[ch] ?? '');
    }
  }
  return out;
}

function wrap(text, font, size, width) {
  const lines = [];
  for (const para of sanitize(text).split('\n')) {
    const words = para.split(/\s+/).filter(Boolean);
    let line = '';
    for (let word of words) {
      // Break words longer than a full line (long URLs, emails).
      while (font.widthOfTextAtSize(word, size) > width) {
        let i = word.length - 1;
        while (i > 1 && font.widthOfTextAtSize(word.slice(0, i), size) > width) i--;
        if (line) { lines.push(line); line = ''; }
        lines.push(word.slice(0, i));
        word = word.slice(i);
      }
      const next = line ? `${line} ${word}` : word;
      if (font.widthOfTextAtSize(next, size) <= width) line = next;
      else { if (line) lines.push(line); line = word; }
    }
    lines.push(line);
  }
  return lines;
}

export async function renderPdf(blocks, { title } = {}) {
  const pdf = await PDFDocument.create();
  pdf.setTitle(sanitize(title || 'Document'));
  pdf.setCreator('ShivakaLabs');
  pdf.setProducer('ShivakaLabs');
  const regular = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const italic = await pdf.embedFont(StandardFonts.HelveticaOblique);

  let page = pdf.addPage([PAGE_W, PAGE_H]);
  let y = PAGE_H - MARGIN;

  const ensure = h => {
    if (y - h < MARGIN) { page = pdf.addPage([PAGE_W, PAGE_H]); y = PAGE_H - MARGIN; }
  };

  // Draws wrapped text; returns nothing, advances y.
  const text = (str, { font = regular, size = BODY, color = DARK, align = 'left', indent = 0, after = 0, underline = false } = {}) => {
    const lh = size * LEADING;
    for (const line of wrap(str, font, size, WIDTH - indent)) {
      ensure(lh);
      const w = font.widthOfTextAtSize(line, size);
      const x = align === 'center' ? MARGIN + (WIDTH - w) / 2 : MARGIN + indent;
      page.drawText(line, { x, y: y - size, size, font, color });
      if (underline && line) page.drawLine({ start: { x, y: y - size - 1.5 }, end: { x: x + w, y: y - size - 1.5 }, thickness: 0.6, color });
      y -= lh;
    }
    y -= after;
  };

  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i];
    switch (b.type) {
      case 'title': text(b.text, { font: bold, size: 20, align: 'center', after: 2 }); break;
      case 'subtitle': text(b.text, { size: 12, color: GOLD, align: 'center', after: 2 }); break;
      case 'center': text(b.text, { size: 9.5, color: MUTED, align: 'center', after: 6 }); break;
      case 'heading': {
        ensure(11 * LEADING + 10 + BODY * LEADING * 2); // keep heading with what follows
        y -= 10;
        text(b.text.toUpperCase(), { font: bold, size: 11 });
        page.drawLine({ start: { x: MARGIN, y: y + 1 }, end: { x: MARGIN + WIDTH, y: y + 1 }, thickness: 0.8, color: GOLD });
        y -= 6;
        break;
      }
      case 'entry': {
        ensure(BODY * LEADING * 3);
        y -= 4;
        const right = sanitize(b.right || '');
        const rightW = right ? regular.widthOfTextAtSize(right, BODY) : 0;
        if (right) page.drawText(right, { x: MARGIN + WIDTH - rightW, y: y - BODY, size: BODY, font: regular, color: MUTED });
        // Left text wraps before the date column.
        const lh = BODY * LEADING;
        for (const line of wrap(b.left, bold, BODY, WIDTH - (right ? rightW + 12 : 0))) {
          ensure(lh);
          page.drawText(line, { x: MARGIN, y: y - BODY, size: BODY, font: bold, color: DARK });
          y -= lh;
        }
        if (b.sub) text(b.sub, { font: italic, color: MUTED });
        y -= 2;
        break;
      }
      case 'para': text(b.text, { font: b.bold ? bold : regular, underline: b.underline, after: 7 }); break;
      case 'bullets':
        for (const item of b.items) {
          ensure(BODY * LEADING);
          page.drawText('•', { x: MARGIN + 6, y: y - BODY, size: BODY, font: regular, color: DARK });
          text(item, { indent: 18, after: 2 });
        }
        y -= 2;
        break;
      case 'lines':
        ensure(b.items.length * BODY * LEADING); // keep an address/referee together
        b.items.forEach((item, idx) => text(item, { font: b.boldFirst && idx === 0 ? bold : regular }));
        y -= 2;
        break;
      case 'gap': y -= b.size; break;
      default: break;
    }
  }
  return Buffer.from(await pdf.save());
}
