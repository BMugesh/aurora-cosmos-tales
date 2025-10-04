import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'system-ui', 'sans-serif'],
        futuristic: ['Orbitron', 'sans-serif'],
        comic: ['Bangers', 'cursive'],
        bubble: ['Luckiest Guy', 'cursive'],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
    },
  },
  plugins: [require("tailwindcss-animate"), require("daisyui")],
  daisyui: {
    themes: [
      {
        cosmic: {
          "primary": "hsl(280, 100%, 70%)",
          "primary-content": "hsl(0, 0%, 100%)",
          "secondary": "hsl(195, 100%, 65%)",
          "secondary-content": "hsl(245, 100%, 10%)",
          "accent": "hsl(158, 100%, 60%)",
          "accent-content": "hsl(245, 100%, 10%)",
          "neutral": "hsl(245, 30%, 20%)",
          "neutral-content": "hsl(0, 0%, 98%)",
          "base-100": "hsl(245, 100%, 6%)",
          "base-200": "hsl(245, 50%, 10%)",
          "base-300": "hsl(245, 30%, 20%)",
          "base-content": "hsl(0, 0%, 98%)",
          "info": "hsl(199, 89%, 48%)",
          "success": "hsl(142, 76%, 56%)",
          "warning": "hsl(38, 92%, 50%)",
          "error": "hsl(0, 84%, 60%)",
        },
      },
    ],
  },
} satisfies Config;
