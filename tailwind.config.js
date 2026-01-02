/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: This is the most common point of failure.
  // Make sure it covers your 'app' folder and any 'components' folder.
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./App.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
};