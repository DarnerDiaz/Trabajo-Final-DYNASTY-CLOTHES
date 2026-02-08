// ───────────────────────────────────────────────────────────────────
// E-COMMERCE REGISTER.JS
// Gestión del formulario de registro de usuario
// ───────────────────────────────────────────────────────────────────

/**
 * Clase que gestiona el registro de nuevos usuarios
 * Validaciones, creación de cuenta y almacenamiento de datos
 */
class RegisterManager {
  constructor() {
    this.form = document.getElementById('registerForm');
    this.initialize();
  }

  initialize() {
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Toggle de mostrar/ocultar contraseña
    document.querySelectorAll('.toggle-password').forEach(btn => {
      btn.addEventListener('click', (e) => this.togglePasswordVisibility(e));
    });

    // Social buttons
    document.querySelector('.google-btn').addEventListener('click', () => {
      showToast('Integración con Google próximamente', 'info');
    });
    
    document.querySelector('.facebook-btn').addEventListener('click', () => {
      showToast('Integración con Facebook próximamente', 'info');
    });

    // Envío del formulario
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  togglePasswordVisibility(e) {
    e.preventDefault();
    
    const inputId = e.target.closest('.toggle-password').dataset.input;
    const input = document.getElementById(inputId);
    const icon = e.target.closest('.toggle-password').querySelector('i');
    
    if (input.type === 'password') {
      input.type = 'text';
      icon.classList.remove('fa-eye');
      icon.classList.add('fa-eye-slash');
    } else {
      input.type = 'password';
      icon.classList.remove('fa-eye-slash');
      icon.classList.add('fa-eye');
    }
  }

  validateForm() {
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Validar nombres
    if (firstName.length < 2) {
      showToast('El nombre debe tener al menos 2 caracteres', 'error');
      return false;
    }

    if (lastName.length < 2) {
      showToast('El apellido debe tener al menos 2 caracteres', 'error');
      return false;
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast('Por favor ingresa un email válido', 'error');
      return false;
    }

    // Validar teléfono (básico)
    if (phone.length < 10) {
      showToast('Por favor ingresa un teléfono válido', 'error');
      return false;
    }

    // Validar contraseña
    if (password.length < 8) {
      showToast('La contraseña debe tener al menos 8 caracteres', 'error');
      return false;
    }

    // Validar que la contraseña tenga mayúscula, minúscula y número
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    if (!hasUpperCase || !hasLowerCase || !hasNumber) {
      showToast('La contraseña debe contener mayúsculas, minúsculas y números', 'error');
      return false;
    }

    // Validar coincidencia de contraseñas
    if (password !== confirmPassword) {
      showToast('Las contraseñas no coinciden', 'error');
      return false;
    }

    // Validar que el email no exista
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some(user => user.email === email)) {
      showToast('Este email ya está registrado', 'error');
      return false;
    }

    return true;
  }

  async handleSubmit(e) {
    e.preventDefault();

    if (!this.validateForm()) {
      return;
    }

    const btn = e.target.querySelector('button[type="submit"]');
    const originalText = btn.innerText;
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creando cuenta...';

    try {
      // Simular espera
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Obtener datos del formulario
      const formData = new FormData(this.form);
      const userData = {
        id: this.generateUserId(),
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        gender: formData.get('gender') || 'not-specified',
        password: this.hashPassword(formData.get('password')),
        newsletter: formData.get('newsletter') === 'on',
        createdAt: new Date().toISOString(),
        isActive: true
      };

      // Guardar usuario
      let users = JSON.parse(localStorage.getItem('users')) || [];
      users.push(userData);
      localStorage.setItem('users', JSON.stringify(users));

      // Guardar sesión
      const session = {
        userId: userData.id,
        email: userData.email,
        name: userData.firstName + ' ' + userData.lastName,
        loginTime: new Date().toISOString()
      };
      localStorage.setItem('currentUser', JSON.stringify(session));

      // Mostrar éxito
      showToast(`¡Bienvenido ${userData.firstName}! Tu cuenta ha sido creada.`, 'success');

      // Redirigir después de 2 segundos
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 2000);

    } catch (error) {
      showToast('Error al crear la cuenta. Intenta de nuevo.', 'error');
      btn.disabled = false;
      btn.innerText = originalText;
    }
  }

  generateUserId() {
    return 'USER-' + Date.now() + '-' + Math.floor(Math.random() * 10000);
  }

  /**
   * Función simple de hash para demostración
   * En producción, esto se haría en el servidor
   */
  hashPassword(password) {
    return btoa(password); // Base64 encoding (NO USAR en producción)
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  new RegisterManager();
});
