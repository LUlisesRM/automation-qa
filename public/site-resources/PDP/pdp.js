document.addEventListener("DOMContentLoaded", async () => {
  const contenedor = document.getElementById("productos-plp");

  // 1. Obtener parámetros de la URL
  const params = new URLSearchParams(window.location.search);
  const categoriaParam = params.get("categoria");
  const subcategoriaParam = params.get("subcategoria");

  if (!categoriaParam || !subcategoriaParam) {
    contenedor.innerHTML = "<p>❌ Categoría o subcategoría no válida.</p>";
    return;
  }

  try {
    // 2. Cargar los productos desde el backend
    const res = await fetch("/api/productos");
    const productos = await res.json();

    // 3. Filtrar productos por categoría y subcategoría
    const productosFiltrados = productos.filter(prod =>
      prod.categoria === categoriaParam &&
      prod.subcategoria === subcategoriaParam
    );

    if (productosFiltrados.length === 0) {
      contenedor.innerHTML = "<p>📭 No hay productos disponibles en esta categoría.</p>";
      return;
    }

    // 4. Generar productos dinámicamente
    productosFiltrados.forEach(producto => {
      const card = document.createElement("div");
      card.className = "producto-card";

      card.innerHTML = `
        <a href="../pdp/pdp.html?id=${producto.id}">
          <img src="../${producto.imagen}" alt="${producto.nombre}">
        </a>
        <h3>${producto.nombre}</h3>
        <p class="precio">$${producto.precio.toFixed(2)}</p>
        <a href="../pdp/pdp.html?id=${producto.id}" class="btn-detalle">Ver detalle</a>
      `;

      contenedor.appendChild(card);
    });
  } catch (error) {
    console.error("Error al cargar productos:", error);
    contenedor.innerHTML = "<p>❌ Ocurrió un error al cargar los productos.</p>";
  }
});
