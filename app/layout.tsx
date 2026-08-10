import type { Metadata } from "next";
import { Allura, Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import TawkChat from "@/components/TawkChat";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600"],
});

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600"],
});

const signature = Allura({
  subsets: ["latin"],
  variable: "--font-signature",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Mary Eklund Brown | Financial Advisor & Broker",
  description: "Personalized investment management and financial strategies designed around your goals.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${sans.variable} ${signature.variable}`}>
        {children}
        <TawkChat />
      </body>
    </html>
  );
}
