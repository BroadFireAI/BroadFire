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
      },
    },
  },
  plugins: [],
};
