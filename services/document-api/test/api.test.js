/**
 * Tests run offline: Paystack and Claude are replaced with fakes.
 *   npm test
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateOrder, orderHash, newReference, HttpError } from '../lib/order.js';
import { getDocumentType, DOCUMENT_TYPES } from '../lib/catalog.js';
import { handleGenerate, checkPayment } from '../api/generate.js';
import { sanitize } from '../lib/render-pdf.js';

const cvDetails = {
  fullName: 'Jane Wanjiku',
  phone: '0712 345 678',
  email: 'jane@example.com',
  location: 'Nairobi, Kenya',
  targetRole: 'Accountant',
  education: 'BCom, University of Nairobi, 2019–2023',
  skills: 'QuickBooks, Excel',
};

const fakeClient = input => ({
  messages: { create: async args => ({ content: [{ type: 'tool_use', name: args.tool_choice.name || 'write_document', input }] }) },
});

const paidTx = (type, details, extra = {}) => ({
  status: 'success', currency: 'KES', amount: type.price * 100, paid_at: new Date().toISOString(),
  metadata: { doc_type: type.id, details_hash: orderHash(type.id, details) }, ...extra,
});

test('catalog prices: CV 100, cover letter 30', () => {
  assert.equal(getDocumentType('cv').price, 100);
  assert.equal(getDocumentType('cover-letter').price, 30);
  for (const t of DOCUMENT_TYPES) assert.ok(t.fields.some(f => f.key === 'email' && f.required), `${t.id} needs email for Paystack`);
});

test('validateOrder rejects missing required fields and bad email', () => {
  assert.throws(() => validateOrder({ docType: 'cv', details: { ...cvDetails, skills: '' } }), HttpError);
  assert.throws(() => validateOrder({ docType: 'cv', details: { ...cvDetails, email: 'nope' } }), /valid email/);
  assert.throws(() => validateOrder({ docType: 'unknown', details: cvDetails }), /Unknown document/);
});

test('validateOrder drops unknown fields so they cannot change the hash', () => {
  const a = validateOrder({ docType: 'cv', details: cvDetails });
  const b = validateOrder({ docType: 'cv', details: { ...cvDetails, injected: 'x' } });
  assert.equal(orderHash('cv', a.details), orderHash('cv', b.details));
});

test('reference format', () => {
  assert.match(newReference('cover-letter'), /^SL-CL-\d{8}-[0-9A-F]{8}$/);
});

test('checkPayment enforces status, amount, type and details', async () => {
  const type = getDocumentType('cv');
  const { details } = validateOrder({ docType: 'cv', details: cvDetails });
  const ref = newReference('cv');
  await checkPayment(ref, type, details, async () => paidTx(type, details));
  await assert.rejects(checkPayment(ref, type, details, async () => paidTx(type, details, { status: 'abandoned' })), /not received/);
  await assert.rejects(checkPayment(ref, type, details, async () => paidTx(type, details, { amount: 3000 })), /amount/);
  await assert.rejects(checkPayment(ref, type, details, async () => paidTx(getDocumentType('cover-letter'), details, { amount: 10000 })), /different document/);
  await assert.rejects(checkPayment(ref, type, { ...details, skills: 'changed' }, async () => paidTx(type, details)), /Details changed/);
  await assert.rejects(checkPayment('bad', type, details, async () => paidTx(type, details)), /Invalid payment reference/);
});

test('generate returns a real DOCX and PDF for a paid CV', async () => {
  const type = getDocumentType('cv');
  const { details } = validateOrder({ docType: 'cv', details: cvDetails });
  const out = await handleGenerate(
    { reference: newReference('cv'), docType: 'cv', details: cvDetails },
    {
      verify: async () => paidTx(type, details),
      client: fakeClient({
        full_name: 'Jane Wanjiku', headline: 'Accountant', contact: ['0712 345 678', 'jane@example.com'],
        summary: 'Detail-oriented graduate.', education: [{ qualification: 'BCom', institution: 'University of Nairobi', period: '2019–2023' }],
        skills: ['QuickBooks', 'Excel'],
      }),
    },
  );
  assert.equal(out.fileName, 'Jane-Wanjiku-CV');
  assert.equal(Buffer.from(out.docx, 'base64').subarray(0, 2).toString(), 'PK');
  assert.equal(Buffer.from(out.pdf, 'base64').subarray(0, 4).toString(), '%PDF');
});

test('PDF sanitizer keeps Latin text and drops unsupported characters', () => {
  assert.equal(sanitize('Café – “ok” 😀 Ł'), 'Café – “ok”  L');
});

import { DOCUMENT_CATEGORIES, PHOTO_SIZES } from '../lib/catalog.js';

test('every document type is complete and consistent', () => {
  const ids = new Set();
  const cats = new Set(DOCUMENT_CATEGORIES.map(c => c.id));
  for (const t of DOCUMENT_TYPES) {
    assert.ok(!ids.has(t.id), `duplicate id ${t.id}`); ids.add(t.id);
    assert.ok(cats.has(t.category), `${t.id} has unknown category`);
    assert.ok(['cv', 'letter', 'document', 'any'].includes(t.format), `${t.id} format`);
    assert.ok(t.guide && t.guide.length > 40, `${t.id} needs writing guidance`);
    assert.ok(Number.isInteger(t.price) && t.price > 0, `${t.id} price`);
    assert.match(newReference(t.id), /^SL-[A-Z]{1,4}-\d{8}-[0-9A-F]{8}$/);
    const keys = t.fields.map(f => f.key);
    assert.equal(new Set(keys).size, keys.length, `${t.id} duplicate field keys`);
  }
  for (const c of cats) assert.ok(DOCUMENT_TYPES.some(t => t.category === c), `${c} is empty`);
  assert.ok(PHOTO_SIZES.find(s => s.id === 'ke-passport').widthMm === 50);
});

test('custom documents refuse official records', () => {
  const base = { fullName: 'A B', phone: '0712', email: 'a@b.co', content: 'x' };
  assert.throws(() => validateOrder({ docType: 'custom-document', details: { ...base, documentType: 'Payslip for March' } }), /official records/);
  assert.throws(() => validateOrder({ docType: 'custom-document', details: { ...base, documentType: 'KCSE result slip' } }), /official records/);
  assert.doesNotThrow(() => validateOrder({ docType: 'custom-document', details: { ...base, documentType: 'Church event notice' } }));
});

test('legal documents are written with the document layout', async () => {
  const type = getDocumentType('affidavit');
  const details = { fullName: 'John Otieno', phone: '0712', email: 'j@o.co', idNumber: '12345678', purpose: 'Name confirmation', facts: 'x' };
  const { details: d } = validateOrder({ docType: 'affidavit', details });
  let usedTool;
  const out = await handleGenerate({ reference: newReference('affidavit'), docType: 'affidavit', details }, {
    verify: async () => paidTx(type, d),
    client: { messages: { create: async a => { usedTool = a.tool_choice.name; return { content: [{ type: 'tool_use', name: 'write_document', input: { title: 'REPUBLIC OF KENYA', subtitle: 'AFFIDAVIT', sections: [{ paragraphs: ['1. That I am an adult.'] }] } }] }; } } },
  });
  assert.equal(usedTool, 'write_document');
  assert.equal(Buffer.from(out.pdf, 'base64').subarray(0, 4).toString(), '%PDF');
});
