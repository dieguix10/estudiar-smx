# Estudiar SMX

Biblioteca de estudio estática organizada por asignaturas. Cada asignatura puede tener sus propias unidades, apuntes, flashcards, tests, glosario y progreso guardado en el navegador.

## Asignaturas disponibles

| Asignatura | Carpeta | Primera unidad | Estado |
| --- | --- | --- | --- |
| **IPO** · Itinerario Personal para la Ocupabilidad | `asignaturas/ipo/` | La FP, los títulos y cómo se regula tu ciclo | Disponible |
| **CEAC** · Comunicació Empresarial i Atenció al Client | `asignaturas/ceac/` | Empresa i comunicació | Disponible |

CEAC trabaja el RA1 a partir de los apuntes de clase. Su test es de elaboración propia: solo el test de IPO reproduce preguntas oficiales del PDF.

## Estructura

```text
Web para estudiar/
├── index.html                      Portal de Estudiar SMX
├── asignaturas/
│   ├── ipo/
│   │   ├── index.html              Página de la asignatura IPO
│   │   └── unidad-1.html           Contenido completo de la Unidad 1
│   └── ceac/
│       ├── index.html              Página de la asignatura CEAC
│       └── unidad-1.html           Contenido completo de la Unidad 1
├── assets/
│   ├── css/styles.css              Diseño compartido del portal y las unidades
│   └── js/
│       ├── units.js                Registro de asignaturas y unidades
│       ├── data.js                 Contenido y actividades de IPO · Unidad 1
│       ├── data-ceac.js            Contenido y actividades de CEAC · Unidad 1
│       ├── app.js                  Motor de estudio y progreso de una unidad
│       └── portal.js               Tema, menús y progreso del portal
└── README.md
```

La navegación sigue tres niveles:

1. **Estudiar SMX** (`index.html`): catálogo de asignaturas y progreso global.
2. **Asignatura** (`asignaturas/ipo/index.html` o `asignaturas/ceac/index.html`): progreso de la asignatura, unidades y temas.
3. **Unidad** (`asignaturas/<asignatura>/unidad-1.html`): temario, práctica, flashcards, test, glosario, autoevaluación, plan y resumen.

Los enlaces incluyen siempre el nombre del archivo (`index.html`) para que funcionen tanto abriendo el proyecto en local como desde un servidor estático.

## Cómo funciona el progreso

- Cada unidad guarda su estado por separado:
  - IPO · Unidad 1: `rutaFP.u1.v1` (clave histórica, se conserva para no perder progreso).
  - CEAC · Unidad 1: `rutaFP.ceac.u1.v1`.
- El tema claro/oscuro se guarda de forma global en `estudiarSMX.theme.v1`.
- Si todavía no existe la clave global, se reutiliza el tema guardado en alguna de las unidades para mantener la preferencia anterior.
- El porcentaje de cada asignatura y el global se calculan con los bloques completados. El portal también muestra las flashcards conocidas y el mejor resultado del test de cada asignatura.
- Todo se guarda en `localStorage`; no hay cuentas ni servidor.

## Añadir una asignatura

1. Crea una carpeta dentro de `asignaturas/` con el nombre corto de la asignatura, por ejemplo `asignaturas/bd/`.
2. Copia `asignaturas/ceac/index.html` como base para el nuevo `index.html` y adapta textos, colores y enlaces.
3. Crea la página de la primera unidad copiando `asignaturas/ceac/unidad-1.html`.
4. Registra la primera unidad en `assets/js/units.js`. Cada entrada representa una unidad; `subjectId` agrupa las unidades de una misma asignatura:

```js
window.SMX_UNITS = {
  // ... IPO y CEAC
  bd: {
    subjectId: 'bd',
    code: 'BD',
    subject: 'Bases de Datos',
    unit: 'Unidad 1',
    storageKey: 'rutaFP.bd.u1.v1',
    totalCards: 24,
    sections: [
      { id: 'intro', title: 'Introducción', desc: 'Qué es un sistema gestor de bases de datos.' }
      // ...
    ]
  }
};
```

5. Añade una tarjeta en `#asignaturas` de `index.html` con `data-unit-card="bd"` y los elementos `data-unit-percent` y `data-unit-bar`. La tarjeta y el panel de la asignatura se rellenan desde `portal.js`.
6. En la página de la asignatura, pon `data-unit-page="bd"` en el panel de progreso y usa los mismos `data-unit-*` que en CEAC.
7. Añade los enlaces de la nueva asignatura al menú y al pie.
8. Añade un color de acento propio en `styles.css` si quieres diferenciarla. El tema claro/oscuro ya es compartido.

`portal.js` agrupa las entradas por `subjectId`, suma sus bloques, flashcards y mejores resultados, y calcula el porcentaje de la asignatura y el global. La tarjeta `data-unit-card` y el panel `data-unit-page` de una asignatura muestran el progreso agregado de todas sus unidades.

## Añadir una unidad a una asignatura existente

1. Duplica `asignaturas/<asignatura>/unidad-1.html` como `unidad-2.html`.
2. Cambia el título, el contenido y los identificadores internos de la nueva unidad.
3. Añade una entrada nueva en `assets/js/units.js` con una clave única, el mismo `subjectId` de la asignatura y su propia `storageKey`:

```js
ceacU2: {
  subjectId: 'ceac',
  code: 'CEAC',
  subject: 'Comunicació Empresarial i Atenció al Client',
  unit: 'Unidad 2',
  storageKey: 'rutaFP.ceac.u2.v1',
  totalCards: 24,
  sections: [
    { id: 'atencion', title: 'Atención al cliente', desc: 'Servicio, calidad y resolución de consultas.' }
    // ...
  ]
}
```

4. Añade el enlace de la nueva unidad a la página de la asignatura. No hace falta crear otra tarjeta en el portal: la tarjeta y el panel de esa asignatura ya suman todas sus entradas.
5. Crea su archivo de datos y cárgalo antes de `app.js`:

```html
<script src="../../assets/js/data-ceac-u2.js" defer></script>
<script src="../../assets/js/app.js" defer></script>
```

El archivo de datos define al principio `window.STUDY_CONFIG` y después `window.STUDY_DATA`. La configuración mínima es:

```js
window.STUDY_CONFIG = {
  storageKey: 'rutaFP.ceac.u2.v1',
  sections: [/* los mismos ids que en units.js */],
  categories: { all: 'Todas' /* ... */ },
  flashCategories: { all: 'Todas' /* ... */ },
  selfNoun: 'competencias comunicativas'
};
```

`app.js` usa una configuración por defecto para IPO. Al definir `window.STUDY_CONFIG` antes de cargarlo, la misma lógica de progreso, flashcards, test, glosario y autoevaluación funciona con cualquier unidad. Los campos opcionales `firstNextTitle`, `firstNextText`, `firstNextLabel` y `quizFeatures` permiten adaptar los textos de la unidad.

## Desarrollo local

Puedes abrir `index.html` directamente en el navegador. Para probar el sitio como un servidor estático:

```powershell
python -m http.server 4173
```

Después visita `http://127.0.0.1:4173/`.

El contenido y los textos están en español; se conservan los términos catalanes originales de los apuntes de IPO y CEAC.
