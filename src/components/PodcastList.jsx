import React from 'react';
import { Play, Calendar, Clock } from 'lucide-react';

const PodcastList = ({ podcasts, onSelectPodcast }) => {
    const [selectedTag, setSelectedTag] = React.useState('Todos');

    // Extract unique tags
    const allTags = ['Todos', ...new Set(podcasts.flatMap(p => p.tags || []))];

    const filteredPodcasts = selectedTag === 'Todos'
        ? podcasts
        : podcasts.filter(p => p.tags?.includes(selectedTag));

    return (
        <div className="p-4 md:p-8 lg:p-12 max-w-[1600px] mx-auto animate-in fade-in duration-500">
            <div className="mb-10 text-center md:text-left">
                <h1 className="text-3xl font-bold mb-4 text-white">Podcasts <span className="text-primary">PL-300</span></h1>
                <p className="text-slate-400 max-w-2xl mb-8">
                    Escucha a expertos discutir temas clave, actualizaciones y estrategias para dominar Power BI.
                    Aprende mientras viajas, haces ejercicio o simplemente descansas la vista.
                </p>

                {/* Filter Tags */}
                <div className="flex flex-wrap gap-2">
                    {allTags.map(tag => (
                        <button
                            key={tag}
                            onClick={() => setSelectedTag(tag)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${selectedTag === tag
                                    ? 'bg-primary text-black border-primary'
                                    : 'bg-white/5 text-slate-400 border-white/10 hover:border-primary/50 hover:text-white'
                                }`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPodcasts.map((podcast) => (
                    <div
                        key={podcast.id}
                        onClick={() => onSelectPodcast(podcast)}
                        className="group bg-background-card border border-white/5 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-glow cursor-pointer flex flex-col"
                    >
                        {/* Thumbnail */}
                        <div className="relative aspect-video overflow-hidden">
                            <img
                                src={podcast.thumbnail}
                                alt={podcast.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-black shadow-lg shadow-primary/50 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    <Play fill="currentColor" size={24} />
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 flex-1 flex flex-col">
                            <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                                <span className="flex items-center gap-1">
                                    <Calendar size={14} />
                                    {new Date(podcast.date).toLocaleDateString()}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Clock size={14} />
                                    {podcast.duration}
                                </span>
                            </div>

                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                                {podcast.title}
                            </h3>

                            {/* Tags in card */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                {podcast.tags?.slice(0, 3).map(tag => (
                                    <span key={tag} className="text-[10px] uppercase font-bold text-primary/80 bg-primary/10 px-2 py-1 rounded">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <p className="text-slate-400 text-sm line-clamp-3 mb-6 flex-1">
                                {podcast.description}
                            </p>

                            <div className="flex items-center text-primary text-sm font-bold mt-auto">
                                Escuchar ahora <span className="material-symbols-outlined text-sm ml-1 group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PodcastList;
