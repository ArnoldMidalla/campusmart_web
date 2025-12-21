import type { Metadata } from "next";
import { DM_Sans, Geist, Geist_Mono, Google_Sans } from "next/font/google";
import "./globals.css";
import Nav from "./components/nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const googleSans = Google_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Campusmart",
  description: "Buy and sell on Campusmart",
  // manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${dmSans.variable} ${googleSans.variable} antialiased relative`}
      >
        {children}
        <Nav/>
      </body>
    </html>
  );
}
