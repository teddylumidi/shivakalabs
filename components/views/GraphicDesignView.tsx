'use client'

export default function GraphicDesignView() {
  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-4xl font-bold text-gold mb-2">Graphic Design Services</h2>
        <p className="text-gray-400 text-lg">Captivating visuals for your brand</p>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-dark-secondary p-8 rounded-2xl border border-gray-700">
          <h3 className="text-xl font-bold text-gold mb-4">Branding & Print</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>✓ Logo Design</li>
            <li>✓ Brand Guidelines</li>
            <li>✓ Business Cards</li>
            <li>✓ Brochures & Flyers</li>
            <li>✓ Packaging Design</li>
            <li>✓ Signage & Banners</li>
          </ul>
        </div>
        <div className="bg-dark-secondary p-8 rounded-2xl border border-gray-700">
          <h3 className="text-xl font-bold text-gold mb-4">Digital Assets</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>✓ Web Design Mockups</li>
            <li>✓ Social Media Graphics</li>
            <li>✓ UI/UX Design</li>
            <li>✓ Infographics</li>
            <li>✓ Animation Assets</li>
            <li>✓ Icon Design</li>
          </ul>
        </div>
      </div>
      <div className="text-center">
        <a href="https://wa.me/254716358703" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition inline-flex items-center gap-2">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.038 2.007c-5.459 0-9.882 4.423-9.882 9.882 0 1.954.57 3.824 1.637 5.421L2.015 22l4.98-1.571c1.517.842 3.235 1.285 4.988 1.285h.007c5.459 0 9.882-4.423 9.882-9.882S17.497 2.007 12.038 2.007zm3.111 13.928c-.144.275-.417.375-.688.406-.271.031-.62.063-1.07-.156s-2.73-1.334-3.156-1.554c-.427-.22-2.18-1.334-2.586-1.802-.406-.468-.833-.865-.833-1.802s.646-1.427.875-1.636c.229-.208.5-.27.677-.27.177 0 .344-.063.531-.031.187.031.396.00.604.468.208.468.708 1.761.771 1.886.062.125.104.375.021.573-.083.198-.521.656-.646.781-.125.125-.25.26-.146.479.104.218.667 1.052 1.448 1.739.583.51 1.052.688 1.406.813.437.156.708.125.917-.094.208-.219.896-1.094 1.135-1.334.239-.239.468-.187.833-.062.365.125 2.333 1.209 2.729 1.438.396.229.646.344.74.531.094.187.094.989-.479 1.833z" />
          </svg>
          Apply Now
        </a>
      </div>
    </div>
  )
}
