import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        manrope: ['Manrope', 'sans-serif'],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        bgcomponent : "#f1f5fe",                 //BG Component
        softCyan: "hsl(174, 77%, 80%)",          // Full Slider Bar
        strongCyan: "hsl(174, 86%, 45%)",        // Slider Background
        lightGrayishRed: "hsl(14, 92%, 95%)",    // Discount Background
        lightRed: "hsl(15, 100%, 70%)",          // Discount Text
        paleBlue: "hsl(226, 100%, 87%)",         // CTA Text
        white: "hsl(0, 0%, 100%)",               // Pricing Component Background
        veryPaleBlue: "hsl(230, 100%, 99%)",     // Main Background
        lightGrayishBlue: "hsl(224, 65%, 95%)",  // Empty Slider Bar
        toggleBackground: "hsl(223, 50%, 87%)",  // Toggle Background
        grayishBlue: "hsl(225, 20%, 60%)",       // Text
        darkDesaturatedBlue: "hsl(227, 35%, 25%)" // Text & CTA Background
      },
    },
  },
  plugins: [],
} satisfies Config;
