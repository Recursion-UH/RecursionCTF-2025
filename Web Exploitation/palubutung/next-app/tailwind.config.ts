import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        neutral: {
          light: "#E4E4E4",
          "light-hover": "#DEDEDE",
          "light-active": "#D7D7D7",
          normal: "#C2C2C2",
          "normal-hover": "#A5A5A5",
          "normal-active": "#8E8E8E",
          dark: "#444444",
          "dark-hover": "#313131",
          "dark-active": "#151515",
        },
        primary: {
          light: "#E6F5FF",
          "light-hover": "#D9F1FF",
          "light-active": "#B0E1FE",
          normal: "#009FFC",
          "normal-hover": "#008FE3",
          "normal-active": "#007FCA",
          dark: "#0077BD",
          "dark-hover": "#005F97",
          "dark-active": "#004871",
          darker: "#003858",
        },
        secondary: {
          black: "#151515",
          white: "#FFFFFF",
        },
      },
      fontSize: {
        "text-s": [
          "12px",
          {
            lineHeight: "16px",
          },
        ],
        "text-m": [
          "14px",
          {
            lineHeight: "20px",
          },
        ],
        "text-l": [
          "16px",
          {
            lineHeight: "24px",
          },
        ],
        "heading-s": [
          "20px",
          {
            lineHeight: "28px",
          },
        ],
        "heading-m": [
          "28px",
          {
            lineHeight: "36px",
          },
        ],
        "heading-l": [
          "36px",
          {
            lineHeight: "44px",
          },
        ],
      },
    },
  },
  plugins: [],
};
export default config;
