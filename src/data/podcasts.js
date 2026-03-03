export const podcasts = [
    {
        "id": "de-0-a-hero",
        "title": "De 0 A Hero",
        "date": "2026-03-03",
        "duration": "15:00",
        "description": "Podcast episode.",
        "thumbnail": "/podcasts/de-0-a-hero_cover.png",
        "audioSrc": "/podcasts/de-0-a-hero.m4a",
        "tags": [],
        "youtubeId": "yNVjnpiy4Jw",
        "highlights": [
            "Podcast episode."
        ],
        "links": [],
        "content": [
            {
                "type": "paragraph",
                "text": "Bienvenidos a este análisis a fondo. Hoy nos adentramos en un tema que está transformando por completo el mundo del análisis de datos: Copilot integrado en Power BI. Cuando lo ves en acción por primera vez, generando gráficos y código DAX en segundos, parece magia. Sin embargo, la cruda realidad es que esta IA puede cometer errores y llevarnos por el camino equivocado. Asumir que es un oráculo infalible es el primer gran error."
            },
            {
                "type": "paragraph",
                "text": "Nuestra misión hoy es comprender cómo evoluciona el rol del analista. La idea de ser un simple 'creador' que empieza con un lienzo en blanco está quedando atrás. El nuevo perfil indispensable es el de un 'editor experto'. La verdadera maestría ahora reside en saber guiar a la máquina, dándole instrucciones precisas y supervisando estratégicamente los resultados."
            },
            {
                "type": "paragraph",
                "text": "Para entender este cambio, hay que saber que los resultados de Copilot son no deterministas y probabilísticos. A diferencia de la programación clásica, donde una fórmula siempre da el mismo resultado, la IA puede generar respuestas ligeramente distintas dependiendo del contexto. Esto significa que el caos puede ser monumental si no hay una auditoría constante. El trabajo técnico pesado se traslada a la IA, pero la 'responsabilidad de la veracidad' sigue siendo humana."
            },
            {
                "type": "paragraph",
                "text": "Pensemos en el analista tradicional como un músico que grababa cada instrumento pista por pista. El editor experto, en cambio, es quien dirige una orquesta sinfónica. La orquesta (la IA) tiene un virtuosismo técnico increíble, pero no tiene visión de conjunto. Quien dirige es el responsable último de que la sinfonía tenga sentido."
            },
            {
                "type": "paragraph",
                "text": "Para dirigir esta orquesta, debemos conocer sus limitaciones. Primero, los límites analíticos: Copilot no tiene consciencia de negocio. No puede generar deducciones causales de la nada; te dirá que las ventas bajaron, pero no el porqué. No adivina el comportamiento del mercado."
            },
            {
                "type": "paragraph",
                "text": "Segundo, las barreras técnicas. La IA generativa requiere una potencia de cálculo gigantesca, como la capacidad Fabric F64. Esto no funciona en entornos gratuitos; requiere el 'motor de un tren de mercancías' en la nube."
            },
            {
                "type": "paragraph",
                "text": "Tercero, los límites de volumen. La función de resumen narrativo, por ejemplo, solo opera correctamente si el gráfico tiene menos de 30.000 filas. Peor aún, en matrices cruzadas, el límite es de apenas 500 filas. Si se supera, la IA se desborda, ignora el gráfico y genera respuestas generalizadas sobre toda la base de datos, lo que resulta en alucinaciones peligrosas."
            },
            {
                "type": "paragraph",
                "text": "Además, hay un reloj de arena: en diciembre de 2026, la antigua función de Q&A de Power BI se retirará para siempre. Si los equipos no actualizan o adaptan sus modelos a la nueva arquitectura generativa, los reportes antiguos quedarán inservibles."
            },
            {
                "type": "paragraph",
                "text": "La pregunta es: ¿cómo preparamos los datos para no estrellarnos? Hay tres pilares vitales para preparar los datos para la IA. El primero es 'simplificar el esquema'. Hay que ocultar los engranajes internos (claves subrogadas, tablas puente) y usar un modelo de Estrella ordenado. El segundo pilar es la 'redacción explícita de instrucciones de IA'. Hay que dejar por escrito las reglas de negocio, como la definición exacta de un 'cliente VIP', para eliminar ambigüedades. El tercer pilar son las 'respuestas verificadas', escudos para métricas críticas (como finanzas) donde el margen de error debe ser cero, forzando a la IA a devolver un gráfico preaprobado."
            },
            {
                "type": "paragraph",
                "text": "El arte de interactuar con la IA reposa en el 'prompting'. Un prompt vago genera pánico probabilístico; la especificidad lo es todo. Hay que usar términos exactos y configurar 'sinónimos' en el modelo de datos para que la herramienta entienda la jerga real de la empresa."
            },
            {
                "type": "paragraph",
                "text": "A la hora de programar, la experiencia se transforma con el atajo Ctrl+I en la vista de consultas. Copilot te asiste generando código DAX y te lo presenta en una 'vista de diferencias' (diff view), obligándote a auditar, aceptar o rechazar los cambios."
            },
            {
                "type": "paragraph",
                "text": "En conclusión, para alcanzar el nivel de 'Hero' en el análisis, debemos abrazar el rol de editor experto: auditar exhaustivamente el código, crear prompts precisos, gobernar los datos y simplificar los modelos. La paradoja de esta revolución es que, al democratizar los datos y hacerlos accesibles a perfiles menos técnicos, la gobernanza centralizada y la limpieza extrema de los modelos se vuelven más vitales que nunca en la historia de la informática."
            },
            {
                "type": "image",
                "src": "/podcasts/de-0-a-hero_info_1.png",
                "alt": "Infographic 1",
                "caption": "Key Concept Visualization"
            },
            {
                "type": "image",
                "src": "/podcasts/de-0-a-hero_info_2.png",
                "alt": "Infographic 2",
                "caption": "Deep Dive Visualization"
            }
        ]
    }
    ,
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
    },
    {
        id: "el-susurrador-de-codigo",
        title: "Copilot y la Revolución del DAX",
        date: "2026-02-02",
        duration: "25:00",
        description: "El rol del analista está cambiando. De escribir fórmulas a diseñar semántica. Exploramos cómo Copilot en Power BI revoluciona la escritura de DAX. No es magia, es arquitectura.",
        thumbnail: "/podcasts/el-susurrador-de-codigo/youtube_thumb.png",
        audioSrc: "/podcasts/el-susurrador-de-codigo/El Susurrador de Código.m4a",
        tags: ["Copilot", "DAX", "AI", "Semantic Model"],
        youtubeId: "rbLcMWS3YLg",
        highlights: [
            "El fin del síndrome de la página en blanco.",
            "Cómo funciona realmente la conversión de Texto a DAX.",
            "La importancia crítica del Modelo Semántico.",
            "DAX Query View como entorno de prototipado rápido.",
            "El nuevo rol del analista: de Coder a Arquitecto Semántico."
        ],
        links: [
            { title: "Documentación Oficial Copilot", url: "https://learn.microsoft.com/en-us/power-bi/create-reports/copilot-introduction" }
        ],
        content: [
            { type: "paragraph", text: "El síndrome de la página en blanco. Sabes qué calcular, pero el cursor parpadea mientras luchas con la sintaxis DAX y los contextos." },
            { type: "image", src: "/podcasts/el-susurrador-de-codigo/slides/slide_01.png", alt: "Blank Page Syndrome", caption: "The blank page syndrome in DAX development." },

            { type: "paragraph", text: "Copilot actúa como un 'susurrador de código', traduciendo tu intención en lenguaje natural a fórmulas DAX precisas." },
            { type: "image", src: "/podcasts/el-susurrador-de-codigo/slides/slide_02.png", alt: "Voice to Code", caption: "Copilot translates natural language intent into code." },

            { type: "paragraph", text: "DAX es difícil porque no son solo fórmulas; es lógica invisible. Contexto de Fila y Contexto de Filtro." },
            { type: "image", src: "/podcasts/el-susurrador-de-codigo/slides/slide_03.png", alt: "DAX Contexts", caption: "DAX complexity lies in invisible contexts (Row vs Filter)." },

            { type: "paragraph", text: "Copilot entiende prácticas de negocio. Pides 'crecimiento interanual' y sabe usar CALCULATE y SAMEPERIODLASTYEAR." },
            { type: "image", src: "/podcasts/el-susurrador-de-codigo/slides/slide_04.png", alt: "Best Practices", caption: "Copilot applies best practices automatically." },

            { type: "paragraph", text: "Velocidad de curiosidad = Velocidad de negocio. Marketing pregunta, el analista responde en minutos, no semanas." },
            { type: "image", src: "/podcasts/el-susurrador-de-codigo/slides/slide_05.png", alt: "Speed of Business", caption: "Accelerating business answers." },

            { type: "paragraph", text: "DAX Query View (Ctrl+I). No es una caja negra, es un diálogo interactivo donde pruebas antes de guardar." },
            { type: "image", src: "/podcasts/el-susurrador-de-codigo/slides/slide_06.png", alt: "Interactive Dialogue", caption: "Interactive dialogue in DAX Query View." },

            { type: "paragraph", text: "Valor educativo: 'Explícame este código'. Copilot desglosa medidas heredadas y cripticas para que las entiendas." },
            { type: "image", src: "/podcasts/el-susurrador-de-codigo/slides/slide_07.png", alt: "Code Explanation", caption: "Copilot as a teacher and debugger." },

            { type: "paragraph", text: "Pero cuidado: Basura entra, basura sale. La calidad de la respuesta depende de tu Modelo Semántico." },
            { type: "image", src: "/podcasts/el-susurrador-de-codigo/slides/slide_08.png", alt: "GIGO", caption: "Garbage In, Garbage Out. Model quality is key." },

            { type: "paragraph", text: "Regla de Oro 1: Esquema en Estrella. Hechos y Dimensiones separados. Las tablas planas confunden a la IA." },
            { type: "image", src: "/podcasts/el-susurrador-de-codigo/slides/slide_09.png", alt: "Star Schema", caption: "Star Schema is essential." },

            { type: "paragraph", text: "Regla de Oro 2: Nomenclatura Humana. 'Ventas Totales' es mejor que 'V_Tot_03'. La IA lee como nosotros." },
            { type: "image", src: "/podcasts/el-susurrador-de-codigo/slides/slide_10.png", alt: "Naming Conventions", caption: "Use human-readable naming conventions." },

            { type: "paragraph", text: "Regla de Oro 3: Metadatos y Sinónimos. Enseña a Copilot que 'Ganancia' es lo mismo que 'Beneficio'." },
            { type: "image", src: "/podcasts/el-susurrador-de-codigo/slides/slide_11.png", alt: "Synonyms", caption: "Enrich metadata with synonyms." },

            { type: "paragraph", text: "Relaciones claras. La IA navega por los caminos que tú construyes. Si los caminos están rotos, se pierde." },
            { type: "image", src: "/podcasts/el-susurrador-de-codigo/slides/slide_12.png", alt: "Relationships", caption: "Clear relationships define navigation paths." },

            { type: "paragraph", text: "Prototipado ágil: Validar hipótesis de negocio en minutos en la Query View sin ensuciar el modelo." },
            { type: "image", src: "/podcasts/el-susurrador-de-codigo/slides/slide_13.png", alt: "Rapid Prototyping", caption: "Rapid prototyping and hypothesis validation." },

            { type: "paragraph", text: "Nuevo flujo: Explorar -> Validar -> Promocionar. Solo lo útil se convierte en medida oficial." },
            { type: "image", src: "/podcasts/el-susurrador-de-codigo/slides/slide_14.png", alt: "Workflow", caption: "Explore, Validate, Promote workflow." },

            { type: "paragraph", text: "El futuro del analista: Menos sintaxis, más semántica. Arquitectos de datos que hacen las preguntas correctas." },
            { type: "image", src: "/podcasts/el-susurrador-de-codigo/slides/slide_15.png", alt: "Future Analyst", caption: "Analyst as Semantic Architect." }
        ]
    },
    {
        id: "copilot-reports",
        title: "El Arquitecto Digital",
        date: "2026-02-10",
        duration: "15:00",
        description: "Copilot no es una capa de pintura, es un cambio tectónico. Descubre cómo pasar de mover píxeles a dirigir una construcción inteligente con lenguaje natural.",
        thumbnail: "/podcasts/copilot-reports/thumbnail_16_9.png",
        audioSrc: "/podcasts/copilot-reports/El Arquitecto Digital.m4a",
        tags: ["Copilot", "Power BI", "IA Generativa", "Arquitecto Digital"],
        youtubeId: "dM7D4NKxkSk",
        highlights: [
            "Pasamos de un mundo determinista a uno probabilístico.",
            "El usuario se convierte en el arquitecto. La IA es el equipo de construcción.",
            "La magia no surge del caos. La eficacia depende del modelo semántico."
        ],
        links: [
            { title: "Documentación Copilot en Power BI", url: "https://learn.microsoft.com/es-es/power-bi/create-reports/copilot-introduction" }
        ],
        content: [
            {
                "type": "paragraph",
                "text": "¿Sabes esa sensación? Abres la herramienta de análisis de datos y [exhala] ahí está, el desierto blanco, el temido lienzo en blanco. ¡Uf, total! Y empieza el ritual: eh, clic a clic, arrastrar este campo aquí, elegir este gráfico. Es que puede llegar a paralizar. Sí."
            },
            {
                "type": "paragraph",
                "text": "Pero, ¿y si pudiéramos saltarnos todo eso? ¿Y si en vez de construir, simplemente pudiéramos, no sé, describir? Pedir. Exacto, pedir. Algo como: \"Oye, necesito una página para analizar la eficiencia de la línea de producción y compara la efectividad del equipo entre los distintos turnos.\" Justo. Pues hoy vamos a meternos de lleno en esto, en cómo esta nueva forma de interactuar con los datos usando el lenguaje natural está reinventando la creación de informes."
            },
            {
                "type": "image",
                "src": "/podcasts/copilot-reports/slides/slide_01.png",
                "alt": "Slide 01",
                "caption": "Concepto clave 01 del episodio."
            },
            {
                "type": "paragraph",
                "text": "Vamos a ver cómo funciona por debajo, qué hace falta para que sea de verdad eficaz y qué supone este cambio, tanto para los analistas de toda la vida como para quien empieza. Y es que, ojo, no hablamos de un simple añadido, ¿eh? Mhm. De una capa de pintura bonita. Lo que se está describiendo aquí es un cambio, yo diría que tectónico, en la arquitectura de estas herramientas. Tectónico."
            },
            {
                "type": "paragraph",
                "text": "Sí, sí. Pasamos de un mundo, digamos, determinista, donde cada clic tiene una consecuencia única y predecible, a uno probabilístico. Ahora, una inteligencia artificial interpreta la intención que hay detrás de nuestras palabras. Y es como el síndrome de la página en blanco del escritor, pero para analistas. Exacto. Tienes una montaña de datos, mil preguntas que podrías hacer y la parálisis por análisis es muy real."
            },
            {
                "type": "image",
                "src": "/podcasts/copilot-reports/slides/slide_02.png",
                "alt": "Slide 02",
                "caption": "Concepto clave 02 del episodio."
            },
            {
                "type": "paragraph",
                "text": "A veces, lo más difícil es empezar, y esta tecnología lo que busca es ser precisamente ese primer párrafo que te escribe un asistente para que tú ya puedas empezar a editar y a refinar. Vale, a ver, vamos a desgranar esto. La idea fundamental es que el conocimiento ya no está en saber qué campo exacto arrastrar a qué eje. No. La habilidad ahora se desplaza a saber qué preguntar. Así que en lugar de pasarme media hora montando un panel, puedo decir algo como: \"Crea un panel de ventas que muestre los ingresos por región y por categoría de producto\"."
            },
            {
                "type": "paragraph",
                "text": "Y en segundos, no solo entiende lo que pides, sino que te propone una estructura, a veces una estructura completa de varias páginas. Elige los gráficos, que creo que son los mejores, y... Y conecta los datos, claro. Y conecta los datos. El efecto inmediato es una reducción de la carga cognitiva brutal. O sea que ya no tengo que ser un experto en visualización para recordar que una tendencia se ve mejor en un gráfico de líneas."
            },
            {
                "type": "image",
                "src": "/podcasts/copilot-reports/slides/slide_03.png",
                "alt": "Slide 03",
                "caption": "Concepto clave 03 del episodio."
            },
            {
                "type": "paragraph",
                "text": "Justo, o que una comparativa de segmentos funciona genial con barras. El sistema ya lo sabe y te lo propone. Aquí es donde entra esa metáfora, que me parece potentísima, del arquitecto y el equipo de construcción. A ver, explícamela. El usuario se convierte en el arquitecto. Él tiene la visión, decide qué se va a construir, para qué."
            },
            {
                "type": "paragraph",
                "text": "Y la IA es ese equipo de construcción supereficiente que levanta las paredes, pone las ventanas, todo según los planos que tú le vas dando. Me gusta, porque un arquitecto no pone cada ladrillo, pero sí que revisa la obra y pide cambios. ¿Funciona así? ¿Es un proceso de ida y vuelta? Totalmente conversacional. La IA te puede generar esa primera propuesta, ese borrador del informe, basándose en el modelo de datos, y a partir de ahí empieza el diálogo."
            },
            {
                "type": "image",
                "src": "/podcasts/copilot-reports/slides/slide_04.png",
                "alt": "Slide 04",
                "caption": "Concepto clave 04 del episodio."
            },
            {
                "type": "paragraph",
                "text": "Vale. Le puedes decir: \"Añade un filtro para el año 2025\", o \"cambia la granularidad de los datos de mensual a trimestral\", y el informe se reajusta casi en tiempo real. O incluso algo más sutil, como: \"Destaca en otro color la región con mayores ventas\". Exactamente. Es un proceso de refinar y refinar, donde diriges a tu equipo de construcción con instrucciones cada vez más precisas, hasta que el edificio es, bueno, tal y como lo habías imaginado. Entendido."
            },
            {
                "type": "paragraph",
                "text": "La IA nos ayuda a montar los gráficos, a visualizar lo que ya está en los datos, pero el poder del análisis siempre ha estado en ir más allá, en crear nuevas métricas, en calcular cosas que no son obvias. Mmm. Y ahí es donde la mayoría de la gente, y yo me incluyo a veces, se topa con un muro, el del código, el del famoso y temido DAX en el mundo Power BI. ¿Llega la IA también a esa sala de máquinas? Es que esa es la segunda parte de la revolución y quizá la más profunda. Se habla de un objeto visual de narrativa."
            },
            {
                "type": "image",
                "src": "/podcasts/copilot-reports/slides/slide_05.png",
                "alt": "Slide 05",
                "caption": "Concepto clave 05 del episodio."
            },
            {
                "type": "paragraph",
                "text": "Esto es una evolución de algo que ya existía, pero vamos, con esteroides. Narrativa, ¿qué es eso? Es un componente que de forma automática genera un resumen en texto de lo que se ve en los otros gráficos de la página. No te dice solo: \"las ventas subieron\". No, puede identificar y describir en lenguaje natural las tendencias clave, los valores atípicos más importantes, los patrones que surgen. Vaya, o sea que no solo construye el gráfico, sino que también escribe el pie de foto explicando lo que significa."
            },
            {
                "type": "paragraph",
                "text": "Exactamente, y de forma dinámica. Si un usuario final filtra el informe para ver solo los datos de una región, el texto no se queda obsoleto. Con un clic en un botón de actualizar, la narrativa se regenera para contar la historia de esa nueva vista de los datos. Es literalmente que los datos cuenten su propia historia. Justo. Pero como bien decías, esto nos lleva directos a la sala de máquinas, a la creación de fórmulas."
            },
            {
                "type": "image",
                "src": "/podcasts/copilot-reports/slides/slide_06.png",
                "alt": "Slide 06",
                "caption": "Concepto clave 06 del episodio."
            },
            {
                "type": "paragraph",
                "text": "Al DAX, a ese lenguaje que es increíblemente potente, pero que tiene una curva de aprendizaje vertical. Pues ahí es donde entra el segundo gran avance, eh... la asistencia en la creación de esas fórmulas. Dentro del propio editor, con un atajo de teclado, un Ctrl+I, se abre una ventana donde puedes describir el cálculo que necesitas en lenguaje natural. ¿En serio? Sí, sí."
            },
            {
                "type": "paragraph",
                "text": "Puedes escribir: \"Calcula el crecimiento interanual de las ventas por región\", y la IA genera el código DAX correspondiente, usando las funciones correctas como CALCULATE o SAMEPERIODLASTYEAR, y aplicando además las mejores prácticas de la industria. Para un momento. He visto código generado por IA en otros sitios y a veces es, digamos, creativo, por no decir incorrecto o ineficiente. ¿Esto es fiable?... ¿Es un código que un analista senior pondría en producción sin más o es solo un punto de partida? Esa es la pregunta del millón, y la respuesta es que hay que tratarlo como el trabajo de un asistente junior muy, muy competente."
            },
            {
                "type": "image",
                "src": "/podcasts/copilot-reports/slides/slide_07.png",
                "alt": "Slide 07",
                "caption": "Concepto clave 07 del episodio."
            },
            {
                "type": "paragraph",
                "text": "Ajá. Genera un código funcional y, en la mayoría de los casos, correcto, ¿sí? ¿Deberías copiarlo y pegarlo en un modelo de datos crítico para la empresa sin entender lo que hace? Radicalmente no. Es un acelerador entonces. Es un acelerador brutal, un profesor particular increíble."
            },
            {
                "type": "paragraph",
                "text": "De hecho, también puede hacer lo contrario. Le puedes dar una fórmula DAX de veinte líneas que heredaste de alguien y pedirle que te la explique paso a paso en un lenguaje sencillo. Democratiza el acceso a lo más potente de la herramienta, pero no elimina la necesidad del juicio humano. Jo, es que eso es un cambio de vida. Cualquiera que haya pasado una tarde entera buscando un paréntesis mal puesto en una fórmula larguísima, sabe de lo que hablo. Totalmente."
            },
            {
                "type": "image",
                "src": "/podcasts/copilot-reports/slides/slide_08.png",
                "alt": "Slide 08",
                "caption": "Concepto clave 08 del episodio."
            },
            {
                "type": "paragraph",
                "text": "Eliminar esa fricción es monumental. Entonces, con todo este poder, ¿significa que podemos conectar una hoja de cálculo desordenada, hacerle un par de preguntas y esperar informes perfectos? Intuyo que aquí hay un pero del tamaño de un camión. Del tamaño de un tren de mercancías. Y este es un punto crítico que se deja muy claro. La magia no surge del caos."
            },
            {
                "type": "paragraph",
                "text": "La eficacia de toda esta capa de IA generativa depende directa y absolutamente de la calidad y la estructura del modelo semántico que hay debajo. La IA es tan bueno como los datos que le das, ¿no? Y el contexto que le proporcionas, exacto. Vale, ¿y qué significa un modelo bien preparado para la IA? ¿Qué tenemos que hacer en esa fase de preparación de datos, que siempre es la menos glamurosa, pero la más importante? Significa varias cosas."
            },
            {
                "type": "image",
                "src": "/podcasts/copilot-reports/slides/slide_09.png",
                "alt": "Slide 09",
                "caption": "Concepto clave 09 del episodio."
            },
            {
                "type": "paragraph",
                "text": "Primero, la higiene básica: usar nombres de tablas, columnas y medidas que sean claros, descriptivos, que hablen el lenguaje del negocio, no un código técnico que no entiende nadie. Ingresos trimestrales en lugar de col siete tr fact. Justo. Pero la práctica clave, y esto es fundamental para que la conversación fluya, es enriquecer los metadatos añadiendo- Sinónimos. Sinónimos. ¿Cómo funciona eso?"
            },
            {
                "type": "paragraph",
                "text": "Imagina que tienes una medida que se llama ventas netas. El sistema entiende esa etiqueta, pero un director financiero podría preguntar por beneficio, un comercial por resultado final y un analista por ingresos netos. Claro, cada uno usa su jerga. Exacto. Si no haces nada, la IA dirá que no entiende la pregunta. Pero si añades esos tres términos como sinónimos a la medida Vitas Netas, acabas de entrenar a la IA para que entienda el lenguaje real y variado de tu organización."
            },
            {
                "type": "image",
                "src": "/podcasts/copilot-reports/slides/slide_10.png",
                "alt": "Slide 10",
                "caption": "Concepto clave 10 del episodio."
            },
            {
                "type": "paragraph",
                "text": "Estás construyendo un puente entre la jerga técnica de la base de datos y la forma en la que las personas de verdad hablan del negocio. O sea, que el trabajo previo de modelado y enriquecimiento de datos no solo no desaparece- Qué va ... sino que se vuelve todavía más estratégico. Es la base sobre la que se asienta toda la inteligencia que viene después. Exacto. Imagina lo que pasa si esto se ignora."
            },
            {
                "type": "paragraph",
                "text": "Un directivo pide rentabilidad por campaña de marketing y la IA no encuentra nada. ¿Por qué? Porque la columna se llama Cost Westing Act Marketing veintitrés. Y la herramienta parece tonta. La herramienta parece tonta, el directivo pierde la confianza en el sistema y todo el proyecto de IA fracasa. Y no es un fallo de la inteligencia artificial, es un fallo humano en la preparación de los cimientos."
            },
            {
                "type": "image",
                "src": "/podcasts/copilot-reports/slides/slide_11.png",
                "alt": "Slide 11",
                "caption": "Concepto clave 11 del episodio."
            },
            {
                "type": "paragraph",
                "text": "Ahí es donde te juegas toda la partida. Entendido. Vale, hemos hablado de cómo preparar los datos y construir un solo informe, pero mi cabeza ya está pensando a escala de una organización. ¿Cómo evitas que cada departamento cree su propio mini universo de sinónimos y acabemos con un caos de definiciones? ¿Cómo funciona esto a nivel global? He visto que se menciona una experiencia independiente."
            },
            {
                "type": "paragraph",
                "text": "Sí. Frente a la que está integrada en el informe. Si conectamos esto con el panorama general, vemos dos modos de uso muy distintos. La experiencia integrada es la que hemos estado discutiendo. Estás dentro de un informe y la IA te ayuda a construirlo o analizarlo, siempre en el contexto de su modelo de datos. Es para ir a lo profundo, pero la experiencia independiente es mucho más ambiciosa."
            },
            {
                "type": "image",
                "src": "/podcasts/copilot-reports/slides/slide_12.png",
                "alt": "Slide 12",
                "caption": "Concepto clave 12 del episodio."
            },
            {
                "type": "paragraph",
                "text": "Funciona como un centro de inteligencia para toda la organización. ¿Quieres decir que puede buscar en varios informes a la vez? Exactamente. Puede buscar y sintetizar información de todos los informes y modelos de datos a los que un usuario tiene acceso, claro, según sus permisos de seguridad. La visión es que un directivo- La visión es que un directivo, antes de una reunión, pueda preguntar: \"Prepárame un resumen del rendimiento global de este trimestre\". Y la herramienta no se limita a un solo informe."
            },
            {
                "type": "paragraph",
                "text": "Podría extraer el crecimiento de ventas del informe comercial, el margen de beneficio del informe financiero... Mmm, y la eficiencia de producción del de operaciones. Justo. Y te presenta una respuesta coherente y unificada. Suena increíble, pero también suena a un caos potencial. Si la IA empieza a mezclar datos de ventas y finanzas, ¿cómo se asegura de no estar comparando peras con manzanas?"
            },
            {
                "type": "image",
                "src": "/podcasts/copilot-reports/slides/slide_13.png",
                "alt": "Slide 13",
                "caption": "Concepto clave 13 del episodio."
            },
            {
                "type": "paragraph",
                "text": "¿Quién garantiza que la definición de cliente activo es la misma en ambos informes? Esa es la gran pregunta de la gobernanza de datos, y la respuesta no es mágica. La herramienta por sí sola no puede resolver esas discrepancias si la organización no lo ha hecho primero. Su éxito a esta escala depende de que la empresa tenga modelos de datos bien gobernados, certificados, compartidos. Si no, es un caos. Claro, si tienes un modelo de datos oficial de ventas y otro de finanzas, y ambos son consistentes, la IA puede combinarlos de forma fiable."
            },
            {
                "type": "paragraph",
                "text": "Si tienes veinte informes de ventas, cada uno con sus propias definiciones, la IA solo va a reflejar ese caos. De nuevo, la tecnología es un amplificador de tus procesos, amplifica la claridad si la tienes y amplifica el desorden, si no. Lo que me lleva a la preocupación más obvia y más importante, la privacidad, la soberanía de los datos. Si un sistema de IA de un gran proveedor tecnológico tiene acceso a todos los datos de mi empresa...... para darme estas respuestas, ¿se usan esos datos para entrenar un modelo global que luego usarán mis competidores? Es la pregunta del millón, y las fuentes son, bueno, categóricas al respecto."
            },
            {
                "type": "image",
                "src": "/podcasts/copilot-reports/slides/slide_14.png",
                "alt": "Slide 14",
                "caption": "Concepto clave 14 del episodio."
            },
            {
                "type": "paragraph",
                "text": "La respuesta es un no rotundo. ¿Seguro? Seguro. Los datos de un cliente nunca se utilizan para entrenar, reentrenar o mejorar los modelos de lenguaje base para otros clientes. Todo el procesamiento, las preguntas, las respuestas, se mantiene estrictamente dentro de los límites geográficos y de seguridad del tenant de la organización. Es un principio de aislamiento total."
            },
            {
                "type": "paragraph",
                "text": "Tus datos son tuyos y solo se usan para generar respuestas para tus usuarios. Punto. ¡Uf! Eso es un gran alivio, y parece que la apuesta por esta tecnología es total, no es un experimento. He leído en la documentación un cambio estratégico bastante drástico: la retirada completa de la antigua herramienta de Q&A para finales de 2026. Es un movimiento de quemar las naves."
            },
            {
                "type": "image",
                "src": "/podcasts/copilot-reports/slides/slide_15.png",
                "alt": "Slide 15",
                "caption": "Concepto clave 15 del episodio."
            },
            {
                "type": "paragraph",
                "text": "Vaya. No es solo una actualización, es una declaración de intenciones. Consolida toda la estrategia en esta nueva plataforma de IA generativa. Se elimina lo antiguo para evitar la confusión de tener dos sistemas de lenguaje natural solapándose y, sobre todo, para centrar todos los recursos en el nuevo sistema. Es una señal inequívoca de que este es el futuro. No hay vuelta atrás."
            },
            {
                "type": "paragraph",
                "text": "Código complejo para cálculos personalizados y todo generado a través de una conversación. El rol del creador de informes parece que está cambiando, de ser un constructor meticuloso a ser, como decíamos, un arquitecto que dirige a un equipo de construcción inteligente. Exacto. Y la idea clave, que es vital entender, no es reemplazar a los analistas, es aumentarlos. Mmm. No se trata de reemplazar al piloto de carreras por un robot."
            },
            {
                "type": "paragraph",
                "text": "Se trata de darle al piloto un coche de Fórmula uno en lugar de un utilitario. La IA se encarga de la mecánica de bajo nivel, la inyección, el control de tracción, el cambio de marchas, para que el piloto pueda centrarse en lo importante: la estrategia de la carrera, trazar la curva perfecta, encontrar el hueco para adelantar. O sea, que el juicio y la estrategia del humano se vuelven más valiosos, no menos. Precisamente. Y esto subraya la necesidad de fomentar lo que podríamos llamar una cultura de alfabetización en IA. Hay que formar a los usuarios para que entiendan qué es esta herramienta."
            },
            {
                "type": "paragraph",
                "text": "No es un oráculo infalible. Es un asistente. Es un asistente increíblemente competente. El resultado que te da es un primer borrador excelente, pero siempre, siempre requiere la validación, el juicio crítico y el contexto de un experto humano. La IA genera el qué, pero el humano debe validar y explicar el porqué. Y esto nos hace pensar: a medida que estas herramientas se vuelven más y más eficientes en responder al qué, en construir el informe que pedimos, ¿cómo nos libera eso por hacer mejores preguntas estratégicas, los porqués y los qué pasaría si? Quizás la verdadera revolución no está en las respuestas que nos da la IA, sino en las nuevas y más profundas preguntas que nos permitirá explorar, ahora que ya no estaremos atascados en la mecánica de colocar cada ladrillo del informe."
            }
        ]
    }
];

export const series = [
    {
        id: "ruta-copilot",
        title: "Ruta: Copilot en Power BI (0 to Hero)",
        description: "Domina la IA generativa en Power BI. Desde los requisitos técnicos hasta la maestría en prompts para DAX, informes y narrativa.",
        episodes: [
            {
                id: "copilot-capacidad-requisitos",
                status: "published",
                order: 1
            },
            {
                id: "el-susurrador-de-codigo",
                title: "El Susurrador de Código",
                description: "Generación de DAX con Lenguaje Natural. Superando el síndrome de la página en blanco y aumentando productividad.",
                status: "published",
                order: 2
            },
            {
                id: "copilot-reports",
                title: "El Arquitecto Digital",
                description: "Generación automática de informes. Estructura, selección de visuales y conexión de datos automatizada.",
                status: "published",
                order: 3
            },
            {
                id: "copilot-narrative",
                title: "El Narrador",
                description: "Narrativas Inteligentes. Interpretación de gráficos y generación de resúmenes ejecutivos que explican el 'por qué'.",
                status: "coming_soon",
                order: 4
            },
            {
                id: "copilot-best-practices",
                title: "Maestría y Control",
                description: "Best Practices y Gobernanza. De creador a editor experto: auditar código, refinar prompts y evitar alucinaciones.",
                status: "coming_soon",
                order: 5
            }
        ]
    },
    {
        id: "ruta-dax",
        title: "Ruta de Aprendizaje: Dominando DAX",
        description: "De los conceptos básicos a la manipulación avanzada del contexto. Sigue este camino para convertirte en un experto.",
        episodes: [
            {
                id: "dax-narracion-datos", // References existing podcast id
                status: "published",
                order: 1
            },
            {
                id: "dax-contextos",
                status: "published",
                order: 2
            },
            {
                id: "dax-time-intelligence", // Future episode
                title: "Inteligencia de Tiempo (Time Intelligence)",
                description: "Domina las funciones de tiempo: YTD, comparativas anuales y calendarios personalizados.",
                status: "coming_soon",
                order: 3
            }
        ]
    }
];
