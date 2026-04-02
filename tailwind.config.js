/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        border: 'hsl(220 14% 84%)',
        input: 'hsl(220 14% 84%)',
        ring: 'hsl(220 14% 28%)',
        background: 'hsl(220 20% 99%)',
        foreground: 'hsl(220 18% 16%)',
        primary: {
          DEFAULT: 'hsl(220 18% 16%)',
          foreground: 'hsl(220 20% 99%)',
        },
        secondary: {
          DEFAULT: 'hsl(220 18% 95%)',
          foreground: 'hsl(220 18% 16%)',
        },
        muted: {
          DEFAULT: 'hsl(220 18% 96%)',
          foreground: 'hsl(220 9% 42%)',
        },
        accent: {
          DEFAULT: 'hsl(220 18% 94%)',
          foreground: 'hsl(220 18% 16%)',
        },
        destructive: {
          DEFAULT: 'hsl(0 72% 52%)',
          foreground: 'hsl(220 20% 99%)',
        },
        card: {
          DEFAULT: 'hsl(0 0% 100%)',
          foreground: 'hsl(220 18% 16%)',
        },
      },
      borderRadius: {
        xl: '1rem',
        lg: '0.9rem',
        md: '0.75rem',
        sm: '0.5rem',
      },
      boxShadow: {
        panel: '0 18px 48px -24px rgba(24, 39, 75, 0.12)',
      },
      fontFamily: {
        sans: ['"Avenir Next"', '"Segoe UI"', '"Helvetica Neue"', 'sans-serif'],
        serif: ['"Iowan Old Style"', '"Palatino Linotype"', '"Book Antiqua"', 'serif'],
      },
      backgroundImage: {
        'paper-grid': 'radial-gradient(circle at 1px 1px, rgba(20, 25, 40, 0.05) 1px, transparent 0)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

