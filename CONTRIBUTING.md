# Contribuir a E-Commerce Store

¡Gracias por tu interés en contribuir! 🎉

## Cómo Reportar Bugs

Usa [GitHub Issues](https://github.com/DarnerDiaz/ecommerce-store/issues) para reportar bugs.

**Incluye:**
- Descripción clara del problema
- Pasos para reproducir
- Comportamiento esperado vs actual
- Screenshots si aplica
- Navegador y versión

## Cómo Sugerir Mejoras

- Abre un [GitHub Issue](https://github.com/DarnerDiaz/ecommerce-store/issues)
- Describe la necesidad/mejora
- Explica por qué crees que es útil
- Proporciona ejemplos

## Proceso de Contribución

1. **Fork el Proyecto**
```bash
git clone https://github.com/DarnerDiaz/ecommerce-store.git
cd ecommerce-store
```

2. **Crea una Rama**
```bash
git checkout -b feature/nueva-caracteristica
```

3. **Realiza tus Cambios**
- Sigue el estilo de código existente
- Prueba completamente
- Actualiza documentación

4. **Commit con Mensajes Claros**
```bash
git commit -m "Agregar nueva característica"
```

5. **Push a tu Fork**
```bash
git push origin feature/nueva-caracteristica
```

6. **Abre un Pull Request**
- Describe qué cambió y por qué
- Referencia issues relacionados
- Proporciona screenshots si es UI

## Estilos de Código

### JavaScript
```javascript
// Usa arrow functions
const sumar = (a, b) => a + b;

// Usa const por defecto, let si necesitas reasignar
const miVariable = "valor";

// Usa comillas simples
const nombre = 'Juan';

// Usa 2 espacios de indentación
if (condicion) {
  // código
}

// Usa nombres descriptivos
const usuarioRegistrado = true;
```

### CSS
```css
/* Usa separadores de sección */
/* ────────────────────────────────────────────────────────────────────
   SECCIÓN PRINCIPAL
   ──────────────────────────────────────────────────────────────────── */

/* Variables para colores y medidas */
:root {
  --color-primario: #000;
}

/* Usa 2 espacios */
.clase {
  color: var(--color-primario);
}
```

### HTML
```html
<!-- Usa atributos semánticos -->
<header>
  <nav>
    <!-- navegación -->
  </nav>
</header>

<!-- Usa comillas dobles -->
<img src="imagen.jpg" alt="descripción" />

<!-- Comenta secciones complejas -->
<!-- Sección de productos -->
<section class="productos">
  <!-- contenido -->
</section>
```

## Pruebas

Antes de hacer PR:

1. **Prueba en Desktop**
   - Chrome, Firefox, Safari, Edge

2. **Prueba en Mobile**
   - iPhone (Safari)
   - Android (Chrome)
   - Tablet

3. **Prueba Funcionalidades**
   - Filtros funcionan
   - Carrito guarda datos
   - Checkout valida
   - Login registra usuarios

## Documentación

- Actualiza README.md si cambias funcionalidades
- Agrega comentarios en código complejo
- Explica por qué, no qué

## Tipos de Contribuciones Bienvenidas

- 🐛 **Bug Fixes** - Arreglar errores
- ✨ **Nuevas Características** - Agregar funcionalidad
- 📝 **Documentación** - Mejorar tutoriales
- 🎨 **UI/UX** - Mejorar diseño
- ♿ **Accesibilidad** - Mejor a11y
- ⚡ **Performance** - Optimizaciones
- 🌍 **Localización** - Otros idiomas
- 🧪 **Ejemplos** - Casos de uso

## Preguntas

- 💬 Abre una [Discusión](https://github.com/DarnerDiaz/ecommerce-store/discussions)
- 📧 Email: soporte@tienda.com

## Código de Conducta

- Sé respetuoso
- No discrimines
- Ayuda a otros
- Sé constructivo

---

¡Gracias por contribuir! 🙏
