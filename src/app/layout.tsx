import type { Metadata } from "next";
import { Oswald, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Loader from "@/components/Loader";
import CookieBanner from "@/components/CookieBanner";
import { ThemeProvider } from "@/context/ThemeContext";

const oswald = Oswald({
  weight: ["600", "700"],
  subsets: ["cyrillic", "latin"],
  variable: "--font-display",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  weight: ["400", "500", "700"],
  subsets: ["cyrillic", "latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BASICK PRODUCTION — Студия съемки и маркетинга",
  description: "Кинематографичный продакшн и культурный маркетинг.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${oswald.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-white dark:bg-[#070707] text-black dark:text-white font-sans antialiased selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
        <ThemeProvider>
          <Loader />
          <Header />
          {children}
          <CookieBanner />
        </ThemeProvider>
      </body>
    </html>
  );
}