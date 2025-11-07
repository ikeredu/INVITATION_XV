import { useState } from 'react';
// Importamos todos los iconos que necesitamos
import { Church, PartyPopper, Loader2, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

type EventType = 'ceremony' | 'reception' | null;

export default function Ubicacion() {
    const [selectedEvent, setSelectedEvent] = useState<EventType>(null);
    const [isLoading, setIsLoading] = useState(false);

    // --- DATOS DE LOS EVENTOS ---
    const ceremonyData = {
        time: '06:00 pm',
        title: 'Ceremonia religiosa',
        address: 'Templo de Santiago Apostol',
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d664.5442752522292!2d-92.7799991950228!3d17.460267919519993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85eda2aab6475da7%3A0xf3c328fef38c68d3!2sParroquia%20Santiago%20Ap%C3%B3stol!5e0!3m2!1ses!2smx!4v1761790346009!5m2!1ses!2smx'
    };

    const receptionData = {
        time: '07:00 pm',
        title: 'Recepción',
        address: 'Casino del pueblo',
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d864.8023109841126!2d-92.77961987645207!3d17.459621378241305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85edbd55469896a7%3A0x90fc8903f2dbc9c7!2sParque%20Del%20Centro!5e0!3m2!1ses!2smx!4v1761790262560!5m2!1ses!2smx'
    };

    const handleEventClick = (eventType: EventType) => {
        const newEvent = selectedEvent === eventType ? null : eventType;
        if (newEvent) {
            setIsLoading(true);
        }
        setSelectedEvent(newEvent);
    };

    return (
        <div className="p-4 flex flex-col justify-center">
            <div className="w-full max-w-md mx-auto flex flex-col flex-1">

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
                        <MapPin className="w-10 h-10 text-brand-base" fill="white" />
                    </motion.div>

                    <h2 className="text-brand-dark text-4xl mb-2 px-4 font-script">
                        Ubicación
                    </h2>
                    <p className="text-brand-base/80 px-4 font-sans-body">
                        ¡No faltes!
                    </p>
                </motion.div>

                {/* --- Botones de Eventos --- */}
                <div className="grid grid-cols-2 gap-3 p-4">

                    {/* Botón Ceremonia */}
                    <button
                        onClick={() => handleEventClick('ceremony')}
                        /*
                         * === 🌟 MEJORA DE UI (AFFORDANCE) ===
                         * INACTIVO: 'bg-white shadow-md' (flota sutilmente)
                         * ACTIVO: 'bg-white shadow-xl border-brand-base' (flota más y tiene borde)
                        */
                        className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-300 ${selectedEvent === 'ceremony'
                            ? 'bg-white shadow-xl border-brand-base' // ACTIVO
                            : 'bg-white shadow-md border-brand-border hover:shadow-lg' // INACTIVO
                            }`}
                    >
                        <Church className="w-6 h-6 text-brand-base" strokeWidth={1.5} />
                        <div className="font-sans-body text-brand-dark font-bold mt-2">{ceremonyData.time}</div>
                        <div className="font-sans-body text-brand-base/90 mt-1 text-center text-sm">
                            {ceremonyData.title}
                        </div>
                    </button>

                    {/* Botón Recepción */}
                    <button
                        onClick={() => handleEventClick('reception')}
                        className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-300 ${selectedEvent === 'reception'
                            ? 'bg-white shadow-xl border-brand-base' // ACTIVO
                            : 'bg-white shadow-md border-brand-border hover:shadow-lg' // INACTIVO
                            }`}
                    >
                        <PartyPopper className="w-6 h-6 text-brand-base" strokeWidth={1.5} />
                        <div className="font-sans-body text-brand-dark font-bold mt-2">{receptionData.time}</div>
                        <div className="font-sans-body text-brand-base/90 mt-1 text-center text-sm">
                            {receptionData.title}
                        </div>
                    </button>
                </div>

                {/* --- Sección del Mapa (con altura fija) --- */}
                <div className="flex-1 px-4 pb-4 flex flex-col">
                    {selectedEvent ? (
                        <div className="border border-brand-border rounded-2xl overflow-hidden h-96 flex flex-col shadow-lg">
                            <div className="bg-brand-light p-3 text-center border-b-2 border-brand-border">
                                <p className="font-sans-body text-brand-dark text-sm">
                                    {selectedEvent === 'ceremony' ? ceremonyData.address : receptionData.address}
                                </p>
                            </div>

                            <div className="relative w-full flex-1" key={selectedEvent}>
                                {isLoading && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm z-10">
                                        <Loader2 className="w-10 h-10 text-brand-base animate-spin" />
                                    </div>
                                )}
                                <iframe
                                    onLoad={() => setIsLoading(false)}
                                    src={selectedEvent === 'ceremony' ? ceremonyData.mapUrl : receptionData.mapUrl}
                                    width="100%"
                                    height="100%"
                                    className="absolute inset-0"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title={selectedEvent === 'ceremony' ? 'Mapa Ceremonia' : 'Mapa Recepción'}
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="h-96 flex-1 flex items-center justify-center border-2 border-dashed border-brand-border rounded-2xl bg-brand-light/30">
                            <p className="font-sans-body text-brand-icon italic">
                                Selecciona un evento para ver el mapa
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}