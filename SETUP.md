# 📖 Guía de Instalación y Configuración

## 🚀 Instalación Rápida

### Paso 1: Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/ecommerce-store.git
cd ecommerce-store
```

### Paso 2: Abrir el proyecto

**Opción A - Doble click**
```
Simplemente haz doble click en index.html
```

**Opción B - Live Server (VS Code)**
```
1. Instala extensión "Live Server"
2. Click derecho en index.html
3. Selecciona "Open with Live Server"
```

**Opción C - Terminal**
```bash
# Python 3
python -m http.server 8000

# Node.js (con http-server)
npx http-server

# Luego abre: http://localhost:8000
```

## ⚙️ Configuración Inicial

### 1. Personalizar Datos de la Tienda

Edita `index.html` según tus necesidades:

**Logo y Nombre**
```html
<!-- Línea ~21 -->
<h1 class="navbar-logo">MI TIENDA</h1>
<p class="navbar-tagline">Mi Eslogan</p>
```

**Banner Principal**
```html
<!-- Línea ~45-46 -->
<h1 class="banner-title">Mi Tienda</h1>
<p class="banner-subtitle">Mi Eslogan</p>
<p class="banner-description">Descripción de mi tienda</p>
```

**Información de Contacto (Footer)**
```html
<!-- Línea ~90-101 -->
<p>Email: tu@email.com</p>
<p>Teléfono: +1 (555) 123-4567</p>
```

**Redes Sociales**
```html
<!-- Línea ~103-105 -->
<a href="https://facebook.com/tu-pagina" aria-label="Facebook">
<a href="https://instagram.com/tu-pagina" aria-label="Instagram">
```

### 2. Configurar Colores

Edita `styles.css` líneas 8-17:

```css
:root {
  --primary-color: #1a1a1a;      /* Fondo navbar y botones */
  --secondary-color: #000;        /* Color secundario */
  --accent-color: #ff6b35;        /* Color de acentos (CAMBIAR) */
  --text-light: #ffffff;          /* Texto claro */
  --text-dark: #333333;           /* Texto oscuro */
  --border-color: #e0e0e0;        /* Color de bordes */
  --shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  --shadow-hover: 0 8px 25px rgba(0, 0, 0, 0.15);
}
```

**Ejemplo de cambio de color:**
```css
/* De este anaranjado */
--accent-color: #ff6b35;

/* A este azul */
--accent-color: #0066cc;

/* O este verde */
--accent-color: #00b894;
```

### 3. Cambiar Banner

En `styles.css` línea ~163, reemplaza la URL:

```css
.banner {
  background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url("https://tu-url-de-imagen.jpg");
}
```

**Proveedores de imágenes gratis:**
- Unsplash: unsplash.com
- Pexels: pexels.com
- Pixabay: pixabay.com

### 4. Agregar Tus Productos

Edita `js/products.js`:

**Estructura de un producto:**
```javascript
{
  id: 1,                              // ID único
  nombre: "Nombre del Producto",      // Nombre a mostrar
  precio: 29.99,                      // Precio en USD
  img: "img/ruta-imagen.jpg",         // Ruta de la imagen
  cantidad: 1,                        // Dejar en 1
}
```

**Ejemplo completo:**
```javascript
const productos = [
  {
    id: 1,
    nombre: "Camiseta Premium Negra",
    precio: 49.99,
    img: "img/camiseta-negra.jpg",
    cantidad: 1,
  },
  {
    id: 2,
    nombre: "Pantalones Vaqueros",
    precio: 79.99,
    img: "img/pantalones-azules.jpg",
    cantidad: 1,
  },
  {
    id: 3,
    nombre: "Sudadera Gris",
    precio: 59.99,
    img: "img/sudadera-gris.jpg",
    cantidad: 1,
  },
];
```

## 📸 Agregar Imágenes de Productos

1. **Coloca las imágenes en la carpeta `img/`**
2. **Referencia como:** `"img/nombre-archivo.jpg"`
3. **Formatos soportados:** JPG, PNG, WebP, GIF
4. **Tamaño recomendado:** 400x400px (mínimo 300x300px)

## 💳 Configurar Métodos de Pago

En `checkout.html` líneas 210-225:

```html
<!-- Agregar nuevo método de pago -->
<label class="payment-method">
  <input type="radio" name="paymentMethod" value="crypto" />
  <span><i class="fab fa-bitcoin"></i> Bitcoin/Criptomonedas</span>
</label>
```

**Iconos disponibles:** [Font Awesome Icons](https://fontawesome.com/icons)

## 🚚 Configurar Métodos de Envío

En `js/checkout.js` línea ~20:

```javascript
this.shippingCosts = {
  standard: 9.99,      // Precio estándar
  express: 24.99,      // Precio express
  overnight: 49.99,    // Precio nocturno
  // Agregar más opciones:
  international: 99.99,
};
```

En `checkout.html` línea ~180, agrega:

```html
<label class="shipping-option">
  <input type="radio" name="shipping" value="international" />
  <div class="shipping-info">
    <span class="shipping-method">Envío Internacional</span>
    <span class="shipping-time">7-10 días hábiles</span>
  </div>
  <span class="shipping-price">$99.99</span>
</label>
```

## 📊 Cambiar Impuestos

En `js/checkout.js` línea ~163:

```javascript
// De 10% (0.10)
const taxes = (subtotal + shippingCost) * 0.10;

// A 15% (0.15)
const taxes = (subtotal + shippingCost) * 0.15;

// O 21% (0.21) para IVA
const taxes = (subtotal + shippingCost) * 0.21;
```

## 🌐 Cambiar Categorías

En `js/app.js` línea ~70, edita el método `getCategoria()`:

```javascript
getCategoria(producto) {
  if (producto.nombre.toLowerCase().includes('pantalón')) {
    return 'pantalones';
  }
  if (producto.nombre.toLowerCase().includes('zapatos')) {
    return 'zapatos';  // Nueva categoría
  }
  if (producto.nombre.toLowerCase().includes('accesorios')) {
    return 'accesorios';
  }
  return 'otros';
}
```

Y en `index.html` línea ~76, actualiza el filtro:

```html
<select id="categoryFilter" aria-label="Filtrar por categoría">
  <option value="">Todas las categorías</option>
  <option value="camisetas">Camisetas</option>
  <option value="pantalones">Pantalones</option>
  <option value="zapatos">Zapatos</option>
  <option value="accesorios">Accesorios</option>
</select>
```

## 📱 Optimizaciones

### Performance
- Las imágenes cargan con `loading="lazy"`
- CSS y JS están optimizados
- LocalStorage para datos rápidos

### SEO
- Meta tags en HTML
- Estructura semántica correcta
- Alt text en imágenes

### Accesibilidad
- ARIA labels
- Navegación por teclado
- Contraste de colores WCAG

## 🔒 Notas de Seguridad

⚠️ **IMPORTANTE PARA PRODUCCIÓN:**

1. **No uses localStorage para datos sensibles**
   ```javascript
   // ❌ NO HAGAS ESTO
   localStorage.setItem('creditCard', cardNumber);
   
   // ✅ HAZLO EST0
   // Envía al servidor encriptado
   ```

2. **Contraseñas**
   ```javascript
   // ❌ NO HAGAS ESTO
   password: btoa(password)  // Base64 es débil
   
   // ✅ HAZLO ESTO
   // Usa bcrypt en el servidor
   ```

3. **Pagos Reales**
   ```javascript
   // ❌ NO HAGAS ESTO
   // Procesar tarjetas en el cliente
   
   // ✅ HAZLO ESTO
   // Usa Stripe Elements o PayPal
   ```

4. **CORS**
   - Configura headers correctamente
   - Valida origen en el servidor

## 🚀 Desplegar a GitHub Pages

1. **Sube a GitHub** (gratis)
   ```bash
   git add .
   git commit -m "Actualizar tienda"
   git push origin main
   ```

2. **Habilita GitHub Pages**
   - Ve a Settings → Pages
   - Source: main branch
   - URL automática: `https://tu-usuario.github.io/repo-name`

3. **Dominio personalizado**
   - Compra dominio (GoDaddy, Namecheap)
   - Configura DNS hacia GitHub
   - Agrega archivo CNAME

## 📚 Recursos

- [MDN Web Docs](https://developer.mozilla.org)
- [CSS Tricks](https://css-tricks.com)
- [JavaScript.info](https://javascript.info)
- [Font Awesome Icons](https://fontawesome.com/icons)

## ❓ FAQ

**P: ¿Necesito Node.js?**
R: No, solo HTML/CSS/JS vanilla. Opcional para servidor local.

**P: ¿Se pueden agregar más productos?**
R: Sí, sin límite. Solo agrega en `products.js`

**P: ¿Funciona en móvil?**
R: Sí, 100% responsive.

**P: ¿Cómo cobro realmente?**
R: Integra Stripe, PayPal o tu pasarela favorita.

**P: ¿Puedo vender cursos?**
R: Sí, solo ajusta la estructura de "productos".

## 🆘 Solución de Problemas

**Los productos no aparecen**
- Verifica que `products.js` esté cargado
- Abre la consola (F12) y busca errores

**Las imágenes no cargan**
- Verifica la ruta en `img: "..."`
- Asegúrate que la imagen existe
- Prueba URL absoluta

**El carrito no guarda datos**
- LocalStorage deshabilitado (incógnito)?
- Revisa consola (F12) para errores
- Prueba en navegador diferente

---

**¿Necesitas ayuda?** Abre un issue en GitHub o contacta al equipo de soporte.
