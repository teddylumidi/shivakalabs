'use client'

export default function WebDevView() {
  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-4xl font-bold text-gold mb-2">Web Development Packages</h2>
        <p className="text-gray-400 text-lg">Professional websites tailored to your business needs</p>
      </div>
      <div className="grid lg:grid-cols-3 gap-6">
        {[
          { name: 'Basic', price: '20,000', features: ['5-8 Pages', 'Responsive Design', 'Contact Form', 'Mobile Optimized', 'SEO Basics', 'SSL Certificate', '1 Month Support'] },
          { name: 'Professional', price: '40,000', popular: true, features: ['10-15 Pages', 'Advanced Design', 'CMS Integration', 'Blog Section', 'SEO Optimization', 'Analytics Setup', '3 Months Support'] },
          { name: 'E-Commerce', price: '80,000', features: ['Unlimited Products', 'Payment Gateway', 'Inventory Mgmt', 'Order Management', 'Customer Dashboard', 'Analytics', '6 Months Support'] },
        ].map((pkg) => (
          <div key={pkg.name} className={`bg-dark-secondary rounded-2xl overflow-hidden border-2 ${pkg.popular ? 'border-gold ring-2 ring-gold ring-opacity-20' : 'border-gray-700'}`}>
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-6 text-center">
              <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
            </div>
            <div className="p-6">
              <ul className="space-y-2 text-gray-300 text-sm mb-6">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-start">
                    <span className="text-gold mr-2">✓</span>{f}
                  </li>
                ))}
              </ul>
              <p className="text-2xl font-bold text-gold mb-4">Ksh {pkg.price}</p>
              <a href="https://wa.me/254716358703" className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition block text-center">
                Get Started
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
