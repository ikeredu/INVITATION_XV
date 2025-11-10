// src/components/TarjetaConfirmacion.tsx
import React from 'react';
import { Calendar, MapPin, Users, Ticket, Sparkles, Clock } from 'lucide-react';

// Interfaz de props para la tarjeta
interface TarjetaConfirmacionProps {
    nombreFamilia: string;
    asistentesConfirmados: number;
    numeroMesa: string | null;
}

// Usamos React.forwardRef para poder pasar una ref desde el componente padre
export const TarjetaConfirmacion = React.forwardRef<HTMLDivElement, TarjetaConfirmacionProps>(
    ({ nombreFamilia, asistentesConfirmados, numeroMesa }, ref) => {
        const fuchsiaColor = "#C71585"; // Mismo color que en otros componentes

        return (
            // Contenedor principal de la tarjeta con un tamaño fijo para la captura
            <div
                ref={ref}
                className="w-[400px] bg-white p-6 font-sans text-gray-800 shadow-2xl rounded-2xl border border-brand-border"
            >
                {/* Encabezado */}
                <div className="text-center border-b-2 border-gray-100 pb-4 mb-4">
                    <h1 className="text-3xl" style={{ fontFamily: "'Dancing Script', cursive", color: fuchsiaColor }}>XV Años</h1>
                    <h2 className="text-4xl" style={{ fontFamily: "'Dancing Script', cursive", color: fuchsiaColor }}>Yeri Paola Méndez Cruz</h2>
                    <p className="text-lg text-gray-600 mt-2" style={{ fontFamily: "'Lato', sans-serif" }}>¡Gracias por confirmar!</p>
                </div>

                {/* Detalles de la Confirmación del Invitado */}
                <div className="mb-6">
                    <h3 className="text-xl text-gray-700 mb-3 text-center" style={{ fontFamily: "'Dancing Script', cursive" }}>Tu Confirmación</h3>
                    <div className="bg-brand-light/50 rounded-xl p-4 space-y-3 text-lg" style={{ fontFamily: "'Lato', sans-serif" }}>
                        <div className="flex items-center">
                            <Users className="w-5 h-5 mr-3 flex-shrink-0" style={{ color: fuchsiaColor }} />
                            <span><strong className="font-semibold">{nombreFamilia}</strong></span>
                        </div>
                        <div className="flex items-center">
                            <Ticket className="w-5 h-5 mr-3 flex-shrink-0" style={{ color: fuchsiaColor }} />
                            <span>{asistentesConfirmados} {asistentesConfirmados === 1 ? 'asistente confirmado' : 'asistentes confirmados'}</span>
                        </div>
                        {numeroMesa && (
                            <div className="flex items-center">
                                <MapPin className="w-5 h-5 mr-3 flex-shrink-0" style={{ color: fuchsiaColor }} />
                                <span>Mesa: <strong className="font-semibold">{numeroMesa}</strong></span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Detalles del Evento */}
                <div className="mb-6">
                    <h3 className="text-xl text-gray-700 mb-3 text-center" style={{ fontFamily: "'Dancing Script', cursive" }}>Detalles del Evento</h3>
                    <div className="bg-gray-50 rounded-xl p-4 space-y-3 text-lg" style={{ fontFamily: "'Lato', sans-serif" }}>
                        <div className="flex items-center">
                            <Calendar className="w-5 h-5 mr-3 flex-shrink-0" style={{ color: fuchsiaColor }} />
                            <span>13 de Diciembre del 2025</span>
                        </div>
                        <div className="flex items-center">
                            <Clock className="w-5 h-5 mr-3 flex-shrink-0" style={{ color: fuchsiaColor }} />
                            <span>Ceremonia Religiosa: 6:00 PM</span>
                        </div>
                        <div className="flex items-center">
                            <Clock className="w-5 h-5 mr-3 flex-shrink-0" style={{ color: fuchsiaColor }} />
                            <span>Recepción: 7:00 PM</span>
                        </div>
                    </div>
                </div>

                {/* Pie de la tarjeta */}
                <div className="text-center border-t-2 border-gray-100 pt-4 mt-4">
                    <Sparkles className="w-6 h-6 mx-auto mb-2" style={{ color: fuchsiaColor }} />
                    <p className="text-lg text-gray-600" style={{ fontFamily: "'Dancing Script', cursive" }}>"Nos vemos pronto"</p>
                </div>
            </div>
        );
    }
);