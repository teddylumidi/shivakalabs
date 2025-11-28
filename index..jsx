import React, { useState } from 'react';
import { Search, MessageCircle } from 'lucide-react';

const ShivakaLabsHome = () => {
  const [activePage, setActivePage] = useState('Home');

  // --- DATA: Home Page Services ---
  const homeServices = [
    { title: "eCitizen", desc: "Put some services here" },
    { title: "Web Development", desc: "Put some services here" },
    { title: "Graphic Design", desc: "Put some services here" },
    { title: "Digital Marketing", desc: "Put some services here" }
  ];

  // --- DATA: Graphic Design Services ---
  const brandingServices = [
    "Branding Package Development", "Logo Design Services", "Label Design", 
    "T-Shirt Designs & Merch", "Signage Design / Banners", 
    "Stationery Design (Letterheads, etc.)", "Brochure Design (3-Fold, Z-Fold)",
    "Business Card Design", "Flyer / Poster Design", "Magazine Design / Layout",
    "Book Cover Design", "Booklet Design", "Infographic Design"
  ];

  const digitalServices = [
    "Landing Page Design", "Website Design (Mockups)", "Responsive Web Design (UX/UI)",
    "Wordpress Theme Customization", "Company Profile Design (Digital)",
    "Ecommerce Web Design (Assets)", "Social Media Covers & Banners",
    "Social Media Campaign Designs", "Music Cover Design (Album Art)",
    "Invitation Design (Digital)", "Menu Card Design", "Billboard Design",
    "Banner Design (Web Ads)"
  ];

  // --- NAVIGATION DATA ---
  const primaryServices = [
    "Home", "eCitizen", "Web Development", "Graphic Design", "Digital Marketing"
  ];

  const supportLinks = [
    "Contact Support", "Help Center", "Site Map"
  ];

  const navTabs = [
    "Home", "eCitizen", "Web Development", "Graphic Design", "Digital Marketing"
  ];

  // Custom Logo Component
  const SLogo = ({ size = 60 }) => (
    <svg width={size} height={size} viewBox="0 0 100 100" className="inline-block">
      <ellipse cx="50" cy="50" rx="48" ry="35" fill="#FFD700" stroke="#B8860B" strokeWidth="2" />
      <ellipse cx="50" cy="50" rx="40" ry="28" fill="black" />
      <text x="50" y="65" textAnchor="middle" fill="#FFD700" fontFamily="serif" fontSize="45" fontWeight="bold" style={{ textShadow: '2px 2px 0px #B8860B' }}>S</text>
      <path d="M 10 50 Q 50 90 90 50" fill="none" stroke="#FFD700" strokeWidth="3" opacity="0.8" />
    </svg>
  );

  // --- RENDER CONTENT VIEWS ---
  
  const renderHomeContent = () => (
    <div className="flex flex-col h-full">
        {/* Welcome Heading */}
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-center mb-6 text-white leading-tight">
          Welcome to ShivakaLabs— your one-stop platform <br className="hidden md:block" />
          for all government services and professional solutions.
        </h2>

        {/* Hero Banner with Logo */}
        <div className="bg-teal-900/50 py-8 mb-8 flex justify-center items-center border-y border-teal-800 relative">
            <div className="bg-white p-2 rounded shadow-lg">
              <SLogo size={120} />
            </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {homeServices.map((service, index) => (
            <div key={index} className="bg-[#1a1a1a] border border-gray-600 p-0 flex flex-col h-48 relative">
              <div className="bg-[#2a2a35] text-blue-200 p-1 pl-2 text-sm font-bold border-b border-gray-600">
                {service.title}
              </div>
              <div className="p-4 flex-1">
                <p className="text-white font-serif font-bold text-lg leading-tight mb-2">
                  {service.desc}
                </p>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                  <button className="flex items-center gap-2 text-white font-bold hover:text-green-400 transition-colors">
                    <span className="text-lg">whatsapp button</span>
                  </button>
              </div>
            </div>
          ))}
        </div>
    </div>
  );

  const renderGraphicDesignContent = () => (
    <div className="flex flex-col h-full relative">
      <h2 className="text-[#FF4500] font-bold text-xl mb-4 uppercase tracking-wide">
        GRAPHIC DESIGN & BRANDING SOLUTIONS
      </h2>

      <div className="flex flex-col lg:flex-row gap-6 mb-16">
        
        {/* Left: Teal Placeholder Box */}
        <div className="w-full lg:w-5/12 bg-[#004d4d] min-h-[400px] border border-gray-600">
            {/* Empty placeholder as per design */}
        </div>

        {/* Right: Service Lists */}
        <div className="w-full lg:w-7/12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Column 1 */}
            <div>
              <h3 className="text-white font-bold mb-3 uppercase tracking-wider text-sm border-b border-gray-700 pb-1">
                BRANDING & PRINT MEDIA
              </h3>
              <ul className="space-y-2">
                {brandingServices.map((item, i) => (
                  <li key={i}>
                    <a href="#" className="text-[#00BFFF] hover:text-white underline text-sm font-medium decoration-[#00BFFF]/50">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2 */}
            <div>
              <h3 className="text-white font-bold mb-3 uppercase tracking-wider text-sm border-b border-gray-700 pb-1">
                DIGITAL & WEBSITE ASSETS
              </h3>
              <ul className="space-y-2">
                {digitalServices.map((item, i) => (
                  <li key={i}>
                    <a href="#" className="text-[#00BFFF] hover:text-white underline text-sm font-medium decoration-[#00BFFF]/50">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
        </div>
      </div>

      {/* Footer Info Box */}
      <div className="bg-[#004d4d] p-3 text-white font-bold text-center text-lg mt-auto lg:absolute lg:bottom-0 lg:left-0 lg:w-[450px]">
        For More Info : Call /Text 0716358703
      </div>
    </div>
  );


  return (
    <div className="min-h-screen bg-[#111111] font-sans flex flex-col">
      
      {/* HEADER SECTION */}
      <header className="bg-[#1a1a6e] border-b-4 border-blue-900 flex flex-col md:flex-row items-center p-2 relative">
        <div className="bg-white p-1 border-2 border-gray-400 mr-4 flex-shrink-0 cursor-pointer" onClick={() => setActivePage('Home')}>
           <SLogo size={70} />
        </div>
        
        <div className="flex-1 w-full">
          <div className="mb-2 text-center md:text-left">
            <h1 className="text-white font-serif text-3xl font-bold tracking-wide">Shivakalabs</h1>
            <p className="text-pink-400 text-sm font-medium">Your Gateway to Digital Excellence</p>
          </div>

          <nav className="flex flex-wrap gap-1">
            {navTabs.map((tab, i) => (
              <div 
                key={i} 
                onClick={() => setActivePage(tab)}
                className={`
                  px-4 py-1 text-sm border-t border-l border-r border-gray-500 cursor-pointer
                  ${activePage === tab 
                    ? 'bg-[#333399] text-white font-bold border-b-0' 
                    : 'bg-[#222] text-gray-300 border-b border-gray-500 hover:bg-[#333]'}
                `}
              >
                {tab}
              </div>
            ))}
          </nav>
        </div>
      </header>

      <div className="flex flex-col md:flex-row flex-1">
        
        {/* LEFT SIDEBAR */}
        <aside className="w-full md:w-64 bg-[#111] border-r border-gray-700 p-2 flex-shrink-0">
          <h2 className="text-[#FF00FF] font-bold text-lg mb-1 uppercase tracking-wider">PRIMARY SERVICES</h2>
          <div className="space-y-1 mb-6">
            {primaryServices.map((item, i) => (
              <button 
                key={i}
                onClick={() => setActivePage(item)}
                className={`
                  w-full text-left px-3 py-1 text-sm border border-gray-600
                  ${activePage === item ? 'bg-[#333399] text-white' : 'bg-[#222] text-gray-300 hover:bg-[#333]'}
                  transition-colors
                `}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="mb-6">
            <input type="text" placeholder="Search" className="w-full bg-[#222] border border-gray-600 text-white px-2 py-1 text-sm mb-1"/>
            <button className="w-full bg-[#334] border border-gray-500 text-white text-xs py-1 uppercase font-bold hover:bg-[#445]">
              SEARCH OPTIONS
            </button>
          </div>

          <h2 className="text-[#FF00FF] font-bold text-lg mb-1 uppercase tracking-wider">SUPPORT & INFO</h2>
          <div className="space-y-1 mb-6">
            {supportLinks.map((link, i) => (
              <button key={i} className="w-full text-left px-3 py-1 text-sm bg-[#222] border border-gray-600 text-gray-300 hover:bg-[#333]">
                {link}
              </button>
            ))}
          </div>

          <button className="w-full bg-[#222] border border-gray-600 text-red-500 font-bold py-1 mb-2 hover:bg-[#333]">
            New Features
          </button>
          <button className="w-full bg-[#222] border border-gray-600 text-green-500 font-bold py-1 hover:bg-[#333]">
            LATEST GUIDE
          </button>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 bg-[#1a1a1a] p-4 text-white relative">
          <div className="border-2 border-gray-700 p-4 min-h-full rounded-sm">
            {activePage === 'Graphic Design' ? renderGraphicDesignContent() : 
             activePage === 'Home' ? renderHomeContent() : 
             <div className="text-center py-20 text-gray-500 italic">Page content for {activePage} coming soon...</div>
            }
          </div>
        </main>
      </div>
    </div>
  );
};

export default ShivakaLabsHome;
