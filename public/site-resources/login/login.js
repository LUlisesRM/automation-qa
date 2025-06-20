document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-login');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = form.email.value.trim();
    const password = form.password.value.trim();

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!res.ok) {
        const errData = await res.json();
        alert(errData.error || 'Error al iniciar sesión');
        return;
      }

      const data = await res.json();
      localStorage.setItem('usuario', data.nombre);  // Guardar el nombre
      window.location.href = '../../index.html';
    } catch (err) {
      console.error('❌ Error de login:', err);
      alert('Hubo un problema al intentar iniciar sesión.');
    }
  });
});
