/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'wood-pattern': "url('/backgrounds/wood-pattern.jpg')",
      },
      colors: {
        wood: {
          light: '#d4b795',
          DEFAULT: '#a67c52',
          dark: '#754c24',
        }
      },
    },
  },
  plugins: [],
}