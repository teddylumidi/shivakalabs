# ShivakaLabs Service Pages Documentation

## Overview
Individual service pages have been created with detailed information, transparent pricing, and direct WhatsApp contact options. All pages follow the company branding guidelines with:
- Green WhatsApp buttons (#25D366)
- Yellow accent colors (#FFD700)
- Black backgrounds (#000000)
- Consistent navigation
- Company language (We/Us/Our)

## Service Pages Created

### 1. **Good Conduct Certificate Service**
- **File:** `good-conduct.html`
- **Pricing:** KES 300 (Government) + KES 500 (Service) = **KES 800 Total**
- **Features:**
  - Overview of service and why it's needed
  - Requirements section
  - Transparent pricing breakdown
  - Step-by-step process (5 steps)
  - FAQ section with toggle functionality
  - CTA section with WhatsApp link
  - Floating WhatsApp button
  - Full footer with links and social icons

### 2. **Passport Application & Renewal Service**
- **File:** `passport.html`
- **Pricing:**
  - New Passport: KES 3,500 (Gov) + KES 1,500 (Service) = **KES 5,000**
  - Renewal: KES 2,500 (Gov) + KES 1,000 (Service) = **KES 3,500**
- **Features:**
  - New vs. Renewal application support
  - Requirements for both types
  - Dual pricing tables
  - Processing timeline (5-7 days new, 3-5 days renewal)
  - 5-step process visualization
  - Full footer and navigation
  - WhatsApp integration for inquiries

### 3. **KRA PIN Registration Service**
- **File:** `kra-pin.html`
- **Pricing:** FREE (Government) + KES 300 (Service) = **KES 300 Total**
- **Features:**
  - Explanation of why KRA PIN is needed
  - Who can register (individuals, self-employed, businesses)
  - Requirements section
  - Most affordable pricing explanation
  - 5-step process
  - FAQ with toggle functionality
  - Extended FAQ for business-related questions

### 4. **About Us Page**
- **File:** `about-us.html`
- **Sections:**
  - Company mission, vision, values, and commitment
  - 4-card layout for key company attributes
  - "Why Choose Us" section
  - Complete expertise showcase (4 service categories)
  - Contact section with platform-specific colors
  - Full footer with navigation

## How to Link Service Pages from Homepage

To link service cards from `index.html` to individual service pages, update the service card HTML with anchor tags:

### Example for eCitizen Section:
```html
<!-- Change this: -->
<div class="card">
  <em class="fa fa-certificate"></em>
  <h5>Good Conduct Certificate</h5>
  <div class="pra">
    <p>Fast and professional assistance with eCitizen services...</p>
  </div>
</div>

<!-- To this: -->
<div class="card">
  <a href="good-conduct.html" style="text-decoration: none; color: inherit; display: block; height: 100%;">
    <em class="fa fa-certificate"></em>
    <h5>Good Conduct Certificate</h5>
    <div class="pra">
      <p>Fast and professional assistance with eCitizen services...</p>
      <p style="color:#25D366; margin-top:1rem; font-weight:600;">Learn More →</p>
    </div>
  </a>
</div>
```

## Recommended Service Page Linkages

Map these files to your eCitizen services section cards:

1. **Good Conduct Certificate** → `good-conduct.html`
2. **Passport Application** → `passport.html`
3. **KRA PIN Registration** → `kra-pin.html`

For other eCitizen services, you can:
- Create similar pages following the same template
- Or redirect to a general eCitizen services page

## Service Page Template Structure

All service pages include:

```
1. Navigation Bar (8 links + WhatsApp button)
2. Service Header (Hero with service name and CTA)
3. Service Overview (What we offer)
4. Requirements/What You Need (4-card grid)
5. Pricing Section (Transparent breakdown)
6. Process Section (Visual step-by-step)
7. FAQ/Additional Info (Toggle functionality)
8. CTA Section (WhatsApp call-to-action)
9. Footer (Links, social icons, logo)
10. Floating WhatsApp Button
```

## Creating Additional Service Pages

To create pages for other services (e.g., Graphic Design, Web Dev):

1. **Copy one of the existing service pages** as a template
2. **Replace the service-specific content:**
   - Hero title and description
   - Service overview text
   - Requirements list
   - Pricing breakdown (customize for your rates)
   - Process steps (customize for your workflow)
   - FAQ section (add relevant questions)

3. **Update WhatsApp links** with the service name in the message:
   ```
   https://wa.me/254716358703?text=I%20am%20interested%20in%20[SERVICE]%20service
   ```

4. **Add images** to the hero section (update `img/` folder with service-specific images)

5. **Link from index.html** using the same anchor tag approach shown above

## Best Practices

1. **Pricing** - Always show government fees separately from service fees
2. **Transparency** - Be clear about processing times and requirements
3. **WhatsApp** - Every page has at least 3 CTA buttons pointing to WhatsApp
4. **Mobile** - All pages are fully responsive (test on mobile devices)
5. **Consistency** - Use the same color scheme, fonts, and layout
6. **SEO** - Each page has unique meta descriptions and titles

## Testing Checklist

Before publishing, test each service page:

- [ ] All navigation links work and point to correct pages
- [ ] WhatsApp links open with the service name pre-filled
- [ ] Responsive design works on mobile, tablet, and desktop
- [ ] Floating WhatsApp button is visible and clickable
- [ ] Images load correctly (if hero images added)
- [ ] FAQ toggles open and close smoothly
- [ ] Footer links all work
- [ ] Social media links open in new tabs
- [ ] Navbar highlights active page correctly

## Next Steps

1. **Add Hero Images** - Upload PNG files for each service to `img/` folder:
   - `ecitizen-hero.png` - For government services
   - `webdev-hero.png` - For web development pages (when created)
   - `design-hero.png` - For graphic design pages (when created)
   - `marketing-hero.png` - For digital marketing pages (when created)

2. **Update index.html** - Add links from service cards to individual pages

3. **Create Additional Pages** - Following this same template for:
   - Web Development services
   - Graphic Design services
   - Digital Marketing services
   - Any other specialized services

4. **Update About Us Link** - Ensure "About Us" nav link points to `about-us.html`

## File Inventory

Complete file structure after setup:

```
shivakalabs/
├── index.html                    (Homepage - update with service page links)
├── about-us.html                 (Company information page)
├── good-conduct.html             (Good Conduct Certificate service)
├── passport.html                 (Passport application service)
├── kra-pin.html                  (KRA PIN registration service)
├── styles.css                    (Updated with 4-column grid)
├── package.json
├── README.md
├── PHOTOS_NEEDED.md
├── CHANGES_COMPLETED.md
├── SERVICES_SETUP.md             (This file)
└── img/
    ├── logo.jpg
    ├── about-team.png
    ├── ecitizen-hero.png         (To be added)
    ├── webdev-hero.png           (To be added)
    ├── design-hero.png           (To be added)
    └── marketing-hero.png        (To be added)
```

## Support

All service pages include WhatsApp contact buttons pre-configured with:
- Phone: 0716 358 703
- Message: Service-specific message populated automatically

Users can click any WhatsApp button to start a conversation about that specific service.

---

**Last Updated:** 2024
**Status:** Service pages template created and ready for deployment
**Next Phase:** Link pages from homepage and upload hero images
