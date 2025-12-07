'use client'

import { useAppStore } from '@/lib/store'
import HomeView from './views/HomeView'
import EcitzenView from './views/EcitzenView'
import WebDevView from './views/WebDevView'
import GraphicDesignView from './views/GraphicDesignView'
import DigitalMarketingView from './views/DigitalMarketingView'
import CVWritingView from './views/CVWritingView'
import DocumentsGenView from './views/DocumentsGenView'
import AboutView from './views/AboutView'
import HowItWorksView from './views/HowItWorksView'
import TermsView from './views/TermsView'

const views: Record<string, React.ComponentType> = {
  home: HomeView,
  about: AboutView,
  ecitizen: EcitzenView,
  'web-development': WebDevView,
  'graphic-design': GraphicDesignView,
  'digital-marketing': DigitalMarketingView,
  'cv-writing': CVWritingView,
  'documents-gen': DocumentsGenView,
  'how-it-works': HowItWorksView,
  terms: TermsView,
}

export default function ContentArea() {
  const { currentView } = useAppStore()
  const ViewComponent = views[currentView] || HomeView

  return (
    <div id="content-area" className="w-full">
      <ViewComponent />
    </div>
  )
}
