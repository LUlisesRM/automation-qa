document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-login");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = form.email.value.trim();
    const password = form.password.value;

    // Simulación de autenticación (sin base de datos)
    if (email && password) {
      alert(`Bienvenido, ${email}!`);
      // Aquí podrías redirigir al usuario o guardar en localStorage
      // window.location.href = "perfil.html";
    } else {
      alert("Por favor, completa todos los campos.");
    }
  });
});