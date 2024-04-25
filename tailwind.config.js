/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    colors: {
      primary: "#DD656C",
      secondary: "#2BBCA2",
      textColor: {
        extraLight: "#F2F2F2",
        light: "#F7F7F7",
        dark: "#808080",
        extraDark: "#3B3B3B",
      },
      bgColor: {
        light: {
          DEFAULT: "#FFFFFF",
          dark: "#F9F9F9",
          extraDark: "#F2F2F2",
        },
        dark: {
          extraLight: "#3B3B3B",
          light: "#313131",
          DEFAULT: "#2B2B2B",
        },
      },
    },
  },
};
