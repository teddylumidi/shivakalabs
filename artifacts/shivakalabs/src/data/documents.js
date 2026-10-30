/**
 * documents.js — Re-exports the shared catalog (prices live in the API's
 * catalog so the shown price is always the charged price) plus site-only
 * helpers for the Documents section.
 */
export {
  DOCUMENT_CATEGORIES, DOCUMENT_TYPES, PHOTO_PRODUCT, PHOTO_SIZES, PHOTO_BACKGROUNDS,
  getDocumentType, typesInCategory,
} from '../../../../services/document-api/lib/catalog.js';

/** Sub-menu shown at the top of every Documents page. */
export const DOCS_MENU = [
  { label: 'All',            to: '/documents' },
  { label: 'Career',         to: '/documents/career' },
  { label: 'Letters',        to: '/documents/letters' },
  { label: 'Legal',          to: '/documents/legal' },
  { label: 'Business',       to: '/documents/business' },
  { label: 'Personal',       to: '/documents/personal' },
  { label: 'Passport Photo', to: '/documents/passport-photo' },
];

export const DOC_STEPS = [
  { icon: 'fa-hand-pointer-o', title: 'Choose a document', text: 'Pick from career, letters, legal, business or personal documents.' },
  { icon: 'fa-pencil',         title: 'Fill in your details', text: 'Answer a short form. Rough notes are fine — we polish the wording.' },
  { icon: 'fa-mobile',         title: 'Pay first', text: 'Pay securely with M-Pesa or Visa/Mastercard through Paystack.' },
  { icon: 'fa-download',       title: 'Download', text: 'Get your document in Word (.docx) and PDF within about a minute.' },
];
