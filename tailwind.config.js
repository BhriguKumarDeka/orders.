/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Poppins", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        ink: "#030719",
        paper: "#E8ECFE",
        brand: { 900: "#1C254F", 50: "#E8ECFE" },
        accent: "#6366f1",
      },
      animation: {
        breathe: "breathe 3s cubic-bezier(0.76, 0, 0.24, 1) infinite",
        "breathe-slow": "breathe-slow 4s cubic-bezier(0.76, 0, 0.24, 1) infinite",
        "breathe-fast": "breathe 1.5s cubic-bezier(0.76, 0, 0.24, 1) infinite",
        float: "float 3s cubic-bezier(0.65, 0, 0.35, 1) infinite",
        "pulse-dot": "pulse-dot 1.5s cubic-bezier(0.76, 0, 0.24, 1) infinite",
      },
      boxShadow: {
        soft: "0 24px 80px rgba(14, 26, 44, 0.08)",
        glow: "0 0 80px rgba(99, 102, 241, 0.15)",
        "glow-lg": "0 0 120px rgba(99, 102, 241, 0.2)",
      },
    },
  },
  plugins: [],
};
