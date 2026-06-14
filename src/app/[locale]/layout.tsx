import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppFAB from "@/components/layout/WhatsAppFAB";
import QuoteDrawer from "@/components/sections/QuoteDrawer";
import PageTransition from "@/components/layout/PageTransition";
import { QuoteCartProvider } from "@/context/QuoteCartContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { layout } from "@/config/layout";
import { locales, LocaleType } from "@/config/translations";

export const dynamicParams = false;

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface LocalizedLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocalizedLayout({
  children,
  params,
}: LocalizedLayoutProps) {
  // Await params per Next.js App Router requirements
  const { locale: rawLocale } = await params;
  const locale = rawLocale as LocaleType;
  const isRtl = locale === "ar";

  return (
    <ThemeProvider>
      <QuoteCartProvider>
        <div
          dir={isRtl ? "rtl" : "ltr"}
          lang={locale}
          className="min-h-screen flex flex-col bg-brand-dark text-foreground selection:bg-brand-cyan/35"
        >
          <Header locale={locale} />
          <main className={`flex-1 ${layout.mainOffset}`}>
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer locale={locale} />
          <WhatsAppFAB locale={locale} />
          <QuoteDrawer locale={locale} />
        </div>
      </QuoteCartProvider>
    </ThemeProvider>
  );
}
