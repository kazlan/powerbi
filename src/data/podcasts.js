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
        links: [
            { title: "Documentación de Power Query", url: "https://learn.microsoft.com/es-es/power-query/" },
            { title: "Mejores Prácticas de Transformación", url: "https://learn.microsoft.com/es-es/power-bi/guidance/power-query-background-refresh" }
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
        ]
    }
];
