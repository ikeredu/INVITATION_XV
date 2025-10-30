import { useState } from 'react';
// === MEJORA 1: Importamos el icono de 'Loader2' ===
import { Church, PartyPopper, Loader2 } from 'lucide-react';

type EventType = 'ceremony' | 'reception' | null;

export default function Ubicacion() {
    const [selectedEvent, setSelectedEvent] = useState<EventType>(null);
    // === MEJORA 2: Añadimos el estado de carga ===
    const [isLoading, setIsLoading] = useState(false);

    // --- DATOS DE LOS EVENTOS ---
    const ceremonyData = {
        time: '06:00 pm',
        title: 'Ceremonia religiosa',
        address: 'Templo de Santiago Apostol',
        // ¡Recuerda poner tus URLs de "Insertar un mapa" aquí!
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d664.5442752522292!2d-92.7799991950228!3d17.460267919519993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85eda2aab6475da7%3A0xf3c328fef38c68d3!2sParroquia%20Santiago%20Ap%C3%B3stol!5e0!3m2!1ses!2smx!4v1761790346009!5m2!1ses!2smx'
    };

    const receptionData = {
        time: '07:00 pm',
        title: 'Recepción',
        address: 'Casino del pueblo',
        // ¡Recuerda poner tus URLs de "Insertar un mapa" aquí!
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d864.8023109841126!2d-92.77961987645207!3d17.459621378241305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85edbd55469896a7%3A0x90fc8903f2dbc9c7!2sParque%20Del%20Centro!5e0!3m2!1ses!2smx!4v1761790262560!5m2!1ses!2smx'
    };

    // === MEJORA 3: Actualizamos el manejador de clic ===
    const handleEventClick = (eventType: EventType) => {
        const newEvent = selectedEvent === eventType ? null : eventType;

        // Solo mostramos el loader si vamos a MOSTRAR un mapa
        if (newEvent) {
            setIsLoading(true);
        }

        setSelectedEvent(newEvent);
    };

    return (
        <div className="min-h-screen bg-fuchsia-50 p-4 py-16 flex flex-col justify-center">
            <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col flex-1">

                {/* --- Título de la Sección --- */}
                <div className="p-6 text-center border-b border-fuchsia-100">
                    <h2 className="text-3xl font-script text-fuchsia-700">Ubicación</h2>
                    <p className="font-sans-body text-gray-600 mt-2">¡No faltes!</p>
                </div>

                {/* --- Botones de Eventos --- */}
                <div className="grid grid-cols-2 gap-3 p-4">
                    {/* Botón Ceremonia */}
                    <button
                        onClick={() => handleEventClick('ceremony')}
                        className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all duration-300 ${selectedEvent === 'ceremony'
                            ? 'border-fuchsia-600 bg-fuchsia-50 shadow-inner'
                            : 'border-fuchsia-200 hover:border-fuchsia-400 hover:bg-fuchsia-50'
                            }`}
                    >
                        <Church className="w-6 h-6 text-fuchsia-600" strokeWidth={1.5} />
                        <div className="font-sans-body text-fuchsia-700 font-bold mt-2">{ceremonyData.time}</div>
                        <div className="font-sans-body text-fuchsia-600/90 mt-1 text-center text-sm">
                            {ceremonyData.title}
                        </div>
                    </button>

                    {/* Botón Recepción */}
                    <button
                        onClick={() => handleEventClick('reception')}
                        className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all duration-300 ${selectedEvent === 'reception'
                            ? 'border-fuchsia-600 bg-fuchsia-50 shadow-inner'
                            : 'border-fuchsia-200 hover:border-fuchsia-400 hover:bg-fuchsia-50'
                            }`}
                    >
                        <PartyPopper className="w-6 h-6 text-fuchsia-600" strokeWidth={1.5} />
                        <div className="font-sans-body text-fuchsia-700 font-bold mt-2">{receptionData.time}</div>
                        <div className="font-sans-body text-fuchsia-600/90 mt-1 text-center text-sm">
                            {receptionData.title}
                        </div>
                    </button>
                </div>

                {/* --- Sección del Mapa --- */}
                <div className="flex-1 px-4 pb-4 flex flex-col">
                    {selectedEvent ? (
                        <div className="border-2 border-fuchsia-100 rounded-lg overflow-hidden h-full flex flex-col flex-1">
                            {/* Dirección */}
                            <div className="bg-fuchsia-50 p-3 text-center border-b-2 border-fuchsia-100">
                                <p className="font-sans-body text-fuchsia-700 text-sm">
                                    {selectedEvent === 'ceremony' ? ceremonyData.address : receptionData.address}
                                </p>
                            </div>

                            {/* Mapa (Iframe) */}
                            {/* Usamos 'key' para forzar el re-renderizado del iframe */}
                            <div className="relative w-full flex-1" key={selectedEvent}>

                                {/* === MEJORA 5: El Spinner de Carga === */}
                                {isLoading && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm z-10">
                                        <Loader2 className="w-10 h-10 text-fuchsia-600 animate-spin" />
                                    </div>
                                )}

                                <iframe
                                    // === MEJORA 4: El evento onLoad ===
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
                        // Placeholder
                        <div className="h-full flex-1 flex items-center justify-center border-2 border-dashed border-fuchsia-200 rounded-lg">
                            <p className="font-sans-body text-fuchsia-500 italic">
                                Selecciona un evento para ver el mapa
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}