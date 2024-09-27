/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enables dark mode using the 'class' strategy
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xs: "296px",
      sm: "536px",
      smmd: "686px",
      md: "976px",
      lg: "1292px",
    },
    extend: {
      backgroundImage: {
        'visa-gradient': 'linear-gradient(175.01deg, #222357 184.55%, #254AA5 9637.78%)',
      },
      colors: {
        // Custom dark mode colors, optional but useful for tweaking dark mode
        darkBackground: '#1a202c', // A dark gray for backgrounds
        darkCard: '#2d3748',       // A lighter dark color for cards and sections
        darkText: '#f7fafc',       // Light color for text
      },
    },
  },
  plugins: [
    // Add any additional plugins here
  ],
};
