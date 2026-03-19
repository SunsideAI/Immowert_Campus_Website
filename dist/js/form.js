(function () {
  const forms = document.querySelectorAll('.contact-form');

  forms.forEach(function (form) {
    const submitBtn = form.querySelector('[type="submit"]');
    const successMsg = form.querySelector('.form-success');
    const errorMsg = form.querySelector('.form-error-msg');

    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      // Clear previous states
      if (successMsg) successMsg.style.display = 'none';
      if (errorMsg) errorMsg.style.display = 'none';
      form.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
      form.querySelectorAll('.form-field-error').forEach(el => el.remove());

      // Client-side validation
      let valid = true;

      form.querySelectorAll('[required]').forEach(function (field) {
        if (!field.value.trim()) {
          valid = false;
          field.classList.add('is-invalid');
          const err = document.createElement('span');
          err.className = 'form-field-error';
          err.textContent = 'Dieses Feld ist erforderlich.';
          field.parentNode.appendChild(err);
        }
      });

      // Email validation
      const emailField = form.querySelector('[type="email"]');
      if (emailField && emailField.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
        valid = false;
        emailField.classList.add('is-invalid');
        const err = document.createElement('span');
        err.className = 'form-field-error';
        err.textContent = 'Bitte geben Sie eine gültige E-Mail-Adresse ein.';
        emailField.parentNode.appendChild(err);
      }

      // DSGVO checkbox
      const dsgvo = form.querySelector('[name="dsgvo"]');
      if (dsgvo && !dsgvo.checked) {
        valid = false;
        dsgvo.classList.add('is-invalid');
        const err = document.createElement('span');
        err.className = 'form-field-error';
        err.textContent = 'Bitte stimmen Sie der Datenschutzerklärung zu.';
        dsgvo.closest('.form-check').appendChild(err);
      }

      if (!valid) return;

      // Disable submit
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Wird gesendet…';
      }

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          form.reset();
          if (successMsg) {
            successMsg.style.display = 'block';
            successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        } else {
          throw new Error('Server error');
        }
      } catch (err) {
        if (errorMsg) {
          errorMsg.style.display = 'block';
        }
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Anfrage senden';
        }
      }
    });
  });
})();
