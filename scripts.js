// Función para actualizar el total por producto
function updateItemTotal(itemId) {
  const priceElement = document.getElementById(`price-${itemId}`);
  const qtyInput = document.getElementById(`qty-${itemId}`);
  const totalElement = document.getElementById(`total-${itemId}`);

  // Quitar el símbolo $ y convertir a número
  const price = parseFloat(priceElement.textContent.replace('$', ''));
  const quantity = parseInt(qtyInput.value);

  if (!isNaN(price) && !isNaN(quantity)) {
    const itemTotal = price * quantity;
    totalElement.textContent = `Total: $${itemTotal}`;
  } else {
    totalElement.textContent = 'Total: $0';
  }

  updateGrandTotal();
}

// Función para actualizar el total general
function updateGrandTotal() {
  const totalElements = document.querySelectorAll('.product-total');
  let grandTotal = 0;

  totalElements.forEach(el => {
    const text = el.textContent;
    const amount = parseFloat(text.replace(/[^0-9.]/g, ''));
    if (!isNaN(amount)) {
      grandTotal += amount;
    }
  });

  document.getElementById('grand-total').textContent = `$${grandTotal}`;
}

// Agrega listeners para botones de aumentar/disminuir
function setupQuantityButtons(itemId) {
  const decreaseBtn = document.getElementById(`decrease-${itemId}`);
  const increaseBtn = document.getElementById(`increase-${itemId}`);
  const qtyInput = document.getElementById(`qty-${itemId}`);

  decreaseBtn.addEventListener('click', () => {
    let qty = parseInt(qtyInput.value);
    if (qty > 1) {
      qtyInput.value = qty - 1;
      updateItemTotal(itemId);
    }
  });

  increaseBtn.addEventListener('click', () => {
    let qty = parseInt(qtyInput.value);
    qtyInput.value = qty + 1;
    updateItemTotal(itemId);
  });

  // También actualiza si se escribe manualmente
  qtyInput.addEventListener('input', () => updateItemTotal(itemId));
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
  setupQuantityButtons(1);
  setupQuantityButtons(2);
  updateItemTotal(1);
  updateItemTotal(2);
});
