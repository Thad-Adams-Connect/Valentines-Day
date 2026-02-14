import type { Metadata } from "next";
import { Cormorant_Garamond, Great_Vibes, Poppins } from "next/font/google";
import "./globals.css";

const bodySans = Poppins({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const romanticScript = Great_Vibes({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["400"],
});

const letterSerif = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Will You Be My Valentine?",
  description: "An elegant and playful Valentine experience.",
  icons: {
    icon: "/KP-Icon.svg",
    shortcut: "/KP-Icon.svg",
    apple: "/KP-Icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bodySans.variable} ${romanticScript.variable} ${letterSerif.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
