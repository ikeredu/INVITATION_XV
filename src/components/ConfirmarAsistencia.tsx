// src/components/ConfirmarAsistencia.tsx

import { useState } from "react";
import { motion } from "framer-motion";
// 💡 1. IMPORTACIÓN COMPLETA Y CORRECTA
import { Pencil, Heart, CheckCircle2, Plus, Minus, ClipboardList, Check } from "lucide-react";
import { toast } from "sonner";
import { SparklesBurst } from "./SparklesBurst";

// Datos estáticos (sin cambios)
const INVITACION_DATA = {
    nombreFamilia: "Familia García López",
    numeroMesa: "Mesa 7",
    numeroInvitados: 5,
};

// Color Fucsia
const fuchsiaColor = "#C71585";

export default function ConfirmarAsistencia() {
    const [asistencia, setAsistencia] = useState<"confirmo" | "menos-personas" | "no-asistire">("confirmo");
    const [numeroPersonas, setNumeroPersonas] = useState(INVITACION_DATA.numeroInvitados);
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // --- Lógica de handlers (COMPLETA) ---
    const handleIncrement = () => {
        if (numeroPersonas < INVITACION_DATA.numeroInvitados) {
            setNumeroPersonas(numeroPersonas + 1);
        }
    };
    const handleDecrement = () => {
        if (numeroPersonas > 1) {
            setNumeroPersonas(numeroPersonas - 1);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        setIsSubmitting(true);
        toast.success("¡Confirmación enviada con éxito!");

        setTimeout(() => {
            setSubmitted(true);
            setIsSubmitting(false);
        }, 2000);
    };

    // --- 1. VISTA DE "GRACIAS" (CORREGIDA TS) ---
    if (submitted) {
        return (
            <div className="py-12 px-8 text-center min-h-screen">
                <div className="max-w-lg mx-auto w-full">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        <motion.div
                            className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-lg mb-4 border border-brand-border"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                        >
                            <CheckCircle2 className="w-10 h-10 text-brand-base" />
                        </motion.div>

                        <h1 className="text-4xl text-brand-dark font-script mb-4">¡Gracias!</h1>
                        <p className="text-gray-600 text-lg mb-8">
                            {asistencia === "no-asistire" ? "Lamentamos que no puedas acompañarnos." : "Tu confirmación ha sido recibida. ¡Nos vemos pronto!"}
                        </p>

                        {/* 💡 TS FIX: Uso de chequeo explícito para el resumen (sin errores) */}
                        {(asistencia === "confirmo" || asistencia === "menos-personas") && (
                            <div className="bg-white rounded-2xl p-6 mb-8 shadow-lg border border-brand-border text-left">
                                <p className="text-gray-600 text-sm mb-1">Familia:</p>
                                <p className="text-brand-base text-2xl font-script mb-4">{INVITACION_DATA.nombreFamilia}</p>
                                <p className="text-gray-600 text-sm mb-1">Mesa:</p>
                                <p className="text-brand-base text-xl font-sans-body mb-4">{INVITACION_DATA.numeroMesa}</p>

                                {/* Resumen de personas */}
                                <>
                                    <p className="text-gray-600 text-sm mb-1">Asistentes confirmados:</p>
                                    <p className="text-brand-base text-xl font-sans-body">
                                        {asistencia === "confirmo" ? INVITACION_DATA.numeroInvitados : numeroPersonas}
                                        {asistencia === "confirmo" ? " personas" : numeroPersonas === 1 ? " persona" : " personas"}
                                    </p>
                                </>
                            </div>
                        )}

                        {/* <button
                            type="button"
                            onClick={() => setSubmitted(false)}
                            className="bg-brand-base hover:bg-brand-dark text-white px-8 py-4 rounded-xl shadow-lg h-auto font-sans-body text-base transition-colors"
                        >
                            Editar ió
                        </button> */}
                    </motion.div>
                </div>
            </div>
        );
    }

    // --- 2. VISTA DE FORMULARIO ---
    return (
        <div className="py-12 px-8 text-center relative min-h-screen">
            {isSubmitting && <SparklesBurst />}

            <div className="max-w-lg mx-auto w-full relative z-20">

                {/* Header (Armonizado) */}
                <motion.div
                    className="text-center mb-8"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <motion.div
                        className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-lg mb-4 border border-brand-border"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                    >
                        <ClipboardList className="w-10 h-10 text-brand-base" />
                    </motion.div>
                    <h2 className="text-brand-dark text-4xl mb-2 px-4 font-script">Confirmar Asistencia</h2>
                    <p className="text-brand-base/80 px-4 font-sans-body">Por favor completa los siguientes datos</p>
                </motion.div>

                {/* Form Card */}
                <motion.div
                    className="bg-white rounded-2xl shadow-lg p-8 border border-brand-border"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <form onSubmit={handleSubmit} className="space-y-6 text-left">

                        {/* Datos de la Invitación (Armonizado) */}
                        <div className="bg-brand-light/50 rounded-2xl p-6 border border-brand-border">
                            <div className="text-center mb-3">
                                <p className="text-gray-600 text-sm mb-1">Invitación para:</p>
                                <h2 className="text-brand-base text-2xl font-script">{INVITACION_DATA.nombreFamilia}</h2>
                            </div>
                            <div className="text-center pt-3 border-t border-brand-border">
                                <p className="text-gray-600 font-sans-body text-sm">
                                    {INVITACION_DATA.numeroMesa} - {INVITACION_DATA.numeroInvitados} {INVITACION_DATA.numeroInvitados === 1 ? "invitado" : "invitados"}
                                </p>
                            </div>
                        </div>

                        {/* Opciones de Asistencia (Radio Buttons) */}
                        <div className="space-y-4">
                            <label className="text-brand-dark font-sans-body">Estado de asistencia</label>
                            <div className="space-y-3">

                                {/* Opción 1: Confirmo */}
                                <label htmlFor="confirmo" className={`flex items-start space-x-3 p-4 rounded-xl border hover:border-brand-base transition-colors cursor-pointer ${asistencia === 'confirmo' ? 'border-brand-base bg-brand-light/50' : 'border-brand-border'}`}>
                                    <input type="radio" id="confirmo" name="asistenciaGroup" value="confirmo" checked={asistencia === 'confirmo'} onChange={() => setAsistencia('confirmo')} className="sr-only" />
                                    <motion.div className="w-6 h-6 flex-shrink-0 relative" initial={false} animate={{ scale: asistencia === 'confirmo' ? [1, 1.2, 1] : 1 }} transition={{ duration: 0.2 }}>
                                        <Heart className="absolute inset-0 w-full h-full transition-colors" strokeWidth={1.5} fill={asistencia === 'confirmo' ? fuchsiaColor : 'none'} color={fuchsiaColor} />
                                    </motion.div>
                                    <div className="flex-1">
                                        <div className="text-brand-base font-sans-body font-medium">Confirmo mi asistencia</div>
                                        <p className="text-sm text-gray-600 font-sans-body">Asistiremos todos los invitados ({INVITACION_DATA.numeroInvitados})</p>
                                    </div>
                                </label>

                                {/* Opción 2: Menos personas */}
                                <label htmlFor="menos-personas" className={`flex items-start space-x-3 p-4 rounded-xl border hover:border-brand-base transition-colors cursor-pointer ${asistencia === 'menos-personas' ? 'border-brand-base bg-brand-light/50' : 'border-brand-border'}`}>
                                    <input type="radio" id="menos-personas" name="asistenciaGroup" value="menos-personas" checked={asistencia === 'menos-personas'} onChange={() => setAsistencia('menos-personas')} className="sr-only" />
                                    <motion.div className="w-6 h-6 flex-shrink-0 relative" initial={false} animate={{ scale: asistencia === 'menos-personas' ? [1, 1.2, 1] : 1 }} transition={{ duration: 0.2 }}>
                                        <Heart className="absolute inset-0 w-full h-full transition-colors" strokeWidth={1.5} fill={asistencia === 'menos-personas' ? fuchsiaColor : 'none'} color={fuchsiaColor} />
                                    </motion.div>
                                    <div className="flex-1">
                                        <div className="text-brand-base font-sans-body font-medium">Asistiré con menos personas</div>
                                        <p className="text-sm text-gray-600 font-sans-body">Algunos invitados no podrán asistir</p>
                                    </div>
                                </label>

                                {/* Opción 3: No asistiré */}
                                <label htmlFor="no-asistire" className={`flex items-start space-x-3 p-4 rounded-xl border hover:border-brand-base transition-colors cursor-pointer ${asistencia === 'no-asistire' ? 'border-brand-base bg-brand-light/50' : 'border-brand-border'}`}>
                                    <input type="radio" id="no-asistire" name="asistenciaGroup" value="no-asistire" checked={asistencia === 'no-asistire'} onChange={() => setAsistencia('no-asistire')} className="sr-only" />
                                    <motion.div className="w-6 h-6 flex-shrink-0 relative" initial={false} animate={{ scale: asistencia === 'no-asistire' ? [1, 1.2, 1] : 1 }} transition={{ duration: 0.2 }}>
                                        <Heart className="absolute inset-0 w-full h-full transition-colors" strokeWidth={1.5} fill={asistencia === 'no-asistire' ? fuchsiaColor : 'none'} color={fuchsiaColor} />
                                    </motion.div>
                                    <div className="flex-1">
                                        <div className="text-brand-base font-sans-body font-medium">No podré asistir</div>
                                        <p className="text-sm text-gray-600 font-sans-body">Lamentablemente no podré acompañarlos</p>
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* Contador de Personas (Corregido el display conditional) */}
                        {asistencia === "menos-personas" && (
                            <motion.div
                                className="space-y-3"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                transition={{ duration: 0.3 }}
                            >
                                <label className="text-brand-dark font-sans-body">¿Cuántas personas asistirán?</label>
                                <div className="flex items-center justify-center gap-6 bg-brand-light/50 rounded-2xl p-6 border border-brand-border">
                                    {/* Botón Decrementar (rounded-xl) */}
                                    <button type="button" onClick={handleDecrement} disabled={numeroPersonas <= 1} className="w-14 h-14 rounded-xl bg-white border border-brand-border hover:bg-brand-light disabled:opacity-30 disabled:cursor-not-allowed shadow-md transition-colors">
                                        <Minus className="w-6 h-6 text-brand-base mx-auto" />
                                    </button>
                                    <div className="text-center min-w-[120px]">
                                        <div className="text-5xl text-brand-dark font-script">{numeroPersonas}</div>
                                        <p className="text-sm text-gray-600 mt-1 font-sans-body">{numeroPersonas === 1 ? "persona" : "personas"}</p>
                                    </div>
                                    {/* Botón Incrementar (rounded-xl) */}
                                    <button type="button" onClick={handleIncrement} disabled={numeroPersonas >= INVITACION_DATA.numeroInvitados} className="w-14 h-14 rounded-xl bg-white border border-brand-border hover:bg-brand-light disabled:opacity-30 disabled:cursor-not-allowed shadow-md transition-colors">
                                        <Plus className="w-6 h-6 text-brand-base mx-auto" />
                                    </button>
                                </div>
                                <p className="text-xs text-center text-gray-600 font-sans-body">Máximo: {INVITACION_DATA.numeroInvitados} personas</p>
                            </motion.div>
                        )}

                        {/* Botón de Enviar (Armonizado) */}
                        <button
                            type="submit"
                            className="relative overflow-hidden w-full bg-brand-base hover:bg-brand-dark text-white py-4 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl text-base h-auto font-sans-body flex items-center justify-center disabled:opacity-50"
                            disabled={isSubmitting}
                        >
                            {/* 💡 CAMBIO: Icono Check para confirmar */}
                            <Check className="w-5 h-5 mr-2" />
                            Confirmar
                        </button>

                        {/* Pie de sección (Armonizado) */}
                        <p className="font-sans-body text-brand-base/90 pt-4 text-center text-sm">
                            Tu presencia es muy importante para nosotros
                        </p>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}