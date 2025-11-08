// src/components/ConfirmarAsistencia.tsx

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Heart, CheckCircle2, Plus, Minus, ClipboardList, Check, Download, Frown } from "lucide-react";
import { toast } from "sonner";
import html2canvas from 'html2canvas';

import { SparklesBurst } from "./SparklesBurst";
import { TarjetaConfirmacion } from "./TarjetaConfirmacion";

// Interfaz segura que permite props opcionales/nulas
interface ConfirmarAsistenciaProps {
    invitado?: {
        nombre_invitado_principal: string;
        num_acompanantes_permitidos: number;
        token_secreto: string;
        mesas: { nombre_mesa: string } | { nombre_mesa: string }[] | null;
        confirmado: boolean;
        num_asistentes_confirmados: number;
    } | null;
}

const fuchsiaColor = "#C71585";

export default function ConfirmarAsistencia({ invitado }: ConfirmarAsistenciaProps) {
    // BARRERA DE SEGURIDAD: Si por alguna razón 'invitado' es nulo o undefined,
    // mostramos un error controlado en lugar de romper la aplicación.
    if (!invitado) {
        return (
            <div className="py-12 px-8 text-center">
                <div className="max-w-lg mx-auto w-full bg-white rounded-2xl shadow-lg p-8 border border-brand-border">
                    <h1 className="text-brand-dark text-4xl mb-4 font-script">Error de Carga</h1>
                    <p className="text-gray-700 text-lg">
                        No se pudieron cargar los datos de la invitación.
                    </p>
                     <p className="text-gray-600 text-md mt-4">
                        Por favor, verifica que el enlace sea correcto o contacta a los anfitriones.
                    </p>
                </div>
            </div>
        );
    }

    // --- Lógica y Refs (a partir de aquí, 'invitado' es un objeto válido) ---
    const cardRef = useRef<HTMLDivElement>(null);
    const nombreFamilia = invitado.nombre_invitado_principal;
    const mesaData = Array.isArray(invitado.mesas) ? invitado.mesas[0] : invitado.mesas;
    const numeroMesa = mesaData?.nombre_mesa ?? null;

    const handleDownload = () => {
        if (cardRef.current) {
            toast.info('Generando tu tarjeta de confirmación...');
            html2canvas(cardRef.current, {
                useCORS: true,
                backgroundColor: '#fdf2f8',
                scale: 2,
            }).then((canvas) => {
                const link = document.createElement('a');
                link.download = 'confirmacion-xv-yeri.png';
                link.href = canvas.toDataURL('image/png');
                link.click();
            });
        }
    };

    // --- VISTA DE "YA CONFIRMADO" ---
    if (invitado.confirmado) {
        const asistentesConfirmados = invitado.num_asistentes_confirmados;

        if (asistentesConfirmados > 0) {
            return (
                <div className="py-12 px-8 text-center">
                    <div className="max-w-lg mx-auto w-full">
                        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
                            <motion.div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-lg mb-4 border border-brand-border" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}><CheckCircle2 className="w-10 h-10 text-brand-base" /></motion.div>
                            <h1 className="text-4xl text-brand-dark font-script mb-4">¡Gracias!</h1>
                            <p className="text-gray-600 text-lg mb-8">Tu confirmación ya ha sido recibida. ¡Nos vemos pronto!</p>
                            <div className="bg-white rounded-2xl p-6 mb-8 shadow-lg border border-brand-border text-left">
                                <p className="text-gray-600 text-sm mb-1">Familia:</p><p className="text-brand-base text-2xl font-script mb-4">{nombreFamilia}</p>
                                <p className="text-gray-600 text-sm mb-1">Mesa:</p><p className="text-brand-base text-2xl font-script mb-4">{numeroMesa || 'Pendiente de Asignación'}</p>
                                <p className="text-gray-600 text-sm mb-1">Asistentes confirmados:</p><p className="text-brand-base text-2xl font-script mb-4">{asistentesConfirmados} {asistentesConfirmados === 1 ? "persona" : "personas"}</p>
                            </div>
                            <button onClick={handleDownload} className="w-full bg-brand-dark hover:bg-brand-base text-white py-3 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2"><Download className="w-5 h-5" />Descargar Tarjeta de Confirmación</button>
                        </motion.div>
                        <div className="absolute -left-[9999px] top-0"><TarjetaConfirmacion ref={cardRef} nombreFamilia={nombreFamilia} asistentesConfirmados={asistentesConfirmados} numeroMesa={numeroMesa} /></div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="py-12 px-8 text-center">
                    <div className="max-w-lg mx-auto w-full">
                        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
                            <motion.div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-lg mb-4 border border-brand-border" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}><Frown className="w-10 h-10 text-gray-500" /></motion.div>
                            <h1 className="text-4xl text-brand-dark font-script mb-4">Respuesta Recibida</h1>
                            <p className="text-gray-600 text-lg">Hemos recibido tu respuesta. Lamentamos que no puedas acompañarnos.</p>
                        </motion.div>
                    </div>
                </div>
            );
        }
    }

    // --- VISTA DE FORMULARIO INTERACTIVO ---
    const numeroInvitados = invitado.num_acompanantes_permitidos;
    const token = invitado.token_secreto;
    const [asistencia, setAsistencia] = useState<"confirmo" | "menos-personas" | "no-asistire">("confirmo");
    const [numeroPersonas, setNumeroPersonas] = useState(numeroInvitados);
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleIncrement = () => {
        if (numeroPersonas < numeroInvitados) setNumeroPersonas(numeroPersonas + 1);
    };
    const handleDecrement = () => {
        if (numeroPersonas > 1) setNumeroPersonas(numeroPersonas - 1);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        let asistentesFinales;
        if (asistencia === "no-asistire") asistentesFinales = 0;
        else if (asistencia === "confirmo") asistentesFinales = numeroInvitados;
        else asistentesFinales = numeroPersonas;

        try {
            const response = await fetch('/api/rsvp', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token: token, asistentesConfirmados: asistentesFinales }) });
            const result = await response.json();
            if (!response.ok) throw new Error(result.message || 'Hubo un error.');
            toast.success('¡Confirmación recibida! Muchas gracias.');
            setSubmitted(true);
        } catch (error) {
            console.error('Error al enviar la confirmación:', error);
            toast.error(error instanceof Error ? error.message : 'No se pudo enviar la confirmación.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitted) {
        const asistentesFinales = asistencia === "confirmo" ? numeroInvitados : (asistencia === "menos-personas" ? numeroPersonas : 0);

        if (asistentesFinales > 0) {
            return (
                <div className="py-12 px-8 text-center">
                    <div className="max-w-lg mx-auto w-full">
                        {/* ... Vista de éxito ... */}
                    </div>
                </div>
            );
        } else {
            return (
                <div className="py-12 px-8 text-center">
                    <div className="max-w-lg mx-auto w-full">
                        {/* ... Vista de no asiste ... */}
                    </div>
                </div>
            );
        }
    }

    return (
        <div className="py-12 px-8 text-center relative">
            {/* ... Formulario ... */}
        </div>
    );
}
