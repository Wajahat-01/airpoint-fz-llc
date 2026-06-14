import React from "react";
import { ImageIcon, PlayCircle } from "lucide-react";
import { locales, LocaleType, translations } from "@/config/translations";
import { layout } from "@/config/layout";
import {
  otherServicesImages,
  otherServicesVideos,
} from "@/config/otherServicesMedia";
import { PageSection } from "@/components/motion/PageSection";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function OtherServicesPage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as LocaleType;
  const isRtl = locale === "ar";
  const t = translations[locale] || translations.en;

  const resolve = (obj: { en: string; ar: string }) => obj[locale] || obj.en;

  return (
    <div className={`${layout.container} py-8 sm:py-12 ${layout.pageStack}`}>
      <PageSection className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-xs text-brand-cyan font-semibold uppercase tracking-wider">
          {isRtl ? "أعمال ميدانية ومعرض الوسائط" : "Field Work & Media Gallery"}
        </div>
        <h1 className="font-outfit font-black text-3xl sm:text-5xl text-white tracking-tight leading-tight">
          {t.otherServicesTitle}
        </h1>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
          {t.otherServicesSubtitle}
        </p>
      </PageSection>

      {otherServicesVideos.length > 0 && (
        <PageSection className="space-y-8" delay={0.05}>
          <div className="flex items-center gap-2">
            <PlayCircle className="w-5 h-5 text-brand-cyan shrink-0" />
            <h2 className="font-outfit font-bold text-xl sm:text-2xl text-white">
              {t.otherServicesVideos}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {otherServicesVideos.map((item) => (
              <article
                key={item.id}
                className="glass-panel rounded-2xl border-white/5 overflow-hidden flex flex-col"
              >
                <div className="relative aspect-video bg-brand-dark/50">
                  <video
                    src={item.src}
                    controls
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover bg-black"
                  >
                    {isRtl ? "متصفحك لا يدعم تشغيل الفيديو." : "Your browser does not support video playback."}
                  </video>
                </div>
                <div className="p-5 sm:p-6 space-y-2">
                  <h3 className="font-outfit font-bold text-base sm:text-lg text-white">
                    {resolve(item.title)}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {resolve(item.description)}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </PageSection>
      )}

      <PageSection className="space-y-8" delay={0.1}>
        <div className="flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-brand-cyan shrink-0" />
          <h2 className="font-outfit font-bold text-xl sm:text-2xl text-white">
            {t.otherServicesGallery}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {otherServicesImages.map((item) => (
            <article
              key={item.id}
              className="glass-panel rounded-2xl border-white/5 overflow-hidden flex flex-col hover:border-brand-cyan/20 transition-colors"
            >
              <div className="relative aspect-[4/3] bg-brand-blue/10 overflow-hidden">
                <img
                  src={item.src}
                  alt={resolve(item.title)}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 sm:p-5 space-y-2 flex-1">
                <h3 className="font-outfit font-bold text-sm sm:text-base text-white leading-snug">
                  {resolve(item.title)}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {resolve(item.description)}
                </p>
              </div>
            </article>
          ))}
        </div>
      </PageSection>
    </div>
  );
}
