import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppBar from "@/components/AppBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FealtyX",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <div className="bg-black">
          <AppBar/>{children}
          </div>
        </body>
    </html>
  );
}