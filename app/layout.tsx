import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { ThemeProvider } from "next-themes";
import { cn } from "@/lib/utils";

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "César Dianov | Portfolio",
  description: "Computer Science and Engineering Student @ IST",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(jetbrains.variable)}
    >
      <body className="font-sans min-h-screen flex flex-col bg-[url('/white.jpg')] dark:bg-[url('/black.jpg')] dark:bg-cover dark:bg-center dark:bg-fixed">
        <ThemeProvider attribute="class" enableSystem defaultTheme="system">
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}