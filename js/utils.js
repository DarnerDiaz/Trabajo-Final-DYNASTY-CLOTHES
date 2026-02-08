// ───────────────────────────────────────────────────────────────────
// E-COMMERCE UTILS.JS
// Utilidades y funciones globales reutilizables
// ───────────────────────────────────────────────────────────────────

const TOAST_DURATION = 3000;

/**
 * Muestra una notificación tipo toast
 * @param {string} message - Mensaje a mostrar
 * @param {string} type - Tipo de toast: 'success', 'error', 'info'
 * @param {number} duration - Duración en milisegundos
 */
const showToast = (message, type = 'info', duration = TOAST_DURATION) => {
  const toastContainer = document.getElementById('toast-container');
  
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span>${message}</span>
  `;
  
  toastContainer.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = 'slideOut 0.3s ease-in forwards';
    setTimeout(() => toast.remove(), 300);
  }, duration);
};

/**
 * Formatea un número como moneda USD
 * @param {number} amount - Cantidad a formatear
 * @returns {string} Cantidad formateada
 */
const formatCurrency = (amount) => {
  return `$${parseFloat(amount).toFixed(2)}`;
};

/**
 * Valida si un email es válido
 * @param {string} email - Email a validar
 * @returns {boolean} True si es válido
 */
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

/**
 * Pequeño retraso para animaciones
 * @param {number} ms - Milisegundos
 * @returns {Promise}
 */
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Obtiene el total de items en el carrito
 * @returns {number} Cantidad total de items
 */
const getCartItemCount = () => {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  return carrito.reduce((total, item) => total + item.cantidad, 0);
};

/**
 * Obtiene el total del carrito en dinero
 * @returns {number} Total del carrito
 */
const getCartTotal = () => {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  return carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
};

/**
 * Limpia el carrito completamente
 */
const clearCart = () => {
  localStorage.setItem('carrito', JSON.stringify([]));
  localStorage.setItem('carritoLength', '0');
  document.getElementById('cantidadCarrito').style.display = 'none';
  showToast('Carrito vaciado', 'info');
};

/**
 * Debounce para búsqueda
 * @param {Function} func - Función a ejecutar
 * @param {number} wait - Tiempo de espera
 * @returns {Function} Función con debounce
 */
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
