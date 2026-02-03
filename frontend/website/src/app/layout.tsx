import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Next360 Organics | Farm to Hub Ecosystem",
  description: "Connecting organic farmers directly to local hubs and customers. Fresh, trusted, and organic.",
  icons: {
    icon: "/final-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Outfit:wght@100..900&display=swap" rel="stylesheet" />
      </head>
      <body
        className="antialiased bg-[#F5F5F0] text-[#262A2B] font-sans overflow-x-hidden"
      >
        {children}
      </body>
    </html>
  );
}
