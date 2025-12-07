import CryptoJS from 'crypto-js'

const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || 'default-key-change-in-prod'

export class SecurityManager {
  static sanitizeInput(input: string): string {
    const div = document.createElement('div')
    div.textContent = input
    return div.innerHTML
  }

  static validateEmail(email: string): boolean {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return regex.test(email)
  }

  static validatePhone(phone: string): boolean {
    const cleaned = phone.replace(/\s+/g, '')
    return /^254\d{9}$|^\+254\d{9}$|^0\d{9}$|^\+\d{7,15}$/.test(cleaned)
  }

  static encryptData(data: any): string {
    try {
      return CryptoJS.AES.encrypt(JSON.stringify(data), ENCRYPTION_KEY).toString()
    } catch (error) {
      console.error('Encryption error:', error)
      return ''
    }
  }

  static decryptData(encrypted: string): any {
    try {
      const bytes = CryptoJS.AES.decrypt(encrypted, ENCRYPTION_KEY)
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
    } catch (error) {
      console.error('Decryption error:', error)
      return null
    }
  }

  static storeSecurely(key: string, data: any): void {
    if (typeof window === 'undefined') return
    try {
      const encrypted = this.encryptData(data)
      localStorage.setItem(key, encrypted)
    } catch (error) {
      console.error('Storage error:', error)
    }
  }

  static getSecurely(key: string): any {
    if (typeof window === 'undefined') return null
    try {
      const encrypted = localStorage.getItem(key)
      if (!encrypted) return null
      return this.decryptData(encrypted)
    } catch (error) {
      console.error('Retrieval error:', error)
      return null
    }
  }

  static clearSecurely(key: string): void {
    if (typeof window === 'undefined') return
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error('Clear error:', error)
    }
  }
}

export async function detectUserLocation() {
  try {
    const response = await fetch('https://ipapi.co/json/')
    const data = await response.json()
    return {
      country: data.country_code || 'US',
      currency: data.currency || 'USD',
    }
  } catch (error) {
    console.error('Location detection error:', error)
    return { country: 'US', currency: 'USD' }
  }
}

export const currencySymbols: Record<string, string> = {
  KES: 'KSh',
  USD: '$',
  EUR: '€',
  GBP: '£',
  UGX: 'USh',
  TZS: 'TSh',
  ZAR: 'R',
  NGN: '₦',
  GHS: '₵',
  INR: '₹',
}

export const pppRates: Record<string, number> = {
  KE: 1,
  US: 0.0078,
  GB: 0.0062,
  IN: 0.65,
  NG: 12.5,
  ZA: 0.13,
  UG: 29.5,
  GH: 0.12,
  CA: 0.0073,
  AU: 0.012,
}

export function convertPrice(priceKES: number, targetCurrency: string): number {
  const currencyToCountry: Record<string, string> = {
    KES: 'KE',
    USD: 'US',
    GBP: 'GB',
    INR: 'IN',
    NGN: 'NG',
    ZAR: 'ZA',
    EUR: 'US', // Default to USD for EUR conversion
    AUD: 'AU',
  }
  
  const country = currencyToCountry[targetCurrency] || 'US'
  const rate = pppRates[country] || 1
  return Math.round(priceKES * rate * 100) / 100
}

export function showNotification(message: string, type: 'success' | 'error' | 'info' = 'info'): void {
  if (typeof window === 'undefined') return

  const notification = document.createElement('div')
  const bgColor = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
  }[type]

  notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${bgColor} text-white max-w-sm animate-fade-in`
  notification.textContent = message
  document.body.appendChild(notification)

  setTimeout(() => {
    notification.style.opacity = '0'
    notification.style.transition = 'opacity 0.3s'
    setTimeout(() => notification.remove(), 300)
  }, 3000)
}
