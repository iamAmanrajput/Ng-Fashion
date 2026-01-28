import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import ClientProviders from "@/components/custom/common/ClientProviders";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NG Store | Exclusively Crafted Designer Apparel",
  icons: {
    icon: "/logo.jpeg",
    apple: "/logo.jpeg",
  },
  description:
    "Explore the official collection of NG Fashion. Unique, handcrafted garments designed for style and comfort. Discover our latest arrivals and timeless fashion pieces.",
  keywords: [
    "NG Store",
    "Designer Clothes",
    "Handcrafted Apparel",
    "Boutique Fashion",
    "Custom Outfits",
    "Exclusive Designer Wear",
  ],
  authors: [{ name: "NG Store" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${sora.variable} antialiased max-w-screen`}
      >
        {children}
        <ClientProviders />
      </body>
    </html>
  );
}
