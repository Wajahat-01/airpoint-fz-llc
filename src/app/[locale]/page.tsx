import React from "react";
import Link from "next/link";
import { 
  Wind, 
  Snowflake, 
  Wrench, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  ShoppingBag,
  Building2,
  Paintbrush
} from "lucide-react";
import { locales, LocaleType } from "@/config/translations";
import { translations } from "@/config/translations";
import { serviceCategories, productsList, projectsList, companyInfo } from "@/config/siteData";
import { layout } from "@/config/layout";
import { siteImages } from "@/config/assets";
import ContactForm from "@/components/sections/ContactForm";
import GoogleMap from "@/components/sections/GoogleMap";
import HomeHero from "@/components/home/HomeHero";
import { AnimateIn } from "@/components/motion/AnimateIn";
import { AnimateStagger, AnimateItem } from "@/components/motion/AnimateStagger";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { InteractiveCard } from "@/components/ui/InteractiveCard";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function HomePage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as LocaleType;
  const isRtl = locale === "ar";
  const t = translations[locale] || translations.en;

  const resolve = (obj: { en: string; ar: string } | undefined) => {
    if (!obj) return "";
    return obj[locale] || obj.en;
  };

  // Icon mapping helper
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

  const industries = ["Logistics", "Retail", "Hospitality", "Industrial"];

  return (
    <div className={`${layout.pageStackLoose} pb-12 lg:pb-20`}>
      <HomeHero
        locale={locale}
        requestQuoteLabel={t.requestQuote}
        browseProductsLabel={t.browseProducts}
        exploreServiceLabel={
          isRtl ? "تفاصيل القسم والحلول" : "Explore Division Solutions"
        }
        trustLabel={isRtl ? "موثوق من أكثر من 400 شركة داخل الإمارات" : "Trusted by 400+ companies across the UAE"}
        industries={industries}
        responseTitle={isRtl ? "استجابة في أقل من ساعتين" : "Under 2-hour emergency response"}
        responseSubtitle={isRtl ? "7 أيام / 24 ساعة" : "Available 24/7, 365 days"}
        dispatchLabel={isRtl ? "خط الدعم المباشر" : "Direct dispatch line"}
        phone={companyInfo.phone}
        activeTeamsLabel={isRtl ? "فريق ميداني جاهز" : "Field teams active"}
      />

      <AnimateIn className={`${layout.container} relative`}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-brand-cyan/5 rounded-full blur-[150px] pointer-events-none -z-10" />

        <SectionHeader
          className={layout.sectionHeaderGap}
          eyebrow={isRtl ? "خدماتنا الأساسية" : "Core Services"}
          title={t.servicesSectionTitle}
          subtitle={t.servicesSectionSubtitle}
        />

        <AnimateStagger className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {serviceCategories.map((category) => (
            <AnimateItem key={category.slug}>
            <InteractiveCard
              className="glass-panel glass-panel-hover p-6 sm:p-8 rounded-2xl flex flex-col justify-between border-white/5 hover:border-brand-cyan/30 shadow-lg group relative h-full"
            >
              {/* Highlight accent line */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-brand-cyan/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-t-2xl"></div>

              <div>
                {/* Header Icon + Title */}
                <div className="flex items-center gap-4 pb-6 border-b border-white/5 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-brand-cyan/10 flex items-center justify-center border border-brand-cyan/20 text-brand-cyan">
                    {getIcon(category.iconName, "w-6 h-6")}
                  </div>
                  <h3 className="font-outfit font-bold text-xl text-white">
                    {resolve(category.title)}
                  </h3>
                </div>

                <p className="text-sm text-slate-400 leading-relaxed mb-6">
                  {resolve(category.description)}
                </p>

                {/* Subservice Items List */}
                <ul className="space-y-3.5 mb-8 text-xs text-slate-300">
                  {category.items.slice(0, 4).map((item) => (
                    <li key={item.id} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-brand-cyan shrink-0 mt-0.5" />
                      <span className="font-medium">{resolve(item.title)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action */}
              <Link
                href={`/${locale}/services#${category.slug}`}
                className="w-full py-3 rounded-xl bg-brand-blue/30 hover:bg-brand-cyan text-slate-300 hover:text-brand-dark font-outfit font-bold text-sm flex items-center justify-center gap-2 border border-white/5 hover:border-brand-cyan transition-all"
              >
                <span>{isRtl ? "تفاصيل القسم والحلول" : "Explore Division Solutions"}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

            </InteractiveCard>
            </AnimateItem>
          ))}
        </AnimateStagger>
      </AnimateIn>

      <AnimateIn className="bg-brand-blue/15 border-y border-white/5 py-12 lg:py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-cyan/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>
        
        <div className={layout.container}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left side: features list */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/25 text-xs text-brand-gold font-semibold uppercase tracking-wider">
                {isRtl ? "متاح للشركات والمصانع" : "Corporate Facility Care"}
              </div>
              <h2 className="font-outfit font-black text-3xl sm:text-4xl text-white tracking-tight">
                {t.amcTitle}
              </h2>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                {isRtl
                  ? "تضمن عقود الصيانة السنوية (AMC) من إير بوينت كفاءة تامة وتغطية وقائية مستمرة لكافة أجهزة التكييف المركزي ومبردات المياه وغرف التجميد في مصانعكم ومكاتبكم. نضع أصولكم الهندسية كأولوية تامة لفرق الصيانة والدعم الفني لدينا."
                  : "AirPoint's Annual Maintenance Contracts protect your facility's critical systems. We provide scheduled preventive audits, component calibrations, gas pressure balances, and emergency response to secure complete operation without down-time."}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-brand-cyan/15 flex items-center justify-center text-brand-cyan shrink-0 mt-0.5">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-xs">
                    <span className="font-bold text-white block">{isRtl ? "استجابة طارئة 24/7" : "24/7 Rapid Response"}</span>
                    <span className="text-slate-500">{isRtl ? "استجابة فورية للأعطال في أقل من ساعتين" : "Under 2 hours emergency dispatch"}</span>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-brand-cyan/15 flex items-center justify-center text-brand-cyan shrink-0 mt-0.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-xs">
                    <span className="font-bold text-white block">{isRtl ? "فنيون مرخصون ومؤهلون" : "Certified Technicians"}</span>
                    <span className="text-slate-500">{isRtl ? "فريق عمل مهني ذو خبرة تحت إشراف هندسي" : "Supervised under licensed cooling engineers"}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href={`/${locale}/contact?service=amc-contracts`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-brand-cyan text-brand-dark font-outfit font-bold text-sm shadow-md hover:bg-brand-cyan/90 transition-all cursor-pointer"
                >
                  <span>{isRtl ? "طلب مقترح عقد صيانة سنوي" : "Request AMC Proposal"}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right side: visual checklist card with image */}
            <div className="lg:col-span-5">
              <div className="amc-checklist-card relative rounded-2xl overflow-hidden shadow-xl min-h-[380px]">
                <img
                  src={siteImages.amcInspection}
                  alt="HVAC technicians performing rooftop maintenance"
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/50 via-transparent to-transparent" />

                <div className="relative z-10 flex h-full min-h-[380px] items-end p-5 sm:p-6">
                  <div className="amc-checklist-panel w-full rounded-xl border border-white/10 p-5">
                    <h3 className="amc-checklist-title font-outfit font-bold text-base border-b border-white/15 pb-3 mb-4">
                      {isRtl ? "قائمة تدقيق الزيارة الوقائية" : "Preventative Inspection Checklist"}
                    </h3>

                    <ul className="space-y-2.5 text-xs">
                      <li className="amc-checklist-item flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-brand-cyan shrink-0" />
                        <span>{isRtl ? "فحص لوحة التحكم وشد التوصيلات الكهربائية" : "Control panel wiring and contactor tight check"}</span>
                      </li>
                      <li className="amc-checklist-item flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-brand-cyan shrink-0" />
                        <span>{isRtl ? "قياس غاز التبريد وفحص مسارات الفريون" : "Refrigerant pressure checks and leak test"}</span>
                      </li>
                      <li className="amc-checklist-item flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-brand-cyan shrink-0" />
                        <span>{isRtl ? "تنظيف فلاتر الهواء ومجاري تصريف المياه" : "Air filter wash and drain tray disinfection"}</span>
                      </li>
                      <li className="amc-checklist-item flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-brand-cyan shrink-0" />
                        <span>{isRtl ? "معايرة صمامات التمدد والترموستات" : "Expansion valve regulation & thermostat calibration"}</span>
                      </li>
                      <li className="amc-checklist-item flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-brand-cyan shrink-0" />
                        <span>{isRtl ? "فحص كفاءة عمل الضاغط والمحرك" : "Compressor amp readings and motor bearing audits"}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </AnimateIn>

      <AnimateIn className={`${layout.container} relative`}>
        <SectionHeader
          className={layout.sectionHeaderGap}
          eyebrow={isRtl ? "قطع الغيار" : "Spare Parts"}
          title={t.productsSectionTitle}
          subtitle={t.productsSectionSubtitle}
        />

        <AnimateStagger className={layout.productGrid}>
          {productsList.slice(0, 4).map((product) => (
            <AnimateItem key={product.id}>
            <InteractiveCard className="glass-panel p-5 rounded-xl border-white/5 flex flex-col justify-between text-center gap-4 hover:border-brand-cyan/20 h-full">
              <div className="h-28 rounded-lg bg-brand-blue/10 flex flex-col items-center justify-center border border-white/5 relative overflow-hidden">
                {/* Backdrop design badge */}
                <div className="absolute top-1 right-2 z-10 text-[9px] uppercase font-bold text-brand-gold tracking-widest">{product.brand}</div>
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={resolve(product.name)}
                    className="w-full h-full object-cover opacity-80"
                  />
                ) : (
                  <ShoppingBag className="w-10 h-10 text-brand-cyan/60" />
                )}
              </div>
              
              <div>
                <h4 className="font-outfit font-bold text-sm text-white truncate">
                  {resolve(product.name)}
                </h4>
                <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider">
                  {product.brand}
                </p>
              </div>

              <Link
                href={`/${locale}/products`}
                className="py-2.5 rounded-lg border border-white/10 hover:border-brand-cyan/30 text-xs font-semibold text-slate-300 hover:text-white transition-all bg-white/5"
              >
                {isRtl ? "طلب سعر الموديل" : "Request Price Quote"}
              </Link>
            </InteractiveCard>
            </AnimateItem>
          ))}
        </AnimateStagger>

        <div className="text-center mt-12">
          <Link
            href={`/${locale}/products`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-brand-cyan text-brand-cyan hover:bg-brand-cyan hover:text-brand-dark font-outfit font-bold text-sm transition-all"
          >
            <span>{isRtl ? "تصفح كافة قطع الغيار" : "Browse All Spare Parts"}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </AnimateIn>

      <AnimateIn className={layout.container}>
        <SectionHeader
          className={layout.sectionHeaderGap}
          eyebrow={isRtl ? "مشاريعنا" : "Case Studies"}
          title={t.projectsSectionTitle}
          subtitle={t.projectsSectionSubtitle}
        />

        <AnimateStagger className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projectsList.map((project) => (
            <AnimateItem key={project.id}>
            <InteractiveCard className="glass-panel rounded-2xl overflow-hidden border-white/5 flex flex-col justify-between hover:border-brand-cyan/20 shadow-md h-full">
              {/* Project image */}
              <div className="h-44 bg-brand-blue/20 border-b border-white/5 flex items-center justify-center p-0 relative overflow-hidden">
                {project.imageUrl ? (
                  <>
                    <img
                      src={project.imageUrl}
                      alt={resolve(project.title)}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 to-transparent" />
                  </>
                ) : (
                  <Building2 className="w-16 h-16 text-brand-cyan/30" />
                )}
                <div className="absolute top-4 right-4 px-2.5 py-1 rounded bg-brand-cyan/80 backdrop-blur-sm text-brand-dark text-[10px] uppercase font-bold tracking-widest">
                  {resolve(project.category)}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-outfit font-bold text-base text-white">
                    {resolve(project.title)}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {resolve(project.location)} • {project.year}
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                    {resolve(project.description)}
                  </p>
                </div>

                <Link
                  href={`/${locale}/projects`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-cyan hover:underline"
                >
                  <span>{isRtl ? "تفاصيل المشروع" : "View Project Details"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </InteractiveCard>
            </AnimateItem>
          ))}
        </AnimateStagger>
      </AnimateIn>

      <AnimateIn className={layout.container}>
        <div className="p-6 sm:p-8 lg:p-12 rounded-3xl bg-brand-blue/10 border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-cyan/5 rounded-full blur-[100px] pointer-events-none -z-10" />

          <SectionHeader
            className="mb-12"
            title={t.whyChooseUs}
            subtitle={t.whyChooseUsSub}
          />

          <AnimateStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimateItem className="space-y-3 text-center sm:text-left rtl:sm:text-right">
              <div className="w-10 h-10 rounded-lg bg-brand-cyan/10 flex items-center justify-center border border-brand-cyan/20 text-brand-cyan mx-auto sm:mx-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-outfit font-bold text-sm text-white">{t.usp1Title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">{t.usp1Desc}</p>
            </AnimateItem>

            <AnimateItem className="space-y-3 text-center sm:text-left rtl:sm:text-right">
              <div className="w-10 h-10 rounded-lg bg-brand-cyan/10 flex items-center justify-center border border-brand-cyan/20 text-brand-cyan mx-auto sm:mx-0">
                <Building2 className="w-5 h-5" />
              </div>
              <h4 className="font-outfit font-bold text-sm text-white">{t.usp2Title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">{t.usp2Desc}</p>
            </AnimateItem>

            <AnimateItem className="space-y-3 text-center sm:text-left rtl:sm:text-right">
              <div className="w-10 h-10 rounded-lg bg-brand-cyan/10 flex items-center justify-center border border-brand-cyan/20 text-brand-cyan mx-auto sm:mx-0">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="font-outfit font-bold text-sm text-white">{t.usp3Title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">{t.usp3Desc}</p>
            </AnimateItem>

            <AnimateItem className="space-y-3 text-center sm:text-left rtl:sm:text-right">
              <div className="w-10 h-10 rounded-lg bg-brand-cyan/10 flex items-center justify-center border border-brand-cyan/20 text-brand-cyan mx-auto sm:mx-0">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <h4 className="font-outfit font-bold text-sm text-white">{t.usp4Title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">{t.usp4Desc}</p>
            </AnimateItem>
          </AnimateStagger>
        </div>
      </AnimateIn>

      <AnimateIn id="contact" className={`${layout.container} scroll-mt-24`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Map & License column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-4">
              <h2 className="font-outfit font-black text-2xl sm:text-3xl text-white tracking-tight">
                {t.contactUs}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {isRtl 
                  ? "تفضل بزيارة مركز كومباس للأعمال التابع لهيئة راكز، أو تواصل معنا مباشرة لتلبية متطلبات صيانة التكييف المركزي والتبريد ومشاريع عقود الصيانة السنوية بدولة الإمارات."
                  : "Visit our RAKEZ registered office or get in touch through our local hotlines for immediate service inquiries, cooling repairs, and spare part quotes."}
              </p>
            </div>
            
            {/* Styled Google Maps embedding */}
            <GoogleMap locale={locale} />
          </div>

          {/* Form column */}
          <div className="lg:col-span-7">
            <ContactForm locale={locale} />
          </div>
        </div>
      </AnimateIn>

    </div>
  );
}
