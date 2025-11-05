import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Shirt, Sparkles, Footprints, Dog, Palette, ShoppingBag } from 'lucide-react';

// === 🔴 ¡LA CORRECCIÓN DEFINITIVA DE IMPORTS! ===
import useEmblaCarousel from 'embla-carousel-react';
// 1. El TIPO correcto se importa desde el paquete 'embla-carousel'
import { type EmblaCarouselType } from 'embla-carousel';
// 2. NO importamos 'Autoplay'

// --- DATOS (Tus arrays) ---
const wishlistItems = [
    {
        icon: Footprints,
        title: "Mis tenis favoritos",
        description: "Los Converse son mi estilo, casuales y cómodos 💙",
    },
    {
        icon: Dog,
        title: "Peluches",
        description: "De cualquier animalito adorable que me recuerde este día",
    },
    {
        icon: Shirt,
        title: "Vestidos",
        description: "Talla M - Me encantan los vestidos elegantes y coloridos",
    },
    {
        icon: Palette,
        title: "Mi color favorito",
        description: "El rosa me hace sentir feliz y alegre 💕",
    },
    {
        icon: ShoppingBag,
        title: "Bolsas",
        description: "Bolsas lindas para lucir en cada ocasión",
    },
    {
        icon: Sparkles,
        title: "Maquillaje",
        description: "Labiales, sombras, rubores y todo lo que brille ✨",
    },
    {
        icon: Gift,
        title: "Accesorios",
        description: "Aretes, collares, pulseras, diademas y más",
    },
];

const phrases = [
    "¡Pero recuerda que tu presencia es el mejor regalo! 💖",
    "Mis tenis favoritos son los Converse 💙",
    "Mi animal favorito son los gatos 🌿",
    "El rosa es mi color favorito 💕",
    "Me encanta el estilo elegante y casual ✨",
];

export default function MesaDeRegalos() {
    const [currentPhrase, setCurrentPhrase] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);

    // --- Lógica de Frases (Se queda igual) ---
    useEffect(() => {
        const phraseTimer = setInterval(() => {
            setCurrentPhrase((prev) => (prev + 1) % phrases.length);
        }, 3000);
        return () => clearInterval(phraseTimer);
    }, []);

    // === 3. Configuración de Embla (SIN AUTOPLAY) ===
    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            loop: true, // ¡Tu 'loop circular'!
            align: 'center'
        }
    );

    // === 4. Lógica para la tarjeta "grande" (Ahora SÍ funciona) ===
    useEffect(() => {
        if (!emblaApi) return;

        // Usamos el TIPO 'EmblaCarouselType' (importado de 'embla-carousel')
        const onSelect = (api: EmblaCarouselType) => {
            // El método 'selectedScrollSnap()' ahora SÍ existe en este tipo
            setActiveIndex(api.selectedScrollSnap());
        };

        emblaApi.on('select', onSelect);
        onSelect(emblaApi);

        return () => { emblaApi.off('select', onSelect); };
    }, [emblaApi]);

    return (
        <div className="py-12 px-4 overflow-hidden">
            <div className="max-w-full mx-auto">

                {/* --- Título de la Sección --- */}
                <motion.div
                    className="text-center mb-8"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-lg mb-4">
                        <Gift className="w-10 h-10 text-brand-base" />
                    </div>
                    <h2 className="text-brand-dark text-4xl mb-2 px-4 font-script">
                        Lista de Deseos
                    </h2>
                    <p className="text-brand-base/80 px-4 font-sans-body max-w-md mx-auto">
                        Si deseas hacerme un regalo, aquí están algunas ideas de cosas que me encantaría recibir
                    </p>
                </motion.div>

                {/* === 5. Indicador "Desliza" (Restaurado) === */}
                <motion.div
                    className="text-center mb-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                >
                    <motion.p
                        className="text-brand-base/70 text-sm font-sans-body"
                        animate={{ x: [0, 10, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                    >
                        ← Desliza para ver más →
                    </motion.p>
                </motion.div>

                {/* --- El Carrusel Embla (Manual e Infinito) --- */}
                <div
                    // 'overflow-hidden' QUITA LA BARRA FEA
                    className="overflow-hidden cursor-grab active:cursor-grabbing"
                    ref={emblaRef}
                >
                    <div className="flex -ml-4 py-4">
                        {wishlistItems.map((item, index) => {
                            const IconComponent = item.icon;
                            const isActive = index === activeIndex;
                            return (
                                <div key={index} className="flex-shrink-0 w-[85%] sm:w-[70%] md:w-1/3 pl-4">
                                    {/* === 6. El efecto "scale" (más grande) === */}
                                    <motion.div
                                        className="h-full"
                                        animate={{
                                            scale: isActive ? 1.05 : 0.95,
                                            opacity: isActive ? 1 : 0.7
                                        }}
                                        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                                    >
                                        <div className="bg-white rounded-3xl p-8 shadow-xl h-full border border-brand-border flex flex-col items-center text-center space-y-4">
                                            <div className="inline-flex items-center justify-center w-20 h-20 bg-brand-light/50 rounded-full">
                                                <IconComponent className="w-12 h-12 text-brand-base" />
                                            </div>
                                            <h3 className="text-brand-base text-2xl font-script">
                                                {item.title}
                                            </h3>
                                            <p className="text-gray-600 text-sm font-sans-body flex-grow">
                                                {item.description}
                                            </p>
                                        </div>
                                    </motion.div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* --- Tarjeta de Frases Rotativas (Se queda igual) --- */}
                <div className="text-center mt-12 max-w-md mx-auto relative h-24 flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentPhrase}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-0"
                        >
                            <div className="bg-white border-0 shadow-lg rounded-3xl p-6 w-full h-full flex items-center justify-center border-brand-border">
                                <p className="text-brand-dark italic font-script text-xl">
                                    {phrases[currentPhrase]}
                                </p>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

            </div>
        </div>
    );
}