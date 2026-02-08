// ───────────────────────────────────────────────────────────────────
// CARRITO DE COMPRAS - CARRITO.JS
// Gestión del carrito modal y operaciones
// ───────────────────────────────────────────────────────────────────

class Carrito {
  constructor() {
    this.verCarrito = document.getElementById('verCarrito');
    this.modalContainer = document.getElementById('modal-container');
    this.carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    this.setupEventListeners();
    this.actualizarContador();
  }

  setupEventListeners() {
    this.verCarrito.addEventListener('click', () => this.abrirCarrito());
  }

  abrirCarrito() {
    // Recargar el carrito de localStorage para sincronización
    this.carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    this.actualizarContador();
    
    this.modalContainer.innerHTML = '';
    this.modalContainer.classList.add('active');
    
    const modalInner = document.createElement('div');
    modalInner.className = 'modal-inner';
    
    // Header
    const modalHeader = document.createElement('div');
    modalHeader.className = 'modal-header';
    modalHeader.innerHTML = `
      <h2 class="modal-header-title">Mi Carrito</h2>
      <button class="modal-header-button" aria-label="Cerrar" type="button">
        <i class="fas fa-times"></i>
      </button>
    `;
    
    const closeBtn = modalHeader.querySelector('.modal-header-button');
    closeBtn.addEventListener('click', () => this.cerrarCarrito());
    
    // Cerrar con tecla Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.cerrarCarrito();
    });
    
    // Cerrar clickeando afuera
    this.modalContainer.addEventListener('click', (e) => {
      if (e.target === this.modalContainer) this.cerrarCarrito();
    });
    
    modalInner.appendChild(modalHeader);
    
    // Contenido
    if (this.carrito.length === 0) {
      const emptyCart = document.createElement('div');
      emptyCart.className = 'empty-cart';
      emptyCart.innerHTML = `
        <div class="empty-cart-icon">
          <i class="fas fa-shopping-cart"></i>
        </div>
        <h3>Tu carrito está vacío</h3>
        <p>Agrega algunos artículos para comenzar tu compra</p>
      `;
      modalInner.appendChild(emptyCart);
    } else {
      const productosContainer = document.createElement('div');
      productosContainer.style.padding = '1.5rem';
      
      this.carrito.forEach((product) => {
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';
        
        const subtotal = product.cantidad * product.precio;
        
        modalContent.innerHTML = `
          <img src="${product.img}" alt="${product.nombre}" />
          <div class="modal-product-info">
            <h3>${product.nombre}</h3>
            <p>${formatCurrency(product.precio)} c/u</p>
          </div>
          <div class="quantity-controls">
            <button class="btn-restar" data-id="${product.id}" type="button">−</button>
            <span>${product.cantidad}</span>
            <button class="btn-sumar" data-id="${product.id}" type="button">+</button>
          </div>
          <div class="modal-total">${formatCurrency(subtotal)}</div>
          <button class="delete-product" data-id="${product.id}" aria-label="Eliminar producto" type="button">
            <i class="fas fa-trash-alt"></i>
          </button>
        `;
        
        // Event listeners para cantidad
        const btnRestar = modalContent.querySelector('.btn-restar');
        const btnSumar = modalContent.querySelector('.btn-sumar');
        const btnDelete = modalContent.querySelector('.delete-product');
        
        btnRestar.addEventListener('click', () => this.restarProducto(product.id));
        btnSumar.addEventListener('click', () => this.sumarProducto(product.id));
        btnDelete.addEventListener('click', () => this.eliminarProducto(product.id));
        
        productosContainer.appendChild(modalContent);
      });
      
      modalInner.appendChild(productosContainer);
    }
    
    // Footer con total
    if (this.carrito.length > 0) {
      const modalFooter = document.createElement('div');
      modalFooter.className = 'modal-footer';
      
      const total = this.carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
      
      modalFooter.innerHTML = `
        <div class="total-content">
          Total: <span class="total-amount">${formatCurrency(total)}</span>
        </div>
        <button class="checkout-btn" type="button">
          <i class="fas fa-credit-card"></i> Proceder al Pago
        </button>
      `;
      
      const checkoutBtn = modalFooter.querySelector('.checkout-btn');
      checkoutBtn.addEventListener('click', () => this.procederAPago());
      
      modalInner.appendChild(modalFooter);
    }
    
    this.modalContainer.appendChild(modalInner);
  }

  cerrarCarrito() {
    this.modalContainer.classList.remove('active');
    this.modalContainer.innerHTML = '';
  }

  sumarProducto(id) {
    const producto = this.carrito.find(p => p.id === id);
    if (producto) {
      producto.cantidad++;
      this.guardarCarrito();
      this.abrirCarrito();
      this.actualizarContador();
    }
  }

  restarProducto(id) {
    const producto = this.carrito.find(p => p.id === id);
    if (producto && producto.cantidad > 1) {
      producto.cantidad--;
      this.guardarCarrito();
      this.abrirCarrito();
      this.actualizarContador();
    }
  }

  eliminarProducto(id) {
    const productoElim = this.carrito.find(p => p.id === id);
    if (productoElim) {
      const nombreProducto = productoElim.nombre;
      this.carrito = this.carrito.filter(p => p.id !== id);
      this.guardarCarrito();
      this.abrirCarrito();
      this.actualizarContador();
      showToast(`${nombreProducto} removido del carrito`, 'info');
    }
  }

  procederAPago() {
    if (this.carrito.length === 0) {
      showToast('El carrito está vacío', 'error');
      return;
    }

    // Guardar carrito en localStorage para el checkout
    localStorage.setItem('carrito', JSON.stringify(this.carrito));

    // Redirigir a página de checkout
    showToast('Redirigiendo al checkout...', 'info');
    setTimeout(() => {
      window.location.href = 'checkout.html';
    }, 500);
  }

  guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
    localStorage.setItem('carritoLength', JSON.stringify(this.carrito.length));
  }

  actualizarContador() {
    const cantidadCarrito = document.getElementById('cantidadCarrito');
    const totalItems = this.carrito.reduce((sum, item) => sum + item.cantidad, 0);
    
    if (totalItems > 0) {
      cantidadCarrito.style.display = 'flex';
      cantidadCarrito.innerText = totalItems;
    } else {
      cantidadCarrito.style.display = 'none';
    }
  }
}

// Inicializar carrito cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  new Carrito();
});
