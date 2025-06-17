document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    if (!id) return;

    try {
        const response = await fetch('/api/productos');
        const productos = await response.json();
        const producto = productos.find(p => p.id == id);
        if (!producto) return;

        // Llenar los campos del HTML
        document.getElementById('product-title').textContent = producto.nombre;
        document.getElementById('product-price').textContent = `$ ${producto.precio.toFixed(2)} MXN`;
        document.getElementById('main-image').src = `../site-resources/${producto.imagen}`;
        document.getElementById('main-image').alt = producto.nombre;
        document.getElementById('product-stock').textContent = `${producto.stock} unidades`;
        document.getElementById('product-description').textContent = producto.descripcion;

        // Características clave
        const caracteristicasList = document.getElementById('product-characteristics');
        caracteristicasList.innerHTML = '';
        producto.caracteristicas.forEach(carac => {
            const li = document.createElement('li');
            li.textContent = carac;
            caracteristicasList.appendChild(li);
        });

        // Opcional: thumbnails
        const galeria = document.querySelector('.thumbnail-gallery');
        galeria.innerHTML = '';
        producto.thumbnails.forEach(url => {
            const img = document.createElement('img');
            img.src = `../site-resources/${url}`;
            img.alt = `Miniatura de ${producto.nombre}`;
            galeria.appendChild(img);
        });

    } catch (error) {
        console.error('Error al cargar el producto:', error);
    }
});
