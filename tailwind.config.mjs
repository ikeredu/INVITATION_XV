// tailwind.config.mjs

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            fontFamily: {
                'script': ['"Dancing Script"', 'cursive'], // 'cursive' es el fallback
                'sans-body': ['"Lato"', 'sans-serif'],
            },
            colors: {
                // Estos son nuestros nuevos colores 'brand'
                'brand-light': '#FFF5F7',      // Fondo pálido (reemplaza a pink-50)
                'brand-border': '#FFE4E6',     // Bordes sutiles (reemplaza a pink-100)
                'brand-icon': '#EC4899',      // Iconos (reemplaza a pink-400)
                'brand-subtext': '#F472B6',   // Texto secundario (reemplaza a pink-500/70)
                'brand-base': '#DB2777',      // Color principal (reemplaza a pink-600)
                'brand-dark': '#BE185D',      // Texto oscuro (reemplaza a pink-700)
            },
        },
    },
    plugins: [],
};