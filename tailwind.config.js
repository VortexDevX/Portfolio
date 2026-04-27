/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // ── Surface tokens ──────────────────────────────────────
        // One canonical name per shade. No more scattered magic hex values.
        void:     '#030712', // deepest bg — canvas, body
        pit:      '#020408', // form backgrounds, deepest panels
        surface:  '#040812', // card/panel backgrounds
        edge:     '#0f172a', // borders when slightly visible

        // ── Accent system ────────────────────────────────────────
        // `accent` is RESERVED for maximum-signal moments only:
        // active states, CTA borders, critical labels.
        // Use `dim` for secondary/decorative accent usage.
        accent:   '#00e5ff', // cyan — primary signal color
        dim:      '#1e4a52', // muted teal — decorative, secondary borders

        // ── Text scale ───────────────────────────────────────────
        // Use Tailwind's built-in gray scale for text.
        // Mapping for reference:
        // Primary text   → text-white / text-gray-100
        // Secondary text → text-gray-300 / text-gray-400
        // Muted text     → text-gray-500
        // Ghost text     → text-gray-600 / text-gray-700
      },
      fontFamily: {
        sans:  ['var(--font-inter)',       'system-ui',  'sans-serif'],
        serif: ['var(--font-playfair)',    'Georgia',    'serif'],
        mono:  ['var(--font-space-mono)', 'Menlo',      'monospace'],
      },
    },
  },
  plugins: [],
};
