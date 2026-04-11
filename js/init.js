// ===== UNIFIED COMPONENT & SERVICE INITIALIZATION =====
// This script should be included on all pages that use components

document.addEventListener('DOMContentLoaded', function() {
  // Load navbar and footer components
  loadComponents();
  
  // If this is the service.html page, load the service based on URL parameter
  if (document.getElementById('service-hero')) {
    const urlParams = new URLSearchParams(window.location.search);
    const serviceId = urlParams.get('id') || 'online-forms';
    loadServiceDetails(serviceId);
    loadRelatedServices(serviceId);
  }
});

async function loadComponents() {
  // Load navbar
  const navbar = document.getElementById('navbar-container');
  if (navbar) {
    try {
      const response = await fetch('components/navbar.html');
      if (response.ok) {
        navbar.innerHTML = await response.text();
        initializeBootstrap();
        setupNavbarFunctionality();
      }
    } catch (error) {
      console.error('Failed to load navbar:', error);
    }
  }
  
  // Load footer
  const footer = document.getElementById('footer-container');
  if (footer) {
    try {
      const response = await fetch('components/footer.html');
      if (response.ok) {
        footer.innerHTML = await response.text();
        initializeBootstrap();
      }
    } catch (error) {
      console.error('Failed to load footer:', error);
    }
  }
}

function initializeBootstrap() {
  if (typeof bootstrap !== 'undefined') {
    // Re-initialize all Bootstrap dropdowns
    document.querySelectorAll('[data-bs-toggle="dropdown"]').forEach(el => {
      try {
        bootstrap.Dropdown.getOrCreateInstance(el);
      } catch (e) {
        // Element might not support dropdown
      }
    });
    
    // Re-initialize tooltips if needed
    document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => {
      try {
        bootstrap.Tooltip.getOrCreateInstance(el);
      } catch (e) {
        // Element might not support tooltip
      }
    });
  }
}

function setupNavbarFunctionality() {
  const navbar = document.getElementById('mainNavbar');
  
  // Navbar scroll effect
  window.addEventListener('scroll', function() {
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  });
  
  // Collapse navbar when link is clicked (mobile)
  document.querySelectorAll('.nav-link:not(.dropdown-toggle)').forEach(link => {
    link.addEventListener('click', () => {
      const navbarCollapse = document.querySelector('.navbar-collapse');
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        const instance = bootstrap.Collapse.getInstance(navbarCollapse);
        if (instance) {
          instance.hide();
        } else {
          navbarCollapse.classList.remove('show');
        }
      }
    });
  });
}

function loadRelatedServices(currentServiceId) {
  const container = document.getElementById('related-services');
  if (!container) return;
  
  container.innerHTML = '';
  
  // Get all service IDs except the current one
  const serviceIds = Object.keys(serviceData).filter(id => id !== currentServiceId);
  
  // Load up to 3 related services
  serviceIds.slice(0, 3).forEach(serviceId => {
    const service = serviceData[serviceId];
    const serviceLink = `service.html?id=${serviceId}`;
    
    const card = document.createElement('div');
    card.style.cssText = 'background: #252525; padding: 2rem; border-radius: 10px; text-align: center; transition: transform 0.3s ease;';
    card.innerHTML = `
      <div style="font-size: 2.5rem; color: #FFD700; margin-bottom: 1rem;">
        <i class="${service.icon}"></i>
      </div>
      <h5 style="color: #ffffff; margin-bottom: 0.5rem;">${service.name}</h5>
      <p style="color: #999999; font-size: 0.9rem; margin-bottom: 1rem;">${service.shortDesc}</p>
      <a href="${serviceLink}" class="btn btn-sm" style="background: #FFD700; color: #000; border: none;">View Service</a>
    `;
    
    card.onmouseenter = function() {
      this.style.transform = 'translateY(-5px)';
    };
    card.onmouseleave = function() {
      this.style.transform = 'translateY(0)';
    };
    
    container.appendChild(card);
  });
}
