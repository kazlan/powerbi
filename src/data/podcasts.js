export const podcasts = [
    {
        id: "dax-narracion-datos",
        title: "DAX y Narración de Datos",
        date: "2026-01-12",
        duration: "15:30",
        description: "Exploramos cómo el lenguaje DAX no es solo para cálculos, sino el motor fundamental para contar historias de datos convincentes en Power BI.",
        thumbnail: "/podcasts/podcast_cover_dax.png",
        audioSrc: "/podcasts/Power_BI_DAX_y_narración_de_datos.m4a",
        tags: ["DAX", "Storytelling", "Visualización", "Buenas Prácticas"],
        youtubeId: "eZALdjOBcrI",
        links: [
            { title: "Documentación Oficial DAX", url: "https://learn.microsoft.com/es-es/dax/" },
            { title: "Guía de Storytelling con Datos", url: "https://community.powerbi.com/t5/Community-Blog/Data-Storytelling-with-Power-BI/ba-p/682245" }
        ],
        content: [
            { type: "paragraph", text: "Hoy nos vamos a sumergir en un conjunto de fuentes que cuentan una historia fascinante sobre una herramienta que ha cambiado las reglas del juego: Power BI. No es solo una herramienta, es un ecosistema completo." },
            { type: "paragraph", text: "Tenemos desde Power BI Desktop, el taller donde creas; el Service, que es la galería de arte en la nube; y las apps móviles. Pero la clave de su liderazgo no es solo su potencia, sino que se construyó sobre la base que millones ya conocían: Excel." },

            { type: "quote", text: "DAX son las fórmulas de Excel con superpoderes. Te centras en la pregunta de negocio, no en la acrobacia técnica." },

            { type: "paragraph", text: "El motor real es DAX (Data Analysis Expressions). Sirve para crear columnas calculadas y medidas. Una medida en DAX puede reemplazar horas de BuscarV y tablas dinámicas complejas con una sola línea de código elegante: CALCULATE(SUM(Ventas), SAMEPERIODLASTYEAR(Fecha))." },

            { type: "image", src: "/podcasts/dax-narracion-infographic.png", alt: "Ecosistema Power BI", caption: "De la preparación de datos a la narración visual." },

            { type: "paragraph", text: "También hay decisiones arquitectónicas clave: ¿Importación o Direct Query? Importación te da velocidad instantánea al comprimir los datos en memoria. Direct Query te da datos en tiempo real pero depende de tu servidor. Y el modo compuesto te permite lo mejor de los dos mundos." },
            { type: "paragraph", text: "Para escalar, la clave son los modelos compartidos. Una 'despensa centralizada' de datos limpios y validados. Esto habilita la seguridad a nivel de fila (RLS) para que cada usuario vea solo lo que debe ver." },

            { type: "quote", text: "La tecnología es el vehículo, pero la narración es el conductor. Puedes tener el modelo perfecto, pero si no comunica, no sirve." },

            { type: "paragraph", text: "El paso final es el Storytelling. Estructura tus informes como un periódico: Titulares (KPIs) arriba, tendencias en medio, y detalle abajo. Porque al final, el objetivo no es solo mostrar números, sino facilitar decisiones." }
        ]
    },
    {
        id: "power-query-limpieza",
        title: "Power Query: Limpieza y Transformación",
        date: "2026-01-19",
        duration: "18:45",
        description: "Descubre los secretos de Power Query para transformar datos desordenados en modelos limpios y eficientes. Aprende sobre 'M' y optimización de consultas.",
        thumbnail: "/podcasts/podcast_cover_pq.png",
        audioSrc: "/podcasts/Power_Query_La_alquimia_real_de_los_datos.m4a",
        tags: ["Power Query", "ETL", "Lenguaje M", "Modelado"],
        youtubeId: "VROcUBYbJ_o",
        highlights: [
            "Power Query es tu taller de limpieza digital. Antes de cocinar el dato (DAX), tienes que lavarlo y pelarlo aquí.",
            "El lenguaje M no es para tenerle miedo, es una secuencia lógica de pasos. Piensa en él como una receta de cocina paso a paso.",
            "La regla de oro: Filtra filas y quita columnas LO ANTES POSIBLE. Tu modelo de memoria te lo agradecerá.",
            "Nunca, jamás, cargues datos 'sucios' en el modelo. Power Query es el portero de discoteca que solo deja pasar a la gente guapa (datos limpios)."
        ],
        links: [
            { title: "Documentación de Power Query", url: "https://learn.microsoft.com/es-es/power-query/" },
            { title: "Mejores Prácticas de Transformación", url: "https://learn.microsoft.com/es-es/power-bi/guidance/power-query-background-refresh" }
        ],
        content: [
            { type: "paragraph", text: "Para cualquiera que trabaje con datos, hay una verdad incómoda: nos pasamos el 80% del tiempo limpiando y preparando, y solo el 20% visualizando. Power Query es el taller donde ocurre esa alquimia real, convirtiendo el caos en información lista para usar." },
            { type: "paragraph", text: "La clave mágica aquí es la repetibilidad. Power Query graba cada paso (limpiar, juntar, corregir) como una receta. La próxima vez que lleguen datos nuevos, la receta se aplica sola. Eso garantiza consistencia, el pilar de cualquier análisis serio." },

            { type: "image", src: "/podcasts/power-query-infographic.png", alt: "Flujo de Power Query", caption: "Transformando datos brutos en modelos analíticos listos." },

            { type: "paragraph", text: "Hay un concepto que separa a los principiantes de los expertos: las 'Staging Queries' o consultas de preparación. Es como la 'mise en place' en la cocina. Primero traes los datos en bruto a una consulta base (sin cargarla al modelo) y luego referencias esa consulta para tus transformaciones. Si cambia la fuente, solo cambias la conexión en un sitio y todo se arregla." },

            { type: "quote", text: "Power Query es el portero de discoteca que solo deja pasar a la gente guapa (datos limpios). Nunca cargues datos sucios al modelo." },

            { type: "paragraph", text: "Hablamos también de combinar datos. 'Table.Combine' para apilar archivos mensuales (como ventas 2021, 2022, 2023) en una tabla maestra. Y los Joins para enriquecer datos, como añadir nombres de productos a una tabla de ventas. Elegir entre NestedJoin y Table.Join puede ser la diferencia entre una actualización de 5 minutos o de 50." },
            { type: "paragraph", text: "Y finalmente, los Parámetros. Son la llave para hacer reportes dinámicos. Puedes parametrizar la ruta de una carpeta o un rango de fechas, permitiendo que el usuario final decida qué quiere ver sin tocar el código. Power Query saca la preparación de datos de la edad de piedra manual y la lleva a la automatización." }
        ]
    },
    {
        id: "dax-contextos",
        title: "DAX: Contextos de Fila y Filtro",
        date: "2026-01-26",
        duration: "24:10",
        description: "Dominar los contextos es el verdadero superpoder en DAX. Desglosamos la diferencia entre contexto de fila y de filtro, y cómo la función CALCULATE altera la realidad de tus datos.",
        thumbnail: "/podcasts/podcast_cover_context.png",
        audioSrc: "/podcasts/DAX_Contexto_de_Fila_y_Filtro_Desvelados.m4a",
        tags: ["DAX", "Contexto de Fila", "CALCULATE", "Avanzado"],
        youtubeId: "xPUU-jOLhO0",
        highlights: [
            "Si el contexto de fila era un microscopio mirando una célula, el contexto de filtro es el conjunto de lentes que definen qué parte del tejido estamos viendo.",
            "El contexto no es una sugerencia, es la ley. Es el conjunto de reglas que Power BI usa para saber exactamente qué datos tiene que mirar.",
            "CALCULATE es el director de orquesta del contexto de filtro. Puede decirle a los violines que se callen y a los trombones que toquen más fuerte.",
            "El contexto de fila es el más intuitivo: piensa en ello como si Power BI estuviera trabajando en un Excel, aplicando una fórmula fila a fila.",
            "El contexto de filtro es superdinámico: viene de los gráficos, de los clics, y se propaga por las relaciones del modelo como si fueran autopistas.",
            "La diferencia entre un usuario básico y un experto es la capacidad de manipular el contexto. Usar funciones como CALCULATE permite saltarse las reglas naturales."
        ],
        links: [
            { title: "Comprendiendo los Contextos", url: "https://learn.microsoft.com/es-es/dax/dax-overview#context" },
            { title: "Guía Definitiva de CALCULATE", url: "https://www.sqlbi.com/articles/introducing-calculate-in-dax/" }
        ],
        content: [
            { type: "paragraph", text: "Muchos ven Power BI como una herramienta para hacer gráficos bonitos, pero la verdadera magia está en el motor DAX y en entender su piedra angular: El Contexto." },
            { type: "paragraph", text: "Sin entender el contexto, escribir DAX es como dar órdenes a una caja negra. El contexto es el conjunto de reglas que Power BI usa para saber qué datos mirar para un cálculo. Es la ley." },

            { type: "image", src: "/podcasts/dax-contextos-infographic.png", alt: "Contextos en DAX", caption: "Diferencia visual entre contexto de fila y contexto de filtro." },

            { type: "paragraph", text: "Tenemos dos pilares: El Contexto de Fila y el Contexto de Filtro." },
            { type: "paragraph", text: "El **Contexto de Fila** es el más intuitivo, piensa en Excel trabajando fila por fila. Es el mundo de las Columnas Calculadas. El valor se calcula fila a fila y se guarda. Pero cuidado: en las Medidas no existe contexto de fila automático a menos que uses iteradores como SUMX." },

            { type: "quote", text: "Si el contexto de fila es un microscopio mirando una célula, el contexto de filtro es el conjunto de lentes que definen qué parte del tejido estamos viendo." },

            { type: "paragraph", text: "El **Contexto de Filtro** es superdinámico. Viene de los gráficos, de los slicers, y se propaga a través de las relaciones del modelo. Es un sistema de capas. Si seleccionas 'Europa' y '2023', esos son los filtros que definen el universo de datos para ese cálculo." },
            { type: "paragraph", text: "Y aquí entra el superpoder: **CALCULATE**. Es el director de orquesta. Es la única función que puede modificar el contexto de filtro sobre la marcha. Puedes decirle: 'Calcula las ventas, pero ignora el filtro de país y ponme siempre el total global'. Dominar cómo interactúan estos contextos es lo que te permite pasar de pintar con datos a dialogar con ellos." }
        ]
    },
    {
        id: "copilot-capacidad-requisitos",
        title: "Capacidad y Requisitos para Desplegar Copilot en Power BI",
        date: "2026-01-28",
        duration: "14:48",
        description: "Copilot es increíble, pero activarlo no es tan simple. Desglosamos los requisitos técnicos, capacidades Fabric (F64), y licencias para que no te quedes fuera de la revolución IA.",
        thumbnail: "/podcasts/copilot-capacidad-requisitos_cover.png",
        audioSrc: "/podcasts/copilot-capacidad-requisitos.m4a",
        tags: ["Copilot", "Power BI", "Microsoft Fabric", "Capacidad F64", "Requisitos"],
        youtubeId: "kkV-PoClwxU",
        highlights: [
            "El requisito fundamental no son las licencias de usuario, sino la capacidad computacional (F64/P1).",
            "Copilot no es una simple actualización, es pasar de construir informes a diseñar conocimiento.",
            "Barreras geográficas: Si tu capacidad está en una región sin OpenAI, necesitas activar 'cross-geo'.",
            "Gobernanza: Puedes activar Copilot solo para grupos de seguridad específicos."
        ],
        links: [
            { title: "Documentación Copilot en Power BI", url: "https://learn.microsoft.com/es-es/power-bi/create-reports/copilot-introduction" },
            { title: "Capacidades de Fabric", url: "https://learn.microsoft.com/es-es/fabric/enterprise/licenses" }
        ],
        content: [
            { type: "paragraph", text: "Hoy nos metemos de lleno en un tema que, la verdad, está generando muchísimo revuelo. Hablamos de la llegada de Copilot a Power BI, y lo que tenemos delante no es una simple actualización, parece más bien el despertar de una nueva era en el análisis de datos." },
            { type: "paragraph", text: "Nuestra misión hoy es entender los cimientos, o sea, qué hace falta de verdad para activar esta tecnología. Porque la promesa es enorme." },

            { type: "quote", text: "Es pasar de construir informes a diseñar conocimiento. Esa es la frase clave: diseñar conocimiento." },

            { type: "paragraph", text: "Y claro, esto nos lleva a la pregunta que creo que todos se hacen: ¿estamos listos para un cambio así? Es la pregunta fundamental, porque a menudo nos quedamos en la superficie, en qué hace la herramienta, pero el impacto de verdad está en el cómo cambia nuestra forma de trabajar." },
            { type: "paragraph", text: "Copilot promete transformar por completo el flujo de análisis. La conversación ya no va sobre qué gráfico usar o si arrastro este campo aquí o allá. Se da un paso más allá. El objetivo es obtener respuestas rápidas, relevantes, directamente de los datos." },

            { type: "image", src: "/podcasts/copilot-f64-infographic.png", alt: "Desbloqueando el Potencial con F64", caption: "La capacidad F64 es la llave maestra para la distribución ilimitada." },

            { type: "paragraph", text: "El requisito fundamental no son las licencias de usuario, sino la capacidad computacional de la organización. La habilitación de Copilot no depende de si un usuario tiene una licencia Pro o Premium por usuario. Necesita recursos dedicados, principalmente GPUs gestionadas a través de Azure OpenAI." },
            { type: "paragraph", text: "El punto de partida es una capacidad Fabric F2, pero el verdadero potencial se desbloquea con una capacidad F64 o superior." },

            { type: "quote", text: "Con una F64, no solo potencias a tu equipo de analistas, abres la puerta a que toda la organización consuma los análisis más avanzados sin licencias de pago individuales." },

            { type: "paragraph", text: "También hay que considerar las barreras geográficas. Si tu capacidad está en una región sin OpenAI, necesitas activar el interruptor de 'cross-geo' para permitir el procesamiento de datos fuera de tu región geográfica." },

            { type: "image", src: "/podcasts/copilot-action-infographic.png", alt: "Copilot en Acción", caption: "De comandos en lenguaje natural a insights visuales instantáneos." },

            { type: "paragraph", text: "Finalmente, está el tema de la gobernanza. No es un todo o nada. Puedes habilitarlo solo para grupos de seguridad específicos, permitiendo un despliegue controlado y por fases. E incluso delegar la activación a departamentos específicos como marketing o finanzas." },
            { type: "paragraph", text: "El reto final es cultural. Preparar a las personas para dialogar con los datos y formular las preguntas correctas. ¿Qué sucede cuando cualquier persona puede obtener respuestas visuales al instante? Ese es el verdadero cambio." }
        ]
    }
];
