// Handles sending form to Formspree + user feedback
document.addEventListener('DOMContentLoaded', function(){
  const form = document.getElementById('contactForm');
  const status = document.getElementById('status');

  form.addEventListener('submit', async function(e){
    e.preventDefault();
    if (!form.checkValidity()) {
      status.textContent = alert('Please fill out all fields correctly.');
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    status.textContent = 'Sending...';

    const data = new FormData(form);

    try {
      const resp = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (resp.ok) {
        status.textContent = 'Message sent! Thank you.';
        form.reset();
      } else {
        const err = await resp.json();
        status.textContent = err?.error || 'Error sending message.';
      }
    } catch (err) {
      console.error(err);
      status.textContent = 'Network error — please try again.';
    } finally {
      submitBtn.disabled = false;
    }
  });
});
