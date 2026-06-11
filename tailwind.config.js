/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          DEFAULT: '#5b2a86',
          dark: '#43205f',
          darker: '#341a4d',
          light: '#7b48a8',
          soft: '#f4eefa',
        },
        gold: {
          DEFAULT: '#f7c615',
          dark: '#e2b200',
        },
        blue: '#1f8ee0',
        ink: '#23202b',
        muted: '#6b6577',
        line: '#e9e4ef',
        bg: '#f6f4f9',
        green: '#2fae6b',
      },
      fontFamily: {
        head: ['Poppins', 'sans-serif'],
        body: ['Mulish', 'sans-serif'],
      },
      borderRadius: {
        site: '14px',
      },
      boxShadow: {
        sm: '0 2px 10px rgba(67,32,95,.07)',
        DEFAULT: '0 14px 40px rgba(67,32,95,.12)',
        lg: '0 24px 60px rgba(67,32,95,.18)',
      },
      maxWidth: {
        site: '1200px',
        wrap: '1240px',
      },
    },
  },
  plugins: [],
}
