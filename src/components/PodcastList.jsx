import React from 'react';
import { Play, Calendar, Clock, Filter, Sparkles } from 'lucide-react';
import SEO from './SEO';

const PodcastList = ({ podcasts, onSelectPodcast, selectedTag = 'Todos', onSelectTag }) => {
    // Defensive check
    if (!podcasts) return <div className="p-8 text-white">Cargando podcasts...</div>;



    // Extract unique tags
    const allTags = ['Todos', ...new Set(podcasts.flatMap(p => p.tags || []))];

    // Sort podcasts descending by date
    const sortedPodcasts = [...podcasts].sort((a, b) => new Date(b.date) - new Date(a.date));

    const filteredPodcasts = selectedTag === 'Todos'
        ? sortedPodcasts
        : sortedPodcasts.filter(p => p.tags?.includes(selectedTag));

    return (
        <div className="p-4 md:p-8 lg:p-12 max-w-[1800px] mx-auto animate-in fade-in duration-500">
            <SEO title="Podcasts" description="Domina Power BI con nuestros podcasts de expertos. Estrategias, actualizaciones y secretos para la certificación PL-300." />
            {/* Header */}
            <div className="mb-10">
                <h1 className="text-3xl font-bold mb-6 text-white">Galería de <span className="text-primary">Podcasts</span></h1>

                {/* Category Filters (Tags) */}
                <div className="flex flex-wrap gap-3">
                    {allTags.map(tag => (
                        <button
                            key={tag}
                            onClick={() => onSelectTag(tag)}
                            className={`px-5 py-2 rounded-full border transition-all text-sm font-medium ${selectedTag === tag
                                ? 'border-primary/30 bg-primary/10 text-primary'
                                : 'border-white/10 text-slate-400 hover:border-primary/50 hover:text-white'
                                }`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Content: Podcast Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                                loading="lazy"
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

                            <div className="relative overflow-hidden rounded-lg bg-white/5 p-[1px] group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-emerald-500 transition-colors duration-500 mt-auto">
                                <div className="bg-background-card px-4 py-2 rounded-lg flex items-center justify-center text-slate-300 text-sm font-bold group-hover:text-white transition-colors">
                                    Escuchar Episodio <span className="material-symbols-outlined text-sm ml-2 group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PodcastList;
