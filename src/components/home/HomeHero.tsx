"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Clock, PhoneCall } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { AnimateOnMount } from "@/components/motion/AnimateOnMount";
import { AnimateStagger, AnimateItem } from "@/components/motion/AnimateStagger";
import { heroSlides, HERO_SLIDE_INTERVAL_MS, type HeroSlide } from "@/config/heroSlides";
import { layout } from "@/config/layout";
import { getPhoneTelHref } from "@/config/siteData";
import { useTranslation } from "@/hooks/useTranslation";
import { LocaleType } from "@/config/translations";
import { MOTION_EASE } from "@/config/motion";
import { cn } from "@/utils/cn";

function HeroCarouselImages({
  slides,
  activeIndex,
}: {
  slides: HeroSlide[];
  activeIndex: number;
}) {
  return (
    <>
      {slides.map((slide, index) => (
        <img
          key={slide.id}
          src={slide.imageUrl}
          alt=""
          aria-hidden
          decoding="async"
          fetchPriority={index === 0 ? "high" : "low"}
          className={cn(
            "hero-carousel-slide",
            index === activeIndex && "hero-carousel-slide-active"
          )}
        />
      ))}
    </>
  );
}

interface HomeHeroProps {
  locale: LocaleType;
  requestQuoteLabel: string;
  browseProductsLabel: string;
  exploreServiceLabel: string;
  trustLabel: string;
  industries: string[];
  responseTitle: string;
  responseSubtitle: string;
  dispatchLabel: string;
  phone: string;
  activeTeamsLabel: string;
}

export default function HomeHero({
  locale,
  requestQuoteLabel,
  browseProductsLabel,
  exploreServiceLabel,
  trustLabel,
  industries,
  responseTitle,
  responseSubtitle,
  dispatchLabel,
  phone,
  activeTeamsLabel,
}: HomeHeroProps) {
  const { resolve } = useTranslation(locale);
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = heroSlides;
  const slideCount = slides.length;
  const activeSlide = slides[activeIndex] ?? slides[0];

  const goToSlide = useCallback(
    (index: number) => {
      if (slideCount === 0) return;
      setActiveIndex(((index % slideCount) + slideCount) % slideCount);
    },
    [slideCount]
  );

  const goNext = useCallback(() => {
    goToSlide(activeIndex + 1);
  }, [activeIndex, goToSlide]);

  useEffect(() => {
    if (reduceMotion || slideCount <= 1) return;

    const timer = window.setInterval(goNext, HERO_SLIDE_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [goNext, reduceMotion, slideCount]);

  useEffect(() => {
    if (slideCount <= 1) return;

    const nextIndex = (activeIndex + 1) % slideCount;
    const img = new window.Image();
    img.src = slides[nextIndex].imageUrl;
  }, [activeIndex, slideCount, slides]);

  const secondaryCta =
    activeSlide?.type === "service"
      ? {
          href: `/${locale}${activeSlide.linkPath}`,
          label: exploreServiceLabel,
        }
      : {
          href: `/${locale}/products`,
          label: browseProductsLabel,
        };

  const textMotion = reduceMotion
    ? { initial: false, animate: { opacity: 1, y: 0 }, exit: { opacity: 1, y: 0 } }
    : {
        initial: { opacity: 0, y: 14 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -10 },
        transition: { duration: 0.45, ease: MOTION_EASE },
      };

  return (
    <section className="home-hero relative flex flex-col lg:block min-h-0 lg:min-h-[86vh] overflow-hidden isolate">
      {/* Mobile: dedicated full-width image band (images visible above text) */}
      <div className="hero-mobile-carousel lg:hidden relative w-full shrink-0" aria-hidden>
        <HeroCarouselImages slides={slides} activeIndex={activeIndex} />
        <div className="hero-mobile-carousel-scrim pointer-events-none" />
      </div>

      {/* Desktop: layered background + right-side carousel */}
      <div className="hero-desktop-backdrop hidden lg:block absolute inset-0" aria-hidden>
        <div
          className="hero-bg-pattern absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/hero-hvac-visual.svg')" }}
        />
        <div className="hero-carousel-layer hero-carousel-layer--desktop absolute z-[1]">
          <HeroCarouselImages slides={slides} activeIndex={activeIndex} />
        </div>
        <div className="hero-left-shade absolute inset-y-0 left-0 z-[2] pointer-events-none" />
        <div className="hero-grid-pattern absolute inset-0 z-[2] opacity-50 pointer-events-none" />
        <div className="hero-glow-orb absolute left-[6%] top-[18%] w-72 h-72 rounded-full bg-brand-cyan/20 blur-[110px] z-[2] pointer-events-none" />
        <div className="hero-glow-orb absolute left-[4%] bottom-[12%] w-56 h-56 rounded-full bg-brand-cyan/10 blur-[90px] z-[2] pointer-events-none [animation-delay:2s]" />
      </div>

      <div className={`relative z-10 ${layout.container} pt-4 pb-12 sm:pb-16 lg:pt-6 lg:pb-20`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center min-h-[68vh] lg:min-h-[72vh]">
          <AnimateStagger
            onMount
            preset="containerFast"
            className="hero-content-wrap lg:col-span-6 xl:col-span-7 space-y-7 text-center lg:text-left rtl:lg:text-right z-10 lg:bg-transparent lg:border-0 lg:p-0 lg:shadow-none"
          >
            <AnimateItem>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeSlide?.id}-kicker`}
                  {...textMotion}
                  className="hero-kicker inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold uppercase tracking-wider max-w-full"
                >
                  <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse shrink-0" />
                  <span className="truncate">{resolve(activeSlide?.kicker)}</span>
                </motion.div>
              </AnimatePresence>
            </AnimateItem>

            <AnimateItem>
              <AnimatePresence mode="wait">
                <motion.h1
                  key={`${activeSlide?.id}-title`}
                  {...textMotion}
                  className="hero-title text-3xl sm:text-5xl xl:text-[3.4rem] font-outfit font-black leading-[1.08] tracking-tight max-w-3xl mx-auto lg:mx-0 text-balance"
                >
                  {resolve(activeSlide?.title)}
                </motion.h1>
              </AnimatePresence>
            </AnimateItem>

            <AnimateItem>
              <AnimatePresence mode="wait">
                <motion.p
                  key={`${activeSlide?.id}-subtitle`}
                  {...textMotion}
                  className="hero-subtitle text-sm sm:text-base max-w-2xl leading-relaxed mx-auto lg:mx-0 text-balance"
                >
                  {resolve(activeSlide?.subtitle)}
                </motion.p>
              </AnimatePresence>
            </AnimateItem>

            <AnimateItem>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-1">
                <Link href="#contact" className="btn-primary w-full sm:w-auto">
                  {requestQuoteLabel}
                </Link>
                <Link href={secondaryCta.href} className="btn-secondary w-full sm:w-auto">
                  {secondaryCta.label}
                </Link>
              </div>
            </AnimateItem>

            <AnimateItem>
              <div className="pt-5 border-t border-white/20 max-w-xl mx-auto lg:mx-0">
                <p className="hero-trust text-xs mb-3">{trustLabel}</p>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
                  {industries.map((industry) => (
                    <span key={industry} className="industry-pill">
                      {industry}
                    </span>
                  ))}
                </div>
              </div>
            </AnimateItem>

            <AnimateItem className="lg:hidden">
              <div className="hero-mobile-stats hero-stats-stack space-y-3 pt-2">
                <div className="hero-status-badge inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold">
                  <span className="w-2 h-2 rounded-full bg-brand-green animate-ping" />
                  <span>{activeTeamsLabel}</span>
                </div>

                <div className="hero-stat-card rounded-2xl px-4 py-3.5 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-brand-cyan flex items-center justify-center shrink-0 shadow-lg shadow-brand-cyan/30">
                    <Clock className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-sm text-left rtl:text-right min-w-0">
                    <p className="font-bold hero-stat-title text-sm">{responseTitle}</p>
                    <p className="hero-stat-subtitle text-xs mt-0.5">{responseSubtitle}</p>
                  </div>
                </div>

                <div className="hero-stat-card rounded-2xl px-4 py-3.5 flex items-center justify-between gap-3">
                  <div className="text-sm text-left rtl:text-right min-w-0">
                    <span className="hero-stat-subtitle text-xs block">{dispatchLabel}</span>
                    <a
                      href={getPhoneTelHref(phone)}
                      className="font-outfit font-black hero-stat-title text-base hover:text-brand-cyan transition-colors"
                    >
                      {phone}
                    </a>
                  </div>
                  <a
                    href={getPhoneTelHref(phone)}
                    className="w-10 h-10 rounded-full bg-brand-cyan flex items-center justify-center shrink-0 shadow-lg shadow-brand-cyan/30"
                    aria-label={dispatchLabel}
                  >
                    <PhoneCall className="w-4 h-4 text-white" />
                  </a>
                </div>
              </div>
            </AnimateItem>
          </AnimateStagger>

          <AnimateOnMount
            variant="fadeRight"
            delay={0.15}
            className="lg:col-span-6 xl:col-span-5 hidden lg:flex items-center justify-end relative z-10"
          >
            <div className="hero-stats-stack w-full max-w-[420px]">
              <div className="hero-status-badge inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold mb-4">
                <span className="w-2 h-2 rounded-full bg-brand-green animate-ping" />
                <span>{activeTeamsLabel}</span>
              </div>

              <div className="space-y-3">
                <div className="hero-float-card hero-stat-card rounded-2xl px-5 py-4 flex items-center gap-4 [animation-delay:0.2s]">
                  <div className="w-10 h-10 rounded-full bg-brand-cyan flex items-center justify-center shrink-0 shadow-lg shadow-brand-cyan/30">
                    <Clock className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-sm">
                    <p className="font-bold hero-stat-title">{responseTitle}</p>
                    <p className="hero-stat-subtitle text-xs mt-0.5">{responseSubtitle}</p>
                  </div>
                </div>

                <div className="hero-float-card hero-stat-card rounded-2xl px-5 py-4 flex items-center justify-between gap-4 [animation-delay:0.5s]">
                  <div className="text-sm">
                    <span className="hero-stat-subtitle text-xs block">{dispatchLabel}</span>
                    <a
                      href={getPhoneTelHref(phone)}
                      className="font-outfit font-black hero-stat-title text-lg hover:text-brand-cyan transition-colors"
                    >
                      {phone}
                    </a>
                  </div>
                  <a
                    href={getPhoneTelHref(phone)}
                    className="w-11 h-11 rounded-full bg-brand-cyan flex items-center justify-center shrink-0 shadow-lg shadow-brand-cyan/30 hover:scale-105 transition-transform"
                    aria-label={dispatchLabel}
                  >
                    <PhoneCall className="w-4 h-4 text-white" />
                  </a>
                </div>
              </div>
            </div>
          </AnimateOnMount>
        </div>
      </div>
    </section>
  );
}
