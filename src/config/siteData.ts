import { productImages, projectImages } from "@/config/assets";

export interface TranslationText {
  en: string;
  ar: string;
}

export interface ServiceItem {
  id: string;
  title: TranslationText;
  description: TranslationText;
  features: TranslationText[];
  applications: TranslationText[];
}

export interface ServiceCategory {
  slug: string;
  title: TranslationText;
  description: TranslationText;
  longDescription: TranslationText;
  iconName: string; // Lucide icon reference
  items: ServiceItem[];
}

export interface ProductItem {
  id: string;
  name: TranslationText;
  category: "compressors" | "controls" | "refrigerants";
  brand: string;
  description: TranslationText;
  features: TranslationText[];
  applications: TranslationText[];
  imageUrl: string;
}

export interface ProjectItem {
  id: string;
  title: TranslationText;
  category: TranslationText;
  description: TranslationText;
  location: TranslationText;
  client: TranslationText;
  year: string;
  scope: TranslationText[];
  imageUrl?: string;
}

export interface CompanyDetails {
  name: TranslationText;
  licenseNumber: string;
  licenseType: TranslationText;
  authority: TranslationText;
  registeredAddress: TranslationText;
  activity: TranslationText;
  manager: TranslationText;
  phone: string;
  email: string;
  whatsapp: string;
  officeHours: TranslationText;
  mapsUrl: string;
}

export const companyInfo: CompanyDetails = {
  name: {
    en: "AirPoint AC and Refrigeration Spare Parts Trading FZ-LLC",
    ar: "إير بوينت إيه سي آند ريفريجريشن سبير بارتس تريدينغ ش.م.ح - ذ.م.م"
  },
  licenseNumber: "5036795",
  licenseType: {
    en: "Free Zone Limited Liability Company FZ-LLC",
    ar: "شركة منطقة حرة ذات مسؤولية محدودة"
  },
  authority: {
    en: "Ras Al Khaimah Economic Zone Authority (RAKEZ)",
    ar: "هيئة مناطق رأس الخيمة الاقتصادية (راكز)"
  },
  registeredAddress: {
    en: "VUNE2026, Compass building - Al Hulaila, Al Hulaila Industrial Zone-FZ, Ras Al Khaimah, United Arab Emirates",
    ar: "VUNE2026، مركز كومباس للأعمال - الحليلة، منطقة الحليلة الصناعية - منطقة حرة، رأس الخيمة، الإمارات العربية المتحدة"
  },
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=VUNE2026+Compass+Building+Al+Hulaila+Industrial+Zone+Ras+Al+Khaimah+UAE",
  activity: {
    en: "Aircondition & Refrigeration Spare Parts Trading",
    ar: "تجارة قطع غيار أجهزة تكييف الهواء والتبريد ومكوناتها"
  },
  manager: {
    en: "Wajahat Ali Muhammad Hashim",
    ar: "وجاهت علي محمد هاشم"
  },
  phone: "+971 54 495 2370",
  whatsapp: "+971 54 495 2370",
  email: "info@airpoint.ae",
  officeHours: {
    en: "Open 24/7 — Available round the clock",
    ar: "مفتوح 24/7 — متاح على مدار الساعة طوال أيام الأسبوع"
  }
};

/** Strip spaces for `tel:` / `wa.me` links */
export function toDialablePhone(phone: string): string {
  return phone.replace(/[\s-]/g, "");
}

export function getPhoneTelHref(phone: string = companyInfo.phone): string {
  return `tel:${toDialablePhone(phone)}`;
}

export function getWhatsAppHref(
  text: string,
  whatsapp: string = companyInfo.whatsapp
): string {
  const digits = toDialablePhone(whatsapp).replace(/^\+/, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}

export const serviceCategories: ServiceCategory[] = [
  {
    slug: "hvac-services",
    title: {
      en: "HVAC & Air Conditioning",
      ar: "أنظمة التكييف والتهوية HVAC"
    },
    description: {
      en: "Complete design, supply, installation, repairing, and maintenance of commercial, industrial, and residential HVAC systems in the UAE.",
      ar: "تصميم وتوريد وتركيب وإصلاح وصيانة أنظمة التكييف والتهوية التجارية والصناعية والسكنية المتكاملة في دولة الإمارات."
    },
    longDescription: {
      en: "AirPoint specializes in engineering and maintaining high-performance HVAC systems. We ensure optimal indoor air quality and energy-efficient cooling solutions tailored to the harsh Gulf climate, from massive district chillers to complex ductwork layouts.",
      ar: "تتخصص إير بوينت في هندسة وصيانة أنظمة التكييف والتهوية عالية الأداء. نحن نضمن جودة هواء داخلي مثالية وحلول تبريد موفرة للطاقة مصممة خصيصاً لمناخ الخليج القاسي، بدءاً من المبردات الضخمة وحتى شبكات مجاري الهواء المعقدة."
    },
    iconName: "Wind",
    items: [
      {
        id: "supply-installation",
        title: {
          en: "Supply, Installation & Commissioning",
          ar: "التوريد والتركيب والتشغيل"
        },
        description: {
          en: "Expert deployment of VRF/VRV systems, chillers, package units, and split systems.",
          ar: "التركيب الاحترافي لأنظمة تدفق التبريد المتغير VRF/VRV، والمبردات (Chillers)، والوحدات المجمعة، والأنظمة المجزأة."
        },
        features: [
          { en: "Energy-efficient load calculations", ar: "حسابات دقيقة للأحمال الحرارية الموفرة للطاقة" },
          { en: "Duct testing and air balancing", ar: "فحص مجاري الهواء وموازنة تدفق الهواء" },
          { en: "DDA and civil defense compliant setups", ar: "تركيبات متوافقة مع متطلبات الدفاع المدني وجهات الترخيص" }
        ],
        applications: [
          { en: "High-rise commercial towers", ar: "الأبراج التجارية الشاهقة" },
          { en: "Residential complexes and villas", ar: "المجمعات السكنية والفيلات" },
          { en: "Corporate offices and retail stores", ar: "المكاتب الشركات ومحلات التجزئة" }
        ]
      },
      {
        id: "ac-repair-maintenance",
        title: {
          en: "AC Repairing & Maintenance",
          ar: "إصلاح وصيانة المكيفات"
        },
        description: {
          en: "Fast-response troubleshooting and preventative overhaul for commercial refrigeration and climate systems.",
          ar: "استكشاف الأعطال وإصلاحها بسرعة وصيانة وقائية لأنظمة التبريد ومكافحة المناخ التجاري."
        },
        features: [
          { en: "Compressor testing & replacement", ar: "فحص واستبدال الضواغط" },
          { en: "Electrical control panel troubleshooting", ar: "إصلاح أعطال لوحات التحكم الكهربائية" },
          { en: "Condenser and evaporator coil washing", ar: "غسيل وتنظيف ملفات المكثف والمبخر" }
        ],
        applications: [
          { en: "Emergency breakdowns", ar: "الأعطال الطارئة والمفاجئة" },
          { en: "Seasonal preventive maintenance", ar: "الصيانة الوقائية الموسمية" }
        ]
      },
      {
        id: "amc-contracts",
        title: {
          en: "Annual Maintenance Contracts (AMC)",
          ar: "عقود الصيانة السنوية (AMC)"
        },
        description: {
          en: "Comprehensive, scheduled corporate cooling inspections with 24/7 priority emergency response.",
          ar: "عقود صيانة دورية شاملة للمنشآت والشركات مع استجابة طارئة ذات أولوية على مدار الساعة طوال أيام الأسبوع."
        },
        features: [
          { en: "Scheduled quarterly inspections", ar: "زيارات فحص ربع سنوية مجدولة" },
          { en: "Priority response under 2 hours", ar: "استجابة سريعة للأعطال في أقل من ساعتين" },
          { en: "Detailed equipment health logging", ar: "سجلات وتقارير تفصيلية عن حالة الأجهزة" }
        ],
        applications: [
          { en: "Commercial office towers", ar: "الأبراج والمباني المكتبية التجارية" },
          { en: "Warehouses and logistics hubs", ar: "المستودعات والمراكز اللوجستية" },
          { en: "Hotels, schools, and hospitals", ar: "الفنادق والمدارس والمستشفيات" }
        ]
      },
      {
        id: "gas-charging-leak",
        title: {
          en: "AC Gas Charging & Leak Detection",
          ar: "تعبئة الغاز وكشف تسريب الفريون"
        },
        description: {
          en: "Precision pressure testing, nitrogen pressure testing, leak sealing, and refrigerant charging.",
          ar: "فحص ضغط الغاز بدقة باستخدام النيتروجين، سد التسريبات، وتعبئة غاز التبريد (الفريون) بالنسب القياسية."
        },
        features: [
          { en: "Electronic leak detectors usage", ar: "استخدام أجهزة كشف التسريب الإلكترونية الحساسة" },
          { en: "Eco-friendly disposal & vacuuming", ar: "سحب وتفريغ الهواء الصديق للبيئة" },
          { en: "OEM standard refrigerant supply", ar: "توريد غاز فريون بمواصفات المصنع الأصلية" }
        ],
        applications: [
          { en: "Low cooling efficiency troubleshooting", ar: "معالجة ضعف كفاءة التبريد" },
          { en: "System recharge after repair works", ar: "إعادة تعبئة الغاز بعد أعمال الإصلاح" }
        ]
      },
      {
        id: "fcu-maintenance",
        title: {
          en: "FCU Installation & Maintenance",
          ar: "تركيب وصيانة وحدات الفان كويل (FCU)"
        },
        description: {
          en: "Specialized servicing of Fan Coil Units, actuator replacement, thermostat upgrades, and valve maintenance.",
          ar: "خدمات متخصصة لوحدات الفان كويل (FCU)، استبدال المحركات والمحابس، وتحديث لوحات التحكم والترموستات."
        },
        features: [
          { en: "Drain line clearing and disinfection", ar: "تسليك مجاري تصريف المياه وتطهيرها" },
          { en: "Blower motor repair and alignment", ar: "إصلاح وموازنة محرك المروحة" },
          { en: "Actuator and 2-way valve testing", ar: "فحص المحركات والمحابس الثنائية" }
        ],
        applications: [
          { en: "Chilled water air conditioning systems", ar: "أنظمة التكييف المعتمدة على المياه المثلجة" },
          { en: "Apartment buildings and hotels", ar: "المباني السكنية والفنادق" }
        ]
      },
      {
        id: "ducting-ventilation",
        title: {
          en: "Ducting & Ventilation Works",
          ar: "أعمال الدكت وأنظمة التهوية"
        },
        description: {
          en: "Fabrication and installation of GI, PI, and flexible ductwork, exhaust fans, and fresh air units.",
          ar: "تصنيع وتركيب مجاري الهواء المعدنية والمعزولة والتهوية المرنة، ومراوح الشفط ووحدات الهواء النقي."
        },
        features: [
          { en: "Custom duct design & volume control dampers", ar: "تصميم مخصص للدكت وخانقات تدفق الهواء" },
          { en: "Kitchen exhaust hood ducting works", ar: "أعمال مجاري الهواء لشفاطات المطابخ" },
          { en: "Noise attenuators and acoustic lining", ar: "تركيب عوازل الصوت ومخمدات الضجيج" }
        ],
        applications: [
          { en: "Commercial kitchens & restaurants", ar: "المطابخ التجارية والمطاعم" },
          { en: "Industrial extraction and exhaust", ar: "أنظمة السحب والتهوية الصناعية" },
          { en: "Basement parking ventilation systems", ar: "أنظمة تهوية مواقف السيارات السفلية" }
        ]
      }
    ]
  },
  {
    slug: "refrigeration-services",
    title: {
      en: "Refrigeration & Cold Rooms",
      ar: "التبريد التجاري وغرف التبريد"
    },
    description: {
      en: "Design, build, and repair of walk-in chillers, freezers, and industrial refrigeration equipment for cold storage chains.",
      ar: "تصميم وبناء وإصلاح غرف التبريد والتجميد والمعدات الصناعية لحفظ المواد الغذائية والطبية."
    },
    longDescription: {
      en: "We engineer industrial-grade refrigeration plants and cold rooms that sustain critical temperatures under the extreme UAE heat. Our solutions feature reliable compressor racks, sandwich panel insulation, and smart monitoring systems.",
      ar: "نحن نقوم بهندسة محطات تبريد وغرف تبريد صناعية تحافظ على درجات الحرارة الحرجة تحت حرارة الصيف الشديدة في الإمارات. تتميز حلولنا بضواغط قوية، وألواح عازلة (Sandwich Panels)، وأنظمة مراقبة ذكية."
    },
    iconName: "Snowflake",
    items: [
      {
        id: "cold-room-installation",
        title: {
          en: "Cold Room & Storage Installation",
          ar: "تركيب غرف ومستودعات التبريد"
        },
        description: {
          en: "Custom-sized cold storage setup using high-density polyurethane insulation panels.",
          ar: "إنشاء غرف ومستودعات تبريد بمقاسات مخصصة باستخدام ألواح البولي يوريثان عالية الكثافة."
        },
        features: [
          { en: "Custom door designs (sliding & hinged)", ar: "أبواب مخصصة (سحابة ومفصلية) شديدة العزل" },
          { en: "Hermetic and semi-hermetic compressor racks", ar: "ضواغط محكمة وشبه محكمة عالية الكفاءة" },
          { en: "Digital monitoring and alarm modules", ar: "أنظمة مراقبة رقمية وإنذار لدرجة الحرارة" }
        ],
        applications: [
          { en: "Supermarkets and hypermarkets", ar: "السوبرماركت والهايبرماركت" },
          { en: "Pharmaceutical warehouses", ar: "مستودعات الأدوية والمستلزمات الطبية" },
          { en: "Food manufacturing facilities", ar: "مصانع وشركات تصنيع الأغذية" }
        ]
      },
      {
        id: "walkin-chillers",
        title: {
          en: "Walk-in Chillers & Freezers",
          ar: "ثلاجات التجميد والتبريد الكبيرة"
        },
        description: {
          en: "Turnkey cold rooms operating at positive and sub-zero temperatures (+4°C to -25°C).",
          ar: "غرف تبريد وتجميد متكاملة تسلم جاهزة للعمل بدرجات حرارة موجبة وسالبة (+4 إلى -25 درجة مئوية)."
        },
        features: [
          { en: "Accurate thermostat calibration", ar: "معايرة دقيقة للترموستات الرقمي" },
          { en: "Pressure relief valve installation", ar: "تركيب صمامات تنفيس الضغط" },
          { en: "Heavy-duty anti-slip floor finishes", ar: "تشطيبات أرضيات متينة مانعة للانزلاق" }
        ],
        applications: [
          { en: "Hotels and restaurant kitchens", ar: "مطابخ الفنادق والمطاعم" },
          { en: "Meat and seafood distribution centers", ar: "مراكز توزيع اللحوم والأسماك" }
        ]
      },
      {
        id: "refrigeration-repair",
        title: {
          en: "Refrigeration Repair & Maintenance",
          ar: "إصلاح وصيانة أنظمة التبريد"
        },
        description: {
          en: "Emergency diagnostic and spare part replacement for chillers, walk-ins, and industrial compressors.",
          ar: "خدمات تشخيص الأعطال الطارئة واستبدال قطع الغيار للثلاجات الكبيرة والمكثفات والضواغط الصناعية."
        },
        features: [
          { en: "Evaporator coil defrost heater repairs", ar: "إصلاح سخانات إذابة الجليد في المبخر" },
          { en: "Solenoid and expansion valve replacements", ar: "استبدال صمامات التمدد والمحابس الكهربائية" },
          { en: "Lubricating oil testing & filter exchange", ar: "فحص زيت التزييت واستبدال الفلاتر" }
        ],
        applications: [
          { en: "Industrial refrigeration failures", ar: "أعطال التبريد الصناعي الطارئة" },
          { en: "Preventative overhaul visits", ar: "زيارات الصيانة الوقائية الشاملة" }
        ]
      }
    ]
  },
  {
    slug: "building-maintenance",
    title: {
      en: "Building Maintenance & MEP",
      ar: "صيانة المباني والأعمال الكهروميكانيكية"
    },
    description: {
      en: "Comprehensive facility maintenance including electrical, plumbing, painting, and mechanical works for corporate clients.",
      ar: "صيانة شاملة للمنشآت والمباني تشمل أعمال الكهرباء، السباكة، الدهانات، والأعمال الميكانيكية للشركات والمنشآت."
    },
    longDescription: {
      en: "AirPoint delivers end-to-end Mechanical, Electrical, and Plumbing (MEP) solutions. We ensure that commercial assets run efficiently with zero down-time by deploying licensed engineers and technicians across the UAE.",
      ar: "تقدم إير بوينت حلولاً متكاملة للأعمال الميكانيكية والكهربائية والسباكة (MEP). نحن نضمن تشغيل أصولك التجارية بكفاءة عالية وبدون توقف عن العمل من خلال توفير مهندسين وفنيين مرخصين في كافة أنحاء الإمارات."
    },
    iconName: "Wrench",
    items: [
      {
        id: "electrical-works",
        title: {
          en: "Electrical Works",
          ar: "الأعمال الكهربائية"
        },
        description: {
          en: "DB dressing, cabling, load balancing, lighting system setup, and control panel maintenance.",
          ar: "ترتيب وتوزيع لوحات الكهرباء الرئيسي، تمديد الكابلات، موازنة الأحمال، صيانة الإنارة ولوحات التحكم."
        },
        features: [
          { en: "Troubleshooting electrical short circuits", ar: "استكشاف الأعطال وإصلاح التماس الكهربائي" },
          { en: "Circuit breaker and contactor replacement", ar: "استبدال القواطع الكهربائية والكونتاكتورات" },
          { en: "Bilingual compliance audits", ar: "مراجعة سلامة التمددات والامتثال الكهربائي" }
        ],
        applications: [
          { en: "Office fit-outs and warehouses", ar: "تجهيز المكاتب وتمديدات المستودعات" },
          { en: "Commercial building networks", ar: "شبكات الكهرباء للمباني التجارية" }
        ]
      },
      {
        id: "plumbing-works",
        title: {
          en: "Plumbing Works",
          ar: "أعمال السباكة"
        },
        description: {
          en: "Supply line repairs, pump room maintenance, drainage clearing, and sanitary installation.",
          ar: "إصلاح خطوط إمداد المياه، صيانة غرف المضخات، تسليك شبكات الصرف الصحي، وتركيب الأدوات الصحية."
        },
        features: [
          { en: "Booster pump maintenance", ar: "صيانة مضخات تقوية ضغط المياه" },
          { en: "Water tank cleaning & disinfection", ar: "تنظيف وتعقيم خزانات المياه" },
          { en: "Leak detection in structural piping", ar: "كشف تسربات المياه في الأنابيب الهيكلية" }
        ],
        applications: [
          { en: "Commercial washrooms and pantries", ar: "الحمامات ومطابخ التحضير للشركات" },
          { en: "Industrial warehouse utility networks", ar: "شبكات تغذية المياه والصرف في المستودعات" }
        ]
      },
      {
        id: "mechanical-general",
        title: {
          en: "Mechanical & General Maintenance",
          ar: "الأعمال الميكانيكية والصيانة العامة"
        },
        description: {
          en: "Exhaust fan installations, steel fabrication, facility painting, plastering, and general building repairs.",
          ar: "تركيب مراوح الشفط الكبيرة، تصنيع أعمال الحديد، أعمال الدهانات، اللياسة، والترميمات العامة للمباني."
        },
        features: [
          { en: "Premium epoxy floor coatings", ar: "تركيب أرضيات الإيبوكسي عالية المتانة" },
          { en: "Drywall, partitioning & office painting", ar: "تركيب ألواح الجبس والتلوين الداخلي للمكاتب" },
          { en: "Vibration pads and shock absorber setups", ar: "تركيب قواعد عزل الاهتزازات لمكائن المصانع" }
        ],
        applications: [
          { en: "Warehouse refurbishments", ar: "تجديد وتأهيل المستودعات" },
          { en: "Corporate office renovations", ar: "تجديد وتعديل المكاتب والشركات" }
        ]
      }
    ]
  },
  {
    slug: "interior-fitout-services",
    title: {
      en: "Interior, Fit-Out & Finishing Works",
      ar: "أعمال التشطيبات والديكور الداخلي"
    },
    description: {
      en: "Commercial signage, gypsum partitions, interior design, custom woodwork, and electrical fit-out for offices, retail, and industrial facilities across the UAE.",
      ar: "لافتات تجارية، جبس بورد، تصميم داخلي، أعمال خشبية مخصصة، وتمديدات كهربائية للمكاتب والمحلات والمنشآت الصناعية في الإمارات."
    },
    longDescription: {
      en: "AirPoint extends beyond HVAC and MEP with complete interior fit-out capabilities. From illuminated signboards and false ceilings to bespoke wooden joinery and commercial electrical wiring, we deliver turnkey finishing packages for shops, offices, warehouses, and showrooms.",
      ar: "تتجاوز إير بوينت أنظمة التكييف والأعمال الكهروميكانيكية لتقدم حلول تشطيبات داخلية متكاملة. من اللوحات الإعلانية والأسقف المعلقة إلى النجارة الخشبية والتمديدات الكهربائية التجارية، ننفذ باقات تشطيب جاهزة للمحلات والمكاتب والمستودعات وصالات العرض."
    },
    iconName: "Paintbrush",
    items: [
      {
        id: "sign-board-work",
        title: {
          en: "Sign Board Works",
          ar: "أعمال اللوحات الإعلانية"
        },
        description: {
          en: "Design, fabrication, and installation of illuminated shop signs, fascia boards, 3D lettering, and outdoor branding signage for retail and commercial properties.",
          ar: "تصميم وتصنيع وتركيب لوحات المحلات المضيئة، واجهات المباني، حروف ثلاثية الأبعاد، ولافتات العلامة التجارية للمحلات والمنشآت التجارية."
        },
        features: [
          { en: "LED and neon illuminated signboards", ar: "لوحات إعلانية مضيئة LED ونيون" },
          { en: "Weather-resistant outdoor fascia cladding", ar: "واجهات خارجية مقاومة للعوامل الجوية" },
          { en: "Municipality-compliant mounting & cabling", ar: "تركيب وتمديدات متوافقة مع اشتراطات البلدية" }
        ],
        applications: [
          { en: "Retail shops and showrooms", ar: "محلات التجزئة وصالات العرض" },
          { en: "Restaurants, clinics, and offices", ar: "المطاعم والعيادات والمكاتب" }
        ]
      },
      {
        id: "gypsum-board-work",
        title: {
          en: "Gypsum Board Works",
          ar: "أعمال الجبس بورد"
        },
        description: {
          en: "False ceilings, partition walls, bulkheads, and decorative gypsum features for offices, apartments, and commercial interiors with smooth paint-ready finishes.",
          ar: "أسقف معلقة، جدران فاصلة، بنلات ديكورية، وتفاصيل جبسية للمكاتب والشقق والمساحات التجارية بلمسة نهائية جاهزة للدهان."
        },
        features: [
          { en: "Suspended ceiling grid & gypsum board", ar: "شبكات أسقف معلقة وألواح جبس" },
          { en: "Acoustic and moisture-resistant boards", ar: "ألواح عازلة للصوت ومقاومة للرطوبة" },
          { en: "Cove lighting recesses and bulkheads", ar: "حفر إضاءة مخفية وبنلات ديكورية" }
        ],
        applications: [
          { en: "Office fit-outs and meeting rooms", ar: "تجهيز المكاتب وقاعات الاجتماعات" },
          { en: "Retail and hospitality interiors", ar: "المحلات التجارية والضيافة" }
        ]
      },
      {
        id: "interior-designing",
        title: {
          en: "Interior Designing",
          ar: "التصميم الداخلي"
        },
        description: {
          en: "Space planning, material selection, color schemes, and 3D interior concepts for modern residential and commercial environments in the UAE.",
          ar: "تخطيط المساحات، اختيار المواد، تناسق الألوان، ومفاهيم تصميم داخلي ثلاثية الأبعاد للبيئات السكنية والتجارية الحديثة في الإمارات."
        },
        features: [
          { en: "Layout planning & 3D visualization", ar: "تخطيط المساحات وعرض ثلاثي الأبعاد" },
          { en: "Furniture, lighting & finish schedules", ar: "جداول الأثاث والإضاءة والتشطيبات" },
          { en: "Turnkey design-to-execution coordination", ar: "تنسيق متكامل من التصميم حتى التنفيذ" }
        ],
        applications: [
          { en: "Corporate offices and reception areas", ar: "المكاتب الشركات ومناطق الاستقبال" },
          { en: "Villas, apartments, and retail outlets", ar: "الفلل والشقق والمحلات التجارية" }
        ]
      },
      {
        id: "wooden-work",
        title: {
          en: "Wooden Works",
          ar: "الأعمال الخشبية"
        },
        description: {
          en: "Custom carpentry including wardrobes, counters, wall panels, doors, and bespoke joinery for shops, offices, and residential projects.",
          ar: "نجارة مخصصة تشمل الخزائن والكونترات وألواح الحائط والأبواب وأعمال الخشب حسب الطلب للمحلات والمكاتب والمشاريع السكنية."
        },
        features: [
          { en: "Solid wood and MDF custom fabrication", ar: "تصنيع مخصص من الخشب الطبيعي وMDF" },
          { en: "Display counters and shelving systems", ar: "كونترات عرض وأنظمة رفوف" },
          { en: "Premium laminate, veneer & polish finishes", ar: "تشطيبات فاخرة باللامينيت والقشرة والطلاء" }
        ],
        applications: [
          { en: "Retail display and reception desks", ar: "واجهات العرض ومكاتب الاستقبال" },
          { en: "Office cabins and storage units", ar: "مكاتب عازلة ووحدات تخزين" }
        ]
      },
      {
        id: "electric-work",
        title: {
          en: "Electrical Works",
          ar: "الأعمال الكهربائية"
        },
        description: {
          en: "Commercial electrical fit-out including DB installation, power cabling, lighting circuits, socket points, and safety compliance for new and renovated spaces.",
          ar: "تجهيز كهربائي تجاري يشمل لوحات التوزيع، تمديد الكابلات، دوائر الإضاءة، نقاط القوى، والامتثال لمعايير السلامة للمساحات الجديدة والمجددة."
        },
        features: [
          { en: "Distribution board dressing & labeling", ar: "ترتيب لوحات التوزيع والترقيم" },
          { en: "LED lighting and power point installation", ar: "تركيب إضاءة LED ونقاط القوى" },
          { en: "Load testing and civil defense compliance", ar: "فحص الأحمال والامتثال لاشتراطات الدفاع المدني" }
        ],
        applications: [
          { en: "Shop fit-outs and warehouse lighting", ar: "تجهيز المحلات وإضاءة المستودعات" },
          { en: "Office renovations and tenant improvements", ar: "تجديد المكاتب وتحسينات المستأجرين" }
        ]
      }
    ]
  }
];

export const productsList: ProductItem[] = [
  // Compressors
  {
    id: "bitzer-compressor",
    name: { en: "Bitzer Semi-Hermetic Compressor", ar: "ضاغط بيتزر شبه محكم (Bitzer)" },
    category: "compressors",
    brand: "Bitzer",
    description: {
      en: "High-durability reciprocating and screw compressors engineered for commercial refrigeration and walk-in freezers.",
      ar: "ضواغط بيتزر الترددية واللولبية عالية المتانة والمصممة خصيصاً للتبريد التجاري وغرف التجميد الكبيرة."
    },
    features: [
      { en: "High energy efficiency ratios (EER)", ar: "معدلات كفاءة طاقة عالية جداً" },
      { en: "Quiet low-vibration operation", ar: "تشغيل هادئ بأقل نسبة اهتزاز" },
      { en: "Bilingual spare parts availability", ar: "توفر قطع الغيار بسهولة في أسواق الإمارات" }
    ],
    applications: [
      { en: "Large scale cold storage facilities", ar: "مستودعات التبريد الكبيرة" },
      { en: "Supermarket refrigeration systems", ar: "شبكات التبريد في الهايبرماركت" }
    ],
    imageUrl: productImages.bitzerCompressor
  },
  {
    id: "copeland-compressor",
    name: { en: "Copeland Scroll Compressor", ar: "ضاغط كوبلاند الحلزوني (Copeland)" },
    category: "compressors",
    brand: "Copeland",
    description: {
      en: "Industry-standard scroll compressors ideal for split units, VRF systems, and commercial chillers.",
      ar: "الضواغط الحلزونية القياسية الرائدة المناسبة لمكيفات الاسبليت وأنظمة الـ VRF والمبردات المائية."
    },
    features: [
      { en: "Advanced scroll temperature protection", ar: "حماية متقدمة ضد الارتفاع المفاجئ لدرجات الحرارة" },
      { en: "Fewer moving parts for higher reliability", ar: "أجزاء متحركة أقل لموثوقية أطول وعمر أطول" },
      { en: "Optimized for R410A and R22 refrigerants", ar: "متوافق ومحسن لغاز الفريون R410A و R22" }
    ],
    applications: [
      { en: "Commercial AC packages and ducted units", ar: "مكيفات الباكج المركزية والدكت" },
      { en: "Industrial process cooling chillers", ar: "مبردات خطوط الإنتاج والمصانع" }
    ],
    imageUrl: productImages.copelandCompressor
  },
  {
    id: "danfoss-compressor",
    name: { en: "Danfoss Hermetic Reciprocating Compressor", ar: "ضاغط دانفوس المحكم (Danfoss)" },
    category: "compressors",
    brand: "Danfoss",
    description: {
      en: "Robust light-commercial hermetic compressors optimized for deep refrigeration and display showcases.",
      ar: "ضواغط محكمة متينة وموثوقة مثالية للاستخدامات التجارية الخفيفة وثلاجات العرض والتبريد السريع."
    },
    features: [
      { en: "Compact footprint for tight enclosures", ar: "تصميم مدمج للمساحات الضيقة وغرف المحركات الصغير" },
      { en: "Wide operating voltage range (GCC compliant)", ar: "نطاق تشغيل عريض الجهد متوافق مع معايير الخليج" },
      { en: "Exceptional liquid handling capacity", ar: "قدرة فائقة على تحمل دخول سائل التبريد" }
    ],
    applications: [
      { en: "Commercial display chillers", ar: "ثلاجات العرض التجارية للمطاعم" },
      { en: "Under-counter refrigeration systems", ar: "ثلاجات المطابخ أسفل الطاولات" }
    ],
    imageUrl: productImages.danfossCompressor
  },
  {
    id: "embraco-compressor",
    name: { en: "Embraco Refrigeration Compressor", ar: "ضاغط إمبراكو للتبريد (Embraco)" },
    category: "compressors",
    brand: "Embraco",
    description: {
      en: "High-efficiency hermetic compressors for commercial kitchen food cabinets and ice makers.",
      ar: "ضواغط إمبراكو عالية الكفاءة والمخصصة لكبائن الأغذية بالمطابخ التجارية وآلات صنع الثلج."
    },
    features: [
      { en: "Low noise level design", ar: "مستوى ضجيج منخفض جداً أثناء العمل" },
      { en: "Eco-friendly low power consumption", ar: "صديق للبيئة مع استهلاك منخفض جداً للكهرباء" }
    ],
    applications: [
      { en: "Industrial ice-makers", ar: "صانعات الثلج التجارية" },
      { en: "Water coolers and dispensers", ar: "برادات وموزعات مياه الشرب" }
    ],
    imageUrl: productImages.embracoCompressor
  },
  {
    id: "tecumseh-compressor",
    name: { en: "Tecumseh Piston Compressor", ar: "ضاغط تيكومسيه المكبسي (Tecumseh)" },
    category: "compressors",
    brand: "Tecumseh",
    description: {
      en: "Classic heavy-duty reciprocating compressors designed for extreme tropical climates.",
      ar: "الضواغط الترددية القوية الكلاسيكية المصممة للعمل في الظروف المناخية الاستوائية والمدارية الشديدة الحرارة."
    },
    features: [
      { en: "High starting torque motors", ar: "محركات ذات عزم دوران بدئي عالٍ جداً" },
      { en: "Excellent thermal insulation protection", ar: "حماية عزل حراري ممتازة ضد الحرارة المرتفعة" }
    ],
    applications: [
      { en: "Cold room condensing units", ar: "وحدات التكثيف لغرف التبريد" },
      { en: "Air dryers and cooling industrial racks", ar: "مجففات الهواء ووحدات التبريد الصناعي" }
    ],
    imageUrl: productImages.tecumsehCompressor
  },
  {
    id: "bock-compressor",
    name: { en: "BOCK Semi-Hermetic Compressor", ar: "ضاغط بوك الألماني (BOCK)" },
    category: "compressors",
    brand: "BOCK",
    description: {
      en: "Premium German engineered compressors famous for reliable operation in transportation cooling and heavy industries.",
      ar: "ضواغط ألمانية ممتازة مشهورة عالمياً بالموثوقية العالية في تبريد شاحنات النقل والصناعات الثقيلة."
    },
    features: [
      { en: "Unique oil pump lubrication system", ar: "نظام تزييت متفرد بمضخة زيت مدمجة" },
      { en: "Interchangeable spare components", ar: "قطع غيار داخلية قابلة للاستبدال والتبديل" }
    ],
    applications: [
      { en: "Refrigerated trucks and logistics containers", ar: "الشاحنات المبردة وحاويات نقل الأغذية" },
      { en: "Marine air conditioning and chillers", ar: "أنظمة التكييف والمبردات البحرية" }
    ],
    imageUrl: productImages.bockCompressor
  },
  // Controls & Valves
  {
    id: "danfoss-valves",
    name: { en: "Danfoss Expansion & Solenoid Valves", ar: "صمامات التمدد والمحابس الكهربائية من دانفوس" },
    category: "controls",
    brand: "Danfoss",
    description: {
      en: "Thermostatic expansion valves and solenoid valves regulating refrigerant flow with maximum accuracy.",
      ar: "صمامات التمدد الحراري والمحابس الكهربائية لتنظيم وضبط تدفق سائل التبريد بدقة متناهية داخل النظام."
    },
    features: [
      { en: "Stainless steel internal orifices", ar: "فوهات داخلية من الفولاذ المقاوم للصدأ (ستانلس ستيل)" },
      { en: "Laser welded diaphragm components", ar: "أجزاء داخلية ملحومة بالليزر لمنع التسريب" }
    ],
    applications: [
      { en: "Cold room evaporator flow control", ar: "التحكم في تدفق سائل التبريد بمبخرات غرف التبريد" },
      { en: "Commercial AC unit refrigerant regulation", ar: "ضبط تدفق الغاز في مكيفات الباكج الكبيرة" }
    ],
    imageUrl: productImages.danfossValves
  },
  {
    id: "honeywell-controllers",
    name: { en: "Honeywell Thermostats & Controls", ar: "ترموستات وأجهزة تحكم هانيويل (Honeywell)" },
    category: "controls",
    brand: "Honeywell",
    description: {
      en: "Smart digital thermostats and HVAC control processors for temperature and pressure management.",
      ar: "أجهزة الترموستات الرقمية الذكية ومعالجات التحكم في التكييف لإدارة درجات الحرارة والضغط."
    },
    features: [
      { en: "Microprocessor-based control systems", ar: "أنظمة تحكم مبنية على المعالجات الدقيقة" },
      { en: "Digital LCD readings & Modbus support", ar: "قراءات رقمية واضحة ودعم بروتوكول Modbus للمباني" }
    ],
    applications: [
      { en: "Centralized Building Management Systems (BMS)", ar: "أنظمة إدارة المباني المركزية (BMS)" },
      { en: "Fan coil unit (FCU) control", ar: "التحكم في وحدات الفان كويل بالمكاتب" }
    ],
    imageUrl: productImages.honeywellControllers
  },
  {
    id: "filter-driers",
    name: { en: "Filter Driers & Pressure Controls", ar: "فلاتر التجفيف ومفاتيح التحكم بالضغط" },
    category: "controls",
    brand: "Alco / Danfoss",
    description: {
      en: "Premium refrigeration line accessories designed to eliminate moisture, acid, and protect against abnormal pressures.",
      ar: "ملحقات شبكة التبريد الفاخرة المصممة للتخلص من الرطوبة والأحماض وحماية النظام من الضغط المرتفع والمنخفض."
    },
    features: [
      { en: "High moisture adsorption capacity cores", ar: "قوالب امتصاص رطوبة عالية القدرة" },
      { en: "Dual pressure switches (HP/LP controls)", ar: "مفاتيح ضغط مزدوجة (تحكم بالضغط العالي والمنخفض)" }
    ],
    applications: [
      { en: "Liquid line protection for all compressors", ar: "حماية خط السائل لجميع أنواع ضواغط التبريد" },
      { en: "Safety shut-off systems", ar: "أنظمة الإغلاق الآمن في حالات الطوارئ" }
    ],
    imageUrl: productImages.filterDriers
  },
  // Gases
  {
    id: "refrigerant-gas-r410a",
    name: { en: "Refrigerant Gas R410A (Original)", ar: "غاز فريون R410A الأصلي" },
    category: "refrigerants",
    brand: "DuPont / Honeywell / Floron",
    description: {
      en: "High-quality, eco-friendly refrigerant gas for modern split ACs, ducted units, and VRF systems.",
      ar: "غاز فريون عالي الجودة صديق للبيئة مناسب لمكيفات الهواء الحديثة الاسبليت وأنظمة الدكت والـ VRF."
    },
    features: [
      { en: "Zero ozone depletion potential", ar: "صديق لطبقة الأوزون تماماً" },
      { en: "Higher heat carrying capacity than R22", ar: "سعة نقل حرارية أعلى مقارنة بفريون R22 القديم" }
    ],
    applications: [
      { en: "New age home and office AC recharge", ar: "تعبئة المكيفات المنزلية والمكتبية الحديثة" },
      { en: "VRF commercial systems commissioning", ar: "تشغيل وصيانة أنظمة التكييف المركزي VRF" }
    ],
    imageUrl: productImages.refrigerantGasR410a
  },
  {
    id: "refrigerant-gas-r134a",
    name: { en: "Refrigerant Gas R134A", ar: "غاز فريون R134A" },
    category: "refrigerants",
    brand: "Honeywell / Maflex",
    description: {
      en: "Classic refrigerant gas designed specifically for positive temperature chillers and automotive AC systems.",
      ar: "غاز التبريد الكلاسيكي المصمم خصيصاً للثلاجات ومبردات المياه ذات درجات الحرارة الموجبة ومكيفات السيارات."
    },
    features: [
      { en: "Stable thermodynamic properties", ar: "خصائص حرارية مستقرة وثابتة في درجات الحرارة العالية" },
      { en: "Compatible with PAG and POE lubricants", ar: "متوافق تماماً مع زيوت التزييت من نوع POE و PAG" }
    ],
    applications: [
      { en: "Domestic and commercial refrigerators", ar: "الثلاجات المنزلية والتجارية ومبردات المياه" },
      { en: "Mobile automotive climate controls", ar: "صيانة وتعبئة مكيفات المركبات والسيارات" }
    ],
    imageUrl: productImages.refrigerantGasR134a
  }
];

export const projectsList: ProjectItem[] = [
  {
    id: "cold-storage-warehouse-jebel-ali",
    title: {
      en: "Industrial Cold Storage Plant - Jebel Ali",
      ar: "محطة تبريد ومستودع تخزين صناعي - جبل علي"
    },
    category: { en: "Cold Room Installation", ar: "تركيب غرف تبريد صناعية" },
    description: {
      en: "Design and installation of a 15,000 sq ft multi-temperature logistics warehouse using Bitzer rack systems.",
      ar: "تصميم وتركيب مستودع لوجستي متعدد درجات الحرارة بمساحة 15,000 قدم مربع باستخدام أنظمة ضواغط بيتزر المتعددة."
    },
    location: { en: "Jebel Ali Industrial Area, Dubai", ar: "منطقة جبل علي الصناعية، دبي" },
    client: { en: "Global Food Logistics Group", ar: "مجموعة الخدمات اللوجستية للأغذية العالمية" },
    year: "2025",
    scope: [
      { en: "Installation of 120mm Polyurethane panels", ar: "تركيب ألواح عزل البولي يوريثان بسماكة 120 مم" },
      { en: "Setup of semi-hermetic compressor racks", ar: "تجهيز وتوصيل شبكة ضواغط بيتزر شبه المحكمة" },
      { en: "Integration of smart backup cooling control", ar: "توصيل وبرمجة لوحة تحكم ذكية للتبديل الاحتياطي" }
    ],
    imageUrl: projectImages.coldStorageWarehouse
  },
  {
    id: "commercial-tower-chiller-overhaul",
    title: {
      en: "AC Chiller Overhaul & AMC - Business Bay",
      ar: "عمرة مبردات مياه وصيانة سنوية - الخليج التجاري"
    },
    category: { en: "HVAC Maintenance & AMC", ar: "صيانة المكيفات وعقود AMC" },
    description: {
      en: "Complete restoration of two 500-Ton centrifugal water chillers and implementation of an annual maintenance contract.",
      ar: "صيانة وإصلاح شامل لمبردي مياه مركزيين بقوة 500 طن، وتوقيع عقد صيانة سنوي شامل."
    },
    location: { en: "Business Bay, Dubai", ar: "الخليج التجاري، دبي" },
    client: { en: "Al Sahel Properties Group", ar: "مجموعة الساحل العقارية" },
    year: "2025",
    scope: [
      { en: "Condenser tube descaling and chemical cleaning", ar: "تنظيف وإزالة ترسبات أنابيب المكثف كيميائياً" },
      { en: "Microprocessor controller board calibration", ar: "معايرة لوحة التحكم ذات المعالج الدقيق" },
      { en: "Bilingual quarterly preventive audit logs", ar: "مراجعة وتسجيل سجلات الفحص الوقائية ربع السنوية بلغتين" }
    ],
    imageUrl: projectImages.chillerOverhaul
  },
  {
    id: "logistics-hub-building-mep",
    title: {
      en: "MEP & General Facility Maintenance - Al Quoz",
      ar: "أعمال الكهروميكانيك والصيانة العامة للمنشآت - القوز"
    },
    category: { en: "Building Maintenance & MEP", ar: "صيانة المباني والأعمال الكهروميكانيكية" },
    description: {
      en: "Preventative facility maintenance contract covering electrical distribution, plumbing system repairs, and interior repaint.",
      ar: "عقد صيانة دورية للمرافق يشمل صيانة وتوزيع لوحات الكهرباء وإصلاح شبكة المياه والسباكة والطلاء الداخلي."
    },
    location: { en: "Al Quoz Industrial Area, Dubai", ar: "منطقة القوز الصناعية، دبي" },
    client: { en: "Express Logistics UAE", ar: "شركة إكسبريس للخدمات اللوجستية" },
    year: "2024",
    scope: [
      { en: "Cabling and DB board load re-balancing", ar: "ترتيب كابلات الكهرباء وإعادة موازنة أحمال اللوحات" },
      { en: "High-pressure drain line flushing and pump servicing", ar: "غسيل خطوط الصرف بالضغط العالي وصيانة المضخات" },
      { en: "Epoxy floor painting for mechanical workshop", ar: "طلاء أرضية الإيبوكسي المقاوم للزيوت لورشة الصيانة" }
    ],
    imageUrl: projectImages.mepMaintenance
  }
];
