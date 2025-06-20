document.addEventListener('DOMContentLoaded', () => {
  const user = localStorage.getItem('usuario');
  const rightLinks = document.getElementById('right-links');

  if (user && rightLinks) {
    rightLinks.innerHTML = `
      <span style="margin-right: 10px;">👤 ${user}</span>
      <a href="#" id="logout-link">Cerrar sesión</a>
      <a href="site-resources/carrito/carrito.html" id="cart-link">
        <img src="site-resources/carrito/icono-carrito.webp" alt="Carrito"
          style="width: 24px; vertical-align: middle;">
      </a>
    `;

    document.getElementById('logout-link').addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('usuario');
      location.reload();
    });
  }
});