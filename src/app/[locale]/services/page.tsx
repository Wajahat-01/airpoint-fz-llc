import React from "react";
import {
  Wind,
  Snowflake,
  Wrench,
  CheckCircle,
  Building2,
  Settings,
  Clock,
  Paintbrush,
} from "lucide-react";
import { locales, LocaleType } from "@/config/translations";
import { translations } from "@/config/translations";
import { serviceCategories, getWhatsAppHref } from "@/config/siteData";
import { layout } from "@/config/layout";
import { serviceImages } from "@/config/assets";
import { PageSection } from "@/components/motion/PageSection";
import WhatsAppIcon from "@/components/layout/WhatsAppIcon";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function ServicesPage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as LocaleType;
  const isRtl = locale === "ar";
  const t = translations[locale] || translations.en;

  const resolve = (obj: { en: string; ar: string } | undefined) => {
    if (!obj) return "";
    return obj[locale] || obj.en;
  };

  const getIcon = (name: string, className: string) => {
    switch (name) {
      case "Wind":
        return <Wind className={className} />;
      case "Snowflake":
        return <Snowflake className={className} />;
      case "Wrench":
        return <Wrench className={className} />;
      case "Paintbrush":
        return <Paintbrush className={className} />;
      default:
        return <Building2 className={className} />;
    }
  };

  return (
    <div className={`${layout.container} py-8 sm:py-12 ${layout.pageStackTight}`}>
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-xs text-brand-cyan font-semibold uppercase tracking-wider">
          {isRtl ? "حلول هندسية متكاملة" : "MEP & Cooling Services"}
        </div>
        <h1 className="font-outfit font-black text-3xl sm:text-5xl text-white tracking-tight leading-tight">
          {t.servicesOverview}
        </h1>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
          {isRtl
            ? "نحن نوفر خدمات توريد وتركيب وصيانة متخصصة لكافة المنشآت التجارية والصناعية والسكنية بدولة الإمارات العربية المتحدة."
            : "AirPoint delivers professional Mechanical, Electrical, Plumbing (MEP), and industrial refrigeration maintenance across the UAE."}
        </p>
      </section>

      <div className={layout.pageStackLoose}>
        {serviceCategories.map((category) => (
          <PageSection
            key={category.slug}
            id={category.slug}
            className="scroll-mt-24 space-y-8"
          >
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-brand-blue/20 to-brand-cyan/5 border border-white/5 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-brand-cyan/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex gap-4 items-center relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-brand-cyan/15 flex items-center justify-center border border-brand-cyan/25 text-brand-cyan shrink-0 shadow-lg">
                  {getIcon(category.iconName, "w-7 h-7")}
                </div>
                <div>
                  <h2 className="font-outfit font-black text-2xl text-white">
                    {resolve(category.title)}
                  </h2>
                  <p className="text-xs text-slate-400 mt-1 max-w-xl leading-relaxed">
                    {resolve(category.description)}
                  </p>
                </div>
              </div>

              <span className="relative z-10 text-[10px] uppercase tracking-widest font-bold text-brand-gold bg-brand-gold/10 border border-brand-gold/20 px-3 py-1.5 rounded-full shrink-0">
                {category.items.length} {isRtl ? "خدمات" : "Services"}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {category.items.map((item) => {
                const waText =
                  locale === "ar"
                    ? `مرحباً إير بوينت، أرغب في الاستفسار عن الخدمة التالية:\n- ${resolve(item.title)}`
                    : `Hi AirPoint, I would like to get a service inquiry/proposal for:\n- ${resolve(item.title)}`;
                const waUrl = getWhatsAppHref(waText);
                const imageUrl = serviceImages[item.id];

                return (
                  <article
                    key={item.id}
                    className="glass-panel rounded-2xl border-white/5 overflow-hidden flex flex-col hover:border-brand-cyan/25 hover:shadow-lg hover:shadow-brand-cyan/5 transition-all duration-300 group"
                  >
                    {imageUrl && (
                      <div className="relative h-44 sm:h-48 overflow-hidden">
                        <img
                          src={imageUrl}
                          alt={resolve(item.title)}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/70 via-brand-dark/10 to-transparent" />
                        <div className="absolute bottom-3 left-4 right-4">
                          <h3 className="font-outfit font-bold text-base sm:text-lg text-white leading-snug drop-shadow-md">
                            {resolve(item.title)}
                          </h3>
                        </div>
                      </div>
                    )}

                    <div className="p-5 sm:p-6 flex flex-col flex-1 gap-5">
                      {!imageUrl && (
                        <h3 className="font-outfit font-bold text-lg text-white pb-3 border-b border-white/5">
                          {resolve(item.title)}
                        </h3>
                      )}

                      <p className="text-sm text-slate-400 leading-relaxed">
                        {resolve(item.description)}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs flex-1">
                        <div className="rounded-xl bg-white/5 border border-white/5 p-3.5">
                          <span className="font-semibold text-brand-gold uppercase tracking-wider block mb-2.5 text-[10px]">
                            {t.featuresLabel}
                          </span>
                          <ul className="space-y-2 text-slate-300">
                            {item.features.map((feature, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <CheckCircle className="w-3.5 h-3.5 text-brand-cyan shrink-0 mt-0.5" />
                                <span className="leading-snug">{resolve(feature)}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="rounded-xl bg-white/5 border border-white/5 p-3.5">
                          <span className="font-semibold text-brand-cyan uppercase tracking-wider block mb-2.5 text-[10px]">
                            {t.applicationsLabel}
                          </span>
                          <ul className="space-y-2 text-slate-400">
                            {item.applications.map((app, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <Settings className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                                <span className="leading-snug">{resolve(app)}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
                        <span className="text-[10px] text-slate-500 uppercase tracking-wide flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-brand-gold" />
                          {isRtl ? "نرد خلال أقل من 5 دقائق" : "Emergency SLA < 2 Hrs"}
                        </span>
                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-brand-green hover:bg-brand-green/90 text-white font-outfit font-bold text-xs flex items-center justify-center gap-2 transition-all wa-pulse-button"
                        >
                          <WhatsAppIcon className="w-4 h-4" />
                          <span>{t.whatsappChat}</span>
                        </a>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </PageSection>
        ))}
      </div>
    </div>
  );
}
