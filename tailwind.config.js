/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}",
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
    },
  },
  plugins: [

  ],
};

