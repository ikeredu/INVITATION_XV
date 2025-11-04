import { motion } from 'framer-motion';

export default function InvitacionPrincipal() {
    return (
        <div className="relative h-screen w-full overflow-hidden">

            {/* --- EFECTO KEN BURNS --- */}
            <motion.div
                className="absolute inset-0"
                initial={{ scale: 1 }}
                animate={{ scale: 1.1 }}
                transition={{ duration: 15, ease: 'linear' }}
            >
                <img
                    src="/images/DSC_1374.jpg" // La foto de Yeri Paola
                    alt="Quinceañera Yeri Paola"
                    className="w-full h-full object-cover"
                />
            </motion.div>

            {/* --- GRADIENTE --- */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

            {/* --- CONTENIDO --- */}
            <div className="relative h-full flex flex-col justify-between p-8 text-white">

                {/* Sección Superior */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="space-y-2"
                >
                    {/* === MEJORA: Añadido font-light === */}
                    <h2 className="tracking-wider opacity-90 font-sans-body drop-shadow-md">
                        XV Años
                    </h2>
                    {/* === MEJORA: Añadido font-light === */}
                    <h1 className="text-7xl md:text-8xl font-script drop-shadow-lg">
                        Yeri Paola
                    </h1>
                </motion.div>

                {/* Sección Inferior */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="space-y-1 text-left"
                >
                    {/* === MEJORA: Añadido font-light === */}
                    <p className="text-lg font-sans-body drop-shadow-md font-light">13/12/2025</p>
                    {/* === MEJORA: Añadido font-light === */}
                    <p className="text-base font-sans-body drop-shadow-md">19:00 pm</p>
                </motion.div>

            </div>
        </div>
    );
}