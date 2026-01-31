import React from 'react';
import { Play, Lock, ChevronRight, Map, Star, Clock, Calendar } from 'lucide-react';

const PodcastSeries = ({ seriesList, allPodcasts, onSelectPodcast }) => {
    if (!seriesList || seriesList.length === 0) return null;

    return (
        <div className="mb-16 space-y-12">
            {seriesList.map((serie) => (
                <div key={serie.id} className="relative">
                    {/* Section Header */}
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-gradient-to-br from-primary to-purple-600 rounded-lg shadow-lg shadow-primary/20">
                            <Map className="text-white w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white">{serie.title}</h2>
                            <p className="text-slate-400 text-sm">{serie.description}</p>
                        </div>
                    </div>

                    {/* Path Container */}
                    <div className="relative p-6 bg-white/5 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-sm">
                        {/* Connecting Line (The Path) */}
                        <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-primary/50 via-primary/20 to-transparent -translate-y-1/2 z-0 hidden md:block" />

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                            {serie.episodes.map((episode, index) => {
                                const isPublished = episode.status === 'published';
                                const podcastData = isPublished
                                    ? allPodcasts.find(p => p.id === episode.id)
                                    : null;

                                // Fallback if data missing
                                if (isPublished && !podcastData) return null;

                                return (
                                    <div
                                        key={index}
                                        className="relative group"
                                    >
                                        {/* Node Connector (Visual dot on the line) */}
                                        <div className={`hidden md:flex absolute top-1/2 -left-6 w-10 h-10 rounded-full items-center justify-center z-20 -translate-y-1/2 ring-4 ring-background-dark shadow-xl ${isPublished ? 'bg-primary text-black' : 'bg-slate-700 text-slate-400'}`}>
                                            <span className="font-bold text-sm tracking-tighter">{index + 1}</span>
                                        </div>

                                        <div
                                            className={`flex flex-col rounded-xl overflow-hidden transition-all duration-300 h-full ${isPublished
                                                ? 'cursor-pointer hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] bg-background-card border border-white/10 hover:border-primary/50'
                                                : 'opacity-70 grayscale cursor-not-allowed border border-white/5 bg-white/5'
                                                }`}
                                            onClick={() => isPublished && onSelectPodcast(podcastData)}
                                        >
                                            {/* Card Concept */}
                                            <div className="relative aspect-video w-full overflow-hidden">
                                                {isPublished ? (
                                                    <>
                                                        <img
                                                            src={podcastData.thumbnail}
                                                            alt={podcastData.title}
                                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                        />
                                                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                                                        <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur px-2 py-1 rounded text-xs font-mono text-white flex items-center gap-1">
                                                            <Clock size={12} className="text-primary" />
                                                            {podcastData.duration}
                                                        </div>
                                                    </>
                                                ) : (
                                                    <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                                                        <Lock className="w-12 h-12 text-slate-600 mb-2" />
                                                    </div>
                                                )}
                                            </div>

                                            <div className="p-4 flex-1 flex flex-col">
                                                <h3 className={`font-bold mb-2 line-clamp-2 ${isPublished ? 'text-white group-hover:text-primary' : 'text-slate-500'}`}>
                                                    {isPublished ? podcastData.title : episode.title}
                                                </h3>

                                                <p className="text-xs text-slate-400 line-clamp-2 mb-4">
                                                    {isPublished ? podcastData.description : episode.description}
                                                </p>

                                                <div className="mt-auto flex items-center justify-between">
                                                    {isPublished ? (
                                                        <span className="text-xs font-bold text-primary flex items-center gap-1">
                                                            <Play size={12} fill="currentColor" /> REPRODUCIR
                                                        </span>
                                                    ) : (
                                                        <span className="text-xs font-bold text-slate-500 border border-slate-700 px-2 py-1 rounded-full bg-slate-800/50">
                                                            PRÓXIMAMENTE
                                                        </span>
                                                    )}

                                                    {isPublished && (
                                                        <span className="text-[10px] text-slate-500 uppercase tracking-widest">
                                                            Episodio {index + 1}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PodcastSeries;
