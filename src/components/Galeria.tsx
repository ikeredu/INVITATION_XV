import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera } from 'lucide-react'; // Para el título

// 1. Asegúrate de que estas rutas sean CORRECTAS y apunten a tus imágenes .webp optimizadas
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
    const [direction, setDirection] = useState(0);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Lógica de Autoplay
    const resetTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(() => {
            paginate(1);
        }, 3000); // Autoplay de 3 segundos

        return () => {
            resetTimeout();
        };
    }, [currentIndex]); // Se resetea cada vez que cambia la imagen

    const paginate = (newDirection: number) => {
        setDirection(newDirection);
        setCurrentIndex((prevIndex) => {
            let nextIndex = prevIndex + newDirection;
            if (nextIndex < 0) nextIndex = images.length - 1;
            if (nextIndex >= images.length) nextIndex = 0;
            return nextIndex;
        });
    };

    // Lógica de Swipe
    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity;
    };

    const getNextIndex = (offset: number) => {
        let index = currentIndex + offset;
        if (index < 0) index = images.length - 1;
        if (index >= images.length) index = 0;
        return index;
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-neutral-900 via-brand-dark/50 to-neutral-900">
            {/* Efectos de luz ambiental (usando 'brand') */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-brand-base/20 rounded-full blur-[120px]"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2], x: [0, 100, 0], y: [0, 50, 0] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-brand-icon/20 rounded-full blur-[120px]"
                    animate={{ scale: [1.3, 1, 1.3], opacity: [0.4, 0.2, 0.4], x: [0, -100, 0], y: [0, -50, 0] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>

            {/* Título de la sección */}
            <motion.div
                className="absolute top-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
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


            <div className="relative w-full h-screen flex items-center justify-center" style={{ perspective: '2500px' }}>
                {/* Stack preview - next images */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    {[1, 2, 3].map((offset) => {
                        const index = getNextIndex(offset);
                        return (
                            <motion.div
                                key={`preview-${index}-${offset}`}
                                className="absolute"
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity: 0.15 - offset * 0.05,
                                    scale: 1 - offset * 0.08,
                                    z: -offset * 100,
                                    rotateY: offset * 8,
                                    x: offset * 60,
                                }}
                                style={{ transformStyle: 'preserve-3d' }}
                            >
                                <div className="w-[70vw] h-[70vh] max-w-5xl max-h-[800px] rounded-3xl overflow-hidden shadow-2xl">
                                    <img
                                        src={images[index]}
                                        alt={`Preview ${index}`}
                                        className="w-full h-full object-cover"
                                        loading="lazy" // Carga la imagen solo cuando se necesite
                                    />
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Main carousel */}
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                    <AnimatePresence initial={false} custom={direction} mode="popLayout">
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            initial={{ rotateY: direction > 0 ? 90 : -90, opacity: 0, scale: 0.6, z: -500 }}
                            animate={{ rotateY: 0, opacity: 1, scale: 1, z: 0 }}
                            exit={{ rotateY: direction < 0 ? 90 : -90, opacity: 0, scale: 0.6, z: -500 }}
                            transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.5}
                            onDragEnd={(e, { offset, velocity }) => {
                                const swipe = swipePower(offset.x, velocity.x);
                                if (swipe < -swipeConfidenceThreshold) {
                                    resetTimeout();
                                    paginate(1);
                                } else if (swipe > swipeConfidenceThreshold) {
                                    resetTimeout();
                                    paginate(-1);
                                }
                            }}
                            className="absolute cursor-grab active:cursor-grabbing"
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            <motion.div
                                className="relative w-[70vw] h-[70vh] max-w-5xl max-h-[800px] rounded-3xl overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]"
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                            >
                                <img
                                    src={images[currentIndex]}
                                    alt={`Slide ${currentIndex + 1}`}
                                    className="w-full h-full object-cover"
                                    loading="lazy" // Carga la imagen solo cuando se necesite
                                />
                                {/* Estos gradientes y efectos se quedan igual */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                <div className="absolute inset-0 flex items-end p-8 text-white">
                                    <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg text-sm font-sans-body opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                        Explora nuestros momentos especiales
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Navigation indicators (Paginación) */}
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                    {images.map((_, index) => (
                        <motion.button
                            key={index}
                            onClick={() => {
                                resetTimeout();
                                setDirection(index > currentIndex ? 1 : -1);
                                setCurrentIndex(index);
                            }}
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

                {/* Partículas flotantes (¡se quedan igual!) */}
                <motion.div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 2 }}
                >
                    {Array.from({ length: 50 }).map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute bg-white/20 rounded-full"
                            style={{
                                width: Math.random() * 8 + 4,
                                height: Math.random() * 8 + 4,
                                x: Math.random() * window.innerWidth - window.innerWidth / 2,
                                y: Math.random() * window.innerHeight - window.innerHeight / 2,
                            }}
                            animate={{
                                x: [null, Math.random() * 200 - 100, Math.random() * 200 - 100, Math.random() * 200 - 100, null],
                                y: [null, Math.random() * 200 - 100, Math.random() * 200 - 100, Math.random() * 200 - 100, null],
                                scale: [1, 1.5, 0.8, 1.2, 1],
                                opacity: [0, 0.5, 0.2, 0.7, 0],
                            }}
                            transition={{
                                duration: Math.random() * 20 + 10,
                                repeat: Infinity,
                                ease: "linear",
                                delay: Math.random() * 5,
                            }}
                        />
                    ))}
                </motion.div>
            </div>
        </div>
    );
}