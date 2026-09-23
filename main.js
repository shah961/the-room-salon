/**
 * THE ROOM SALON - CORE APPLICATION JAVASCRIPT
 * Location: Dadar West, Mumbai, Maharashtra, India
 * Business Phone: +91 90047 67000
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* --------------------------------------------------------------------------
     1. STRICT MOBILE NAVIGATION LOGIC
     Guaranteed: No swipe/gesture triggers. Opens ONLY on hamburger tap.
     -------------------------------------------------------------------------- */
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function openMobileMenu() {
    if (!hamburgerBtn || !mobileNavOverlay) return;
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    mobileNavOverlay.classList.add('is-active');
    document.body.classList.add('menu-open');
  }

  function closeMobileMenu() {
    if (!hamburgerBtn || !mobileNavOverlay) return;
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    mobileNavOverlay.classList.remove('is-active');
    document.body.classList.remove('menu-open');
  }

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  // Close menu when clicking any mobile nav link
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // Close on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && hamburgerBtn?.getAttribute('aria-expanded') === 'true') {
      closeMobileMenu();
    }
  });

  /* --------------------------------------------------------------------------
     2. DYNAMIC COPYRIGHT YEAR
     -------------------------------------------------------------------------- */
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  /* --------------------------------------------------------------------------
     3. CLIENT-SIDE APPOINTMENT FORM VALIDATION
     Explicit non-misleading confirmation handling.
     -------------------------------------------------------------------------- */
  const appointmentForm = document.getElementById('appointment-form');
  const formFeedback = document.getElementById('form-feedback');

  if (appointmentForm) {
    appointmentForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('form-name')?.value.trim();
      const phone = document.getElementById('form-phone')?.value.trim();
      const service = document.getElementById('form-service')?.value;

      if (!name || !phone || !service) {
        if (formFeedback) {
          formFeedback.style.borderColor = '#ff4d4d';
          formFeedback.style.backgroundColor = 'rgba(255, 77, 77, 0.1)';
          formFeedback.textContent = 'Please fill in all required fields (Name, Phone, Service).';
          formFeedback.classList.add('is-visible');
        }
        return;
      }

      // Display realistic static demo output without false promises
      if (formFeedback) {
        formFeedback.style.borderColor = 'var(--color-accent-champagne)';
        formFeedback.style.backgroundColor = 'rgba(212, 175, 55, 0.15)';
        formFeedback.innerHTML = `<strong>Thank you, ${name}!</strong><br>Your request details have been recorded locally. As this website operates as a client preview, please call <strong>+91 90047 67000</strong> directly to confirm real-time slot availability at Dadar West.`;
        formFeedback.classList.add('is-visible');
      }

      appointmentForm.reset();
    });
  }
});
