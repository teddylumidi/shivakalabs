'use client'

export default function EcitzenView() {
  const services = [
    'KRA PIN', 'Tax Returns', 'Compliance', 'E-TIMS', 'Monthly Rental',
    'KRA PIN Registration', 'KRA PIN Company', 'KRA NIL Returns', 'KRA P9 Returns',
    'KRA WHT Certificate', 'TCC Certificate', 'KRA PIN Update', 'KRA Email Reset',
    'AGPO Certificate', 'Good Conduct', 'NTSA PDL', 'HELB Clearance', 'Company Registration',
    'Business Linking', 'NTSA Smart DL', 'eCitizen Account', 'IFMIS Services',
    'NTSA/TIMS Account', 'HELB Account', 'HELB Loan App', 'KUUCCPS Application',
    'DL Renewal', 'Metropol CRB', 'Project Printing', 'Document Netting',
    'NSSF Returns', 'Project Consulting', 'TSC Number', 'KMTC Account',
    'GHRIS Payslips', 'GHRIS Registration', 'Password Recovery', 'TSC Wealth Decl.',
    'IFMIS Account', 'Company Profile+AOA', 'Partnership Deed', 'Company Profile',
    'Article of Assoc.', 'Business Name Reg.', 'First KUCCPS', 'Passport Application',
  ]

  return (
    <div className="space-y-12">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-gold mb-2">Official Government Services</h2>
        <p className="text-gray-400 text-lg">Navigate government portals with expert assistance</p>
      </div>

      <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-3">
        {services.map((service, idx) => (
          <a
            key={idx}
            href="https://wa.me/254716358703"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-dark-secondary p-4 rounded-lg text-center border border-gray-700 hover:border-gold transition group"
          >
            <h4 className="font-bold text-white mb-2 text-sm group-hover:text-gold transition">{service}</h4>
            <button className="mt-2 bg-green-500 hover:bg-green-700 text-white text-xs font-bold py-1 px-2 rounded block w-full transition">
              Apply
            </button>
          </a>
        ))}
      </div>

      <div className="text-center mt-8">
        <a
          href="https://wa.me/254716358703"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition hover:shadow-lg inline-flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.038 2.007c-5.459 0-9.882 4.423-9.882 9.882 0 1.954.57 3.824 1.637 5.421L2.015 22l4.98-1.571c1.517.842 3.235 1.285 4.988 1.285h.007c5.459 0 9.882-4.423 9.882-9.882S17.497 2.007 12.038 2.007zm3.111 13.928c-.144.275-.417.375-.688.406-.271.031-.62.063-1.07-.156s-2.73-1.334-3.156-1.554c-.427-.22-2.18-1.334-2.586-1.802-.406-.468-.833-.865-.833-1.802s.646-1.427.875-1.636c.229-.208.5-.27.677-.27.177 0 .344-.063.531-.031.187.031.396.00.604.468.208.468.708 1.761.771 1.886.062.125.104.375.021.573-.083.198-.521.656-.646.781-.125.125-.25.26-.146.479.104.218.667 1.052 1.448 1.739.583.51 1.052.688 1.406.813.437.156.708.125.917-.094.208-.219.896-1.094 1.135-1.334.239-.239.468-.187.833-.062.365.125 2.333 1.209 2.729 1.438.396.229.646.344.74.531.094.187.094.989-.479 1.833z" />
          </svg>
          Need Help? Chat with Us
        </a>
      </div>
    </div>
  )
}
