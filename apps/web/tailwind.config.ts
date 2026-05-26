import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // PlanAfter brand
        brand: {
          50: '#EBF5FB',
          100: '#D6EAF8',
          200: '#AED6F1',
          300: '#85C1E9',
          400: '#5DADE2',
          500: '#2E86C1',
          600: '#2471A3',
          700: '#1A5276',
          800: '#154360',
          900: '#0E2F44',
        },
        // Semantic colors
        surface: {
          DEFAULT: '#FFFFFF',
          secondary: '#F8F9F9',
          tertiary: '#F0F3F4',
        },
        text: {
          primary: '#2C3E50',
          secondary: '#5D6D7E',
          muted: '#95A5A6',
        },
        success: '#27AE60',
        warning: '#F39C12',
        danger: '#E74C3C',
      },
      fontFamily: {
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
      },
      boxShadow: {
        card: '0 2px 12px rgba(0, 0, 0, 0.06)',
        glass: '0 8px 32px rgba(0, 0, 0, 0.08)',
        elevated: '0 4px 20px rgba(0, 0, 0, 0.12)',
      },
      backdropBlur: {
        glass: '16px',
      },
    },
  },
  plugins: [],
};

export default config;
