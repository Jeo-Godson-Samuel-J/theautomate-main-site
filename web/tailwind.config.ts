import type { Config } from "tailwindcss";


const config: Config = {
    theme: {
        extend: {
            colors: {
                brand: {
                    dark: "#163E72",   // Deep Navy
                    blue: "#2B71B8",   // Primary Blue
                    sky: "#219EBC",
                    deep: "#023047",
                }
            },
            fontFamily: {
                sans: ["var(--font-roboto)", "ui-sans-serif", "system-ui"],
            },
        },
    },
    plugins: [
        require("@tailwindcss/typography"),
    ],
};
export default config;