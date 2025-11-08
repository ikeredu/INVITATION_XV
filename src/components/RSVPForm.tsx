// src/components/RSVPForm.tsx (Fragmento de tipos)

// La interfaz debe reflejar los datos que recibimos de la BD
interface Invitado {
    nombre_invitado_principal: string;
    num_acompanantes_permitidos: number;
    confirmado: boolean;
    num_asistentes_confirmados: number;
    mesa_id: number | null; // Añadimos el ID de la mesa
}

interface RSVPFormProps {
    invitado: Invitado;
    token: string;
    // Añadimos el nombre de la mesa para visualización (se cargará en el .astro)
    nombreMesa: string | null;
}
// ... resto del componente