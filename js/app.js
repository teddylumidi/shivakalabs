/* ============================================================
   ShivakaLabs — app.js
   Navbar + footer injected inline (no fetch, works on file://)
   ============================================================ */

const WA_NUMBER = '254716358703';

function waLink(serviceName) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hello, I need help with ' + serviceName)}`;
}

/* ===== SHARED NAVBAR HTML ===== */
const NAVBAR_HTML = `
<nav class="navbar navbar-expand-lg" id="mainNavbar">
  <div class="container-fluid">
    <a class="navbar-brand" href="index.html">
      <img src="img/logo.png" alt="ShivakaLabs Logo" class="logo-img">
      Shivaka<span class="brand-accent">Labs</span>
    </a>
    <button class="navbar-toggler" type="button"
      data-bs-toggle="collapse" data-bs-target="#navMenu"
      aria-controls="navMenu" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navMenu">
      <ul class="navbar-nav ms-auto align-items-lg-center">
        <li class="nav-item"><a class="nav-link" href="index.html"     data-page="home">Home</a></li>
        <li class="nav-item"><a class="nav-link" href="about-us.html"  data-page="about">About Us</a></li>
        <li class="nav-item"><a class="nav-link" href="ecitizen.html"  data-page="ecitizen">eCitizen Services</a></li>
        <li class="nav-item"><a class="nav-link" href="webdev.html"    data-page="webdev">Web Development</a></li>
        <li class="nav-item"><a class="nav-link" href="design.html"    data-page="design">Graphic Design</a></li>
        <li class="nav-item"><a class="nav-link" href="marketing.html" data-page="marketing">Digital Marketing</a></li>
      </ul>
      <a href="https://wa.me/254716358703?text=Hello%2C%20I%20would%20like%20to%20know%20more%20about%20your%20services"
         target="_blank" rel="noopener noreferrer"
         class="btn-wa-nav ms-lg-3 mt-2 mt-lg-0">
        <i class="fa fa-whatsapp"></i> WhatsApp
      </a>
    </div>
  </div>
</nav>`;

/* ===== SHARED FOOTER HTML ===== */
const FOOTER_HTML = `
<footer>
  <div class="footer-body">
    <div class="container-fluid">
      <div class="footer-cols">
        <div class="footer-brand">
          <div style="display:flex;align-items:center;gap:0.6rem;margin-bottom:0.75rem;">
            <img src="img/logo.png" alt="ShivakaLabs Logo" style="height:42px;width:auto;">
            <h3 style="margin:0;">Shivaka<span class="accent">Labs</span></h3>
          </div>
          <p>Professional digital services for Kenya's businesses and individuals — eCitizen portal assistance, website development, graphic design &amp; digital marketing.</p>
          <div class="social-icons" style="margin-top:1.25rem;">
            <a href="https://www.facebook.com/shivakalabs" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="Facebook"><i class="fa fa-facebook"></i></a>
            <a href="https://www.instagram.com/shivakalabs" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="Instagram"><i class="fa fa-instagram"></i></a>
            <a href="https://twitter.com/shivakalabs" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="Twitter"><i class="fa fa-twitter"></i></a>
            <a href="https://www.linkedin.com/company/shivakalabs" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="LinkedIn"><i class="fa fa-linkedin"></i></a>
            <a href="https://wa.me/254716358703" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="WhatsApp"><i class="fa fa-whatsapp"></i></a>
          </div>
        </div>
        <div class="footer-col">
          <h5>Quick Links</h5>
          <ul class="footer-links">
            <li><a href="index.html">Home</a></li>
            <li><a href="about-us.html">About Us</a></li>
            <li><a href="index.html#popular">Popular Services</a></li>
            <li><a href="index.html#faq">FAQ</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h5>Services</h5>
          <ul class="footer-links">
            <li><a href="ecitizen.html">eCitizen Portal</a></li>
            <li><a href="webdev.html">Web Development</a></li>
            <li><a href="design.html">Graphic Design</a></li>
            <li><a href="marketing.html">Digital Marketing</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h5>Contact</h5>
          <ul class="footer-links">
            <li><a href="https://wa.me/254716358703" target="_blank" rel="noopener noreferrer"><i class="fa fa-whatsapp" style="color:var(--wa-green);"></i> +254 716 358 703</a></li>
            <li><a href="mailto:info@shivakalabs.com"><i class="fa fa-envelope" style="color:var(--gold);"></i> info@shivakalabs.com</a></li>
            <li><span style="color:var(--gray-200);"><i class="fa fa-map-marker" style="color:var(--gold);"></i> Remote Kenya</span></li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <div class="footer-bottom">
    <div class="container-fluid">
      <p>&copy; <span id="footerYear">${new Date().getFullYear()}</span> ShivakaLabs. All rights reserved.</p>
    </div>
  </div>
</footer>`;

/* ===== INJECT COMPONENTS (no fetch — works on file:// and http://) ===== */
function injectComponents() {
  const navEl = document.getElementById('navbar-container');
  const footEl = document.getElementById('footer-container');
  if (navEl)  navEl.innerHTML  = NAVBAR_HTML;
  if (footEl) footEl.innerHTML = FOOTER_HTML;

  // Re-init Bootstrap dropdowns after injection
  if (typeof bootstrap !== 'undefined') {
    document.querySelectorAll('[data-bs-toggle="dropdown"]').forEach(el => {
      bootstrap.Dropdown.getOrCreateInstance(el);
    });
  }
}

/* ===== ACTIVE NAV LINK ===== */
function markActivePage() {
  const page = document.body.dataset.page || '';
  if (!page) return;
  document.querySelectorAll('#mainNavbar .nav-link[data-page]').forEach(link => {
    if (link.dataset.page === page) {
      link.classList.add('active-page');
      link.setAttribute('aria-current', 'page');
    }
  });
}

/* ===== NAVBAR SCROLL EFFECT ===== */
function initNavbarScroll() {
  const navbar = document.getElementById('mainNavbar');
  if (!navbar) return;
  const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 50);
  onScroll(); // set initial state
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ===== COLLAPSE MOBILE NAV ON LINK CLICK ===== */
function initNavbarCollapse() {
  document.querySelectorAll('#navMenu .nav-link:not(.dropdown-toggle)').forEach(link => {
    link.addEventListener('click', () => {
      const menu = document.getElementById('navMenu');
      if (menu && menu.classList.contains('show') && typeof bootstrap !== 'undefined') {
        bootstrap.Collapse.getInstance(menu)?.hide();
      }
    });
  });
}

/* ===== SMOOTH SCROLL ===== */
function initSmoothScroll() {
  document.addEventListener('click', e => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const href = link.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
}

/* ===== FAQ TOGGLE ===== */
function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  if (!item) return;
  const isOpen = item.classList.contains('open');
  // Close all
  document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
  // Open this one if it was closed
  if (!isOpen) item.classList.add('open');
}

/* ===== LAZY IMAGE LOADING ===== */
function initLazyImages() {
  const imgs = document.querySelectorAll('img[loading="lazy"]');
  if (!imgs.length) return;
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries, o) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('img-loaded'); o.unobserve(e.target); }
      });
    }, { rootMargin: '120px' });
    imgs.forEach(img => img.complete ? img.classList.add('img-loaded') : obs.observe(img));
  } else {
    imgs.forEach(img => img.classList.add('img-loaded'));
  }
}

/* ===== SERVICE GRID RENDERER ===== */
function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9\s-]/g,'').replace(/\s+/g,'-').replace(/-+/g,'-').trim();
}

function renderServiceGrid(data, containerId, fallbackImg) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const fb = fallbackImg || 'img/logo.png';
  container.innerHTML = data.map(svc => `
    <div class="svc-card" data-category="${svc.category||''}" data-name="${svc.name.toLowerCase()}">
      <img src="img/services/${slugify(svc.name)}.png"
           alt="${svc.name}"
           class="svc-card-img"
           loading="lazy"
           width="400" height="190"
           srcset="img/services/${slugify(svc.name)}.png 400w, img/services/${slugify(svc.name)}.png 800w"
           sizes="(max-width: 600px) 100vw, 400px"
           onerror="this.src='${fb}'">
      <div class="svc-card-body">
        <i class="fa ${svc.icon} svc-card-icon" aria-hidden="true"></i>
        <h5>${svc.name}</h5>
        <p>${svc.desc}</p>
        <a class="btn-wa" href="${waLink(svc.name)}" target="_blank" rel="noopener noreferrer">
          <i class="fa fa-whatsapp" aria-hidden="true"></i> Get Help on WhatsApp
        </a>
      </div>
    </div>`).join('');
  initLazyImages();
}

/* ===== SERVICE FILTER ===== */
let activeFilter = 'all';

function setFilter(category, btn) {
  activeFilter = category;
  document.querySelectorAll('.filter-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  applyServiceFilter();
}

function applyServiceFilter() {
  const q = (document.getElementById('serviceSearch')?.value || '').toLowerCase().trim();
  const cards = document.querySelectorAll('.svc-grid .svc-card, .service-grid .svc-card');
  let vis = 0;
  cards.forEach(card => {
    const matchCat  = activeFilter === 'all' || card.dataset.category === activeFilter;
    const matchText = !q || card.dataset.name.includes(q) || card.querySelector('p')?.textContent.toLowerCase().includes(q);
    const show = matchCat && matchText;
    card.style.display = show ? '' : 'none';
    if (show) vis++;
  });
  const noRes = document.getElementById('noResults');
  if (noRes) noRes.style.display = vis === 0 ? 'block' : 'none';
}

/* ===== MAIN INIT ===== */
document.addEventListener('DOMContentLoaded', () => {
  injectComponents();    // inject navbar + footer inline — no fetch needed
  markActivePage();
  initNavbarScroll();
  initNavbarCollapse();
  initSmoothScroll();
  initLazyImages();
});
