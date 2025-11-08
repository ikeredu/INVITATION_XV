// src/pages/api/rsvp.ts

import type { APIRoute } from 'astro';
import { supabaseServiceClient } from '../../utils/supabaseServer'; // Asegúrate de que la ruta sea correcta

// Define la ruta solo para el método POST
export const POST: APIRoute = async ({ request }) => {
    const data = await request.json();

    const {
        token,
        asistentesConfirmados,
    } = data;

    if (!token || typeof asistentesConfirmados !== 'number' || asistentesConfirmados < 0) { // >= 0 para incluir 0 si selecciona 'no-asistire'
        return new Response(JSON.stringify({ error: "Datos de formulario incompletos o inválidos." }), {
            status: 400,
        });
    }

    // 3. Actualizar la tabla de invitados
    const { data: updatedData, error } = await supabaseServiceClient
        .from('invitados')
        .update({
            confirmado: true,
            fecha_confirmacion: new Date().toISOString(),
            num_asistentes_confirmados: asistentesConfirmados,
        })
        .eq('token_secreto', token)
        // Quitamos .eq('confirmado', false) para permitir re-confirmaciones
        .select('nombre_invitado_principal, num_asistentes_confirmados')
        .single();

    if (error) {
        console.error("Error al guardar RSVP:", error);
        return new Response(JSON.stringify({ error: "Error interno al procesar la confirmación." }), {
            status: 500,
        });
    }

    // 4. Respuesta Exitosa
    return new Response(JSON.stringify({
        message: "Confirmación de asistencia exitosa",
        invitado: updatedData
    }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
};