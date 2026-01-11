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

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('comparacion');

  const categories = [
    {
      id: 'comparacion', name: 'Comparación', icon:
        <BarChart3 size={18} />, color: 'bg-blue-600'
    },
    {
      id: 'tiempo', name: 'Tendencias', icon:
        <TrendingUp size={18} />, color: 'bg-emerald-600'
    },
    {
      id: 'composicion', name: 'Composición', icon:
        <PieChart size={18} />, color: 'bg-teal-600'
    },
    {
      id: 'relacion', name: 'Relación', icon:
        <Share2 size={18} />, color: 'bg-cyan-600'
    },
    {
      id: 'kpi', name: 'KPIs/Cards', icon:
        <Target size={18} />, color: 'bg-purple-600'
    },
    {
      id: 'mapas', name: 'Mapas', icon:
        <Globe size={18} />, color: 'bg-amber-600'
    },
    {
      id: 'ai', name: 'IA Avanzada', icon:
        <Cpu size={18} />, color: 'bg-rose-600'
    },
    {
      id: 'tablas', name: 'Tabulares', icon:
        <TableIcon size={18} />, color: 'bg-slate-700'
    },
    {
      id: 'interactividad', name: 'Filtros/UX', icon:
        <Filter size={18} />, color: 'bg-orange-600'
    }
  ];

  const chartLibrary = {
    comparacion: [
      {
        title: "Barras y Columnas (Estándar)",
        desc: "Compara valores entre categorías discretas.",
        useCases: "Es el visual por excelencia para mostrar ventas por vendedor o ingresos por región. Permite una comparación rápida de magnitudes. Las barras horizontales son ideales cuando los nombres de las categorías son largos, facilitando la lectura sin inclinar la cabeza.",
        tips: "En el examen, si te piden comparar más de 10 elementos, elige Barras Horizontales para habilitar el scroll vertical. No olvides que puedes usar 'Barras de Error' para mostrar intervalos de confianza, algo muy valorado en análisis estadísticos.",
        svg: <svg viewBox="0 0 100 60" className="w-full h-32 bg-blue-50 rounded-2xl p-4">
          <rect x="10" y="30" width="15" height="25" fill="#2563eb" />
          <rect x="30" y="10" width="15" height="45" fill="#2563eb" />
          <rect x="50" y="20" width="15" height="35" fill="#2563eb" />
          <rect x="70" y="40" width="15" height="15" fill="#2563eb" />
        </svg>
      },
      {
        title: "Gráfico de Embudo (Funnel)",
        desc: "Visualiza etapas de un proceso que se reducen progresivamente.",
        useCases: "Indispensable para el seguimiento de procesos de venta (Prospecto > Oferta > Cierre) o flujos de contratación. Ayuda a identificar en qué etapa específica se están perdiendo más oportunidades (cuellos de botella).",
        tips: "El gráfico de embudo en Power BI calcula automáticamente el % del primero (etapa inicial) y el % del anterior. En el examen, es la respuesta correcta para 'visualizar la retención en un flujo de trabajo'.",
        svg: <svg viewBox="0 0 100 60" className="w-full h-32 bg-blue-50 rounded-2xl p-4">
          <path d="M10,10 L90,10 L75,25 L25,25 Z" fill="#2563eb" />
          <path d="M28,28 L72,28 L60,40 L40,40 Z" fill="#3b82f6" />
          <path d="M43,43 L57,43 L53,53 L47,53 Z" fill="#60a5fa" />
        </svg>
      }
    ],
    tiempo: [
      {
        title: "Gráfico de Áreas",
        desc: "Similar al de líneas pero con el espacio bajo la línea sombreado.",
        useCases: "Se utiliza para enfatizar la magnitud del cambio a lo largo del tiempo, no solo la tendencia. Es excelente para mostrar el volumen acumulado de ventas o la cantidad de stock disponible durante un año.",
        tips: "Cuidado con el 'Área Apilada': si tienes muchas series, las de abajo pueden distorsionar la percepción de las de arriba. En el examen, usa el gráfico de áreas si el cliente quiere ver la 'magnitud total del volumen' además de la progresión temporal.",
        svg: <svg viewBox="0 0 100 60" className="w-full h-32 bg-emerald-50 rounded-2xl p-4">
          <path d="M10,50 L30,30 L50,45 L70,10 L90,30 L90,55 L10,55 Z" fill="#10b981" fillOpacity="0.3" stroke="#059669" strokeWidth="2" />
        </svg>
      }
    ],
    composicion: [
      {
        title: "Circular y Anillo (Pie & Donut)",
        desc: "Muestra la relación de las partes con el todo.",
        useCases: "Ideal para proporciones muy simples, como el desglose por género (Hombre/Mujer) o estado de pedido (Completado/Pendiente). El gráfico de anillo es preferido modernamente porque permite colocar un KPI o texto en el centro (hueco).",
        tips: "Regla de oro PL-300: Nunca lo uses para más de 3 o 4 categorías. El ojo humano tiene dificultades comparando áreas circulares; si tienes más de 4 elementos, la respuesta correcta siempre será un gráfico de Barras o un Treemap.",
        svg: <svg viewBox="0 0 100 60" className="w-full h-32 bg-teal-50 rounded-2xl p-4">
          <circle cx="50" cy="30" r="20" fill="none" stroke="#14b8a6" strokeWidth="10" strokeDasharray="80 125.6" />
        </svg>
      }
    ],
    kpi: [
      {
        title: "Tarjeta de varias filas (Multi-row Card)",
        desc: "Muestra varios campos de datos agrupados en una sola tarjeta vertical u horizontal.",
        useCases: "Útil cuando quieres mostrar una ficha técnica de un producto o un resumen de métricas para una entidad específica (ej. Nombre del Vendedor, su Total Ventas, su % de Objetivo y su Región).",
        tips: "Es más eficiente en términos de rendimiento que poner 4 o 5 tarjetas individuales. En el examen, si necesitas mostrar 'varias métricas relacionadas' de forma compacta para un solo filtro, esta es la mejor opción.",
        svg: <div className="w-full h-32 bg-purple-50 rounded-2xl p-4 flex flex-col gap-2 justify-center">
          <div className="border-l-4 border-purple-500 pl-2">
            <div className="w-12 h-2 bg-purple-200 mb-1"></div>
            <div className="w-20 h-3 bg-purple-600"></div>
          </div>
          <div className="border-l-4 border-purple-300 pl-2">
            <div className="w-12 h-2 bg-purple-200 mb-1"></div>
            <div className="w-16 h-3 bg-purple-400"></div>
          </div>
        </div>
      }
    ],
    ai: [
      {
        title: "Preguntas y Respuestas (Q&A)",
        desc: "Permite a los usuarios hacer preguntas sobre sus datos usando lenguaje natural.",
        useCases: "Permite que usuarios no técnicos escriban 'Ventas por región en 2023' y Power BI genere automáticamente el visual correspondiente. Mejora drásticamente la capacidad de auto-servicio del reporte.",
        tips: "Para que funcione bien, debes 'entrenar' el modelo con sinónimos en el panel de modelado. En el examen, es la respuesta para 'mejorar la accesibilidad y el descubrimiento de insights por parte de usuarios finales'.",
        svg: <div className="w-full h-32 bg-rose-50 rounded-2xl p-4 flex items-center justify-center gap-2">
          <MessageSquare className="text-rose-500" size={32} />
          <div className="bg-white p-2 rounded-lg shadow-sm text-[10px] text-slate-400 italic">"Top 5 productos por..."</div>
        </div>
      },
      {
        title: "Narrativa Inteligente (Smart Narrative)",
        desc: "Genera automáticamente un resumen escrito de los datos del reporte.",
        useCases: "Ideal para ejecutivos que prefieren leer una conclusión que interpretar gráficos. Proporciona contexto dinámico: si las ventas bajan, el texto cambia automáticamente para explicar cuánto bajaron y en qué categoría.",
        tips: "Puedes insertar tus propias medidas dinámicas dentro del texto. En el examen, es la opción para 'proporcionar resúmenes textuales automáticos' que se actualizan con los filtros.",
        svg: <div className="w-full h-32 bg-rose-50 rounded-2xl p-4 space-y-2">
          <FileText className="text-rose-500" size={24} />
          <div className="w-full h-2 bg-rose-200 rounded"></div>
          <div className="w-2/3 h-2 bg-rose-100 rounded"></div>
          <div className="w-5/6 h-2 bg-rose-200 rounded"></div>
        </div>
      }
    ],
    interactividad: [
      {
        title: "Segmentador (Slicer)",
        desc: "Filtro interactivo colocado directamente en el lienzo del reporte.",
        useCases: "Permite a los usuarios filtrar dinámicamente por fecha, categoría o región. Puede presentarse como lista, menú desplegable, o una barra de tiempo deslizante.",
        tips: "Puedes sincronizar segmentadores entre diferentes páginas del reporte. En el examen, recuerda que los segmentadores de tipo 'Jerarquía' permiten ahorrar mucho espacio al agrupar niveles como Año > Mes.",
        svg: <div className="w-full h-32 bg-orange-50 rounded-2xl p-4 flex flex-col justify-center gap-2">
          <div className="w-full h-8 bg-white border border-orange-200 rounded-lg flex items-center px-2 justify-between">
            <div className="w-12 h-2 bg-orange-100"></div>
            <ChevronRight size={12} className="text-orange-300" />
          </div>
          <div className="flex gap-2">
            <div className="w-1/3 h-6 bg-orange-500 rounded-lg"></div>
            <div className="w-1/3 h-6 bg-white border border-orange-200 rounded-lg"></div>
          </div>
        </div>
      }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-24">
      {/* Header Sticky */}
      <header className="bg-slate-900 text-white p-5 sticky top-0 z-50 flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-3">
          <div className="bg-amber-500 p-2 rounded-xl shadow-lg">
            <Database size={20} className="text-slate-900" />
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tighter leading-none">PL-300 <span
              className="text-amber-500 italic uppercase">Ultimate</span></h1>
            <p className="text-[8px] font-bold text-slate-500 uppercase tracking-[0.3em] mt-1">Enciclopedia de
              Visualización</p>
          </div>
        </div>
        <button className="bg-slate-800 p-2.5 rounded-xl border border-slate-700 active:bg-slate-700">
          <Menu size={20} />
        </button>
      </header>

      <main className="max-w-md mx-auto p-4 space-y-6">

        {activeTab === 'home' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div
              className="bg-gradient-to-br from-indigo-700 to-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl"></div>
              <h2 className="text-2xl font-black mb-2">Manual de Estilo</h2>
              <p className="text-indigo-100 text-sm leading-relaxed mb-6 italic opacity-80">
                "El éxito en el PL-300 depende de tu capacidad para elegir el visual que responda a la pregunta del
                negocio con el menor número de clics."
              </p>
              <div className="flex gap-2">
                <span
                  className="bg-white/10 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border border-white/10">Full
                  Palette</span>
                <span
                  className="bg-amber-500 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest text-slate-900 shadow-lg">Certificación</span>
              </div>
            </div>

            <section>
              <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4 ml-2">Explorar la
                Paleta Estándar</h3>
              <div className="grid grid-cols-3 gap-3">
                {categories.map(cat => (
                  <button key={cat.id} onClick={() => { setSelectedCategory(cat.id); setActiveTab('catalog'); }}
                    className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center
                            gap-2 active:scale-95 transition-all hover:border-indigo-500 group"
                  >
                    <div className={`${cat.color} p-3 rounded-2xl text-white shadow-lg group-hover:scale-110
                                transition-transform`}>{cat.icon}</div>
                    <span
                      className="text-[9px] font-black uppercase tracking-tighter text-slate-600 text-center leading-none">{cat.name}</span>
                  </button>
                ))}
              </div>
            </section>

            <div
              className="bg-emerald-50 border border-emerald-100 p-6 rounded-[2.5rem] shadow-sm flex items-start gap-4">
              <div className="bg-white p-3 rounded-2xl text-emerald-600 shadow-sm">
                <Activity size={24} />
              </div>
              <div>
                <h4 className="text-sm font-black uppercase tracking-widest mb-1 text-emerald-800">Accesibilidad
                </h4>
                <p className="text-[11px] text-emerald-700 leading-relaxed italic">
                  "Usa paletas aptas para daltónicos y añade siempre 'Alt Text' a tus visuales. Microsoft valora
                  mucho los reportes inclusivos en el examen."
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'catalog' && (
          <div className="space-y-6 animate-in slide-in-from-right-10 duration-500 pb-10">
            <div className="flex items-center justify-between px-2">
              <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">
                {categories.find(c => c.id === selectedCategory)?.name}
              </h2>
              <button onClick={() => setActiveTab('home')} className="text-xs font-black text-white bg-slate-900 px-4
                        py-2 rounded-2xl shadow-lg">Cerrar</button>
            </div>

            <div className="space-y-6">
              {(chartLibrary[selectedCategory] || []).map((chart, i) => (
                <div key={i}
                  className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all">
                  <div className="p-2">
                    {chart.svg}
                  </div>
                  <div className="p-8 pt-4">
                    <h3 className="text-2xl font-black text-slate-900 mb-4 leading-none">{chart.title}</h3>

                    <div className="space-y-6">
                      <section>
                        <p
                          className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-2 flex items-center gap-2">
                          <Target size={14} className="text-indigo-400" /> Contexto de Negocio
                        </p>
                        <p className="text-sm text-slate-600 leading-relaxed font-medium">
                          {chart.useCases}
                        </p>
                      </section>

                      <section className="bg-slate-900 text-white p-7 rounded-[2.2rem] relative overflow-hidden">
                        <div className="absolute -right-5 -top-5 opacity-10">
                          <Zap size={100} />
                        </div>
                        <p
                          className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                          <Zap size={14} /> Tip de Certificación
                        </p>
                        <p className="text-xs text-slate-300 leading-relaxed italic relative z-10">
                          {chart.tips}
                        </p>
                      </section>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* FIXED MOBILE BAR NAV */}
      <nav
        className="fixed bottom-6 left-6 right-6 bg-slate-900/95 backdrop-blur-xl text-white p-3 rounded-[2.5rem] flex justify-around items-center z-50 shadow-2xl border border-white/10">
        <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center gap-1 transition-all
                ${activeTab === 'home' ? 'text-amber-500 scale-110' : 'text-slate-400'}`}>
          <Layout size={20} /> <span className="text-[8px] font-black uppercase tracking-widest">Home</span>
        </button>
        <button onClick={() => setActiveTab('catalog')} className={`flex flex-col items-center gap-1 transition-all
                ${activeTab === 'catalog' ? 'text-amber-500 scale-110' : 'text-slate-400'}`}>
          <Layers size={20} /> <span className="text-[8px] font-black uppercase tracking-widest">Paleta</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-slate-400">
          <Smartphone size={20} /> <span className="text-[8px] font-black uppercase tracking-widest">Guía</span>
        </button>
      </nav>
    </div>
  );
};

export default App;
