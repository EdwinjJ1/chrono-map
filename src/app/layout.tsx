import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chrono-Map | Sydney Layers",
  description: "Explore Sydney's hidden stories through time. Discover historical landmarks, film locations, and cultural heritage with our interactive time-travel map.",
  keywords: ["Sydney", "history", "map", "heritage", "film locations", "travel", "culture"],
  authors: [{ name: "Evan Lin" }],
  openGraph: {
    title: "Chrono-Map | Sydney Layers",
    description: "Explore Sydney's hidden stories through time",
    type: "website",
    locale: "en_AU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
