import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./sections/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#111111",
        muted: "#626262",
        paper: "#ffffff",
        linen: "#f7f5f0",
        rule: "#dedbd3",
        gold: "#c8a96e",
        spruce: "#2f6f66",
        bluegray: "#495a6a"
      },
      boxShadow: {
        premium: "0 18px 45px rgba(17, 17, 17, 0.08)",
        fine: "0 8px 24px rgba(17, 17, 17, 0.06)"
      }
    }
  },
  plugins: []
};

export default config;
