const defaultTheme = require('tailwindcss/defaultTheme');

const FontSizes = {
  ExtraLight: '200',
  Light: '300',
  Regular: '400',
  SemiBold: '600',
  Bold: '700',
};

/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx,jsx,js}'],
  theme: {
    colors: {
      primary: {
        100: '#FFF0F0',
        200: '#FFBFBF',
        DEFAULT: '#FF8B8B',
        300: '#C64545',
        400: '#7E1010',
      },
      secondary: {
        50: '#FFD395',
        100: '#FFC26D',
        200: '#EE971F',
        DEFAULT: '#B26700',
        300: '#7A4700',
        400: '#2B1900',
      },
      neutral: {
        100: '#FFFEFD',
        200: '#D4CDC8',
        DEFAULT: '#948D87',
        300: '#524C47',
        400: '#37281C',
      },
      stone: '#2B303A',
      white: '#FFFFFF',
      black: '#000000',
      red: '#E62B2B',
      green: '#50C425',
      yellow: '#FFC511',
      blue: '#3181BA',
    },
    fontSize: {
      'body-s': ['12px', { lineHeight: '16px', fontWeight: FontSizes.Regular }],
      'body-m': ['14px', { lineHeight: '20px', fontWeight: FontSizes.Regular }],
      'body-l': ['16px', { lineHeight: '24px', fontWeight: FontSizes.Regular }],
      'label-s': ['11px', { lineHeight: '16px', fontWeight: FontSizes.Bold }],
      'label-m': ['12px', { lineHeight: '16px', fontWeight: FontSizes.Bold }],
      'label-l': ['14px', { lineHeight: '20px', fontWeight: FontSizes.Bold }],
      'title-s': ['12px', { lineHeight: '16px', fontWeight: FontSizes.Light }],
      'title-m': [
        '16px',
        { lineHeight: '24px', fontWeight: FontSizes.SemiBold },
      ],
      'title-l': [
        '22px',
        { lineHeight: '28px', fontWeight: FontSizes.Regular },
      ],
      'headline-s': [
        '24px',
        { lineHeight: '32px', fontWeight: FontSizes.SemiBold },
      ],
      'headline-m': [
        '28px',
        { lineHeight: '36px', fontWeight: FontSizes.Regular },
      ],
      'headline-l': [
        '32px',
        { lineHeight: '40px', fontWeight: FontSizes.Regular },
      ],
      'display-s': [
        '36px',
        { lineHeight: '44px', fontWeight: FontSizes.ExtraLight },
      ],
      'display-m': [
        '45px',
        { lineHeight: '52px', fontWeight: FontSizes.ExtraLight },
      ],
      'display-l': [
        '57px',
        { lineHeight: '64px', fontWeight: FontSizes.ExtraLight },
      ],
    },
    extend: {
      fontFamily: {
        sans: ['Assistant', ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        DEFAULT: '0px 2px 4px 0px rgb(55 40 28 / 30%)',
      },
      keyframes: {
        overlayShow: {
          from: { opacity: 0 },
          to: { opacity: 0.5 },
        },
        contentShow: {
          from: { opacity: 0, transform: 'translate(-50%, -48%) scale(0.96)' },
          to: { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
        },
        hide: {
          from: { opacity: 1 },
          to: { opacity: 0 },
        },
        slideIn: {
          from: {
            transform: 'translateX(calc(100% + var(--viewport-padding)))',
          },
          to: { transform: 'translateX(0))' },
        },
        swipeOut: {
          from: { transform: 'translateX(var(--radix-toast-swipe-end-x))' },
          to: { transform: 'translateX(calc(100% + var(--viewport-padding)))' },
        },
      },
      animation: {
        overlayShow: 'overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        contentShow: 'contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        hide: 'hide 100ms ease-in',
        slideIn: 'slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        swipeOut: 'swipeOut 100ms ease-out',
      },
    },
  },
  plugins: [],
};
