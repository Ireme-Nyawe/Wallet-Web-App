/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FDF4FF",
        secondary: "#F9E0FF",
        accent: "#D946EF", 
        highlight: "#F472B6", 
        neutral: "#F3F4F6", 
        dark: "#4B5563",
        success: "#8E44AD",
        warning: "#FFB6C1",
      },
    },
  },
  plugins: [],
};
