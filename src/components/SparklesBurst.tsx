// src/components/SparklesBurst.tsx

import { motion } from 'framer-motion';

// Helper function for random values
const random = (min: number, max: number) => Math.random() * (max - min) + min;

const silverColor = "#C0C0C0";

// El Sparkle individual (ahora Plateado)
const Sparkle = ({ top, left, delay, duration }: { top: string, left: string, delay: number, duration: number }) => (
    <motion.div
        className="absolute"
        style={{
            top,
            left,
            fontSize: '14px',
            color: silverColor, // Color plateado
            textShadow: '0 0 6px rgba(192, 192, 192, 0.7)', // Sombra plateada
        }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1.2, 0.5]
        }}
        transition={{
            duration,
            delay,
            ease: 'easeOut',
        }}
    >
        ✦
    </motion.div>
);

// El componente wrapper
export const SparklesBurst = ({ count = 30 }: { count?: number }) => {
    const sparklesData = Array.from({ length: count }).map(() => ({
        top: `${random(5, 95)}%`,
        left: `${random(5, 95)}%`,
        delay: random(0, 0.4),
        duration: random(1.5, 2.0), // Duración ajustada a 3s
    }));

    return (
        // 💡 CAMBIO CLAVE: 'absolute' a 'fixed' para que cubra toda la pantalla
        <div className="fixed inset-0 z-50 pointer-events-none">
            {sparklesData.map((sparkle, i) => <Sparkle key={i} {...sparkle} />)}
        </div>
    );
};