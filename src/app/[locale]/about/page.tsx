import React from "react";
import { ShieldCheck, Compass, CheckCircle, FileText } from "lucide-react";
import QualityAssuranceCard from "@/components/about/QualityAssuranceCard";
import { locales, LocaleType } from "@/config/translations";
import { translations } from "@/config/translations";
import { layout } from "@/config/layout";
import { companyInfo } from "@/config/siteData";
import { PageSection } from "@/components/motion/PageSection";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function AboutPage({ params }: PageProps) {
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
      
      <PageSection className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-xs text-brand-cyan font-semibold uppercase tracking-wider">
          {isRtl ? "تأسيس ونزاهة" : "Corporate Profile"}
        </div>
        <h1 className="font-outfit font-black text-3xl sm:text-5xl text-white tracking-tight leading-tight">
          {isRtl ? "من هي شركة إير بوينت؟" : "About AirPoint"}
        </h1>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
          {isRtl 
            ? "تأسست شركة إير بوينت في دولة الإمارات كشركة منطقة حرة ذات مسؤولية محدودة FZ-LLC، متخصصة في توريد وصيانة التكييف المركزي والمستودعات المبردة وقطع غيار التبريد."
            : "AirPoint is a premier Free Zone Limited Liability Company (FZ-LLC) in the UAE. We deliver specialized HVAC/MEP installations, walk-in cold rooms, and trade genuine cooling spare parts."}
        </p>
      </PageSection>

      <PageSection className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" delay={0.05}>
        <div className="space-y-6">
          <h2 className="font-outfit font-black text-2xl sm:text-3xl text-white tracking-tight">
            {isRtl ? "رؤيتنا ورسالتنا في السوق الإماراتي" : "Our Mission & Industry Commitment"}
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            {isRtl
              ? "نحن نسعى لأن نكون الشريك الهندسي الأكثر موثوقية لمدراء المرافق وأصحاب الشركات في دولة الإمارات. ندرك تماماً أن تعطل أنظمة التبريد في الخليج يترتب عليه خسائر تشغيلية، ولهذا نوظف طواقم هندسية مرخصة ونحتفظ بمخزون ضخم من قطع الغيار الأصلية لتغطية احتياجات الطوارئ على مدار الساعة."
              : "We strive to remain the engineering partner of choice for commercial property managers and logistics operators across the UAE. Understanding that cooling downtime causes massive operational deficits, we maintain certified engineering squads and stocked warehouses to deliver fast response times and original components."}
          </p>

          <div className="space-y-3.5">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-brand-cyan shrink-0 mt-0.5" />
              <p className="text-xs text-slate-300">
                <strong className="text-white block mb-0.5">{isRtl ? "التركيز على الكفاءة" : "Engineering Efficiency"}</strong>
                {isRtl ? "تحسين استهلاك الكهرباء لأنظمة التكييف والتهوية بنسب تصل لـ 30٪" : "Optimizing power draw and cooling loads for commercial plants."}
              </p>
            </div>
            
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-brand-cyan shrink-0 mt-0.5" />
              <p className="text-xs text-slate-300">
                <strong className="text-white block mb-0.5">{isRtl ? "سرعة الاستجابة" : "Absolute Dispatch Speed"}</strong>
                {isRtl ? "عقود الصيانة السنوية تحظى بأولوية قصوى ودعم فني على مدار الساعة" : "Priority breakdown support in under 2 hours for contract partners."}
              </p>
            </div>
          </div>
        </div>

        <QualityAssuranceCard
          title={isRtl ? "الجودة والضمان" : "Quality & Assurance"}
          subtitle={isRtl ? "أعمال مطابقة لمعايير الجودة العالمية" : "Certified OEM Standard Services"}
          projectsLabel={isRtl ? "مشاريع منجزة" : "UAE Projects"}
          partsLabel={isRtl ? "قطع أصلية" : "Genuine Parts"}
          metricsTitle={isRtl ? "مؤشرات الأداء التشغيلي" : "Operational Performance"}
          metrics={[
            {
              label: isRtl ? "جاهزية أنظمة التكييف" : "HVAC System Uptime",
              value: 98,
              color: "hsl(184 100% 50%)",
            },
            {
              label: isRtl ? "الالتزام باتفاقية SLA" : "SLA Response Compliance",
              value: 95,
              color: "hsl(47 65% 53%)",
            },
            {
              label: isRtl ? "قطع غيار أصلية معتمدة" : "Certified OEM Parts",
              value: 100,
              color: "hsl(142 70% 49%)",
            },
            {
              label: isRtl ? "رضا عملاء الشركات" : "Corporate Client Satisfaction",
              value: 92,
              color: "hsl(200 100% 45%)",
            },
          ]}
        />
      </PageSection>

      <PageSection className="bg-brand-blue/15 border border-white/5 rounded-2xl p-6 sm:p-10 relative overflow-hidden" delay={0.1}>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-cyan/5 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center border border-brand-gold/20 text-brand-gold">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="font-outfit font-black text-2xl text-white tracking-tight">
              {t.companyLicenseInfo}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {isRtl
                ? "تلتزم شركة إير بوينت بكافة المعايير التنظيمية المنصوص عليها بدولة الإمارات. الترخيص التجاري مسجل رسمياً لدى جهة الترخيص في رأس الخيمة ويغطي التوريد والخدمات بكافة أنحاء الدولة."
                : "AirPoint operates under a Free Zone Limited Liability Company (FZ-LLC) structure. Our license details ensure complete regulatory transparency and compliance across all local Emirates."}
            </p>
          </div>

          {/* Grid list of license variables */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-brand-dark/40 border border-white/5 flex gap-3">
              <ShieldCheck className="w-5 h-5 text-brand-cyan shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className="text-slate-500 block mb-0.5">{isRtl ? "الاسم التجاري المسجل" : "Registered Entity Name"}</span>
                <span className="font-semibold text-white leading-relaxed">{resolve(companyInfo.name)}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-brand-dark/40 border border-white/5 flex gap-3">
              <Compass className="w-5 h-5 text-brand-cyan shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className="text-slate-500 block mb-0.5">{t.licenseAuthority}</span>
                <span className="font-semibold text-white">{resolve(companyInfo.authority)}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-brand-dark/40 border border-white/5 flex gap-3">
              <ShieldCheck className="w-5 h-5 text-brand-cyan shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className="text-slate-500 block mb-0.5">{t.licenseNo}</span>
                <span className="font-semibold text-white font-mono text-sm">{companyInfo.licenseNumber}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-brand-dark/40 border border-white/5 flex gap-3">
              <ShieldCheck className="w-5 h-5 text-brand-cyan shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className="text-slate-500 block mb-0.5">{t.businessActivity}</span>
                <span className="font-semibold text-white leading-relaxed">{resolve(companyInfo.activity)}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-brand-dark/40 border border-white/5 flex gap-3 sm:col-span-2">
              <ShieldCheck className="w-5 h-5 text-brand-cyan shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className="text-slate-500 block mb-0.5">{t.registeredAddress}</span>
                <span className="font-semibold text-white leading-relaxed">{resolve(companyInfo.registeredAddress)}</span>
              </div>
            </div>
          </div>
        </div>
      </PageSection>

    </div>
  );
}
