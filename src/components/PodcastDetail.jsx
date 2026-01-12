import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Play, Pause, FastForward, Rewind } from 'lucide-react';

const PodcastDetail = ({ podcast, onBack }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [activeSegmentIndex, setActiveSegmentIndex] = useState(-1);

    const audioRef = useRef(null);
    const transcriptRef = useRef(null);
    const activeSegmentRef = useRef(null);

    useEffect(() => {
        if (activeSegmentRef.current && transcriptRef.current) {
            activeSegmentRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        }
    }, [activeSegmentIndex]);

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

        // Find active transcript segment
        const index = podcast.transcript.findIndex(
            (segment) => time >= segment.start && time < segment.end
        );
        setActiveSegmentIndex(index);
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

            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">

                {/* Left Side: Player & Info */}
                <div className="w-full md:w-1/3 lg:w-1/4 p-6 bg-background-card/50 border-r border-white/5 flex flex-col overflow-y-auto shrink-0 z-10 shadow-lg">
                    <div className="aspect-square rounded-xl overflow-hidden shadow-2xl mb-6 border border-white/10 relative group">
                        <img src={podcast.thumbnail} alt={podcast.title} className="w-full h-full object-cover" />
                        {/* Simple visualizer fake overlay */}
                        {isPlaying && (
                            <div className="absolute inset-0 flex items-end justify-center gap-1 p-4 bg-black/30">
                                <div className="w-1 bg-primary h-4 animate-pulse"></div>
                                <div className="w-1 bg-primary h-8 animate-pulse delay-75"></div>
                                <div className="w-1 bg-primary h-6 animate-pulse delay-150"></div>
                                <div className="w-1 bg-primary h-10 animate-pulse delay-100"></div>
                                <div className="w-1 bg-primary h-5 animate-pulse delay-200"></div>
                            </div>
                        )}
                    </div>

                    <h1 className="text-2xl font-bold text-white mb-2">{podcast.title}</h1>
                    <p className="text-sm text-slate-400 mb-6">{podcast.description}</p>

                    {/* Player Controls */}
                    <div className="bg-black/30 p-4 rounded-xl border border-white/5">
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
                    </div>
                </div>

                {/* Right Side: Karaoke Transcript */}
                <div className="flex-1 relative flex flex-col bg-[#0f172a]">
                    {/* Transcript Header with subtle gradient */}
                    <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[#0f172a] to-transparent z-10 pointer-events-none"></div>

                    <div ref={transcriptRef} className="flex-1 overflow-y-auto p-8 md:p-12 space-y-8 scroll-smooth pb-40">
                        {podcast.transcript.map((segment, index) => {
                            const isActive = index === activeSegmentIndex;
                            const isPast = currentTime > segment.end;

                            // Only simulate this part for testing if audio is not working, 
                            // in real app this depends on actual audio loaded.
                            // For now, assuming audio works.

                            return (
                                <div
                                    key={index}
                                    ref={isActive ? activeSegmentRef : null}
                                    onClick={() => {
                                        audioRef.current.currentTime = segment.start;
                                        audioRef.current.play();
                                        setIsPlaying(true);
                                    }}
                                    className={`
                    transition-all duration-500 cursor-pointer p-4 rounded-xl -mx-4
                    ${isActive
                                            ? 'scale-105 bg-white/5 border-l-4 border-primary pl-6 shadow-lg'
                                            : 'hover:bg-white/5 opacity-50 hover:opacity-100'}
                  `}
                                >
                                    <p className={`
                    text-lg md:text-2xl font-medium leading-relaxed
                    ${isActive ? 'text-white' : 'text-slate-400'}
                    ${isPast && !isActive ? 'text-slate-600' : ''}
                  `}>
                                        {segment.text}
                                    </p>
                                    {isActive && (
                                        <span className="text-xs text-primary font-bold mt-2 block animate-pulse">
                                            Reproduciendo...
                                        </span>
                                    )}
                                </div>
                            );
                        })}
                        {/* Empty space at bottom to allow scrolling last item to center */}
                        <div className="h-[50vh]"></div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/80 to-transparent z-10 pointer-events-none"></div>
                </div>
            </div>
        </div>
    );
};

export default PodcastDetail;
