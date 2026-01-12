import React from 'react';

const Gallery = ({ categories, selectedCategory, setSelectedCategory, chartLibrary, onSelectChart }) => {
    const visuals = chartLibrary[selectedCategory] || [];

    return (
        <div className="p-4 md:p-8 lg:p-12 max-w-[1600px] mx-auto animate-in fade-in duration-500">
            <div className="mb-10">
                <h1 className="text-3xl font-bold mb-6 text-white">Galería de <span className="text-primary">Visuales</span></h1>

                {/* Category Filters */}
                <div className="flex flex-wrap gap-3">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            className={`px-5 py-2 rounded-full border transition-all text-sm font-medium ${selectedCategory === cat.id
                                ? 'border-primary/30 bg-primary/10 text-primary'
                                : 'border-white/10 text-slate-400 hover:border-primary/50 hover:text-white'
                                }`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {visuals.map((chart, i) => (
                    <div
                        key={i}
                        className="bg-background-card rounded-xl overflow-hidden border border-white/5 transition-all duration-300 hover:shadow-glow hover:-translate-y-1 flex flex-col group cursor-pointer"
                        onClick={() => onSelectChart(chart)}
                    >
                        {/* Visual Preview Area (Replaces Image) */}
                        <div className="aspect-video relative overflow-hidden bg-black/50 p-4 flex items-center justify-center">
                            <div className="w-full h-full opacity-80 group-hover:scale-105 transition-transform duration-500">
                                {chart.image ? (
                                    <img src={chart.image} alt={chart.title} className="w-full h-full object-cover" />
                                ) : (
                                    chart.svg
                                )}
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-background-card to-transparent"></div>
                            <span className="absolute top-3 right-3 bg-primary text-black text-[10px] font-bold px-2 py-1 rounded">PL-300</span>
                        </div>

                        <div className="p-5 flex-1 flex flex-col">
                            <h3 className="text-lg font-bold mb-2 text-white">{chart.title}</h3>
                            <p className="text-sm text-slate-400 mb-6 flex-1 line-clamp-3">{chart.desc}</p>

                            <div className="flex items-center justify-between mt-auto border-t border-white/5 pt-4">
                                <span className="text-xs text-slate-500 flex items-center gap-1">
                                    {/* Empty span to keep layout if needed, or remove completely if flex justify handles it */}
                                </span>
                                <button className="text-primary text-sm font-bold flex items-center gap-1 underline-offset-4">
                                    Explorar <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Gallery;
