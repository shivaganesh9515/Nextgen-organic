import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next360 Organics | Farm to Hub Ecosystem",
  description: "Connecting organic farmers directly to local hubs and customers. Fresh, trusted, and organic.",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${outfit.variable} antialiased bg-[#F5F5F0] text-[#262A2B] font-sans overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
