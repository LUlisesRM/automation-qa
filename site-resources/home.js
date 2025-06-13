document.addEventListener('DOMContentLoaded', () => {
  const carouselSection = document.getElementById('carousel-novedades');
  if (!carouselSection) return;

  const carouselInner = carouselSection.querySelector('.carousel-items-inner');
  const prevButton = carouselSection.querySelector('.carousel-button.prev');
  const nextButton = carouselSection.querySelector('.carousel-button.next');

  if (!carouselInner || !prevButton || !nextButton) return;

  const products = carouselInner.querySelectorAll('.product');
  const totalProducts = products.length; // Total de productos (originales + clones)
  const originalProductCount = 6; // Número de productos originales (product-1 a product-6)
  const clonesAtEachEnd = 3; // Número de clones al inicio y al final

  let currentIndex = clonesAtEachEnd; // El índice actual que apunta al primer producto ORIGINAL
  let itemWidth = 0; // Ancho de un producto + gap

  // Función para obtener el ancho de un producto (incluyendo gap)
  const calculateItemWidth = () => {
    // Asegurarse de que el primer producto exista para obtener su ancho
    if (products.length > 0) {
      const firstProduct = products[0];
      const productRect = firstProduct.getBoundingClientRect();
      const productComputedStyle = window.getComputedStyle(firstProduct);
      const gap = parseFloat(window.getComputedStyle(carouselInner).gap); // Obtener el gap del contenedor flex
      itemWidth = productRect.width + gap;
    }
  };

  // Ajustar la posición inicial al primer producto original
  const setInitialPosition = () => {
    carouselInner.style.transition = 'none'; // Desactiva la transición para el salto inicial
    carouselInner.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    // Forzar un reflow para que el cambio de transición se aplique antes de reactivarla
    carouselInner.offsetHeight;
    carouselInner.style.transition = 'transform 0.5s ease-in-out'; // Reactiva la transición
  };

  // Función para mover el carrusel
  const moveCarousel = () => {
    carouselInner.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
  };

  // Función para verificar y ajustar la posición después de la transición
  const checkPosition = () => {
    // Si estamos en un clon del final, saltar al producto original correspondiente al inicio
    if (currentIndex >= originalProductCount + clonesAtEachEnd) {
      currentIndex = clonesAtEachEnd; // Volver al primer producto original
      carouselInner.style.transition = 'none'; // Sin transición para el salto
      carouselInner.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
      // Forzar un reflow
      carouselInner.offsetHeight;
      carouselInner.style.transition = 'transform 0.5s ease-in-out'; // Restaurar transición
    }
    // Si estamos en un clon del inicio, saltar al producto original correspondiente al final
    else if (currentIndex < clonesAtEachEnd) {
      currentIndex = originalProductCount + clonesAtEachEnd - 1; // Volver al último producto original
      carouselInner.style.transition = 'none'; // Sin transición para el salto
      carouselInner.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
      // Forzar un reflow
      carouselInner.offsetHeight;
      carouselInner.style.transition = 'transform 0.5s ease-in-out'; // Restaurar transición
    }
  };

  // Manejadores de eventos de los botones
  nextButton.addEventListener('click', () => {
    currentIndex++;
    moveCarousel();
  });

  prevButton.addEventListener('click', () => {
    currentIndex--;
    moveCarousel();
  });

  // Escuchar el final de la transición para hacer el salto "invisible"
  carouselInner.addEventListener('transitionend', checkPosition);

  // Inicializar al cargar la página
  calculateItemWidth();
  setInitialPosition();

  // Recalcular ancho y posición si la ventana cambia de tamaño
  window.addEventListener('resize', () => {
    calculateItemWidth();
    setInitialPosition(); // Reajusta la posición al tamaño nuevo
  });
});