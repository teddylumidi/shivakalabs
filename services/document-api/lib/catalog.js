/**
 * catalog.js — Single source of truth for paid document types.
 *
 * Imported by BOTH the Vercel API (prices are enforced server-side) and the
 * website (artifacts/shivakalabs/src/pages/documents/) so the price a
 * customer sees is the price they are charged.
 *
 * To add a document type, add one entry to DOCUMENT_TYPES:
 *   id        unique slug
 *   category  one of DOCUMENT_CATEGORIES ids
 *   format    'cv' | 'letter' | 'document' | 'any' — the layout Claude writes into
 *   price     whole Kenyan shillings
 *   guide     writing instructions for Claude
 *   needs     "What you'll need" list shown on the card
 *   fields    the order form. Field types: 'text', 'email', 'tel', 'textarea'
 * Then redeploy the API and republish the site.
 */

export const DOCUMENT_CATEGORIES = [
  { id: 'career',   name: 'Career',         icon: 'fa-briefcase',  desc: 'CVs, cover letters and job letters' },
  { id: 'letters',  name: 'Letters',        icon: 'fa-envelope-o', desc: 'Official, leave, invitation and authorisation letters' },
  { id: 'legal',    name: 'Legal',          icon: 'fa-balance-scale', desc: 'Affidavits, agreements, contracts and consents' },
  { id: 'business', name: 'Business',       icon: 'fa-line-chart', desc: 'Business plans, proposals, profiles and minutes' },
  { id: 'personal', name: 'Personal',       icon: 'fa-user',       desc: 'Speeches, eulogies, statements and other documents' },
];

// ── Shared field sets ──────────────────────────────────────────────────────
const contactFields = [
  { key: 'fullName', label: 'Full name', type: 'text', required: true, max: 80 },
  { key: 'phone', label: 'Phone number', type: 'tel', required: true, max: 30, placeholder: '07XX XXX XXX' },
  { key: 'email', label: 'Email address', type: 'email', required: true, max: 120 },
  { key: 'location', label: 'Town / address', type: 'text', required: false, max: 120, placeholder: 'e.g. Nairobi, Kenya' },
];

const party = (key, label) => ({
  key, label, type: 'textarea', required: true, max: 600,
  placeholder: 'Full name, ID number, P.O. Box / address and phone (for a company: name, registration number and address)',
});

const LEGAL_NOTE = 'Use standard Kenyan legal drafting: a clear title, the date and parties with their identification, numbered clauses with short headings, and execution blocks at the end with signature lines, names and witness lines. Do not cite statute sections or thresholds unless you are certain of them. Do not include legal advice or commentary in the document.';

// ── Document types ─────────────────────────────────────────────────────────
export const DOCUMENT_TYPES = [
  // Career
  {
    id: 'cv', category: 'career', format: 'cv',
    name: 'CV / Resume Writing', price: 100, icon: 'fa-file-text',
    desc: 'A professionally written, well-structured CV built from your details, ready to send to employers.',
    guide: 'Write a one- to two-page CV aimed at the target role. Lead with a 2–4 sentence professional summary. Order experience from most recent. Give each job 2–5 strong bullets starting with action verbs, quantified only where the customer gave numbers. Include referees only if provided.',
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
    id: 'cover-letter', category: 'career', format: 'letter',
    name: 'Cover Letter Writing', price: 30, icon: 'fa-envelope-o',
    desc: 'A tailored cover letter for a specific job, written to match the advert and your experience.',
    guide: "Write a one-page cover letter (3–4 body paragraphs) that connects the customer's experience to the job advert's requirements, for the named job and company.",
    needs: ['Your contact details', 'The job title and company name', 'The job advert or its main requirements', 'Your relevant experience and skills'],
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
    id: 'application-letter', category: 'career', format: 'letter',
    name: 'Job Application Letter', price: 30, icon: 'fa-pencil-square-o',
    desc: 'A formal application letter for a job, internship, attachment or school admission.',
    guide: 'Write a formal application letter in Kenyan business letter style with a clear "RE:" subject line, 3–4 body paragraphs and a courteous close.',
    needs: ['Your contact details', 'What you are applying for and to whom', 'Your qualifications and why you are a good fit'],
    fields: [
      ...contactFields,
      { key: 'position', label: 'What you are applying for', type: 'text', required: true, max: 160, placeholder: 'e.g. Industrial attachment, Clerk position' },
      { key: 'recipient', label: 'Addressed to (name, title, organisation, address)', type: 'textarea', required: true, max: 400 },
      { key: 'background', label: 'Your qualifications and experience', type: 'textarea', required: true, max: 3000 },
      { key: 'extra', label: 'Anything else to mention', type: 'textarea', required: false, max: 1500, placeholder: 'Reference number, where you saw the advert, availability…' },
    ],
  },
  {
    id: 'resignation-letter', category: 'career', format: 'letter',
    name: 'Resignation Letter', price: 30, icon: 'fa-sign-out',
    desc: 'A polite, professional resignation letter that keeps the relationship positive.',
    guide: 'Write a short, gracious resignation letter (2–3 paragraphs) stating the role, last working day or notice period, thanks, and an offer to help with handover. Keep any reason brief and positive.',
    needs: ['Your name, role and employer', 'Your manager’s name', 'Your last working day and notice period'],
    fields: [
      ...contactFields,
      { key: 'role', label: 'Your current job title', type: 'text', required: true, max: 120 },
      { key: 'employer', label: 'Employer and manager’s name', type: 'textarea', required: true, max: 400 },
      { key: 'lastDay', label: 'Last working day / notice period', type: 'text', required: true, max: 120 },
      { key: 'reason', label: 'Reason (optional) and anything to mention', type: 'textarea', required: false, max: 1500, placeholder: 'e.g. thanks for the opportunity, handover plans' },
    ],
  },
  {
    id: 'recommendation-letter', category: 'career', format: 'letter',
    name: 'Recommendation / Reference Letter', price: 50, icon: 'fa-thumbs-o-up',
    desc: 'A recommendation letter written for the referee to review, sign and send.',
    guide: "Write a recommendation letter from the referee (the customer) about the candidate, for the stated purpose. Include how and how long they know the candidate, specific strengths with examples, and a clear endorsement. Sign off with the referee's name and title.",
    needs: ['The referee’s name, title and organisation', 'The person being recommended and how they know each other', 'What the letter is for (job, school, visa)', 'Strengths and examples to highlight'],
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
    id: 'personal-statement', category: 'career', format: 'document',
    name: 'Personal Statement / Statement of Purpose', price: 200, icon: 'fa-graduation-cap',
    desc: 'A personal statement for university, scholarship or programme applications, in your own story.',
    guide: "Write a 500–800 word personal statement or statement of purpose in the first person, using only the customer's real experiences and goals. Title it with the programme name. Use sections only if the customer's brief asks for specific prompts; otherwise use one untitled section of paragraphs.",
    needs: ['The programme, school or scholarship', 'Any prompt or word limit', 'Your background, achievements and goals'],
    fields: [
      ...contactFields,
      { key: 'programme', label: 'Programme, school or scholarship', type: 'text', required: true, max: 200 },
      { key: 'prompt', label: 'Essay prompt and word limit (if any)', type: 'textarea', required: false, max: 1500 },
      { key: 'background', label: 'Your story: background, achievements, motivation and goals', type: 'textarea', required: true, max: 5000 },
    ],
  },

  // Letters
  {
    id: 'official-letter', category: 'letters', format: 'letter',
    name: 'Official / Business Letter', price: 50, icon: 'fa-building-o',
    desc: 'Request, complaint, introduction or notice letters to offices, banks, schools and businesses.',
    guide: 'Write a formal letter of the stated type in Kenyan business letter style with a "RE:" subject line, clear purpose, the key facts provided and a specific request or next step.',
    needs: ['Who the letter is from and to', 'The purpose of the letter', 'Key facts: dates, amounts, reference numbers'],
    fields: [
      ...contactFields,
      { key: 'organisation', label: 'Your organisation and title (optional)', type: 'text', required: false, max: 160 },
      { key: 'recipient', label: 'Addressed to (name, title, organisation, address)', type: 'textarea', required: true, max: 400 },
      { key: 'letterType', label: 'Type of letter', type: 'text', required: true, max: 120, placeholder: 'e.g. Request, complaint, introduction, notice' },
      { key: 'content', label: 'What the letter should say', type: 'textarea', required: true, max: 4000, placeholder: 'Explain the situation and what you want. Include dates, amounts and reference numbers.' },
    ],
  },
  {
    id: 'leave-letter', category: 'letters', format: 'letter',
    name: 'Leave Application Letter', price: 30, icon: 'fa-calendar',
    desc: 'Annual, sick, maternity, study or compassionate leave requests to your employer.',
    guide: 'Write a short, formal leave application letter with a "RE:" subject line stating the type of leave, exact dates and number of days, handover arrangements and contact while away.',
    needs: ['Your role and employer', 'Type of leave and dates', 'Who will cover your work'],
    fields: [
      ...contactFields,
      { key: 'role', label: 'Your job title and department', type: 'text', required: true, max: 160 },
      { key: 'recipient', label: 'Addressed to (name, title, organisation)', type: 'textarea', required: true, max: 400 },
      { key: 'leave', label: 'Type of leave, dates and number of days', type: 'text', required: true, max: 200, placeholder: 'e.g. Annual leave, 2–13 December 2026 (10 working days)' },
      { key: 'content', label: 'Reason and handover arrangements', type: 'textarea', required: false, max: 1500 },
    ],
  },
  {
    id: 'invitation-letter', category: 'letters', format: 'letter',
    name: 'Visa Invitation Letter', price: 100, icon: 'fa-plane',
    desc: 'An invitation letter for a visitor’s visa application, with the host’s and visitor’s details.',
    guide: "Write a formal visa invitation letter from the host (the customer) to the embassy or consulate: the host's details and status, the visitor's full details and passport number, the relationship, purpose and exact dates of the visit, where the visitor will stay, who pays for the trip, and an assurance that the visitor will leave on time. Address it to the Visa Section of the named embassy.",
    needs: ['Host’s details and status in the country', 'Visitor’s full name, date of birth and passport number', 'Purpose and dates of the visit', 'Accommodation and who pays'],
    fields: [
      ...contactFields.map(f => (f.key === 'fullName' ? { ...f, label: 'Host’s full name (the person inviting)' } : f)),
      { key: 'hostStatus', label: 'Host’s status and ID/passport number', type: 'text', required: true, max: 200, placeholder: 'e.g. Kenyan citizen, ID 12345678; or resident permit details' },
      { key: 'embassy', label: 'Embassy / consulate the letter is for', type: 'text', required: true, max: 200 },
      { key: 'visitor', label: 'Visitor’s full name, date of birth, nationality and passport number', type: 'textarea', required: true, max: 600 },
      { key: 'visit', label: 'Relationship, purpose and dates of the visit', type: 'textarea', required: true, max: 1500 },
      { key: 'logistics', label: 'Accommodation and who covers costs', type: 'textarea', required: true, max: 800 },
    ],
  },
  {
    id: 'authorisation-letter', category: 'letters', format: 'letter',
    name: 'Authorisation Letter', price: 50, icon: 'fa-check-square-o',
    desc: 'Authorise someone to collect documents, act or transact on your behalf.',
    guide: "Write a clear authorisation letter: who authorises whom (with ID numbers), exactly what they may do, any limits and the validity period, and a request to accept the authorised person's actions. Include signature lines for both people.",
    needs: ['Your ID number', 'The authorised person’s name and ID number', 'Exactly what they can do, and for how long'],
    fields: [
      ...contactFields,
      { key: 'idNumber', label: 'Your ID or passport number', type: 'text', required: true, max: 40 },
      { key: 'recipient', label: 'Addressed to (organisation and branch)', type: 'textarea', required: true, max: 400 },
      { key: 'agent', label: 'Authorised person’s full name and ID number', type: 'text', required: true, max: 200 },
      { key: 'scope', label: 'What they are authorised to do, and until when', type: 'textarea', required: true, max: 1500 },
    ],
  },

  // Legal
  {
    id: 'affidavit', category: 'legal', format: 'document',
    name: 'Affidavit (Sworn Statement)', price: 200, icon: 'fa-gavel',
    desc: 'A general affidavit, e.g. name confirmation, loss of documents or marital status, ready to be sworn.',
    guide: `${LEGAL_NOTE} Use the standard Kenyan affidavit format: title "REPUBLIC OF KENYA" with subtitle "AFFIDAVIT" (and an "IN THE MATTER OF…" line describing the purpose). First section opens: "I, [name], of [address], a resident of [town], holder of National ID No. [number], do hereby make oath and state as follows:". Then numbered paragraphs each starting "That…", beginning with "That I am an adult of sound mind and the deponent herein, hence competent to swear this affidavit." and ending with "That what is deponed to herein is true to the best of my knowledge, information and belief." Final section is the jurat: "SWORN at ________ by the said [name] this ____ day of __________ 20__", a signature line labelled DEPONENT, then "BEFORE ME" and a signature line labelled COMMISSIONER FOR OATHS.`,
    needs: ['Your full name, ID number and address', 'What the affidavit is for', 'The facts you are swearing to'],
    fields: [
      ...contactFields,
      { key: 'idNumber', label: 'Your ID number', type: 'text', required: true, max: 40 },
      { key: 'purpose', label: 'What the affidavit is for', type: 'text', required: true, max: 200, placeholder: 'e.g. Confirming two names refer to one person; loss of a document' },
      { key: 'facts', label: 'The facts to state (one per line)', type: 'textarea', required: true, max: 4000 },
    ],
    legal: true,
  },
  {
    id: 'tenancy-agreement', category: 'legal', format: 'document',
    name: 'Tenancy / Lease Agreement', price: 300, icon: 'fa-home',
    desc: 'A residential or commercial tenancy agreement between landlord and tenant.',
    guide: `${LEGAL_NOTE} Cover: parties, premises, term and start date, rent, deposit and payment terms (including M-Pesa/bank details if given), utilities and service charges, use of premises, repairs and maintenance, landlord access, no subletting without consent, rent review, notice and termination, return of deposit, and execution blocks for landlord and tenant with witnesses.`,
    needs: ['Landlord’s and tenant’s details (name, ID, address)', 'The premises and its location', 'Rent, deposit, start date and term', 'Any special terms'],
    fields: [
      ...contactFields,
      party('landlord', 'Landlord details'),
      party('tenant', 'Tenant details'),
      { key: 'premises', label: 'Premises (house/shop number, building, plot, location) and use', type: 'textarea', required: true, max: 600 },
      { key: 'terms', label: 'Rent, deposit, start date, term, notice period and special terms', type: 'textarea', required: true, max: 3000 },
    ],
    legal: true,
  },
  {
    id: 'vehicle-sale-agreement', category: 'legal', format: 'document',
    name: 'Motor Vehicle Sale Agreement', price: 300, icon: 'fa-car',
    desc: 'A sale agreement for a car, motorbike or truck, including NTSA transfer terms.',
    guide: `${LEGAL_NOTE} Cover: parties (seller and buyer), full vehicle description (make, model, year, colour, registration, chassis and engine numbers, logbook), price and payment terms, transfer of ownership through NTSA and who pays the transfer fees, delivery/possession date, the seller's warranty of good title free of encumbrances, the vehicle sold in its current condition as inspected, liability for offences and claims before and after handover, and execution blocks with witnesses.`,
    needs: ['Seller’s and buyer’s details', 'Vehicle make, model, registration, chassis and engine numbers', 'Price and how it will be paid', 'Handover date'],
    fields: [
      ...contactFields,
      party('seller', 'Seller details'),
      party('buyer', 'Buyer details'),
      { key: 'vehicle', label: 'Vehicle details (make, model, year, colour, reg., chassis and engine numbers)', type: 'textarea', required: true, max: 800 },
      { key: 'terms', label: 'Price, payment terms, handover date and anything else agreed', type: 'textarea', required: true, max: 3000 },
    ],
    legal: true,
  },
  {
    id: 'sale-agreement', category: 'legal', format: 'document',
    name: 'Sale Agreement (Goods / Assets)', price: 250, icon: 'fa-handshake-o',
    desc: 'For selling equipment, livestock, furniture, a business stock or other movable assets.',
    guide: `${LEGAL_NOTE} Cover: parties, description of the goods, price and payment terms, delivery and passing of ownership and risk, condition of goods, warranty of title, default and remedies, and execution blocks with witnesses.`,
    needs: ['Seller’s and buyer’s details', 'What is being sold', 'Price, payment and delivery terms'],
    fields: [
      ...contactFields,
      party('seller', 'Seller details'),
      party('buyer', 'Buyer details'),
      { key: 'goods', label: 'What is being sold (description, quantity, serial numbers)', type: 'textarea', required: true, max: 1500 },
      { key: 'terms', label: 'Price, payment, delivery and other terms', type: 'textarea', required: true, max: 3000 },
    ],
    legal: true,
  },
  {
    id: 'loan-agreement', category: 'legal', format: 'document',
    name: 'Personal Loan Agreement', price: 250, icon: 'fa-money',
    desc: 'Record a loan between individuals or businesses: amount, repayment and default terms.',
    guide: `${LEGAL_NOTE} Cover: parties (lender and borrower), principal amount in words and figures, disbursement, interest (if any), repayment schedule and method, early repayment, default and remedies, any security or guarantor, and execution blocks with witnesses.`,
    needs: ['Lender’s and borrower’s details', 'Amount, interest and repayment schedule', 'Any security or guarantor'],
    fields: [
      ...contactFields,
      party('lender', 'Lender details'),
      party('borrower', 'Borrower details'),
      { key: 'terms', label: 'Amount, interest, repayment dates and method, security or guarantor', type: 'textarea', required: true, max: 3000 },
    ],
    legal: true,
  },
  {
    id: 'employment-contract', category: 'legal', format: 'document',
    name: 'Employment Contract', price: 300, icon: 'fa-id-badge',
    desc: 'A written contract of employment covering role, pay, hours, leave and termination.',
    guide: `${LEGAL_NOTE} Cover: parties, job title and duties, start date and probation, place of work, hours, salary and payment date, statutory deductions (PAYE, NSSF, SHIF, Housing Levy) in general terms, leave entitlements, confidentiality, termination and notice, disciplinary matters, and execution blocks for employer and employee.`,
    needs: ['Employer’s and employee’s details', 'Job title, duties and start date', 'Salary, hours, leave and notice period'],
    fields: [
      ...contactFields,
      party('employer', 'Employer details'),
      party('employee', 'Employee details'),
      { key: 'terms', label: 'Job title, duties, start date, probation, salary, hours, leave, notice period', type: 'textarea', required: true, max: 3000 },
    ],
    legal: true,
  },
  {
    id: 'service-agreement', category: 'legal', format: 'document',
    name: 'Service / Freelance Contract', price: 300, icon: 'fa-file-text-o',
    desc: 'Agree scope, payment, timelines and ownership of work with a client or contractor.',
    guide: `${LEGAL_NOTE} Cover: parties, scope of services and deliverables, timelines, fees and payment schedule, revisions, client obligations, ownership of work and licence, confidentiality, limitation of liability, termination, dispute resolution, and execution blocks.`,
    needs: ['Your and your client’s details', 'Scope of work and deliverables', 'Fees, payment schedule and deadlines'],
    fields: [
      ...contactFields,
      party('provider', 'Service provider details'),
      party('client', 'Client details'),
      { key: 'terms', label: 'Services, deliverables, timelines, fees, payment schedule and other terms', type: 'textarea', required: true, max: 3500 },
    ],
    legal: true,
  },
  {
    id: 'nda', category: 'legal', format: 'document',
    name: 'Non-Disclosure Agreement (NDA)', price: 300, icon: 'fa-user-secret',
    desc: 'Protect confidential information shared with a partner, employee or investor.',
    guide: `${LEGAL_NOTE} Cover: parties, whether mutual or one-way, purpose, definition of confidential information, exclusions, obligations, permitted disclosures, duration, return or destruction of information, remedies, governing law (Kenya), and execution blocks.`,
    needs: ['Both parties’ details', 'Why information is being shared', 'Mutual or one-way, and for how long'],
    fields: [
      ...contactFields,
      party('partyA', 'First party (disclosing) details'),
      party('partyB', 'Second party (receiving) details'),
      { key: 'terms', label: 'Purpose, mutual or one-way, duration and anything else', type: 'textarea', required: true, max: 2000 },
    ],
    legal: true,
  },
  {
    id: 'power-of-attorney', category: 'legal', format: 'document',
    name: 'Power of Attorney', price: 300, icon: 'fa-key',
    desc: 'Appoint someone to act for you, generally or for specific matters.',
    guide: `${LEGAL_NOTE} Cover: the donor and the attorney with identification, whether general or specific, the powers granted in clear numbered items, duration and revocation, ratification of the attorney's lawful acts, and execution blocks for the donor with a witness and an attestation line for an advocate or commissioner.`,
    needs: ['Your details and ID number', 'Your attorney’s details and ID number', 'Exactly which powers, and for how long'],
    fields: [
      ...contactFields,
      party('donor', 'Your details (the donor)'),
      party('attorney', 'Attorney details (the person you appoint)'),
      { key: 'powers', label: 'Powers granted (general or specific matters) and duration', type: 'textarea', required: true, max: 3000 },
    ],
    legal: true,
  },
  {
    id: 'travel-consent', category: 'legal', format: 'document',
    name: 'Parental Consent for Child Travel', price: 150, icon: 'fa-child',
    desc: 'Consent for a minor to travel with one parent, a relative or a group.',
    guide: `${LEGAL_NOTE} Title it "PARENTAL CONSENT FOR TRAVEL OF A MINOR". Cover: the consenting parent(s) with ID numbers and contacts, the child's full name, date of birth and passport or birth certificate number, the accompanying adult with passport number, destination(s), travel dates, purpose, permission for emergency medical treatment if requested, and signature blocks for each parent with a commissioner or witness line.`,
    needs: ['Parents’ names, ID numbers and contacts', 'Child’s name, date of birth and passport number', 'Who the child travels with, where and when'],
    fields: [
      ...contactFields,
      party('parents', 'Consenting parent(s) details'),
      { key: 'child', label: 'Child’s full name, date of birth and passport or birth certificate number', type: 'textarea', required: true, max: 600 },
      { key: 'trip', label: 'Accompanying adult, destination, dates and purpose', type: 'textarea', required: true, max: 1500 },
    ],
    legal: true,
  },
  {
    id: 'demand-letter', category: 'legal', format: 'letter',
    name: 'Demand Letter', price: 200, icon: 'fa-exclamation-triangle',
    desc: 'A firm, formal demand for money owed or an obligation that hasn’t been met.',
    guide: 'Write a firm, professional demand letter: the facts and basis of the claim, the exact amount or action demanded, payment details if given, a clear deadline (use the one given, otherwise 14 days), and that further action may follow without further notice if not met. No threats beyond lawful action.',
    needs: ['Who owes and their address', 'What is owed and why', 'Deadline and how to pay'],
    fields: [
      ...contactFields,
      { key: 'recipient', label: 'Recipient’s name and address', type: 'textarea', required: true, max: 400 },
      { key: 'claim', label: 'What is owed, why, and supporting dates/invoices', type: 'textarea', required: true, max: 3000 },
      { key: 'deadline', label: 'Deadline and payment details', type: 'text', required: false, max: 300 },
    ],
    legal: true,
  },

  // Business
  {
    id: 'business-plan', category: 'business', format: 'document',
    name: 'Business Plan', price: 500, icon: 'fa-line-chart',
    desc: 'A structured business plan for a loan, grant, investor or your own planning.',
    guide: 'Write a complete business plan with sections: Executive Summary, Business Description, Products/Services, Market Analysis, Competition, Marketing and Sales Strategy, Operations, Management, Financial Plan (startup costs, revenue projections and break-even using only the figures given; describe what to fill in if figures are missing), Risks and Mitigation, and Funding Request if applicable.',
    needs: ['What the business does and where', 'Customers and competitors', 'Startup costs, prices and expected sales', 'What the plan is for (loan, grant, investor)'],
    fields: [
      ...contactFields,
      { key: 'business', label: 'Business name, what it does and where', type: 'textarea', required: true, max: 1500 },
      { key: 'market', label: 'Customers, competitors and how you will sell', type: 'textarea', required: true, max: 2500 },
      { key: 'finance', label: 'Costs, prices, expected sales and funding needed', type: 'textarea', required: true, max: 2500 },
      { key: 'purpose', label: 'What the plan is for and any required format', type: 'text', required: false, max: 300 },
    ],
  },
  {
    id: 'business-proposal', category: 'business', format: 'document',
    name: 'Business Proposal', price: 300, icon: 'fa-file-powerpoint-o',
    desc: 'A proposal to win a client, contract or partnership.',
    guide: 'Write a persuasive business proposal with: Introduction, Understanding of the Need, Proposed Solution, Scope and Deliverables, Timeline, Pricing (only figures given), Why Us, and Next Steps.',
    needs: ['Who it is for and what they need', 'What you are offering', 'Pricing and timelines'],
    fields: [
      ...contactFields,
      { key: 'company', label: 'Your business name and what you do', type: 'text', required: true, max: 200 },
      { key: 'client', label: 'Who the proposal is for and what they need', type: 'textarea', required: true, max: 1500 },
      { key: 'offer', label: 'Your solution, deliverables, timeline and pricing', type: 'textarea', required: true, max: 3000 },
    ],
  },
  {
    id: 'company-profile', category: 'business', format: 'document',
    name: 'Company Profile', price: 300, icon: 'fa-building',
    desc: 'A professional company profile for tenders, clients and partners.',
    guide: 'Write a company profile with: About Us, Vision and Mission, Core Values, Products/Services, Key Clients or Projects (only those given), Team, Registrations and Compliance (only those given), and Contact Details.',
    needs: ['Company details and history', 'Services and past clients or projects', 'Team, registrations and contacts'],
    fields: [
      ...contactFields,
      { key: 'company', label: 'Company name, year founded, location and history', type: 'textarea', required: true, max: 1500 },
      { key: 'services', label: 'Products/services, key clients or projects', type: 'textarea', required: true, max: 2500 },
      { key: 'extra', label: 'Vision, mission, team, registrations (e.g. KRA, NCA, AGPO)', type: 'textarea', required: false, max: 2000 },
    ],
  },
  {
    id: 'meeting-minutes', category: 'business', format: 'document',
    name: 'Meeting Minutes', price: 100, icon: 'fa-list-alt',
    desc: 'Clean, formal minutes for chama, board, committee or staff meetings.',
    guide: 'Write formal minutes: title with the group name, meeting type, date, time and venue; Members Present, Absent with Apology, In Attendance; then numbered minutes (e.g. MIN 01/2026) for each agenda item with discussion and resolutions; Any Other Business; date of next meeting; adjournment time; and signature lines for Chairperson and Secretary.',
    needs: ['Group name, date, time and venue', 'Who attended', 'Agenda items, discussions and resolutions'],
    fields: [
      ...contactFields,
      { key: 'meeting', label: 'Group name, meeting type, date, time and venue', type: 'text', required: true, max: 300 },
      { key: 'attendance', label: 'Present, absent with apology, in attendance', type: 'textarea', required: true, max: 1500 },
      { key: 'notes', label: 'Agenda items, discussions, resolutions and next meeting', type: 'textarea', required: true, max: 5000 },
    ],
  },

  // Personal
  {
    id: 'eulogy', category: 'personal', format: 'document',
    name: 'Eulogy / Obituary', price: 150, icon: 'fa-heart-o',
    desc: 'A respectful eulogy or life history for a funeral programme or memorial service.',
    guide: 'Write a warm, respectful eulogy or life history using only the facts given: early life, education, career, family, faith and community life, and a closing tribute. Use sections such as Early Life, Education and Career, Family, and Tribute.',
    needs: ['Full name, dates and places of birth and death', 'Life story: family, education, work, faith', 'Family members to mention'],
    fields: [
      ...contactFields,
      { key: 'deceased', label: 'Full name, date and place of birth and of death', type: 'textarea', required: true, max: 600 },
      { key: 'story', label: 'Life story: family, education, work, faith, community, what they will be remembered for', type: 'textarea', required: true, max: 5000 },
    ],
  },
  {
    id: 'speech', category: 'personal', format: 'document',
    name: 'Speech Writing', price: 150, icon: 'fa-microphone',
    desc: 'Wedding, graduation, retirement, launch or school event speeches.',
    guide: 'Write a speech for the occasion, audience and length given, ready to read aloud: a strong opening, the key points and stories provided, and a memorable close. Title it with the occasion.',
    needs: ['The occasion and audience', 'Key points, names and stories', 'Length in minutes'],
    fields: [
      ...contactFields,
      { key: 'occasion', label: 'Occasion, your role and the audience', type: 'text', required: true, max: 300 },
      { key: 'content', label: 'Key points, names, stories and tone', type: 'textarea', required: true, max: 4000 },
      { key: 'length', label: 'Length (minutes)', type: 'text', required: false, max: 40 },
    ],
  },
  {
    id: 'custom-document', category: 'personal', format: 'any',
    name: 'Other Documents', price: 100, icon: 'fa-files-o',
    desc: 'Any other written document: notices, reports, profiles, statements and more.',
    guide: 'Write the document the customer asked for. Use write_letter if it is a letter, otherwise write_document with a clear title and logical sections.',
    needs: ['What document you need and who it is for', 'All the facts and points it should include', 'Any format or length you prefer'],
    fields: [
      ...contactFields,
      { key: 'documentType', label: 'Document you need', type: 'text', required: true, max: 160, placeholder: 'e.g. Event notice, project report, church announcement' },
      { key: 'content', label: 'Details and points to include', type: 'textarea', required: true, max: 6000 },
      { key: 'style', label: 'Preferred format, tone or length', type: 'textarea', required: false, max: 800 },
    ],
  },
];

/**
 * Official records we never produce, because a written version would
 * be a forgery. Checked against the requested document name.
 */
export const BLOCKED_DOCUMENTS = /\b(pay ?slips?|bank statements?|m-?pesa statements?|certificates? of good conduct|kcse|kcpe|result slips?|transcripts?|(degree|diploma|birth|death|marriage|clearance|tax compliance|medical) certificates?|sick (note|sheet)|medical (report|note)|national id|id card|passports?|title deeds?|log ?books?|receipts?)\b/i;

export function getDocumentType(id) {
  return DOCUMENT_TYPES.find(t => t.id === id) || null;
}

export function typesInCategory(categoryId) {
  return DOCUMENT_TYPES.filter(t => t.category === categoryId);
}

// ── Passport photo (not written by AI; priced and verified the same way) ───
export const PHOTO_PRODUCT = { id: 'passport-photo', name: 'Passport Photo', price: 50 };

/**
 * Photo sizes. Kenya passport/visa: 50 × 50 mm on a white background
 * (Kenya Embassy guidance). Head height is the share of the photo height
 * from chin to top of hair.
 */
export const PHOTO_SIZES = [
  { id: 'ke-passport', name: 'Kenya passport / visa', widthMm: 50, heightMm: 50, head: 0.62, note: 'Kenya requires a white background.' },
  { id: 'standard-35x45', name: 'Standard 35 × 45 mm', widthMm: 35, heightMm: 45, head: 0.72, note: 'Common for jobs, schools, Schengen and UK forms.' },
  { id: 'us-2x2', name: 'US passport / visa 2 × 2 in', widthMm: 51, heightMm: 51, head: 0.6, note: 'Requires a white or off-white background.' },
];

export const PHOTO_BACKGROUNDS = [
  { id: 'white', name: 'White', hex: '#ffffff' },
  { id: 'off-white', name: 'Off-white', hex: '#f2f2ee' },
  { id: 'light-blue', name: 'Light blue', hex: '#cfe3f5' },
  { id: 'blue', name: 'Blue', hex: '#3a6fb0' },
  { id: 'light-grey', name: 'Light grey', hex: '#d9d9d9' },
  { id: 'red', name: 'Red', hex: '#c62828' },
];
