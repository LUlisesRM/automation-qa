document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("register-form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let isValid = true;

    // Limpiar errores anteriores
    form.querySelectorAll(".error-msg").forEach(msg => msg.textContent = "");

    // Validar campos de texto, email, fecha, teléfono, usuario, contraseña
    const campos = [
      "nombre", "apellido", "direccion", "fecha-nacimiento",
      "correo", "telefono", "usuario", "contrasena"
    ];

    campos.forEach(id => {
      const input = document.getElementById(id);
      const errorDiv = form.querySelector(`.error-msg[data-error-for="${id}"]`);
      if (!input.value.trim()) {
        errorDiv.textContent = "Completa este dato.";
        isValid = false;
      }
    });

    // Validar select (lada)
    const lada = document.getElementById("lada");
    const ladaError = form.querySelector(`.error-msg[data-error-for="lada"]`);
    if (lada.value === "") {
      ladaError.textContent = "Completa este dato.";
      isValid = false;
    }

    // Validar radio buttons (género)
    const radios = form.querySelectorAll('input[name="genero"]');
    const generoError = form.querySelector(`.error-msg[data-error-for="genero"]`);
    if (![...radios].some(radio => radio.checked)) {
      generoError.textContent = "Completa este dato.";
      isValid = false;
    }

    // Validar checkbox (términos)
    const terminos = document.getElementById("acepta-terminos");
    const terminosError = form.querySelector(`.error-msg[data-error-for="terminos"]`);
    if (!terminos.checked) {
      terminosError.textContent = "Completa este dato.";
      isValid = false;
    }

    // Si todo está validado, continuar
    if (isValid) {
      alert("Cuenta creada con éxito (simulado)");
      form.reset();
    }
  });
});
