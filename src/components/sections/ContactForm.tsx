"use client";

import React, { useState } from "react";
import { Mail, Send, CheckCircle2 } from "lucide-react";
import { LocaleType } from "@/config/translations";
import { useTranslation } from "@/hooks/useTranslation";
import { useTheme } from "@/context/ThemeContext";
import { companyInfo, getWhatsAppHref } from "@/config/siteData";
import WhatsAppIcon from "@/components/layout/WhatsAppIcon";
import { cn } from "@/utils/cn";

export default function ContactForm({ locale }: { locale: LocaleType }) {
  const { t } = useTranslation(locale);
  const { theme } = useTheme();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    serviceType: "hvac-maintenance",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const getServiceLabel = (val: string) => {
    const maps: Record<string, { en: string; ar: string }> = {
      "hvac-installation":    { en: "HVAC Installation & Supply",       ar: "توريد وتركيب التكييف" },
      "hvac-maintenance":     { en: "AC Repair & Maintenance",          ar: "إصلاح وصيانة التكييف" },
      "amc-contracts":        { en: "Annual Maintenance Contract (AMC)", ar: "عقد صيانة سنوي AMC" },
      "cold-room":            { en: "Cold Room & Storage Setup",        ar: "تركيب غرف ومستودعات التبريد" },
      "refrigeration-repair": { en: "Refrigeration Repair",             ar: "صيانة أنظمة التبريد" },
      "building-mep":         { en: "Building Maintenance & MEP",       ar: "صيانة المباني والأعمال الكهروميكانيكية" },
      "spare-parts":          { en: "Spare Parts Inquiry",              ar: "استفسار عن قطع الغيار" },
    };
    const resolved = maps[val] || { en: val, ar: val };
    return locale === "ar" ? resolved.ar : resolved.en;
  };

  const generateMessagePayload = () =>
    locale === "ar"
      ? `طلب استفسار جديد - إير بوينت\n\nالاسم: ${formData.name}\nالهاتف: ${formData.phone}\nالبريد الإلكتروني: ${formData.email}\nالقسم المطلوب: ${getServiceLabel(formData.serviceType)}\n\nتفاصيل الطلب:\n${formData.message}`
      : `New Service Inquiry - AirPoint\n\nName: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nInquiry Category: ${getServiceLabel(formData.serviceType)}\n\nMessage Details:\n${formData.message}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setSubmitted(true);
  };

  const handleWhatsAppForward = () => {
    const url = getWhatsAppHref(generateMessagePayload());
    window.open(url, "_blank");
  };

  const handleEmailForward = () => {
    const subject = locale === "ar" ? "طلب خدمة - إير بوينت" : "Service Inquiry - AirPoint";
    window.location.href = `mailto:${companyInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(generateMessagePayload())}`;
  };

  // Adaptive field styles
  const fieldCls = cn(
    "w-full px-4 py-3 rounded-xl border text-sm focus:outline-none",
    theme === "light"
      ? "bg-slate-50 border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-brand-cyan"
      : "bg-brand-dark/50 border-white/10 text-white placeholder:text-slate-500 focus:border-brand-cyan/50"
  );

  const labelCls = cn(
    "block text-xs font-semibold mb-1.5",
    theme === "light" ? "text-slate-600" : "text-slate-300"
  );

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-cyan/5 rounded-full blur-3xl pointer-events-none" />

      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-5">
          <h3 className={cn("font-outfit font-bold text-xl", theme === "light" ? "text-slate-800" : "text-white")}>
            {t("formTitle")}
          </h3>
          <p className={cn("text-xs", theme === "light" ? "text-slate-500" : "text-slate-400")}>
            {t("formSubtitle")}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>{t("fieldName")} *</label>
              <input type="text" name="name" required value={formData.name} onChange={handleInputChange}
                className={fieldCls} placeholder={locale === "ar" ? "الاسم أو الشركة" : "Name or Company"} />
            </div>
            <div>
              <label className={labelCls}>{t("fieldPhone")} *</label>
              <input type="tel" name="phone" required value={formData.phone} onChange={handleInputChange}
                className={fieldCls} placeholder="+971 50 123 4567" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>{t("fieldEmail")}</label>
              <input type="email" name="email" value={formData.email} onChange={handleInputChange}
                className={fieldCls} placeholder="name@company.com" />
            </div>
            <div>
              <label className={labelCls}>{t("fieldServiceType")}</label>
              <select name="serviceType" value={formData.serviceType} onChange={handleInputChange}
                className={cn(fieldCls, "appearance-none cursor-pointer")}>
                {["hvac-installation","hvac-maintenance","amc-contracts","cold-room","refrigeration-repair","building-mep","spare-parts"].map((v) => (
                  <option key={v} value={v}>{getServiceLabel(v)}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className={labelCls}>{t("fieldMessage")}</label>
            <textarea name="message" rows={4} value={formData.message} onChange={handleInputChange}
              className={cn(fieldCls, "resize-none")}
              placeholder={locale === "ar" ? "يرجى كتابة تفاصيل العمل..." : "Describe your HVAC, refrigeration or contract requirements..."} />
          </div>

          <button type="submit" className="w-full py-3.5 rounded-xl bg-brand-cyan hover:bg-brand-cyan/90 text-black font-outfit font-bold text-sm flex items-center justify-center gap-2 cursor-pointer">
            <Send className="w-4 h-4" />
            <span>{t("formSubmit")}</span>
          </button>
        </form>
      ) : (
        <div className="py-8 flex flex-col items-center justify-center text-center space-y-5">
          <div className="w-16 h-16 rounded-full bg-brand-cyan/10 flex items-center justify-center border border-brand-cyan/20">
            <CheckCircle2 className="w-9 h-9 text-brand-cyan" />
          </div>

          <div className="space-y-2">
            <h4 className={cn("font-outfit font-bold text-lg", theme === "light" ? "text-slate-800" : "text-white")}>
              {locale === "ar" ? "تم إعداد الطلب بنجاح!" : "Inquiry Prepared Successfully!"}
            </h4>
            <p className={cn("text-xs max-w-sm leading-relaxed mx-auto", theme === "light" ? "text-slate-500" : "text-slate-400")}>
              {t("formSuccess")}
            </p>
          </div>

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 max-w-sm mx-auto">
            <button onClick={handleWhatsAppForward}
              className={cn(
                "py-3 rounded-xl bg-[#25D366] hover:bg-[#20bf5a] font-outfit font-bold text-xs flex items-center justify-center gap-2 wa-pulse-button cursor-pointer",
                theme === "dark" ? "text-black" : "text-white"
              )}>
              <WhatsAppIcon className="w-4 h-4" />
              <span>{t("submitWhatsApp")}</span>
            </button>
            <button onClick={handleEmailForward}
              className={cn(
                "py-3 rounded-xl bg-brand-cyan hover:bg-brand-cyan/90 font-outfit font-bold text-xs flex items-center justify-center gap-2 cursor-pointer",
                theme === "dark" ? "text-black" : "text-white"
              )}>
              <Mail className="w-4 h-4" />
              <span>{t("submitEmail")}</span>
            </button>
          </div>

          <button onClick={() => setSubmitted(false)}
            className={cn("text-xs hover:text-brand-cyan pt-2", theme === "light" ? "text-slate-500" : "text-slate-500")}>
            {locale === "ar" ? "العودة للنموذج" : "Back to Form"}
          </button>
        </div>
      )}
    </div>
  );
}
