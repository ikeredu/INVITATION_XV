import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Shirt, Sparkles, Footprints, Dog, Palette, ShoppingBag, CardSim } from 'lucide-react';


import useEmblaCarousel from 'embla-carousel-react';

import { type EmblaCarouselType } from 'embla-carousel';


const wishlistItems = [

    {
        icon: Shirt,
        title: "Vestidos",
        description: "Talla M - Paola ama los vestidos elegantes y coloridos",
    },
    {
        icon: Footprints,
        title: "Calzado",
        description: "Talla 25 - Luce bien con tenis o zapatillas en colores neutros",
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
    {
        icon: CardSim,
        title: "Tarjetas de regalo",
        description: "De cualquier plataforma, o tienda departamental",
    },
];

const phrases = [
    "¡Pero recuerda que tu presencia es el mejor regalo! 💖",
    "Los tenis favoritos de Yeri son los Converse 💙",
    "Su animal favorito son los gatos 🌿",
    "El rosa es el color favorito de Paola 💕",
    "El estilo que porta puede ser casual, o elegante ✨",
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
                    <motion.div
                        className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-lg mb-4"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                    >
                        <Gift className="w-10 h-10 text-brand-base" fill="white" />
                    </motion.div>

                    <h2 className="text-brand-dark text-4xl mb-2 px-4 font-script">
                        Lista de Deseos
                    </h2>
                    <p className="text-brand-base/80 px-4 font-sans-body">
                        Si deseas hacer un regalo, aquí están algunas ideas de obsequios, que de seguro le encantarán
                    </p>
                </motion.div>

                {/* === 5. Indicador "Desliza" === */}
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
                                <p className="text-brand-base text-2xl font-script">
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