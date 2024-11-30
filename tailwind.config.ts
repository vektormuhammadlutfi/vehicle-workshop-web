import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // Using Tailwind's default color palette
                background: 'var(--tw-bg)',
                foreground: 'var(--tw-fg)',
                card: {
                    DEFAULT: 'white', // default to white
                    foreground: 'black' // default to black
                },
                popover: {
                    DEFAULT: 'white', // default to white
                    foreground: 'black' // default to black
                },
                primary: {
                    DEFAULT: 'blue', // default primary color
                    foreground: 'white' // default text on primary color
                },
                secondary: {
                    DEFAULT: 'gray', // default secondary color
                    foreground: 'black' // default text on secondary color
                },
                muted: {
                    DEFAULT: 'gray', // default muted color
                    foreground: 'white' // default text on muted color
                },
                accent: {
                    DEFAULT: 'cyan', // default accent color
                    foreground: 'black' // default text on accent color
                },
                destructive: {
                    DEFAULT: 'red', // default destructive color
                    foreground: 'white' // default text on destructive color
                },
                border: 'lightgray', // default border color style
                input: 'white', // default input color
                ring: 'blue', // default outline ring color
                sidebar: {
                    DEFAULT: 'white', // default sidebar background
                    foreground: 'black', // default sidebar text color
                    primary: 'blue', // default sidebar primary color
                    'primary-foreground': 'white', // default sidebar primary text
                    accent: 'cyan', // default sidebar accent color
                    'accent-foreground': 'black', // default sidebar accent text
                    border: 'lightgray', // default sidebar border
                    ring: 'blue' // default sidebar outline ring
                }
            },
            borderRadius: {
                lg: '0.5rem', // Tailwind default for lg
                md: '0.375rem', // Tailwind default for md
                sm: '0.25rem' // Tailwind default for sm
            }
        }
    },
    plugins: [require("tailwindcss-animate")],
} satisfies Config;