import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#ffffff",
        deep: "#f8f6f2",
        panel: "#ffffff",
        gold: "#4a9b8e",
        ivory: "#1a2c31",
        mist: "#1a1a1a",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Arial", "sans-serif"],
        signature: ["var(--font-signature)", "cursive"],
      },
      letterSpacing: {
        label: ".24em",
      },
      maxWidth: {
        content: "1140px",
      },
    },
  },
  plugins: [],
} satisfies Config;
