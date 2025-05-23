import { Inter } from 'next/font/google';
import './globals.css';
import ThemeProvider from '@/context/ThemeContext';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
            {children}
        </ThemeProvider>
      </body>
    </html>
  );
}