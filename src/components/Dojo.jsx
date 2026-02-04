import React, { useState, useEffect } from 'react';
import {
    Activity, Trophy, Lock, Star, Play, RefreshCw, CheckCircle,
    AlertCircle, Code, Award, Coffee
} from 'lucide-react';
import { DAX_COURSE_DATA } from '../data/daxcourse';
import SEO from './SEO';

export default function Dojo() {
    // Persistent State initialization with URL param override
    const [activeBeltIndex, setActiveBeltIndex] = useState(() => {
        const params = new URLSearchParams(window.location.search);
        const beltParam = params.get('belt');
        if (beltParam) {
            const beltIdx = DAX_COURSE_DATA.findIndex(b => b.id === beltParam);
            if (beltIdx !== -1) return beltIdx;
        }
        const saved = localStorage.getItem('daxdojo-activeBelt');
        return saved ? parseInt(saved, 10) : 0;
    });

    const [activeLessonIndex, setActiveLessonIndex] = useState(() => {
        const params = new URLSearchParams(window.location.search);
        const lessonParam = params.get('lesson');
        if (lessonParam) {
            const lessonIdx = DAX_COURSE_DATA[activeBeltIndex]?.lessons.findIndex(l => l.id === lessonParam);
            if (lessonIdx !== -1) return lessonIdx;
        }
        const saved = localStorage.getItem('daxdojo-activeLesson');
        return saved ? parseInt(saved, 10) : 0;
    });

    const [userCode, setUserCode] = useState('');
    const [feedback, setFeedback] = useState(null);

    const [completedLessons, setCompletedLessons] = useState(() => {
        const saved = localStorage.getItem('daxdojo-completedLessons');
        return saved ? JSON.parse(saved) : [];
    });

    const [unlockedBelts, setUnlockedBelts] = useState(() => {
        const saved = localStorage.getItem('daxdojo-unlockedBelts');
        return saved ? JSON.parse(saved) : [0];
    });

    const [xp, setXp] = useState(() => {
        const saved = localStorage.getItem('daxdojo-xp');
        return saved ? parseInt(saved, 10) : 0;
    });

    // Exam State
    const [isExamMode, setIsExamMode] = useState(false);
    const [examAnswers, setExamAnswers] = useState({});
    const [examResult, setExamResult] = useState(null);

    // Derived State
    const currentBelt = DAX_COURSE_DATA[activeBeltIndex];
    const currentLesson = currentBelt.lessons[activeLessonIndex];
    const totalLessonsInBelt = currentBelt.lessons.length;
    const completedInCurrentBelt = completedLessons.filter(l => l.startsWith(`${activeBeltIndex}-`)).length;
    const isBeltComplete = completedInCurrentBelt === totalLessonsInBelt;

    // URL Update Effect
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        // Preserve other params if needed, but ensure view is dojo
        params.set('view', 'dojo');

        if (currentBelt) {
            params.set('belt', currentBelt.id);
        }

        if (currentLesson) {
            params.set('lesson', currentLesson.id);
        }

        // Only push state if URL actually changed to avoid creating unnecessary history entries
        const newSearch = params.toString();
        if (window.location.search !== `?${newSearch}`) {
            const newUrl = `${window.location.pathname}?${newSearch}`;
            window.history.pushState({}, '', newUrl);
        }

    }, [activeBeltIndex, activeLessonIndex, currentBelt, currentLesson]);

    // Persistence Effects
    useEffect(() => {
        localStorage.setItem('daxdojo-activeBelt', activeBeltIndex);
    }, [activeBeltIndex]);

    useEffect(() => {
        localStorage.setItem('daxdojo-activeLesson', activeLessonIndex);
    }, [activeLessonIndex]);

    useEffect(() => {
        localStorage.setItem('daxdojo-completedLessons', JSON.stringify(completedLessons));
    }, [completedLessons]);

    useEffect(() => {
        localStorage.setItem('daxdojo-unlockedBelts', JSON.stringify(unlockedBelts));
    }, [unlockedBelts]);

    useEffect(() => {
        localStorage.setItem('daxdojo-xp', xp.toString());
    }, [xp]);

    // Validation Logic
    const checkCode = () => {
        const normalize = (str) => str.replace(/\s+/g, '').toLowerCase();
        const userClean = normalize(userCode);
        const expectedParts = currentLesson.challenge.expected.map(e => normalize(e));

        let isValid = true;
        let lastIndex = -1;

        for (let part of expectedParts) {
            const idx = userClean.indexOf(part, lastIndex + 1);
            if (idx === -1) {
                isValid = false;
                break;
            }
            lastIndex = idx;
        }

        if (isValid) {
            handleSuccess();
        } else {
            setFeedback({ type: 'error', msg: 'Revisa la sintaxis. Asegúrate de incluir todos los argumentos necesarios.' });
        }
    };

    const handleQuiz = (optIndex) => {
        if (optIndex === currentLesson.challenge.correctOpt) {
            handleSuccess(currentLesson.challenge.correctMsg);
        } else {
            setFeedback({ type: 'error', msg: 'Incorrecto. Revisa la teoría.' });
        }
    };

    const handleSuccess = (msg = "¡Correcto! Buen trabajo.") => {
        setFeedback({ type: 'success', msg });
        const key = `${activeBeltIndex}-${activeLessonIndex}`;
        if (!completedLessons.includes(key)) {
            setCompletedLessons([...completedLessons, key]);
            setXp(xp + 20);
        }
    };

    const submitExam = () => {
        const questions = currentBelt.exam.questions;
        let score = 0;
        questions.forEach((q, idx) => {
            if (examAnswers[idx] === q.ans) score++;
        });

        const passed = score >= Math.ceil(questions.length * 0.7);

        if (passed) {
            setExamResult({ passed: true, msg: `¡Aprobado! ${score}/${questions.length}. Has desbloqueado el siguiente cinturón.` });
            if (!unlockedBelts.includes(activeBeltIndex + 1) && (activeBeltIndex + 1 < DAX_COURSE_DATA.length)) {
                setUnlockedBelts([...unlockedBelts, activeBeltIndex + 1]);
                setXp(xp + 500);
            }
        } else {
            setExamResult({ passed: false, msg: `Fallaste. ${score}/${questions.length}. Necesitas el 70% para aprobar.` });
        }
    };

    // Helper to map light mode belt colors to dark mode
    const getBeltBadgeStyles = (baseColor) => {
        const colorMap = {
            'text-gray-800': 'text-white border-slate-600 bg-slate-700',
            'text-yellow-800': 'text-yellow-100 border-yellow-600 bg-yellow-900',
            'text-orange-800': 'text-orange-100 border-orange-600 bg-orange-900',
        };
        return colorMap[baseColor] || 'text-white bg-slate-700';
    };

    return (
        <>
            <SEO
                title={isExamMode ? `Examen ${currentBelt.title.split(':')[0]}` : `${currentLesson.title} | ${currentBelt.title.split(':')[0]}`}
                description={`Aprende DAX con ejercicios interactivos. ${currentBelt.description}`}
                url={window.location.href}
            />
            <div className="flex h-full bg-[#0B1120] text-slate-100 font-sans overflow-hidden">
                {/* SIDEBAR SUB-MENU */}
                <div className="w-72 bg-sidebar-dark border-r border-white/5 flex flex-col hidden lg:flex">
                    <div className="p-6 border-b border-white/5 bg-sidebar-dark">
                        <h1 className="text-2xl font-bold flex items-center gap-2 text-primary">
                            <Activity className="w-6 h-6" /> DAX Dojo
                        </h1>
                        <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Entrenador PL-300</p>
                        <div className="mt-4 flex items-center gap-2 bg-[#0B1120] p-2 rounded-lg border border-white/5">
                            <Trophy className="w-4 h-4 text-primary" />
                            <span className="font-bold text-lg text-white">{xp} XP</span>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {DAX_COURSE_DATA.map((belt, bIdx) => {
                            const isUnlocked = unlockedBelts.includes(bIdx);
                            const isCurrent = activeBeltIndex === bIdx;

                            return (
                                <div key={belt.id} className={`relative ${!isUnlocked ? 'opacity-50 grayscale' : ''}`}>
                                    <button
                                        disabled={!isUnlocked}
                                        onClick={() => {
                                            setActiveBeltIndex(bIdx);
                                            setActiveLessonIndex(0);
                                            setIsExamMode(false);
                                            setFeedback(null);
                                            setUserCode('');
                                            setExamResult(null);
                                        }}
                                        className={`w-full flex items-center justify-between p-3 rounded-xl transition-all border ${isCurrent
                                            ? 'bg-white/10 border-primary text-white'
                                            : 'bg-transparent border-transparent hover:bg-white/5 text-slate-400 hover:text-white'
                                            }`}
                                    >
                                        <span className="font-bold text-sm flex items-center gap-2">
                                            {!isUnlocked && <Lock className="w-3 h-3" />}
                                            {belt.title}
                                        </span>
                                        {isUnlocked && completedLessons.filter(l => l.startsWith(`${bIdx}-`)).length === belt.lessons.length && (
                                            <Star className="w-4 h-4 text-primary fill-primary" />
                                        )}
                                    </button>

                                    {/* Lesson Dots */}
                                    {isCurrent && (
                                        <div className="grid grid-cols-5 gap-2 mt-2 px-2">
                                            {belt.lessons.map((_, lIdx) => {
                                                const lKey = `${bIdx}-${lIdx}`;
                                                const done = completedLessons.includes(lKey);
                                                const active = activeLessonIndex === lIdx;
                                                return (
                                                    <button
                                                        key={lIdx}
                                                        onClick={() => {
                                                            setActiveLessonIndex(lIdx);
                                                            setIsExamMode(false);
                                                            setFeedback(null);
                                                            setUserCode('');
                                                        }}
                                                        className={`h-2 rounded-full transition-all ${active
                                                            ? 'bg-primary w-full col-span-2 shadow-[0_0_10px_rgba(255,193,7,0.5)]'
                                                            : (done ? 'bg-green-500' : 'bg-slate-700')
                                                            }`}
                                                        title={`Lección ${lIdx + 1}`}
                                                    />
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* MAIN CONTENT */}
                <div className="flex-1 flex flex-col h-full relative overflow-hidden">
                    {/* TOOLBAR */}
                    <header className="h-16 border-b border-white/5 bg-[#0B1120] flex items-center justify-between px-8 z-10">
                        <div className="flex items-center gap-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getBeltBadgeStyles(currentBelt.textColor)}`}>
                                {currentBelt.title.split(':')[0]}
                            </span>
                            <h2 className="text-lg font-bold text-white">
                                {isExamMode ? "Examen de Certificación" : `Lección ${activeLessonIndex + 1}: ${currentLesson.title}`}
                            </h2>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-emerald-900/30 text-emerald-400 rounded-full text-xs border border-emerald-800/50 cursor-help">
                                <Coffee className="w-3 h-3" />
                                <span>Modo Salud</span>
                            </div>
                        </div>
                    </header>

                    {/* WORKSPACE */}
                    <div className="flex-1 overflow-hidden p-6 relative">
                        {/* EXAM VIEW */}
                        {isExamMode ? (
                            <div className="max-w-3xl mx-auto bg-background-card rounded-2xl border border-white/10 overflow-hidden h-full flex flex-col animate-in slide-in-from-bottom-4">
                                <div className="bg-primary/20 p-6 text-white text-center border-b border-primary/20 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />
                                    <Award className="w-12 h-12 mx-auto mb-2 text-primary" />
                                    <h2 className="text-2xl font-bold relative z-10">Examen de {currentBelt.title.split(':')[0]}</h2>
                                    <p className="opacity-80 text-sm relative z-10">Responde correctamente para desbloquear el siguiente nivel.</p>
                                </div>

                                <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
                                    {examResult ? (
                                        <div className={`p-6 rounded-xl text-center border ${examResult.passed
                                            ? 'bg-green-900/20 text-green-400 border-green-500/50'
                                            : 'bg-red-900/20 text-red-400 border-red-500/50'
                                            }`}>
                                            <h3 className="text-2xl font-bold mb-2">{examResult.passed ? '¡FELICIDADES!' : 'INTÉNTALO DE NUEVO'}</h3>
                                            <p>{examResult.msg}</p>
                                            {examResult.passed && activeBeltIndex + 1 < DAX_COURSE_DATA.length && (
                                                <button
                                                    onClick={() => {
                                                        setActiveBeltIndex(activeBeltIndex + 1);
                                                        setIsExamMode(false);
                                                        setActiveLessonIndex(0);
                                                        setExamResult(null);
                                                    }}
                                                    className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-500 font-bold transition-colors"
                                                >
                                                    Ir al siguiente Cinturón
                                                </button>
                                            )}
                                            {!examResult.passed && (
                                                <button
                                                    onClick={() => setExamResult(null)}
                                                    className="mt-4 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-500 font-bold transition-colors"
                                                >
                                                    Repetir Examen
                                                </button>
                                            )}
                                        </div>
                                    ) : (
                                        currentBelt.exam.questions.map((q, idx) => (
                                            <div key={idx} className="bg-white/5 p-6 rounded-xl border border-white/10">
                                                <p className="font-semibold text-lg mb-4 text-slate-200">{idx + 1}. {q.q}</p>
                                                <div className="space-y-2">
                                                    {q.options.map((opt, optIdx) => (
                                                        <label key={optIdx} className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${examAnswers[idx] === optIdx
                                                            ? 'bg-primary/20 border-primary/50 ring-1 ring-primary/50 text-white'
                                                            : 'hover:bg-white/5 border-white/10 text-slate-300'
                                                            }`}>
                                                            <input
                                                                type="radio"
                                                                name={`q-${idx}`}
                                                                className="mr-3 w-4 h-4 accent-primary"
                                                                onChange={() => setExamAnswers({ ...examAnswers, [idx]: optIdx })}
                                                                checked={examAnswers[idx] === optIdx}
                                                            />
                                                            {opt}
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>

                                {!examResult && (
                                    <div className="p-6 border-t border-white/10 bg-background-card flex justify-end">
                                        <button
                                            onClick={submitExam}
                                            className="bg-primary hover:bg-primary-hover text-black font-bold py-3 px-8 rounded-lg shadow-glow transition-all active:scale-95"
                                        >
                                            Entregar Examen
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            /* LESSON VIEW */
                            <div className="h-full flex flex-col lg:flex-row gap-6">
                                {/* Theory Card */}
                                <div className="flex-1 bg-background-card rounded-2xl border border-white/10 flex flex-col overflow-hidden shadow-xl">
                                    <div className="p-8 overflow-y-auto flex-1 custom-scrollbar">
                                        <div className="prose prose-invert max-w-none text-justify prose-p:text-slate-300 prose-p:leading-relaxed prose-p:mb-6 prose-headings:text-white prose-code:text-primary prose-code:bg-white/10 prose-strong:text-white">
                                            <div className="mb-8 p-5 bg-blue-900/20 border-l-4 border-blue-500 rounded-r-lg">
                                                <h3 className="font-bold text-blue-400 flex items-center gap-2 mb-2">
                                                    <Code className="w-5 h-5" /> Desafío
                                                </h3>
                                                <p className="text-blue-100 text-lg">{currentLesson.challenge.q}</p>
                                                {currentLesson.challenge.hint && (
                                                    <p className="text-sm text-blue-300 mt-2 italic">
                                                        Pista: {currentLesson.challenge.hint}
                                                    </p>
                                                )}
                                            </div>
                                            <div dangerouslySetInnerHTML={{ __html: currentLesson.content }} />
                                        </div>
                                    </div>

                                    {/* Navigation Footer */}
                                    <div className="p-4 bg-background-card border-t border-white/10 flex justify-between items-center z-10">
                                        <button
                                            disabled={activeLessonIndex === 0}
                                            onClick={() => {
                                                setActiveLessonIndex(activeLessonIndex - 1);
                                                setFeedback(null);
                                                setUserCode('');
                                            }}
                                            className="text-slate-400 hover:text-white font-semibold disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1"
                                        >
                                            &larr; Anterior
                                        </button>

                                        {isBeltComplete ? (
                                            <button
                                                onClick={() => {
                                                    setIsExamMode(true);
                                                    setExamAnswers({});
                                                    setExamResult(null);
                                                }}
                                                className="bg-primary hover:bg-primary-hover text-black font-bold py-2 px-6 rounded-lg shadow-glow animate-pulse"
                                            >
                                                Tomar Examen
                                            </button>
                                        ) : (
                                            <span className="text-xs text-slate-500">Completa las {totalLessonsInBelt} fichas para el examen</span>
                                        )}

                                        <button
                                            disabled={activeLessonIndex === totalLessonsInBelt - 1}
                                            onClick={() => {
                                                setActiveLessonIndex(activeLessonIndex + 1);
                                                setFeedback(null);
                                                setUserCode('');
                                            }}
                                            className="text-slate-400 hover:text-white font-semibold disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1"
                                        >
                                            Siguiente &rarr;
                                        </button>
                                    </div>
                                </div>

                                {/* Interaction Card */}
                                <div className="flex-1 flex flex-col gap-4">
                                    <div className="bg-gray-950 rounded-2xl shadow-xl flex-1 flex flex-col overflow-hidden border border-white/10">
                                        <div className="bg-[#0f172a] px-4 py-3 flex justify-between items-center border-b border-white/5">
                                            <span className="text-xs font-mono text-slate-400 flex items-center gap-2">
                                                <Activity className="w-3 h-3" /> DAX EDITOR
                                            </span>
                                            <button onClick={() => setUserCode('')} className="text-slate-400 hover:text-white transition-colors">
                                                <RefreshCw className="w-3 h-3" />
                                            </button>
                                        </div>

                                        {currentLesson.type === 'code' ? (
                                            <textarea
                                                value={userCode}
                                                onChange={(e) => setUserCode(e.target.value)}
                                                className="flex-1 w-full bg-gray-950 text-green-400 font-mono p-4 outline-none resize-none text-sm placeholder:text-slate-700"
                                                placeholder="// Escribe tu código aquí..."
                                                spellCheck="false"
                                            />
                                        ) : (
                                            <div className="flex-1 bg-background-card p-8 flex flex-col justify-center gap-3">
                                                <p className="text-center text-slate-300 font-semibold mb-2">Selecciona la opción correcta:</p>
                                                {currentLesson.challenge.options.map((opt, idx) => (
                                                    <button
                                                        key={idx}
                                                        onClick={() => handleQuiz(idx)}
                                                        className="bg-white/5 p-4 rounded-lg border border-white/10 hover:border-primary/50 hover:bg-white/10 text-left transition-all text-slate-200"
                                                    >
                                                        {opt}
                                                    </button>
                                                ))}
                                            </div>
                                        )}

                                        {currentLesson.type === 'code' && (
                                            <div className="p-4 bg-[#0f172a] border-t border-white/5">
                                                <button
                                                    onClick={checkCode}
                                                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg flex justify-center items-center gap-2 shadow-lg transition-transform active:scale-[0.98]"
                                                >
                                                    <Play className="w-4 h-4 fill-current" /> Ejecutar
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    {/* Feedback Box */}
                                    <div className={`h-24 rounded-xl flex items-center px-6 gap-4 transition-all duration-300 transform ${!feedback ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                                        } ${feedback?.type === 'success'
                                            ? 'bg-green-900/30 text-green-300 border border-green-500/30'
                                            : 'bg-red-900/30 text-red-300 border border-red-500/30'
                                        }`}>
                                        {feedback?.type === 'success' ? <CheckCircle className="w-8 h-8 shrink-0" /> : <AlertCircle className="w-8 h-8 shrink-0" />}
                                        <div>
                                            <p className="font-bold text-lg">{feedback?.type === 'success' ? '¡Bien hecho!' : 'Error'}</p>
                                            <p className="text-sm opacity-90">{feedback?.msg}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
