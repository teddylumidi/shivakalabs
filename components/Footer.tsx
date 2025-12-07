'use client'

import { useAppStore } from '@/lib/store'

export default function Footer() {
  const { setView } = useAppStore()

  return (
    <footer className="bg-dark-secondary border-t border-gray-700 mt-12 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold text-yellow-400 mb-4">Services</h3>
            <nav className="space-y-2">
              <button onClick={() => setView('ecitizen')} className="block text-gray-300 hover:text-white font-bold transition">
                eCitizen Services
              </button>
              <button onClick={() => setView('web-development')} className="block text-gray-300 hover:text-white font-bold transition">
                Web Development
              </button>
              <button onClick={() => setView('graphic-design')} className="block text-gray-300 hover:text-white font-bold transition">
                Graphic Design
              </button>
              <button onClick={() => setView('digital-marketing')} className="block text-gray-300 hover:text-white font-bold transition">
                Digital Marketing
              </button>
              <button onClick={() => setView('cv-writing')} className="block text-gray-300 hover:text-white font-bold transition">
                CV & Cover Letter
              </button>
              <button onClick={() => setView('documents-gen')} className="block text-gray-300 hover:text-white font-bold transition">
                DocumentsGen
              </button>
            </nav>
          </div>
          <div>
            <h3 className="text-lg font-bold text-yellow-400 mb-4">Quick Links</h3>
            <nav className="space-y-2">
              <button onClick={() => setView('home')} className="block text-gray-300 hover:text-white font-bold transition">
                Home
              </button>
              <a
                href="https://wa.me/254716358703"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-green-400 font-bold transition inline-flex items-center gap-1"
              >
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.038 2.007c-5.459 0-9.882 4.423-9.882 9.882 0 1.954.57 3.824 1.637 5.421L2.015 22l4.98-1.571c1.517.842 3.235 1.285 4.988 1.285h.007c5.459 0 9.882-4.423 9.882-9.882S17.497 2.007 12.038 2.007zm3.111 13.928c-.144.275-.417.375-.688.406-.271.031-.62.063-1.07-.156s-2.73-1.334-3.156-1.554c-.427-.22-2.18-1.334-2.586-1.802-.406-.468-.833-.865-.833-1.802s.646-1.427.875-1.636c.229-.208.5-.27.677-.27.177 0 .344-.063.531-.031.187.031.396.00.604.468.208.468.708 1.761.771 1.886.062.125.104.375.021.573-.083.198-.521.656-.646.781-.125.125-.25.26-.146.479.104.218.667 1.052 1.448 1.739.583.51 1.052.688 1.406.813.437.156.708.125.917-.094.208-.219.896-1.094 1.135-1.334.239-.239.468-.187.833-.062.365.125 2.333 1.209 2.729 1.438.396.229.646.344.74.531.094.187.094.989-.479 1.833z" />
                </svg>
                Contact Us
              </a>
              <p className="text-gray-400 text-sm mt-4">Available 24/7 for your digital needs</p>
            </nav>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-6">
          <div className="flex justify-center space-x-6 mb-6">
            <a
              href="https://facebook.com/shivakalabs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-blue-400 transition transform hover:scale-110"
              title="Facebook"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a
              href="https://instagram.com/shivakalabs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-pink-400 transition transform hover:scale-110"
              title="Instagram"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465.646.25 1.195.581 1.738 1.15.57.55.902 1.091 1.15 1.738.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.15 1.738c-.55.569-1.091.9-1.738 1.15-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.738-1.15c-.569-.55-.9-1.091-1.15-1.738-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.15-1.738C2.9 4.08 3.441 3.75 4.087 3.5 4.724 3.252 5.45 3.084 6.514 3.035 7.58 2.988 7.921 2.975 10.313 2.975zM12 7a5 5 0 100 10 5 5 0 000-10zm0 1.5a3.5 3.5 0 110 7 3.5 3.5 0 010-7zm5.5-1.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com/company/shivakalabs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-blue-500 transition transform hover:scale-110"
              title="LinkedIn"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.39v-1.2h-2.84v8.37h2.84v-4.93c0-.77.62-1.4 1.39-1.4a1.39 1.39 0 011.39 1.4v4.93h2.84M6.88 9.56a1.56 1.56 0 110-3.12 1.56 1.56 0 010 3.12m1.37 9.94H5.5v-8.37h2.74v8.37z" />
              </svg>
            </a>
            <a
              href="https://twitter.com/shivakalabs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-sky-400 transition transform hover:scale-110"
              title="Twitter"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7a4.5 4.5 0 01-1.25.2z" />
              </svg>
            </a>
          </div>
          <p className="text-gray-400 text-sm text-center">
            © 2025 Shivakalabs. All rights reserved. |{' '}
            <a href="https://wa.me/254716358703" className="text-green-400 hover:text-green-300 font-bold inline-flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.038 2.007c-5.459 0-9.882 4.423-9.882 9.882 0 1.954.57 3.824 1.637 5.421L2.015 22l4.98-1.571c1.517.842 3.235 1.285 4.988 1.285h.007c5.459 0 9.882-4.423 9.882-9.882S17.497 2.007 12.038 2.007zm3.111 13.928c-.144.275-.417.375-.688.406-.271.031-.62.063-1.07-.156s-2.73-1.334-3.156-1.554c-.427-.22-2.18-1.334-2.586-1.802-.406-.468-.833-.865-.833-1.802s.646-1.427.875-1.636c.229-.208.5-.27.677-.27.177 0 .344-.063.531-.031.187.031.396.00.604.468.208.468.708 1.761.771 1.886.062.125.104.375.021.573-.083.198-.521.656-.646.781-.125.125-.25.26-.146.479.104.218.667 1.052 1.448 1.739.583.51 1.052.688 1.406.813.437.156.708.125.917-.094.208-.219.896-1.094 1.135-1.334.239-.239.468-.187.833-.062.365.125 2.333 1.209 2.729 1.438.396.229.646.344.74.531.094.187.094.989-.479 1.833z" />
              </svg>
              WhatsApp: +254 716 358 703
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
