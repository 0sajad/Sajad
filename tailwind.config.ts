
import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  safelist: [
    "animate-fade-in",
    "animate-float",
    "animate-pulse",
    "animate-bounce",
    "animate-spin",
    "scale-105",
    "scale-110",
    "hover:scale-105",
    "hover:scale-110",
    "hover:shadow-lg",
    "hover:shadow-xl",
    "from-blue-400",
    "to-blue-600",
    "from-purple-400",
    "to-purple-600",
    "from-green-400",
    "to-green-600",
    "from-red-400",
    "to-red-600",
    "from-amber-400",
    "to-amber-600",
    "from-teal-400",
    "to-teal-600",
    "from-amber-300",
    "to-amber-600",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        tajawal: ['Tajawal', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        octaBlue: {
          50: "#e6f1ff",
          100: "#cce3ff",
          200: "#99c8ff",
          300: "#66adff",
          400: "#3392ff",
          500: "#0077ff",
          600: "#005ece",
          700: "#00469b",
          800: "#002e68",
          900: "#001735",
        },
        octaGold: {
          50: "#FFF8E5",
          100: "#FFEFC0",
          200: "#FFE299",
          300: "#FFD56F",
          400: "#FFCB4C",
          500: "#FFBF28",
          600: "#FFB416",
          700: "#F4A500",
          800: "#C68400",
          900: "#946300",
        },
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
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-3d": {
          "0%, 100%": { 
            transform: "scale3d(1, 1, 1)",
            boxShadow: "0 0 0 rgba(59, 130, 246, 0)"
          },
          "50%": { 
            transform: "scale3d(1.05, 1.05, 1.05)",
            boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)"
          },
        },
        "rotate-3d": {
          "0%": { transform: "rotate3d(0, 1, 0, 0deg)" },
          "100%": { transform: "rotate3d(0, 1, 0, 360deg)" },
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 3s ease-in-out infinite",
        "pulse-3d": "pulse-3d 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "rotate-3d": "rotate-3d 3s linear infinite",
      },
      boxShadow: {
        "3d-light": "5px 5px 10px rgba(0, 0, 0, 0.1), -5px -5px 10px rgba(255, 255, 255, 0.8)",
        "3d-dark": "5px 5px 10px rgba(0, 0, 0, 0.3), -2px -2px 5px rgba(255, 255, 255, 0.05)",
        "3d-hover": "8px 8px 16px rgba(0, 0, 0, 0.1), -8px -8px 16px rgba(255, 255, 255, 0.8)",
        "gold": "0 0 15px rgba(255, 191, 40, 0.7)",
        "blue-glow": "0 0 15px rgba(0, 119, 255, 0.7)",
      },
      backdropFilter: {
        "blur-10": "blur(10px)",
        "blur-20": "blur(20px)",
      },
      transformStyle: {
        "3d": "preserve-3d",
      },
      perspective: {
        "500": "500px",
        "1000": "1000px",
      },
      transitionProperty: {
        "transform-shadow": "transform, box-shadow",
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
