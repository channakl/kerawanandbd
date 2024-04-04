/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/modules/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontSize: {
        xs: ['10px', {
          lineHeight: '12px'
        }],
        sm: ['12px', {
          lineHeight: '16px'
        }],
        base: ['14px', {
          lineHeight: '20px'
        }],
        md: ['14px', {
          lineHeight: '20px'
        }],
        lg: ['16px', {
          lineHeight: '24px'
        }],
        xl: ['18px', {
          lineHeight: '28px'
        }],
        '2xl': ['20px', {
          lineHeight: '28px'
        }],
        '3xl': ['24px', {
          lineHeight: '32px'
        }],
        '4xl': ['30px', {
          lineHeight: '36px'
        }],
        '5xl': ['36px', {
          lineHeight: '40px'
        }],
        '6xl': ['48px', {
          lineHeight: '64px'
        }],
        '7xl': ['60px', {
          lineHeight: '72px'
        }],
        '8xl': ['72px', {
          lineHeight: '96px'
        }],
        '9xl': ['96px', {
          lineHeight: '128px'
        }],
        '10xl': ['128px', {
          lineHeight: '160px'
        }],
      },
    },
  },
  plugins: [],
};
