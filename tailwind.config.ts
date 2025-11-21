import type { Config } from "tailwindcss";

export default {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                primary: {
                    DEFAULT: "#0f172a", // Slate 900
                    light: "#1e293b",   // Slate 800
                    dark: "#020617",    // Slate 950
                },
                accent: {
                    DEFAULT: "#0ea5e9", // Sky 500
                    hover: "#0284c7",   // Sky 600
                }
            },
        },
    },
    plugins: [],
} satisfies Config;
