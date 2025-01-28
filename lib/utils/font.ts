import { Inter } from 'next/font/google';

const interVariable = 'var(--font-inter)';
const interFont = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const fontMap = {
  inter: {
    next: interFont,
    tailwind: interVariable,
  },
};

export type AvailableFonts = keyof typeof fontMap;
export { fontMap };
