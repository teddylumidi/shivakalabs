/**
 * pages.js — Per-page SEO metadata.
 * Used at runtime (src/components/Seo.jsx) and at build time
 * (scripts/postbuild.mjs) to generate a static HTML entry, sitemap and
 * canonical URL for every route.
 */

export const SITE_NAME = 'ShivakaLabs';

export const PAGES = [
  {
    path: '/',
    title: 'ShivakaLabs | eCitizen Help, Web Design & Digital Marketing in Kenya',
    description:
      'ShivakaLabs offers eCitizen portal assistance, website development, graphic design and digital marketing for individuals and businesses across Kenya. Get help on WhatsApp.',
  },
  {
    path: '/about',
    title: 'About ShivakaLabs | Kenyan Digital Services Agency',
    description:
      'ShivakaLabs is a remote Kenyan digital services agency helping people navigate government portals, build websites and grow online. Fast, confidential and professional.',
  },
  {
    path: '/ecitizen',
    title: 'eCitizen Services Assistance in Kenya | KRA, NTSA, Passport, ID | ShivakaLabs',
    description:
      'Help with 75+ eCitizen and government portal services you can complete online: KRA PIN and returns, NTSA, passports, good conduct, birth certificates, business registration and more.',
  },
  {
    path: '/webdev',
    title: 'Website Development in Kenya | Business & E-commerce Websites | ShivakaLabs',
    description:
      'Business websites, e-commerce stores, landing pages, WordPress fixes, speed optimisation and custom web applications built mobile-first by ShivakaLabs.',
  },
  {
    path: '/design',
    title: 'Graphic Design Services in Kenya | Logos, Flyers & Branding | ShivakaLabs',
    description:
      'Logo design, flyers, posters, business cards, company profiles, CVs and full branding packages designed professionally by ShivakaLabs.',
  },
  {
    path: '/marketing',
    title: 'Digital Marketing in Kenya | Social Media, SEO & Ads | ShivakaLabs',
    description:
      'Social media management, SEO, Google Business Profile setup, Meta and Google Ads, email marketing and lead generation services from ShivakaLabs.',
  },
  {
    path: '/documents',
    title: 'CV Writing KSh 100 & Cover Letters KSh 30 in Kenya | ShivakaLabs',
    description:
      'Professional CV writing for KSh 100, cover letters for KSh 30, plus application, resignation, recommendation and official letters. Pay with M-Pesa or card and download in Word or PDF.',
  },
];

export const NOT_FOUND = {
  title: 'Page Not Found | ShivakaLabs',
  description: "The page you're looking for doesn't exist or has been moved.",
};

/**
 * Canonical path for a page. GitHub Pages serves /about/index.html and
 * redirects /about to /about/, so canonical URLs use the trailing slash.
 */
export function canonicalPath(path) {
  return path === '/' ? '/' : `${path}/`;
}

export function pageFor(pathname) {
  const clean = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  return PAGES.find(p => p.path === clean);
}
