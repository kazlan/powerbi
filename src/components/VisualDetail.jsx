import React from 'react';

const VisualDetail = ({ chart, onBack, onPrevious, onNext }) => {
    if (!chart) return null;

    return (
        <div className="p-4 md:p-8 lg:p-12 max-w-[1600px] mx-auto animate-in slide-in-from-right-10 duration-500">
            {/* Breadcrumbs */}
            <div className="flex flex-wrap items-center gap-2 mb-8">
                <button onClick={onBack} className="text-slate-400 text-sm font-medium hover:text-primary">Galería</button>
                <span className="material-symbols-outlined text-slate-600 text-sm">chevron_right</span>
                <span className="text-white text-sm font-semibold">{chart.title}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-8 space-y-8">
                    <div className="bg-background-card rounded-xl border border-white/5 overflow-hidden shadow-xl">
                        <div className="p-6 border-b border-white/5 flex justify-between items-center">
                            <h3 className="font-bold text-white flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">analytics</span>
                                Vista Previa
                            </h3>
                        </div>
                        <div className="p-8 h-80 bg-[#0B1120] relative flex items-center justify-center">
                            <div className="w-full h-full flex items-center justify-center">
                                {chart.image ? (
                                    <img
                                        src={chart.image}
                                        alt={chart.title}
                                        className="w-full h-full object-contain rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="w-3/4 h-3/4">
                                        {chart.svg}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-4">
                        <h2 className="text-white text-2xl font-bold">Guía Técnica</h2>
                        <p className="text-slate-400 leading-relaxed">
                            {chart.useCases}
                        </p>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-background-card rounded-xl border border-white/5 p-6 space-y-8 sticky top-24">
                        <div>
                            <h4 className="text-primary text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">verified</span>
                                Tip de Certificación
                            </h4>
                            <p className="text-sm text-slate-300">
                                {chart.tips}
                            </p>
                        </div>

                        <div className="pt-6 border-t border-white/5">
                            <h4 className="text-primary text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">download</span>
                                Recursos
                            </h4>
                            <a
                                href={chart.learnUrl || "https://learn.microsoft.com/es-es/power-bi/visuals/"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 p-4 w-full bg-primary rounded-lg text-background-dark hover:brightness-105 transition-all shadow-lg group"
                            >
                                <div className="bg-background-dark/10 p-2 rounded">
                                    <span className="material-symbols-outlined">description</span>
                                </div>
                                <div className="flex flex-col text-left">
                                    <span className="font-bold text-sm">Documentación</span>
                                    <span className="text-[10px] opacity-80 uppercase font-semibold">Microsoft Learn</span>
                                </div>
                            </a>
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex gap-4 pt-4">
                            <button
                                onClick={onPrevious}
                                disabled={!onPrevious}
                                className={`flex-1 py-3 rounded-lg border border-white/10 font-bold text-sm flex items-center justify-center gap-2 transition-all ${onPrevious ? 'bg-white/5 hover:bg-white/10 text-white cursor-pointer' : 'opacity-30 cursor-not-allowed text-slate-500'}`}
                            >
                                <span className="material-symbols-outlined text-base">arrow_back</span>
                                Anterior
                            </button>
                            <button
                                onClick={onNext}
                                disabled={!onNext}
                                className={`flex-1 py-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all ${onNext ? 'cursor-pointer' : 'opacity-30 cursor-not-allowed'}`}
                            >
                                Siguiente
                                <span className="material-symbols-outlined text-base">arrow_forward</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VisualDetail;
