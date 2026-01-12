export const podcasts = [
    {
        id: "dax-narracion-datos",
        title: "DAX y Narración de Datos",
        date: "2026-01-12",
        duration: "15:30",
        description: "Exploramos cómo el lenguaje DAX no es solo para cálculos, sino el motor fundamental para contar historias de datos convincentes en Power BI.",
        thumbnail: "/podcasts/podcast_cover_dax.png",
        audioSrc: "/podcasts/Power_BI_DAX_y_narración_de_datos.m4a",
        transcript: [
            { start: 0, end: 5, text: "Bienvenidos a Power BI Max. Soy su anfitrión y hoy tenemos un tema fascinante: DAX y la narración de datos." },
            { start: 5, end: 12, text: "¿Alguna vez has pensado en DAX como un lenguaje de storytelling? La mayoría lo ve solo como una herramienta para sumar columnas." },
            { start: 12, end: 18, text: "Pero la realidad es que DAX es el pincel con el que pintamos el contexto de nuestras historias de negocio." },
            { start: 18, end: 25, text: "Cuando escribes una medida como 'Ventas Año Anterior', no estás solo calculando un número." },
            { start: 25, end: 32, text: "Estás creando una línea base narrativa. Estás permitiendo que el usuario responda a la pregunta: '¿Estamos mejor que ayer?'" },
            { start: 32, end: 40, text: "Vamos a profundizar en la función CALCULATE. Es, sin duda, el verbo principal de este lenguaje." },
            { start: 40, end: 48, text: "CALCULATE nos permite cambiar la realidad del filtro. Nos permite decir: 'Ignora lo que el usuario ha seleccionado, quiero que mires esto'." },
            { start: 48, end: 55, text: "Imagina que un ejecutivo filtra el reporte por 'España'. Pero tú quieres mostrar el porcentaje del total global." },
            { start: 55, end: 62, text: "Ahí es donde DAX entra para contar esa historia de 'Parte vs Todo' usando ALL o REMOVEFILTERS." },
            { start: 62, end: 70, text: "Otro aspecto crucial es la Inteligencia de Tiempo. Funciones como SAMEPERIODLASTYEAR o DATESYTD." },
            { start: 70, end: 78, text: "Estas funciones automatizan la narrativa temporal. No necesitas explicarle al usuario que está viendo enero de este año contra enero del pasado." },
            { start: 78, end: 85, text: "El visual lo hace por ti gracias a DAX. Y eso limpia la carga cognitiva del reporte." },
            { start: 85, end: 92, text: "La clave para un buen storytelling en Power BI es la simplicidad. Y paradójicamente, a menudo necesitas un DAX complejo para lograr un visual simple." },
            { start: 92, end: 100, text: "Por ejemplo, colores dinámicos. ¿Sabías que puedes usar DAX para controlar el color de una barra?" },
            { start: 100, end: 108, text: "Si las ventas bajan, la barra se pone roja. Eso es una señal visual inmediata, una alerta narrativa programada en el modelo." },
            { start: 108, end: 115, text: "En conclusión, no veas a DAX como un obstáculo matemático. Véalo como tu guionista invisible." },
            { start: 115, end: 125, text: "Gracias por escucharnos. En el próximo episodio, hablaremos sobre Power Query y la limpieza de datos. ¡Hasta la próxima!" }
        ]
    }
];
