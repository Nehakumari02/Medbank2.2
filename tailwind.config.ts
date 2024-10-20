import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "DM-Sans":["var(--font-DM-Sans)"],
      },

      
      fontSize: {
        'display-large': ['57px', { lineHeight: '64px', letterSpacing: '-0.25px' }],
        'display-medium': ['45px', { lineHeight: '52px', letterSpacing: '0' }],
        'display-small': ['36px', { lineHeight: '44px', letterSpacing: '0' }],
        'headline-large': ['32px', { lineHeight: '40px', letterSpacing: '0' }],
        'headline-medium': ['28px', { lineHeight: '36px', letterSpacing: '0' }],
        'headline-small': ['24px', { lineHeight: '32px', letterSpacing: '0' }],
        'title-large': ['22px', { lineHeight: '28px', letterSpacing: '0' }],
        'title-medium': ['16px', { lineHeight: '24px', letterSpacing: '0.15px' }],
        'title-small': ['14px', { lineHeight: '20px', letterSpacing: '0.1px' }],
        'label-large': ['14px', { lineHeight: '20px', letterSpacing: '0.1px' }],
        'label-medium': ['12px', { lineHeight: '16px', letterSpacing: '0.5px' }],
        'label-small': ['11px', { lineHeight: '16px', letterSpacing: '0.5px' }],
        'body-large': ['16px', { lineHeight: '24px', letterSpacing: '0.5px' }],
        'body-medium': ['14px', { lineHeight: '20px', letterSpacing: '0.25px' }],
        'body-small': ['12px', { lineHeight: '16px', letterSpacing: '0.4px' }],
      },
      letterSpacing: {
        'tracking-minus-0.25': '-0.25px',
        'tracking-minus-0.1': '-0.1px',
        'tracking-minus-0.15': '-0.15px',
        'tracking-0': '0',
        'tracking-0.1': '0.1px',
        'tracking-0.25': '0.25px',
        'tracking-0.4': '0.4px',
        'tracking-0.5': '0.5px',
      },
      colors: {
        'custom-blue': {
          50: '#f0f8ff',
          100: '#dbeffd',
          200: '#b6dfeb',
          300: '#91cfd9',
          400: '#6dbfc7',
          500: '#48afc5', 
          600: '#388f9e',
          700: '#286f77',
          800: '#184f50',
          900: '#082f29',
        },
        
        'custom-orange': {
          50: '#fff8e1',
          100: '#ffecb3',
          200: '#ffe082',
          300: '#ffd54f',
          400: '#ffca28',
          500: '#ffc107', 
          600: '#ffa000',
          700: '#ff8f00',
          800: '#ff6f00',
          900: '#e65100',
        },
        'custom-light-blue': {
          50: '#e0f7fa',
          100: '#b2ebf2',
          200: '#80deea',
          300: '#4dd0e1',
          400: '#26c6da',
          500: '#00bcd4', 
          600: '#00acc1',
          700: '#0097a7',
          800: '#00838f',
          900: '#006064',
        },
        'custom-gray': {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#eeeeee',
          300: '#e0e0e0',
          400: '#bdbdbd',
          500: '#9e9e9e', 
          600: '#757575',
          700: '#616161',
          800: '#424242',
          900: '#212121',
        },
        'custom-dark': {
          50: '#e0e0e0',
          100: '#b3b3b3',
          200: '#808080',
          300: '#4d4d4d',
          400: '#333333',
          500: '#000000', 
          600: '#1a1a1a',
          700: '#0d0d0d',
          800: '#080808',
          900: '#050505',
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes:{
        fadeIn:{
          '100%':{opacity:'1'},
        },
        slideIn:{
          '100%':{
            opacity:'1',
            transform:'translateY(0)',
          }
        }
      },
      animation:{
        fadeIn:'fadeIn 1s forwards',
        slideIn:'slideIn 1s forwards',
      }
    },
  },
  plugins: [],
};
export default config;