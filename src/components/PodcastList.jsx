import React from 'react';
import { Play, Calendar, Clock, Filter, Sparkles } from 'lucide-react';

const PodcastList = ({ podcasts, onSelectPodcast, selectedTag = 'Todos', onSelectTag }) => {
    // Defensive check
    if (!podcasts) return <div className="p-8 text-white">Cargando podcasts...</div>;



    // Extract unique tags
    const allTags = ['Todos', ...new Set(podcasts.flatMap(p => p.tags || []))];

    const filteredPodcasts = selectedTag === 'Todos'
        ? podcasts
        : podcasts.filter(p => p.tags?.includes(selectedTag));

    return (
        <div className="p-4 md:p-8 lg:p-12 max-w-[1800px] mx-auto animate-in fade-in duration-500">
            {/* Header */}
            <div className="mb-12 relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary/10 via-background-card to-background-card border border-white/5 p-8 md:p-12">
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white font-display tracking-tight">
                            Podcasts <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">PL-300</span>
                        </h1>
                        <p className="text-slate-300 text-lg max-w-2xl leading-relaxed">
                            Domina Power BI con expertos. Estrategias, actualizaciones y secretos para tu certificación.
                        </p>
                    </div>
                    <div className="p-4 bg-primary/10 rounded-full border border-primary/20 shadow-[0_0_20px_rgba(59,130,246,0.2)] animate-pulse-slow">
                        <Sparkles className="text-primary w-8 h-8" />
                    </div>
                </div>
                {/* Background decorative elements */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Main Content: Podcast Grid */}
                <div className="flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                        {filteredPodcasts.map((podcast) => (
                            <div
                                key={podcast.id}
                                onClick={() => onSelectPodcast(podcast)}
                                className="group bg-background-card/80 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] hover:-translate-y-1 cursor-pointer flex flex-col relative"
                            >
                                {/* Thumbnail */}
                                <div className="relative aspect-video overflow-hidden">
                                    <img
                                        src={podcast.thumbnail}
                                        alt={podcast.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent opacity-80"></div>

                                    {/* Play Button Overlay */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm bg-black/20">
                                        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-black shadow-[0_0_20px_rgba(59,130,246,0.6)] scale-90 group-hover:scale-100 transition-transform duration-300">
                                            <Play fill="currentColor" size={32} className="ml-1" />
                                        </div>
                                    </div>

                                    {/* Duration Badge */}
                                    <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-xs font-mono font-bold text-white flex items-center gap-1 border border-white/10">
                                        <Clock size={12} className="text-primary" />
                                        {podcast.duration}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 flex-1 flex flex-col relative z-10">
                                    <div className="flex items-center gap-2 text-xs text-primary font-bold mb-3 uppercase tracking-wider">
                                        <Calendar size={12} />
                                        {new Date(podcast.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </div>

                                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                                        {podcast.title}
                                    </h3>

                                    {/* Tags in card */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {podcast.tags?.slice(0, 3).map(tag => (
                                            <span key={tag} className="text-[10px] bg-white/5 text-slate-300 px-2 py-1 rounded border border-white/5">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <p className="text-slate-400 text-sm line-clamp-2 mb-6 flex-1 leading-relaxed">
                                        {podcast.description}
                                    </p>

                                    <div className="relative overflow-hidden rounded-lg bg-white/5 p-[1px] group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-emerald-500 transition-colors duration-500">
                                        <div className="bg-background-card px-4 py-2 rounded-lg flex items-center justify-center text-slate-300 text-sm font-bold group-hover:text-white transition-colors">
                                            Escuchar Episodio <span className="material-symbols-outlined text-sm ml-2 group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="w-full lg:w-80 space-y-8 shrink-0">
                    {/* Filter Widget */}
                    <div className="bg-background-card/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sticky top-24 shadow-lg">
                        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/5">
                            <Filter size={20} className="text-primary" />
                            <h3 className="text-lg font-bold text-white">Filtrar por temas</h3>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {allTags.map(tag => (
                                <button
                                    key={tag}
                                    onClick={() => onSelectTag(tag)}
                                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 border w-full text-left flex justify-between items-center group ${selectedTag === tag
                                        ? 'bg-primary/20 text-primary border-primary/50 shadow-[0_0_10px_rgba(59,130,246,0.15)]'
                                        : 'bg-white/5 text-slate-400 border-white/5 hover:bg-white/10 hover:text-white'
                                        }`}
                                >
                                    {tag}
                                    {selectedTag === tag && <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_5px_currentColor]"></span>}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PodcastList;
