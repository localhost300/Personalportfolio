import type { Metadata } from "next";
import "./globals.css";
import TawkChat from "@/components/TawkChat";

export const metadata: Metadata = {
  title: { default: "Andrea Marie Shenocca | Financial Advisor & Broker", template: "%s | Andrea Marie Shenocca" },
  description: "Personalized investment management, retirement planning, and wealth strategies from Andrea Marie Shenocca, backed by 39 years of experience across 9 firms and 21 state licenses.",
  applicationName: "Andrea Marie Shenocca Wealth Management",
  authors: [{ name: "Andrea Marie Shenocca" }],
  creator: "Andrea Marie Shenocca",
  publisher: "Andrea Marie Shenocca",
  keywords: ["Andrea Marie Shenocca", "financial advisor", "wealth management", "investment management", "retirement planning", "financial strategy", "brokerage services"],
  category: "finance",
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "en_US", title: "Andrea Marie Shenocca | Financial Advisor & Broker", description: "Personalized investment management and financial strategies built around your goals, risk profile, and future.", siteName: "Andrea Marie Shenocca Wealth Management" },
  twitter: { card: "summary_large_image", title: "Andrea Marie Shenocca | Financial Advisor & Broker", description: "Personalized investment management and financial strategies built around your goals, risk profile, and future." },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <TawkChat />
      </body>
    </html>
  );
}
