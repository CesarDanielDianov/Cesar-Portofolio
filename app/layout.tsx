import type { Metadata, Viewport } from "next";
import { Caveat, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ClickSound from "@/components/effects/ClickSound";
import Fireflies from "@/components/effects/Fireflies";
import BootScreen, { BOOT_KEY } from "@/components/effects/BootScreen";
import { site } from "@/content/site";
import { dict } from "@/content/i18n";
import { LangProvider } from "@/components/i18n/LangProvider";
import { getLang } from "@/lib/i18n-server";
import { LOCALE } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import "./globals.css";

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-jetbrains",
});

/** Handwriting, for the sticky note and index card on the homepage desk. */
const caveat = Caveat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-hand",
});

export async function generateMetadata(): Promise<Metadata> {
  const t = dict[await getLang()].site;
  return {
    title: {
      default: t.title,
      template: `%s | ${site.name}`,
    },
    description: t.description,
    authors: [{ name: site.name, url: site.links.github }],
    creator: site.name,
    openGraph: {
      type: "website",
      title: t.title,
      description: t.description,
      siteName: t.title,
      locale: t.ogLocale,
    },
    twitter: {
      card: "summary",
      title: t.title,
      description: t.description,
    },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f2f2f2" },
    { media: "(prefers-color-scheme: dark)", color: "#030605" },
  ],
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const lang = await getLang();
  return (
    <html lang={LOCALE[lang]} suppressHydrationWarning className={cn(jetbrains.variable, caveat.variable)}>
      <head>
        {/* Hide the boot screen before first paint if it already ran this session. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(sessionStorage.getItem("${BOOT_KEY}"))document.documentElement.setAttribute("data-booted","")}catch(e){}`,
          }}
        />
      </head>
      <body className="site-bg flex min-h-screen flex-col font-sans" suppressHydrationWarning>
        <ThemeProvider attribute="class" enableSystem defaultTheme="system">
          <LangProvider initial={lang}>
          <Fireflies />
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-foreground focus:px-4 focus:py-2 focus:text-background"
          >
            {dict[lang].skipToContent}
          </a>
          <BootScreen />
          <ClickSound />
          <Navbar />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          </LangProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
