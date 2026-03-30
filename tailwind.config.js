/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "#030712",
        monolith: "#0f172a",
        accent: "#00e5ff",
      },
      fontFamily: {
        serif: ['"Playfair Display"', "serif"],
        mono: ['"Space Mono"', "monospace"],
      },
    },
  },
  plugins: [],
};
