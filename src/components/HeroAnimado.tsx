// src/components/HeroAnimado.tsx

// 💡 Importamos los hooks de React y los iconos necesarios
import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Play, Pause } from 'lucide-react';
import { motion } from 'framer-motion';


const song = {
    src: '/music/cancion1.mp3',
    title: 'Say Yes To Heaven',
    artist: 'Lana Del Rey',
    coverArt: '/images/cover1.webp'
};

const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '00:00';
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export default function HeroAnimado() {

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // ... (togglePlay, handleLoadedMetadata, handleTimeUpdate sin cambios) ...
    const togglePlay = () => {
        const audioElement = audioRef.current;
        if (!audioElement) return;

        if (isPlaying) {
            audioElement.pause();
        } else {
            audioElement.play().catch(e => console.error("Error al reproducir:", e));
        }
        setIsPlaying(!isPlaying);
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) setDuration(audioRef.current.duration);
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
    };


    return (
        <div className="relative min-h-screen w-full overflow-hidden">

            {/* --- 🎵 ELEMENTO DE AUDIO (OCULTO Y EN LOOP) --- */}
            <audio
                ref={audioRef}
                src={song.src}
                loop
                onLoadedMetadata={handleLoadedMetadata}
                onTimeUpdate={handleTimeUpdate}
            />

            {/* --- WIDGET DE MÚSICA Y SU CONTENEDOR --- */}
            <motion.div
                // 💡 Aseguramos que el contenedor del widget sea relativo para poder posicionar el Hint
                className="absolute top-6 right-6 z-30"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            >
                {/* 💡 1. EL WIDGET FLOTANTE */}
                <div className="w-56 p-3 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
                    <div className="flex items-center gap-3">
                        {/* Cover Art */}
                        <img
                            src={song.coverArt}
                            alt={song.title}
                            className="w-12 h-12 rounded-md object-cover"
                        />
                        {/* Info */}
                        <div className="flex-1 text-white min-w-0">
                            <h3 className="font-bold text-sm truncate">{song.title}</h3>
                            <p className="text-xs text-white/70 truncate">{song.artist}</p>
                            {/* Tiempo */}
                            <div className="text-xs text-white/70 mt-1">
                                {formatTime(currentTime)} / 03:29
                            </div>
                        </div>
                    </div>
                    {/* Controles */}
                    <div className="flex items-center justify-center mt-3 text-white">
                        <button
                            onClick={togglePlay}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                        >
                            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                        </button>
                    </div>
                </div>

                {/* 💡 2. EL HINT (Se muestra solo si NO está sonando) */}
                {!isPlaying && (
                    <motion.p
                        className="text-white/80 text-xs font-sans-body mt-2 text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0] }} // Parpadeo
                        transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
                    >
                        Presione play para escuchar
                    </motion.p>
                )}
            </motion.div>

            {/* --- TU CÓDIGO DE HERO EXISTENTE --- */}
            {/* Background Image */}
            <div className="absolute inset-0">
                <img
                    src="/images/fondo-hero_2.jpg"
                    alt="Fondo floral rosa"
                    className="w-full h-full object-cover"
                />
            </div>
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-black/10"></div>
            {/* Main Content with animations */}
            <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6">
                <div className="text-center space-y-8">
                    <div className="flex items-center justify-center space-x-3">
                        <div className="w-12 h-px bg-white"></div>
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                        <div className="w-12 h-px bg-white"></div>
                    </div>
                    <div className="space-y-2">
                        <motion.h1
                            className="text-4xl md:text-5xl text-white font-serif italic"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            Desliza para comenzar
                        </motion.h1>
                        <motion.h1
                            className="text-4xl md:text-5xl text-white font-serif italic"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            {/* Este h1 estaba vacío en tu código, lo respeto */}
                        </motion.h1>
                    </div>
                    <motion.div
                        className="flex justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        <a href="#contenido">
                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                className="text-white"
                            >
                                <ChevronDown size={32} strokeWidth={2} />
                            </motion.div>
                        </a>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}