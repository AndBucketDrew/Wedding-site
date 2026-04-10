/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // ─── Brand Palette ───────────────────────────────────────────
      colors: {
        brand: {
          cream:   '#F5F0EB',  // warm off-white hero backgrounds
          charcoal:'#1C1C1E',  // near-black headings
          gold:    '#B8965A',  // accent — CTAs, underlines
          mist:    '#E8E4DF',  // subtle section dividers
          ink:     '#2C2C2E',  // body text
        },
      },

      // ─── Typography ───────────────────────────────────────────────
      fontFamily: {
        serif:  ['"Playfair Display"', 'Georgia', 'serif'],
        sans:   ['"Inter"', 'system-ui', 'sans-serif'],
        script: ['"Great Vibes"', 'cursive'],
      },

      // ─── Spacing / Sizing ─────────────────────────────────────────
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },

      // ─── Screen heights ────────────────────────────────────────────
      height: {
        screen: '100dvh',     // dynamic viewport height (mobile-safe)
      },

      // ─── Animations ────────────────────────────────────────────────
      keyframes: {
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%':   { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'fade-up':   'fade-up 0.7s ease-out forwards',
        'fade-in':   'fade-in 0.6s ease-out forwards',
        'scale-in':  'scale-in 0.5s ease-out forwards',
      },

      // ─── Transitions ───────────────────────────────────────────────
      transitionTimingFunction: {
        'cinematic': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },
    },
  },
  plugins: [],
}
