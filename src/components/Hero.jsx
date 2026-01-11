import React, { useState, useEffect, useRef } from 'react';

const Hero = ({ onExplore, allCharts = [], onSelectChart }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const searchRef = useRef(null);

    // Close search results when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowResults(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query.trim().length > 0) {
            const filtered = allCharts.filter(chart => {
                const term = query.toLowerCase();
                return (
                    chart.title.toLowerCase().includes(term) ||
                    chart.desc.toLowerCase().includes(term) ||
                    (chart.tips && chart.tips.toLowerCase().includes(term)) ||
                    (chart.useCases && chart.useCases.toLowerCase().includes(term))
                );
            });
            setSearchResults(filtered);
            setShowResults(true);
        } else {
            setSearchResults([]);
            setShowResults(false);
        }
    };

    const handleSelectResult = (chart) => {
        if (onSelectChart) {
            onSelectChart(chart);
        }
        setSearchQuery('');
        setShowResults(false);
    };

    return (
        <div className="p-4 md:p-8 lg:p-12 max-w-[1600px] mx-auto animate-in fade-in duration-700">
            {/* Header Inside Main (Desktop) */}
            <div className="hidden md:flex items-center justify-between mb-12">
                <div>
                    <h1 className="font-display font-bold text-3xl tracking-tight text-white flex items-center gap-2">
                        ULTIMATE <span className="text-gradient-primary">POWER BI</span>
                    </h1>
                    <p className="text-sm font-medium text-slate-400 mt-1">La plataforma líder para el storytelling de datos</p>
                </div>
                <div className="flex items-center gap-6">
                    <div className="relative hidden lg:block group z-50" ref={searchRef}>
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors" aria-hidden="true">search</span>
                        <input
                            className="bg-[#151e32] border border-white/10 rounded-full py-2.5 pl-10 pr-6 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-primary/50 focus:border-primary/50 outline-none w-72 transition-all relative z-20"
                            placeholder="Buscar visuales, patrones, funciones..."
                            aria-label="Buscar visuales Power BI"
                            type="text"
                            value={searchQuery}
                            onChange={handleSearch}
                            onFocus={() => { if (searchQuery.trim().length > 0) setShowResults(true); }}
                        />

                        {/* Search Results Dropdown */}
                        {showResults && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-sidebar-dark/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden z-10 max-h-96 overflow-y-auto w-[400px] -translate-x-[64px]">
                                {searchResults.length > 0 ? (
                                    <div className="py-2">
                                        <div className="px-4 py-2 text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-white/5">
                                            Resultados ({searchResults.length})
                                        </div>
                                        {searchResults.map((result, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handleSelectResult(result)}
                                                className="w-full text-left px-4 py-3 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0 flex items-start gap-3 group"
                                            >
                                                <div className="mt-1 p-1.5 rounded-lg bg-blue-500/10 text-blue-400 group-hover:text-primary group-hover:bg-primary/10 transition-colors">
                                                    <span className="material-symbols-outlined text-sm">bar_chart</span>
                                                </div>
                                                <div>
                                                    <div className="font-bold text-slate-200 group-hover:text-white text-sm">{result.title}</div>
                                                    <div className="text-xs text-slate-500 line-clamp-1">{result.desc}</div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="p-6 text-center text-slate-500 text-sm">
                                        No se encontraron resultados para "{searchQuery}"
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    <button onClick={onExplore} className="px-8 py-2.5 rounded-full bg-primary hover:bg-primary-hover text-black text-sm font-bold shadow-glow hover:shadow-glow-strong transition-all transform hover:-translate-y-0.5 flex items-center gap-2 group">
                        Ver Galería
                        <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </button>
                </div>
            </div>

            {/* Hero Card */}
            <section className="relative rounded-[2.5rem] overflow-hidden mb-16 border border-white/5 bg-[#0f172a] shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1e1b4b] via-[#0f172a] to-black opacity-90"></div>
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] -translate-y-1/3 translate-x-1/3 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

                <div className="relative z-10 grid lg:grid-cols-2 gap-12 p-8 md:p-16 items-center min-h-[500px]">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-8">
                            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
                            Nuevos Módulos de Certificación PL-300
                        </div>
                        <h2 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl text-white mb-6 leading-[1.1] tracking-tight">
                            Domina <br />
                            <span className="text-gradient-primary">Power BI</span> Ahora
                        </h2>
                        <p className="text-lg text-slate-400 mb-10 leading-relaxed font-light">
                            Transforma datos brutos en conocimientos accionables. El recurso definitivo para profesionales que buscan dominar la limpieza de datos, DAX avanzado y técnicas de visualización premium.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <button onClick={onExplore} className="px-10 py-3 rounded-full bg-primary text-black font-bold text-lg tracking-wide hover:bg-primary-hover hover:scale-105 transition-all shadow-glow flex items-center gap-2 group">
                                Ver Galería
                                <span className="material-symbols-outlined text-2xl group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </button>
                        </div>
                    </div>

                    {/* 3D Card Visual */}
                    <div className="relative hidden lg:block h-[450px] perspective-container flex items-center justify-center">
                        <div className="card-3d relative w-[90%] h-[85%] bg-gradient-to-br from-slate-800/90 to-black/90 rounded-2xl border border-white/10 shadow-2xl z-10 flex flex-col p-5 backdrop-blur-xl">
                            <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                                <div className="w-32 h-3 bg-white/10 rounded-full"></div>
                                <div className="flex gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-5 h-full">
                                {/* Simulated Charts */}
                                <div className="col-span-2 bg-blue-500/10 rounded-xl border border-blue-500/20 p-4 relative overflow-hidden group">
                                    <div className="absolute bottom-0 left-0 right-0 h-2/3 flex items-end justify-around px-2 pb-2 gap-2">
                                        <div className="w-full bg-blue-600 h-[40%] rounded-t-sm opacity-80 shadow-[0_0_15px_rgba(37,99,235,0.3)]"></div>
                                        <div className="w-full bg-blue-500 h-[70%] rounded-t-sm opacity-90 shadow-[0_0_15px_rgba(59,130,246,0.3)]"></div>
                                        <div className="w-full bg-primary h-[50%] rounded-t-sm opacity-100 shadow-[0_0_15px_rgba(255,193,7,0.3)]"></div>
                                        <div className="w-full bg-blue-600 h-[85%] rounded-t-sm opacity-80 shadow-[0_0_15px_rgba(37,99,235,0.3)]"></div>
                                    </div>
                                </div>
                                <div className="bg-primary/5 rounded-xl border border-primary/20 p-4 flex flex-col items-center justify-center gap-3">
                                    <div className="w-20 h-20 rounded-full border-[6px] border-slate-700 border-t-primary"></div>
                                    <div className="text-center">
                                        <div className="text-xs text-slate-400 uppercase tracking-widest">Progreso</div>
                                        <div className="text-xl font-bold text-white">85%</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Floating Card */}
                        <div className="absolute -bottom-6 -left-4 w-52 h-36 glass-card rounded-2xl transform rotate-y-[-5deg] rotate-z-[3deg] z-20 p-5 flex flex-col justify-between border-t border-white/20">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="p-1.5 bg-primary/20 rounded-lg">
                                        <span className="material-symbols-outlined text-primary text-sm">trending_up</span>
                                    </div>
                                    <span className="text-xs font-bold text-white">Crecimiento</span>
                                </div>
                                <span className="text-[10px] text-green-400 font-mono">+12.5%</span>
                            </div>
                            <div>
                                <div className="text-3xl font-black text-white mb-1">2,450</div>
                                <div className="text-[10px] text-slate-400">Usuarios Activos</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Hero;
