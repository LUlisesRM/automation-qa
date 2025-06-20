document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    document.querySelector(".product-info").innerHTML = "<p>❌ ID de producto no válido.</p>";
    return;
  }

  try {
    const res = await fetch("/api/productos");
    const productos = await res.json();

    const producto = productos.find(p => String(p.id) === id);
    if (!producto) {
      document.querySelector(".product-info").innerHTML = "<p>📭 Producto no encontrado.</p>";
      return;
    }

    // Insertar imagen principal
    const mainImage = document.getElementById("main-image-container");
    mainImage.innerHTML = `<img src="../${producto.imagen}" alt="${producto.nombre}">`;

    // Insertar información del producto
    document.getElementById("product-title").textContent = producto.nombre;
    document.getElementById("product-price").textContent = `$${producto.precio.toFixed(2)}`;
    document.getElementById("product-stock").textContent = producto.stock || "Disponible";
    document.getElementById("product-description").textContent = producto.descripcion || "Sin descripción.";

    // Características si existen
    const charList = document.getElementById("product-characteristics");
    charList.innerHTML = "";
    if (producto.caracteristicas && Array.isArray(producto.caracteristicas)) {
      producto.caracteristicas.forEach(c => {
        const li = document.createElement("li");
        li.textContent = c;
        charList.appendChild(li);
      });
    }
  } catch (err) {
    console.error("❌ Error al cargar PDP:", err);
    document.querySelector(".product-info").innerHTML = "<p>❌ Error al cargar producto.</p>";
  }
});
