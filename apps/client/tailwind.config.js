/** @type {import('tailwindcss').Config} */
// apps/app1/tailwind.config.js
const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind');
const { join } = require('path');
const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    fontFamily: {
      roboto: ['"Roboto"', ...defaultTheme.fontFamily['sans']],
    },
    fontSize: {
      sm: ['14px', '20px'],
      base: ['16px', '20px'],
      lg: ['18px', '20px'],
      xl: ['24px', '20px'],
      '2xl': ['26px', '20px'],
    },
    colors: {
      inherit: 'inherit',
      transparent: 'transparent',
      blue: {
        light: '#81b29a',
      },
      gray: {
        DEFAULT: '#8d8b90',
        light: '#d9dadf',
      },
      white: '#fff',
      black: '#0b0b0b',
    },
    extend: {},
  },
  plugins: [],
};
