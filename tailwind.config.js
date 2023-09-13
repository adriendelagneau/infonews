/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {     
        limeLight: ['var(--font-limeLight)'],
        libreBaskerville: ['var(--font-libreBaskerville)'],
        myFont: ['var(--font-myFont)']
     }
    },
  },
  plugins: [],
}
