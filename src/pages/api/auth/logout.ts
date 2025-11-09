import type { APIRoute } from 'astro';
import { supabaseAnonClient } from '../../../utils/supabaseServer';

export const POST: APIRoute = async ({ redirect }) => {
  const { error } = await supabaseAnonClient.auth.signOut();

  if (error) {
    console.error('Error al cerrar sesión:', error.message);
    // Optionally, redirect to an error page or show a message
  }

  return redirect('/admin/login');
};
