'use client'

import { useAppStore } from '@/lib/store'
import { useEffect, useState } from 'react'

export default function HomeView() {
  const { setView } = useAppStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const industries = [
    { name: 'Trading', position: { top: '15%', right: '15%' } },
    { name: 'Banking', position: { top: '20%', right: '8%' } },
    { name: 'Fintech', position: { top: '35%', left: '12%' } },
    { name: 'Marketplaces', position: { top: '30%', right: '5%' } },
    { name: 'Crypto', position: { top: '55%', left: '15%' } },
    { name: 'NBFl', position: { top: '50%', right: '10%' } },
    { name: 'Gaming & Casino', position: { bottom: '25%', right: '8%' } },
  ]

  return (
    <div className="min-h-screen relative pt-20">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="relative z-10">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-2xl">
                Future-Proof Your Business with Intelligent Digital Services
              </h1>
              <p className="text-xl md:text-2xl text-slate-200 mb-8 max-w-2xl leading-relaxed drop-shadow-lg">
                From eCitizen government services to professional web development, AI-powered solutions, and digital marketing - all in 100+ countries.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="btn-primary flex items-center justify-center gap-2 text-lg">
                  Book a free demo
                </button>
                <button className="btn-secondary flex items-center justify-center gap-2 text-lg">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  <div className="text-left">
                    <div className="font-semibold">Watch Video</div>
                    <div className="text-xs opacity-90">1 min</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Right Content - 3D Head Illustration */}
            <div className="relative h-[600px] hidden lg:block">
              {/* Animated floating labels */}
              {mounted && industries.map((industry, i) => (
                <div
                  key={industry.name}
                  className="floating-label shadow-lg shadow-teal-500/30"
                  style={{
                    ...industry.position,
                    animationDelay: `${i * 0.5}s`,
                  }}
                >
                  {industry.name}
                </div>
              ))}
              
              {/* Central 3D Head Wireframe Representation */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="relative w-80 h-80">
                  {/* Glowing orb effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-full opacity-25 blur-3xl"></div>
                  
                  {/* Wireframe circles */}
                  <div className="absolute inset-0 border-2 border-teal-400/40 rounded-full"></div>
                  <div className="absolute inset-4 border-2 border-emerald-400/40 rounded-full"></div>
                  <div className="absolute inset-8 border-2 border-teal-500/40 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
                  
                  {/* Security icons */}
                  <div className="absolute top-10 left-10 w-9 h-9 bg-teal-600/90 backdrop-blur-sm rounded-lg border border-teal-400/50 flex items-center justify-center shadow-lg">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div className="absolute bottom-20 right-10 w-10 h-10 bg-teal-600/90 backdrop-blur-sm rounded-lg border border-teal-400/50 flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
              Comprehensive Digital Solutions
            </h2>
            <p className="text-xl text-slate-200 max-w-3xl mx-auto">
              Everything your business needs to thrive in the digital age
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '🏛️', title: 'eCitizen Services', desc: '46+ government services', link: 'ecitizen' },
              { icon: '💻', title: 'Web Development', desc: 'Modern, responsive websites', link: 'web-development' },
              { icon: '🎨', title: 'Graphic Design', desc: 'Professional branding', link: 'graphic-design' },
              { icon: '📱', title: 'Digital Marketing', desc: 'Growth-focused campaigns', link: 'digital-marketing' },
              { icon: '📄', title: 'CV Writing', desc: 'Professional resumes', link: 'cv-writing' },
              { icon: '🤖', title: 'AI Documents', desc: 'Intelligent document generation', link: 'documents-gen' },
            ].map((service) => (
              <div
                key={service.link}
                onClick={() => setView(service.link)}
                className="service-card p-8 cursor-pointer group hover:scale-105 transition-transform duration-200"
              >
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
                <p className="text-slate-300 mb-4">{service.desc}</p>
                <div className="text-teal-300 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                  Learn more <span>→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
