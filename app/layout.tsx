import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kedah Tech Valley | Merancakkan Ekonomi Digital Kedah",
  description:
    "Kedah Tech Valley menghubungkan bakat, industri, akademia, agensi dan komuniti untuk memacu masa depan digital Kedah.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/assets/ktv-symbol.png",
    shortcut: "/assets/ktv-symbol.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ms">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
