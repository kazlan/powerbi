/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#FFC107",
                "primary-hover": "#FFB300",
                "background-dark": "#0B1120",
                "background-card": "#151e32",
                "surface-dark": "#1E293B",
                "sidebar-dark": "#0f172a",
                "card-glow": "rgba(255, 193, 7, 0.2)",
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Poppins', 'sans-serif'],
            },
            boxShadow: {
                'glow': '0 0 20px rgba(255, 193, 7, 0.2)',
                'glow-strong': '0 0 35px rgba(255, 193, 7, 0.4)',
            }
        },
    },
    plugins: [],
}
