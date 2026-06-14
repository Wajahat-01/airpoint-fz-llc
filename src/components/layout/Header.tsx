"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Phone, ShoppingBag, Globe, Wind, Sun, Moon } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { LocaleType } from "@/config/translations";
import { useQuoteCart } from "@/context/QuoteCartContext";
import { useTheme } from "@/context/ThemeContext";
import { layout } from "@/config/layout";
import { getPhoneTelHref } from "@/config/siteData";
import { cn } from "@/utils/cn";

export default function Header({ locale }: { locale: LocaleType }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { t } = useTranslation(locale);
  const pathname = usePathname();
  const router = useRouter();
  const { cartItems, setIsOpen: setCartOpen } = useQuoteCart();
  const { theme, toggleTheme } = useTheme();

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLanguage = () => {
    const segments = pathname.split("/");
    const newLocale = locale === "en" ? "ar" : "en";
    segments[1] = newLocale;
    router.push(segments.join("/"));
  };

  const navLinks = [
    { name: t("navHome"),     href: `/${locale}` },
    { name: t("navAbout"),    href: `/${locale}/about` },
    { name: t("navServices"), href: `/${locale}/services` },
    { name: t("navProducts"), href: `/${locale}/products` },
    { name: t("navProjects"), href: `/${locale}/projects` },
    { name: t("navOtherServices"), href: `/${locale}/other-services` },
    { name: t("navContact"),  href: `/${locale}/contact` },
  ];

  const iconBtnCls =
    "site-header-icon-btn p-2 rounded-full border cursor-pointer hover:text-brand-cyan hover:border-brand-cyan/30";

  return (
    <header
      className={cn(
        "site-header fixed top-0 inset-x-0 z-40",
        isScrolled ? "shadow-lg py-3 backdrop-blur-md" : "py-5"
      )}
    >
      <div className={layout.container}>
        <div className="flex items-center justify-between">

          {/* ── Logo ─────────────────────────────────────── */}
          <Link href={`/${locale}`} className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-lg bg-brand-cyan/15 flex items-center justify-center border border-brand-cyan/20 group-hover:border-brand-cyan/50">
              <Wind className="w-6 h-6 text-brand-cyan" />
            </div>
            <div className="flex flex-col">
              <span className="site-header-logo-text font-outfit font-black text-xl tracking-tight leading-none">
                AIR<span className="text-brand-cyan">POINT</span>
              </span>
              <span className="site-header-logo-sub font-inter text-[9px] uppercase tracking-widest text-brand-gold mt-1">
                FZ-LLC • UAE
              </span>
            </div>
          </Link>

          {/* ── Desktop Nav ───────────────────────────────── */}
          <nav className="hidden xl:flex items-center gap-x-6 2xl:gap-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "font-inter text-sm font-medium hover:text-brand-cyan whitespace-nowrap",
                    isActive ? "text-brand-cyan font-semibold" : "site-header-link"
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* ── Desktop Action Row ────────────────────────── */}
          <div className="hidden xl:flex items-center gap-x-2.5 2xl:gap-x-3">

            <a href={getPhoneTelHref()} className={iconBtnCls} title={t("callUs")}>
              <Phone className="w-4 h-4" />
            </a>

            <button onClick={toggleTheme} className={iconBtnCls} title="Toggle theme">
              {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>

            <button
              onClick={toggleLanguage}
              className={cn(iconBtnCls, "flex items-center gap-1.5 px-3! py-1.5! rounded-full! text-xs font-semibold")}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{locale === "en" ? "العربية" : "English"}</span>
            </button>

            <button onClick={() => setCartOpen(true)} className={cn("relative", iconBtnCls, "p-2.5")}>
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-brand-cyan text-white text-[9px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <Link
              href={`/${locale}/contact`}
              className="px-5 py-2.5 rounded-lg bg-brand-cyan hover:bg-brand-cyan/90 text-black font-outfit font-bold text-sm"
            >
              {t("requestQuote")}
            </Link>
          </div>

          {/* ── Mobile Action Row ─────────────────────────── */}
          <div className="site-header-mobile-actions flex items-center gap-x-2 xl:hidden">
            <button onClick={toggleTheme} className={cn(iconBtnCls, "p-2")}>
              {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
            <button onClick={toggleLanguage} className={cn(iconBtnCls, "p-2")}>
              <Globe className="w-4 h-4" />
            </button>
            <button onClick={() => setCartOpen(true)} className={cn("relative", iconBtnCls, "p-2")}>
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-brand-cyan text-white text-[9px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="site-header-mobile-toggle p-2 rounded-md hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Menu Drawer ────────────────────────────── */}
      {mobileMenuOpen && (
        <div className="site-header-mobile-menu xl:hidden absolute top-full inset-x-0 backdrop-blur-lg py-5 px-4 shadow-xl">
          <nav className="flex flex-col gap-y-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "text-base font-medium py-2 border-b",
                    isActive ? "text-brand-cyan pl-2" : "site-header-mobile-link"
                  )}
                >
                  {link.name}
                </Link>
              );
            })}

            <div className="flex items-center justify-between pt-4 gap-x-4">
              <a
                href={getPhoneTelHref()}
                className="site-header-mobile-call flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold"
              >
                <Phone className="w-4 h-4" />
                <span>{t("callUs")}</span>
              </a>
              <Link
                href={`/${locale}/contact`}
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-brand-cyan text-white text-sm font-bold"
              >
                <span>{t("requestQuote")}</span>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
