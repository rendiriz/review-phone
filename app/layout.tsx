import { fontMap } from '@/lib/utils/font';
import { Provider } from '@/providers';

import '@/styles/globals.css';

interface RootLayoutProps {
  readonly children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const inter = fontMap['inter'].next;

  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
