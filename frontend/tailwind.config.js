/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    // colors: {
    //   JD_yellow: {
    //     light: '#b3bcf5',
    //     DEFAULT: '#ffde00',
    //     dark: '#202e78',
    //   },
    //   JD_green: {
    //     light: '#b3bcf5',
    //     DEFAULT: '#367c2b',
    //     dark: '#202e78',
    //   }
    // },
    extend: {
      backgroundImage: {
        // 'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        // 'gradient-conic':
        //   'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
          // 'cats': 'url(./players/background_title.png)'
      },
    },
  },
  plugins: [],
}
