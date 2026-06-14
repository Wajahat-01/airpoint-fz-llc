"use client";

import React from "react";
import { LocaleType } from "@/config/translations";
import { useTranslation } from "@/hooks/useTranslation";
import { getWhatsAppHref } from "@/config/siteData";
import WhatsAppIcon from "@/components/layout/WhatsAppIcon";

export default function WhatsAppFAB({ locale }: { locale: LocaleType }) {
  const { t, isRtl } = useTranslation(locale);

  const text =
    locale === "ar"
      ? "مرحباً إير بوينت، أرغب في الاستفسار عن خدمات الصيانة والتبريد الخاصة بكم."
      : "Hi AirPoint, I would like to inquire about your HVAC and refrigeration services.";

  const whatsappUrl = getWhatsAppHref(text);

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("whatsappChat")}
      className={`fixed safe-area-fab z-60 flex items-center gap-2 group ${
        isRtl ? "left-4 sm:left-6" : "right-4 sm:right-6"
      }`}
    >
      {/* Online label chip */}
      <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[hsl(222_40%_9%/0.9)] border border-white/10 text-white text-xs font-semibold shadow-lg backdrop-blur-sm group-hover:border-brand-green/40">
        <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse"></span>
        <span>{t("onlineStatus")}</span>
      </span>

      {/* WhatsApp pulsing button */}
      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20bf5a] border border-white/25 text-white flex items-center justify-center wa-fab wa-pulse-button transition-colors duration-200">
        <WhatsAppIcon className="w-6 h-6 sm:w-7 sm:h-7" />
      </div>
    </a>
  );
}
