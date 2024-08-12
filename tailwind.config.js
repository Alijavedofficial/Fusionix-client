/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'scale-up-center': {
          '0%': { transform: 'scale(0.5)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        'scale-up-center': 'scale-up-center 0.3s cubic-bezier(0.390, 0.575, 0.565, 1.000) both',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: {
          light: '#63b3ed',
          DEFAULT: '#090088',
          dark: '#3182ce',
        },
        secondary: {
          light: '#f6ad55',
          DEFAULT: '#ed8936',
          dark: '#dd6b20',
        },
        text: {
          light: '#505f79',
          DEFAULT: '#505f79',
          dark: '#1a202c',
        },
        heading: {
          light: '#a0aec0',
          DEFAULT: '#4a5568',
          dark: '#2d3748',
        },
      },
    },
  },
  plugins: [],
};
