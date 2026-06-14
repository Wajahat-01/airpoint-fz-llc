import { serviceImages } from "@/config/assets";
import {
  productsList,
  serviceCategories,
  TranslationText,
} from "@/config/siteData";

export type HeroSlideType = "service" | "product";

export interface HeroSlide {
  id: string;
  type: HeroSlideType;
  imageUrl: string;
  kicker: TranslationText;
  title: TranslationText;
  subtitle: TranslationText;
  linkPath: string;
}

const productKicker: TranslationText = {
  en: "Genuine Spare Parts",
  ar: "قطع غيار أصلية",
};

function buildServiceSlides(): HeroSlide[] {
  const slides: HeroSlide[] = [];

  for (const category of serviceCategories) {
    for (const item of category.items) {
      const imageUrl = serviceImages[item.id];
      if (!imageUrl) continue;

      slides.push({
        id: `service-${item.id}`,
        type: "service",
        imageUrl,
        kicker: category.title,
        title: item.title,
        subtitle: item.description,
        linkPath: `/services#${category.slug}`,
      });
    }
  }

  return slides;
}

function buildProductSlides(): HeroSlide[] {
  return productsList
    .filter((product) => Boolean(product.imageUrl))
    .map((product) => ({
      id: `product-${product.id}`,
      type: "product",
      imageUrl: product.imageUrl,
      kicker: productKicker,
      title: product.name,
      subtitle: product.description,
      linkPath: "/products",
    }));
}

function interleaveSlides(a: HeroSlide[], b: HeroSlide[]): HeroSlide[] {
  const merged: HeroSlide[] = [];
  const count = Math.max(a.length, b.length);

  for (let i = 0; i < count; i++) {
    if (i < a.length) merged.push(a[i]);
    if (i < b.length) merged.push(b[i]);
  }

  return merged;
}

/** Home hero slides sourced from Services + Spare Parts catalog images */
export const heroSlides = interleaveSlides(buildServiceSlides(), buildProductSlides());

export const HERO_SLIDE_INTERVAL_MS = 5000;
