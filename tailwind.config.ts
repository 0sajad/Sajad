
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
    "toast-3d",
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
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 3s ease-in-out infinite",
        "fade-in": "fade-in 0.5s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    function({ addComponents, theme }) {
      addComponents({
        '.toast-3d': {
          'transform-style': 'preserve-3d',
          'box-shadow': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05), 0 -2px 0 0 rgba(255, 255, 255, 0.2) inset, 0 2px 0 0 rgba(0, 0, 0, 0.1)',
          'border-radius': '12px',
          'backdrop-filter': 'blur(16px)',
          'border': '1px solid rgba(255, 255, 255, 0.2)',
          'animation': 'toast-entry 0.5s cubic-bezier(0.21, 1.02, 0.73, 1)',
          '@keyframes toast-entry': {
            '0%': {
              transform: 'scale(0.9) translateY(20px) perspective(700px) rotateX(10deg)',
              opacity: 0,
            },
            '100%': {
              transform: 'scale(1) translateY(0) perspective(700px) rotateX(0deg)',
              opacity: 1,
            },
          },
          '&:hover': {
            transform: 'translateY(-3px) scale(1.02) perspective(700px)',
            transition: 'all 0.2s ease',
          },
        },
      });
    },
  ],
} satisfies Config;

export default config;
