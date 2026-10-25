# Estudiar SMX

Biblioteca de estudio estática organizada por asignaturas. Cada asignatura puede tener sus propias unidades, apuntes, flashcards, tests, glosario y progreso guardado en el navegador.

La web es bilingüe **catalán / castellano**. El catalán es el idioma por defecto y el castellano se abre desde el selector `CA · ES` de la cabecera. Las dos versiones comparten el mismo progreso y el mismo tema.

## Asignaturas disponibles

| Asignatura | Carpeta | Primera unidad | Estado |
| --- | --- | --- | --- |
| **IPO** · Itinerari Personal per a l'Ocupabilitat | `asignaturas/ipo/` | La FP i el teu títol | Disponible |
| **CEAC** · Comunicació Empresarial i Atenció al Client | `asignaturas/ceac/` | Empresa i comunicació | Disponible |
| **SOFC** · Sistemes Operatius i Fonaments de Codificació | `asignaturas/sofc/` | Del maquinari a la lògica | Disponible |

CEAC trabaja el RA1 a partir de los apuntes de clase. SOFC recoge los cinco módulos del temario de Sistemas Operatius i Fonaments de Codificació. Los tests de CEAC y SOFC son de elaboración propia: solo el test de IPO reproduce preguntas oficiales del PDF.

En total, el portal reúne **3 asignaturas, 15 bloques y 82 flashcards**: IPO 27, CEAC 27 y SOFC 28.

## Estructura

```text
Web para estudiar/
├── index.html                      Portal · catalán (por defecto)
├── index.es.html                   Portal · castellano
├── asignaturas/
│   ├── ipo/
│   │   ├── index.html              Asignatura IPO · catalán
│   │   ├── index.es.html           Asignatura IPO · castellano
│   │   ├── unidad-1.html           Unidad 1 completa · catalán
│   │   └── unidad-1.es.html        Unidad 1 completa · castellano
│   ├── ceac/
│   │   ├── index.html              Asignatura CEAC · catalán
│   │   ├── index.es.html           Asignatura CEAC · castellano
│   │   ├── unidad-1.html           Unidad 1 completa · catalán
│   │   └── unidad-1.es.html        Unidad 1 completa · castellano
│   └── sofc/
│       ├── index.html              Asignatura SOFC · catalán
│       ├── index.es.html           Asignatura SOFC · castellano
│       ├── unidad-1.html           Unidad 1 completa · catalán
│       └── unidad-1.es.html        Unidad 1 completa · castellano
├── assets/
│   ├── css/styles.css              Diseño compartido del portal y las unidades
│   └── js/
│       ├── units.js                Registro de unidades · castellano
│       ├── units-ca.js             Registro de unidades · catalán
│       ├── data.js                 Contenido y actividades de IPO · castellano
│       ├── data-ca.js              Contenido y actividades de IPO · catalán
│       ├── data-ceac.js            Contenido y actividades de CEAC · castellano
│       ├── data-ceac-ca.js         Contenido y actividades de CEAC · catalán
│       ├── data-sofc.js            Contenido y actividades de SOFC · castellano
│       ├── data-sofc-ca.js         Contenido y actividades de SOFC · catalán
│       ├── i18n.js                 Textos generados por JavaScript en ambos idiomas
│       ├── lang.js                 Selector CA/ES y preferencia guardada
│       ├── app.js                  Motor de estudio y progreso de una unidad
│       └── portal.js               Tema, menús y progreso del portal
└── README.md
```

La navegación sigue tres niveles:

1. **Estudiar SMX** (`index.html`): catálogo de asignaturas y progreso global.
2. **Asignatura** (`asignaturas/ipo/index.html`, `asignaturas/ceac/index.html` o `asignaturas/sofc/index.html`): progreso de la asignatura, unidades y temas.
3. **Unidad** (`asignaturas/<asignatura>/unidad-1.html`): temario, práctica, flashcards, test, glosario, autoevaluación, plan y resumen.

Cada página catalana tiene su hermana castellana con el sufijo `.es.html`. Los enlaces internos de cada versión apuntan a la versión del mismo idioma; el selector de la cabecera cambia de una a otra. Los enlaces incluyen siempre el nombre del archivo para que funcionen tanto abriendo el proyecto en local como desde un servidor estático.

## Cómo funciona el progreso

- Cada unidad guarda su estado por separado y **las dos versiones lingüísticas usan la misma clave**:
  - IPO · Unidad 1: `rutaFP.u1.v1` (clave histórica, se conserva para no perder progreso).
  - CEAC · Unidad 1: `rutaFP.ceac.u1.v1`.
  - SOFC · Unidad 1: `rutaFP.sofc.u1.v1`.
- El tema claro/oscuro se guarda de forma global en `estudiarSMX.theme.v1`.
- El idioma elegido se recuerda en `estudiarSMX.lang.v1`. La primera visita abre en catalán.
- Si todavía no existe la clave global del tema, se reutiliza el tema guardado en alguna de las unidades para mantener la preferencia anterior.
- El porcentaje de cada asignatura y el global se calculan con los bloques completados. El portal también muestra las flashcards conocidas y el mejor resultado del test de cada asignatura.
- Todo se guarda en `localStorage`; no hay cuentas ni servidor.

## Añadir una asignatura

1. Crea una carpeta dentro de `asignaturas/` con el nombre corto de la asignatura, por ejemplo `asignaturas/bd/`.
2. Copia una página de asignatura existente como base para el nuevo `index.html` y adapta textos, colores y enlaces. Crea también su `index.es.html`.
3. Crea la página de la primera unidad copiando una unidad existente. Añade su versión catalana (`unidad-1.html`) y castellana (`unidad-1.es.html`).
4. Registra la unidad en **los dos registros**, `assets/js/units.js` y `assets/js/units-ca.js`. Cada entrada representa una unidad; `subjectId` agrupa las unidades de una misma asignatura. Usa los mismos `id`, `storageKey`, `totalCards` y secciones en ambos idiomas:

```js
window.SMX_UNITS = {
  // ... IPO, CEAC y SOFC
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

5. Añade una tarjeta en `#asignaturas` de `index.html` y `index.es.html` con `data-unit-card="bd"` y los elementos `data-unit-percent` y `data-unit-bar`. La tarjeta y el panel de la asignatura se rellenan desde `portal.js`.
6. En la página de la asignatura, pon `data-unit-page="bd"` en el panel de progreso y usa los mismos `data-unit-*` que en CEAC.
7. Añade los enlaces de la nueva asignatura al menú y al pie de ambas versiones.
8. Añade un color de acento propio en `styles.css` si quieres diferenciarla. El tema claro/oscuro ya es compartido.

`portal.js` agrupa las entradas por `subjectId`, suma sus bloques, flashcards y mejores resultados, y calcula el porcentaje de la asignatura y el global. La tarjeta `data-unit-card` y el panel `data-unit-page` de una asignatura muestran el progreso agregado de todas sus unidades.

## Añadir una unidad a una asignatura existente

1. Duplica `asignaturas/<asignatura>/unidad-1.html` como `unidad-2.html` y su versión `.es.html`.
2. Cambia el título, el contenido y los identificadores internos de la nueva unidad en ambos idiomas.
3. Añade una entrada nueva en `assets/js/units.js` y otra en `assets/js/units-ca.js`, con la misma clave, el mismo `subjectId`, los mismos ids de sección y su propia `storageKey`:

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

4. Añade el enlace de la nueva unidad a la página de la asignatura en ambos idiomas. No hace falta crear otra tarjeta en el portal: la tarjeta y el panel de esa asignatura ya suman todas sus entradas.
5. Crea un archivo de datos para cada idioma. Cada página carga solo el suyo, antes de `i18n.js` y `app.js`:

```html
<!-- Página catalana -->
<script src="../../assets/js/data-ceac-u2-ca.js" defer></script>
<script src="../../assets/js/i18n.js" defer></script>
<script src="../../assets/js/app.js" defer></script>

<!-- Página castellana -->
<script src="../../assets/js/data-ceac-u2.js" defer></script>
<script src="../../assets/js/i18n.js" defer></script>
<script src="../../assets/js/app.js" defer></script>
```

Cada archivo de datos define al principio `window.STUDY_CONFIG` y después `window.STUDY_DATA`. La configuración mínima es:

```js
window.STUDY_CONFIG = {
  storageKey: 'rutaFP.ceac.u2.v1',
  sections: [/* los mismos ids que en units.js y units-ca.js */],
  categories: { all: 'Todas' /* ... */ },
  flashCategories: { all: 'Todas' /* ... */ },
  selfNoun: 'competencias comunicativas'
};
```

`app.js` usa una configuración por defecto para IPO. Al definir `window.STUDY_CONFIG` antes de cargarlo, la misma lógica de progreso, flashcards, test, glosario y autoevaluación funciona con cualquier unidad. Los campos opcionales `firstNextTitle`, `firstNextText`, `firstNextLabel` y `quizFeatures` permiten adaptar los textos de la unidad. La versión catalana debe traducir esos mismos campos, pero conservar ids, respuestas correctas, claves de almacenamiento y estructura.

## Bilingüe

- `assets/js/lang.js` guarda la elección en `estudiarSMX.lang.v1`. Al cambiar de idioma navega a la página hermana y conserva el ancla actual.
- Los textos que genera JavaScript están en `assets/js/i18n.js`, con diccionarios `ca` y `es`. El idioma se deduce de `<html lang="...">`.
- Las páginas catalanas y castellanas comparten `styles.css`, `app.js` y `portal.js`; solo cambian el contenido HTML, los datos y el registro de unidades.
- Los archivos `.es.html` son las versiones castellanas. Los archivos sin sufijo son las versiones catalanas y el idioma por defecto.
- Todo el contenido visible está traducido: interfaz, navegación, apuntes, flashcards, test, glosario, resumen, autoevaluación y plan. También los textos que genera JavaScript.
- Cada par de páginas declara `data-alt-lang` y el selector conserva el ancla actual al cambiar de idioma. El progreso y el tema son compartidos porque ambas versiones usan la misma `storageKey`.

## Desarrollo local

Puedes abrir `index.html` directamente en el navegador. Para probar el sitio como un servidor estático:

```powershell
python -m http.server 4173
```

Después visita `http://127.0.0.1:4173/`.
