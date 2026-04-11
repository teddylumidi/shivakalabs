// ===== LOAD NAVBAR AND FOOTER COMPONENTS =====
async function loadComponent(componentId, filePath) {
  try {
    const response = await fetch(filePath);
    if (!response.ok) throw new Error(`Failed to load ${filePath}`);
    const html = await response.text();
    const container = document.getElementById(componentId);
    if (container) {
      container.innerHTML = html;
      // Reinitialize Bootstrap components
      initializeBootstrap();
    }
  } catch (error) {
    console.error(`Error loading component ${componentId}:`, error);
  }
}

function initializeBootstrap() {
  // Reinitialize all Bootstrap dropdowns and popovers
  if (typeof bootstrap !== 'undefined') {
    document.querySelectorAll('[data-bs-toggle="dropdown"]').forEach(el => {
      new bootstrap.Dropdown(el);
    });
  }
}

// Load components when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  const navbar = document.getElementById('navbar-container');
  const footer = document.getElementById('footer-container');
  
  if (navbar) {
    loadComponent('navbar-container', 'components/navbar.html').then(() => {
      setupNavbarFunctionality();
    });
  }
  if (footer) {
    loadComponent('footer-container', 'components/footer.html');
  }
});

function setupNavbarFunctionality() {
  // Navbar scroll effect
  window.addEventListener('scroll', function() {
    const navbar = document.getElementById('mainNavbar');
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      if (this.getAttribute('href') !== '#') {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // Navbar collapse on link click (mobile)
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      const navbarCollapse = document.querySelector('.navbar-collapse');
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        try {
          bootstrap.Collapse.getInstance(navbarCollapse).hide();
        } catch (e) {
          console.error('Error hiding navbar:', e);
        }
      }
    });
  });
}

// Toggle FAQ items
function toggleFaq(button) {
  const answer = button.nextElementSibling;
  const isOpen = answer.style.display === 'block';
  
  // Close all other open FAQs
  document.querySelectorAll('.faq-answer').forEach(faq => {
    faq.style.display = 'none';
  });
  document.querySelectorAll('.faq-question').forEach(q => {
    q.classList.remove('active');
  });
  
  // Toggle current FAQ
  if (!isOpen) {
    answer.style.display = 'block';
    button.classList.add('active');
  }
}

// Get URL parameter
function getUrlParameter(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}
