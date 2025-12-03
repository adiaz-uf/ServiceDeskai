/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', 
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      colors: {
        'ui-primary': 'var(--color-ui-primary)',         // (Blue)
        'ui-secondary': 'var(--color-ui-secondary)',     // (Card/Modal Background)
        'ui-background': 'var(--color-ui-background)',   // (Main Background)
        
        // Text Colors
        'text-primary': 'var(--color-text-primary)',     // (Main Text)
        'text-secondary': 'var(--color-text-secondary)', // (Secondary Text)

        // Status/Semantic Colors
        'status-success': 'var(--color-status-success)', // (Green)
        'status-warning': 'var(--color-status-warning)', // (Orange)
        'status-error': 'var(--color-status-error)',     // (Red)
      },
    },
  },
  plugins: [],
}