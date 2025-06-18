import { enviarRegistro } from './registros.js';

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("register-form");

  const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

  const telefonoInput = document.getElementById("telefono");
  telefonoInput.addEventListener("keydown", (e) => {
    if (
      !/[0-9]/.test(e.key) &&
      !["Backspace", "ArrowLeft", "ArrowRight", "Tab"].includes(e.key)
    ) {
      e.preventDefault();
    }
  });

  telefonoInput.addEventListener("input", (e) => {
    if (e.target.value.length > 10) {
      e.target.value = e.target.value.slice(0, 10);
    }
  });

  const campos = [
    "nombre",
    "apellido",
    "direccion",
    "fecha-nacimiento",
    "correo",
    "telefono",
    "usuario",
    "contrasena",
  ];

  function validarCampo(id) {
    const input = document.getElementById(id);
    const errorDiv = form.querySelector(`.error-msg[data-error-for="${id}"]`);
    const valor = input.value.trim();
    errorDiv.textContent = "";

    if (!valor) {
      errorDiv.textContent = "Completa este dato.";
      return false;
    }

    if (id === "nombre" || id === "apellido") {
      if (!soloLetras.test(valor)) {
        errorDiv.textContent = "Por favor, ingresa solo letras.";
        return false;
      } else if (valor.replace(/\s/g, "").length <= 3) {
        errorDiv.textContent = "Por favor, ingresa más de 3 letras.";
        return false;
      }
    }

    if (id === "correo") {
      if (!valor.includes("@") || !valor.endsWith(".com")) {
        errorDiv.textContent =
          "Por favor, ingresa un formato de correo electrónico correcto. Ejemplo: ejemplo@bicicletas.com";
        return false;
      }
    }

    if (id === "telefono") {
      if (!/^\d+$/.test(valor)) {
        errorDiv.textContent = "Por favor, ingresa solo números.";
        return false;
      } else if (valor.length < 10) {
        errorDiv.textContent = "Por favor, ingresa 10 dígitos.";
        return false;
      }
    }

    return true;
  }

  // Validar en blur cada campo
  campos.forEach((id) => {
    const input = document.getElementById(id);
    input.addEventListener("blur", () => validarCampo(id));
  });

  // Validación completa al hacer submit
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let isValid = true;

    form.querySelectorAll(".error-msg").forEach((msg) => (msg.textContent = ""));

    // Validación de campos
    campos.forEach((id) => {
      const valido = validarCampo(id);
      if (!valido) isValid = false;
    });

    // Validación de Lada
    const lada = document.getElementById("lada");
    const ladaError = form.querySelector(`.error-msg[data-error-for="lada"]`);
    if (lada.value === "") {
      ladaError.textContent = "Completa este dato.";
      isValid = false;
    }

    // Validación de Género
    const radios = form.querySelectorAll('input[name="genero"]');
    const generoError = form.querySelector(`.error-msg[data-error-for="genero"]`);
    if (![...radios].some((radio) => radio.checked)) {
      generoError.textContent = "Completa este dato.";
      isValid = false;
    }

    // Validación de Términos
    const terminos = document.getElementById("acepta-terminos");
    const terminosError = form.querySelector(`.error-msg[data-error-for="terminos"]`);
    if (!terminos.checked) {
      terminosError.textContent = "Completa este dato.";
      isValid = false;
    }

    if (isValid) {
      enviarRegistro(form); // Solo se envía si todo es válido
    }
  });
});
