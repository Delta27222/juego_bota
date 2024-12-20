import type { Metadata } from "next";
import "./globals.css";
import { Great_Vibes } from 'next/font/google';

const greatVibes = Great_Vibes({
  subsets: ['latin'], // Solo necesitamos el subconjunto latino para esta fuente
  weight: ['400'], // Peso normal
  variable: '--font-great-vibes', // Variable CSS
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${greatVibes.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
