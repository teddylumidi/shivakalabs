// Security utilities for frontend
class SecurityManager {
  constructor() {
    this.csrfToken = null;
    this.requestQueue = [];
    this.isOnline = navigator.onLine;
    this.initOfflineDetection();
  }

  initOfflineDetection() {
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.syncQueue();
      this.showNotification('Back online!');
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
      this.showNotification('You are offline - changes will sync when back online');
    });
  }

  async initCSRFToken() {
    try {
      const response = await fetch('/api/csrf-token');
      const data = await response.json();
      this.csrfToken = data.token;
      localStorage.setItem('csrf_token', data.token);
    } catch (error) {
      console.error('CSRF token error:', error);
    }
  }

  sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
  }

  validateEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  }

  validatePhone(phone) {
    const regex = /^254\d{9}$|^\+254\d{9}$|^0\d{9}$/;
    return regex.test(phone.replace(/\s+/g, ''));
  }

  async secureFetch(url, options = {}) {
    const sanitizedUrl = this.sanitizeInput(url);
    
    if (!this.isOnline && options.method !== 'GET') {
      this.requestQueue.push({ url: sanitizedUrl, options });
      return { success: false, offline: true };
    }

    try {
      const fetchOptions = {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          ...options.headers
        }
      };

      if (this.csrfToken) {
        fetchOptions.headers['X-CSRF-Token'] = this.csrfToken;
      }

      const response = await fetch(sanitizedUrl, fetchOptions);
      
      if (!response.ok) {
        if (response.status === 429) {
          this.showNotification('Too many requests. Please try again later.', 'error');
        }
        return { success: false, error: response.statusText };
      }

      return await response.json();
    } catch (error) {
      if (!this.isOnline) {
        this.requestQueue.push({ url: sanitizedUrl, options });
        return { success: false, offline: true };
      }
      console.error('Fetch error:', error);
      return { success: false, error: error.message };
    }
  }

  async syncQueue() {
    while (this.requestQueue.length > 0 && this.isOnline) {
      const { url, options } = this.requestQueue.shift();
      try {
        await this.secureFetch(url, options);
      } catch (error) {
        this.requestQueue.unshift({ url, options });
        break;
      }
    }
  }

  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
      type === 'error' ? 'bg-red-500' : 'bg-green-500'
    } text-white max-w-sm`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transition = 'opacity 0.3s';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  encryptData(data) {
    return btoa(JSON.stringify(data));
  }

  decryptData(encrypted) {
    try {
      return JSON.parse(atob(encrypted));
    } catch (e) {
      return null;
    }
  }

  storeSecurely(key, data) {
    try {
      if (typeof data === 'object') {
        localStorage.setItem(key, this.encryptData(data));
      } else {
        localStorage.setItem(key, this.sanitizeInput(data));
      }
    } catch (error) {
      console.error('Storage error:', error);
    }
  }

  getSecurely(key) {
    try {
      const data = localStorage.getItem(key);
      if (data && data.startsWith('{')) {
        return this.decryptData(data);
      }
      return data;
    } catch (error) {
      console.error('Retrieval error:', error);
      return null;
    }
  }

  clearSecurely(key) {
    localStorage.removeItem(key);
  }
}

// Initialize security manager
const securityManager = new SecurityManager();

// Load CSRF token on page load
document.addEventListener('DOMContentLoaded', () => {
  securityManager.initCSRFToken();

  // Register service worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
      .then(reg => console.log('Service Worker registered'))
      .catch(err => console.error('Service Worker error:', err));
  }
});
