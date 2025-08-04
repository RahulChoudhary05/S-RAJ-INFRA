const defaultTheme = require("tailwindcss/defaultTheme")
const colors = require("tailwindcss/colors")
const { default: flattenColorPalette } = require("tailwindcss/lib/util/flattenColorPalette")

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{html,js,jsx,ts,tsx}", "*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    // Custom font families
    fontFamily: {
      body: ["Bodoni Moda", "serif"],
      playfair: ["Playfair Display", "serif"],
      inter: ["Inter", "sans-serif"],
      "edu-sa": ["Edu SA Beginner", "cursive"],
      mono: ["Roboto Mono", "monospace"],
    },

    // Custom color palette
    colors: {
      black: "#000",
      backgroundblack: "#0C0C0C",
      white: "#fff",
      transparent: "#ffffff00",
      zinc: {
        300: "#d4d4d8",
        500: "#71717a",
        700: "#3f3f46",
        800: "#27272a",
      },
      emerald: {
        500: "#10b981",
      },
      yellow: {
        200: "#CFAB08",
        500: "#866A04",
        600: "#6E5503",
        1: "#D4AF37",
      },
      richblack: {
        800: "#161D29",
        900: "#000814",
      },
      richblue: {
        600: "#042E3B",
        700: "#032833",
        800: "#01212A",
        900: "#001B22",
      },
      blue: {
        100: "#47A5C5",
        200: "#118AB2",
        300: "#0F7A9D",
        500: "#0A5A72",
        600: "#074B5D",
        700: "#053B48",
        800: "#022B32",
        900: "#001B1D",
      },
      caribbeangreen: {
        5: "#C1FFFD",
      },
      neutral: {
        50: "#F9FAFB",
        100: "#F0F4F8",
        200: "#E5E7EB",
        300: "#CDD7E1",
        400: "#9FA6AD",
        500: "#636B74",
        600: "#555E68",
        700: "#374151",
        800: "#1F2937",
        950: "#111827",
      },
      primaryYellow: "#F1C40F",
      primaryGray: "#7F8C8D",
      "neutral-950": "#111827", // Dark background
    },

    extend: {
      // Define custom max-width sizes
      maxWidth: {
        maxContent: "1260px",
        maxContentTab: "650px",
      },
      boxShadow: {
        input: `0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)`,
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },

  plugins: [addVariablesForColors, require("tailwindcss-animate")],
}

// Function to add custom color variables to CSS root
function addVariablesForColors({ addBase, theme }) {
  const allColors = flattenColorPalette(theme("colors"))
  const newVars = Object.fromEntries(Object.entries(allColors).map(([key, val]) => [`--${key}`, val]))

  addBase({
    ":root": newVars,
  })
}
