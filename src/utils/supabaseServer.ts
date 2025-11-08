// src/utils/supabaseServer.ts
// Este archivo se ejecuta SÓLO en el servidor (SSR de Astro o API Routes)

import { createClient } from '@supabase/supabase-js';

// Las variables de entorno son accesibles a través de import.meta.env en Astro
const supabaseUrl = import.meta.env.SUPABASE_URL;
const supabaseServiceKey = import.meta.env.SUPABASE_SERVICE_KEY;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

// Verificación de seguridad
if (!supabaseUrl || !supabaseServiceKey || !supabaseAnonKey) {
  // Lanza un error si faltan las claves esenciales
  throw new Error('FATAL: Faltan variables de entorno de Supabase. Revisa el archivo .env.local.');
}

/**
 * Cliente de Supabase para LECTURA (GET) en el servidor.
 * Usa la Anon Key. Es ideal para las consultas en las rutas dinámicas ([token].astro).
 */
export const supabaseAnonClient = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Cliente de Supabase para ESCRITURA (POST, UPDATE) en el servidor.
 * Usa la Service Role Key, la clave secreta con permisos administrativos.
 * ¡CRUCIAL para las API Routes (como rsvp.ts) y los scripts de siembra!
 */
export const supabaseServiceClient = createClient(supabaseUrl, supabaseServiceKey);