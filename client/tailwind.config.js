/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Base colors
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        // Card colors
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        // Popover colors
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },

        // Primary colors
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },

        // Secondary colors
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },

        // Muted colors
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },

        // Accent colors
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },

        // Destructive colors
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },

        // Border and input
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",

        // Chart colors
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },

        // Custom glass colors
        glass: {
          white: "rgba(255, 255, 255, var(--glass-opacity, 0.1))",
          black: "rgba(0, 0, 0, var(--glass-opacity, 0.1))",
          blue: "rgba(59, 130, 246, var(--glass-opacity, 0.1))",
          purple: "rgba(147, 51, 234, var(--glass-opacity, 0.1))",
          pink: "rgba(236, 72, 153, var(--glass-opacity, 0.1))",
        },
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },

      backgroundImage: {
        // Liquid gradients
        "liquid-1": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        "liquid-2": "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        "liquid-3": "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
        "liquid-4": "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
        "liquid-5": "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",

        // Glass textures
        "glass-texture":
          "radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)",
        "glass-noise":
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E\")",

        // Flowing gradients with animation
        "flow-1": "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
        "flow-2": "linear-gradient(45deg, #667eea, #764ba2, #f093fb, #f5576c)",
        "flow-3":
          "linear-gradient(135deg, #667eea, #764ba2, #f093fb, #f5576c, #4facfe, #00f2fe)",
      },

      backdropBlur: {
        xs: "2px",
      },

      animation: {
        // Floating animations
        float: "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out infinite 2s",
        "float-slow": "float 8s ease-in-out infinite",

        // Shimmer effects
        shimmer: "shimmer 2s linear infinite",
        "shimmer-slow": "shimmer 3s linear infinite",

        // Liquid flow
        "liquid-flow": "liquidFlow 15s ease-in-out infinite",
        "liquid-flow-reverse": "liquidFlowReverse 20s ease-in-out infinite",

        // Ripple effects
        ripple: "ripple 0.6s ease-out",
        "ripple-delayed": "ripple 0.6s ease-out 0.1s",

        // Pulse variations
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "pulse-fast": "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",

        // Fade in animations
        "fade-in": "fadeIn 0.5s ease-in-out",
        "fade-in-up": "fadeInUp 0.5s ease-in-out",
        "fade-in-down": "fadeInDown 0.5s ease-in-out",

        // Scale animations
        "scale-in": "scaleIn 0.3s ease-in-out",
        "scale-in-bounce":
          "scaleInBounce 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      },

      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        liquidFlow: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        liquidFlowReverse: {
          "0%, 100%": { backgroundPosition: "100% 50%" },
          "50%": { backgroundPosition: "0% 50%" },
        },
        ripple: {
          "0%": { transform: "scale(0)", opacity: "1" },
          "100%": { transform: "scale(4)", opacity: "0" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInDown: {
          "0%": { opacity: "0", transform: "translateY(-30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        scaleInBounce: {
          "0%": { transform: "scale(0.3)", opacity: "0" },
          "50%": { transform: "scale(1.05)" },
          "70%": { transform: "scale(0.9)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },

      transitionDuration: {
        400: "400ms",
        600: "600ms",
        700: "700ms",
        800: "800ms",
        900: "900ms",
      },

      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.19, 1, 0.22, 1)",
        "out-circ": "cubic-bezier(0.08, 0.82, 0.17, 1)",
        "in-out-back": "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      },

      boxShadow: {
        glass: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        "glass-lg": "0 20px 40px 0 rgba(31, 38, 135, 0.4)",
        "glass-xl": "0 25px 50px 0 rgba(31, 38, 135, 0.5)",
        liquid: "0 8px 32px 0 rgba(59, 130, 246, 0.2)",
        glow: "0 0 20px rgba(59, 130, 246, 0.3)",
        "glow-lg": "0 0 40px rgba(59, 130, 246, 0.4)",
      },

      blur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
