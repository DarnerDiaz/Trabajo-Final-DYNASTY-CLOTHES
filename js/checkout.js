// ───────────────────────────────────────────────────────────────────
// E-COMMERCE CHECKOUT.JS
// Gestión del formulario de checkout y procesamiento de pedidos
// ───────────────────────────────────────────────────────────────────

/**
 * Clase que gestiona el proceso de checkout
 * Validación de formularios, cálculo de totales y procesamiento de pedidos
 */
class CheckoutManager {
  constructor() {
    this.carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    this.form = document.getElementById('checkoutForm');
    this.cartItemsContainer = document.getElementById('cartItems');
    this.paymentMethodSelect = document.getElementsByName('paymentMethod')[0].parentElement;
    
    this.shippingCosts = {
      standard: 9.99,
      express: 24.99,
      overnight: 49.99
    };
    
    this.initialize();
  }

  initialize() {
    if (this.carrito.length === 0) {
      this.redirectToShop();
      return;
    }

    this.renderCartItems();
    this.setupEventListeners();
    this.calculateTotals();
    this.loadSavedData();
  }

  renderCartItems() {
    this.cartItemsContainer.innerHTML = '';
    
    this.carrito.forEach(item => {
      const itemElement = document.createElement('div');
      itemElement.className = 'cart-item';
      itemElement.innerHTML = `
        <div class="item-image">
          <img src="${item.img}" alt="${item.nombre}" />
          <span class="item-quantity">${item.cantidad}</span>
        </div>
        <div class="item-details">
          <h4>${item.nombre}</h4>
          <p>${item.cantidad} x ${formatCurrency(item.precio)}</p>
        </div>
        <div class="item-price">${formatCurrency(item.cantidad * item.precio)}</div>
      `;
      this.cartItemsContainer.appendChild(itemElement);
    });
  }

  setupEventListeners() {
    // Cambio de método de pago
    document.querySelectorAll('input[name="paymentMethod"]').forEach(input => {
      input.addEventListener('change', (e) => this.handlePaymentMethodChange(e));
    });

    // Cambio de método de envío
    document.querySelectorAll('input[name="shipping"]').forEach(input => {
      input.addEventListener('change', () => this.calculateTotals());
    });

    // Formatear número de tarjeta
    const cardNumberInput = document.getElementById('cardNumber');
    if (cardNumberInput) {
      cardNumberInput.addEventListener('input', (e) => this.formatCardNumber(e));
    }

    // Formatear fecha de vencimiento
    const expiryInput = document.getElementById('expiryDate');
    if (expiryInput) {
      expiryInput.addEventListener('input', (e) => this.formatExpiryDate(e));
    }

    // Envío del formulario
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  handlePaymentMethodChange(e) {
    const cardForm = document.getElementById('cardPaymentForm');
    const isCardSelected = e.target.value === 'card';
    
    if (cardForm) {
      if (isCardSelected) {
        cardForm.style.display = 'block';
        // Hacer campos requeridos
        document.getElementById('cardName').required = true;
        document.getElementById('cardNumber').required = true;
        document.getElementById('expiryDate').required = true;
        document.getElementById('cvv').required = true;
      } else {
        cardForm.style.display = 'none';
        // Remover requerimiento
        document.getElementById('cardName').required = false;
        document.getElementById('cardNumber').required = false;
        document.getElementById('expiryDate').required = false;
        document.getElementById('cvv').required = false;
      }
    }
  }

  formatCardNumber(e) {
    let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    let formattedValue = value.replace(/(\d{4})/g, '$1 ').trim();
    e.target.value = formattedValue;
  }

  formatExpiryDate(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    e.target.value = value;
  }

  calculateTotals() {
    const subtotal = this.carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    const shippingMethod = document.querySelector('input[name="shipping"]:checked').value;
    const shippingCost = this.shippingCosts[shippingMethod];
    const taxes = (subtotal + shippingCost) * 0.1; // 10% de impuestos
    const total = subtotal + shippingCost + taxes;

    document.getElementById('subtotal').textContent = formatCurrency(subtotal);
    document.getElementById('shippingCost').textContent = formatCurrency(shippingCost);
    document.getElementById('taxes').textContent = formatCurrency(taxes);
    document.getElementById('total').textContent = formatCurrency(total);
  }

  loadSavedData() {
    const savedData = localStorage.getItem('userCheckoutData');
    if (savedData) {
      const data = JSON.parse(savedData);
      Object.keys(data).forEach(key => {
        const field = document.getElementById(key);
        if (field) {
          field.value = data[key];
        }
      });
    }
  }

  validateForm() {
    // Validar contraseña de tarjeta
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
    
    if (paymentMethod === 'card') {
      const cardName = document.getElementById('cardName').value;
      const cardNumber = document.getElementById('cardNumber').value.replace(/\s+/g, '');
      const expiryDate = document.getElementById('expiryDate').value;
      const cvv = document.getElementById('cvv').value;

      if (!cardName || !cardNumber || !expiryDate || !cvv) {
        showToast('Por favor completa todos los datos de la tarjeta', 'error');
        return false;
      }

      // Validar número de tarjeta (muy básico, solo para demostración)
      if (cardNumber.length !== 16) {
        showToast('El número de tarjeta debe tener 16 dígitos', 'error');
        return false;
      }

      // Validar fecha
      const [month, year] = expiryDate.split('/');
      if (!month || !year || month < 1 || month > 12) {
        showToast('La fecha de vencimiento es inválida', 'error');
        return false;
      }

      // Validar CVV
      if (cvv.length < 3) {
        showToast('El CVV debe tener al menos 3 dígitos', 'error');
        return false;
      }
    }

    return true;
  }

  async handleSubmit(e) {
    e.preventDefault();

    if (!this.validateForm()) {
      return;
    }

    // Guardar datos del formulario
    const formData = new FormData(this.form);
    const data = Object.fromEntries(formData);
    localStorage.setItem('userCheckoutData', JSON.stringify(data));

    // Simular procesamiento de pago
    const btn = e.target.querySelector('button[type="submit"]');
    const originalText = btn.innerText;
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procesando...';

    try {
      // Simular espera de 2 segundos
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Obtener datos del pedido
      const subtotal = this.carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
      const shippingMethod = document.querySelector('input[name="shipping"]:checked').value;
      const shippingCost = this.shippingCosts[shippingMethod];
      const taxes = (subtotal + shippingCost) * 0.1;
      const total = subtotal + shippingCost + taxes;

      const order = {
        id: this.generateOrderId(),
        date: new Date().toLocaleString('es-ES'),
        items: this.carrito,
        subtotal: subtotal,
        shipping: shippingCost,
        taxes: taxes,
        total: total,
        customer: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone
        },
        address: {
          street: data.address,
          city: data.city,
          state: data.state,
          zipCode: data.zipCode
        },
        shippingMethod: shippingMethod,
        paymentMethod: data.paymentMethod
      };

      // Guardar pedido
      let orders = JSON.parse(localStorage.getItem('orders')) || [];
      orders.push(order);
      localStorage.setItem('orders', JSON.stringify(orders));

      // Limpiar carrito
      localStorage.setItem('carrito', JSON.stringify([]));
      localStorage.setItem('carritoLength', '0');

      // Mostrar confirmación
      this.showOrderConfirmation(order);

      // Redirigir después de 3 segundos
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 3000);

    } catch (error) {
      showToast('Error al procesar el pago. Intenta de nuevo.', 'error');
      btn.disabled = false;
      btn.innerText = originalText;
    }
  }

  generateOrderId() {
    return 'ORD-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
  }

  showOrderConfirmation(order) {
    showToast(`¡Pedido confirmado! Número: ${order.id}`, 'success');
    
    const confirmationModal = document.createElement('div');
    confirmationModal.className = 'confirmation-modal';
    confirmationModal.innerHTML = `
      <div class="confirmation-content">
        <div class="confirmation-header">
          <i class="fas fa-check-circle"></i>
          <h2>¡Compra Exitosa!</h2>
        </div>
        <div class="confirmation-body">
          <p>Tu pedido ha sido procesado correctamente</p>
          <div class="order-details">
            <p><strong>Número de Pedido:</strong> ${order.id}</p>
            <p><strong>Total:</strong> ${formatCurrency(order.total)}</p>
            <p><strong>Email de Confirmación:</strong> ${order.customer.email}</p>
          </div>
          <p class="confirmation-message">Recibirás un email de confirmación en breve. Puedes rastrear tu pedido desde tu cuenta.</p>
        </div>
        <p style="text-align: center; color: #999; font-size: 0.9rem; margin-top: 1rem;">Redirigiendo en 3 segundos...</p>
      </div>
    `;
    
    document.body.appendChild(confirmationModal);
  }

  redirectToShop() {
    showToast('Tu carrito está vacío', 'info');
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 2000);
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  new CheckoutManager();
});
