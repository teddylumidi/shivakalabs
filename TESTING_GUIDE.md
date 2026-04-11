<!-- QUICK START - Testing Services -->

# Testing the Fixed Services System

## Method 1: Quick Test Links
Open browser and test these links directly:

### Test Each Service Opens Independently:
- http://localhost:8000/service.html (default - Online Form Filling)
- http://localhost:8000/service.html?id=online-forms
- http://localhost:8000/service.html?id=document-scanning  
- http://localhost:8000/service.html?id=cv-writing
- http://localhost:8000/service.html?id=pdf-editing
- http://localhost:8000/service.html?id=online-applications
- http://localhost:8000/service.html?id=email-setup
- http://localhost:8000/service.html?id=other-digital

**Expected Result:** Each URL shows different service content, WhatsApp link changes per service, related services update.

## Method 2: Navigate Through UI
1. Open index.html
2. Click navbar "Other Services" dropdown
3. Click any service link
4. Verify:
   - URL shows service.html?id=...
   - Service name displays correctly
   - Service icon shows
   - Service description shows
   - WhatsApp button text is service-specific
   - 3 related services appear below
   - Clicking related service loads that service

## Method 3: Direct Navbar Navigation  
1. Open service.html?id=online-forms
2. Scroll to navbar
3. Navigate to another section (About Us, Home, etc.)
4. Verify navbar loads from components/navbar.html
5. Return to Any Service → Other Services dropdown
6. Click different service
7. Verify it loads independently

## Files to Verify Are Working

### Core Service System:
- service.html ✓ (loads services dynamically)
- js/services.js ✓ (contains all service data)
- js/init.js ✓ (handles component loading)
- components/navbar.html ✓ (has ?id= links)

### Supporting Files:
- js/components.js (for other pages that might use components)
- styles.css (should style service pages)
- Bootstrap CSS/JS (from CDN)

## Expected Behavior After Fix

### ✓ NO MORE DUPLICATION
- Navbar code not repeated in ecitizen.html, webdev.html, etc.
- Each page loads navbar from components/navbar.html
- Single update point for all navbar changes

### ✓ SERVICES WORK INDEPENDENTLY  
- Each "Other Service" link opens service.html with ?id parameter
- Page content changes based solely on URL parameter
- No separate HTML files needed (service-online-forms.html, service-cv-writing.html, etc. NOT used)
- All services use the same service.html template

### ✓ DYNAMIC CONTENT
- Service name, icon, description updates
- Full service details display
- WhatsApp button sends service-specific messages
- Similar services show related offerings

## Troubleshooting

**If service doesn't load:**
- Check browser console for JavaScript errors
- Verify serviceData object exists in js/services.js
- Check URL parameter: service.html?id=SERVICE_ID
- Verify service ID matches key in serviceData

**If navbar doesn't appear:**
- Check browser console for fetch errors
- Verify components/navbar.html exists
- Check if navbar-container div exists on page
- Verify js/components.js loads properly

**If WhatsApp link is wrong:**
- Verify loadServiceDetails() is called
- Check whatsappText in service data matches service ID
- Verify service ID is correct in URL

## Commands to Verify Setup

```bash
# Check service.html exists and has navbar-container
grep -n "navbar-container" service.html

# Check services.js has all 7 services
grep "'online-forms'\\|'document-scanning'\\|'cv-writing'\\|'pdf-editing'\\|'online-applications'\\|'email-setup'\\|'other-digital'" js/services.js

# Check navbar has correct links
grep "service.html?id=" components/navbar.html

# Verify loadServiceDetails function exists
grep -n "function loadServiceDetails" js/services.js
```

## Browser DevTools Debugging

1. Open service.html?id=cv-writing
2. Open DevTools (F12)
3. Console tab:
   - Type: serviceData['cv-writing']
   - Should show CV/Resume Writing service object
   - Type: loadServiceDetails('cv-writing')  
   - Should see page content update

4. Elements tab:
   - Find #service-name element
   - Should contain "CV / Resume Writing"
   - Find #whatsapp-btn
   - Should have href with cv-writing text

## Success Metrics

- [ ] Service links work from navbar dropdown
- [ ] Each service shows unique content
- [ ] Related services display and link correctly
- [ ] WhatsApp buttons are service-specific
- [ ] Page titles update per service
- [ ] No 404 errors for service-*.html files
- [ ] Navbar loads without duplication
- [ ] No JavaScript console errors
