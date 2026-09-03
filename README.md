# AACMP - Sitio web grupal

AACMP es el TP1 grupal de Desarrollo de Sistemas Web Front End 2026. El sitio presenta al equipo, reúne perfiles individuales y documenta el proceso de trabajo en una bitácora navegable.

> **Antes de entregar:** los nombres, edades, ciudades, gustos y enlaces incluidos son placeholders. Reemplazarlos por los datos reales del equipo y actualizar la bitácora, las capturas y la URL publicada.

## Integrantes

| Integrante | Perfil del sitio | GitHub |
| --- | --- | --- |
| Pablo Macia | [Ver perfil](pages/pablo.html) | [pablormacia](https://github.com/pablormacia) |
| Juan Manuel Albareda | [Ver perfil](pages/juan.html) | [juanmanuelalbareda](https://github.com/juanmanuelalbareda) |
| Daniela Cabrera | [Ver perfil](pages/daniela.html) | [Dancay5071](https://github.com/Dancay5071) |
| Mariano Arenas | [Ver perfil](pages/mariano.html) | [NanoCode10](https://github.com/NanoCode10) |
| Fernando Palearuzza | [Ver perfil](pages/fernando.html) | [FerPalearuzza](https://github.com/FerPalearuzza) |

## Demo

**Vercel:** `https://REEMPLAZAR-POR-LA-URL.vercel.app`

## Tecnologías

- HTML5 semántico.
- CSS3: variables, Grid, Flexbox, animaciones y media queries.
- JavaScript nativo: DOM, eventos e `IntersectionObserver`.
- Google Fonts: Space Grotesk y Manrope.
- Git y GitHub para control de versiones; Vercel para publicación.

## Estructura

```text
.
├── index.html          # Portada y listado del equipo
├── pages/              # Páginas secundarias
│   ├── pablo.html     # Perfil individual
│   ├── juan.html      # Perfil individual
│   ├── daniela.html   # Perfil individual
│   ├── mariano.html   # Perfil individual
│   ├── fernando.html  # Perfil individual
│   └── bitacora.html  # Registro del proceso
├── css/
│   └── styles.css      # Sistema visual y responsive
├── js/
│   └── main.js         # Interacciones compartidas
├── img/                # Imágenes y capturas
└── README.md
```

## Guía de estilos

### Paleta

| Uso | Color |
| --- | --- |
| Fondo papel | `#F5F2EB` |
| Texto principal | `#171719` |
| Coral | `#FF6B5F` |
| Azul | `#527BFF` |
| Amarillo | `#F4CB4F` |
| Verde | `#63B884` |
| Violeta | `#AD7AEF` |

### Tipografía e iconografía

- **Space Grotesk:** títulos, cifras y marca.
- **Manrope:** texto, navegación y controles.
- Flechas y estrellas Unicode como iconografía liviana; no requiere una librería externa.
- Avatares tipográficos abstractos para no publicar fotos personales. Pueden reemplazarse por archivos dentro de `img/`.

## Funciones JavaScript

### Portada

- **Mezclar tarjetas:** cambia aleatoriamente el orden visual de los perfiles al presionar “Mezclar tarjetas”.
- **Revelado al hacer scroll:** `IntersectionObserver` agrega una clase cuando cada bloque entra en pantalla.
- **Menú móvil:** abre y cierra la navegación en pantallas pequeñas y actualiza `aria-expanded`.

### Perfiles

Cada perfil incluye una función dinámica propia basada en un conjunto de opciones, sin repetir inmediatamente el resultado anterior:

- Pablo: genera una sugerencia creativa.
- Juan Manuel: propone un desafío lógico.
- Daniela: crea un disparador narrativo.
- Mariano: sugiere una acción concreta para el equipo.
- Fernando: genera una verificación de calidad para el sitio.

## Capturas de pantalla

Agregar las capturas finales después de completar los datos y publicar:

```md
![Portada de AACMP](img/captura-portada.png)
![Ejemplo de perfil](img/captura-perfil.png)
![Interacción JavaScript](img/captura-interaccion.png)
```

## Uso de IA y autoría

Se utilizó **Codex, basado en un modelo de OpenAI**, como asistente técnico y creativo para interpretar la consigna, proponer la estructura inicial, generar una primera versión de HTML/CSS/JavaScript y redactar contenido de muestra. **Completar:** indicar si se usó con plan gratuito o pago y la experiencia previa del equipo.

Los avatares actuales no fueron generados con un modelo de imágenes: son formas, colores e iniciales construidos con CSS para preservar la privacidad. El equipo debe revisar, comprender, probar y adaptar todo el resultado; los datos personales, decisiones definitivas, correcciones y contenido final son responsabilidad de sus integrantes.

## Evolución futura

- Reemplazar placeholders por contenido e imágenes definitivas.
- Incorporar preferencias de tema y persistencia local.
- Optimizar recursos gráficos y sumar pruebas automáticas.
- Ampliar la bitácora con aprendizajes de los próximos trabajos prácticos.

## Ejecución local

No requiere instalación. Abrir `index.html` en el navegador o usar una extensión de servidor local. Antes de entregar, verificar todos los enlaces, probar 400 px, 900 px y 1200 px, confirmar que no haya errores en consola y actualizar esta documentación.

