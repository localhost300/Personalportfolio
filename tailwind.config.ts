import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#071426",
        deep: "#0d2243",
        panel: "#0a1a31",
        gold: "#d7b541",
        ivory: "#f5f1e8",
        mist: "#7f9cc6",
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
