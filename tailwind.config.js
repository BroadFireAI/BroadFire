/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      colors: {
        primary: {
          DEFAULT: '#0A0A0A',
          light: '#525252',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          secondary: '#FAFAFA',
        },
        border: {
          DEFAULT: '#E5E5E5',
        },
        japandi: {
          royal: '#1E3A8A',
          'royal-light': '#2B4EA6',
          'royal-dark': '#152C6B',
          'warm-white': '#FDFCFA',
          paper: '#F5F3EF',
          linen: '#EDE8E0',
          sand: '#E2DDD5',
          earth: '#8B7355',
          'earth-dark': '#6B5842',
          sage: '#7A8A6E',
          'sage-light': '#95A688',
          terracotta: '#C67B5C',
          'terracotta-light': '#D99B82',
          wood: '#A0826D',
          charcoal: '#2C2825',
          stone: '#3D3733',
          mist: '#7A7268',
        },
      },
    },
  },
  plugins: [],
};
