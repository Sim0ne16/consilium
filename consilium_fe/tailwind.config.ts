import type { Config } from "tailwindcss";

// tailwind.config.ts
export default {
    content: ["./src/**/*.{html,ts}"],
    theme: {
        extend: {
            colors: {
                base: {
                    50:  "var(--base-50)",
                    100: "var(--base-100)",
                    200: "var(--base-200)",
                    300: "var(--base-300)",
                    400: "var(--base-400)",
                },
                accent: {
                    cold: "var(--accent-cold)",
                    warm: "var(--accent-warm)",
                },
            },
        },
    },
};
