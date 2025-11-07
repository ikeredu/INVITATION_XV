import { useEffect, useState } from 'react';
import { Clock, Quote } from 'lucide-react';

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

    // Lógica del contador (restaurada)
    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const pad = (num: number) => String(num).padStart(2, '0');

    // --- ESTRUCTURA JSX ---
    return (
        /*
         * === REFACTORIZACIÓN ===
         * Quitamos 'min-h-screen', 'bg-brand-light', 'py-16'.
         * El 'index.astro' ahora maneja el fondo y el padding vertical.
         * Dejamos 'p-8' para el padding horizontal.
        */
        <div className="p-8 text-center">
            <div className="max-w-lg mx-auto w-full">

                {/* --- 1. El Texto de Invitación --- */}
                <div className="mb-12">
                    <div className="flex justify-center mb-6">
                        <Quote className="text-brand-icon" size={40} strokeWidth={1} />
                    </div>

                    <p className="text-xl md:text-2xl text-brand-dark leading-relaxed font-script mb-8">
                        "Como no recordar que hace 15 años nació la flor más hermosa de este hogar, por eso te queremos invitar a su celebración, con mucha alegría y dando gracias a Dios por regalarnos tan bello tesoro."
                    </p>

                    <p className="text-2xl font-script text-brand-dark">
                        Papás de Yeri Paola
                    </p>
                </div>

                {/* --- 2. El Contador (La Tarjeta) --- */}
                {/* Esta tarjeta 'bg-white' flota sobre el fondo 'bg-brand-light' del index */}
                <div className="bg-white rounded-2xl p-8 shadow-lg w-full border border-brand-border">
                    <div className="flex justify-center mb-6">
                        <Clock className="text-brand-icon" size={32} strokeWidth={1.5} />
                    </div>

                    <h3 className="text-center text-brand-base mb-6 tracking-wide font-sans-body font-light uppercase text-sm">
                        Faltan
                    </h3>

                    <div className="flex justify-between divide-x divide-brand-border">
                        <div className="flex-1 flex flex-col items-center font-sans-body">
                            <div className="text-4xl md:text-5xl text-brand-dark tabular-nums">
                                {pad(timeLeft.days)}
                            </div>
                            <div className="text-sm text-brand-subtext mt-3">Días</div>
                        </div>

                        <div className="flex-1 flex flex-col items-center font-sans-body">
                            <div className="text-4xl md:text-5xl text-brand-dark tabular-nums">
                                {pad(timeLeft.hours)}
                            </div>
                            <div className="text-sm text-brand-subtext mt-3">Horas</div>
                        </div>

                        <div className="flex-1 flex flex-col items-center font-sans-body">
                            <div className="text-4xl md:text-5xl text-brand-dark tabular-nums">
                                {pad(timeLeft.minutes)}
                            </div>
                            <div className="text-sm text-brand-subtext mt-3">Minutos</div>
                        </div>

                        <div className="flex-1 flex flex-col items-center font-sans-body">
                            <div className="text-4xl md:text-5xl text-brand-dark tabular-nums">
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