import type { Metadata, Viewport } from "next";
import { Jost, Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
// @ts-ignore
import "./globals.css";
import ServiceWorkerRegister from "./components/ServiceWorkerRegister";
import PWAInstallPrompt from "./components/PWAInstallPrompt";
import { Analytics } from "@vercel/analytics/next";

const satoshi = localFont({
  src: [
    // { path: './localFonts/Satoshi-Light.otf', weight: '300', style: 'normal' },
    { path: "./localFonts/Satoshi-Medium.otf", weight: "500", style: "normal" },
    { path: "./localFonts/Satoshi-Bold.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-satoshi", // This creates a CSS variable
  display: "swap", // Ensures text is visible during load
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dmSans = Jost({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Campusmart",
  description:
    "Campusmart - The ultimate marketplace for students. Buy and sell items easily within your campus community.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Campusmart",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#ff681f",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head />
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${dmSans.variable} ${satoshi.variable} antialiased`}
      >
        <ServiceWorkerRegister />
        <PWAInstallPrompt />
        <div className="flex justify-center min-h-dvh bg-neutral-50">
          <div className="w-full bg-white min-h-dvh shadow-sm relative overflow-x-hidden">
            {children}
          </div>
        </div>
        {/* vercel analytics to monitor metrics. cos why not */}
        <Analytics />
      </body>
    </html>
  );
}
