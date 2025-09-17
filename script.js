// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize components based on page
  initDarkMode();
  initScrollProgress();
  initMobileMenu();
  
  // Page-specific initializations
  if (document.querySelector('.hero')) {
    initTypedJS();
    initCounter();
  }
  
  if (document.getElementById('contactForm')) {
    initFormValidation();
  }
  
  if (document.getElementById('searchServices')) {
    initServiceSearch();
  }
  
  if (document.querySelector('.tab-button')) {
    initTabs();
  }
  
  if (document.querySelector('.faq-question')) {
    initFAQ();
  }
  
  // Initialize animations
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 1000,
      once: true
    });
  }
});

// Dark Mode Toggle
function initDarkMode() {
  const darkModeToggle = document.getElementById('darkModeToggle');
  if (!darkModeToggle) return;
  
  // Check for saved theme preference
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
  }
  
  darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    // Save preference
    if (document.body.classList.contains('dark-mode')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  });
}

// Scroll Progress Bar
function initScrollProgress() {
  window.onscroll = function() {
    const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
      progressBar.style.width = `${scrolled}%`;
    }
  };
}

// Mobile Menu Toggle
function initMobileMenu() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('nav ul');
  
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      nav.classList.toggle('show');
      menuBtn.classList.toggle('active');
    });
  }
}

// Typed.js Initialization
function initTypedJS() {
  if (document.getElementById('typed')) {
    new Typed('#typed', {
      strings: ['Laptop Repairs', 'Mobile Fixes', 'ICT Consultations', 'Tech Solutions'],
      typeSpeed: 50,
      backSpeed: 30,
      loop: true
    });
  }
}

// Animated Counter
function initCounter() {
  const countElement = document.getElementById('devicesRepaired');
  if (!countElement) return;
  
  let count = 0;
  const targetCount = 1287;
  const speed = 15;

  function animateCount() {
    const increment = Math.ceil(targetCount / 100);
    const counter = setInterval(() => {
      count += increment;
      if (count >= targetCount) {
        count = targetCount;
        clearInterval(counter);
      }
      countElement.textContent = count.toLocaleString();
    }, speed);
  }

  // Only animate when in viewport
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      animateCount();
      observer.disconnect();
    }
  }, { threshold: 0.5 });
  
  observer.observe(countElement);
}

// Form Validation
function initFormValidation() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;
  
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    
    let valid = true;
    document.querySelectorAll('.feedback').forEach(f => f.textContent = '');
    document.querySelectorAll('input, textarea').forEach(i => i.classList.remove('error', 'success'));
    
    // Name validation
    if (name.value.trim() === '') {
      document.getElementById('nameFeedback').textContent = 'Name is required';
      name.classList.add('error');
      valid = false;
    } else {
      name.classList.add('success');
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
      document.getElementById('emailFeedback').textContent = 'Invalid email';
      email.classList.add('error');
      valid = false;
    } else {
      email.classList.add('success');
    }
    
    // Message validation
    if (message.value.trim() === '') {
      document.getElementById('messageFeedback').textContent = 'Message is required';
      message.classList.add('error');
      valid = false;
    } else {
      message.classList.add('success');
    }
    
    const formMessage = document.getElementById('formMessage');
    if (valid) {
      formMessage.textContent = 'Message sent successfully! We will get back to you soon.';
      formMessage.style.color = '#2ecc71';
      contactForm.reset();
      
      // Clear message after 5 seconds
      setTimeout(() => {
        formMessage.textContent = '';
      }, 5000);
    } else {
      formMessage.textContent = 'Please fix the errors above.';
      formMessage.style.color = '#e74c3c';
    }
  });
}

// Service Search Filter
function initServiceSearch() {
  const searchInput = document.getElementById('searchServices');
  if (!searchInput) return;
  
  searchInput.addEventListener('input', function() {
    const query = this.value.toLowerCase();
    const items = document.querySelectorAll('#servicesList li');
    
    items.forEach(item => {
      const serviceName = item.querySelector('.service-name').textContent.toLowerCase();
      item.style.display = serviceName.includes(query) ? 'flex' : 'none';
    });
  });
}

// Tabbed Interface
function initTabs() {
  document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons and content
      document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
      
      // Add active class to clicked button and corresponding content
      button.classList.add('active');
      document.getElementById(button.dataset.tab).classList.add('active');
    });
  });
}

// FAQ Toggle
function initFAQ() {
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const answer = q.nextElementSibling;
      answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
      q.classList.toggle('active');
    });
  });
}

// Current Page Highlight
function highlightCurrentPage() {
  const currentPage = location.pathname.split('/').pop();
  const navLinks = document.querySelectorAll('nav a');
  
  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// Initialize when DOM is ready
highlightCurrentPage();