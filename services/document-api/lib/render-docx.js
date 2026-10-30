/**
 * render-docx.js — Draws layout blocks into an A4 Word document.
 */
import {
  AlignmentType, BorderStyle, Document, LevelFormat, Packer, Paragraph,
  TabStopType, TextRun,
} from 'docx';

const MARGIN = 1134;                 // 2 cm in twips
const CONTENT_WIDTH = 11906 - 2 * MARGIN;
const GOLD = 'A0843A';
const MUTED = '555555';

const pt = n => Math.round(n * 20);  // points → twips (spacing)

function linesRuns(items, boldFirst) {
  return items.map((text, i) => new TextRun({ text, bold: boldFirst && i === 0, break: i ? 1 : 0 }));
}

function blockToParagraphs(block) {
  switch (block.type) {
    case 'title':
      return [new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: pt(2) }, children: [new TextRun({ text: block.text, bold: true, size: 40 })] })];
    case 'subtitle':
      return [new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: pt(2) }, children: [new TextRun({ text: block.text, size: 24, color: GOLD })] })];
    case 'center':
      return [new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: pt(6) }, children: [new TextRun({ text: block.text, size: 19, color: MUTED })] })];
    case 'heading':
      return [new Paragraph({
        spacing: { before: pt(12), after: pt(5) },
        keepNext: true,
        border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: GOLD, space: 2 } },
        children: [new TextRun({ text: block.text.toUpperCase(), bold: true, size: 23, color: '222222' })],
      })];
    case 'entry': {
      const out = [new Paragraph({
        tabStops: [{ type: TabStopType.RIGHT, position: CONTENT_WIDTH }],
        spacing: { before: pt(4), after: pt(block.sub ? 0 : 2) },
        keepNext: true,
        children: [
          new TextRun({ text: block.left, bold: true }),
          ...(block.right ? [new TextRun({ text: `\t${block.right}`, color: MUTED })] : []),
        ],
      })];
      if (block.sub) out.push(new Paragraph({ spacing: { after: pt(2) }, keepNext: true, children: [new TextRun({ text: block.sub, italics: true, color: MUTED })] }));
      return out;
    }
    case 'para':
      return [new Paragraph({
        spacing: { after: pt(8) },
        children: [new TextRun({ text: block.text, bold: !!block.bold, underline: block.underline ? {} : undefined })],
      })];
    case 'bullets':
      return block.items.map(text => new Paragraph({ numbering: { reference: 'bullets', level: 0 }, spacing: { after: pt(2) }, children: [new TextRun(text)] }));
    case 'lines':
      return [new Paragraph({ spacing: { after: pt(2) }, children: linesRuns(block.items, block.boldFirst) })];
    case 'gap':
      return [new Paragraph({ spacing: { after: pt(Math.max(0, block.size - 11)) }, children: [] })];
    default:
      return [];
  }
}

export async function renderDocx(blocks, { title } = {}) {
  const doc = new Document({
    creator: 'ShivakaLabs',
    title: title || 'Document',
    styles: { default: { document: { run: { font: 'Calibri', size: 22 } } } },
    numbering: {
      config: [{
        reference: 'bullets',
        levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 400, hanging: 260 } } } }],
      }],
    },
    sections: [{
      properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: MARGIN, right: MARGIN, bottom: MARGIN, left: MARGIN } } },
      children: blocks.flatMap(blockToParagraphs),
    }],
  });
  return Packer.toBuffer(doc);
}
