/**
 * catalog.js — Single source of truth for paid document types.
 *
 * Imported by BOTH the Vercel API (prices are enforced server-side) and the
 * website (artifacts/shivakalabs/src/pages/Documents.jsx) so the price a
 * customer sees is the price they are charged.
 *
 * To add a document type: add an entry here, then add its writing guidance
 * in lib/writer.js (WRITER_GUIDANCE). Prices are in whole Kenyan shillings.
 *
 * Field types: 'text' (one line), 'email', 'tel', 'textarea' (multi-line).
 */

const contactFields = [
  { key: 'fullName', label: 'Full name', type: 'text', required: true, max: 80 },
  { key: 'phone', label: 'Phone number', type: 'tel', required: true, max: 30, placeholder: '07XX XXX XXX' },
  { key: 'email', label: 'Email address', type: 'email', required: true, max: 120 },
  { key: 'location', label: 'Town / address', type: 'text', required: false, max: 120, placeholder: 'e.g. Nairobi, Kenya' },
];

export const DOCUMENT_TYPES = [
  {
    id: 'cv',
    name: 'CV / Resume Writing',
    price: 100,
    icon: 'fa-file-text',
    desc: 'A professionally written, well-structured CV built from your details, ready to send to employers.',
    needs: [
      'Contact details (phone, email, town)',
      'The job or field you are targeting',
      'Work experience: job titles, employers, dates and what you did',
      'Education: schools, courses and years',
      'Skills, certificates and languages',
      'Referees (optional)',
    ],
    fields: [
      ...contactFields,
      { key: 'targetRole', label: 'Job title or field you are targeting', type: 'text', required: true, max: 120, placeholder: 'e.g. Accountant, Sales Executive' },
      { key: 'experience', label: 'Work experience', type: 'textarea', required: false, max: 4000, placeholder: 'One job per paragraph: job title, employer, start and end dates, and what you did or achieved. Include attachments and volunteer work if you have no formal job yet.' },
      { key: 'education', label: 'Education', type: 'textarea', required: true, max: 2000, placeholder: 'e.g. Bachelor of Commerce, University of Nairobi, 2019–2023\nKCSE, Alliance High School, 2018 (Grade B+)' },
      { key: 'skills', label: 'Skills', type: 'textarea', required: true, max: 1500, placeholder: 'e.g. QuickBooks, Excel, customer service, driving licence class B' },
      { key: 'certifications', label: 'Certificates, awards and languages', type: 'textarea', required: false, max: 1500 },
      { key: 'referees', label: 'Referees', type: 'textarea', required: false, max: 1500, placeholder: 'Name, title, organisation, phone and email for each referee' },
      { key: 'extra', label: 'Anything else to include', type: 'textarea', required: false, max: 1500, placeholder: 'Career goals, hobbies, a job advert you are applying for…' },
    ],
  },
  {
    id: 'cover-letter',
    name: 'Cover Letter Writing',
    price: 30,
    icon: 'fa-envelope-o',
    desc: 'A tailored cover letter for a specific job, written to match the advert and your experience.',
    needs: [
      'Your contact details',
      'The job title and company name',
      'The job advert or its main requirements',
      'Your relevant experience and skills',
    ],
    fields: [
      ...contactFields,
      { key: 'jobTitle', label: 'Job title you are applying for', type: 'text', required: true, max: 120 },
      { key: 'company', label: 'Company / organisation', type: 'text', required: true, max: 120 },
      { key: 'recipient', label: 'Hiring manager name and company address', type: 'textarea', required: false, max: 400, placeholder: 'Leave blank if not known' },
      { key: 'jobAdvert', label: 'Job advert or key requirements', type: 'textarea', required: true, max: 4000, placeholder: 'Paste the advert or list what they are looking for' },
      { key: 'background', label: 'Your relevant experience and skills', type: 'textarea', required: true, max: 3000 },
    ],
  },
  {
    id: 'application-letter',
    name: 'Job Application Letter',
    price: 30,
    icon: 'fa-pencil-square-o',
    desc: 'A formal application letter for a job, internship, attachment or school admission.',
    needs: [
      'Your contact details',
      'What you are applying for and to whom',
      'Your qualifications and why you are a good fit',
    ],
    fields: [
      ...contactFields,
      { key: 'position', label: 'What you are applying for', type: 'text', required: true, max: 160, placeholder: 'e.g. Industrial attachment, Clerk position' },
      { key: 'recipient', label: 'Addressed to (name, title, organisation, address)', type: 'textarea', required: true, max: 400 },
      { key: 'background', label: 'Your qualifications and experience', type: 'textarea', required: true, max: 3000 },
      { key: 'extra', label: 'Anything else to mention', type: 'textarea', required: false, max: 1500, placeholder: 'Reference number, where you saw the advert, availability…' },
    ],
  },
  {
    id: 'resignation-letter',
    name: 'Resignation Letter',
    price: 30,
    icon: 'fa-sign-out',
    desc: 'A polite, professional resignation letter that keeps the relationship positive.',
    needs: [
      'Your name, role and employer',
      'Your manager’s name',
      'Your last working day and notice period',
    ],
    fields: [
      ...contactFields,
      { key: 'role', label: 'Your current job title', type: 'text', required: true, max: 120 },
      { key: 'employer', label: 'Employer and manager’s name', type: 'textarea', required: true, max: 400 },
      { key: 'lastDay', label: 'Last working day / notice period', type: 'text', required: true, max: 120 },
      { key: 'reason', label: 'Reason (optional) and anything to mention', type: 'textarea', required: false, max: 1500, placeholder: 'e.g. thanks for the opportunity, handover plans' },
    ],
  },
  {
    id: 'recommendation-letter',
    name: 'Recommendation / Reference Letter',
    price: 50,
    icon: 'fa-thumbs-o-up',
    desc: 'A recommendation letter written for the referee to review, sign and send.',
    needs: [
      'The referee’s name, title and organisation',
      'The person being recommended and how they know each other',
      'What the letter is for (job, school, visa)',
      'Strengths and examples to highlight',
    ],
    fields: [
      ...contactFields.map(f => (f.key === 'fullName' ? { ...f, label: 'Referee’s full name (the person signing)' } : f)),
      { key: 'refereeTitle', label: 'Referee’s title and organisation', type: 'text', required: true, max: 160 },
      { key: 'candidate', label: 'Person being recommended', type: 'text', required: true, max: 120 },
      { key: 'relationship', label: 'How the referee knows them and for how long', type: 'textarea', required: true, max: 800 },
      { key: 'purpose', label: 'What the letter is for', type: 'text', required: true, max: 200, placeholder: 'e.g. Masters admission, a job at XYZ Ltd' },
      { key: 'strengths', label: 'Strengths and examples', type: 'textarea', required: true, max: 3000 },
    ],
  },
  {
    id: 'official-letter',
    name: 'Official / Business Letter',
    price: 50,
    icon: 'fa-building-o',
    desc: 'Request, complaint, introduction, invitation or authorisation letters to offices, banks, schools and businesses.',
    needs: [
      'Who the letter is from and to',
      'The purpose of the letter',
      'Key facts: dates, amounts, reference numbers',
    ],
    fields: [
      ...contactFields,
      { key: 'organisation', label: 'Your organisation and title (optional)', type: 'text', required: false, max: 160 },
      { key: 'recipient', label: 'Addressed to (name, title, organisation, address)', type: 'textarea', required: true, max: 400 },
      { key: 'letterType', label: 'Type of letter', type: 'text', required: true, max: 120, placeholder: 'e.g. Request, complaint, introduction, invitation' },
      { key: 'content', label: 'What the letter should say', type: 'textarea', required: true, max: 4000, placeholder: 'Explain the situation and what you want. Include dates, amounts and reference numbers.' },
    ],
  },
  {
    id: 'custom-document',
    name: 'Other Documents',
    price: 100,
    icon: 'fa-files-o',
    desc: 'Any other written document: proposals, meeting minutes, notices, profiles, statements and more.',
    needs: [
      'What document you need and who it is for',
      'All the facts and points it should include',
      'Any format or length you prefer',
    ],
    fields: [
      ...contactFields,
      { key: 'documentType', label: 'Document you need', type: 'text', required: true, max: 160, placeholder: 'e.g. Meeting minutes, company profile, event notice' },
      { key: 'content', label: 'Details and points to include', type: 'textarea', required: true, max: 6000 },
      { key: 'style', label: 'Preferred format, tone or length', type: 'textarea', required: false, max: 800 },
    ],
  },
];

export function getDocumentType(id) {
  return DOCUMENT_TYPES.find(t => t.id === id) || null;
}
