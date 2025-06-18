document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    if (!id) return console.log('❌ No hay ID en la URL');

    try {
        const response = await fetch('/api/productos');
        const productos = await response.json();
        const producto = productos.find(p => p.id == id);

        if (!producto) {
            console.log('❌ No se encontró el producto con id:', id);
            return;
        }

        console.log('✅ Producto cargado:', producto);

        // Mostrar info del producto
        document.getElementById('product-title').textContent = producto.nombre;
        document.getElementById('product-price').textContent = `$ ${producto.precio.toFixed(2)} MXN`;
        document.getElementById('product-stock').textContent = `${producto.stock} unidades`;
        document.getElementById('product-description').textContent = producto.descripcion;

        // Imagen principal
        const mainImageContainer = document.getElementById('main-image-container');
        const mainImg = document.createElement('img');
        mainImg.src = `../${producto.imagen}`;
        mainImg.alt = producto.nombre;
        mainImageContainer.innerHTML = '';
        mainImageContainer.appendChild(mainImg);

        // Miniaturas
        const galeria = document.querySelector('.thumbnail-gallery');
        galeria.innerHTML = '';
        const imagenes = producto.thumbnails?.length ? producto.thumbnails : Array(4).fill(producto.imagen);
        imagenes.forEach((url, index) => {
            const img = document.createElement('img');
            img.src = `../site-resources/${url}`;
            img.alt = `Vista ${index + 1} de ${producto.nombre}`;
            galeria.appendChild(img);
        });

        // Características
        const caracteristicasList = document.getElementById('product-characteristics');
        caracteristicasList.innerHTML = '';

        if (Array.isArray(producto.caracteristicas)) {
            producto.caracteristicas.forEach(carac => {
                const li = document.createElement('li');
                li.textContent = carac;
                caracteristicasList.appendChild(li);
            });
        } else {
            console.warn('⚠️ El producto no tiene características definidas.');
        }

        // Agregar al carrito
        const addToCartBtn = document.querySelector('.add-to-cart-btn');
        const feedback = document.getElementById('cart-feedback');

        addToCartBtn.addEventListener('click', () => {
            const cantidad = parseInt(document.getElementById('quantity').value, 10) || 1;

            const productoCarrito = {
                id: producto.id,
                nombre: producto.nombre,
                precio: producto.precio,
                imagen: producto.imagen,
                cantidad: cantidad
            };

            console.log('🛒 Agregando al carrito:', productoCarrito);

            const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
            const existente = carrito.find(p => p.id === productoCarrito.id);

            if (existente) {
                existente.cantidad += productoCarrito.cantidad;
                console.log('🔁 Producto ya existía. Nueva cantidad:', existente.cantidad);
            } else {
                carrito.push(productoCarrito);
                console.log('🆕 Producto agregado al carrito.');
            }

            localStorage.setItem('carrito', JSON.stringify(carrito));
            console.log('📦 Carrito actualizado:', carrito);

            // Mostrar retroalimentación
            if (feedback) {
                feedback.textContent = '✅ Producto añadido al carrito';
                feedback.style.display = 'block';
                feedback.style.opacity = 1;
                console.log('💬 Feedback mostrado');

                setTimeout(() => {
                    feedback.style.opacity = 0;
                    setTimeout(() => {
                        feedback.style.display = 'none';
                        console.log('💬 Feedback ocultado');
                    }, 300);
                }, 1500);
            }
        });

    } catch (error) {
        console.error('❌ Error al cargar el producto:', error);
    }
});
