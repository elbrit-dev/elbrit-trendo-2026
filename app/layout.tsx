import type { Metadata, Viewport } from "next";
import { Poppins, Inter } from "next/font/google";
import { EVENT } from "@/lib/content";
import "./globals.css";

const display = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${EVENT.name} ${EVENT.year} — ${EVENT.brand} | ${EVENT.tagline}`,
  description: EVENT.theme,
  openGraph: {
    title: `${EVENT.name} ${EVENT.year} — ${EVENT.brand}`,
    description: EVENT.tagline,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#07090f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
