const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['selector', '[data-theme="dark"]'],
  // darkMode: ['selector'],
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './ui/**/*.{js,ts,jsx,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    colors: {
      primary: '#00E99E',
      white: '#FFFFFF',
      white2: '#FAFAFA',
      dark: '#1B1B1B',
      darkText: '#333333',
      gray: '#EDEDED',
      grayText: '#8D8D8D',
      grayTextLight: '#B3B3B3',
      red: '#F22E41',
      violet: '#444CF7',
      border: '#E7E7E7',
      blue: '#008FFF',
      transparent: 'transparent',
      current: 'current',
      inherit: 'inherit',

      input: 'var(--input)',
      ring: 'var(--gray)',
      background: 'var(--background)',
      foreground: 'var(--foreground)',
      secondary: {
        DEFAULT: 'var(--secondary)',
        foreground: 'var(--secondary-foreground)',
      },
      destructive: {
        DEFAULT: 'var(--destructive)',
        foreground: 'var(--destructive-foreground)',
      },
      muted: {
        DEFAULT: 'var(--muted)',
        foreground: 'var(--muted-foreground)',
      },
      accent: {
        DEFAULT: 'var(--accent)',
        foreground: 'var(--accent-foreground)',
      },
      popover: {
        DEFAULT: 'var(--white)',
        foreground: 'var(--popover-foreground)',
      },
      card: {
        DEFAULT: 'var(--card)',
        foreground: 'var(--card-foreground)',
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
        blur: {
          '0%': { filter: 'blur(0)' },
          '20%': { filter: 'blur(0)' },
          '30%': { filter: 'blur(4px)' },
          '90%': { filter: 'blur(4px)' },
          '100%': { filter: 'blur(0px)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'blur': 'blur 6s infinite ease-in-out',
      },
      transitionDelay: {
        '2000': '2000ms',
        '4000': '4000ms',
      },
      screens: {
        'desktop': '1200px',
        'mid': '979px',
        'xs': '414px',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      boxShadow: {
        mid: '0px 4px 24px 0px #00000005',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
}