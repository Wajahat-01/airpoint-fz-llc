import React from "react";
import { Building2, Calendar, MapPin, User, CheckCircle2, MessageSquare } from "lucide-react";
import { locales, LocaleType } from "@/config/translations";
import { translations } from "@/config/translations";
import { layout } from "@/config/layout";
import { projectsList, getWhatsAppHref } from "@/config/siteData";
import { PageSection } from "@/components/motion/PageSection";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function ProjectsPage({ params }: PageProps) {
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
      
      {/* Page Header */}
      <PageSection className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-xs text-brand-cyan font-semibold uppercase tracking-wider">
          {isRtl ? "سوابق الأعمال والمشاريع" : "Landmark Case Studies"}
        </div>
        <h1 className="font-outfit font-black text-3xl sm:text-5xl text-white tracking-tight leading-tight">
          {t.projectsSectionTitle}
        </h1>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
          {isRtl
            ? "استكشف بعضًا من أعمالنا الناجحة في تركيب وصيانة أنظمة التبريد التجاري وصيانة التكييف المركزي والمرافق في الإمارات."
            : "Explore our track record of successfully completed commercial HVAC systems, cooling warehouses, and facility MEP services."}
        </p>
      </PageSection>

      <div className={layout.pageStack}>
        {projectsList.map((project) => {
          // pre-formatted WhatsApp string for project inquiry
          const waInquiryText = locale === "ar"
            ? `مرحباً إير بوينت، أرغب في الاستفسار عن مشروع مماثل لـ:\n- ${resolve(project.title)}`
            : `Hi AirPoint, I would like to inquire about a project similar to:\n- ${resolve(project.title)}`;
          const waInquiryUrl = getWhatsAppHref(waInquiryText);

          return (
            <PageSection
              key={project.id}
              className="glass-panel p-6 sm:p-8 rounded-2xl border-white/5 flex flex-col lg:flex-row gap-8 items-start hover:border-brand-cyan/25 transition-all relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-cyan/5 rounded-full blur-3xl pointer-events-none"></div>

              {/* Project image */}
              <div className="w-full lg:w-[320px] aspect-[4/3] rounded-xl bg-brand-blue/10 border border-white/5 flex flex-col items-center justify-center shrink-0 p-0 relative overflow-hidden">
                {project.imageUrl ? (
                  <>
                    <img
                      src={project.imageUrl}
                      alt={resolve(project.title)}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/50 to-transparent" />
                  </>
                ) : (
                  <Building2 className="w-16 h-16 text-brand-cyan/25" />
                )}
                <div className="absolute top-4 right-4 px-2 py-0.5 rounded bg-brand-cyan/80 backdrop-blur-sm text-brand-dark text-[9px] uppercase font-bold tracking-widest">
                  {resolve(project.category)}
                </div>
              </div>

              {/* Text / details right side */}
              <div className="flex-1 space-y-6 w-full">
                <div className="space-y-2">
                  <span className="text-xs uppercase font-bold text-brand-cyan tracking-widest">
                    {resolve(project.category)}
                  </span>
                  <h2 className="font-outfit font-black text-2xl text-white">
                    {resolve(project.title)}
                  </h2>
                </div>

                {/* Metadata Row */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 border-y border-white/5 py-4 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-brand-gold shrink-0" />
                    <div>
                      <span className="text-slate-500 block text-[9px] uppercase tracking-wider">{isRtl ? "العميل" : "Client"}</span>
                      <span className="font-semibold">{resolve(project.client)}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-brand-cyan shrink-0" />
                    <div>
                      <span className="text-slate-500 block text-[9px] uppercase tracking-wider">{isRtl ? "الموقع" : "Location"}</span>
                      <span className="font-semibold">{resolve(project.location)}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                    <Calendar className="w-4 h-4 text-brand-cyan shrink-0" />
                    <div>
                      <span className="text-slate-500 block text-[9px] uppercase tracking-wider">{isRtl ? "السنة" : "Year"}</span>
                      <span className="font-semibold font-mono">{project.year}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {resolve(project.description)}
                  </p>

                  {/* Scope of Work */}
                  <div className="space-y-2.5">
                    <span className="text-xs font-bold text-brand-gold uppercase tracking-widest block">
                      {isRtl ? "نطاق العمل المنفذ:" : "Scope of Executed Work:"}
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                      {project.scope.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-brand-cyan shrink-0 mt-0.5" />
                          <span>{resolve(item)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Inquiry Action */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between flex-wrap gap-4">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider">
                    {isRtl ? "تواصل للاستفسار عن سوابق الأعمال" : "Inquire for similar commercial setup"}
                  </span>
                  <a
                    href={waInquiryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-lg bg-brand-green hover:bg-brand-green/90 text-white font-outfit font-bold text-xs flex items-center gap-1.5 transition-all wa-pulse-button"
                  >
                    <MessageSquare className="w-4 h-4 fill-white text-brand-green" />
                    <span>{isRtl ? "استفسار عن المشروع" : "Inquire for Project"}</span>
                  </a>
                </div>

              </div>

            </PageSection>
          );
        })}
      </div>

    </div>
  );
}
