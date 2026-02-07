import type { Metadata } from "next";
import { Spectral } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { MetaPixel } from "@/components/analytics/MetaPixel";
import { MicrosoftClarity } from "@/components/analytics/MicrosoftClarity";

const spectral = Spectral({
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-spectral",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Anthony Dunn Atelier",
  description: "Custom oil painting commissions by a professional artist",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spectral.variable} font-sans antialiased`}>
        <MetaPixel />
        <MicrosoftClarity />
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
