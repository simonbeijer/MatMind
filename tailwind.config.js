/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        "onboarding-bg-primary": "var(--onboarding-bg-primary)",
        "onboarding-bg-secondary": "var(--onboarding-bg-secondary)",
        "onboarding-text-primary": "var(--onboarding-text-primary)",
        "onboarding-text-muted": "var(--onboarding-text-muted)",
        "onboarding-text-subtle": "var(--onboarding-text-subtle)",
        "onboarding-border-subtle": "var(--onboarding-border-subtle)",
        "onboarding-border-input": "var(--onboarding-border-input)",
        "onboarding-accent-start": "var(--onboarding-accent-start)",
        "onboarding-accent-end": "var(--onboarding-accent-end)",
        "onboarding-card-bg": "var(--onboarding-card-bg)",
        "onboarding-hover-bg": "var(--onboarding-hover-bg)",
        "onboarding-progress-bg": "var(--onboarding-progress-bg)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
};