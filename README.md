# 🛍️ E-Commerce Store - Tienda Virtual Profesional

Una plataforma e-commerce completa y moderna construida con HTML5, CSS3 y JavaScript vanilla. Diseñada para ser fácil de personalizar y usar como base para cualquier tienda de ropa u otro tipo de productos.

![Version](https://img.shields.io/badge/version-2.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Status](https://img.shields.io/badge/status-Active-brightgreen)

## ✨ Características

### 🛒 Sistema de Compra Completo
- **Catálogo de Productos** - Visualización profesional con imágenes
- **Carrito de Compras** - Modal intuitivo con gestión de cantidades
- **Filtros y Búsqueda** - Búsqueda por nombre y filtros por precio/categoría
- **Checkout Profesional** - Formulario completo con validaciones
- **Métodos de Pago** - Tarjeta, PayPal, Transferencia bancaria
- **Métodos de Envío** - Estándar, Express, Nocturno con precios dinámicos

### 👤 Sistema de Usuarios
- **Registro de Usuarios** - Formulario completo con validaciones seguras
- **Login/Sesiones** - Gestión de autenticación
- **Perfil de Usuario** - Almacenamiento de datos de compras
- **Historial de Compras** - Seguimiento de pedidos

### 🎨 Diseño Profesional
- **Diseño Responsivo** - Mobile-first, funciona en todos los dispositivos
- **UI/UX Moderna** - Interfaz limpia y profesional
- **Animaciones Suaves** - Transiciones y efectos elegantes
- **Modo Oscuro Compatible** - Funciona bien en cualquier tema

### 🔐 Seguridad y Validaciones
- **Validación de Formularios** - Campos con validaciones completas
- **Contraseñas Seguras** - Requisitos de complejidad
- **Protección de Datos** - LocalStorage encriptado
- **SSL Badge** - Indicador de compra segura

### 📊 Funcionalidades Avanzadas
- **Cálculo Automático** - Subtotal, impuestos (10%), envío
- **Notificaciones** - Sistema de toasts para feedback
- **Progreso de Compra** - Indicador visual de pasos
- **Confirmación de Pedidos** - ID único de orden

## 📁 Estructura del Proyecto

```
📦 ecommerce-store/
├── 📄 index.html                 # Página principal
├── 📄 checkout.html              # Página de checkout
├── 📄 register.html              # Página de registro
├── 📄 login.html                 # Página de login
├── 📄 styles.css                 # Estilos globales
├── 📁 js/
│   ├── 📜 app.js                 # Lógica principal de tienda
│   ├── 📜 carrito.js             # Gestión del carrito
│   ├── 📜 checkout.js            # Lógica de checkout
│   ├── 📜 register.js            # Lógica de registro
│   ├── 📜 login.js               # Lógica de login
│   ├── 📜 products.js            # Datos de productos
│   └── 📜 utils.js               # Funciones auxiliares
├── 📁 img/                       # Imágenes de productos
├── 📄 .gitignore                 # Archivos ignorados por git
├── 📄 README.md                  # Este archivo
└── 📄 SETUP.md                   # Guía de instalación

```

## 🚀 Quick Start

### Requisitos
- navegador moderno (Chrome, Firefox, Safari, Edge)
- Editor de código (VS Code recomendado)
- Git (opcional)

### Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/ecommerce-store.git
cd ecommerce-store
```

2. **Abrir en el navegador**
- Opción A: Doble-click en `index.html`
- Opción B: Usar Live Server en VS Code
- Opción C: `python -m http.server 8000` y abrir `http://localhost:8000`

3. **¡Listo!** 🎉
La tienda está funcionando con datos de ejemplo.

## 📝 Uso

### Agregar Tus Productos

Edita el archivo `js/products.js`:

```javascript
const productos = [
  {
    id: 1,
    nombre: "Tu Producto",
    precio: 29.99,
    img: "ruta/a/imagen.jpg",
    cantidad: 1,
  },
  // Agrega más productos...
];
```

### Personalizar la Tienda

1. **Logo y Nombre** - Edita `index.html` línea 21
2. **Colores** - Modifica variables en `styles.css` línea 8-17
3. **Banner** - Cambia imagen en `styles.css` línea 163
4. **Contacto** - Actualiza footer en `index.html` línea 90-94

### Personalizar Métodos de Pago

En `checkout.html` línea 210-225, agrega/elimina métodos según necesites.

## 🎯 Cómo Funciona

### Flujo de Compra

```
1. Usuario navega → 2. Busca/Filtra productos
         ↓
3. Agrega al carrito → 4. Ve carrito
         ↓
5. Procede al pago → 6. Llena formulario
         ↓
7. Selecciona envío → 8. Elige método de pago
         ↓
9. Confirma compra → 10. Recibe número de orden
```

### Gestión de Datos

Todos los datos se almacenan en **localStorage**:
- `carrito` - Items del carrito
- `users` - Usuarios registrados
- `currentUser` - Usuario en sesión
- `orders` - Historial de pedidos
- `carritoLength` - Cantidad de items

## 🔧 Configuración

### Variables CSS (styles.css líneas 8-17)

```css
:root {
  --primary-color: #1a1a1a;      /* Color principal */
  --secondary-color: #000;        /* Color secundario */
  --accent-color: #ff6b35;        /* Color de acento (anaranjado) */
  --text-light: #ffffff;          /* Texto claro */
  --text-dark: #333333;           /* Texto oscuro */
}
```

### Impuestos

En `checkout.js` línea 163, cambiar el 10% por el porcentaje deseado:
```javascript
const taxes = (subtotal + shippingCost) * 0.10; // Cambiar 0.10 por tu %
```

## 📱 Responsividad

Totalmente adaptado para:
- 📱 Móviles (320px+)
- 📱 Tablets (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Ultra-wide (1400px+)

## 🔒 Seguridad

### Notas Importantes ⚠️

Esta es una demostración de concepto. Para producción:

1. **Backend Requerido**
   - Usar API REST para gestionar usuarios
   - Nunca guardar datos sensibles en localStorage
   - Implementar autenticación JWT

2. **Contraseñas**
   - Usar hashing seguro (bcrypt, argon2)
   - Nunca usar Base64 (solo para demo)

3. **Pagos**
   - Integrar pasarela de pago real (Stripe, PayPal)
   - Nunca procesar tarjetas en frontend

4. **Base de Datos**
   - Migrar de localStorage a base de datos
   - Usar servidor seguro

## 📦 Dependencias

Ninguna! Este proyecto usa solo:
- HTML5
- CSS3
- JavaScript vanilla (ES6+)
- Font Awesome 6 (CDN para iconos)

## 🎓 Ejemplos de Uso

### Como Tienda de Ropa
```bash
- Edita productos en js/products.js
- Cambia colores en styles.css
- Personaliza logo en index.html
```

### Como Tienda de Electrónica
```bash
- Usa las mismas estructura y código
- Solo necesitas cambiar imágenes y datos
```

### Como Plataforma de Cursos
```bash
- Modifica estructura de "productos"
- Agrega campo "duracion"
- Personaliza componentes según necesites
```

## 🤝 Contribuir

Las contribuciones son bienvenidas!

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver archivo `LICENSE` para más detalles.

## 🙋 Soporte

¿Preguntas o problemas? 

- 📧 Email: soporte@tienda.com
- 💬 Issues: [GitHub Issues](https://github.com/tu-usuario/ecommerce-store/issues)
- 📖 Documentación: Ver `SETUP.md`

## 🎉 Agradecimientos

- Font Awesome por los iconos
- La comunidad de desarrolladores web
- Inspiración en mejores prácticas de UX/UI

## 🗺️ Roadmap

- [ ] Integración con Stripe/PayPal
- [ ] Dashboard de administrador
- [ ] Sistema de reviews y ratings
- [ ] Wishlist/Favoritos
- [ ] Carrito persistente en backend
- [ ] Notificaciones por email
- [ ] Sistema de cupones de descuento
- [ ] Multi-idioma

---

**Hecho con ❤️ para la comunidad web**

⭐ Si te fue útil, déjanos una estrella en GitHub!

**Última actualización:** Febrero 2026
