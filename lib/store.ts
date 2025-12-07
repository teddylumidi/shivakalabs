import { create } from 'zustand'

export interface AppState {
  currentView: string
  mobileMenuOpen: boolean
  isOnline: boolean
  userCountry: string
  userCurrency: string
  
  setView: (view: string) => void
  toggleMobileMenu: () => void
  closeMobileMenu: () => void
  setOnlineStatus: (status: boolean) => void
  setUserLocation: (country: string, currency: string) => void
}

export const useAppStore = create<AppState>((set) => ({
  currentView: 'home',
  mobileMenuOpen: false,
  isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
  userCountry: 'KE',
  userCurrency: 'KES',
  
  setView: (view) => {
    set({ currentView: view, mobileMenuOpen: false })
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0)
    }
  },
  toggleMobileMenu: () => set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),
  closeMobileMenu: () => set({ mobileMenuOpen: false }),
  setOnlineStatus: (status) => set({ isOnline: status }),
  setUserLocation: (country, currency) => set({ userCountry: country, userCurrency: currency }),
}))

export interface PaymentState {
  pendingPayments: Record<string, any>
  addPendingPayment: (key: string, data: any) => void
  removePendingPayment: (key: string) => void
  clearPendingPayments: () => void
}

export const usePaymentStore = create<PaymentState>((set) => ({
  pendingPayments: {},
  addPendingPayment: (key, data) =>
    set((state) => ({
      pendingPayments: { ...state.pendingPayments, [key]: data },
    })),
  removePendingPayment: (key) =>
    set((state) => {
      const newPayments = { ...state.pendingPayments }
      delete newPayments[key]
      return { pendingPayments: newPayments }
    }),
  clearPendingPayments: () => set({ pendingPayments: {} }),
}))

export interface DocumentGenState {
  tier: 'free' | 'starter' | 'pro' | null
  country: string
  currency: string
  language: string
  documentCount: number
  documentLimit: number
  
  setTier: (tier: 'free' | 'starter' | 'pro') => void
  setCountry: (country: string) => void
  setCurrency: (currency: string) => void
  setLanguage: (language: string) => void
  incrementDocumentCount: () => void
  resetDocuments: () => void
}

export const useDocumentStore = create<DocumentGenState>((set) => ({
  tier: null,
  country: 'KE',
  currency: 'KES',
  language: 'en',
  documentCount: 0,
  documentLimit: 0,
  
  setTier: (tier) =>
    set({
      tier,
      documentLimit: tier === 'free' ? 3 : tier === 'starter' ? 10 : 999,
      documentCount: 0,
    }),
  setCountry: (country) => set({ country }),
  setCurrency: (currency) => set({ currency }),
  setLanguage: (language) => set({ language }),
  incrementDocumentCount: () =>
    set((state) => ({
      documentCount: state.documentCount + 1,
    })),
  resetDocuments: () => set({ documentCount: 0 }),
}))
