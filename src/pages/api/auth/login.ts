import type { APIRoute } from 'astro';
import { supabaseAnonClient } from '../../../utils/supabaseServer';

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  const email = formData.get('email')?.toString();
  const password = formData.get('password')?.toString();

  if (!email || !password) {
    return redirect('/admin/login?error=Email y contraseña son requeridos');
  }

  const { error } = await supabaseAnonClient.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error('Error de inicio de sesión:', error.message);
    return redirect(`/admin/login?error=${encodeURIComponent(error.message)}`);
  }

  return redirect('/admin/dashboard');
};
