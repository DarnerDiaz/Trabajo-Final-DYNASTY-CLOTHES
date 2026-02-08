// ───────────────────────────────────────────────────────────────────
// E-COMMERCE APP.JS
// Gestión de productos, búsqueda y filtros
// ───────────────────────────────────────────────────────────────────

/**
 * Clase principal que gestiona la tienda
 * Maneja renderizado de productos, filtros, búsqueda y carrito
 */
class TiendaApp {
  constructor() {
    this.shopContent = document.getElementById('shopContent');
    this.searchInput = document.getElementById('searchInput');
    this.searchBtn = document.querySelector('.search-btn');
    this.priceFilter = document.getElementById('priceFilter');
    this.priceValue = document.getElementById('priceValue');
    this.categoryFilter = document.getElementById('categoryFilter');
    this.resetFilters = document.getElementById('resetFilters');
    
    this.carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    this.productosFiltrados = [...productos];
    this.searchTerm = '';
    this.maxPrice = 100;
    this.selectedCategory = '';
    
    this.inicializar();
  }

  inicializar() {
    this.renderProductos(this.productosFiltrados);
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Búsqueda
    this.searchBtn.addEventListener('click', () => this.handleSearch());
    this.searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.handleSearch();
    });

    // Filtro de precio
    this.priceFilter.addEventListener('input', (e) => {
      this.maxPrice = parseFloat(e.target.value);
      this.priceValue.textContent = `Hasta $${this.maxPrice}`;
      this.aplicarFiltros();
    });

    // Filtro de categoría
    this.categoryFilter.addEventListener('change', () => {
      this.selectedCategory = this.categoryFilter.value;
      this.aplicarFiltros();
    });

    // Limpiar filtros
    this.resetFilters.addEventListener('click', () => this.limpiarFiltros());
  }

  handleSearch() {
    this.searchTerm = this.searchInput.value.toLowerCase().trim();
    this.aplicarFiltros();
    if (this.searchTerm) {
      showToast(`Buscando: "${this.searchTerm}"`, 'info');
    }
  }

  getCategoria(producto) {
    if (producto.nombre.toLowerCase().includes('pantalón') || 
        producto.nombre.toLowerCase().includes('pantalones')) {
      return 'pantalones';
    }
    if (producto.nombre.toLowerCase().includes('sudadera')) {
      return 'camisetas';
    }
    if (producto.nombre.toLowerCase().includes('camisa')) {
      return 'camisetas';
    }
    if (producto.nombre.toLowerCase().includes('reloj') || 
        producto.nombre.toLowerCase().includes('pulsera')) {
      return 'accesorios';
    }
    return 'camisetas';
  }

  aplicarFiltros() {
    this.productosFiltrados = productos.filter(producto => {
      const cumplePrecio = producto.precio <= this.maxPrice;
      const cumpleCategoria = !this.selectedCategory || 
                              this.getCategoria(producto) === this.selectedCategory;
      const cumpleBusqueda = producto.nombre.toLowerCase().includes(this.searchTerm);
      
      return cumplePrecio && cumpleCategoria && cumpleBusqueda;
    });

    if (this.productosFiltrados.length === 0) {
      this.shopContent.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 4rem 2rem; color: #999;">
          <p style="font-size: 1.2rem; margin-bottom: 1rem;">No encontramos productos que coincidan con tu búsqueda</p>
          <p style="font-size: 0.9rem;">Intenta ajustar los filtros o la búsqueda</p>
        </div>
      `;
    } else {
      this.renderProductos(this.productosFiltrados);
    }
  }

  limpiarFiltros() {
    this.searchInput.value = '';
    this.searchTerm = '';
    this.maxPrice = 100;
    this.selectedCategory = '';
    this.priceFilter.value = '100';
    this.categoryFilter.value = '';
    this.priceValue.textContent = 'Hasta $100';
    this.productosFiltrados = [...productos];
    this.renderProductos(this.productosFiltrados);
    showToast('Filtros limpiados', 'info');
  }

  renderProductos(productosAMostrar) {
    this.shopContent.innerHTML = '';

    productosAMostrar.forEach((product) => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <img src="${product.img}" alt="${product.nombre}" loading="lazy" />
        <div class="card-content">
          <h3>${product.nombre}</h3>
          <div class="price">${formatCurrency(product.precio)}</div>
        </div>
        <button class="comprar" data-id="${product.id}">
          <i class="fas fa-shopping-cart"></i> Agregar
        </button>
      `;

      const btn = card.querySelector('.comprar');
      btn.addEventListener('click', () => this.agregarAlCarrito(product));

      this.shopContent.appendChild(card);
    });
  }

  agregarAlCarrito(product) {
    const productoEnCarrito = this.carrito.find(item => item.id === product.id);

    if (productoEnCarrito) {
      productoEnCarrito.cantidad++;
      showToast(`Se agregó otra unidad de ${product.nombre}`, 'success');
    } else {
      this.carrito.push({
        id: product.id,
        img: product.img,
        nombre: product.nombre,
        precio: product.precio,
        cantidad: 1,
      });
      showToast(`${product.nombre} agregado al carrito`, 'success');
    }

    this.guardarCarrito();
    this.actualizarContador();
  }

  guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
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

// Inicializar la app cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  new TiendaApp();
});
