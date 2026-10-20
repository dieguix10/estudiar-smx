/* Contenido de CEAC · Unidad 1 · Estudiar SMX */
window.STUDY_CONFIG = {
  storageKey: 'rutaFP.ceac.u1.v1',
  themeKey: 'estudiarSMX.theme.v1',
  sections: [
    { id: 'empresa', title: 'La empresa y su organización', desc: 'Elementos, principios, departamentos y organigramas.' },
    { id: 'informacio', title: 'La información en la empresa', desc: 'Sistemas, fuentes y criterios de utilidad.' },
    { id: 'comunicacio', title: 'El proceso de comunicación', desc: 'Elementos, etapas, tipos e interferencias.' },
    { id: 'empresa-comunicacio', title: 'La comunicación en la empresa', desc: 'Flujos internos, canales y comunicación externa.' },
    { id: 'eficacia', title: 'La eficacia de la comunicación', desc: 'Mensaje, canal, actitudes y barreras.' }
  ],
  categories: {
    all: 'Todas',
    empresa: 'Empresa',
    informacio: 'Información',
    comunicacio: 'Comunicación',
    'empresa-comunicacio': 'Empresa y comunicación',
    eficacia: 'Eficacia'
  },
  flashCategories: {
    all: 'Todas',
    empresa: 'Empresa',
    informacio: 'Información',
    comunicacio: 'Comunicación',
    'empresa-comunicacio': 'Empresa y comunicación',
    eficacia: 'Eficacia'
  },
  quizFeatures: [
    'Corrección al instante',
    'Explicación en cada pregunta',
    '20 preguntas sobre los cinco bloques'
  ],
  firstNextTitle: 'Empieza por la organización',
  firstNextText: 'Elementos, principios, departamentos y organigramas.',
  firstNextLabel: 'Ir al primer bloque',
  selfNoun: 'competencias comunicativas'
};

window.STUDY_DATA = {
  flashcards: [
    {
      id: "fc01", cat: "empresa",
      q: "¿Qué es una empresa y qué elementos la forman?",
      a: "Una organización que combina recursos humanos, materiales y financieros para producir bienes o servicios y satisfacer necesidades, asumiendo un riesgo. Sus elementos básicos son las personas, los recursos materiales y tecnológicos, el capital, la organización y el entorno."
    },
    {
      id: "fc02", cat: "empresa",
      q: "Enumera los seis principios de la organización empresarial.",
      a: "División del trabajo, especialización, autoridad, jerarquía, motivación y participación. Determinan cómo se reparten las tareas, quién decide y cómo se coordina el equipo."
    },
    {
      id: "fc03", cat: "empresa",
      q: "¿Qué diferencia hay entre organización formal e informal?",
      a: "La formal la establece la dirección: tiene reglas, funciones y canales definidos y aparece en el organigrama. La informal surge espontáneamente de las relaciones e intereses del personal; no está diseñada, pero influye en el funcionamiento real de la empresa."
    },
    {
      id: "fc04", cat: "empresa",
      q: "¿Qué criterios se usan para departamentalizar una empresa?",
      a: "Por función (producción, ventas, finanzas, recursos humanos), por producto o servicio, por zona geográfica, por proceso productivo o por tipo de cliente. La elección depende del tamaño, la actividad y los objetivos de la empresa."
    },
    {
      id: "fc05", cat: "empresa",
      q: "¿Qué es un organigrama?",
      a: "La representación gráfica de la estructura formal de la empresa. Muestra los departamentos, los niveles de jerarquía, las relaciones de autoridad y los canales de comunicación establecidos."
    },
    {
      id: "fc06", cat: "empresa",
      q: "¿Cuáles son los tipos básicos de organigrama?",
      a: "Jerárquico o lineal: cada persona tiene un solo jefe y la autoridad baja en línea recta. Funcional: la autoridad se basa en la especialización y una persona puede recibir instrucciones de varios responsables. Mixto: combina la línea jerárquica con unidades de staff que asesoran."
    },
    {
      id: "fc07", cat: "informacio",
      q: "¿Qué es un sistema de información en la empresa?",
      a: "El conjunto de personas, medios técnicos, datos y procedimientos que recogen, almacenan, procesan y distribuyen información para apoyar la toma de decisiones y la coordinación."
    },
    {
      id: "fc08", cat: "informacio",
      q: "¿Qué tres elementos básicos tiene un sistema de información?",
      a: "Usuarios (personas que necesitan la información), soportes (hardware, software, bases de datos, canales) e información (datos organizados y útiles para decidir)."
    },
    {
      id: "fc09", cat: "informacio",
      q: "¿En qué se diferencian un dato y una información?",
      a: "El dato es un registro sin interpretar: un número, una fecha o un nombre. La información es el resultado de procesar y contextualizar esos datos para que tengan significado y permitan tomar decisiones."
    },
    {
      id: "fc10", cat: "informacio",
      q: "¿Qué son las fuentes de información internas y externas?",
      a: "Las internas proceden de la propia empresa (ventas, stock, contabilidad, quejas, partes de trabajo). Las externas vienen del entorno (clientes, proveedores, competencia, administraciones, estudios de mercado, prensa, estadísticas)."
    },
    {
      id: "fc11", cat: "informacio",
      q: "¿Qué diferencia hay entre una fuente primaria y una secundaria?",
      a: "La primaria se obtiene directamente para el objetivo concreto: encuesta, entrevista, observación o registros propios. La secundaria ya ha sido recogida y publicada por otra persona u organización: informes, estadísticas, artículos o bases de datos."
    },
    {
      id: "fc12", cat: "comunicacio",
      q: "¿Qué diferencia hay entre información y comunicación?",
      a: "La información puede ser una transmisión unidireccional de datos. La comunicación implica un intercambio entre emisor y receptor, con un código y un canal compartidos, y busca una respuesta o feedback. No basta con emitir: hay que conseguir que el mensaje se entienda."
    },
    {
      id: "fc13", cat: "comunicacio",
      q: "¿Cuáles son los elementos de la comunicación?",
      a: "Emisor, receptor, mensaje, código, canal, contexto o entorno y feedback. La interferencia o ruido puede alterar cualquiera de ellos."
    },
    {
      id: "fc14", cat: "comunicacio",
      q: "Define código, canal, contexto y feedback.",
      a: "El código es el conjunto de signos y reglas que se usan para construir el mensaje. El canal es el medio por el que se transmite. El contexto es la situación que rodea el intercambio. El feedback es la respuesta del receptor que confirma o corrige la comprensión."
    },
    {
      id: "fc15", cat: "comunicacio",
      q: "Resume las etapas del proceso de comunicación.",
      a: "1) El emisor elabora la idea. 2) La codifica con un lenguaje o símbolos. 3) Elige el canal. 4) El receptor recibe y descodifica el mensaje. 5) Responde con feedback, momento en que los papeles pueden intercambiarse."
    },
    {
      id: "fc16", cat: "comunicacio",
      q: "¿Qué tipos de comunicación existen según el canal y el momento?",
      a: "Según el canal: verbal (oral o escrita) y no verbal (gestos, tono, postura, apariencia). Según el momento: directa o simultánea (conversación, videollamada) y diferida (correo, carta, informe). También puede ser individual o colectiva, e interna o externa."
    },
    {
      id: "fc17", cat: "empresa-comunicacio",
      q: "¿Qué son los flujos lineal, staff y funcional?",
      a: "El lineal sigue la cadena de mando: de jefe a subordinado. El staff es un flujo de asesoramiento y apoyo, sin autoridad directa sobre la línea. El funcional parte de especialistas que pueden dirigir asuntos de su competencia en varios departamentos."
    },
    {
      id: "fc18", cat: "empresa-comunicacio",
      q: "¿Cómo funciona la comunicación interna formal e informal?",
      a: "La formal utiliza los canales oficiales: circulares, reuniones, intranet, correo corporativo, tablones o informes. La informal aparece en conversaciones y rumores; es rápida y puede unir al equipo, pero también distorsionar la información si no se gestiona."
    },
    {
      id: "fc19", cat: "empresa-comunicacio",
      q: "¿Qué es la comunicación descendente y para qué sirve?",
      a: "Es la que va de la dirección hacia el personal. Sirve para transmitir instrucciones, objetivos, procedimientos, cambios y valoraciones del trabajo. Debe ser clara y coherente para evitar errores y desmotivación."
    },
    {
      id: "fc20", cat: "empresa-comunicacio",
      q: "¿Qué es la comunicación ascendente y para qué sirve?",
      a: "Es la que va del personal hacia la dirección. Permite recoger sugerencias, quejas y necesidades, medir el clima laboral, comprobar si las instrucciones se han entendido y favorecer la participación en las decisiones."
    },
    {
      id: "fc21", cat: "empresa-comunicacio",
      q: "¿Qué es la comunicación horizontal?",
      a: "Es la que se produce entre personas o departamentos del mismo nivel jerárquico. Facilita la coordinación de tareas, la resolución de conflictos, el trabajo en equipo y el intercambio de información sin pasar por un superior."
    },
    {
      id: "fc22", cat: "empresa-comunicacio",
      q: "¿Qué es la comunicación externa y qué instrumentos utiliza?",
      a: "Es la que la empresa dirige al exterior para dar a conocer su actividad, su imagen y sus productos. Instrumentos: publicidad, relaciones públicas, venta personal, marketing directo y promoción de ventas. Debe responder a un plan con objetivos, público, mensaje, canales, presupuesto y evaluación."
    },
    {
      id: "fc23", cat: "eficacia",
      q: "¿Qué cualidades debe tener un mensaje eficaz?",
      a: "Precisión (sin ambigüedad), claridad (lenguaje sencillo y ordenado), veracidad (información cierta y comprobable), relevancia (útil para el receptor y el objetivo) y oportunidad (en el momento adecuado)."
    },
    {
      id: "fc24", cat: "eficacia",
      q: "¿Qué es la riqueza de un canal?",
      a: "La capacidad de un canal para transmitir matices, permitir una interpretación rápida y recibir feedback inmediato. La conversación cara a cara es rica; un informe o una circular son canales más pobres. Los canales ricos se usan para mensajes complejos o delicados; los pobres, para información rutinaria y masiva."
    },
    {
      id: "fc25", cat: "eficacia",
      q: "¿Cómo puede ser la actitud del emisor?",
      a: "Hacia el receptor: declarativa, interrogativa, imperativa o exclamativa. Según la intención: informar, obtener información, influir o expresar. Hacia el contenido: enunciativa, optativa, dubitativa, de posibilidad o valorativa. La forma elegida cambia el efecto del mensaje."
    },
    {
      id: "fc26", cat: "eficacia",
      q: "¿Qué barreras pueden dificultar la comunicación?",
      a: "Ambientales o físicas (ruido, interrupciones, mala conexión), verbales o semánticas (tecnicismos, ambigüedad, idioma, no escuchar) y personales o psicológicas (perjuicios, suposiciones, emociones, desconfianza). También pueden aparecer barreras organizativas por jerarquía o sobrecarga de información."
    },
    {
      id: "fc27", cat: "eficacia",
      q: "¿Cómo se mejora la eficacia de la comunicación?",
      a: "Eligiendo el canal adecuado, usando un lenguaje claro y adaptado, escuchando de forma activa, pidiendo y dando feedback, evitando prejuicios y suposiciones, reduciendo el ruido y comprobando que el mensaje se ha entendido."
    }
  ],

  softSkills: [
    { id: "claridad", label: "Claridad", short: "Decir lo esencial sin rodeos", icon: "message" },
    { id: "escucha", label: "Escucha activa", short: "Atender sin interrumpir", icon: "users" },
    { id: "empatia", label: "Empatía", short: "Ponerse en el lugar del otro", icon: "heart" },
    { id: "feedback", label: "Feedback", short: "Confirmar y responder", icon: "rotate" },
    { id: "asertividad", label: "Asertividad", short: "Claro y respetuoso", icon: "shield" },
    { id: "lenguaje", label: "Lenguaje no verbal", short: "Coherencia entre gestos y palabras", icon: "user-check" }
  ],

  glossary: [
    { term: "Empresa", ca: "Empresa", cat: "empresa", def: "Organización que combina recursos humanos, materiales y financieros para producir bienes o servicios, satisfacer necesidades y asumir un riesgo." },
    { term: "Organización formal", ca: "Organització formal", cat: "empresa", def: "Estructura diseñada por la dirección, con funciones, normas, niveles y canales de comunicación definidos. Suele representarse en el organigrama." },
    { term: "Organización informal", ca: "Organització informal", cat: "empresa", def: "Relaciones y grupos que surgen espontáneamente entre el personal por afinidad o intereses comunes. No está diseñada oficialmente, pero influye en el clima y en la circulación de información." },
    { term: "Organigrama", ca: "Organigrama", cat: "empresa", def: "Representación gráfica de la estructura formal de la empresa: departamentos, niveles de jerarquía y relaciones de autoridad." },
    { term: "Departamentalización", ca: "Departamentalització", cat: "empresa", def: "Agrupación de personas y tareas en unidades o departamentos según criterios como la función, el producto, la zona geográfica, el proceso o el cliente." },
    { term: "Jerarquía", ca: "Jerarquia", cat: "empresa", def: "Ordenación de los niveles de autoridad de la empresa. Cada persona sabe de quién depende y a quién debe rendir cuentas." },
    { term: "Staff", ca: "Staff", cat: "empresa", def: "Unidad de asesoramiento y apoyo que ayuda a la dirección o a otros departamentos, pero no tiene autoridad directa sobre la línea jerárquica." },
    { term: "Sistema de información", ca: "Sistema d'informació", cat: "informacio", def: "Conjunto de personas, medios técnicos, datos y procedimientos que recogen, almacenan, procesan y distribuyen información para apoyar las decisiones." },
    { term: "Dato", ca: "Dada", cat: "informacio", def: "Registro elemental sin interpretar: un número, una fecha, un nombre o un hecho aislado." },
    { term: "Información", ca: "Informació", cat: "informacio", def: "Datos procesados y contextualizados que tienen significado y resultan útiles para comprender una situación o tomar una decisión." },
    { term: "Fuente primaria", ca: "Font primària", cat: "informacio", def: "Fuente que se obtiene directamente para el objetivo de la investigación: encuesta, entrevista, observación o registros propios de la empresa." },
    { term: "Fuente secundaria", ca: "Font secundària", cat: "informacio", def: "Fuente que ya ha sido recogida y publicada por otra persona u organización: informes, estadísticas, artículos, bases de datos o estudios del sector." },
    { term: "Comunicación", ca: "Comunicació", cat: "comunicacio", def: "Proceso de intercambio de mensajes entre un emisor y un receptor mediante un código y un canal, con la finalidad de que el significado se comparta. Incluye feedback." },
    { term: "Feedback", ca: "Retroalimentació", cat: "comunicacio", def: "Respuesta del receptor que permite al emisor saber si el mensaje se ha recibido y comprendido, y corregir o ajustar la comunicación." },
    { term: "Código", ca: "Codi", cat: "comunicacio", def: "Conjunto de signos y reglas que comparten emisor y receptor para construir e interpretar el mensaje (lengua, señales, símbolos, gestos)." },
    { term: "Canal", ca: "Canal", cat: "comunicacio", def: "Medio físico o digital por el que circula el mensaje: voz, papel, teléfono, correo electrónico, videollamada, intranet o redes sociales." },
    { term: "Interferencia", ca: "Interferència", cat: "comunicacio", def: "Cualquier elemento que dificulta o distorsiona la transmisión o la comprensión del mensaje: ruido, ambigüedad, emociones, prejuicios o fallos técnicos." },
    { term: "Comunicación no verbal", ca: "Comunicació no verbal", cat: "comunicacio", def: "Parte del mensaje que se transmite mediante gestos, postura, mirada, tono, silencios, distancia y apariencia. Puede reforzar o contradecir las palabras." },
    { term: "Comunicación interna", ca: "Comunicació interna", cat: "empresa-comunicacio", def: "Comunicación que circula dentro de la empresa para coordinar el trabajo, transmitir instrucciones, recoger opiniones y mantener un clima adecuado." },
    { term: "Comunicación externa", ca: "Comunicació externa", cat: "empresa-comunicacio", def: "Comunicación dirigida al exterior: clientes, proveedores, administraciones, medios y sociedad. Busca informar, proyectar imagen y atraer o fidelizar públicos." },
    { term: "Comunicación descendente", ca: "Comunicació descendent", cat: "empresa-comunicacio", def: "Comunicación que va de un nivel superior a uno inferior. Transmite órdenes, objetivos, procedimientos, cambios y valoraciones del trabajo." },
    { term: "Comunicación ascendente", ca: "Comunicació ascendent", cat: "empresa-comunicacio", def: "Comunicación que va del personal hacia la dirección. Canaliza sugerencias, quejas, necesidades y datos sobre el clima o el cumplimiento de las instrucciones." },
    { term: "Comunicación horizontal", ca: "Comunicació horitzontal", cat: "empresa-comunicacio", def: "Comunicación entre personas o departamentos del mismo nivel jerárquico para coordinar tareas, resolver problemas y trabajar en equipo." },
    { term: "Riqueza de canal", ca: "Riquesa de canal", cat: "eficacia", def: "Capacidad de un canal para transmitir matices, permitir una interpretación inmediata y recibir feedback rápido. Los canales ricos se usan para mensajes complejos o delicados." },
    { term: "Barrera de comunicación", ca: "Barrera de comunicació", cat: "eficacia", def: "Obstáculo que impide o dificulta que el mensaje llegue y se comprenda. Puede ser ambiental, verbal, personal u organizativa." },
    { term: "Comunicación asertiva", ca: "Comunicació assertiva", cat: "eficacia", def: "Forma de comunicarse que expresa ideas, necesidades y límites de manera clara, directa y respetuosa, sin imponerse ni renunciar a los propios derechos." },
    { term: "Oportunidad", ca: "Oportunitat", cat: "eficacia", def: "Cualidad del mensaje que consiste en comunicarlo en el momento adecuado, cuando el receptor puede atenderlo y utilizarlo." }
  ],

  fakes: [
    {
      id: "fk01",
      text: "En una organización formal, las funciones y los canales de comunicación surgen de forma espontánea entre el personal.",
      answer: false,
      explain: "Es la organización informal la que surge espontáneamente. La formal la diseña la dirección y establece funciones, normas, niveles y canales oficiales."
    },
    {
      id: "fk02",
      text: "En un organigrama funcional cada trabajador recibe instrucciones de un único jefe.",
      answer: false,
      explain: "Eso ocurre en el organigrama jerárquico o lineal. En el funcional, la autoridad se basa en la especialización y una persona puede recibir indicaciones de varios responsables funcionales."
    },
    {
      id: "fk03",
      text: "Información y comunicación son exactamente lo mismo: en ambas basta con que el emisor transmita un mensaje.",
      answer: false,
      explain: "La información puede ser unidireccional. La comunicación implica intercambio, comprensión y feedback; no termina cuando se envía el mensaje."
    },
    {
      id: "fk04",
      text: "La comunicación ascendente permite que la dirección conozca sugerencias, quejas y el clima laboral.",
      answer: true,
      explain: "Correcto. La comunicación ascendente va del personal hacia la dirección y es clave para recoger información, participar y detectar problemas."
    },
    {
      id: "fk05",
      text: "Un canal rico, como la conversación cara a cara, es siempre la mejor opción para cualquier mensaje.",
      answer: false,
      explain: "No siempre. Los canales ricos son mejores para mensajes complejos, delicados o que necesitan feedback inmediato. Para información rutinaria y masiva puede ser más eficiente un canal escrito y pobre."
    }
  ],

  quiz: [
    {
      id: "q01",
      q: "¿Cuál de estas opciones NO es un principio de la organización empresarial?",
      options: ["División del trabajo", "Especialización", "Improvisación", "Jerarquía"],
      correct: 2,
      explain: "Los seis principios son división del trabajo, especialización, autoridad, jerarquía, motivación y participación. La improvisación no es un principio organizativo."
    },
    {
      id: "q02",
      q: "¿Qué tipo de organización establece la dirección de forma consciente y suele aparecer en el organigrama?",
      options: ["La organización formal", "La organización informal", "La organización espontánea", "La organización sindical"],
      correct: 0,
      explain: "La organización formal es la diseñada por la dirección: define funciones, niveles, normas y canales. La informal surge de las relaciones espontáneas."
    },
    {
      id: "q03",
      q: "¿Cuál es la función principal de una unidad de staff?",
      options: ["Dar órdenes directas a toda la plantilla", "Asesorar y apoyar sin mando directo sobre la línea", "Sustituir al departamento de producción", "Controlar únicamente las finanzas"],
      correct: 1,
      explain: "El staff asesora a la dirección o a otros departamentos. No tiene autoridad jerárquica directa sobre los subordinados de la línea."
    },
    {
      id: "q04",
      q: "En una organización funcional, una persona puede…",
      options: ["Tener siempre un único jefe", "No recibir instrucciones de nadie", "Recibir indicaciones de varios responsables especializados", "Cambiar de empresa sin contrato"],
      correct: 2,
      explain: "La organización funcional se basa en la especialización: distintos responsables pueden dar instrucciones en su ámbito. Esto aporta conocimiento técnico, pero exige coordinar bien para evitar órdenes contradictorias."
    },
    {
      id: "q05",
      q: "Agrupar departamentos según los distintos productos o servicios que ofrece la empresa es un criterio de departamentalización…",
      options: ["Por función", "Por producto", "Por zona geográfica", "Por proceso"],
      correct: 1,
      explain: "La departamentalización por producto crea unidades para cada producto o servicio. La funcional se organiza por actividades (ventas, producción, finanzas)."
    },
    {
      id: "q06",
      q: "¿Para qué sirve un organigrama?",
      options: ["Para representar la estructura, la jerarquía y los departamentos", "Para calcular el salario de cada persona", "Para sustituir el plan de comunicación externa", "Para registrar las ventas diarias"],
      correct: 0,
      explain: "El organigrama es una representación gráfica de la estructura formal: muestra departamentos, niveles y relaciones de autoridad."
    },
    {
      id: "q07",
      q: "¿Qué tres elementos básicos forman un sistema de información?",
      options: ["Clientes, proveedores y competencia", "Objetivos, estrategias y presupuesto", "Usuarios, soportes e información", "Emisor, canal y feedback"],
      correct: 2,
      explain: "Un sistema de información combina usuarios (quienes necesitan la información), soportes (medios técnicos y procedimientos) e información (datos útiles y organizados)."
    },
    {
      id: "q08",
      q: "La información se diferencia del dato en que…",
      options: ["Es siempre numérica", "Es un dato procesado y contextualizado que permite decidir", "No necesita ningún soporte", "Procede únicamente de internet"],
      correct: 1,
      explain: "El dato es un registro sin interpretar. Al procesarlo y darle contexto se convierte en información útil para comprender y decidir."
    },
    {
      id: "q09",
      q: "¿Cuál de estas fuentes de información es interna?",
      options: ["El registro de ventas de la propia empresa", "Un informe publicado por el INE", "Una noticia sobre el sector", "Un estudio de mercado de un competidor"],
      correct: 0,
      explain: "Las fuentes internas proceden de la propia empresa: ventas, stock, contabilidad, quejas o partes de trabajo. Las demás son externas."
    },
    {
      id: "q10",
      q: "Un informe estadístico ya publicado por una administración es una fuente…",
      options: ["Primaria interna", "Primaria externa", "Secundaria", "Informal"],
      correct: 2,
      explain: "Es secundaria porque los datos ya han sido recogidos y publicados por otra organización. Las fuentes primarias se obtienen directamente para el objetivo concreto."
    },
    {
      id: "q11",
      q: "¿Qué diferencia básica hay entre información y comunicación?",
      options: ["La comunicación solo utiliza el lenguaje escrito", "La comunicación es bidireccional e incluye feedback", "La información siempre exige una respuesta inmediata", "No hay ninguna diferencia práctica"],
      correct: 1,
      explain: "La comunicación busca compartir significado mediante un intercambio. El feedback permite comprobar que el mensaje se ha entendido; la información puede ser una simple transmisión."
    },
    {
      id: "q12",
      q: "¿Qué elemento de la comunicación permite comprobar que el mensaje se ha entendido?",
      options: ["El código", "El contexto", "El canal", "El feedback"],
      correct: 3,
      explain: "El feedback es la respuesta del receptor. Gracias a él el emisor sabe si el mensaje se recibió, se interpretó correctamente y si debe ajustar algo."
    },
    {
      id: "q13",
      q: "El código de un mensaje es…",
      options: ["El conjunto de signos y reglas compartidos para construir el mensaje", "El medio físico por el que viaja el mensaje", "La persona que recibe la información", "El ruido que dificulta la comunicación"],
      correct: 0,
      explain: "El código es el sistema de signos y reglas (lengua, símbolos, gestos) que emisor y receptor comparten. Sin código común no hay comprensión."
    },
    {
      id: "q14",
      q: "El canal de comunicación es…",
      options: ["La respuesta del receptor", "El medio por el que se transmite el mensaje", "El conjunto de normas de la empresa", "La idea que quiere transmitir el emisor"],
      correct: 1,
      explain: "El canal es el soporte por el que circula el mensaje: voz, papel, teléfono, correo, videollamada, intranet, etc. Debe elegirse según el mensaje y el receptor."
    },
    {
      id: "q15",
      q: "La comunicación directa o simultánea se caracteriza por…",
      options: ["No permitir la respuesta del receptor", "Necesitar siempre un documento escrito", "Permitir feedback inmediato en un mismo contexto", "Dirigirse únicamente a grandes audiencias"],
      correct: 2,
      explain: "En la comunicación directa emisor y receptor comparten el momento: conversación, reunión o videollamada. Esto facilita el feedback y la adaptación del mensaje."
    },
    {
      id: "q16",
      q: "El flujo de comunicación lineal sigue…",
      options: ["La cadena de mando, de jefe a subordinado", "Solo los rumores del pasillo", "Las relaciones entre departamentos del mismo nivel", "Los mensajes publicitarios"],
      correct: 0,
      explain: "El flujo lineal o jerárquico respeta la cadena de mando: la información y las instrucciones bajan de un nivel superior a uno inferior."
    },
    {
      id: "q17",
      q: "Una sugerencia que un empleado envía a la dirección es un ejemplo de comunicación…",
      options: ["Descendente", "Ascendente", "Externa", "No verbal"],
      correct: 1,
      explain: "La comunicación ascendente va del personal hacia la dirección. Sirve para recoger sugerencias, quejas y datos sobre el clima o el trabajo."
    },
    {
      id: "q18",
      q: "La comunicación informal en la empresa…",
      options: ["Está definida en el organigrama", "Solo puede ser escrita", "Es siempre perjudicial y debe prohibirse", "Surge espontáneamente y puede ser rápida, aunque también distorsionarse"],
      correct: 3,
      explain: "La comunicación informal nace de las relaciones personales. Puede agilizar la coordinación y crear vínculos, pero también generar rumores o información poco fiable."
    },
    {
      id: "q19",
      q: "¿Cuál es un objetivo típico de la comunicación externa?",
      options: ["Repartir las tareas entre departamentos", "Registrar las horas de trabajo", "Proyectar una imagen positiva y atraer o fidelizar públicos", "Sustituir la comunicación interna"],
      correct: 2,
      explain: "La comunicación externa se dirige a clientes, proveedores, medios y sociedad. Busca informar, construir imagen, atraer clientes y fidelizarlos."
    },
    {
      id: "q20",
      q: "Para comunicar un cambio complejo y delicado a un compañero, el canal más adecuado suele ser…",
      options: ["Una nota anónima en el tablón", "Una conversación cara a cara", "Un mensaje masivo sin posibilidad de respuesta", "Un informe técnico lleno de siglas"],
      correct: 1,
      explain: "Los mensajes complejos o delicados requieren un canal rico, como la conversación cara a cara: permite matices, lenguaje no verbal y feedback inmediato."
    }
  ]
};
