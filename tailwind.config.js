/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',  // dark mode
  theme: {   // set themes
    extend: {
      colors: {
        dark: "#1b1b1b",
        light: "#fff",
        // accent: "#7B00D3", 
        accent: "#ed7b27",
        accentDark: "#ffdb4d",
        gray: "#747474",
        pink400: "#f472b6",
        green400: "#34d399",
        yellow400: "#fbbf24",
        red400: "#f87171",
        purple400: "#c084fc",
        blue300: "#93c5fd",
      },
      fontFamily:{
        mr: ["var(--font-mr)"],
        in: ["var(--font-in)"]
      },
      screens:{
        sxl: "1025px",
        // @media (min-width: 1180px){...}
        xs: "480px"
        // @media (min-width: 480px){...}
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ],
}



