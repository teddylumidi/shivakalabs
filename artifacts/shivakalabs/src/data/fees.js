/**
 * fees.js — Prices for the eCitizen cost checker ("What will it cost?").
 *
 * Each option has:
 *   price  what ShivakaLabs charges, from the ShivakaLabs price list
 *   gov    the official fee paid to the government body, in KSh (0 = free, null = varies/not split)
 *   mode   how the two combine:
 *            'plus'      price is our service fee; the government fee is paid on top
 *            'included'  price already includes the government fee (an all-in price)
 *            'free'      the government charges nothing; price is the whole cost
 *   govLabel (optional) overrides the group's label, e.g. a CRB agency fee
 *
 * Government fees were checked on FEES_CHECKED. Update `gov` when a fee
 * changes; the page, homepage price list and WhatsApp messages follow.
 */

export const FEES_CHECKED = '2 November 2026';

const SRC = {
  immigration: { label: 'immigration.go.ke', url: 'https://immigration.go.ke/type-and-fees/' },
  kra: { label: 'kra.go.ke', url: 'https://www.kra.go.ke/' },
  ntsa: { label: 'NTSA via eCitizen', url: 'https://ntsa.go.ke/' },
  brs: { label: 'BRS fee schedule', url: 'https://brs.go.ke/' },
  edu: { label: 'HELB, KUCCPS and KMTC', url: 'https://www.helb.co.ke/' },
  tsc: { label: 'tsc.go.ke', url: 'https://tsc.go.ke/index.php/teacher-registration' },
  ecitizen: { label: 'eCitizen', url: 'https://accounts.ecitizen.go.ke/' },
};

export const FEE_GROUPS = [
  {
    id: 'passport', name: 'Passport', source: SRC.immigration,
    govLabel: 'Government fee (Immigration, paid on eCitizen)',
    note: 'You attend one biometrics appointment at an immigration office or embassy. We fill the form, book the slot and track the passport for you.',
    options: [
      { id: 'passport-34', name: '34-page passport', detail: 'Ordinary, A series', price: 500, gov: 7550, mode: 'plus',
        needs: ['National ID (and birth certificate for first-time applicants)', 'Parents’ ID copies', 'Recommender’s details', 'Passport photo (we can make one)'] },
      { id: 'passport-50', name: '50-page passport', detail: 'Ordinary, B series', price: 500, gov: 9550, mode: 'plus',
        needs: ['National ID (and birth certificate for first-time applicants)', 'Parents’ ID copies', 'Recommender’s details', 'Passport photo (we can make one)'] },
      { id: 'passport-66', name: '66-page passport', detail: 'Ordinary, C series', price: 500, gov: 12050, mode: 'plus',
        needs: ['National ID (and birth certificate for first-time applicants)', 'Parents’ ID copies', 'Recommender’s details', 'Passport photo (we can make one)'] },
      { id: 'passport-lost', name: 'Lost passport replacement', detail: 'Replaces a lost passport', price: 500, gov: 20050, mode: 'plus',
        needs: ['Police abstract for the lost passport', 'National ID', 'Copy or number of the lost passport, if you have it'] },
      { id: 'passport-mutilated', name: 'Damaged passport replacement', detail: 'Replaces a damaged passport', price: 500, gov: 20050, mode: 'plus',
        needs: ['The damaged passport', 'National ID'] },
      { id: 'temporary-permit', name: 'Temporary permit', detail: 'Travel within East Africa', price: 500, gov: 1050, mode: 'plus',
        needs: ['National ID', 'Passport photo', 'Travel details'] },
    ],
  },
  {
    id: 'kra', name: 'KRA', source: SRC.kra,
    govLabel: 'Government fee (KRA)',
    note: 'KRA does not charge for these services. You only pay our fee, and we send your certificate or acknowledgement receipt on WhatsApp.',
    options: [
      { id: 'kra-pin', name: 'KRA PIN registration', detail: 'New individual PIN on iTax', price: 200, gov: 0, mode: 'free',
        needs: ['National ID number', 'Phone number and an email you can open'] },
      { id: 'kra-pin-company', name: 'KRA PIN for a company', detail: 'PIN for a registered company', price: 500, gov: 0, mode: 'free',
        needs: ['Certificate of incorporation and CR12', 'Directors’ KRA PINs and IDs', 'Company email and phone'] },
      { id: 'kra-nil-return', name: 'Nil return', detail: 'For a year with no income', price: 50, gov: 0, mode: 'free',
        needs: ['KRA PIN and iTax password (or registered email)'] },
      { id: 'kra-employment-return', name: 'P9 income tax return', detail: 'Annual return for employed people', price: 200, gov: 0, mode: 'free',
        needs: ['KRA PIN and iTax password (or registered email)', 'P9 form from each employer'] },
      { id: 'kra-withholding', name: 'Return with withholding certificate', detail: 'Income tax return claiming withholding tax', price: 300, gov: 0, mode: 'free',
        needs: ['KRA PIN and iTax password', 'Withholding tax certificates'] },
      { id: 'kra-tcc', name: 'Tax compliance certificate (TCC)', detail: 'Apply for a TCC', price: 100, gov: 0, mode: 'free',
        needs: ['KRA PIN and iTax password (or registered email)', 'All returns filed up to date'] },
      { id: 'kra-update', name: 'KRA PIN update', detail: 'Name, phone or address', price: 100, gov: 0, mode: 'free',
        needs: ['KRA PIN and iTax password (or registered email)', 'The new details'] },
      { id: 'kra-email', name: 'KRA email reset', detail: 'Move iTax to a new email', price: 100, gov: 0, mode: 'free',
        needs: ['KRA PIN', 'National ID number', 'The new email address'] },
      { id: 'kra-pin-retrieval', name: 'Lost KRA PIN retrieval', detail: 'Find your existing PIN', price: 100, gov: 0, mode: 'free',
        needs: ['National ID number', 'Access to the email registered on iTax, if possible'] },
      { id: 'kra-pwo', name: 'Switch to PIN without obligation', detail: 'No income? Stop filing nil returns', price: 100, gov: 0, mode: 'free',
        needs: ['KRA PIN and iTax password (or registered email)', 'Confirmation that you have no income or taxable activity'] },
    ],
  },
  {
    id: 'ntsa', name: 'NTSA', source: SRC.ntsa,
    govLabel: 'Government fee (NTSA, paid on eCitizen)',
    note: 'Driving tests and eye checks happen in person. We handle the online application, payment and booking.',
    options: [
      { id: 'ntsa-pdl', name: 'Provisional driving licence (PDL)', detail: 'For learner drivers, per class', price: 850, gov: 600, mode: 'included',
        needs: ['National ID', 'eCitizen login, or phone and email to create one', 'Driving school details'] },
      { id: 'ntsa-smart-dl', name: 'Smart driving licence', detail: 'First smart DL or upgrade from the red booklet', price: 3500, gov: 3050, mode: 'included',
        needs: ['National ID', 'Current driving licence number', 'Passport photo (we can make one)'] },
      { id: 'ntsa-renewal-1y', name: '1-year driving licence renewal', detail: 'Renew for one year', price: 650, gov: null, mode: 'included',
        needs: ['National ID', 'Driving licence number'] },
      { id: 'ntsa-tims', name: 'NTSA / TIMS account', detail: 'Create or recover your account', price: 200, gov: 0, mode: 'free',
        needs: ['National ID number', 'Phone number and email'] },
    ],
  },
  {
    id: 'education', name: 'HELB & KUCCPS', source: SRC.edu,
    govLabel: 'Fee to the institution',
    note: 'We apply on your behalf and send you the confirmation. Keep your payment reference — you need it for any changes later.',
    options: [
      { id: 'helb-account', name: 'HELB account creation', detail: 'Set up your HELB portal account', price: 100, gov: 0, mode: 'free',
        needs: ['National ID number', 'Phone number and email'] },
      { id: 'helb-loan', name: 'HELB loan application', detail: 'Without printing', price: 200, gov: 0, mode: 'free',
        needs: ['National ID and KCSE index number', 'Admission letter', 'Parents’ or guardians’ ID copies', 'HELB portal login'] },
      { id: 'helb-clearance', name: 'HELB clearance certificate', detail: 'Compliance certificate for jobs', price: 1200, gov: 0, mode: 'free',
        needs: ['National ID number', 'HELB portal login, or phone and email'] },
      { id: 'kuccps-first', name: 'First-time KUCCPS application', detail: 'Degree or diploma placement', price: 1750, gov: 1500, mode: 'included', govLabel: 'KUCCPS placement fee',
        needs: ['KCSE index number and year', 'Phone number and email', 'Your course choices'] },
      { id: 'kuccps-application', name: 'KUCCPS application / revision', detail: 'Returning applicant or course revision', price: 300, gov: null, mode: 'plus', govLabel: 'KUCCPS fee, if any',
        needs: ['KCSE index number', 'KUCCPS login and payment reference', 'Your course choices'] },
      { id: 'kmtc-application', name: 'KMTC account + application', detail: 'Certificate or diploma intake', price: 250, gov: 1000, mode: 'plus', govLabel: 'KMTC application fee',
        needs: ['KCSE result slip details', 'National ID or birth certificate', 'Phone number and email', 'Course and campus choices'] },
    ],
  },
  {
    id: 'business', name: 'Business', source: SRC.brs,
    govLabel: 'Government fee (BRS, paid on eCitizen)',
    note: 'We prepare and file everything on eCitizen and send you the certificate and documents as PDFs.',
    options: [
      { id: 'brs-business-name', name: 'Business name registration', detail: 'Sole proprietor or partnership', price: 1500, gov: 950, mode: 'included',
        needs: ['Three proposed names in order of preference', 'Owners’ IDs and KRA PINs', 'Business address, phone and email'] },
      { id: 'brs-company', name: 'Company registration', detail: 'Private limited company', price: 18700, gov: 10650, mode: 'included',
        needs: ['Three proposed names', 'Directors’ and shareholders’ IDs, KRA PINs and passport photos', 'Share split and registered address'] },
      { id: 'brs-linking', name: 'Business linking', detail: 'Link a business to your eCitizen account', price: 500, gov: 0, mode: 'free',
        needs: ['Business registration number', 'Owner’s or director’s ID and KRA PIN'] },
      { id: 'agpo', name: 'AGPO certificate', detail: 'Access to government tenders', price: 200, gov: 0, mode: 'free',
        needs: ['Business registration documents', 'Owners’ IDs and KRA PINs', 'Proof of youth, women or PWD status'] },
    ],
  },
  {
    id: 'public-service', name: 'TSC & civil service', source: SRC.tsc,
    govLabel: 'Government fee',
    note: 'We work on the official portals with your login and send you the confirmation or payslip as a PDF.',
    options: [
      { id: 'tsc-number', name: 'TSC number application', detail: 'New teacher registration', price: 500, gov: 1050, mode: 'plus', govLabel: 'TSC registration fee (eCitizen)',
        needs: ['National ID', 'Academic and professional certificates', 'Passport photo', 'Certificate of good conduct'] },
      { id: 'tsc-wealth', name: 'TSC wealth declaration', detail: 'Online declaration form', price: 200, gov: 0, mode: 'free',
        needs: ['TSC number and ID', 'Your income, assets and liabilities, and your spouse’s if married'] },
      { id: 'ghris-registration', name: 'GHRIS registration', detail: 'Civil servants’ HR portal', price: 250, gov: 0, mode: 'free',
        needs: ['Personal number', 'National ID', 'Phone number and email'] },
      { id: 'ghris-payslip', name: 'GHRIS payslip', detail: 'Download a payslip', price: 50, gov: 0, mode: 'free',
        needs: ['GHRIS login', 'The month you need'] },
      { id: 'ifmis-account', name: 'IFMIS account', detail: 'Supplier portal registration', price: 200, gov: 0, mode: 'free',
        needs: ['Business registration documents', 'KRA PIN', 'Bank details'] },
      { id: 'ifmis-services', name: 'IFMIS services', detail: 'Tenders, invoices and updates', price: 200, gov: 0, mode: 'free',
        needs: ['IFMIS login', 'The tender or document details'] },
    ],
  },
  {
    id: 'certificates', name: 'Certificates & accounts', source: SRC.ecitizen,
    govLabel: 'Government fee (paid on eCitizen)',
    note: 'We apply and pay on the official portal, then send you the certificate or confirmation on WhatsApp.',
    options: [
      { id: 'good-conduct', name: 'Certificate of good conduct', detail: 'Police clearance from DCI', price: 200, gov: 1050, mode: 'plus', govLabel: 'Government fee (DCI, paid on eCitizen)',
        needs: ['National ID number', 'eCitizen login, or phone and email to create one', 'You then give fingerprints at DCI or a Huduma Centre'] },
      { id: 'crb-metropol', name: 'Metropol CRB clearance', detail: 'CRB certificate for jobs or loans', price: 2600, gov: 2200, mode: 'included', govLabel: 'Metropol CRB fee',
        needs: ['National ID number', 'Phone number registered in your name'] },
      { id: 'ecitizen-account', name: 'eCitizen account', detail: 'Create a new account', price: 100, gov: 0, mode: 'free',
        needs: ['National ID number', 'Phone number and email'] },
      { id: 'ecitizen-recovery', name: 'eCitizen password recovery', detail: 'Get back into your account', price: 200, gov: 0, mode: 'free',
        needs: ['National ID number', 'Phone number or email on the account'] },
      { id: 'nssf-returns', name: 'NSSF returns', detail: 'Employer contribution returns', price: 200, gov: 0, mode: 'free',
        needs: ['NSSF employer number and login', 'Employees and contribution amounts'] },
    ],
  },
  {
    id: 'printing', name: 'Printing & writing help', source: null,
    govLabel: '',
    note: 'Prefer to write it yourself? We format, print and consult. For documents written for you, see the Documents section.',
    options: [
      { id: 'project-printing', name: 'Project printing', detail: 'Printing and binding, delivery arranged', price: 1000, gov: 0, mode: 'free',
        needs: ['Your final project file (Word or PDF)', 'Delivery location'] },
      { id: 'page-netting', name: 'Document page-netting', detail: 'Table of contents and page numbering', price: 300, gov: 0, mode: 'free',
        needs: ['Your document in Word format'] },
      { id: 'proposal-consult', name: 'Project or proposal consultation', detail: 'Guidance on your project or proposal', price: 500, gov: 0, mode: 'free',
        needs: ['Your topic and any guidelines from your school or funder', 'What you have written so far'] },
      { id: 'profile-articles', name: 'Company profile + articles of association', detail: 'Both documents together', price: 2500, gov: 0, mode: 'free',
        needs: ['Company details, services and clients', 'Directors, shareholders and share split'] },
    ],
  },
];

export const ALL_FEE_OPTIONS = FEE_GROUPS.flatMap(g => g.options.map(o => ({ ...o, group: g })));

export function feeOption(id) {
  return ALL_FEE_OPTIONS.find(o => o.id === id) || null;
}

/** What the customer pays in total. */
export const totalOf = o => (o.mode === 'plus' ? o.price + (o.gov || 0) : o.price);

/** Our service fee within the total, when it can be worked out. */
export const serviceFeeOf = o => (o.mode === 'included' ? (o.gov == null ? null : o.price - o.gov) : o.price);

export const ksh = n => `KSh ${n.toLocaleString('en-KE')}`;
