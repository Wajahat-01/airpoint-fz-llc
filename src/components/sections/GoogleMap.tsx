"use client";

import React from "react";
import { Compass } from "lucide-react";
import { LocaleType } from "@/config/translations";
import { useTranslation } from "@/hooks/useTranslation";
import { companyInfo } from "@/config/siteData";

export default function GoogleMap({ locale }: { locale: LocaleType }) {
  const { t, resolve } = useTranslation(locale);

  const mapEmbedUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14371.492576974794!2d56.038166667180435!3d25.939221163459954!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3efeb9d618ea4573%3A0xe54e38c7f766e4a8!2sCompass%20Building!5e0!3m2!1sen!2sae!4v1709400000000!5m2!1sen!2sae";

  const openMaps = () => {
    window.open(companyInfo.mapsUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="relative rounded-2xl overflow-hidden border border-white/5 bg-brand-card shadow-lg">
      <button
        type="button"
        onClick={openMaps}
        className="map-embed group relative block w-full h-[350px] cursor-pointer"
        aria-label={locale === "ar" ? "فتح الموقع في خرائط جوجل" : "Open location in Google Maps"}
      >
        <div className="absolute inset-0 bg-brand-dark/20 pointer-events-none z-10 group-hover:bg-brand-dark/10 transition-colors" />

        <div className="h-full w-full filter grayscale invert opacity-80 contrast-125 pointer-events-none">
          <iframe
            src={mapEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="AirPoint Office Location Map"
            className="pointer-events-none"
          />
        </div>

        <div className="absolute inset-0 z-[15] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-brand-dark/20">
          <span className="px-4 py-2 rounded-lg bg-brand-cyan text-brand-dark text-xs font-bold uppercase tracking-wider">
            {locale === "ar" ? "فتح في خرائط جوجل" : "Open in Google Maps"}
          </span>
        </div>
      </button>

      <div className="map-info-card absolute bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-sm z-20 p-4 rounded-xl bg-brand-dark/95 border border-white/10 shadow-2xl backdrop-blur-md">
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-lg bg-brand-cyan/15 flex items-center justify-center border border-brand-cyan/20 shrink-0">
            <Compass className="w-5 h-5 text-brand-cyan" />
          </div>
          <div className="text-xs">
            <h4 className="font-outfit font-bold text-white mb-1">
              {t("companyNameLabel")}
            </h4>
            <p className="text-slate-400 leading-relaxed mb-2.5">
              {resolve(companyInfo.registeredAddress)}
            </p>
            <a
              href={companyInfo.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] uppercase font-bold text-brand-cyan hover:underline"
            >
              {locale === "ar" ? "فتح في خرائط جوجل" : "Open in Google Maps"}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
