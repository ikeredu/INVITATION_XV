// src/components/HeroAnimado.tsx

import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HeroAnimado() {
    return (
        <div className="relative min-h-screen w-full overflow-hidden">
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