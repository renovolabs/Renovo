import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

/*
 * COMPLIANCE: metadata carries zero benefit / therapeutic language.
 * Descriptions speak to manufacturing standards and research use only.
 */
export const metadata: Metadata = {
  title: "Renovo Labs — Research-Grade Peptides",
  description:
    "Renovo Labs. Precision-manufactured research compounds for laboratory use only. Not for human consumption. Join the waitlist for first access.",
  keywords: ["research peptides", "laboratory research", "research compounds"],
  openGraph: {
    title: "Renovo Labs — Research-Grade Peptides",
    description:
      "Precision-manufactured research compounds for laboratory use only. Join the waitlist.",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0b0c0e",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body className="bg-base text-snow antialiased">{children}</body>
    </html>
  );
}
