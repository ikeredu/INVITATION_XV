// src/components/ConfirmarAsistencia.tsx

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Heart, CheckCircle2, Plus, Minus, ClipboardList, Check, Download, Frown } from "lucide-react";
import { toast } from "sonner";
import html2canvas from 'html2canvas';

import { SparklesBurst } from "./SparklesBurst";
import { TarjetaConfirmacion } from "./TarjetaConfirmacion";

// Interfaz actualizada
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
    // --- Lógica y Refs ---
    const cardRef = useRef<HTMLDivElement>(null);
    const nombreFamilia = invitado?.nombre_invitado_principal ?? "Familia Invitada";
    const mesaData = Array.isArray(invitado?.mesas) ? invitado.mesas[0] : invitado?.mesas;
    const numeroMesa = mesaData?.nombre_mesa ?? null;

    const handleDownload = () => {
        if (cardRef.current) {
            toast.info('Generando tu tarjeta de confirmación...');
            html2canvas(cardRef.current, {
                useCORS: true, // Permite cargar fuentes externas
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
    if (invitado?.confirmado) {
        const asistentesConfirmados = invitado.num_asistentes_confirmados;

        // --- VISTA PARA "YA CONFIRMADO" Y SÍ ASISTE ---
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
        }
        // --- VISTA PARA "YA CONFIRMADO" Y NO ASISTE ---
        else {
            return (
                <div className="py-12 px-8 text-center">
                    <div className="max-w-lg mx-auto w-full">
                        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
                            <motion.div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-lg mb-4 border border-brand-border" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}><Frown className="w-10 h-10 text-gray-500" /></motion.div>
                            <h1 className="text-4xl text-brand-dark font-script mb-4">Respuesta Recibida</h1>
                            <p className="text-gray-600 text-lg">Hemos recibido tu respuesta. Lamentamos que no puedas acompañarnos en esta ocasión.</p>
                        </motion.div>
                    </div>
                </div>
            );
        }
    }

    // --- VISTA DE FORMULARIO INTERACTIVO ---
    const numeroInvitados = invitado?.num_acompanantes_permitidos ?? 1;
    const token = invitado?.token_secreto ?? "";
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

    // Vista de "Gracias" después de una NUEVA confirmación
    if (submitted) {
        const asistentesFinales = asistencia === "confirmo" ? numeroInvitados : (asistencia === "menos-personas" ? numeroPersonas : 0);
        
        // --- VISTA PARA NUEVA CONFIRMACIÓN Y SÍ ASISTE ---
        if (asistentesFinales > 0) {
            return (
                <div className="py-12 px-8 text-center">
                    <div className="max-w-lg mx-auto w-full">
                        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
                            <motion.div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-lg mb-4 border border-brand-border" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}><CheckCircle2 className="w-10 h-10 text-brand-base" /></motion.div>
                            <h1 className="text-4xl text-brand-dark font-script mb-4">¡Gracias!</h1>
                            <p className="text-gray-600 text-lg mb-8">Tu confirmación ha sido recibida. ¡Nos vemos pronto!</p>
                            <div className="bg-white rounded-2xl p-6 mb-8 shadow-lg border border-brand-border text-left">
                                <p className="text-gray-600 text-sm mb-1">Familia:</p><p className="text-brand-base text-2xl font-script mb-4">{nombreFamilia}</p>
                                <p className="text-gray-600 text-sm mb-1">Mesa:</p><p className="text-brand-base text-2xl font-script mb-4">{numeroMesa || 'Pendiente de Asignación'}</p>
                                <p className="text-gray-600 text-sm mb-1">Asistentes confirmados:</p><p className="text-brand-base text-2xl font-script mb-4">{asistentesFinales} {asistentesFinales === 1 ? "persona" : "personas"}</p>
                            </div>
                            <button onClick={handleDownload} className="w-full bg-brand-dark hover:bg-brand-base text-white py-3 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2"><Download className="w-5 h-5" />Descargar Tarjeta de Confirmación</button>
                        </motion.div>
                        <div className="absolute -left-[9999px] top-0"><TarjetaConfirmacion ref={cardRef} nombreFamilia={nombreFamilia} asistentesConfirmados={asistentesFinales} numeroMesa={numeroMesa} /></div>
                    </div>
                </div>
            );
        }
        // --- VISTA PARA NUEVA CONFIRMACIÓN Y NO ASISTE ---
        else {
            return (
                <div className="py-12 px-8 text-center">
                    <div className="max-w-lg mx-auto w-full">
                        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
                            <motion.div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-lg mb-4 border border-brand-border" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}><Frown className="w-10 h-10 text-gray-500" /></motion.div>
                            <h1 className="text-4xl text-brand-dark font-script mb-4">Respuesta Recibida</h1>
                            <p className="text-gray-600 text-lg">Hemos recibido tu respuesta. Lamentamos que no puedas acompañarnos en esta ocasión.</p>
                        </motion.div>
                    </div>
                </div>
            );
        }
    }

    // Vista del Formulario
    return (
        <div className="py-12 px-8 text-center relative">
            {isSubmitting && <SparklesBurst />}
            <div className="max-w-lg mx-auto w-full relative z-20">
                <motion.div className="text-center mb-8" initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                    <motion.div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-lg mb-4 border border-brand-border" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}><ClipboardList className="w-10 h-10 text-brand-base" /></motion.div>
                    <h2 className="text-brand-dark text-4xl mb-2 px-4 font-script">Confirmar Asistencia</h2>
                    <p className="text-brand-base/80 px-4 font-sans-body">Por favor completa los siguientes datos</p>
                </motion.div>
                <motion.div className="bg-white rounded-2xl shadow-lg p-8 border border-brand-border" initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
                    <form onSubmit={handleSubmit} className="space-y-6 text-left">
                        <div className="bg-brand-light/50 rounded-2xl p-6 border border-brand-border">
                            <div className="text-center mb-3"><p className="text-gray-600 text-sm mb-1">Invitación para:</p><h2 className="text-brand-base text-2xl font-script">{nombreFamilia}</h2></div>
                            <div className="text-center pt-3 border-t border-brand-border"><p className="text-gray-600 font-sans-body text-sm">{numeroMesa ? `${numeroMesa} - ` : ''} {numeroInvitados} {numeroInvitados === 1 ? "invitado" : "invitados"}</p></div>
                        </div>
                        <div className="space-y-4">
                            <label className="text-brand-dark font-sans-body">Estado de asistencia</label>
                            <div className="space-y-3">
                                <label htmlFor="confirmo" className={`flex items-start space-x-3 p-4 rounded-xl border hover:border-brand-base transition-colors cursor-pointer ${asistencia === 'confirmo' ? 'border-brand-base bg-brand-light/50' : 'border-brand-border'}`}>
                                    <input type="radio" id="confirmo" name="asistenciaGroup" value="confirmo" checked={asistencia === 'confirmo'} onChange={() => setAsistencia('confirmo')} className="sr-only" />
                                    <motion.div className="w-6 h-6 flex-shrink-0 relative" initial={false} animate={{ scale: asistencia === 'confirmo' ? [1, 1.2, 1] : 1 }} transition={{ duration: 0.2 }}><Heart className="absolute inset-0 w-full h-full transition-colors" strokeWidth={1.5} fill={asistencia === 'confirmo' ? fuchsiaColor : 'none'} color={fuchsiaColor} /></motion.div>
                                    <div className="flex-1"><div className="text-brand-base font-sans-body font-medium">Confirmo mi asistencia</div><p className="text-sm text-gray-600 font-sans-body">Asistiremos todos los invitados ({numeroInvitados})</p></div>
                                </label>
                                <label htmlFor="menos-personas" className={`flex items-start space-x-3 p-4 rounded-xl border hover:border-brand-base transition-colors cursor-pointer ${asistencia === 'menos-personas' ? 'border-brand-base bg-brand-light/50' : 'border-brand-border'}`}>
                                    <input type="radio" id="menos-personas" name="asistenciaGroup" value="menos-personas" checked={asistencia === 'menos-personas'} onChange={() => { setAsistencia('menos-personas'); setNumeroPersonas(numeroInvitados > 1 ? numeroInvitados - 1 : 1); }} className="sr-only" />
                                    <motion.div className="w-6 h-6 flex-shrink-0 relative" initial={false} animate={{ scale: asistencia === 'menos-personas' ? [1, 1.2, 1] : 1 }} transition={{ duration: 0.2 }}><Heart className="absolute inset-0 w-full h-full transition-colors" strokeWidth={1.5} fill={asistencia === 'menos-personas' ? fuchsiaColor : 'none'} color={fuchsiaColor} /></motion.div>
                                    <div className="flex-1"><div className="text-brand-base font-sans-body font-medium">Asistiré con menos personas</div><p className="text-sm text-gray-600 font-sans-body">Algunos invitados no podrán asistir</p></div>
                                </label>
                                <label htmlFor="no-asistire" className={`flex items-start space-x-3 p-4 rounded-xl border hover:border-brand-base transition-colors cursor-pointer ${asistencia === 'no-asistire' ? 'border-brand-base bg-brand-light/50' : 'border-brand-border'}`}>
                                    <input type="radio" id="no-asistire" name="asistenciaGroup" value="no-asistire" checked={asistencia === 'no-asistire'} onChange={() => setAsistencia('no-asistire')} className="sr-only" />
                                    <motion.div className="w-6 h-6 flex-shrink-0 relative" initial={false} animate={{ scale: asistencia === 'no-asistire' ? [1, 1.2, 1] : 1 }} transition={{ duration: 0.2 }}><Heart className="absolute inset-0 w-full h-full transition-colors" strokeWidth={1.5} fill={asistencia === 'no-asistire' ? fuchsiaColor : 'none'} color={fuchsiaColor} /></motion.div>
                                    <div className="flex-1"><div className="text-brand-base font-sans-body font-medium">No podré asistir</div><p className="text-sm text-gray-600 font-sans-body">Lamentablemente no podré acompañarlos</p></div>
                                </label>
                            </div>
                        </div>
                        {asistencia === "menos-personas" && (
                            <motion.div className="space-y-3" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ duration: 0.3 }}>
                                <label className="text-brand-dark font-sans-body">¿Cuántas personas asistirán?</label>
                                <div className="flex items-center justify-center gap-6 bg-brand-light/50 rounded-2xl p-6 border border-brand-border">
                                    <button type="button" onClick={handleDecrement} disabled={numeroPersonas <= 1} className="w-14 h-14 rounded-xl bg-white border border-brand-border hover:bg-brand-light disabled:opacity-30 disabled:cursor-not-allowed shadow-md transition-colors"><Minus className="w-6 h-6 text-brand-base mx-auto" /></button>
                                    <div className="text-center min-w-[120px]"><div className="text-5xl text-brand-dark font-script">{numeroPersonas}</div><p className="text-sm text-gray-600 mt-1 font-sans-body">{numeroPersonas === 1 ? "persona" : "personas"}</p></div>
                                    <button type="button" onClick={handleIncrement} disabled={numeroPersonas >= numeroInvitados} className="w-14 h-14 rounded-xl bg-white border border-brand-border hover:bg-brand-light disabled:opacity-30 disabled:cursor-not-allowed shadow-md transition-colors"><Plus className="w-6 h-6 text-brand-base mx-auto" /></button>
                                </div>
                                <p className="text-xs text-center text-gray-600 font-sans-body">Máximo: {numeroInvitados} personas</p>
                            </motion.div>
                        )}
                        <button type="submit" className="relative overflow-hidden w-full bg-brand-base hover:bg-brand-dark text-white py-4 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl text-base h-auto font-sans-body flex items-center justify-center disabled:opacity-50" disabled={isSubmitting}><Check className="w-5 h-5 mr-2" />Confirmar</button>
                        <p className="font-sans-body text-brand-base/90 pt-4 text-center text-sm">Tu presencia es muy importante para nosotros</p>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}