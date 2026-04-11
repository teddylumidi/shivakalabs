// ===== SERVICE DATA CONFIGURATION =====
const serviceData = {
  'online-forms': {
    name: 'Online Form Filling',
    icon: 'fa fa-wpforms',
    shortDesc: 'Professional online form completion and submission assistance.',
    fullDesc: `
      <p>Our expert team helps you fill and submit online forms accurately and efficiently. Whether it's government portals, application forms, job portals, or any online form, we ensure everything is completed correctly.</p>
      <p><strong>Services Include:</strong></p>
      <ul style="margin-left: 2rem;">
        <li>Government portal form assistance</li>
        <li>Application form completion</li>
        <li>Job application support</li>
        <li>Scholarship form assistance</li>
        <li>Education application forms</li>
        <li>Business application forms</li>
        <li>Data entry and form verification</li>
      </ul>
      <p>We handle all the details so you can focus on what matters. Fast, accurate, and reliable service every time.</p>
    `,
    whatsappText: 'Hello%2C%20I%20need%20help%20with%20online%20form%20filling'
  },
  'document-scanning': {
    name: 'Document Scanning & Upload',
    icon: 'fa fa-file-image',
    shortDesc: 'Professional document scanning and digital file upload services.',
    fullDesc: `
      <p>Convert your physical documents into digital format. We provide professional document scanning, photo enhancement, and secure file uploads to government portals and online platforms.</p>
      <p><strong>Services Include:</strong></p>
      <ul style="margin-left: 2rem;">
        <li>High-quality document scanning</li>
        <li>Document photo enhancement</li>
        <li>PDF creation and formatting</li>
        <li>Batch document scanning</li>
        <li>Document upload to portals</li>
        <li>File compression and optimization</li>
        <li>Secure document storage assistance</li>
      </ul>
      <p>All documents are handled with confidentiality and care. Professional quality guaranteed.</p>
    `,
    whatsappText: 'Hello%2C%20I%20need%20help%20with%20document%20scanning%20and%20upload'
  },
  'cv-writing': {
    name: 'CV / Resume Writing',
    icon: 'fa fa-file-text',
    shortDesc: 'Professional CV and resume writing to help you stand out.',
    fullDesc: `
      <p>Land your dream job with a professionally written CV or resume. Our expert writers create compelling documents that highlight your skills and experience effectively.</p>
      <p><strong>Services Include:</strong></p>
      <ul style="margin-left: 2rem;">
        <li>CV writing from scratch</li>
        <li>CV/Resume formatting and design</li>
        <li>Career change CV assistance</li>
        <li>International CV format (Europass, etc.)</li>
        <li>Cover letter writing</li>
        <li>LinkedIn profile optimization</li>
        <li>Job application package preparation</li>
      </ul>
      <p>We create CVs that get noticed by employers and recruiters. Professional, modern, and effective.</p>
    `,
    whatsappText: 'Hello%2C%20I%20need%20help%20with%20CV%20writing'
  },
  'pdf-editing': {
    name: 'PDF Editing / Conversion',
    icon: 'fa fa-file-pdf',
    shortDesc: 'PDF editing, conversion, and document manipulation services.',
    fullDesc: `
      <p>We handle all your PDF needs - editing, converting, merging, splitting, and more. Get your documents in the format and state you need quickly and professionally.</p>
      <p><strong>Services Include:</strong></p>
      <ul style="margin-left: 2rem;">
        <li>PDF editing and text modification</li>
        <li>Document format conversion (PDF, Word, Image)</li>
        <li>PDF merging and splitting</li>
        <li>Page reordering and removal</li>
        <li>Watermark addition</li>
        <li>PDF compression</li>
        <li>Form filling and annotation</li>
      </ul>
      <p>Fast, accurate conversion and editing. Professional results guaranteed.</p>
    `,
    whatsappText: 'Hello%2C%20I%20need%20help%20with%20PDF%20editing%20or%20conversion'
  },
  'online-applications': {
    name: 'Online Applications',
    icon: 'fa fa-mouse-pointer',
    shortDesc: 'Complete online application submissions for various platforms.',
    fullDesc: `
      <p>Let us handle your online applications. Whether it's job portals, university applications, scholarship forms, or government platforms, we complete and submit everything accurately.</p>
      <p><strong>Services Include:</strong></p>
      <ul style="margin-left: 2rem;">
        <li>Job portal applications</li>
        <li>University application assistance</li>
        <li>Scholarship application help</li>
        <li>Government service applications</li>
        <li>Visa application assistance</li>
        <li>Business permit applications</li>
        <li>Professional certification applications</li>
      </ul>
      <p>We ensure your applications are complete, accurate, and submitted on time.</p>
    `,
    whatsappText: 'Hello%2C%20I%20need%20help%20with%20online%20applications'
  },
  'email-setup': {
    name: 'Email Setup / Recovery',
    icon: 'fa fa-envelope',
    shortDesc: 'Professional email setup, recovery, and management assistance.',
    fullDesc: `
      <p>Having email troubles? We help you set up new email accounts, recover lost ones, and manage your email across devices. Expert guidance for Gmail, Outlook, Yahoo, and corporate email.</p>
      <p><strong>Services Include:</strong></p>
      <ul style="margin-left: 2rem;">
        <li>Email account creation</li>
        <li>Email recovery assistance</li>
        <li>Password reset and security recovery</li>
        <li>Email forwarding setup</li>
        <li>Email app configuration</li>
        <li>Phone email setup guidance</li>
        <li>Email security and 2FA setup</li>
      </ul>
      <p>We restore access quickly and securely. Dedicated support from our experts.</p>
    `,
    whatsappText: 'Hello%2C%20I%20need%20help%20with%20email%20setup%20or%20recovery'
  },
  'other-digital': {
    name: 'Other Digital Services',
    icon: 'fa fa-cogs',
    shortDesc: 'Various other digital assistance and technical support services.',
    fullDesc: `
      <p>Beyond our main services, we provide a range of additional digital support. If you have a digital challenge not listed above, contact us - we likely can help!</p>
      <p><strong>Services Include:</strong></p>
      <ul style="margin-left: 2rem;">
        <li>Basic computer troubleshooting</li>
        <li>Software installation guidance</li>
        <li>Digital account management</li>
        <li>Online payment assistance</li>
        <li>Web browsing and search optimization</li>
        <li>Cloud storage setup and management</li>
        <li>Custom digital solutions</li>
      </ul>
      <p>Our team is versatile and ready to help with your unique digital needs.</p>
    `,
    whatsappText: 'Hello%2C%20I%20need%20other%20digital%20services'
  }
};

// Load service details into page
function loadServiceDetails(serviceId) {
  const service = serviceData[serviceId];
  
  if (!service) {
    // Default or error handling
    document.getElementById('service-name').textContent = 'Service Not Found';
    document.getElementById('service-icon').className = 'fa fa-question-circle';
    document.getElementById('service-desc').textContent = 'Please select a valid service.';
    return;
  }

  // Update hero section
  document.getElementById('service-name').textContent = service.name;
  document.getElementById('service-icon').className = service.icon;
  document.getElementById('service-desc').textContent = service.shortDesc;

  // Update details section
  document.getElementById('service-full-details').innerHTML = service.fullDesc;

  // Update WhatsApp button with the correct URL
  const whatsappUrl = `https://wa.me/254716358703?text=${service.whatsappText}`;
  
  // Update main WhatsApp button
  const whatsappBtn = document.getElementById('whatsapp-btn');
  if (whatsappBtn) {
    whatsappBtn.href = whatsappUrl;
    whatsappBtn.target = '_blank';
    whatsappBtn.rel = 'noopener noreferrer';
  }
  
  // Update any other WhatsApp service links
  document.querySelectorAll('.whatsapp-service-link').forEach(btn => {
    btn.href = whatsappUrl;
    btn.target = '_blank';
    btn.rel = 'noopener noreferrer';
  });

  // Update page title
  document.title = `${service.name} | ShivakaLabs | Professional Digital Services Company`;
}
