/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "example-color": "#ff0000",
        "tsht-black-navy": "#272637",
        "tsht-light-navy": "#3E3D49",
        "tsht-red" :"#FF795B",
        "tsht-green": "#30FF98",
        "tsht-yellow": "#FFB330",
        "tsht-light-gray": "#4A4A4A",
        "tsht-dark-gray": "#343434",
        "tsht-purple": "#7154FF",
        "tsht-trash-gray": "#D9D9D9",

      },
      fontFamily: {
        "inter": ["Inter var", "sans-serif"],
        "jersey": ["Jersey 25", "sans-serif"],
      }
    },
  },
  plugins: [],
}

