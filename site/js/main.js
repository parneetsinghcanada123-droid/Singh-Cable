/* =========================================================
   Singh Cable Network — site scripts
   - Mobile hamburger menu
   - Contact form (validation + email via FormSubmit AJAX)
   ========================================================= */
(function () {
  'use strict';

  /* ---------- Mobile menu ---------- */
  var hamburger = document.querySelector('.hamburger');
  var mobileMenu = document.querySelector('.mobile-menu');

  function openMenu() {
    if (!mobileMenu) return;
    mobileMenu.hidden = false;
    if (hamburger) hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    if (!mobileMenu) return;
    mobileMenu.hidden = true;
    if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (hamburger) hamburger.addEventListener('click', openMenu);
  document.querySelectorAll('[data-close-menu]').forEach(function (el) {
    el.addEventListener('click', closeMenu);
  });
  document.querySelectorAll('.mobile-nav a').forEach(function (el) {
    el.addEventListener('click', closeMenu);
  });
  window.addEventListener('resize', function () {
    if (window.innerWidth >= 880) closeMenu();
  });

  /* ---------- Contact form ---------- */
  var form = document.getElementById('contact-form');
  if (!form) return;

  var FORM_ENDPOINT = 'https://formsubmit.co/ajax/parneet.singh.canada123@gmail.com';

  var successBox = document.getElementById('form-success');
  var sendError = document.getElementById('send-error');
  var submitBtn = form.querySelector('button[type="submit"]');
  var resetBtn = document.getElementById('reset-form');

  function showError(name, message) {
    var el = form.querySelector('[data-error="' + name + '"]');
    if (el) { el.textContent = message; el.style.display = message ? 'block' : 'none'; }
  }
  function clearErrors() {
    ['name', 'phone', 'message'].forEach(function (n) { showError(n, ''); });
    if (sendError) sendError.style.display = 'none';
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', function () {
      form.reset();
      clearErrors();
      if (successBox) successBox.style.display = 'none';
      form.style.display = 'block';
    });
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    clearErrors();

    var name = form.elements['name'].value.trim();
    var phone = form.elements['phone'].value.trim();
    var email = form.elements['email'].value.trim();
    var message = form.elements['message'].value.trim();

    var ok = true;
    if (!name) { showError('name', 'Please enter your name.'); ok = false; }
    if (!phone) { showError('phone', 'Please enter your phone number.'); ok = false; }
    if (!message) { showError('message', 'Please enter a message.'); ok = false; }
    if (!ok) return;

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        _subject: 'New website enquiry: Singh Cable Network',
        _template: 'table',
        Name: name,
        Phone: phone,
        Email: email || 'Not provided',
        Message: message
      })
    })
      .then(function (res) { return res.json().catch(function () { return {}; }).then(function (d) { return { ok: res.ok, d: d }; }); })
      .then(function (r) {
        if (r.ok && (r.d.success === 'true' || r.d.success === true)) {
          form.style.display = 'none';
          if (successBox) successBox.style.display = 'flex';
        } else {
          throw new Error('failed');
        }
      })
      .catch(function () {
        if (sendError) {
          sendError.textContent = 'Could not send right now. Please check your connection or call us at +91 76967 21911.';
          sendError.style.display = 'block';
        }
      })
      .finally(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
      });
  });
})();
