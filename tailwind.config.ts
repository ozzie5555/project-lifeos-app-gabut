import type { Config } from "tailwindcss";

const config: Config = {
  // PENTING: Menambahkan path "./src" agar file di dalam folder src terdeteksi
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // Gunakan ini saja (mencakup app, components, pages, lib)
  ],
  theme: {
    extend: {
      colors: {
        background: "#0B1120", // Navy Gelap
        surface: "#151E32",    // Navy Card
        primary: "#06B6D4",    // Cyan Neon
        border: "rgba(255, 255, 255, 0.08)", // Border transparan halus
        text: {
            main: "#F1F5F9",
            muted: "#94A3B8"
        }
      },
      fontFamily: {
        // Fallback ke sans-serif bawaan sistem jika font custom belum load
        sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "monospace"], 
      },
    },
  },
  plugins: [],
};
export default config;