import { useEffect, useState } from 'react';
import { Clock, Quote } from 'lucide-react';

// --- LÓGICA DE REACT (Se queda igual) ---

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

function calculateTimeLeft() {
    const targetDate = new Date('2025-12-13T19:00:00').getTime(); // 13 de Dic, 7:00 PM
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance > 0) {
        return {
            days: Math.floor(distance / (1000 * 60 * 60 * 24)),
            hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((distance % (1000 * 60)) / 1000),
        };
    }
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
}



export default function Contador() {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
    useEffect(() => { /* ... */ }, []);
    const pad = (num: number) => String(num).padStart(2, '0');

    // --- ESTRUCTURA JSX (ACTUALIZADA A 'BRAND') ---
    return (
        // === CAMBIO: 'bg-brand-light' ===
        <div className="bg-brand-light p-8 py-16 text-center min-h-screen flex flex-col justify-center">
            <div className="max-w-lg mx-auto w-full">

                {/* --- 1. El Texto de Invitación --- */}
                <div className="mb-12">
                    <div className="flex justify-center mb-6">
                        {/* === CAMBIO: 'text-brand-icon' (más vibrante) === */}
                        <Quote className="text-brand-icon" size={40} strokeWidth={1} />
                    </div>
                    <p className="text-lg md:text-xl text-gray-700 leading-relaxed italic font-sans-body mb-8">
                        "Como no recordar que hace 15 años nació la flor más hermosa de este hogar, por eso te queremos invitar a su celebración, con mucha alegría y dando gracias a Dios por regalarnos tan bello tesoro."
                    </p>
                    {/* === CAMBIO: 'text-brand-dark' === */}
                    <p className="text-2xl font-script text-brand-dark">
                        Papás de Yeri Paola
                    </p>
                </div>

                {/* --- 2. El Contador (La Tarjeta) --- */}
                {/* === CAMBIO: 'border-brand-border' === */}
                <div className="bg-white rounded-2xl p-8 shadow-lg w-full border border-brand-border">
                    <div className="flex justify-center mb-6">
                        {/* === CAMBIO: 'text-brand-icon' === */}
                        <Clock className="text-brand-icon" size={32} strokeWidth={1.5} />
                    </div>

                    {/* === CAMBIO: 'text-brand-base' === */}
                    <h3 className="text-center text-brand-base mb-6 tracking-wide font-sans-body font-light uppercase text-sm">
                        Faltan
                    </h3>

                    {/* === CAMBIO: 'divide-brand-border' === */}
                    <div className="flex justify-between divide-x divide-brand-border">

                        {/* Días */}
                        <div className="flex-1 flex flex-col items-center font-sans-body">
                            {/* === CAMBIO: 'text-brand-dark' / 'text-brand-subtext' === */}
                            <div className="text-5xl text-brand-dark tabular-nums">
                                {pad(timeLeft.days)}
                            </div>
                            <div className="text-sm text-brand-subtext mt-3">Días</div>
                        </div>

                        {/* Horas */}
                        <div className="flex-1 flex flex-col items-center font-sans-body pl-4">
                            <div className="text-5xl text-brand-dark tabular-nums">
                                {pad(timeLeft.hours)}
                            </div>
                            <div className="text-sm text-brand-subtext mt-3">Horas</div>
                        </div>

                        {/* Minutos */}
                        <div className="flex-1 flex flex-col items-center font-sans-body pl-4">
                            <div className="text-5xl text-brand-dark tabular-nums">
                                {pad(timeLeft.minutes)}
                            </div>
                            <div className="text-sm text-brand-subtext mt-3">Minutos</div>
                        </div>

                        {/* Segundos */}
                        <div className="flex-1 flex flex-col items-center font-sans-body pl-4">
                            <div className="text-5xl text-brand-dark tabular-nums">
                                {pad(timeLeft.seconds)}
                            </div>
                            <div className="text-sm text-brand-subtext mt-3">Segundos</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}