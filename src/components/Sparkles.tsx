import { motion } from 'framer-motion';

// Helper function for random values
const random = (min: number, max: number) => Math.random() * (max - min) + min;

// The individual Sparkle component remains the same
const Sparkle = ({ top, left, delay, duration }: { top: string, left: string, delay: number, duration: number }) => (
    <motion.div
        className="absolute text-gray-300" // Color plateado
        style={{
            top,
            left,
            fontSize: '14px', // Ajustamos el tamaño para la nueva forma
            textShadow: '0 0 6px rgba(192, 192, 192, 0.7)', // Brillo plateado
        }}
        initial={{ opacity: 0 }}
        animate={{ 
            opacity: [0, 1, 0],
            scale: [0.5, 1.2, 0.5]
        }}
        transition={{
            duration,
            repeat: Infinity,
            repeatType: 'loop',
            delay,
            ease: 'easeInOut',
        }}
    >
        ✦
    </motion.div>
);

// --- ✅ WRAPPER AHORA ACEPTA UNA PROPIEDAD 'COUNT' ---
export const Sparkles = ({ count = 20 }: { count?: number }) => {
    // La generación de datos ahora está dentro del componente
    const sparklesData = Array.from({ length: count }).map(() => ({
        top: `${random(5, 95)}%`,
        left: `${random(5, 95)}%`,
        delay: random(0, 3),
        duration: random(2, 4),
    }));

    return (
        <div className="absolute inset-0 z-10 pointer-events-none">
            {sparklesData.map((sparkle, i) => <Sparkle key={i} {...sparkle} />)}
        </div>
    );
};