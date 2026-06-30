/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // ── Midnight Atelier tokens ─────────────────────────────
        night:          '#080A0D',
        graphite:       '#12151A',
        mist:           '#E8ECE7',
        ash:            '#AEB7B1',
        signal:         '#7CF7C8',
        ember:          '#FF6B4A',
        violetShadow:   '#4B3F72',
        steel:          '#6F7D8C',

        // Legacy aliases used by existing components.
        void:     '#080A0D',
        pit:      '#0D0F12',
        surface:  '#12151A',
        edge:     '#45474A',
        accent:   '#7CF7C8',
        dim:      '#6F7D8C',

        // ── Text scale ───────────────────────────────────────────
        // Use Tailwind's built-in gray scale for text.
        // Mapping for reference:
        // Primary text   → text-white / text-gray-100
        // Secondary text → text-gray-300 / text-gray-400
        // Muted text     → text-gray-500
        // Ghost text     → text-gray-600 / text-gray-700
      },
      fontFamily: {
        sans:  ['var(--font-body)',       'system-ui',  'sans-serif'],
        serif: ['var(--font-display)',    'Georgia',    'serif'],
        mono:  ['var(--font-space-mono)', 'Menlo',      'monospace'],
      },
    },
  },
  plugins: [],
};
