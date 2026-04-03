# Individual Service Images - Implementation Guide

## System Overview

Each of the 212 services now has support for its own individual image. The system uses automatic slug-based image naming, making it easy to add images without modifying code.

---

## Image Organization

All service images should be placed in:
```
img/services/
├── [service-slug].png
```

**Example Service Slugs:**
- "New ID Application Assistance" → `new-id-application-assistance.png`
- "Passport Application Assistance" → `passport-application-assistance.png`
- "Logo Design" → `logo-design.png`
- "Social Media Management" → `social-media-management.png`

---

## How It Works

### Image Name Generation

The system automatically converts service names to image filenames using the `slugify()` function:

1. **Converts to lowercase** → "Passport Application" → "passport application"
2. **Removes special characters** → "Passport Application" → "passport application"
3. **Replaces spaces with hyphens** → "passport application" → "passport-application"
4. **Removes duplicate hyphens** → Result: `passport-application.png`

### Image Loading

**In Homepage Grid (index.html):**
```javascript
getServiceImage(serviceName, category)
// Returns: img/services/[slug].png
```

**Fallback Behavior:**
- If individual service image NOT found → Falls back to category image
  - eCitizen services → `img/ecitizen-hero.png`
  - Web Dev services → `img/webdev-hero.png`
  - Design services → `img/design-hero.png`
  - Marketing services → `img/marketing-hero.png`
  - Other services → `img/others-hero.png`
- If category image NOT found → Falls back to `img/logo.png`

**In Service Detail Pages (service.html):**
- Each service card displays its individual image (150px height)
- If image not available, hides the image element and shows Font Awesome icon instead
- Related services section also shows individual images with fallback to icons

---

## File Naming Convention

**Format:** `service-name.png`

**Rules:**
- Use lowercase only
- Replace spaces and underscores with hyphens (-)
- Remove all special characters except hyphens
- Use .png format
- Recommended size: 400x300px (will be scaled as needed)
- Keep file size under 150KB for web optimization

### Examples of Correct Naming

| Service Name | Image Filename |
|---|---|
| New ID Application Assistance | new-id-application-assistance.png |
| ID Replacement Assistance | id-replacement-assistance.png |
| Birth Certificate Application | birth-certificate-application.png |
| Passport Renewal Assistance | passport-renewal-assistance.png |
| Smart Driving License Renewal | smart-driving-license-renewal.png |
| Certificate of Good Conduct | certificate-of-good-conduct.png |
| Business Name Registration | business-name-registration.png |
| KRA PIN Registration | kra-pin-registration.png |
| Logo Design | logo-design.png |
| Website Design | website-design.png |
| Social Media Management | social-media-management.png |
| Email Marketing Setup | email-marketing-setup.png |

---

## Where Images Display

### 1. Homepage Service Grids (400x300px)
- **File:** index.html
- **Location:** Below service icon, above service name
- **Displayed in:** 
  - eCitizen Services section
  - Web Development section
  - Graphic Design section
  - Digital Marketing section
  - Other Services section

### 2. Popular Services Section (Homepage)
- **File:** index.html
- **Location:** Top section showing 8 featured services
- **Uses individual images when available**

### 3. Service Detail Pages (150px height)
- **File:** service.html (when user clicks a service)
- **Location:** 
  - Related services cards (bottom of page)
  - Shows 4 similar services from same category

### 4. Related Services Display (service detail page)
- **File:** service.html
- **Location:** "Similar Services" section at bottom
- **Display:** Image + Icon + Title + Description

---

## Total Services Requiring Images

| Category | Count | Image Folder |
|---|---|---|
| eCitizen (ID, Birth, Death, Marriage, Good Conduct, Passport, Immigration, NTSA, KRA, Health, HELB, Business, Land, Courts, Police, County, Other Agencies) | 141 | `img/services/` |
| Web Development | 18 | `img/services/` |
| Graphic Design | 20 | `img/services/` |
| Digital Marketing | 19 | `img/services/` |
| Other Services | 14 | `img/services/` |
| **TOTAL** | **212** | **img/services/** |

---

## Implementation Steps

### Step 1: Create Image Directory
```bash
mkdir img/services
```

### Step 2: Get All Service Slugs
To get the exact filename for each service, open browser console on any page and run:
```javascript
// For eCitizen services
ecitizenServices.forEach(s => console.log(slugify(s.name) + '.png'));

// For Web Dev services
webdevServices.forEach(s => console.log(slugify(s.name) + '.png'));

// For Design services
designServices.forEach(s => console.log(slugify(s.name) + '.png'));

// For Marketing services
marketingServices.forEach(s => console.log(slugify(s.name) + '.png'));

// For Other services
otherServices.forEach(s => console.log(slugify(s.name) + '.png'));
```

### Step 3: Prepare Images
- Create/gather 212 PNG images
- Size them to ~400x300px
- Compress and optimize for web
- Name them according to the slug convention

### Step 4: Upload Images
- Place all PNG files in `img/services/` directory
- Ensure matching filenames exactly

### Step 5: Test
- Visit homepage - verify service cards show individual images
- Click on a service - verify detail page shows images
- Check "Similar Services" section - verify related images display
- Verify fallback works if some images missing

---

## Code Reference

### In index.html (renderGrid function):
```javascript
function getServiceImage(serviceName, category){
  const slug = slugify(serviceName);
  const serviceImg = `img/services/${slug}.png`;
  return serviceImg;
}

// Usage in renderGrid:
<img src="${getServiceImage(s.name, s.category)}" 
     alt="${s.name}" 
     class="svc-image" 
     loading="lazy" 
     onerror="this.src='${categoryFallbackImg}';">
```

### In service.html (related services display):
```javascript
// Related service card now includes:
<img src="${getServiceImage(s.name, s.categoryName)}" 
     alt="${s.name}" 
     style="width: 100%; height: 150px; object-fit: cover; border-radius: 8px; margin-bottom: 1rem;" 
     onerror="this.style.display='none';">
```

---

## Fallback Images (Category Level)

If individual service images are not yet available, these category images will display:

- **eCitizen Services** → `img/ecitizen-hero.png`
- **Web Development** → `img/webdev-hero.png`
- **Graphic Design** → `img/design-hero.png`
- **Digital Marketing** → `img/marketing-hero.png`
- **Other Services** → `img/others-hero.png`

These category images should be created at 400x300px to match service card dimensions.

---

## Image Optimization Tips

1. **Format:** Use PNG for transparency, JPG for photos
2. **Quality:** Keep high DPI (72px minimum) for crisp display
3. **Size:** 400x300px for cards, up to 600x400px for Retina
4. **File Size:** Compress to <150KB per image
5. **Naming:** Use hyphens only, no spaces or special characters
6. **Consistency:** Use similar styling/branding across all services

---

## Quick Reference - All 212 Services to Image Map

### eCitizen Services (141 images needed)
```
1. new-id-application-assistance.png
2. id-replacement-assistance.png
3. id-correction-amendment.png
4. lost-id-replacement-guidance.png
5. id-status-follow-up.png
[... 136 more eCitizen services ...]
```

Use the slug generator above to get complete list for all categories.

---

## Troubleshooting

### Images Not Showing?
1. Verify filename matches slug exactly (case-sensitive on Linux servers)
2. Check file is in `img/services/` directory
3. Verify file extension is .png (not .jpg, .jpeg, etc.)
4. Clear browser cache (Ctrl+Shift+Delete)
5. Check browser console for broken image 404 errors

### Fallback Images Showing Instead?
- This is normal - individual image file not found
- Verify filename against generated slug
- Ensure PNG file exists in img/services/ folder

### Performance Issues?
- Compress images further (use TinyPNG or similar)
- Use WebP format with PNG fallback for better compression
- Consider lazy loading (already implemented)
