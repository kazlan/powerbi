import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Play, Pause, FastForward, Rewind, Link as LinkIcon, ExternalLink, Tag, Volume2, Volume1, VolumeX } from 'lucide-react';

const PodcastDetail = ({ podcast, onBack, onTagSelect }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const audioRef = useRef(null);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = isMuted ? 0 : volume;
        }
    }, [volume, isMuted]);

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        setIsMuted(newVolume === 0);
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    const togglePlay = () => {
        if (audioRef.current.paused) {
            audioRef.current.play();
            setIsPlaying(true);
        } else {
            audioRef.current.pause();
            setIsPlaying(false);
        }
    };

    const handleTimeUpdate = () => {
        const time = audioRef.current.currentTime;
        setCurrentTime(time);
    };

    const handleLoadedMetadata = () => {
        setDuration(audioRef.current.duration);
    };

    const skipForward = () => {
        audioRef.current.currentTime += 10;
    };

    const skipBackward = () => {
        audioRef.current.currentTime -= 10;
    };

    const formatTime = (time) => {
        if (isNaN(time)) return "0:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const handleSeek = (e) => {
        const time = parseFloat(e.target.value);
        audioRef.current.currentTime = time;
        setCurrentTime(time);
    };

    return (
        <div className="flex flex-col h-[calc(100vh-64px)] overflow-hidden animate-in fade-in slide-in-from-right-4 duration-500 bg-background-dark">
            {/* Header */}
            <div className="p-6 border-b border-white/5 bg-background-card flex items-center gap-4 shadow-md z-10 shrink-0">
                <button
                    onClick={onBack}
                    className="p-2 hover:bg-white/5 rounded-full text-slate-400 hover:text-white transition-colors"
                >
                    <ArrowLeft size={24} />
                </button>
                <h2 className="text-xl font-bold text-white truncate flex-1">{podcast.title}</h2>
            </div>

            <div className="flex-1 overflow-y-auto">
                <div className="max-w-7xl mx-auto p-6 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Left Side: Player & Main Info */}
                    <div className="lg:col-span-7 flex flex-col gap-8">
                        {/* Player Card */}
                        <div className="bg-background-card border border-white/5 rounded-2xl p-6 shadow-xl relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                                <div className="w-full md:w-48 aspect-square rounded-xl overflow-hidden shadow-2xl border border-white/10 shrink-0">
                                    <img src={podcast.thumbnail} alt={podcast.title} className="w-full h-full object-cover" />
                                </div>

                                <div className="flex-1 w-full space-y-6">
                                    <div>
                                        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">{podcast.title}</h1>
                                        <p className="text-slate-400 text-sm">{podcast.description}</p>
                                    </div>

                                    {/* Player Controls */}
                                    <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                                        <audio
                                            ref={audioRef}
                                            src={podcast.audioSrc}
                                            onTimeUpdate={handleTimeUpdate}
                                            onLoadedMetadata={handleLoadedMetadata}
                                            onEnded={() => setIsPlaying(false)}
                                        />

                                        {/* Progress Bar */}
                                        <div className="mb-4">
                                            <input
                                                type="range"
                                                min="0"
                                                max={duration}
                                                value={currentTime}
                                                onChange={handleSeek}
                                                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary"
                                            />
                                            <div className="flex justify-between text-xs text-slate-500 mt-1">
                                                <span>{formatTime(currentTime)}</span>
                                                <span>{formatTime(duration)}</span>
                                            </div>
                                        </div>

                                        {/* Buttons */}
                                        <div className="flex items-center justify-center gap-6">
                                            <button onClick={skipBackward} className="text-slate-400 hover:text-white transition-colors">
                                                <Rewind size={24} />
                                            </button>

                                            <button
                                                onClick={togglePlay}
                                                className="w-14 h-14 bg-primary rounded-full flex items-center justify-center text-black hover:scale-105 active:scale-95 transition-all shadow-glow"
                                            >
                                                {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
                                            </button>

                                            <button onClick={skipForward} className="text-slate-400 hover:text-white transition-colors">
                                                <FastForward size={24} />
                                            </button>
                                        </div>

                                        {/* Volume Control */}
                                        <div className="flex items-center justify-center gap-4 mt-6 px-4 py-2 bg-white/5 rounded-lg border border-white/5 w-fit mx-auto">
                                            <button onClick={toggleMute} className="text-slate-400 hover:text-primary transition-colors">
                                                {isMuted || volume === 0 ? <VolumeX size={18} /> : volume < 0.5 ? <Volume1 size={18} /> : <Volume2 size={18} />}
                                            </button>
                                            <input
                                                type="range"
                                                min="0"
                                                max="1"
                                                step="0.05"
                                                value={isMuted ? 0 : volume}
                                                onChange={handleVolumeChange}
                                                className="w-24 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary hover:accent-primary/80"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Meta Info (Tags & Links) */}
                    <div className="lg:col-span-5 space-y-8">
                        {/* Tags Section */}
                        <div className="bg-background-card/50 border border-white/5 rounded-2xl p-6">
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <Tag size={20} className="text-primary" />
                                Temas Relacionados
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {podcast.tags?.map(tag => (
                                    <button
                                        key={tag}
                                        onClick={() => onTagSelect(tag)}
                                        className="bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white px-3 py-1.5 rounded-lg text-sm transition-colors cursor-pointer border border-white/5 hover:border-primary/30"
                                    >
                                        {tag}
                                    </button>
                                ))}
                                {!podcast.tags?.length && <span className="text-slate-500 text-sm">No hay etiquetas disponibles.</span>}
                            </div>
                        </div>

                        {/* Links Section */}
                        <div className="bg-background-card/50 border border-white/5 rounded-2xl p-6">
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <LinkIcon size={20} className="text-primary" />
                                Enlaces de Interés
                            </h3>
                            <div className="space-y-3">
                                {podcast.links?.map((link, idx) => (
                                    <a
                                        key={idx}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-start gap-3 p-3 rounded-xl bg-black/20 hover:bg-white/5 border border-white/5 hover:border-primary/30 transition-all group"
                                    >
                                        <ExternalLink size={18} className="text-slate-500 group-hover:text-primary mt-0.5" />
                                        <div>
                                            <div className="text-slate-300 group-hover:text-white font-medium transition-colors">
                                                {link.title}
                                            </div>
                                            <div className="text-xs text-slate-500 truncate mt-0.5 max-w-[250px] opacity-70">
                                                {link.url}
                                            </div>
                                        </div>
                                    </a>
                                ))}
                                {!podcast.links?.length && <span className="text-slate-500 text-sm">No hay enlaces adicionales.</span>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PodcastDetail;
