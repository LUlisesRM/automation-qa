// registros.js
export function enviarRegistro(form) {
  // Si hay algún error visible, no enviar
  const erroresVisibles = form.querySelectorAll(".error-msg");
  const tieneErrores = [...erroresVisibles].some(err => err.textContent.trim() !== "");
  if (tieneErrores) return;

  // Extraer datos del formulario
  const datos = {
    nombre: form.nombre.value.trim(),
    apellido: form.apellido.value.trim(),
    direccion: form.direccion.value.trim(),
    fechaNacimiento: form['fecha-nacimiento'].value,
    genero: form.genero.value,
    correo: form.correo.value.trim(),
    lada: form.lada.value,
    telefono: form.telefono.value.trim(),
    usuario: form.usuario.value.trim(),
    contrasena: form.contrasena.value.trim()
  };

  // Enviar al backend
  fetch('/api/registro', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos)
  })
  .then(res => res.json())
  .then(data => {
    alert(data.mensaje);
    form.reset();
  })
  .catch(err => {
    console.error('❌ Error al registrar:', err);
    alert('Hubo un problema al registrar tu cuenta.');
  });
}
