/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Cormorant Garamond"', "Georgia", "serif"],
        body: ['"Plus Jakarta Sans"', "ui-sans-serif", "system-ui"],
      },
      colors: {
        ember: "#ff7a18",
        saffron: "#ffd166",
        nectar: "#f7b731",
        midnight: "#100b07",
        crema: "#fff4d6",
      },
      boxShadow: {
        glow: "0 0 60px rgba(255, 122, 24, 0.35)",
        glass: "0 24px 80px rgba(0, 0, 0, 0.35)",
      },
    },
  },
  plugins: [],
};
