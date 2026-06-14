import { TranslationText } from "@/config/siteData";

export interface OtherServiceMediaItem {
  id: string;
  type: "image" | "video";
  src: string;
  title: TranslationText;
  description: TranslationText;
}

export const otherServicesVideos: OtherServiceMediaItem[] = [
  {
    id: "field-service-01",
    type: "video",
    src: "/other-services/videos/field-service-01.mp4",
    title: {
      en: "On-Site HVAC Field Service",
      ar: "خدمة ميدانية لتكييف الهواء في الموقع",
    },
    description: {
      en: "Watch our certified technicians perform professional air conditioning installation and maintenance work across commercial and residential sites in the UAE.",
      ar: "شاهد فنيينا المعتمدين وهم ينفذون أعمال تركيب وصيانة التكييف الاحترافية في المواقع التجارية والسكنية بدولة الإمارات.",
    },
  },
  {
    id: "field-service-02",
    type: "video",
    src: "/other-services/videos/field-service-02.mp4",
    title: {
      en: "Cooling System Maintenance in Action",
      ar: "صيانة أنظمة التبريد أثناء العمل",
    },
    description: {
      en: "Real footage from AirPoint field operations — preventive servicing, troubleshooting, and quality checks on HVAC and refrigeration equipment.",
      ar: "لقطات حقيقية من عمليات إير بوينت الميدانية — صيانة وقائية، استكشاف الأعطال، وفحوصات الجودة لمعدات التكييف والتبريد.",
    },
  },
];

export const otherServicesImages: OtherServiceMediaItem[] = [
  {
    id: "refrigeration-oil",
    type: "image",
    src: "/other-services/images/refrigeration-oil.jpg",
    title: {
      en: "Suniso 3GS Refrigeration Oil",
      ar: "زيت تبريد Suniso 3GS",
    },
    description: {
      en: "Premium-quality compressor lubricant supplied for professional AC and refrigeration maintenance across the UAE.",
      ar: "زيت ضاغط عالي الجودة متوفر لتلبية احتياجات صيانة التكييف والتبريد الاحترافية في الإمارات.",
    },
  },
  {
    id: "service-02",
    type: "image",
    src: "/other-services/images/service-02.jpg",
    title: {
      en: "Suniso SL 220 Synthetic Oil",
      ar: "زيت Suniso SL 220 الصناعي",
    },
    description: {
      en: "Full synthetic refrigeration oil for HFC systems including R134a, R404a, R407C, R410a, and R507 applications.",
      ar: "زيت تبريد صناعي بالكامل لأنظمة HFC بما في ذلك R134a وR404a وR407C وR410a وR507.",
    },
  },
  {
    id: "cold-room-evaporator",
    type: "image",
    src: "/other-services/images/cold-room-evaporator.jpg",
    title: {
      en: "Friga-Bohn Cold Room Evaporator Unit",
      ar: "وحدة مبخر غرف التبريد Friga-Bohn",
    },
    description: {
      en: "Installation and servicing of commercial cold room evaporator systems with Eurovent-certified performance standards.",
      ar: "تركيب وصيانة وحدات مبخر غرف التبريد التجارية وفق معايير أداء معتمدة من Eurovent.",
    },
  },
  {
    id: "service-04",
    type: "image",
    src: "/other-services/images/service-04.jpg",
    title: {
      en: "Commercial Unit Cooler Installation",
      ar: "تركيب مبرد وحدة تجارية",
    },
    description: {
      en: "Wall-mounted refrigeration unit coolers for supermarkets, cold storage, and industrial cooling facilities.",
      ar: "مبردات وحدات تبريد معلقة للسوبرماركت ومستودعات التبريد والمنشآت الصناعية.",
    },
  },
  {
    id: "service-05",
    type: "image",
    src: "/other-services/images/service-05.jpg",
    title: {
      en: "AKO Cold Chain Control Solutions",
      ar: "حلول التحكم في سلسلة التبريد AKO",
    },
    description: {
      en: "Complete cold chain monitoring, gas leak detection, and temperature control systems for walk-in chillers and cold rooms.",
      ar: "أنظمة متكاملة لمراقبة سلسلة التبريد وكشف تسريب الغاز والتحكم بدرجة الحرارة لغرف التبريد.",
    },
  },
  {
    id: "service-06",
    type: "image",
    src: "/other-services/images/service-06.jpg",
    title: {
      en: "Refrigeration Spare Parts Inventory",
      ar: "مخزون قطع غيار التبريد",
    },
    description: {
      en: "Suniso oils, Mueller refrigeration tubing, and genuine consumables stocked for rapid B2B dispatch across the Emirates.",
      ar: "زيوت Suniso وأنابيب Mueller للتبريد ومستلزمات أصلية متوفرة للتوريد السريع لقطاع الأعمال في الإمارات.",
    },
  },
  {
    id: "service-07",
    type: "image",
    src: "/other-services/images/service-07.jpg",
    title: {
      en: "Split AC Repair & Maintenance",
      ar: "إصلاح وصيانة مكيفات الاسبليت",
    },
    description: {
      en: "Professional indoor unit servicing, filter cleaning, and electrical diagnostics for office and commercial split AC systems.",
      ar: "صيانة احترافية للوحدات الداخلية وتنظيف الفلاتر وتشخيص كهربائي لمكيفات الاسبليت في المكاتب والمنشآت التجارية.",
    },
  },
  {
    id: "service-08",
    type: "image",
    src: "/other-services/images/service-08.jpg",
    title: {
      en: "AC Electrical Troubleshooting",
      ar: "استكشاف أعطال التكييف الكهربائية",
    },
    description: {
      en: "Certified technicians testing wiring, contactors, and control boards using professional diagnostic equipment.",
      ar: "فنيون معتمدون يفحصون التوصيلات الكهربائية والكونتاكتورات ولوحات التحكم بأجهزة تشخيص احترافية.",
    },
  },
  {
    id: "service-09",
    type: "image",
    src: "/other-services/images/service-09.jpg",
    title: {
      en: "Indoor AC Unit Servicing",
      ar: "صيانة الوحدة الداخلية للتكييف",
    },
    description: {
      en: "Routine maintenance and repair of wall-mounted split air conditioners to restore cooling efficiency and airflow.",
      ar: "صيانة دورية وإصلاح مكيفات الاسبليت المعلقة لاستعادة كفاءة التبريد وتدفق الهواء.",
    },
  },
  {
    id: "service-10",
    type: "image",
    src: "/other-services/images/service-10.jpg",
    title: {
      en: "AC System Electrical Testing",
      ar: "فحص كهربائي لأنظمة التكييف",
    },
    description: {
      en: "Precision multimeter testing on indoor AC units to identify faults and ensure safe, reliable operation.",
      ar: "فحص دقيق بالملتيميتر للوحدات الداخلية لتحديد الأعطال وضمان التشغيل الآمن والموثوق.",
    },
  },
  {
    id: "service-11",
    type: "image",
    src: "/other-services/images/service-11.jpg",
    title: {
      en: "Outdoor Condenser Unit Repair",
      ar: "إصلاح وحدة المكثف الخارجية",
    },
    description: {
      en: "On-site servicing of outdoor AC condenser units including bracket inspection, wiring checks, and component replacement.",
      ar: "صيانة ميدانية لوحدات المكثف الخارجية تشمل فحص القواعد والتوصيلات واستبدال المكونات.",
    },
  },
  {
    id: "service-12",
    type: "image",
    src: "/other-services/images/service-12.jpg",
    title: {
      en: "Refrigerant Pressure & Gas Charging",
      ar: "قياس الضغط وتعبئة غاز التبريد",
    },
    description: {
      en: "Professional manifold gauge testing and refrigerant gas charging for outdoor AC condenser units.",
      ar: "فحص ضغط الغاز وتعبئة فريون التبريد باستخدام مجموعة قياس احترافية للوحدات الخارجية.",
    },
  },
  {
    id: "service-13",
    type: "image",
    src: "/other-services/images/service-13.jpg",
    title: {
      en: "Deep AC Cleaning Service",
      ar: "خدمة التنظيف العميق للمكيفات",
    },
    description: {
      en: "Hygienic deep cleaning of split AC indoor units using professional waterproof covers to protect your workspace.",
      ar: "تنظيف عميق وصحي للوحدات الداخلية باستخدام أغطية مقاومة للماء لحماية بيئة العمل.",
    },
  },
  {
    id: "service-14",
    type: "image",
    src: "/other-services/images/service-14.jpg",
    title: {
      en: "Hisense AC Repair & Overhaul",
      ar: "إصلاح وصيانة مكيفات Hisense",
    },
    description: {
      en: "Complete disassembly, repair, and reassembly of Hisense and other major-brand split air conditioning units.",
      ar: "فك وإصلاح وإعادة تركيب مكيفات Hisense وعلامات تجارية رائدة أخرى.",
    },
  },
];
