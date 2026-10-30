/**
 * layout.js — Converts structured content (cv / letter / document) into a
 * flat list of layout blocks that both renderers (DOCX and PDF) draw the
 * same way, so the Word and PDF files always match.
 *
 * Block types:
 *   title    { text }               large centred heading (CV name / doc title)
 *   subtitle { text }               centred, muted
 *   center   { text }               small centred line (CV contact line)
 *   heading  { text }               section heading with a rule underneath
 *   entry    { left, right, sub }   bold left text, right-aligned date, italic sub-line
 *   para     { text }
 *   bullets  { items }
 *   lines    { items }              tight lines (addresses, signature)
 *   gap      { size }               vertical space in points
 */

const clean = v => (typeof v === 'string' ? v.trim() : '');
const list = v => (Array.isArray(v) ? v.map(clean).filter(Boolean) : []);
const join = (parts, sep) => parts.map(clean).filter(Boolean).join(sep);

function cvBlocks(c) {
  const b = [];
  b.push({ type: 'title', text: clean(c.full_name) });
  if (clean(c.headline)) b.push({ type: 'subtitle', text: clean(c.headline) });
  const contact = list(c.contact);
  if (contact.length) b.push({ type: 'center', text: contact.join('  |  ') });

  if (clean(c.summary)) {
    b.push({ type: 'heading', text: 'Professional Summary' }, { type: 'para', text: clean(c.summary) });
  }

  const exp = Array.isArray(c.experience) ? c.experience : [];
  if (exp.length) {
    b.push({ type: 'heading', text: 'Work Experience' });
    exp.forEach(e => {
      b.push({ type: 'entry', left: join([e.role, e.organisation], ' — '), right: clean(e.period), sub: clean(e.location) });
      const bullets = list(e.bullets);
      if (bullets.length) b.push({ type: 'bullets', items: bullets });
    });
  }

  const edu = Array.isArray(c.education) ? c.education : [];
  if (edu.length) {
    b.push({ type: 'heading', text: 'Education' });
    edu.forEach(e => {
      b.push({ type: 'entry', left: clean(e.qualification), right: clean(e.period), sub: clean(e.institution) });
      if (clean(e.details)) b.push({ type: 'para', text: clean(e.details) });
    });
  }

  // Short items (skills, languages) sit on one line; longer ones get bullets.
  for (const [title, items] of [['Skills', c.skills], ['Certifications & Awards', c.certifications], ['Languages', c.languages]]) {
    const l = list(items);
    if (!l.length) continue;
    b.push({ type: 'heading', text: title });
    const short = l.every(s => s.length <= 40);
    b.push(short ? { type: 'para', text: l.join('  •  ') } : { type: 'bullets', items: l });
  }

  (Array.isArray(c.extra_sections) ? c.extra_sections : []).forEach(s => {
    const l = list(s.items);
    if (clean(s.title) && l.length) b.push({ type: 'heading', text: clean(s.title) }, { type: 'bullets', items: l });
  });

  const refs = Array.isArray(c.referees) ? c.referees.filter(r => clean(r.name)) : [];
  if (refs.length) {
    b.push({ type: 'heading', text: 'Referees' });
    refs.forEach((r, i) => {
      if (i) b.push({ type: 'gap', size: 6 });
      b.push({ type: 'lines', items: [clean(r.name), join([r.title, r.organisation], ', '), clean(r.contact)].filter(Boolean), boldFirst: true });
    });
  }
  return b;
}

function letterBlocks(c) {
  const b = [];
  const sender = list(c.sender_lines);
  if (sender.length) b.push({ type: 'lines', items: sender }, { type: 'gap', size: 10 });
  if (clean(c.date)) b.push({ type: 'para', text: clean(c.date) });
  const recipient = list(c.recipient_lines);
  if (recipient.length) b.push({ type: 'lines', items: recipient }, { type: 'gap', size: 10 });
  if (clean(c.salutation)) b.push({ type: 'para', text: clean(c.salutation) });
  if (clean(c.subject)) b.push({ type: 'para', text: `RE: ${clean(c.subject).replace(/^re:\s*/i, '').toUpperCase()}`, bold: true, underline: true });
  list(c.paragraphs).forEach(p => b.push({ type: 'para', text: p }));
  b.push({ type: 'gap', size: 6 });
  if (clean(c.closing)) b.push({ type: 'para', text: clean(c.closing) });
  b.push({ type: 'gap', size: 28 });
  const sig = list(c.signature_lines);
  if (sig.length) b.push({ type: 'lines', items: sig, boldFirst: true });
  return b;
}

function documentBlocks(c) {
  const b = [{ type: 'title', text: clean(c.title) }];
  if (clean(c.subtitle)) b.push({ type: 'subtitle', text: clean(c.subtitle) });
  b.push({ type: 'gap', size: 8 });
  (Array.isArray(c.sections) ? c.sections : []).forEach(s => {
    if (clean(s.heading)) b.push({ type: 'heading', text: clean(s.heading) });
    list(s.paragraphs).forEach(p => b.push({ type: 'para', text: p }));
    const bullets = list(s.bullets);
    if (bullets.length) b.push({ type: 'bullets', items: bullets });
  });
  return b;
}

export function toBlocks({ kind, content }) {
  if (kind === 'cv') return cvBlocks(content);
  if (kind === 'letter') return letterBlocks(content);
  return documentBlocks(content);
}

/** File name stem, e.g. "Jane-Wanjiku-CV". */
export function fileStem(kind, content, typeName) {
  const who = clean(content.full_name) || list(content.signature_lines)[0] || clean(content.title) || 'Document';
  const what = kind === 'cv' ? 'CV' : typeName.replace(/ Writing$/, '').replace(/[^A-Za-z]+/g, '-');
  return `${who}-${what}`.replace(/[^A-Za-z0-9-]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '').slice(0, 80) || 'Document';
}
