// src/components/Galeria.tsx

// 💡 1. IMPORTAMOS 'useEffect'
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from './Sparkles';

// --- Importaciones de imágenes (sin cambios) ---
import carrusel1 from '../assets/galeria/carrusel_1.webp';
import carrusel2 from '../assets/galeria/carrusel_2.webp';
import carrusel3 from '../assets/galeria/carrusel_3.webp';
import carrusel4 from '../assets/galeria/carrusel_4.webp';
import carrusel5 from '../assets/galeria/carrusel_5.webp';
import carrusel6 from '../assets/galeria/carrusel_6.webp';
import carrusel7 from '../assets/galeria/carrusel_7.webp';

const images = [
    carrusel1.src, carrusel2.src, carrusel3.src, carrusel4.src,
    carrusel5.src, carrusel6.src, carrusel7.src
];

const variants = {
    enter: { opacity: 0 },
    center: { zIndex: 1, opacity: 1 },
    exit: { zIndex: 0, opacity: 0 },
};

export default function Galeria() {
    const [page, setPage] = useState([0, 0]);
    const [currentIndex, direction] = page;

    // --- 💡 2. ¡AQUÍ ESTÁ LA SOLUCIÓN! ---
    // Pre-cargamos todas las imágenes de la galería en la caché del navegador
    // cuando el componente se monta por primera vez.
    useEffect(() => {
        images.forEach((imageSrc) => {
            const img = new Image();
            img.src = imageSrc;
        });
    }, []); // El array vacío '[]' asegura que esto se ejecute SOLO UNA VEZ.

    // --- Lógica de paginación (sin cambios) ---
    const paginate = (newDirection: number) => {
        let newIndex = currentIndex + newDirection;
        if (newIndex < 0) newIndex = images.length - 1;
        else if (newIndex >= images.length) newIndex = 0;
        setPage([newIndex, newDirection]);
    };

    const goToSlide = (slideIndex: number) => {
        const newDirection = slideIndex > currentIndex ? 1 : -1;
        setPage([slideIndex, newDirection]);
    };

    return (
        // --- El resto del JSX es idéntico ---
        <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-neutral-900 via-brand-dark/50 to-neutral-900 px-4 py-20">

            <Sparkles count={70} />

            <div className="text-center mb-8 z-20">
                <h2 className="text-4xl font-script text-white/90">Galería de fotos, de nuestra hermosa quinceañera</h2>
            </div>

            <div className="relative z-10 w-[70vw] h-[60vh] md:w-[60vw] md:h-[70vh] max-w-4xl max-h-[700px] rounded-3xl overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]">
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ opacity: { type: "tween", duration: 0.5, ease: "easeOut" } }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.2}
                        onDragEnd={(e, { offset, velocity }) => {
                            const swipeThreshold = 50;
                            if (offset.x < -swipeThreshold || velocity.x < -300) paginate(1);
                            else if (offset.x > swipeThreshold || velocity.x > 300) paginate(-1);
                        }}
                        className="absolute inset-0"
                    >
                        <img
                            src={images[currentIndex]}
                            alt={`Slide ${currentIndex + 1}`}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-20">
                <motion.p
                    className="font-sans-body text-white/50 text-xs tracking-wider"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                >
                    ← Desliza para ver más →
                </motion.p>

                <div className="flex gap-3">
                    {images.map((_, index) => (
                        <motion.button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className="group relative"
                            whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}
                        >
                            <div className={`relative overflow-hidden rounded-full transition-all duration-500 ${index === currentIndex
                                ? 'w-16 h-2 bg-gradient-to-r from-brand-icon to-brand-base'
                                : 'w-2 h-2 bg-white/40 group-hover:bg-white/60'
                                }`}>
                            </div>
                        </motion.button>
                    ))}
                </div>
            </div>
        </div>
    );
}