import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import Header from "../components/ui/Header";
import Footer from "../components/ui/Footer";
import { ScrollToTop } from "../components/ui/ScrollToTop";
import { SessionProviderWrapper } from "../components/SessionProviderWrapper";
import { Toaster } from "../components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GroceryNext - Fresh Groceries Delivered",
  description: "Your one-stop destination for fresh groceries delivered to your doorstep",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <SessionProviderWrapper>
          <Header />
          <main className="flex-grow w-full">
            {children}
          </main>
          <Footer />
          <ScrollToTop />
          <Toaster />
        </SessionProviderWrapper>
      </body>
    </html>
  );
}