document.addEventListener('DOMContentLoaded', () => {
  const cartContainer = document.getElementById('cart-container');
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  if (carrito.length === 0) {
    cartContainer.innerHTML = '<p>Tu carrito está vacío.</p>';
    return;
  }

  let totalGeneral = 0;

  carrito.forEach((producto, index) => {
    const subtotal = producto.precio * producto.cantidad;
    totalGeneral += subtotal;

    const item = document.createElement('div');
    item.classList.add('cart-item');
    item.id = `item-${index}`;
    item.innerHTML = `
      <img src="../${producto.imagen}" alt="${producto.nombre}" class="product-image">

      <div class="item-details">
        <p class="product-name">${producto.nombre}</p>
        <p class="product-price" id="price-${index}">$${producto.precio.toFixed(2)}</p>

        <div class="quantity-control">
          <button class="qty-btn" id="decrease-${index}">-</button>
          <input type="number" value="${producto.cantidad}" min="1" id="qty-${index}" class="qty-input">
          <button class="qty-btn" id="increase-${index}">+</button>
        </div>

        <p class="product-total" id="total-${index}">Total: $${subtotal.toFixed(2)}</p>
      </div>
    `;

    cartContainer.appendChild(item);
  });

  // Sección de resumen
  const resumen = document.createElement('section');
  resumen.classList.add('cart-summary');
  resumen.innerHTML = `
    <h2>Total a pagar: <span id="grand-total">$${totalGeneral.toFixed(2)}</span></h2>
    <button id="checkout-btn">Proceder al Pago</button>
  `;
  cartContainer.appendChild(resumen);

  // Funcionalidad de botones +/-
  carrito.forEach((producto, index) => {
    const decreaseBtn = document.getElementById(`decrease-${index}`);
    const increaseBtn = document.getElementById(`increase-${index}`);
    const qtyInput = document.getElementById(`qty-${index}`);
    const totalItem = document.getElementById(`total-${index}`);

    const updateTotal = () => {
      const nuevaCantidad = parseInt(qtyInput.value);
      producto.cantidad = nuevaCantidad;
      const nuevoSubtotal = nuevaCantidad * producto.precio;
      totalItem.textContent = `Total: $${nuevoSubtotal.toFixed(2)}`;
      actualizarTotalGeneral();
      localStorage.setItem('carrito', JSON.stringify(carrito));
    };

    decreaseBtn.addEventListener('click', () => {
      if (qtyInput.value > 1) {
        qtyInput.value--;
        updateTotal();
      }
    });

    increaseBtn.addEventListener('click', () => {
      qtyInput.value++;
      updateTotal();
    });

    qtyInput.addEventListener('change', () => {
      if (qtyInput.value < 1) qtyInput.value = 1;
      updateTotal();
    });
  });

  const actualizarTotalGeneral = () => {
    const nuevosTotales = carrito.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0);
    document.getElementById('grand-total').textContent = `$${nuevosTotales.toFixed(2)}`;
  };
});
