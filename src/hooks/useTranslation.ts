import { translations, LocaleType } from "@/config/translations";
import { TranslationText } from "@/config/siteData";

export function useTranslation(locale: LocaleType) {
  const dict = translations[locale] || translations.en;

  const t = (key: keyof typeof translations.en): string => {
    return dict[key] || translations.en[key] || "";
  };

  const resolve = (textObj: TranslationText | undefined): string => {
    if (!textObj) return "";
    return textObj[locale] || textObj.en || "";
  };

  const isRtl = locale === "ar";

  return { t, resolve, isRtl, locale };
}
