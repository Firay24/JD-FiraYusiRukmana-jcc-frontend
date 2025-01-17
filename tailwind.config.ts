import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    //
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/hooks/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
    // fontSize: {
    //   h1: ["var(--font-h1-size)", { lineHeight: "var(--font-h1-line)", fontWeight: "var(--font-h1-weight)" }],
    //   h2: ["var(--font-h2-size)", { lineHeight: "var(--font-h2-line)", fontWeight: "var(--font-h1-weight)" }],
    //   h3: ["var(--font-h3-size)", { lineHeight: "var(--font-h3-line)", fontWeight: "var(--font-h1-weight)" }],
    //   h4: ["var(--font-h4-size)", { lineHeight: "var(--font-h4-line)", fontWeight: "var(--font-h1-weight)" }],
    //   h5: ["var(--font-h5-size)", { lineHeight: "var(--font-h5-line)", fontWeight: "var(--font-h1-weight)" }],
    //   h6: ["var(--font-h6-size)", { lineHeight: "var(--font-h6-line)", fontWeight: "var(--font-h1-weight)" }],
    //   h7: ["var(--font-h7-size)", { lineHeight: "var(--font-h7-line)", fontWeight: "var(--font-h1-weight)" }],
    //   h8: ["var(--font-h8-size)", { lineHeight: "var(--font-h8-line)", fontWeight: "var(--font-h1-weight)" }],
    //   body: ["var(--font-body-size)", { lineHeight: "var(--font-body-line)", fontWeight: "var(--font-body-weight)" }],
    //   small: ["var(--font-small-size)", { lineHeight: "var(--font-small-line)", fontWeight: "var(--font-small-weight)" }],
    //   bold: ["var(--font-bold-size)", { lineHeight: "var(--font-bold-line)", fontWeight: "var(--font-bold-weight)" }],
    //   italic: ["var(--font-italic-size)", { lineHeight: "var(--font-italic-line)", fontWeight: "var(--font-italic-weight)" }],
    //   link: ["var(--font-link-size)", { lineHeight: "var(--font-link-line)", fontWeight: "var(--font-link-weight)" }],
    //   paragraph: ["var(--font-paragraph-size)", { lineHeight: "var(--font-paragraph-line)", fontWeight: "var(--font-paragraph-weight)" }],
    //   indent: ["var(--font-indent-size)", { lineHeight: "var(--font-indent-line)", fontWeight: "var(--font-indent-weight)" }],
    //   xsmall: ["var(--font-xsmall-size)", { lineHeight: "var(--font-xsmall-line)", fontWeight: "var(--font-xsmall-weight)" }],
    // },
    fontFamily: {
      inter: ["var(--font-inter)", "sans-serif"],
      monospace: 'Consolas, "Courier New", monospace',
    },
    colors: {
      white: "rgb(var(--color-white) / 1)",
      black: "rgb(var(--color-black) / 1)",
      primary: {
        100: "rgb(var(--color-primary-100) / 1)",
        200: "rgb(var(--color-primary-200) / 1)",
        300: "rgb(var(--color-primary-300) / 1)",
        400: "rgb(var(--color-primary-400) / 1)",
        500: "rgb(var(--color-primary-500) / 1)",
        600: "rgb(var(--color-primary-600) / 1)",
        700: "rgb(var(--color-primary-700) / 1)",
      },
      secondary: {
        100: "rgb(var(--color-secondary-100) / 1)",
        200: "rgb(var(--color-secondary-200) / 1)",
        300: "rgb(var(--color-secondary-300) / 1)",
        400: "rgb(var(--color-secondary-400) / 1)",
        500: "rgb(var(--color-secondary-500) / 1)",
        600: "rgb(var(--color-secondary-600) / 1)",
        700: "rgb(var(--color-secondary-700) / 1)",
      },
      neutral: {
        100: "rgb(var(--color-neutral-100) / 1)",
        200: "rgb(var(--color-neutral-200) / 1)",
        300: "rgb(var(--color-neutral-300) / 1)",
        400: "rgb(var(--color-neutral-400) / 1)",
        500: "rgb(var(--color-neutral-500) / 1)",
        600: "rgb(var(--color-neutral-600) / 1)",
        700: "rgb(var(--color-neutral-700) / 1)",
        800: "rgb(var(--color-neutral-800) / 1)",
        900: "rgb(var(--color-neutral-900) / 1)",
      },
      success: {
        100: "rgb(var(--color-success-100) / 1)",
        500: "rgb(var(--color-success-500) / 1)",
        600: "rgb(var(--color-success-600) / 1)",
      },
      warning: {
        100: "rgb(var(--color-warning-100) / 1)",
        500: "rgb(var(--color-warning-500) / 1)",
        600: "rgb(var(--color-warning-600) / 1)",
      },
      danger: {
        100: "rgb(var(--color-danger-100) / 1)",
        500: "rgb(var(--color-danger-500) / 1)",
        600: "rgb(var(--color-danger-600) / 1)",
      },
    },
    extend: {},
  },
  plugins: [require("flowbite/plugin")],
};
export default config;
