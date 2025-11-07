// src/components/DressCode.tsx

import { motion } from "framer-motion";
import { Palette } from "lucide-react";

// Definimos los 5 colores
const allColors = [
    { color: "#FF00FF" }, // Fucsia
    { color: "#FF69B4" }, // Rosa fuerte
    { color: "#FF1493" }, // Rosa intenso
    { color: "#E0115F" }, // Rubí
    { color: "#C71585" }  // Magenta
];

const topRowColors = allColors.slice(0, 3);
const bottomRowColors = allColors.slice(3, 5);

// 💡 ELIMINAMOS la función 'circleAnimation' que causaba el error

export default function DressCode() {
    return (
        <div className="py-12 px-8 text-center overflow-hidden">
            <div className="max-w-lg mx-auto w-full">

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
                        <Palette className="w-10 h-10 text-brand-base" />
                    </motion.div>

                    <h2 className="text-brand-dark text-4xl mb-2 px-4 font-script">
                        Colores reservados
                    </h2>
                    <p className="text-brand-base/80 px-4 font-sans-body">
                        Los colores fiucsa y afines en la vestimenta, están reservados exclusivamente para la quinceañera
                    </p>
                </motion.div>

                {/* --- La Card SUTIL (Actualizada) --- */}
                <motion.div
                    className="bg-white rounded-2xl p-8 shadow-lg w-full border border-brand-border"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    {/* Fila 1: 3 Círculos (Animados EN LÍNEA) */}
                    <motion.div
                        className="flex justify-center gap-4 sm:gap-6"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                    >
                        {topRowColors.map((item, index) => (
                            <motion.div
                                key={index}
                                // 💡 Animación en línea
                                animate={{
                                    y: [-2, 2, -2],
                                    scale: [1, 1.03, 1],
                                    transition: {
                                        duration: 3 + index * 0.3, // delay e index combinados para variar
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: index * 0.3
                                    }
                                }}
                            >
                                <div
                                    className="w-12 h-12 rounded-full shadow-md border-2 border-gray-100"
                                    style={{ backgroundColor: item.color }}
                                />
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Fila 2: 2 Círculos (Animados EN LÍNEA) */}
                    <motion.div
                        className="flex justify-center mt-6 gap-4 sm:gap-6"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.8, duration: 0.5 }}
                    >
                        {bottomRowColors.map((item, index) => (
                            <motion.div
                                key={index}
                                // 💡 Animación en línea
                                animate={{
                                    y: [-2, 2, -2],
                                    scale: [1, 1.03, 1],
                                    transition: {
                                        duration: 3 + (index + 3) * 0.3, // continuamos el delay
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: (index + 3) * 0.3 // +3 para que sean diferentes a los de arriba
                                    }
                                }}
                            >
                                <div
                                    className="w-12 h-12 rounded-full shadow-md border-2 border-gray-100"
                                    style={{ backgroundColor: item.color }}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                    {/* --- Texto de Agradecimiento (Sin cambios) --- */}
                    <div className="font-sans-body text-brand-base/90 mt-1 text-center text-sm">
                        Agradecemos tu comprensión y cooperación
                    </div>
                </motion.div>

            </div>
        </div>
    );
}