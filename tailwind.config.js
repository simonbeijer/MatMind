/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans-raw)", "Helvetica Neue", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-serif-raw)", "Times New Roman", "Georgia", "serif"],
        display: ["var(--font-serif-raw)", "Times New Roman", "Georgia", "serif"],
        mono: ["Commit Mono", "JetBrains Mono", "ui-monospace", "SF Mono", "monospace"],
      },
      letterSpacing: {
        eyebrow: "0.18em",
        kicker: "0.22em",
        rule: "0.28em",
        cover: "0.32em",
      },
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
        // Handoff editorial palette
        bone: "var(--bone)",
        paper: "var(--paper)",
        "paper-2": "var(--paper-2)",
        sumi: "var(--sumi)",
        "sumi-2": "var(--sumi-2)",
        ink: "var(--ink)",
        "ink-soft": "var(--ink-soft)",
        "ink-muted": "var(--ink-muted)",
        "ink-faint": "var(--ink-faint)",
        "ink-line": "var(--ink-line)",
        cinnabar: "var(--cinnabar)",
        // Cover (dark)
        "cover-bg": "var(--cover-bg)",
        "cover-fg": "var(--cover-fg)",
        "cover-dim": "var(--cover-dim)",
        "cover-faint": "var(--cover-faint)",
        "cover-line": "var(--cover-line)",
        // Legacy onboarding-* aliases
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
        md: "var(--radius)",
        sm: "var(--radius)",
      },
    },
  },
  plugins: [],
};
