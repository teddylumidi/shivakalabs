'use client'

import { useEffect } from 'react'
import { useAppStore } from '@/lib/store'
import { detectUserLocation, showNotification } from '@/lib/security'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ContentArea from '@/components/ContentArea'
import WhatsAppButton from '@/components/WhatsAppButton'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { setOnlineStatus, setUserLocation } = useAppStore()

  useEffect(() => {
    // Online/Offline detection
    const handleOnline = () => {
      setOnlineStatus(true)
      showNotification('Back online!', 'success')
    }
    const handleOffline = () => {
      setOnlineStatus(false)
      showNotification('You are offline - some features may be limited', 'error')
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // User location detection
    detectUserLocation().then(({ country, currency }) => {
      setUserLocation(country, currency)
    })

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [setOnlineStatus, setUserLocation])

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover, maximum-scale=5.0, user-scalable=yes" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com https://js.paystack.co; style-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com; img-src 'self' data: https: blob:; connect-src 'self' https://api.paystack.co; frame-src 'self' https://checkout.paystack.com" />
        <meta name="theme-color" content="#D4AF37" />
        <meta name="description" content="Shivakalabs - Premium digital services including government services, web development, design, marketing, and CV writing" />
        <title>Shivakalabs - Elevate Your Digital Future</title>
        <script async src="https://cdn.tailwindcss.com"></script>
        <script async src="https://js.paystack.co/v1/inline.js"></script>
      </head>
      <body className="bg-dark text-gray-100 min-h-screen font-sans">
        <div className="flex flex-col h-full min-h-screen">
          <Header />
          <main className="flex-1 w-full px-2 sm:px-4 py-4 sm:py-8">
            <div className="max-w-7xl mx-auto w-full">
              <ContentArea />
            </div>
          </main>
          <Footer />
        </div>
        <WhatsAppButton />
        {children}
      </body>
    </html>
  )
}
