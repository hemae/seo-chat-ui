/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                bg: "var(--color-bg)",
                border: "var(--color-border)",
                text: "var(--color-text)",
                primary: "var(--color-primary)",
                success: "var(--color-success)",
                warning: "var(--color-warning)",
                error: "var(--color-error)",
            },
        },
    },
    plugins: [],
}
