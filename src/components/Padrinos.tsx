import { Heart, Users, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect, useRef, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { type EmblaCarouselType } from 'embla-carousel';

// --- DATOS (Sin cambios) ---
const personas = [
    {
        titulo: "Padrinos de Brindis",
        icono: Sparkles,
        personas: [{ nombre: "Ing. Ana Ara Arcos", rol: "" }, { nombre: "Ing. David Cruz Hernández", rol: "" }],
        gradienteIcono: "from-brand-base to-brand-icon",
        gradienteBg: "from-brand-light/20 to-brand-light/50"
    },
    {
        titulo: "Padres",
        icono: Heart,
        personas: [{ nombre: "Sra. Elizabeth Cruz Hernández", rol: "" }, { nombre: "Prof. Royder Méndez Frank", rol: "" }],
        gradienteIcono: "from-brand-base to-brand-icon",
        gradienteBg: "from-brand-light/20 to-brand-light/50"
    },
    {
        titulo: "Padrinos de Velación",
        icono: Users,
        personas: [{ nombre: "Sra. Rosa Elena Feliciano López", rol: "" }, { nombre: "Ing. Manuel Damián Martínez", rol: "" }],
        gradienteIcono: "from-brand-base to-brand-icon",
        gradienteBg: "from-brand-light/20 to-brand-light/50"
    }
];

export default function Padrinos() {
    const [activeIndex, setActiveIndex] = useState(0);
    // 💡 NUEVO ESTADO: Usamos este estado simple para forzar la animación en la prop 'key'
    const [animationKey, setAnimationKey] = useState(0);

    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center', startIndex: 1 });

    useEffect(() => {
        if (!emblaApi) return;
        const onSelect = (api: EmblaCarouselType) => { setActiveIndex(api.selectedScrollSnap()); };
        emblaApi.on('select', onSelect);
        onSelect(emblaApi);
        return () => { emblaApi.off('select', onSelect); };
    }, [emblaApi]);
    
    // 💡 Función para disparar la animación
    const triggerPistaAnimation = useCallback(() => {
        // Incrementamos la key, forzando a Framer Motion a re-ejecutar la animación
        setAnimationKey(prevKey => prevKey + 1);
    }, []); 

    return (
        <div className="py-12 px-4 overflow-hidden">
            <div className="max-w-full mx-auto">

                {/* --- Título de la Sección (Sin cambios) --- */}
                <motion.div
                    className="text-center mb-8"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <motion.div
                        className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-lg mb-4"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                    >
                        <Heart className="w-10 h-10 text-brand-base" fill="currentColor" />
                    </motion.div>

                    <h2 className="text-brand-dark text-4xl mb-2 px-4 font-script">
                        Personas especiales
                    </h2>
                    <p className="text-brand-base/80 px-4 font-sans-body">
                        Que nos acompañan en este día tan importante
                    </p>
                </motion.div>

                {/* --- Indicador de deslizar --- */}
                <motion.div
                    className="text-center mb-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    // 💡 Disparamos la animación cada vez que entra en la vista
                    onViewportEnter={triggerPistaAnimation} 
                    viewport={{ once: false }} // Permitimos que el componente se re-evalúe
                    transition={{ delay: 0.5, duration: 0.6 }}
                >
                    <motion.p
                        className="text-brand-base/70 text-sm font-sans-body"
                        animate={{ x: [0, 10, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                    >
                        ← Deslice las tarjetas para ver más →
                    </motion.p>
                </motion.div>

                {/* === CONTENEDOR DEL CARRUSEL (Pista que se repite) === */}
                <motion.div
                    // 💡 Usamos la key para forzar la re-ejecución
                    key={animationKey} 
                    initial={{ x: 0 }} 
                    animate={{ x: [0, -35, 0] }}
                    transition={{ 
                        delay: 0.1, // Un delay mínimo para que no se vea el salto
                        duration: 1.5, 
                        ease: "easeOut",
                        repeat: 2, 
                        repeatType: "reverse", 
                        repeatDelay: 0.5 
                    }}
                >
                    {/* === El Carrusel Embla === */}
                    <div
                        className="overflow-hidden cursor-grab active:cursor-grabbing"
                        ref={emblaRef}
                    >
                        <div className="flex -ml-4 py-4">
                            {personas.map((categoria, index) => {
                                // ... (JSX de las tarjetas, sin cambios) ...
                                const IconComponent = categoria.icono;
                                const isActive = index === activeIndex;
                                return (
                                    <div key={index} className="flex-shrink-0 w-[85%] sm:w-[70%] md:w-1/3 pl-4">
                                        <motion.div
                                            className="h-full"
                                            animate={{
                                                scale: isActive ? 1.05 : 0.95,
                                                opacity: isActive ? 1 : 0.7
                                            }}
                                            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                                        >
                                            <div className="bg-white rounded-3xl p-6 shadow-xl h-full relative overflow-hidden border border-brand-border">
                                                <div className={`absolute top-0 left-0 right-0 h-32 bg-gradient-to-br ${categoria.gradienteBg} rounded-t-3xl`} />

                                                <motion.div
                                                    className="flex justify-center mb-4 relative z-10"
                                                    animate={{ rotate: [0, 25, -25, 0] }}
                                                    transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                                                >
                                                    <div className={`w-20 h-20 bg-gradient-to-br ${categoria.gradienteIcono} rounded-full flex items-center justify-center shadow-lg`}>
                                                        <IconComponent className="w-10 h-10 text-white" strokeWidth={2.5} />
                                                    </div>
                                                </motion.div>

                                                <h3 className="text-center text-brand-base text-2xl mb-6 relative z-10 font-script">
                                                    {categoria.titulo}
                                                </h3>

                                                <div className="space-y-5 relative z-10">
                                                    {categoria.personas.map((persona, pIndex) => (
                                                        <motion.div
                                                            key={pIndex}
                                                            className="text-center bg-brand-light/50 rounded-2xl py-3 px-4"
                                                            initial={{ opacity: 0, x: -20 }}
                                                            whileInView={{ opacity: 1, x: 0 }}
                                                            viewport={{ once: true }}
                                                            transition={{ delay: pIndex * 0.1 + 0.3 }}
                                                        >
                                                            <p className="text-gray-700 font-sans-body">{persona.nombre}</p>
                                                            <p className="text-brand-base text-sm font-sans-body">{persona.rol}</p>
                                                        </motion.div>
                                                    ))}
                                                </div>

                                                <motion.div
                                                    className="absolute bottom-4 right-4 text-brand-border"
                                                    animate={{ y: [0, -10, 0], opacity: [0.3, 0.6, 0.3] }}
                                                    transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                                                >
                                                    <Heart className="w-6 h-6" fill="currentColor" />
                                                </motion.div>
                                            </div>
                                        </motion.div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}