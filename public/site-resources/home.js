document.addEventListener('DOMContentLoaded', async () => {
  const carouselInner = document.querySelector('.carousel-items-inner');
  const prevButton = document.querySelector('.carousel-button.prev');
  const nextButton = document.querySelector('.carousel-button.next');

  if (!carouselInner || !prevButton || !nextButton) return;

  // 1. Cargar productos desde JSON (puede ser archivo local o API)
  // Aquí asumo que tienes un endpoint /api/productos que devuelve un array de productos
  const response = await fetch('/api/productos');
  let productos = await response.json();
  productos = productos.filter(prod => prod.id >= 1 && prod.id <= 6);

  // 2. Función para crear un div.product con el producto dado
  const crearProductoDiv = (producto, idSuffix = '') => {
    const div = document.createElement('div');
    div.className = 'product';
    div.id = `product-${producto.id}${idSuffix}`;
    div.innerHTML = `
      <a href="site-resources/PDP/pdp.html?id=${producto.id}">
        <img src="site-resources/${producto.imagen}" alt="${producto.nombre}" style="width:200px;">
      </a>
    `;
    return div;
  };

  // 3. Limpiar el carrusel antes de agregar
  carouselInner.innerHTML = '';

  // 4. Agregar clones al inicio (últimos 3 productos)
  const clonesAtEachEnd = 3;
  const originalCount = productos.length;

  for (let i = originalCount - clonesAtEachEnd; i < originalCount; i++) {
    const clone = crearProductoDiv(productos[i], '-clone-a');
    carouselInner.appendChild(clone);
  }

  // 5. Agregar productos originales
  productos.forEach(prod => {
    const prodDiv = crearProductoDiv(prod);
    carouselInner.appendChild(prodDiv);
  });

  // 6. Agregar clones al final (primeros 3 productos)
  for (let i = 0; i < clonesAtEachEnd; i++) {
    const clone = crearProductoDiv(productos[i], '-clone-b');
    carouselInner.appendChild(clone);
  }

  // 7. Variables de control del carrusel
  let currentIndex = clonesAtEachEnd;
  let itemWidth = 0;

  // 8. Calcular ancho del producto + gap
  const calcularItemWidth = () => {
    const firstProduct = carouselInner.querySelector('.product');
    if (firstProduct) {
      const style = window.getComputedStyle(carouselInner);
      const gap = parseFloat(style.gap) || 0;
      itemWidth = firstProduct.getBoundingClientRect().width + gap;
    }
  };

  // 9. Posición inicial sin animación
  const setInitialPosition = () => {
    carouselInner.style.transition = 'none';
    carouselInner.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    carouselInner.offsetHeight; // Forzar reflow
    carouselInner.style.transition = 'transform 0.5s ease-in-out';
  };

  // 10. Mover carrusel
  const moveCarousel = () => {
    carouselInner.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
  };

  // 11. Checar si hay que hacer salto invisible (para efecto infinito)
  const checkPosition = () => {
    if (currentIndex >= originalCount + clonesAtEachEnd) {
      currentIndex = clonesAtEachEnd;
      carouselInner.style.transition = 'none';
      carouselInner.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
      carouselInner.offsetHeight;
      carouselInner.style.transition = 'transform 0.5s ease-in-out';
    } else if (currentIndex < clonesAtEachEnd) {
      currentIndex = originalCount + clonesAtEachEnd - 1;
      carouselInner.style.transition = 'none';
      carouselInner.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
      carouselInner.offsetHeight;
      carouselInner.style.transition = 'transform 0.5s ease-in-out';
    }
  };

  // 12. Event listeners botones
  nextButton.addEventListener('click', () => {
    currentIndex++;
    moveCarousel();
  });
  prevButton.addEventListener('click', () => {
    currentIndex--;
    moveCarousel();
  });

  // 13. Evento para cuando termina la transición
  carouselInner.addEventListener('transitionend', checkPosition);

  // 14. Inicializar todo
  calcularItemWidth();
  setInitialPosition();

  // 15. Recalcular si ventana cambia tamaño
  window.addEventListener('resize', () => {
    calcularItemWidth();
    setInitialPosition();
  });
});
