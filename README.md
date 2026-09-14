# AACMP — Sitio Web Grupal

AACMP es el primer Trabajo Práctico Grupal para la materia **Desarrollo de Sistemas Web Front End (2026)**. El sitio presenta al equipo de trabajo a través de una propuesta estética de *Acuarela Botánica Minimalista*, reúne perfiles individuales interactivos y documenta el proceso de desarrollo en una bitácora navegable.

---

## Integrantes

| Integrante | Rol / Enfoque | Perfil | GitHub |
| --- | --- | --- | --- |
| **Pablo Macia** | Estrategia & Movimiento | [Ver perfil](pages/pablo.html) | [@pablormacia](https://github.com/pablormacia) |
| **Juan Manuel Albareda** | Análisis & Calidad | [Ver perfil](pages/juan.html) | [@juanmanuelalbareda](https://github.com/juanmanuelalbareda) |
| **Daniela Cabrera** | Diseño & Detalle | [Ver perfil](pages/daniela.html) | [@Dancay5071](https://github.com/Dancay5071) |
| **Mariano Arenas** | Código & Lógica | [Ver perfil](pages/mariano.html) | [@NanoCode10](https://github.com/NanoCode10) |
| **Fernando Palearuzza** | Contenido & Empatía | [Ver perfil](pages/fernando.html) | [@FerPalearuzza](https://github.com/FerPalearuzza) |

---

## Demo

- **Sitio publicado en Vercel:** [https://tp1-dswf-aacmp.vercel.app](https://tp1-dswf-aacmp.vercel.app)

---

## Tecnologías

- **HTML5 Semántico:** marcado estructurado con accesibilidad integrada (atributos ARIA, marcas navegables y landmarks).
- **CSS3 Avanzado:** variables CSS (Custom Properties), CSS Grid, Flexbox, animaciones `@keyframes`, efectos de cristal/papel (`backdrop-filter`) y filtros SVG de textura noise (`fractalNoise`).
- **JavaScript Nativo (Vanilla JS):** manipulación directa del DOM, eventos, `IntersectionObserver` para animaciones al hacer scroll, ScrollSpy de navegación y filtros dinámicos.
- **Tipografías (Google Fonts):** *Playfair Display*, *Cormorant Garamond*, *EB Garamond*, *Quicksand* e *Inter*.
- **Control de Versiones & Despliegue:** Git, GitHub para trabajo colaborativo y Vercel para hosting continuo.

---

##  Estructura del Proyecto

```text
TP1-DSWF-AACMP/
├── index.html            # Portada principal y grilla del equipo
├── pages/                # Páginas individuales y secundarias
│   ├── pablo.html        # Perfil individual de Pablo
│   ├── juan.html         # Perfil individual de Juan Manuel
│   ├── daniela.html      # Perfil individual de Daniela
│   ├── mariano.html      # Perfil individual de Mariano
│   ├── fernando.html     # Perfil individual de Fernando
│   └── bitacora.html     # Bitácora y registro del proceso
├── css/
│   └── styles.css        # Sistema visual, variables y responsive
├── js/
│   └── main.js           # Lógica interactiva compartida
├── img/                  # Fotografías de integrantes y recursos gráficos
│   ├── daniela.jpg
│   ├── fernando.jpg
│   ├── juan.jpg
│   ├── mariano.jpg
│   └── pablo.jpg
└── README.md             # Documentación del proyecto
```

---

##  Guía de Estilos (Sistema de Diseño)

El proyecto cuenta con un sistema de diseño propio basado en tonos orgánicos de acuarela y textura de papel artesanal.

### Paleta de Colores

| Categoría | Variable CSS | Color Hex / Valor | Uso Principal |
| --- | --- | --- | --- |
| **Papel** | `--paper` | `#FDFAF5` | Fondo general texturizado |
| **Tinta** | `--ink` | `#3A3028` | Textos y títulos principales |
| **Tinta Secundaria** | `--ink-light` | `#8C7A5A` | Subtítulos y descripciones |
| **Sage (Verde Sabio)** | `--sage` | `#87A878` | Botones primarios, acentos y bordes |
| **Moss (Musgo)** | `--moss` | `#6B8E6B` | Interacciones hover y acentos oscuros |
| **Ochre (Ocre)** | `--ochre` | `#C4A05C` | Acentos cálidos y etiquetas destacadas |
| **Cerulean (Cerúleo)** | `--cerulean` | `#A8C4D4` | Detalles y contrastes fríos |

### Tipografía

- **Playfair Display (`--font-display`):** Títulos de gran impacto e itálicas distintivas.
- **Cormorant Garamond (`--font-heading`):** Encabezados `h2`, `h3` y subtítulos.
- **EB Garamond (`--font-body`):** Cuerpo de texto principal y párrafos explicativos.
- **Quicksand / Inter (`--font-label`):** Etiquetas, navegación, botones y elementos de UI.

---

## Funciones JavaScript

### Lógica Compartida (`js/main.js`)

1. **Mezclador de Tarjetas:** permuta de forma aleatoria la disposición visual de los perfiles del equipo en la portada al hacer clic en *"Mezclar Tarjetas ↻"*.
2. **Animaciones Scroll Reveal:** utiliza `IntersectionObserver` para aplicar la clase `.visible` a los elementos `.reveal` a medida que entran al viewport.
3. **Menú Móvil Accesible:** controla la apertura/cierre de la navegación adaptativa y actualiza dinámicamente el estado `aria-expanded`.
4. **ScrollSpy de Navegación:** detecta el desplazamiento vertical para actualizar automáticamente el enlace activo (`Inicio` vs `#equipo`) en la barra superior.

### Perfiles Individuales (`pages/*.html`)

- **Interacción Dinámica de Fotografía:** al pasar el cursor sobre las distintas tarjetas de habilidades (`#skills-container span`), un script nativo calcula el tono (`data-hue`) y aplica en tiempo real un filtro CSS `hue-rotate` sobre la fotografía del integrante, retornando a su estado base al quitar el cursor.

---

## Uso de Inteligencia Artificial y Autoría

Se emplearon herramientas de **Inteligencia Artificial (Modelos de LLM y asistentes de código)** como apoyo técnico y creativo para:
- Interpretación inicial de consignas y estructuración del layout HTML.
- Sugerencia de fórmulas matemáticas para lavados de acuarela en CSS y animaciones `@keyframes`.
- Generación de textos base y borradores para la bitácora.

Todo el código generado fue revisado, probado, estilizado y adaptado por los integrantes del equipo. Los datos personales, fotografías, decisiones estéticas y de arquitectura web son de autoría y responsabilidad directa de los integrantes.

---

## Ejecución Local

No requiere de compilación ni gestores de paquetes. Para ejecutar el proyecto de forma local:

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/pablormacia/TP1-DSWF-AACMP.git
   ```
2. Abrir `index.html` directamente en cualquier navegador moderno o iniciar mediante una extensión de servidor local (como *Live Server* en VS Code).


