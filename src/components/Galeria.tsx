import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Las importaciones de imágenes son correctas
import carrusel1 from '../assets/galeria/carrusel_1.webp';
import carrusel2 from '../assets/galeria/carrusel_2.webp';
import carrusel3 from '../assets/galeria/carrusel_3.webp';
import carrusel4 from '../assets/galeria/carrusel_4.webp';
import carrusel5 from '../assets/galeria/carrusel_5.webp';
import carrusel6 from '../assets/galeria/carrusel_6.webp';

const images = [
    carrusel1.src,
    carrusel2.src,
    carrusel3.src,
    carrusel4.src,
    carrusel5.src,
    carrusel6.src
];

// --- Versión Final con Animación Sutil ---
export default function Galeria() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const resetTimeout = () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };

    useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);

        return () => { resetTimeout(); };
    }, [currentIndex]);

    const goToSlide = (slideIndex: number) => {
        resetTimeout();
        setCurrentIndex(slideIndex);
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-neutral-900 via-brand-dark/50 to-neutral-900">
            {/* Título (con animación) */}
            <motion.div
                className="absolute top-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
            >
                <div className="relative px-6 py-3 bg-white/5 backdrop-blur-md rounded-full border border-white/10">
                    <span className="text-white/90 font-sans-body">{String(currentIndex + 1).padStart(2, '0')}</span>
                    <span className="text-white/40 mx-2">/</span>
                    <span className="text-white/60 font-sans-body">{String(images.length).padStart(2, '0')}</span>
                </div>
                <h2 className="text-4xl font-script text-white/90">Nuestra Galería</h2>
            </motion.div>

            {/* Contenedor principal del carrusel que define el tamaño */}
            <div className="relative z-10 w-[70vw] h-[70vh] max-w-5xl max-h-[800px] rounded-3xl overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]">
                <AnimatePresence initial={false}>
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.7, ease: 'easeInOut' }}
                        className="absolute inset-0"
                    >
                        <img
                            src={images[currentIndex]}
                            alt={`Slide ${currentIndex + 1}`}
                            className="w-full h-full object-cover"
                        />
                        {/* Gradientes y efectos sobre la imagen */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                        <div className="absolute inset-0 flex items-end p-8 text-white">
                            <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg text-sm font-sans-body opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                Explora nuestros momentos especiales
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Indicadores de navegación (con animación) */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                {images.map((_, index) => (
                    <motion.button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className="group relative"
                        whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}
                    >
                        <div className={`relative overflow-hidden rounded-full transition-all duration-500 ${index === currentIndex ? 'w-16 h-2 bg-white' : 'w-2 h-2 bg-white/40 group-hover:bg-white/60'}`}>
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