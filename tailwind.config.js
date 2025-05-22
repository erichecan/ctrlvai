/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100%',
            img: {
              borderRadius: '0.75rem',
              marginTop: '1.5rem',
              marginBottom: '1.5rem'
            },
            code: {
              backgroundColor: '#f3f4f6',
              padding: '0.2em 0.4em',
              borderRadius: '0.25rem'
            },
            pre: {
              backgroundColor: '#1e293b',
              color: '#f8fafc',
              padding: '1rem',
              borderRadius: '0.5rem',
              overflowX: 'auto'
            }
          }
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}