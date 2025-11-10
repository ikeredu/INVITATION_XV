// seed.js
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { nanoid } from 'nanoid';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });

// Asegúrate de que la ruta a tu JSON es correcta
import invitadosData from './invitados.json' assert { type: 'json' };

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error("Faltan variables de entorno de Supabase.");
    process.exit(1);
}

console.log("DEBUG: URL Cargada:", supabaseUrl);
console.log("DEBUG: Key Cargada (primeros 5):", supabaseServiceKey.substring(0, 5));

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function seedData() {
    console.log("Iniciando la siembra de datos de invitados...");

    // PASO 1: Obtener los IDs de las mesas para hacer la asignación
    console.log("Buscando IDs de mesas...");
    const { data: mesasData, error: mesasError } = await supabase
        .from('mesas')
        .select('id, nombre_mesa');

    if (mesasError || !mesasData || mesasData.length === 0) {
        console.error("❌ Error o Mesas no encontradas:", mesasError?.message || "La tabla mesas está vacía.");
        return;
    }

    // Creamos un mapa de { 'Nombre de Mesa': 'ID Numérico' }
    const mesaIdMap = mesasData.reduce((map, mesa) => {
        map[mesa.nombre_mesa] = mesa.id;
        return map;
    }, {});

    // PASO 2: Preparar los datos
    const datosParaInsertar = invitadosData.map(invitado => {
        const mesaNombre = invitado.nombre_mesa_asignada;
        let mesaId = null;

        if (mesaNombre && mesaIdMap[mesaNombre]) {
            mesaId = mesaIdMap[mesaNombre];
        } else if (mesaNombre) {
            console.warn(`⚠️ Advertencia: Mesa '${mesaNombre}' no encontrada. Asignando NULL.`);
        }

        return {
            nombre_invitado_principal: invitado.nombre_invitado_principal,
            num_acompanantes_permitidos: invitado.num_acompanantes_permitidos,
            sobrenombre: invitado.sobrenombre,
            token_secreto: nanoid(10),
            confirmado: false,
            num_asistentes_confirmados: 0,
            // Asignamos el ID numérico de la mesa
            mesa_id: mesaId
        }
    });

    // PASO 3: Insertar en la tabla 'invitados'
    const { data, error } = await supabase
        .from('invitados')
        .insert(datosParaInsertar)
        .select('nombre_invitado_principal, token_secreto, mesa_id');

    if (error) {
        console.error("❌ Error al insertar datos de invitados:", error.message);
        return;
    }

    console.log("✅ Datos de invitados insertados exitosamente. Asignaciones:");
    data.forEach(item => {
        const urlPrueba = `http://localhost:4321/confirmacion/${item.token_secreto}`;
        console.log(`- ${item.nombre_invitado_principal} (Mesa ID: ${item.mesa_id || 'N/A'}): ${urlPrueba}`);
    });
}

seedData().catch(err => console.error("Error fatal en el seed:", err));