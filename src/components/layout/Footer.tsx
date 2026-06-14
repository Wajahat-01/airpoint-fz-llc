"use client";

import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Clock, ShieldCheck, Wind } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { LocaleType } from "@/config/translations";
import { layout } from "@/config/layout";
import { companyInfo, getPhoneTelHref } from "@/config/siteData";

export default function Footer({ locale }: { locale: LocaleType }) {
  const { t, resolve } = useTranslation(locale);

  const quickLinks = [
    { name: t("navHome"), href: `/${locale}` },
    { name: t("navAbout"), href: `/${locale}/about` },
    { name: t("navServices"), href: `/${locale}/services` },
    { name: t("navProducts"), href: `/${locale}/products` },
    { name: t("navProjects"), href: `/${locale}/projects` },
    { name: t("navOtherServices"), href: `/${locale}/other-services` },
    { name: t("navContact"), href: `/${locale}/contact` },
  ];

  const servicesLinks = [
    { name: locale === "ar" ? "أنظمة التكييف والتهوية HVAC" : "HVAC & Air Conditioning", href: `/${locale}/services#hvac-services` },
    { name: locale === "ar" ? "التبريد وغرف التجميد" : "Refrigeration & Cold Rooms", href: `/${locale}/services#refrigeration-services` },
    { name: locale === "ar" ? "صيانة المباني والأعمال الكهروميكانيكية" : "Building Maintenance & MEP", href: `/${locale}/services#building-maintenance` },
    { name: locale === "ar" ? "التشطيبات والديكور الداخلي" : "Interior & Fit-Out Works", href: `/${locale}/services#interior-fitout-services` },
  ];

  return (
    <footer className="bg-brand-dark border-t border-white/5 pt-16 pb-8 text-slate-400">
      <div className={layout.container}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Column 1: Company Profile & License */}
          <div className="flex flex-col gap-4">
            <Link href={`/${locale}`} className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-brand-cyan/15 flex items-center justify-center border border-brand-cyan/20">
                <Wind className="w-5 h-5 text-brand-cyan" />
              </div>
              <span className="font-outfit font-black text-lg tracking-tight text-white">
                AIR<span className="text-brand-cyan">POINT</span>
              </span>
            </Link>
            
            <p className="text-sm text-slate-400 leading-relaxed mt-2">
              {t("footerDesc")}
            </p>

            {/* Compliance Badge */}
            <div className="mt-4 p-3 rounded-lg bg-white/5 border border-white/5 flex items-start gap-2.5">
              <ShieldCheck className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className="font-semibold text-white block mb-0.5">{t("companyLicenseInfo")}</span>
                <span className="text-slate-400 text-[10px] leading-tight block">
                  {resolve(companyInfo.licenseType)} • {t("licenseNo")}: {companyInfo.licenseNumber}
                </span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:pl-8">
            <h3 className="font-outfit font-bold text-white text-base mb-6 relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 rtl:after:left-auto rtl:after:right-0 after:w-10 after:h-0.5 after:bg-brand-cyan">
              {t("quickLinks")}
            </h3>
            <ul className="flex flex-col gap-3 text-sm">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-brand-cyan transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Service Divisions */}
          <div>
            <h3 className="font-outfit font-bold text-white text-base mb-6 relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 rtl:after:left-auto rtl:after:right-0 after:w-10 after:h-0.5 after:bg-brand-cyan">
              {t("ourServices")}
            </h3>
            <ul className="flex flex-col gap-3 text-sm">
              {servicesLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-brand-cyan transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact details */}
          <div>
            <h3 className="font-outfit font-bold text-white text-base mb-6 relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 rtl:after:left-auto rtl:after:right-0 after:w-10 after:h-0.5 after:bg-brand-cyan">
              {t("contactDetails")}
            </h3>
            <ul className="flex flex-col gap-4 text-xs">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-brand-cyan shrink-0 mt-0.5" />
                <a href={getPhoneTelHref()} className="hover:text-brand-cyan transition-colors text-sm">
                  {companyInfo.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-brand-cyan shrink-0 mt-0.5" />
                <a href={`mailto:${companyInfo.email}`} className="hover:text-brand-cyan transition-colors text-sm">
                  {companyInfo.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brand-cyan shrink-0 mt-0.5" />
                <a
                  href={companyInfo.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="leading-relaxed hover:text-brand-cyan transition-colors"
                >
                  {resolve(companyInfo.registeredAddress)}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                <span>{resolve(companyInfo.officeHours)}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p>
            &copy; {new Date().getFullYear()} AirPoint AC and Refrigeration. {t("rightsReserved")}
          </p>
          <p className="text-[10px] text-slate-500 text-center md:text-right max-w-md">
            {t("licensingDeclaration")}
          </p>
        </div>
      </div>
    </footer>
  );
}
