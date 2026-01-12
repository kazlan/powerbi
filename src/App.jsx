import { useState } from 'react';
import {
  BarChart3, TrendingUp, Globe, Target, Activity,
  MousePointer2, CheckCircle2, AlertCircle, Info,
  ChevronRight, Layout, Layers, HelpCircle, Menu,
  Bookmark, Zap, Filter, Eye, Lightbulb, Gauge,
  PieChart, Share2, MousePointerClick, Smartphone,
  Search, Boxes, ArrowDownWideNarrow, Navigation,
  Table as TableIcon, Grid, Cpu, Database,
  MessageSquare, FileText, List, Mic
} from 'lucide-react';

// Components
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import VisualDetail from './components/VisualDetail';
import PodcastList from './components/PodcastList';
import PodcastDetail from './components/PodcastDetail';
import { LegalNotice, PrivacyPolicy, CookiesPolicy } from './Legal';
import { podcasts } from './data/podcasts';

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('comparacion');
  const [selectedChart, setSelectedChart] = useState(null);
  const [selectedPodcast, setSelectedPodcast] = useState(null);
  const [selectedTag, setSelectedTag] = useState('Todos');

  // Handle Deep Linking on Load
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const podcastId = params.get('podcast');

      if (podcastId) {
        const foundPodcast = podcasts.find(p => p.id === podcastId);
        if (foundPodcast) {
          setActiveTab('podcasts');
          setSelectedPodcast(foundPodcast);
        }
      }
    } catch (error) {
      console.error("Deep linking error:", error);
    }
  }, []);

  const handleTagSelect = (tag) => {
    setSelectedTag(tag);
    setSelectedPodcast(null);
    // Clear URL param when going back to list via tag
    const url = new URL(window.location);
    url.searchParams.delete('podcast');
    window.history.pushState({}, '', url);
  };

  const handlePodcastSelect = (podcast) => {
    setSelectedPodcast(podcast);
    // Update URL
    const url = new URL(window.location);
    url.searchParams.set('podcast', podcast.id);
    window.history.pushState({}, '', url);
  };

  const handleBackToPodcasts = () => {
    setSelectedPodcast(null);
    // Clean URL
    const url = new URL(window.location);
    url.searchParams.delete('podcast');
    window.history.pushState({}, '', url);
  };

  const categories = [
    { id: 'comparacion', name: 'Comparación', icon: <BarChart3 size={18} />, color: 'bg-blue-600' },
    { id: 'tiempo', name: 'Tendencias', icon: <TrendingUp size={18} />, color: 'bg-emerald-600' },
    { id: 'composicion', name: 'Composición', icon: <PieChart size={18} />, color: 'bg-teal-600' },
    { id: 'relacion', name: 'Relación', icon: <Share2 size={18} />, color: 'bg-cyan-600' },
    { id: 'kpi', name: 'KPIs/Cards', icon: <Target size={18} />, color: 'bg-purple-600' },
    { id: 'mapas', name: 'Mapas', icon: <Globe size={18} />, color: 'bg-amber-600' },
    { id: 'ai', name: 'IA Avanzada', icon: <Cpu size={18} />, color: 'bg-rose-600' },
    { id: 'tablas', name: 'Tabulares', icon: <TableIcon size={18} />, color: 'bg-slate-700' },
    { id: 'interactividad', name: 'Filtros/UX', icon: <Filter size={18} />, color: 'bg-orange-600' }
  ];

  const chartLibrary = {
    comparacion: [
      {
        title: "Barras y Columnas (Estándar)",
        desc: "El visual fundamental para comparar valores entre diferentes categorías.",
        useCases: `Los gráficos de barras y columnas son la base de la visualización de datos. Su simplicidad es su mayor virtud: el ojo humano es extremadamente eficiente comparando longitudes alineadas. 
        
        Técnicamente, este visual debe ser tu primera opción cuando necesitas comparar una métrica numérica (como Ventas o Beneficio) a través de una dimensión categórica (como País, Producto o Vendedor). La elección entre barras (horizontales) y columnas (verticales) no es solo estética; obedece a reglas de usabilidad. Usa columnas cuando tienes pocas categorías (menos de 8) o si las categorías tienen un orden cronológico implícito. Usa barras horizontales cuando las etiquetas de tus categorías son largas (evitando que el usuario tenga que inclinar la cabeza para leer) o cuando tienes muchas categorías, ya que el scroll vertical es más natural en dispositivos móviles y monitores.
        
        Una característica avanzada a menudo ignorada es el uso de 'Múltiplos pequeños' (Small Multiples), que te permite dividir este gráfico en una cuadrícula de gráficos más pequeños basados en otra dimensión, facilitando una comparación limpia sin saturar una sola vista.`,
        tips: [
          "Si tienes más de 10-12 categorías, usa siempre Barras Horizontales para mejorar la legibilidad de las etiquetas.",
          "Para el examen PL-300: Si te piden mostrar 'Tendencia' y 'Comparación' a la vez, la respuesta es el Gráfico de Columnas y Líneas Apiladas (Combo Chart).",
          "Evita usar demasiados colores. Usa el color para resaltar una historia (ej. color condicional si la meta no se cumple), no para decorar cada barra diferente.",
          "Recuerda que puedes agregar 'Barras de error' para visualizar la variabilidad o intervalos de confianza, crucial en reportes científicos o de calidad.",
          "El eje Y debe comenzar siempre en cero para no distorsionar la percepción de la magnitud de las diferencias."
        ],
        image: "/visuals/bar_chart.png",
        learnUrl: "https://learn.microsoft.com/es-es/power-bi/visuals/power-bi-visualization-types-for-reports-and-q-and-a"
      },
      {
        title: "Gráfico Combinado (Combo Chart)",
        desc: "Combina una línea y una columna para comparar valores con diferentes escalas.",
        useCases: `La solución perfecta cuando tienes dos métricas con escalas muy diferentes (ej. 'Ventas' en millones y 'Margen' en porcentaje). Permite correlacionar volumen con rendimiento.
        
        Al combinar barras y líneas, ahorras espacio en el informe y facilitas la detección de correlaciones entre dos series de datos que de otro modo requerirían dos gráficos separados.`,
        tips: [
          "Usa el eje secundario (Y derecho) con precaución; asegúrate de etiquetarlo claramente.",
          "Ideal para mostrar 'Real vs Meta' (Meta como línea, Real como barra) o 'Ventas vs Crecimiento'.",
          "En el examen PL-300: Es visual clave para 'comparar métricas de diferente magnitud'.",
          "Puedes compartir el mismo eje X para ambas series."
        ],
        image: "/visuals/combo_chart.png",
        learnUrl: "https://learn.microsoft.com/es-es/power-bi/visuals/power-bi-visualization-combo-chart"
      },
      {
        title: "Gráfico de Cintas (Ribbon Chart)",
        desc: "Muestra cambios de clasificación (ranking) a lo largo del tiempo.",
        useCases: `Similar al gráfico de columnas apiladas, pero conecta las categorías con 'cintas'. El grosor de la cinta representa el valor, pero lo más importante es el cruce: puedes ver cómo una categoría sube o baja de ranking mes a mes.
        
        Es muy visual para identificar rápidamente quién lidera en cada periodo y cómo fluctúan las posiciones relativas más allá de los valores absolutos.`,
        tips: [
          "Único visual que enfatiza el cambio de rango/posición entre periodos.",
          "El elemento con mayor valor siempre se coloca en la parte superior de cada periodo.",
          "Excelente para ver líderes de mercado cambiantes a lo largo del tiempo.",
          "Los tooltip muestran detalles del cambio de rango y la variación porcentual."
        ],
        image: "/visuals/ribbon_chart.png",
        learnUrl: "https://learn.microsoft.com/es-es/power-bi/visuals/power-bi-visualization-ribbon-charts"
      }
    ],
    tiempo: [
      {
        title: "Gráfico de Líneas (Line Chart)",
        desc: "Visualiza tendencias y cambios continuos a lo largo del tiempo.",
        useCases: `El estándar para análisis temporal. Úsalo para conectar puntos de datos individuales y mostrar la secuencia de valores. Ideal para identificar tendencias, aceleraciones, desaceleraciones o volatilidad.
        
        Es fundamental para series temporales donde la continuidad del dato es clave, permitiendo detectar patrones estacionales o cíclicos con facilidad.`,
        tips: [
          "Usa líneas sólidas para datos reales y líneas punteadas para proyecciones.",
          "Limita a 3-4 series para evitar el 'gráfico de espagueti'.",
          "El eje Y no necesita empezar en cero si el objetivo es ver la variabilidad, pero avisa al usuario.",
          "Usa marcadores si los puntos de datos individuales son importantes."
        ],
        image: "/visuals/line_chart.png",
        learnUrl: "https://learn.microsoft.com/es-es/power-bi/visuals/power-bi-visualization-line-charts"
      },
      {
        title: "Gráfico de Áreas",
        desc: "Enfatiza la magnitud del cambio a lo largo del tiempo.",
        useCases: `El gráfico de áreas es una evolución del gráfico de líneas, donde el espacio entre el eje y la línea se rellena con color o textura. Aunque comparte la función de mostrar tendencias temporales, su psicología visual es diferente: el área rellena comunica 'volumen' o 'cantidad acumulada'.
        
        Es particularmente efectivo cuando quieres comunicar no solo la dirección de la tendencia (sube o baja), sino la magnitud total de los recursos utilizados. Por ejemplo, visualizar el 'Total de Inventario' o 'Deuda Acumulada' a lo largo del año tiene más impacto con un gráfico de áreas que con uno de líneas simple.
        
        Existe una variante crítica: el 'Gráfico de Áreas Apiladas'. Este permite ver cómo múltiples categorías contribuyen a un total a lo largo del tiempo. Sin embargo, úsalo con precaución; puede ser difícil para el usuario comparar las tendencias de las categorías superiores porque su base no es plana, sino que 'flota' sobre las curvas de las series inferiores.`,
        tips: [
          "Úsalo cuando el objetivo sea destacar la magnitud del cambio, no solo la tasa de cambio.",
          "En el examen PL-300: Es la elección correcta si te piden mostrar 'la tendencia y la contribución al total de volumen' simultáneamente.",
          "Evita el Gráfico de Áreas Apiladas si necesitas comparar con precisión los valores de las series individuales; para eso es mejor un gráfico de líneas.",
          "La transparencia en el color de relleno es clave si superpones varias series en un gráfico de áreas estándar, para ver dónde se cruzan.",
          "Funciona mejor con pocas series de datos. Si tienes 10 líneas, un gráfico de áreas se convertirá en un desorden visual ilegible."
        ],
        image: "/visuals/area_chart.png",
        learnUrl: "https://learn.microsoft.com/es-es/power-bi/visuals/power-bi-visualization-basic-area-chart"
      }
    ],
    composicion: [
      {
        title: "Circular y Anillo (Pie & Donut)",
        desc: "Muestran la relación de las partes con un todo estático.",
        useCases: `A pesar de su controversia en el mundo de la visualización de datos, los gráficos circulares y de anillo tienen un lugar legítimo cuando se usan correctamente. Su función es mostrar cómo se divide un total (el 100%) en partes componentes. Son intuitivos para el público general porque evocan la metáfora de dividir un pastel.
        
        El Gráfico de Anillo (Donut Chart) es, en términos de diseño moderno, superior al circular. ¿Por qué? Porque libera el espacio central. Este 'hueco' es un espacio inmobiliario valioso en un dashboard que puedes usar para mostrar el KPI principal (el valor total) o el título de la métrica, ahorrando espacio y proporcionando contexto inmediato.
        
        Sin embargo, su uso debe ser estrictamente limitado. El cerebro humano es malo comparando ángulos y áreas. Si tienes tramos similares (ej. 24% vs 26%), el usuario no distinguirá la diferencia. Úsalos solo cuando las diferencias sean obvias o para categorías binarias/ternarias (Sí/No, Activo/Inactivo).`,
        tips: [
          "Regla de Oro: Nunca uses estos gráficos para más de 4 o 5 categorías. Se vuelven ilegibles y pierden su utilidad.",
          "En el PL-300, si te piden mostrar 'contribución a un total' con muchas categorías, la respuesta correcta es Treemap o Gráfico de Barras, NO Pie Chart.",
          "El gráfico de Anillo permite colocar una tarjeta o etiqueta totalizadora en el centro, lo cual es excelente para el diseño de tarjetas KPI compuestas.",
          "No se pueden usar para mostrar cambios en el tiempo ni valores negativos (no puedes tener una rebanada de pastel negativa).",
          "Siempre ordena las porciones por tamaño para facilitar la lectura, generalmente en el sentido de las agujas del reloj empezando desde las 12."
        ],
        image: "/visuals/pie_chart.png",
        learnUrl: "https://learn.microsoft.com/es-es/power-bi/visuals/power-bi-visualization-pie-donut-charts"
      },
      {
        title: "Treemap (Mapa de Árbol)",
        desc: "Visualiza datos jerárquicos usando rectángulos anidados.",
        useCases: `El Treemap es una visualización de áreas donde el tamaño de cada rectángulo representa una métrica cuantitativa. Es una alternativa superior al gráfico circular cuando necesitas visualizar muchas categorías, ya que aprovecha eficientemente todo el espacio rectangular del lienzo en lugar de dejar espacios vacíos en las esquinas.
        
        Su verdadera potencia se revela con datos jerárquicos. Puedes anidar 'Producto' dentro de 'Categoría', y el visual creará rectángulos grandes (categorías) subdivididos en rectángulos más pequeños (productos). Además, admite una segunda dimensión de análisis mediante el color: puedes determinar el tamaño por 'Ventas' (cuanto más grande, más ventas) y la saturación del color por 'Rentabilidad' (cuanto más oscuro, más rentable), permitiendo detectar al instante productos 'superventas' que quizás tienen bajo margen.`,
        tips: [
          "Funciona mejor con datos jerárquicos (ej. Categoría > Subcategoría).",
          "Permite visualizar patrones rápidamente gracias al código de colores.",
          "Los rectángulos se ordenan por tamaño de mayor a menor (arriba-izquierda a abajo-derecha).",
          "En el examen: Usar para 'mostrar proporciones de un todo dentro de una jerarquía'."
        ],
        image: "/visuals/treemap.png",
        learnUrl: "https://learn.microsoft.com/es-es/power-bi/visuals/power-bi-visualization-treemaps"
      },
      {
        title: "Gráfico de Cascada (Waterfall)",
        desc: "Desglosa cómo se llega de un valor inicial a uno final.",
        useCases: `El gráfico de Cascada es la herramienta estándar para el análisis financiero y de variaciones, conocido a menudo como 'Bridge Chart' o gráfico de puente. Su propósito es desglosar auditivamente cómo se llega de un saldo inicial a uno final. Por ejemplo, te permite visualizar paso a paso cómo los 'Ingresos Brutos' se ven erosionados por el 'Costo de Ventas', 'Gastos Operativos' e 'Impuestos' hasta llegar a la 'Utilidad Neta'.
        
        Más allá de las finanzas, es crucial para explicar el cambio entre dos periodos. Si las ventas bajaron de 1M a 800k, el gráfico de cascada puede mostrar barras rojas y verdes para cada factor causal (ej. 'Precio', 'Volumen', 'Mix de Producto'), explicando visualmente 'por qué' ocurrió el cambio neto. Power BI colorea automáticamente los incrementos en verde y los decrementos en rojo, aunque esto es personalizable.`,
        tips: [
          "Los valores verdes suman, los rojos restan (colores estándar).",
          "Incluye automáticamente una barra de 'Total' final.",
          "En el examen: La respuesta para 'analizar la variación' o 'bridge chart'.",
          "Permite 'Desglose' (Breakdown) para explicar una barra específica por otra categoría."
        ],
        image: "/visuals/waterfall_chart.png",
        learnUrl: "https://learn.microsoft.com/es-es/power-bi/visuals/power-bi-visualization-waterfall-charts"
      },
      {
        title: "Gráfico de Embudo (Funnel)",
        desc: "Visualiza etapas de un proceso lineal que se reducen progresivamente.",
        useCases: `El gráfico de Embudo es una herramienta especializada diseñada para representar procesos lineales donde se espera una disminución o filtrado en cada paso sucesivo. Es el estándar de oro para analizar 'Pipelines' de ventas, flujos de marketing digital o procesos de reclutamiento de personal.
        
        Lo que hace único al Embudo en Power BI es su capacidad automática para calcular conversiones. Sin necesidad de escribir medidas DAX complejas, el visual te muestra implícitamente qué porcentaje del paso 1 (el 100%) llega al paso final (tasa de conversión global) y qué porcentaje de un paso sobrevive al siguiente (tasa de caída o drop-off rate).
        
        Este análisis visual inmediato permite identificar 'cuellos de botella'. Si ves una reducción drástica entre la etapa de 'Propuesta Enviada' y 'Contrato Firmado', sabes exactamente dónde enfocar tus esfuerzos de mejora de procesos.`,
        tips: [
          "Es la respuesta correcta en el examen para 'visualizar etapas de un proceso de ventas' o 'analizar tasas de retención'.",
          "El gráfico calcula automáticamente el % del primero (la etapa superior) y el % del anterior (la etapa inmediata superior).",
          "No lo uses si las etapas no son secuenciales o si el tamaño de las etapas no se espera que disminuya (un proceso donde entran más elementos a mitad de camino rompería la metáfora).",
          "Puedes usar el gráfico de embudo como un filtro (slicer) muy visual para filtrar otras partes del informe por etapa del proceso.",
          "Permite el ordenamiento personalizado si tu proceso no sigue un orden lógico por valor numérico, sino por flujo de trabajo."
        ],
        image: "/visuals/funnel_chart.png",
        learnUrl: "https://learn.microsoft.com/es-es/power-bi/visuals/power-bi-visualization-funnel-charts"
      }
    ],
    kpi: [
      {
        title: "Tarjeta de varias filas (Multi-row Card)",
        desc: "Agrupa múltiples métricas relacionadas en una sola visualización compacta.",
        useCases: `La tarjeta de varias filas es una herramienta de condensación de información. A diferencia de llenar tu dashboard con 5 o 6 tarjetas individuales (Key Performance Indicators) dispersas, este visual te permite agrupar métricas que pertenecen al mismo contexto en un solo bloque coherente y alineado.
        
        Es extremadamente útil para crear 'Fichas de Entidad'. Imagina que seleccionas a un empleado en un filtro: este visual puede mostrar instantáneamente su Foto, Nombre, Departamento, Total de Ventas y Antigüedad, todo formateado como una sola unidad informativa. 
        
        Técnicamente, también es más eficiente para el rendimiento de renderizado del reporte tener un visual complejo que 6 simples. Además, soporta resaltado cruzado: al hacer clic en una barra de otro gráfico, la tarjeta se actualiza para mostrar los detalles de esa selección específica.`,
        tips: [
          "Úsalo para crear 'Fichas de Detalle' o 'Header strips' en tus reportes para mostrar el estado actual de la selección.",
          "En el examen: Es la mejor opción para mostrar un grupo de métricas relacionadas sin saturar el lienzo con múltiples objetos visuales.",
          "Soporta barras de acento de color a la izquierda, lo que ayuda a agrupar visualmente la información o denotar categorías.",
          "A diferencia de la Tabla, se adapta mejor a pantallas móviles y layouts verticales tipo 'tarjeta de perfil'.",
          "Puedes usar medidas DAX que devuelvan texto para mostrar estados dinámicos como 'Objetivo Cumplido' o 'Requiere Atención' dentro de la tarjeta."
        ],
        image: "/visuals/multi_row_card.png",
        learnUrl: "https://learn.microsoft.com/es-es/power-bi/visuals/power-bi-visualization-card"
      },
      {
        title: "Tarjeta (Card)",
        desc: "Muestra un único número importante (Big Number).",
        useCases: `La Tarjeta (Card) de una sola fila es el elemento fundamental para contar la historia de alto nivel. Se utiliza para mostrar los 'Big Numbers': esas métricas críticas que el usuario debe absorber en los primeros 3 segundos, como 'Ventas Totales', 'Tickets Abiertos' o 'Satisfacción del Cliente'. Se colocan típicamente en la parte superior izquierda del informe (el área de mayor atención visual).
        
        Una limitación común es que solo muestra un número sin contexto. Para solucionar esto en el examen PL-300 y en la práctica profesional, es vital usar medidas DAX formateadas o combinar la tarjeta con indicadores visuales externos. Por ejemplo, si el número es bajo, puedes cambiar programáticamente el color de la etiqueta (usando formato condicional fx) para alertar al usuario, convirtiendo un dato estático en una señal de alarma inteligente.`,
        tips: [
          "Elimina la etiqueta de categoría y usa un título de texto si quieres más control.",
          "Usa el 'Valor de visualización' para formatear (Millones, Miles).",
          "Solo admite un campo de datos.",
          "Combínala con un pequeño sparkline o icono para dar contexto."
        ],
        image: "/visuals/card.png",
        learnUrl: "https://learn.microsoft.com/es-es/power-bi/visuals/power-bi-visualization-card"
      },
      {
        title: "Medidor (Gauge)",
        desc: "Visualiza un valor en relación con un objetivo en un arco circular.",
        useCases: `El Medidor (Gauge) radial imita el velocímetro de un coche para mostrar el progreso hacia un objetivo específico. Es una visualización binaria y directa: ¿Hemos llegado a la meta o no? Requiere definir un valor mínimo, un máximo, el valor actual y, opcionalmente, una línea de objetivo.
        
        Sin embargo, su uso debe ser medido. Ocupa una gran cantidad de espacio en pantalla (pixel real estate) para comunicar un solo dato. En escenarios de diseño avanzado o para el examen, considera si un gráfico 'KPI' o un 'Bullet Chart' (visual personalizado) podría contar la misma historia de manera más eficiente. Usa el Gauge solo para las 2 o 3 métricas más críticas que requieren monitoreo constante y urgente.`,
        tips: [
          "Requiere 4 valores posibles: Mínimo, Máximo, Destino (la línea) y Valor Actual.",
          "Si no defines Mín/Máx, Power BI los calcula automáticamente (lo cual puede ser engañoso).",
          "Considera usar un KPI o Bullet Chart para ahorrar espacio.",
          "En el examen: Úsalo para 'objetivos de un vistazo'."
        ],
        image: "/visuals/gauge.png",
        learnUrl: "https://learn.microsoft.com/es-es/power-bi/visuals/power-bi-visualization-radial-gauge-charts"
      },
      {
        title: "KPI (Indicador Clave de Rendimiento)",
        desc: "Muestra valor, objetivo y tendencia con codificación de color.",
        useCases: `El visual KPI es una potente evolución de la Tarjeta simple. Mientras que la tarjeta solo dice 'cuánto vendimos', el KPI responde a '¿es eso bueno o malo?' y '¿cuál es la tendencia?'. Requiere tres piezas de datos: el 'Valor Indicador' (lo que mides), el 'Objetivo de destino' (la meta) y el 'Eje de tendencia' (normalmente una fecha).
        
        Automáticamente, este visual colorea el resultado en verde si se cumple la meta o en rojo si no (configurable para métricas donde 'menos es mejor', como devoluciones). Además, dibuja una pequeña gráfica de área en el fondo que muestra la tendencia histórica reciente. Es el visual más completo para cuadros de mando ejecutivos porque proporciona contexto, estado y tendencia en un solo recuadro compacto.`,
        tips: [
          "Requiere tres campos: Valor, Eje de Tendencia (Tiempo) y Objetivo.",
          "Puedes configurar si 'Alto es bueno' (Ventas) o 'Bajo es bueno' (Devoluciones).",
          "En el examen: La mejor opción para 'monitorear el progreso hacia un objetivo con contexto de historia'.",
          "Muestra la distancia al objetivo en %."
        ],
        image: "/visuals/kpi.png",
        learnUrl: "https://learn.microsoft.com/es-es/power-bi/visuals/power-bi-visualization-kpi"
      }
    ],
    ai: [
      {
        title: "Preguntas y Respuestas (Q&A)",
        desc: "Permite explorar datos utilizando lenguaje natural en lugar de arrastrar campos.",
        useCases: `El visual de Q&A (Preguntas y Respuestas) democratiza el análisis de datos. Rompe la barrera técnica permitiendo que un usuario final escriba literalmente: '¿Cuáles fueron las ventas totales por región en 2023?' y reciba instantáneamente un gráfico generado al vuelo como respuesta.
        
        Para un desarrollador de Power BI, implementar esto no es solo 'poner el visual'. Requiere un trabajo detrás de escena: configurar sinónimos en el modelo de datos (para que el sistema entienda que 'ganancia', 'beneficio' y 'profit' son la misma columna) y curar las preguntas sugeridas.
        
        Es una herramienta potente para la fase de exploración de datos o para usuarios ejecutivos que tienen preguntas ad-hoc que no están respondidas por los gráficos estáticos del dashboard predefinido.`,
        tips: [
          "Para que funcione bien, es CRÍTICO configurar Sinónimos en la vista de Modelo del Power BI Desktop.",
          "En el examen PL-300: Q&A es la respuesta para escenarios de 'autoservicio' o cuando los usuarios ejecutivos necesitan respuestas rápidas no predefinidas.",
          "Puedes 'enseñar' a Q&A términos propios de tu negocio (jerga corporativa) y fijar visuales específicos para ciertas preguntas.",
          "El borde del visual cambia de color si entiende la pregunta (azul) o si no entiende una palabra (rojo doble subrayado).",
          "Los usuarios pueden convertir un resultado de Q&A en un visual permanente de su reporte estándar si tienen permisos de edición."
        ],
        image: "/visuals/q_and_a.png",
        learnUrl: "https://learn.microsoft.com/es-es/power-bi/visuals/power-bi-visualization-q-and-a"
      },
      {
        title: "Narrativa Inteligente (Smart Narrative)",
        desc: "Genera resúmenes textuales automáticos que explican los datos del visual.",
        useCases: `No todos los usuarios interpretan los gráficos con la misma velocidad. La Narrativa Inteligente actúa como un analista virtual, escaneando tus datos y generando automáticamente texto que destaca las tendencias clave, los valores atípicos (outliers) y las explicaciones subyacentes.
        
        Lo poderoso es que es completamente dinámica. Si filtras el reporte para ver solo "Europa", el texto se reescribe al instante para narrar la historia de Europa específicamente, recalculando porcentajes de crecimiento, identificando los nuevos productos top y ajustando las conclusiones.
        
        Puedes personalizarla fuertemente: no tienes que quedarte con el texto generado por la IA. Puedes escribir tu propia plantilla de párrafo (ej. "Las ventas este mes fueron [Medida_Ventas]...") e insertar valores dinámicos, combinando tu conocimiento de negocio con la automatización de datos.`,
        tips: [
          "Ideal para accesibilidad y para usuarios que prefieren leer resúmenes ejecutivos en lugar de interpretar gráficos complejos.",
          "En el examen: Es la solución para 'proporcionar explicaciones de datos dinámicas y automatizadas' sin crear medidas de texto complejas en DAX.",
          "Se actualiza con todos los filtros y segmentación cruzada del informe.",
          "Puede detectar automáticamente tendencias (crecimiento/decrecimiento) y distribuiciones sin configuración previa.",
          "Puedes editar el texto generado, cambiar el formato, negritas y colores para enfatizar los KPIs más importantes dentro del párrafo."
        ],
        image: "/visuals/smart_narrative.png",
        learnUrl: "https://learn.microsoft.com/es-es/power-bi/visuals/power-bi-visualization-smart-narrative"
      }
    ],
    relacion: [
      {
        title: "Gráfico de Dispersión (Scatter Chart)",
        desc: "Analiza la correlación entre dos métricas numéricas y detecta patrones.",
        useCases: `El Gráfico de Dispersión es la herramienta estadística por excelencia en Power BI. Es único porque te permite cruzar dos medidas numéricas continuas (una en el Eje X, otra en el Eje Y) para ver si existe una relación entre ellas. Por ejemplo: ¿Invertir más en Marketing (Eje X) realmente genera más Ventas (Eje Y)?
        
        Si los puntos forman una línea ascendente, hay correlación positiva. Si es una nube dispersa, no hay relación. Además, es fundamental para la detección de anomalías (outliers): esos puntos que se salen de la norma quedan visualmente aislados y son fáciles de identificar para investigación.
        
        Una capacidad exclusiva de este gráfico es el 'Eje de Reproducción' (Play Axis). Puedes arrojar una dimensión de tiempo (como Año o Mes) aquí y el gráfico se animará, mostrando cómo se mueven los puntos a lo largo del tiempo, ideal para contar historias de evolución de mercado.`,
        tips: [
          "Es el único gráfico estándar que soporta animación temporal a través del 'Play Axis'.",
          "En el examen PL-300: Si te preguntan cómo 'identificar valores atípicos' (outliers) o 'analizar correlaciones', esta es la respuesta.",
          "Soporta hasta 3 dimensiones de datos: Eje X (medida 1), Eje Y (medida 2), y Tamaño de la burbuja (medida 3).",
          "Puedes usar la funcionalidad de 'Analizar > Buscar clústeres' para que Power BI agrupe automáticamente tus datos en segmentos similares.",
          "Ten cuidado con el rendimiento si intentas renderizar miles de puntos; usa el muestreo de alta densidad si tienes grandes volúmenes de datos."
        ],
        image: "/visuals/scatter_chart.png",
        learnUrl: "https://learn.microsoft.com/es-es/power-bi/visuals/power-bi-visualization-scatter"
      }
    ],
    mapas: [
      {
        title: "Mapa (Map)",
        desc: "Visualiza datos cuantitativos en ubicaciones geográficas precisas.",
        useCases: `El visual de Mapa básico (de burbujas) es perfecto cuando quieres comparar la magnitud de una métrica en puntos geográficos específicos. A diferencia del mapa coroplético que colorea regiones, este coloca círculos sobre ciudades o coordenadas exactas.
        
        El tamaño del círculo representa el valor (ej. Ventas), lo que permite al usuario identificar rápidamente los 'hubs' o centros de mayor actividad. Es excelente para logística, ubicación de tiendas o análisis de distribución de clientes.
        
        Al integrar mapas de Bing, ofrece contexto geográfico real (carreteras, terreno), lo cual es útil si la geografía física influye en tus datos (ej. distancia a un puerto o terreno montañoso).`,
        tips: [
          "Para máxima precisión, siempre usa columnas con Categoría de Datos: Latitud y Longitud, en lugar de nombres de ciudades que pueden ser ambiguos.",
          "En el examen: Si necesitas visualizar 'burbujas' de tamaño variable sobre puntos geográficos, usa este Mapa, no el Coroplético.",
          "Requiere conexión a internet para cargar los mapas de Bing.",
          "Puedes añadir una dimensión de 'Leyenda' para colorear las burbujas según otra categoría (ej. Tipo de Tienda).",
          "Limpia tus datos geográficos: 'Santiago' existe en Chile, Cuba, España y Panamá. Usar jerarquías (País > Ciudad) ayuda a Bing a ubicarse."
        ],
        image: "/visuals/map.png",
        learnUrl: "https://learn.microsoft.com/es-es/power-bi/visuals/power-bi-visualization-map-tips-and-tricks"
      },
      {
        title: "Mapa Coroplético (Filled Map)",
        desc: "Utiliza el sombreado de colores para mostrar densidades o valores en áreas.",
        useCases: `El Mapa Coroplético (Filled Map) no usa burbujas; rellena la forma del área geográfica (país, estado, provincia) con color. La intensidad del color indica el valor de la métrica.
        
        Este visual es la elección correcta para análisis políticos, económicos o demográficos a nivel macro, donde los límites territoriales son importantes. Por ejemplo, mostrar resultados electorales por estado o densidad de población por provincia.
        
        Evita usarlo si tus áreas geográficas varían drásticamente en tamaño pero no en importancia. Un estado grande geográficamente pero con pocas ventas dominará visualmente sobre un estado pequeño pero muy rentable, distorsionando la percepción de los datos.`,
        tips: [
          "Ideal para comparar regiones definidas (Países, Estados, Provincias) mediante escalas de color.",
          "En el examen: Úsalo para 'comparar datos agregados por regiones geográficas estandarizadas'.",
          "No funciona bien para puntos específicos (ciudades o direcciones); para eso usa el Mapa estándar.",
          "Asegúrate de que tus nombres de regiones coincidan con los estándares de Bing Maps o usa códigos ISO de países para evitar errores de mapeo.",
          "El formato condicional de colores es vital aquí: usa colores divergentes (Rojo-Verde) si estás mostrando rendimiento positivo/negativo."
        ],
        image: "/visuals/filled_map.png",
        learnUrl: "https://learn.microsoft.com/es-es/power-bi/visuals/power-bi-visualization-filled-maps-choropleths"
      }
    ],
    tablas: [
      {
        title: "Tabla (Table)",
        desc: "Cuadrícula de filas y columnas para mostrar datos detallados precisos.",
        useCases: `La Tabla es el visual de elección cuando la precisión de los datos individuales supera la importancia de las tendencias agregadas. Aunque menos visual que un gráfico, es fundamental para usuarios operativos que necesitan ver el detalle exacto línea por línea, como un listado de facturas vencidas, inventario por SKU o transacciones detalladas.
        
        A pesar de su aparente simplicidad, la Tabla en Power BI es altamente interactiva. Admite ordenamiento por cualquier columna, totales automáticos y, crucialmente, 'Formato Condicional'. Puedes enriquecer una tabla simple añadiendo barras de datos, iconos de semáforo o escalas de color de fondo a las celdas numéricas, creando un híbrido que ofrece tanto el detalle preciso de los números como pistas visuales rápidas sobre el rendimiento.`,
        tips: [
          "A diferencia de la Matriz, la Tabla es plana (sin jerarquía de filas).",
          "Soporta totales automáticos al pie.",
          "Cuidado con el rendimiento: no intentes mostrar 1 millón de filas.",
          "Es el formato por defecto cuando creas un visual arrastrando campos sin elegir tipo."
        ],
        image: "/visuals/table.png",
        learnUrl: "https://learn.microsoft.com/es-es/power-bi/visuals/power-bi-visualization-tables"
      },
      {
        title: "Matriz (Matrix)",
        desc: "Una tabla dinámica potente con capacidades de agrupación y drill-down.",
        useCases: `La Matriz es mucho más que una simple hoja de cálculo. Es el equivalente en Power BI a las Tablas Dinámicas (Pivot Tables) de Excel. Su superpoder es la jerarquía: permite agrupar filas y columnas para resumir datos a diferentes niveles.
        
        Permite a los usuarios hacer 'Drill Down' (profundizar). Pueden ver las ventas por Año, hacer clic en el botón '+', y expandir para ver Trimestres, y luego Meses, todo dentro del mismo espacio visual.
        
        Además, la Matriz soporta 'Micrográficos' o iconos a través del formato condicional. Puedes insertar barras de datos, semáforos o flechas de tendencia directamente en las celdas numéricas, convirtiendo una tabla aburrida en un tablero de control denso y rico en información visual.`,
        tips: [
          "A diferencia de la Tabla simple, la Matriz permite el 'Drill Down' (navegación jerárquica) en filas y columnas.",
          "En el examen PL-300: Si necesitas mostrar un formato tipo 'Tabla Dinámica' o 'Pivot Table', la Matriz es la respuesta.",
          "Usa la función 'Valores en filas' para crear reportes financieros estructurados donde las métricas son filas en lugar de columnas.",
          "El 'Stepped Layout' (Diseño escalonado) es una propiedad de formato clave que cambia cómo se ven las sub-filas (indentadas vs columnas separadas).",
          "Es el visual que mejor exporta a Excel manteniendo cierta estructura de datos para usuarios que insisten en descargar los datos."
        ],
        image: "/visuals/matrix.png",
        learnUrl: "https://learn.microsoft.com/es-es/power-bi/visuals/power-bi-visualization-matrix-visual"
      }
    ],
    interactividad: [
      {
        title: "Segmentador (Slicer)",
        desc: "Control interactivo para filtrar datos en el lienzo del informe.",
        useCases: `Los Segmentadores (Slicers) son los controles remotos de tu dashboard. Permiten al usuario final personalizar lo que está viendo (filtrar por año, por país, por categoría) sin necesidad de entrar a menús laterales complejos.
        
        Son extremadamente versátiles en diseño. Pueden ser listas verticales, menús desplegables (para ahorrar espacio), botones horizontales (tipo 'Tiles') o rangos deslizantes para fechas y números.
        
        Una función avanzada vital es la 'Sincronización de Segmentadores'. Puedes configurar un slicer en la portada para que, cuando el usuario seleccione '2023', ese filtro se aplique automáticamente a todas las demás páginas del reporte, manteniendo la continuidad del análisis.`,
        tips: [
          "Los Segmentadores de Jerarquía permiten filtrar múltiples niveles (ej. Año > Mes) en un solo objeto visual, ahorrando mucho espacio.",
          "En el examen: Recuerda que los slicers se pueden 'Sincronizar' para afectar a múltiples páginas simultáneamente.",
          "No pueden usar medidas métricas como campo de filtro, solo columnas calculadas o dimensiones de datos.",
          "Usa la orientación 'Horizontal' para convertir un slicer en una barra de botones de navegación moderna.",
          "El panel 'Selección' te permite ocultar slicers y mostrarlos solo mediante marcadores (bookmarks) para crear menús de filtros personalizados desplegables."
        ],
        image: "/visuals/slicer.png",
        learnUrl: "https://learn.microsoft.com/es-es/power-bi/visuals/power-bi-visualization-slicers"
      }
    ]
  };

  // Flatten charts for easier navigation and search
  const allCharts = Object.values(chartLibrary).flat();

  const renderContent = () => {
    const currentIndex = selectedChart ? allCharts.findIndex(c => c.title === selectedChart.title) : -1;

    const handlePrevious = () => {
      if (currentIndex > 0) {
        setSelectedChart(allCharts[currentIndex - 1]);
      }
    };

    const handleNext = () => {
      if (currentIndex < allCharts.length - 1) {
        setSelectedChart(allCharts[currentIndex + 1]);
      }
    };

    if (selectedChart) {
      return (
        <VisualDetail
          chart={selectedChart}
          onBack={() => setSelectedChart(null)}
          onPrevious={currentIndex > 0 ? handlePrevious : null}
          onNext={currentIndex < allCharts.length - 1 ? handleNext : null}
        />
      );
    }

    switch (activeTab) {
      case 'home':
        return <Hero onExplore={() => setActiveTab('catalog')} allCharts={allCharts} onSelectChart={setSelectedChart} />;
      case 'catalog':
        return (
          <Gallery
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            chartLibrary={chartLibrary}
            onSelectChart={setSelectedChart}
          />
        );
      case 'legal':
        return (
          <div className="p-8 max-w-4xl mx-auto bg-background-card border border-white/5 rounded-xl mt-8">
            <button onClick={() => setActiveTab('home')} className="mb-6 text-primary hover:text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">arrow_back</span> Volver
            </button>
            <LegalNotice />
          </div>
        );
      case 'privacy':
        return (
          <div className="p-8 max-w-4xl mx-auto bg-background-card border border-white/5 rounded-xl mt-8">
            <button onClick={() => setActiveTab('home')} className="mb-6 text-primary hover:text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">arrow_back</span> Volver
            </button>
            <PrivacyPolicy />
          </div>
        );
      case 'cookies':
        return (
          <div className="p-8 max-w-4xl mx-auto bg-background-card border border-white/5 rounded-xl mt-8">
            <button onClick={() => setActiveTab('home')} className="mb-6 text-primary hover:text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">arrow_back</span> Volver
            </button>
            <CookiesPolicy />
          </div>
        );
      case 'podcasts':
        if (selectedPodcast) {
          return (
            <PodcastDetail
              podcast={selectedPodcast}
              onBack={handleBackToPodcasts}
              onTagSelect={handleTagSelect}
            />
          );
        }
        return (
          <PodcastList
            podcasts={podcasts}
            onSelectPodcast={handlePodcastSelect}
            selectedTag={selectedTag}
            onSelectTag={handleTagSelect}
          />
        );
      default:
        // Fallback
        return <Hero onExplore={() => setActiveTab('catalog')} allCharts={allCharts} onSelectChart={setSelectedChart} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-100 flex font-sans selection:bg-primary selection:text-black">
      <Sidebar activeTab={activeTab} setActiveTab={(tab) => { setActiveTab(tab); setSelectedChart(null); }} />

      <main className="flex-1 min-w-0 flex flex-col">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between p-4 bg-sidebar-dark border-b border-white/5 sticky top-0 z-40 backdrop-blur-md bg-opacity-90">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Logo" className="w-8 h-8 rounded-lg object-cover" />
            <h1 className="font-display font-bold text-lg text-white">POWER BI <span className="text-primary">MAX</span></h1>
          </div>
          <button onClick={() => setActiveTab('home')} className="p-2 text-slate-300">
            <Menu />
          </button>
        </header>

        {/* Content Area */}
        <div className="flex-1">
          {renderContent()}
        </div>

        {/* Footer */}
        <footer className="px-6 lg:px-40 py-10 border-t border-white/5 bg-background-dark/50 text-center md:text-left">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2 text-slate-400">
              <span className="material-symbols-outlined text-sm">copyright</span>
              <span className="text-sm">2026 POWER BI MAX. Todos los derechos reservados.</span>
            </div>
            <div className="flex gap-6">
              <button onClick={() => { setActiveTab('legal'); setSelectedChart(null); window.scrollTo(0, 0); }} className="text-slate-400 hover:text-primary transition-colors text-sm">Aviso Legal</button>
              <button onClick={() => { setActiveTab('privacy'); setSelectedChart(null); window.scrollTo(0, 0); }} className="text-slate-400 hover:text-primary transition-colors text-sm">Privacidad</button>
              <button onClick={() => { setActiveTab('cookies'); setSelectedChart(null); window.scrollTo(0, 0); }} className="text-slate-400 hover:text-primary transition-colors text-sm">Cookies</button>
            </div>
          </div>
        </footer>

        {/* Mobile Nav */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-sidebar-dark/95 backdrop-blur-xl border-t border-white/10 p-4 flex justify-around z-50">
          <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center gap-1 ${activeTab === 'home' ? 'text-primary' : 'text-slate-500'}`}>
            <span className="material-symbols-outlined">home</span>
            <span className="text-[10px] uppercase font-bold">Inicio</span>
          </button>
          <button onClick={() => setActiveTab('catalog')} className={`flex flex-col items-center gap-1 ${activeTab === 'catalog' ? 'text-primary' : 'text-slate-500'}`}>
            <span className="material-symbols-outlined">bar_chart</span>
            <span className="text-[10px] uppercase font-bold">Visuales</span>
          </button>
          <button onClick={() => setActiveTab('podcasts')} className={`flex flex-col items-center gap-1 ${activeTab === 'podcasts' ? 'text-primary' : 'text-slate-500'}`}>
            <span className="material-symbols-outlined">podcasts</span>
            <span className="text-[10px] uppercase font-bold">Podcasts</span>
          </button>
        </nav>
      </main>
    </div>
  );
};

export default App;
