'use client'

import { useAppStore } from '@/lib/store'

const services = [
  {
    id: 'ecitizen',
    icon: '🏛️',
    title: 'eCitizen Services',
    description: 'Seamlessly navigate government portals—KRA, NTSA, immigration, and more with trusted expertise',
    color: 'border-yellow-400',
  },
  {
    id: 'web-development',
    icon: '🌐',
    title: 'Web Development',
    description: 'Stunning websites, e-commerce, and seamless integrations',
    color: 'border-blue-400',
  },
  {
    id: 'graphic-design',
    icon: '🎨',
    title: 'Graphic Design',
    description: 'Brand identity, logos, print media & digital art',
    color: 'border-purple-400',
  },
  {
    id: 'digital-marketing',
    icon: '📱',
    title: 'Digital Marketing',
    description: 'SEO, social media, and amplified online visibility',
    color: 'border-red-400',
  },
  {
    id: 'cv-writing',
    icon: '📄',
    title: 'CV & Cover Letter',
    description: 'Professional documents, expertly crafted for success',
    color: 'border-green-400',
  },
  {
    id: 'documents-gen',
    icon: '✨',
    title: 'DocumentsGen',
    description: 'AI-powered document generation powered by GPT-5',
    color: 'border-indigo-400',
  },
]

export default function HomeView() {
  const { setView } = useAppStore()

  return (
    <div className="space-y-16">
      <div className="text-center space-y-6 py-12">
        <h2 className="text-5xl md:text-6xl font-bold text-white">
          Elevate Your <span className="text-gold">Digital</span> Presence
        </h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Premium services for government, web, design, marketing & professional documents
        </p>
        <div className="h-32 w-32 mx-auto bg-gradient-to-br from-gold to-gold-light rounded-full flex items-center justify-center text-4xl font-bold text-black">S</div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className={`bg-dark-secondary p-8 rounded-2xl border border-gray-700 hover:border-${service.color.split('-')[1]}-400 transition-all hover:shadow-lg hover:shadow-${service.color.split('-')[1]}-400/20`}
          >
            <div className="text-5xl mb-4">{service.icon}</div>
            <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
            <p className="text-gray-400 mb-6">{service.description}</p>
            <button
              onClick={() => setView(service.id)}
              className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition hover:shadow-lg inline-flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.038 2.007c-5.459 0-9.882 4.423-9.882 9.882 0 1.954.57 3.824 1.637 5.421L2.015 22l4.98-1.571c1.517.842 3.235 1.285 4.988 1.285h.007c5.459 0 9.882-4.423 9.882-9.882S17.497 2.007 12.038 2.007zm3.111 13.928c-.144.275-.417.375-.688.406-.271.031-.62.063-1.07-.156s-2.73-1.334-3.156-1.554c-.427-.22-2.18-1.334-2.586-1.802-.406-.468-.833-.865-.833-1.802s.646-1.427.875-1.636c.229-.208.5-.27.677-.27.177 0 .344-.063.531-.031.187.031.396.00.604.468.208.468.708 1.761.771 1.886.062.125.104.375.021.573-.083.198-.521.656-.646.781-.125.125-.25.26-.146.479.104.218.667 1.052 1.448 1.739.583.51 1.052.688 1.406.813.437.156.708.125.917-.094.208-.219.896-1.094 1.135-1.334.239-.239.468-.187.833-.062.365.125 2.333 1.209 2.729 1.438.396.229.646.344.74.531.094.187.094.989-.479 1.833z" />
              </svg>
              Explore Services
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
