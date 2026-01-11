import { useState } from 'react';
import {
  BarChart3, TrendingUp, Globe, Target, Activity,
  MousePointer2, CheckCircle2, AlertCircle, Info,
  ChevronRight, Layout, Layers, HelpCircle, Menu,
  Bookmark, Zap, Filter, Eye, Lightbulb, Gauge,
  PieChart, Share2, MousePointerClick, Smartphone,
  Search, Boxes, ArrowDownWideNarrow, Navigation,
  Table as TableIcon, Grid, Cpu, Database,
  MessageSquare, FileText, List
} from 'lucide-react';

// Components
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import VisualDetail from './components/VisualDetail';
import { LegalNotice, PrivacyPolicy, CookiesPolicy } from './Legal';

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('comparacion');
  const [selectedChart, setSelectedChart] = useState(null);

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
        desc: "Compara valores entre categorías discretas.",
        useCases: "Es el visual por excelencia para mostrar ventas por vendedor o ingresos por región. Permite una comparación rápida de magnitudes. Las barras horizontales son ideales cuando los nombres de las categorías son largos, facilitando la lectura sin inclinar la cabeza.",
        tips: "En el examen, si te piden comparar más de 10 elementos, elige Barras Horizontales para habilitar el scroll vertical. No olvides que puedes usar 'Barras de Error' para mostrar intervalos de confianza, algo muy valorado en análisis estadísticos.",
        image: "/visuals/bar_chart.png",
        learnUrl: "https://learn.microsoft.com/es-es/power-bi/visuals/power-bi-visualization-types-for-reports-and-q-and-a"
      },
      {
        title: "Gráfico de Embudo (Funnel)",
        desc: "Visualiza etapas de un proceso que se reducen progresivamente.",
        useCases: "Indispensable para el seguimiento de procesos de venta (Prospecto > Oferta > Cierre) o flujos de contratación. Ayuda a identificar en qué etapa específica se están perdiendo más oportunidades (cuellos de botella).",
        tips: "El gráfico de embudo en Power BI calcula automáticamente el % del primero (etapa inicial) y el % del anterior. En el examen, es la respuesta correcta para 'visualizar la retención en un flujo de trabajo'.",
        image: "/visuals/funnel_chart.png",
        learnUrl: "https://learn.microsoft.com/es-es/power-bi/visuals/power-bi-visualization-funnel-charts"
      }
    ],
    tiempo: [
      {
        title: "Gráfico de Áreas",
        desc: "Similar al de líneas pero con el espacio bajo la línea sombreado.",
        useCases: "Se utiliza para enfatizar la magnitud del cambio a lo largo del tiempo, no solo la tendencia. Es excelente para mostrar el volumen acumulado de ventas o la cantidad de stock disponible durante un año.",
        tips: "Cuidado con el 'Área Apilada': si tienes muchas series, las de abajo pueden distorsionar la percepción de las de arriba. En el examen, usa el gráfico de áreas si el cliente quiere ver la 'magnitud total del volumen' además de la progresión temporal.",
        image: "/visuals/area_chart.png",
        learnUrl: "https://learn.microsoft.com/es-es/power-bi/visuals/power-bi-visualization-basic-area-chart"
      }
    ],
    composicion: [
      {
        title: "Circular y Anillo (Pie & Donut)",
        desc: "Muestra la relación de las partes con el todo.",
        useCases: "Ideal para proporciones muy simples, como el desglose por género (Hombre/Mujer) o estado de pedido (Completado/Pendiente). El gráfico de anillo es preferido modernamente porque permite colocar un KPI o texto en el centro (hueco).",
        tips: "Regla de oro PL-300: Nunca lo uses para más de 3 o 4 categorías. El ojo humano tiene dificultades comparando áreas circulares; si tienes más de 4 elementos, la respuesta correcta siempre será un gráfico de Barras o un Treemap.",
        image: "/visuals/pie_chart.png",
        learnUrl: "https://learn.microsoft.com/es-es/power-bi/visuals/power-bi-visualization-pie-donut-charts"
      }
    ],
    kpi: [
      {
        title: "Tarjeta de varias filas (Multi-row Card)",
        desc: "Muestra varios campos de datos agrupados en una sola tarjeta vertical u horizontal.",
        useCases: "Útil cuando quieres mostrar una ficha técnica de un producto o un resumen de métricas para una entidad específica (ej. Nombre del Vendedor, su Total Ventas, su % de Objetivo y su Región).",
        tips: "Es más eficiente en términos de rendimiento que poner 4 o 5 tarjetas individuales. En el examen, si necesitas mostrar 'varias métricas relacionadas' de forma compacta para un solo filtro, esta es la mejor opción.",
        image: "/visuals/multi_row_card.png",
        learnUrl: "https://learn.microsoft.com/es-es/power-bi/visuals/power-bi-visualization-card"
      }
    ],
    ai: [
      {
        title: "Preguntas y Respuestas (Q&A)",
        desc: "Permite a los usuarios hacer preguntas sobre sus datos usando lenguaje natural.",
        useCases: "Permite que usuarios no técnicos escriban 'Ventas por región en 2023' y Power BI genere automáticamente el visual correspondiente. Mejora drásticamente la capacidad de auto-servicio del reporte.",
        tips: "Para que funcione bien, debes 'entrenar' el modelo con sinónimos en el panel de modelado. En el examen, es la respuesta para 'mejorar la accesibilidad y el descubrimiento de insights por parte de usuarios finales'.",
        image: "/visuals/q_and_a.png",
        learnUrl: "https://learn.microsoft.com/es-es/power-bi/visuals/power-bi-visualization-q-and-a"
      },
      {
        title: "Narrativa Inteligente (Smart Narrative)",
        desc: "Genera automáticamente un resumen escrito de los datos del reporte.",
        useCases: "Ideal para ejecutivos que prefieren leer una conclusión que interpretar gráficos. Proporciona contexto dinámico: si las ventas bajan, el texto cambia automáticamente para explicar cuánto bajaron y en qué categoría.",
        tips: "Puedes insertar tus propias medidas dinámicas dentro del texto. En el examen, es la opción para 'proporcionar resúmenes textuales automáticos' que se actualizan con los filtros.",
        image: "/visuals/smart_narrative.png",
        learnUrl: "https://learn.microsoft.com/es-es/power-bi/visuals/power-bi-visualization-smart-narrative"
      }
    ],
    relacion: [
      {
        title: "Gráfico de Dispersión (Scatter Chart)",
        desc: "Muestra la relación entre dos variables numéricas.",
        useCases: "Fundamental para análisis de correlación (ej. ¿Mayor gasto en marketing implica mayores ventas?). Permite identificar valores atípicos (outliers) y clusters.",
        tips: "Es el único gráfico predeterminado que acepta dos medidas numéricas (Eje X e Y). En el examen, si te piden animar datos a lo largo del tiempo, la respuesta es 'Play Axis' en un gráfico de dispersión.",
        image: "/visuals/scatter_chart.png",
        learnUrl: "https://learn.microsoft.com/es-es/power-bi/visuals/power-bi-visualization-scatter"
      }
    ],
    mapas: [
      {
        title: "Mapa (Map)",
        desc: "Muestra puntos de datos en ubicaciones geográficas.",
        useCases: "Ideal para ver la distribución de clientes o tiendas. El tamaño de la burbuja puede representar ventas.",
        tips: "Para geocodificación precisa, usa siempre categorías de datos 'Latitud' y 'Longitud'. Si usas nombres de ciudades, añade la columna 'País' para evitar ambigüedades (ej. Paris, Texas vs Paris, Francia).",
        image: "/visuals/map.png",
        learnUrl: "https://learn.microsoft.com/es-es/power-bi/visuals/power-bi-visualization-map-tips-and-tricks"
      },
      {
        title: "Mapa Coroplético (Filled Map)",
        desc: "Colorea regiones geográficas (países, estados) según un valor.",
        useCases: "Mejor opción para comparar regiones definidas, como tasas de impuestos por estado o ventas por país.",
        tips: "No es bueno para ciudades (puntos), solo para áreas. En el examen, úsalo para 'comparar métricas agregadas por regiones geográficas definidas'.",
        image: "/visuals/filled_map.png",
        learnUrl: "https://learn.microsoft.com/es-es/power-bi/visuals/power-bi-visualization-filled-maps-choropleths"
      }
    ],
    tablas: [
      {
        title: "Matriz (Matrix)",
        desc: "Tabla dinámica que permite agrupar filas y columnas.",
        useCases: "Esencial para mostrar datos jerárquicos (Año > Trimestre > Mes) y permitir al usuario expandir/colapsar (Drill Down).",
        tips: "A diferencia de la Tabla simple, la Matriz soporta 'Drill Down' en filas y columnas. Usa 'Formato Condicional' (Barra de datos, Iconos) para convertirla en un visual híbrido poderoso.",
        image: "/visuals/matrix.png",
        learnUrl: "https://learn.microsoft.com/es-es/power-bi/visuals/power-bi-visualization-matrix-visual"
      }
    ],
    interactividad: [
      {
        title: "Segmentador (Slicer)",
        desc: "Filtro interactivo colocado directamente en el lienzo del reporte.",
        useCases: "Permite a los usuarios filtrar dinámicamente por fecha, categoría o región. Puede presentarse como lista, menú desplegable, o una barra de tiempo deslizante.",
        tips: "Puedes sincronizar segmentadores entre diferentes páginas del reporte. En el examen, recuerda que los segmentadores de tipo 'Jerarquía' permiten ahorrar mucho espacio al agrupar niveles como Año > Mes.",
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
          <div className="p-8 max-w-4xl mx-auto bg-white dark:bg-card-dark rounded-xl mt-8">
            <button onClick={() => setActiveTab('home')} className="mb-6 text-primary hover:text-white">Volver</button>
            <LegalNotice />
          </div>
        );
      case 'privacy':
        return (
          <div className="p-8 max-w-4xl mx-auto bg-white dark:bg-card-dark rounded-xl mt-8">
            <button onClick={() => setActiveTab('home')} className="mb-6 text-primary hover:text-white">Volver</button>
            <PrivacyPolicy />
          </div>
        );
      case 'cookies':
        return (
          <div className="p-8 max-w-4xl mx-auto bg-white dark:bg-card-dark rounded-xl mt-8">
            <button onClick={() => setActiveTab('home')} className="mb-6 text-primary hover:text-white">Volver</button>
            <CookiesPolicy />
          </div>
        );
      default:
        // Placeholder for other tabs like 'learn' using Hero temporarily
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
            <h1 className="font-display font-bold text-lg text-white">ULTIMATE <span className="text-primary">POWER BI</span></h1>
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
              <span className="text-sm">2024 Ultimate Power BI. Todos los derechos reservados.</span>
            </div>
            <div className="flex gap-6">
              <button onClick={() => { setActiveTab('legal'); window.scrollTo(0, 0); }} className="text-slate-400 hover:text-primary transition-colors text-sm">Aviso Legal</button>
              <button onClick={() => { setActiveTab('privacy'); window.scrollTo(0, 0); }} className="text-slate-400 hover:text-primary transition-colors text-sm">Privacidad</button>
              <button onClick={() => { setActiveTab('cookies'); window.scrollTo(0, 0); }} className="text-slate-400 hover:text-primary transition-colors text-sm">Cookies</button>
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
          <button onClick={() => setActiveTab('learn')} className={`flex flex-col items-center gap-1 ${activeTab === 'learn' ? 'text-primary' : 'text-slate-500'}`}>
            <span className="material-symbols-outlined">school</span>
            <span className="text-[10px] uppercase font-bold">Aprender</span>
          </button>
        </nav>
      </main>
    </div>
  );
};

export default App;
