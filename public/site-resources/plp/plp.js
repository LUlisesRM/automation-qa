// plp.js
document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const categoria = params.get('categoria');
  const subcategoria = params.get('subcategoria');

  const contenedor = document.getElementById('product-list');
  contenedor.innerHTML = '';

  if (!categoria) {
    contenedor.innerHTML = `<p>❌ Categoría no especificada.</p>`;
    return;
  }

  try {
    const res = await fetch('/api/productos');
    const productos = await res.json();

    // Filtrar por categoría (siempre) y por subcategoría (si viene)
    let filtrados = productos.filter(prod => prod.categoria === categoria);

    if (subcategoria) {
      filtrados = filtrados.filter(prod => prod.subcategoria === subcategoria);
    }

    if (filtrados.length === 0) {
      contenedor.innerHTML = `<p>No hay productos en esta categoría.</p>`;
      return;
    }

    filtrados.forEach(prod => {
      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <a href="../PDP/pdp.html?id=${prod.id}">
          <img src="../${prod.imagen}" alt="${prod.nombre}" />
          <h3>${prod.nombre}</h3>
          <p>$${prod.precio}</p>
        </a>
      `;
      contenedor.appendChild(card);
    });
  } catch (err) {
    contenedor.innerHTML = `<p>Error al cargar productos.</p>`;
    console.error('❌ Error:', err);
  }
});
