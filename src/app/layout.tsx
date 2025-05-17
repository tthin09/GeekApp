import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/sidebar"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GeekUp Assessment",
  description: "A web app for GeekUp Assessment 2025",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex`}
      >
        <Sidebar />
        <div className="flex-1 grow">
          <nav className="fixed w-full h-[64px] bg-background">
          </nav>
          <div className="max-xl:ml-[0px] ml-[200px] mt-[64px] transition-all duration-300">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
