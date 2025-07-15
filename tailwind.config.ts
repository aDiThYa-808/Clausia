import { type Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}", 
  ],
  theme: {
    extend: {
        colors: {
            brand: {
              DEFAULT: "#4F46E5",
              light: "#EEF2FF",
              dark: "#4338CA",
            },
            success: "#22C55E",
            warning: "#FACC15",
            danger: "#EF4444",
          
            // 🖋️ Flattened Text Tokens
            "text-primary": "#111827",
            "text-secondary": "#6B7280",
          
            // 🧱 Flattened Layout Tokens
            background: "#F9FAFB",
            surface: "#FFFFFF",
            border: "#E5E7EB",
          
            // 🧼 Other
            muted: "#F3F4F6",
        },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
