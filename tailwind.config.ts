import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["var(--font-heading)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"]
      },
      colors: {
        brand: {
          50: "#eff8ff",
          100: "#dbeefe",
          200: "#bee2fd",
          300: "#92d1fc",
          400: "#5bb7f8",
          500: "#3498f3",
          600: "#1f7de8",
          700: "#1d67d5",
          800: "#2153ad",
          900: "#214884",
          950: "#172d51"
        }
      },
      boxShadow: {
        soft: "0 20px 60px rgba(15, 23, 42, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
