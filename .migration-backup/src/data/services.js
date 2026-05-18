/**
 * services.js — Single source of truth for all ShivakaLabs service data.
 * Imported by pages: eCitizen, WebDev, Design, Marketing, Home.
 */

export const WA_NUMBER = '254716358703';

/** Build a WhatsApp deep-link for a given service name */
export function waLink(serviceName) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
    'Hello, I need help with ' + serviceName
  )}`;
}

/** Convert a service name to a slug matching the image filenames */
export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// ── eCitizen Services ────────────────────────────────────────────────────────
export const ECITIZEN_SERVICES = [
  // National ID
  { name: 'New ID Application Assistance', desc: 'Help applying for your first national identity card online via eCitizen.', category: 'id', icon: 'fa-id-card' },
  { name: 'ID Replacement Assistance', desc: 'Assistance replacing a lost, damaged or defaced national ID card.', category: 'id', icon: 'fa-id-card' },
  { name: 'ID Correction / Amendment', desc: 'Help correcting name, date of birth or other details on your national ID.', category: 'id', icon: 'fa-id-card' },
  { name: 'Lost ID Replacement Guidance', desc: 'Step-by-step guidance for replacing a lost national identity card.', category: 'id', icon: 'fa-id-card' },
  { name: 'ID Status Follow-up', desc: 'Track and follow up on your national ID application status.', category: 'id', icon: 'fa-id-card' },
  { name: 'National Registration Form Assistance', desc: 'Assistance filling and submitting national registration forms correctly.', category: 'id', icon: 'fa-id-card' },
  // Birth
  { name: 'Birth Certificate Application', desc: 'Apply for a birth certificate through eCitizen with professional assistance.', category: 'birth', icon: 'fa-child' },
  { name: 'Birth Certificate Replacement', desc: 'Replace a lost or damaged birth certificate quickly and easily.', category: 'birth', icon: 'fa-child' },
  { name: 'Late Birth Registration Assistance', desc: 'Guidance for registering births that were not registered at the time of birth.', category: 'birth', icon: 'fa-child' },
  { name: 'Birth Certificate Follow-up', desc: 'Track and follow up on pending birth certificate applications.', category: 'birth', icon: 'fa-child' },
  { name: 'Birth Certificate Correction / Amendment', desc: 'Correct errors in names or dates on an existing birth certificate.', category: 'birth', icon: 'fa-child' },
  { name: 'Child Registration Guidance', desc: 'Full guidance on registering a newborn or young child.', category: 'birth', icon: 'fa-child' },
  // Death
  { name: 'Death Certificate Application', desc: 'Assistance applying for an official death certificate via eCitizen.', category: 'death', icon: 'fa-file-text' },
  { name: 'Death Certificate Replacement', desc: 'Replace a lost or damaged death certificate professionally.', category: 'death', icon: 'fa-file-text' },
  { name: 'Death Registration Assistance', desc: 'Guidance on registering a death and obtaining official documentation.', category: 'death', icon: 'fa-file-text' },
  { name: 'Death Certificate Follow-up', desc: 'Track pending death certificate applications and resolve delays.', category: 'death', icon: 'fa-file-text' },
  // Marriage
  { name: 'Marriage Certificate Application', desc: 'Apply for an official marriage certificate with guided assistance.', category: 'marriage', icon: 'fa-heart' },
  { name: 'Marriage Certificate Replacement', desc: 'Obtain a copy or replacement of a marriage certificate.', category: 'marriage', icon: 'fa-heart' },
  { name: 'Civil Marriage Booking Guidance', desc: 'Guidance on booking a civil marriage through official channels.', category: 'marriage', icon: 'fa-heart' },
  { name: 'Marriage Registration Support', desc: 'Support registering a marriage and obtaining required documents.', category: 'marriage', icon: 'fa-heart' },
  { name: 'Marriage Notice Submission Assistance', desc: 'Assistance submitting marriage notice through the official portal.', category: 'marriage', icon: 'fa-heart' },
  // Good Conduct
  { name: 'Certificate of Good Conduct Application', desc: 'Apply for a Certificate of Good Conduct (DCI) via eCitizen.', category: 'goodconduct', icon: 'fa-certificate' },
  { name: 'Good Conduct Renewal Guidance', desc: 'Guidance on renewing an expired Certificate of Good Conduct.', category: 'goodconduct', icon: 'fa-certificate' },
  { name: 'Good Conduct Booking Assistance', desc: 'Help booking a DCI fingerprint appointment for Good Conduct.', category: 'goodconduct', icon: 'fa-certificate' },
  { name: 'Good Conduct Status Follow-up', desc: 'Track and follow up on a pending Good Conduct application.', category: 'goodconduct', icon: 'fa-certificate' },
  // Passport
  { name: 'Passport Application Assistance', desc: 'Professional help applying for a new Kenyan passport online.', category: 'passport', icon: 'fa-book' },
  { name: 'Passport Renewal Assistance', desc: 'Renew your expiring or expired passport via eCitizen.', category: 'passport', icon: 'fa-book' },
  { name: 'Lost Passport Replacement Guidance', desc: 'Guidance on replacing a lost passport through official channels.', category: 'passport', icon: 'fa-book' },
  { name: 'Child Passport Application', desc: "Apply for a child's passport with full guidance and assistance.", category: 'passport', icon: 'fa-book' },
  { name: 'Passport Tracking Follow-up', desc: 'Track your passport application status and resolve delays.', category: 'passport', icon: 'fa-book' },
  { name: 'Immigration Form Filling Assistance', desc: 'Assistance completing immigration forms accurately.', category: 'passport', icon: 'fa-book' },
  { name: 'Travel Document Guidance', desc: 'Guidance on travel documents, emergency certificates and related services.', category: 'passport', icon: 'fa-book' },
  // Immigration
  { name: 'Visa Application Assistance', desc: 'Help applying for visa applications for foreign nationals.', category: 'immigration', icon: 'fa-plane' },
  { name: 'Foreign Nationals Services', desc: 'Assistance with permits, passes, and alien registration cards.', category: 'immigration', icon: 'fa-users' },
  { name: 'Permanent Residence Application', desc: 'Professional guidance on applying for permanent residence status in Kenya.', category: 'immigration', icon: 'fa-home' },
  { name: 'Kenya Citizenship Application', desc: 'Assistance applying for Kenyan citizenship through the official channels.', category: 'immigration', icon: 'fa-flag' },
  // NTSA
  { name: 'Smart Driving License Renewal', desc: 'Renew your smart driving licence via NTSA TIMS with assistance.', category: 'ntsa', icon: 'fa-car' },
  { name: 'Driving License Application Guidance', desc: 'Guidance applying for a new driving licence through NTSA.', category: 'ntsa', icon: 'fa-car' },
  { name: 'NTSA TIMS Account Help', desc: 'Create or recover your NTSA TIMS account for licence and vehicle services.', category: 'ntsa', icon: 'fa-car' },
  { name: 'Vehicle Search Assistance', desc: 'Search vehicle details and owner information via NTSA.', category: 'ntsa', icon: 'fa-car' },
  { name: 'Vehicle Transfer Assistance', desc: 'Guidance on transferring vehicle ownership through NTSA TIMS.', category: 'ntsa', icon: 'fa-car' },
  { name: 'Logbook Transfer Guidance', desc: 'Step-by-step assistance with logbook (ownership) transfer process.', category: 'ntsa', icon: 'fa-car' },
  { name: 'Vehicle Inspection Booking', desc: 'Book a vehicle inspection appointment through NTSA.', category: 'ntsa', icon: 'fa-car' },
  { name: 'Driving Test Booking Assistance', desc: 'Help booking a driving test slot through NTSA.', category: 'ntsa', icon: 'fa-car' },
  { name: 'Provisional Driving License Application', desc: 'Guidance applying for a provisional driving license through NTSA.', category: 'ntsa', icon: 'fa-car' },
  // KRA
  { name: 'KRA PIN Registration', desc: 'Register a new KRA Personal Identification Number on iTax.', category: 'kra', icon: 'fa-calculator' },
  { name: 'KRA PIN Retrieval', desc: 'Retrieve a forgotten or lost KRA PIN from the iTax portal.', category: 'kra', icon: 'fa-calculator' },
  { name: 'KRA PIN Update Email Change', desc: 'Update your KRA profile details including email address.', category: 'kra', icon: 'fa-calculator' },
  { name: 'Tax Compliance Certificate', desc: 'Apply for a Tax Compliance Certificate for tenders, jobs and loans.', category: 'kra', icon: 'fa-calculator' },
  { name: 'Nil Returns Filing', desc: 'File your KRA nil returns on time to avoid penalties.', category: 'kra', icon: 'fa-calculator' },
  { name: 'Business Tax Return Filing', desc: 'File business tax returns accurately and on time.', category: 'kra', icon: 'fa-calculator' },
  { name: 'VAT Filing Assistance', desc: 'Guidance filing VAT returns and managing VAT obligations.', category: 'kra', icon: 'fa-calculator' },
  { name: 'PAYE Filing Guidance', desc: 'Help filing PAYE for employers through the iTax portal.', category: 'kra', icon: 'fa-calculator' },
  { name: 'KRA Password Reset', desc: 'Reset your iTax password and regain access to your account.', category: 'kra', icon: 'fa-calculator' },
  { name: 'iTax Account Support', desc: 'General support navigating and using the KRA iTax portal.', category: 'kra', icon: 'fa-calculator' },
  // SHA / NHIF
  { name: 'SHA Registration Assistance', desc: 'Register on the Social Health Authority (SHA) portal.', category: 'sha', icon: 'fa-medkit' },
  { name: 'SHIF Registration Assistance', desc: 'Register on the Social Health Insurance Fund (SHIF) portal.', category: 'sha', icon: 'fa-medkit' },
  { name: 'Dependant Addition Support', desc: 'Add dependants to your health insurance account online.', category: 'sha', icon: 'fa-medkit' },
  { name: 'Benefit Verification Assistance', desc: 'Verify your health cover benefits and entitlements online.', category: 'sha', icon: 'fa-medkit' },
  // NSSF
  { name: 'NSSF Registration Assistance', desc: 'Register for the National Social Security Fund (NSSF) online.', category: 'nssf', icon: 'fa-shield' },
  { name: 'NSSF Number Retrieval', desc: 'Retrieve your NSSF number from the NSSF portal.', category: 'nssf', icon: 'fa-shield' },
  { name: 'NSSF Statement Guidance', desc: 'Access and download your NSSF benefits statement online.', category: 'nssf', icon: 'fa-shield' },
  { name: 'Employer Employee NSSF Registration', desc: 'Register as an employer or employee on the NSSF portal.', category: 'nssf', icon: 'fa-shield' },
  // HELB
  { name: 'HELB Application Guidance', desc: 'Apply for a HELB student loan through the HELB portal.', category: 'helb', icon: 'fa-graduation-cap' },
  { name: 'HELB Portal Account Setup', desc: 'Create and set up your HELB portal account.', category: 'helb', icon: 'fa-graduation-cap' },
  { name: 'HELB Compliance Certificate Guidance', desc: 'Obtain a HELB compliance certificate for employment or tenders.', category: 'helb', icon: 'fa-graduation-cap' },
  { name: 'HELB Clearance Assistance', desc: 'Clear your HELB loan status and obtain clearance documentation.', category: 'helb', icon: 'fa-graduation-cap' },
  // Business
  { name: 'Business Name Search', desc: 'Search for business name availability on the BRS portal.', category: 'business', icon: 'fa-building' },
  { name: 'Business Name Registration', desc: 'Register your business name on the Business Registration Service.', category: 'business', icon: 'fa-building' },
  { name: 'Sole Proprietorship Registration', desc: 'Register a sole proprietorship business professionally.', category: 'business', icon: 'fa-building' },
  { name: 'Company Registration Assistance', desc: 'Full assistance registering a limited company in Kenya.', category: 'business', icon: 'fa-building' },
  { name: 'CR12 Application Guidance', desc: 'Apply for a CR12 (official company search certificate) from BRS.', category: 'business', icon: 'fa-building' },
  { name: 'Annual Returns Filing Guidance', desc: 'File your company annual returns on time to remain compliant.', category: 'business', icon: 'fa-building' },
  // Land & Court
  { name: 'Land Search Guidance', desc: 'Search for land ownership and parcel details on the Ardhisasa portal.', category: 'land', icon: 'fa-map' },
  { name: 'Title Verification Support', desc: 'Verify land title authenticity through official digital channels.', category: 'land', icon: 'fa-map' },
  { name: 'Land Rates Records Assistance', desc: 'Access land rates records and payment status online.', category: 'land', icon: 'fa-map' },
  { name: 'Land Rent Payment Assistance', desc: 'Assistance making land rent payments through official channels.', category: 'land', icon: 'fa-map' },
  // General eCitizen
  { name: 'eCitizen Account Creation', desc: 'Create a new eCitizen account for accessing all government services.', category: 'general', icon: 'fa-user-plus' },
  { name: 'eCitizen Login Recovery', desc: 'Recover access to a locked or forgotten eCitizen account.', category: 'general', icon: 'fa-user-plus' },
  { name: 'eCitizen Password Reset', desc: 'Reset your eCitizen account password and regain access.', category: 'general', icon: 'fa-user-plus' },
  { name: 'eCitizen Payment Guidance', desc: 'Guidance making payments on eCitizen via M-Pesa or card.', category: 'general', icon: 'fa-user-plus' },
  { name: 'eCitizen Form Filling Help', desc: 'Professional assistance completing all eCitizen application forms.', category: 'general', icon: 'fa-user-plus' },
  { name: 'eCitizen Document Upload Assistance', desc: 'Help scanning, formatting and uploading documents to eCitizen.', category: 'general', icon: 'fa-user-plus' },
  // County
  { name: 'Single Business Permit Guidance', desc: 'Apply for or renew a Single Business Permit from your county.', category: 'county', icon: 'fa-building' },
  { name: 'County Permit Renewal Assistance', desc: 'Renew county business permits and licences online.', category: 'county', icon: 'fa-building' },
  { name: 'County Revenue Portal Support', desc: 'Navigate county revenue portals for payments and applications.', category: 'county', icon: 'fa-building' },
];

// ── Web Dev Services ─────────────────────────────────────────────────────────
export const WEBDEV_SERVICES = [
  { name: 'Business Website Design', desc: 'Professional, modern websites for businesses of all sizes.', icon: 'fa-laptop' },
  { name: 'Personal Portfolio Website', desc: 'Showcase your work and skills with a stunning portfolio site.', icon: 'fa-laptop' },
  { name: 'Landing Page Design', desc: 'High-converting landing pages for products, campaigns or lead generation.', icon: 'fa-laptop' },
  { name: 'E-commerce Website Development', desc: 'Online stores with product listings, cart and payment integration.', icon: 'fa-shopping-cart' },
  { name: 'Blog Website Setup', desc: 'Set up a professional blog or content website.', icon: 'fa-pencil' },
  { name: 'School Institution Website', desc: 'Websites for schools, colleges, training centres and institutions.', icon: 'fa-graduation-cap' },
  { name: 'Church NGO Website', desc: 'Professional websites for churches, NGOs and non-profit organisations.', icon: 'fa-heart' },
  { name: 'Website Redesign', desc: 'Modernise and upgrade an existing outdated website.', icon: 'fa-refresh' },
  { name: 'Website Maintenance', desc: 'Ongoing maintenance, updates and content management for your site.', icon: 'fa-wrench' },
  { name: 'Website Speed Optimisation', desc: 'Improve page load speed and performance for better user experience.', icon: 'fa-bolt' },
  { name: 'Mobile Responsive Website Fixes', desc: 'Fix websites that break or display poorly on mobile devices.', icon: 'fa-mobile' },
  { name: 'Domain and Hosting Setup Guidance', desc: 'Help registering a domain name and setting up web hosting.', icon: 'fa-globe' },
  { name: 'Website Bug Fixing', desc: 'Identify and fix broken features, layout issues and JavaScript errors.', icon: 'fa-bug' },
  { name: 'Custom Web Application Development', desc: 'Build custom web applications tailored to your specific business needs.', icon: 'fa-code' },
  { name: 'WordPress Setup Fixes', desc: 'WordPress installation, theme setup, plugin configuration and fixes.', icon: 'fa-wordpress' },
  { name: 'SEO Friendly Website Structure', desc: 'Build or restructure websites with proper SEO architecture.', icon: 'fa-search' },
];

// ── Design Services ──────────────────────────────────────────────────────────
export const DESIGN_SERVICES = [
  { name: 'Logo Design', desc: 'Professional, unique logos that define your brand identity.', icon: 'fa-paint-brush' },
  { name: 'Poster Design', desc: 'Eye-catching posters for events, promotions and announcements.', icon: 'fa-image' },
  { name: 'Flyer Design', desc: 'Creative flyers for marketing campaigns, events and promotions.', icon: 'fa-file-image-o' },
  { name: 'Business Card Design', desc: 'Professional business cards that make a lasting first impression.', icon: 'fa-id-card' },
  { name: 'Social Media Post Design', desc: 'Engaging graphics for Facebook, Instagram, Twitter and LinkedIn.', icon: 'fa-share-alt' },
  { name: 'Banner Design', desc: 'Digital and print banners for websites, events and storefronts.', icon: 'fa-picture-o' },
  { name: 'Brochure Design', desc: 'Professional brochures for products, services and company profiles.', icon: 'fa-book' },
  { name: 'Company Profile Design', desc: 'Polished company profile documents for presentations and tenders.', icon: 'fa-building' },
  { name: 'CV Resume Design', desc: 'Professional, modern CV and resume designs that stand out.', icon: 'fa-file-text' },
  { name: 'Invitation Card Design', desc: 'Beautiful invitation cards for weddings, events and celebrations.', icon: 'fa-envelope' },
  { name: 'Event Poster Design', desc: 'Vibrant event posters for concerts, conferences and launches.', icon: 'fa-calendar' },
  { name: 'Product Label Design', desc: 'Creative labels for products, packaging and merchandise.', icon: 'fa-tag' },
  { name: 'Menu Design', desc: 'Stylish menus for restaurants, cafes and food businesses.', icon: 'fa-cutlery' },
  { name: 'Certificate Design', desc: 'Professional certificate templates for awards and completion.', icon: 'fa-certificate' },
  { name: 'Book eBook Cover Design', desc: 'Compelling book covers that attract readers and convey the message.', icon: 'fa-book' },
  { name: 'Branding Package Design', desc: 'Full branding package: logo, colours, typography and brand guide.', icon: 'fa-star' },
  { name: 'Thumbnail Design', desc: 'High-CTR YouTube and social media thumbnails.', icon: 'fa-youtube-play' },
  { name: 'Ad Creative Design', desc: 'Compelling ad creatives for digital and print advertising.', icon: 'fa-bullhorn' },
  { name: 'Presentation Slide Design', desc: 'Professional PowerPoint and Google Slides presentations.', icon: 'fa-desktop' },
];

// ── Marketing Services ───────────────────────────────────────────────────────
export const MARKETING_SERVICES = [
  { name: 'Social Media Management', desc: 'Full management of your social media pages for consistent growth.', icon: 'fa-share-alt' },
  { name: 'Facebook Marketing', desc: 'Facebook page management, posting strategy and audience engagement.', icon: 'fa-facebook' },
  { name: 'Instagram Marketing', desc: 'Instagram content strategy, posting and growth services.', icon: 'fa-instagram' },
  { name: 'TikTok Marketing', desc: 'TikTok content creation and marketing strategy for brands.', icon: 'fa-video-camera' },
  { name: 'WhatsApp Marketing Setup', desc: 'Set up WhatsApp Business and marketing broadcast campaigns.', icon: 'fa-whatsapp' },
  { name: 'Google Business Profile Setup', desc: 'Create and optimise your Google Business profile for local visibility.', icon: 'fa-google' },
  { name: 'SEO Services', desc: 'Search engine optimisation to rank your website higher on Google.', icon: 'fa-search' },
  { name: 'Content Marketing', desc: 'Blog posts, articles and content strategy to attract and engage audiences.', icon: 'fa-pencil' },
  { name: 'Email Marketing Setup', desc: 'Set up email lists, newsletters and automated email campaigns.', icon: 'fa-envelope' },
  { name: 'Lead Generation Services', desc: 'Generate quality leads for your business through digital channels.', icon: 'fa-users' },
  { name: 'Paid Ads Setup Meta Google Ads', desc: 'Set up and manage paid advertising campaigns on Meta and Google.', icon: 'fa-money' },
  { name: 'Online Brand Promotion', desc: 'Promote your brand across multiple digital platforms strategically.', icon: 'fa-star' },
  { name: 'Digital Strategy Consultation', desc: 'Professional consultation on your digital marketing strategy.', icon: 'fa-lightbulb-o' },
  { name: 'Campaign Creative Setup', desc: 'Design and set up complete digital marketing campaigns.', icon: 'fa-rocket' },
  { name: 'Audience Growth Strategy', desc: 'Strategic approach to growing your followers and engagement.', icon: 'fa-line-chart' },
];

/** Popular services shown on the homepage */
export const POPULAR_SERVICES = [
  {
    name: 'Good Conduct',
    desc: 'Certificate of Good Conduct application, renewal & booking assistance.',
    icon: 'fa-certificate',
    img: 'certificate-of-good-conduct-application',
    fallback: 'ecitizen-hero',
    waMsg: 'Good Conduct Certificate',
  },
  {
    name: 'Passport',
    desc: 'New passport application, renewal, lost passport replacement & tracking.',
    icon: 'fa-book',
    img: 'passport-application-assistance',
    fallback: 'ecitizen-hero',
    waMsg: 'Passport Application',
  },
  {
    name: 'KRA PIN',
    desc: 'KRA PIN registration, retrieval, update, tax compliance certificate & nil returns.',
    icon: 'fa-calculator',
    img: 'kra-pin-registration',
    fallback: 'ecitizen-hero',
    waMsg: 'KRA PIN Registration',
  },
  {
    name: 'Birth Certificate',
    desc: 'Birth certificate application, replacement & late registration assistance.',
    icon: 'fa-child',
    img: 'birth-certificate-application',
    fallback: 'ecitizen-hero',
    waMsg: 'Birth Certificate Application',
  },
  {
    name: 'Business Registration',
    desc: 'Business name search, registration, CR12, company registration & annual returns.',
    icon: 'fa-building',
    img: 'business-name-registration',
    fallback: 'ecitizen-hero',
    waMsg: 'Business Registration',
  },
  {
    name: 'Website Design',
    desc: 'Professional business websites, portfolios, e-commerce & landing pages.',
    icon: 'fa-laptop',
    img: 'business-website-design',
    fallback: 'webdev-hero',
    waMsg: 'website development',
  },
  {
    name: 'Logo Design',
    desc: 'Professional logo, branding package, flyers, posters & business cards.',
    icon: 'fa-paint-brush',
    img: 'logo-design',
    fallback: 'design-hero',
    waMsg: 'Logo Design',
  },
  {
    name: 'Social Media Marketing',
    desc: 'Social media management, SEO, Google Business profile & ad campaigns.',
    icon: 'fa-bullhorn',
    img: 'social-media-management',
    fallback: 'marketing-hero',
    waMsg: 'Social Media Management',
  },
];

/** FAQ items for the homepage */
export const FAQ_ITEMS = [
  {
    q: 'How do I request a service?',
    a: 'Simply click the <strong>Get Help on WhatsApp</strong> button on any service card. It opens a WhatsApp chat with a pre-filled message. We\'ll respond quickly and guide you through the process.',
  },
  {
    q: 'How do I pay for services?',
    a: 'Payment is done via <strong>M-Pesa</strong> after we discuss your requirements on WhatsApp. The cost depends on the specific service and complexity.',
  },
  {
    q: 'How long does processing take?',
    a: 'Processing times vary by service. Most eCitizen applications are submitted same day. Government processing timelines depend on the specific department — we keep you updated throughout.',
  },
  {
    q: 'Do you help with eCitizen account issues?',
    a: 'Yes! We assist with eCitizen account creation, login recovery, password reset, profile updates, payment guidance, and navigating any government portal.',
  },
  {
    q: 'Do you build websites?',
    a: 'Absolutely! We build professional business websites, portfolios, e-commerce stores, landing pages and more. We also handle maintenance, redesigns and bug fixes. Just message us on WhatsApp.',
  },
  {
    q: 'Can you help both individuals and businesses?',
    a: 'Yes — we serve individuals needing personal documents as well as businesses needing registration, websites, design and marketing. No job is too small or too large.',
  },
];
