import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'sovereign-purple': '#a855f7',
        'aero-cyan': '#00e5ff',
        'emerald-ka': '#10b981',
      },
    },
  },
  plugins: [],
};
export default config;
