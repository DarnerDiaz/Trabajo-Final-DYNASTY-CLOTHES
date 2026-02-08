// ───────────────────────────────────────────────────────────────────
// LOGIN - LOGIN.JS
// Gestión del formulario de login
// ───────────────────────────────────────────────────────────────────

class LoginManager {
  constructor() {
    this.form = document.getElementById('loginForm');
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

  validate() {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    if (!email || !password) {
      showToast('Por favor completa todos los campos', 'error');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast('Por favor ingresa un email válido', 'error');
      return false;
    }

    return true;
  }

  async handleSubmit(e) {
    e.preventDefault();

    if (!this.validate()) {
      return;
    }

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;

    const btn = e.target.querySelector('button[type="submit"]');
    const originalText = btn.innerText;
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Iniciando...';

    try {
      // Simular espera
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Buscar usuario
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(u => u.email === email);

      if (!user) {
        showToast('Email no encontrado', 'error');
        btn.disabled = false;
        btn.innerText = originalText;
        return;
      }

      // Verificar contraseña (muy básico para demostración)
      const hashedPassword = btoa(password);
      if (user.password !== hashedPassword) {
        showToast('Contraseña incorrecta', 'error');
        btn.disabled = false;
        btn.innerText = originalText;
        return;
      }

      // Crear sesión
      const session = {
        userId: user.id,
        email: user.email,
        name: user.firstName + ' ' + user.lastName,
        loginTime: new Date().toISOString()
      };
      localStorage.setItem('currentUser', JSON.stringify(session));

      if (remember) {
        localStorage.setItem('rememberMe', 'true');
      }

      showToast(`¡Bienvenido ${user.firstName}!`, 'success');

      // Redirigir después de 1.5 segundos
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1500);

    } catch (error) {
      showToast('Error al iniciar sesión. Intenta de nuevo.', 'error');
      btn.disabled = false;
      btn.innerText = originalText;
    }
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  new LoginManager();
});
