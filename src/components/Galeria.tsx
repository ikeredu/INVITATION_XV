import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera } from 'lucide-react';

const images = [
    '/images/carrusel_1.webp',
    '/images/carrusel_2.webp',
    '/images/carrusel_3.webp',
    '/images/carrusel_4.webp',
    '/images/carrusel_5.webp',
    '/images/carrusel_6.webp'
];

export default function Galeria() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    // --- LÓGICA DE AUTOPLAY (Se queda igual) ---
    const resetTimeout = () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };

    useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(() => {
            // Siguiente slide (paginate)
            setCurrentIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000); // Autoplay de 3 segundos

        return () => {
            resetTimeout();
        };
    }, [currentIndex]);

    // Simplificamos 'paginate' ya que no hay 'direction'
    const goToSlide = (slideIndex: number) => {
        resetTimeout();
        setCurrentIndex(slideIndex);
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-neutral-900 via-brand-dark/50 to-neutral-900">
            {/* El fondo oscuro y el título se quedan igual */}
            <motion.div
                className="absolute top-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4"
            /* ... (animaciones del título) ... */
            >
                <div className="relative px-6 py-3 bg-white/5 backdrop-blur-md rounded-full border border-white/10">
                    <span className="text-white/90 font-sans-body">
                        {String(currentIndex + 1).padStart(2, '0')}
                    </span>
                    <span className="text-white/40 mx-2">/</span>
                    <span className="text-white/60 font-sans-body">
                        {String(images.length).padStart(2, '0')}
                    </span>
                </div>
                <h2 className="text-4xl font-script text-white/90">Nuestra Galería</h2>
            </motion.div>

            {/* --- Main carousel --- */}
            <div className="relative z-10 w-full h-full flex items-center justify-center overflow-hidden">
                {/* * === 🔴 OPTIMIZACIÓN: CROSS-FADE ===
                 * Usamos 'AnimatePresence' solo para 'opacity'.
                 * Es la animación más fluida y rápida.
                */}
                <AnimatePresence initial={false}>
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }} // Una transición de fundido suave
                        className="absolute" // Todas las imágenes se apilan en el mismo lugar
                    >
                        <div
                            className="relative w-[70vw] h-[70vh] max-w-5xl max-h-[800px] rounded-3xl overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]"
                        >
                            <img
                                src={images[currentIndex]}
                                alt={`Slide ${currentIndex + 1}`}
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                            {/* ... (gradientes y efectos se quedan igual) ... */}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* --- Navigation indicators (Paginación) --- */}
            {/* Esto ahora es la ÚNICA forma de navegación manual */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                {images.map((_, index) => (
                    <motion.button
                        key={index}
                        onClick={() => goToSlide(index)} // Llama a la nueva función
                        className="group relative"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <div
                            className={`relative overflow-hidden rounded-full transition-all duration-500 ${index === currentIndex
                                ? 'w-16 h-2 bg-white'
                                : 'w-2 h-2 bg-white/40 group-hover:bg-white/60'
                                }`}
                        >
                            {index === currentIndex && (
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-brand-icon to-brand-base"
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ duration: 3, ease: "linear" }}
                                    style={{ transformOrigin: 'left' }}
                                />
                            )}
                        </div>
                    </motion.button>
                ))}
            </div>
        </div>
    );
}