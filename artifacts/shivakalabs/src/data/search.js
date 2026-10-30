/**
 * search.js — One index of everything ShivakaLabs offers, for the homepage
 * search. Documents link to their page; everything else opens WhatsApp.
 */
import { ECITIZEN_SERVICES, WEBDEV_SERVICES, DESIGN_SERVICES, MARKETING_SERVICES, waLink } from './services';
import { DOCUMENT_TYPES, PHOTO_PRODUCT } from './documents';

// Everyday words people type, mapped to the words used in service names.
const SYNONYMS = {
  'kra': 'kra pin itax tax returns',
  'pin': 'kra pin',
  'returns': 'returns nil itax',
  'dl': 'driving licence license',
  'license': 'licence',
  'licence': 'license',
  'good conduct': 'certificate of good conduct dci police clearance',
  'police clearance': 'good conduct',
  'nhif': 'sha shif',
  'resume': 'cv',
  'website': 'web website',
  'logo': 'logo design',
  'photo': 'passport photo',
};

export const SEARCH_INDEX = [
  ...DOCUMENT_TYPES.map(t => ({
    name: t.name, desc: t.desc, area: 'Documents', price: t.price,
    to: `/documents/${t.category}#${t.id}`,
  })),
  {
    name: 'Passport Photo', desc: 'Upload a photo and get a passport-size photo with the background colour you choose.',
    area: 'Documents', price: PHOTO_PRODUCT.price, to: '/documents/passport-photo',
  },
  ...ECITIZEN_SERVICES.map(s => ({ name: s.name, desc: s.desc, area: 'eCitizen', href: waLink(s.name) })),
  ...WEBDEV_SERVICES.map(s => ({ name: s.name, desc: s.desc, area: 'Websites', href: waLink(s.name) })),
  ...DESIGN_SERVICES.map(s => ({ name: s.name, desc: s.desc, area: 'Design', href: waLink(s.name) })),
  ...MARKETING_SERVICES.map(s => ({ name: s.name, desc: s.desc, area: 'Marketing', href: waLink(s.name) })),
].map(item => ({ ...item, haystack: `${item.name} ${item.desc} ${item.area}`.toLowerCase() }));

/** Ranks services for a query: name matches first, then descriptions. */
export function searchServices(query, limit = 6) {
  const q = query.toLowerCase().trim();
  if (q.length < 2) return [];
  const expanded = [q, ...Object.entries(SYNONYMS).filter(([k]) => q.includes(k)).map(([, v]) => v)].join(' ');
  const words = [...new Set(expanded.split(/\s+/).filter(w => w.length > 1))];
  return SEARCH_INDEX
    .map(item => {
      const name = item.name.toLowerCase();
      let score = name.includes(q) ? 10 : 0;
      for (const w of words) {
        if (name.includes(w)) score += 3;
        else if (item.haystack.includes(w)) score += 1;
      }
      return { item, score };
    })
    .filter(r => r.score > 0)
    .sort((a, b) => b.score - a.score || a.item.name.length - b.item.name.length)
    .slice(0, limit)
    .map(r => r.item);
}
