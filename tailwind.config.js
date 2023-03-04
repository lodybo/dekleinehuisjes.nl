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
    },
  },
  plugins: [],
};
