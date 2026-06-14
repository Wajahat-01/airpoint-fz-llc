import React from "react";
import { Mail, Phone, MapPin, Clock, ShieldCheck } from "lucide-react";
import { locales, LocaleType } from "@/config/translations";
import { translations } from "@/config/translations";
import { companyInfo, getPhoneTelHref } from "@/config/siteData";
import { layout } from "@/config/layout";
import ContactForm from "@/components/sections/ContactForm";
import GoogleMap from "@/components/sections/GoogleMap";
import { PageSection } from "@/components/motion/PageSection";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function ContactPage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as LocaleType;
  const isRtl = locale === "ar";
  const t = translations[locale] || translations.en;

  const resolve = (obj: { en: string; ar: string } | undefined) => {
    if (!obj) return "";
    return obj[locale] || obj.en;
  };

  return (
    <div className={`${layout.container} py-8 sm:py-12 ${layout.pageStack}`}>
      
      {/* Header */}
      <PageSection className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-xs text-brand-cyan font-semibold uppercase tracking-wider">
          {isRtl ? "تواصل مباشر" : "Direct Channels"}
        </div>
        <h1 className="font-outfit font-black text-3xl sm:text-5xl text-white tracking-tight leading-tight">
          {t.contactUs}
        </h1>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
          {isRtl
            ? "يسعدنا تواصلك معنا. يمكنك إرسال استفسارك الفني أو طلب تسعير قطع الغيار والخدمات عبر النموذج أدناه، أو التحدث معنا مباشرة عبر الواتساب."
            : "Get in touch for instant B2B cooling proposals, Annual Maintenance Contracts, and bulk spare parts pricing."}
        </p>
      </PageSection>

      <PageSection className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" delay={0.05}>
        
        {/* Info Column (Left) */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Quick Channels Cards */}
          <div className="space-y-4">
            <h3 className="font-outfit font-bold text-lg text-white">
              {isRtl ? "قنوات الاتصال المباشرة" : "Direct Hotlines"}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href={getPhoneTelHref()}
                className="p-4 rounded-xl bg-brand-card hover:bg-brand-blue/20 border border-white/5 hover:border-brand-cyan/30 transition-all flex gap-3 text-xs"
              >
                <Phone className="w-5 h-5 text-brand-cyan shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-500 block mb-0.5">{t.phoneLabel}</span>
                  <span className="font-semibold text-white text-sm">{companyInfo.phone}</span>
                </div>
              </a>

              <a
                href={`mailto:${companyInfo.email}`}
                className="p-4 rounded-xl bg-brand-card hover:bg-brand-blue/20 border border-white/5 hover:border-brand-cyan/30 transition-all flex gap-3 text-xs"
              >
                <Mail className="w-5 h-5 text-brand-cyan shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-500 block mb-0.5">{t.emailLabel}</span>
                  <span className="font-semibold text-white text-sm">{companyInfo.email}</span>
                </div>
              </a>
            </div>
          </div>

          {/* Compliance Card */}
          <div className="p-6 rounded-2xl bg-brand-blue/10 border border-white/5 space-y-4 text-xs">
            <h4 className="font-outfit font-bold text-sm text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-brand-gold" />
              <span>{t.companyLicenseInfo}</span>
            </h4>
            
            <div className="space-y-3 text-slate-300">
              <div className="border-b border-white/5 pb-2">
                <span className="text-slate-500 block mb-0.5">{t.licenseAuthority}</span>
                <span className="font-semibold">{resolve(companyInfo.authority)}</span>
              </div>
              <div className="border-b border-white/5 pb-2">
                <span className="text-slate-500 block mb-0.5">{isRtl ? "رقم الرخصة والنوع" : "License Number & Type"}</span>
                <span className="font-semibold">{companyInfo.licenseNumber} • {resolve(companyInfo.licenseType)}</span>
              </div>
              <div className="border-b border-white/5 pb-2">
                <span className="text-slate-500 block mb-0.5">{t.businessActivity}</span>
                <span className="font-semibold leading-relaxed block">{resolve(companyInfo.activity)}</span>
              </div>
              <div>
                <span className="text-slate-500 block mb-0.5">{t.officeHours}</span>
                <span className="font-semibold flex items-center gap-1">
                  <Clock className="w-4 h-4 text-brand-gold" />
                  <span>{resolve(companyInfo.officeHours)}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Location details */}
          <div className="space-y-4">
            <h4 className="font-outfit font-bold text-base text-white">
              {isRtl ? "المقر المسجل" : "Registered Office"}
            </h4>
            <a
              href={companyInfo.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl bg-brand-card border border-white/5 flex gap-3 text-xs leading-relaxed hover:border-brand-cyan/30 transition-colors"
            >
              <MapPin className="w-5 h-5 text-brand-cyan shrink-0 mt-0.5" />
              <span>{resolve(companyInfo.registeredAddress)}</span>
            </a>
          </div>

        </div>

        {/* Form Column (Right) */}
        <div className="lg:col-span-7">
          <ContactForm locale={locale} />
        </div>

      </PageSection>

      <PageSection className="border-t border-white/5 pt-12" delay={0.1}>
        <GoogleMap locale={locale} />
      </PageSection>

    </div>
  );
}
