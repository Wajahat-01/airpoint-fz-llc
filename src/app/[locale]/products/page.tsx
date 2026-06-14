"use client";

import React, { useState, useTransition } from "react";
import { Search, ShoppingBag, Plus, Filter } from "lucide-react";
import WhatsAppIcon from "@/components/layout/WhatsAppIcon";
import { useTranslation } from "@/hooks/useTranslation";
import { LocaleType } from "@/config/translations";
import { layout } from "@/config/layout";
import { productsList, getWhatsAppHref } from "@/config/siteData";
import { useQuoteCart } from "@/context/QuoteCartContext";

export default function ProductsPage({
  params,
}: {
  params: Promise<{ locale: LocaleType }>;
}) {
  // Unwrapping params using React.use() or resolving via local state in client component
  const { locale } = React.use(params);
  const { t, resolve, isRtl } = useTranslation(locale);
  const { addToCart, cartItems } = useQuoteCart();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [isPending, startTransition] = useTransition();

  // Extract unique brands for filtering
  const brands = ["all", ...Array.from(new Set(productsList.map((p) => p.brand)))];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCategorySelect = (category: string) => {
    startTransition(() => {
      setSelectedCategory(category);
    });
  };

  const handleBrandSelect = (brand: string) => {
    startTransition(() => {
      setSelectedBrand(brand);
    });
  };

  const filteredProducts = productsList.filter((product) => {
    const nameMatch = resolve(product.name).toLowerCase().includes(searchQuery.toLowerCase());
    const brandMatch = product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const descMatch = resolve(product.description).toLowerCase().includes(searchQuery.toLowerCase());
    const searchMatch = nameMatch || brandMatch || descMatch;

    const categoryMatch = selectedCategory === "all" || product.category === selectedCategory;
    const finalBrandMatch = selectedBrand === "all" || product.brand === selectedBrand;

    return searchMatch && categoryMatch && finalBrandMatch;
  });

  const getCartQuantity = (productId: string) => {
    return cartItems.find((item) => item.product.id === productId)?.quantity ?? 0;
  };

  const handleAddToQuote = (product: (typeof productsList)[number]) => {
    addToCart(product);
  };

  return (
    <div className={`${layout.container} py-8 sm:py-12 ${layout.pageStackTight}`}>
      {/* Page Header */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-xs text-brand-cyan font-semibold uppercase tracking-wider">
          {isRtl ? "تداول وتوزيع قطع غيار أصلية" : "Genuine Spare Parts Inventory"}
        </div>
        <h1 className="font-outfit font-black text-3xl sm:text-5xl text-white tracking-tight leading-tight">
          {t("productsOverview")}
        </h1>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
          {isRtl
            ? "تصفح مجموعتنا الواسعة من ضواغط التبريد، صمامات التدفق، غازات الفريون الأصلية وأجهزة التحكم الرقمية المعتمدة في الإمارات."
            : "Explore our warehouse stock of compressors, regulators, solenoid valves, sensors, and original refrigerant gases."}
        </p>
      </section>

      {/* Filters & Search Row */}
      <div className="glass-panel p-6 rounded-2xl border-white/5 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          
          {/* Search Input */}
          <div className="md:col-span-6 relative">
            <Search className="absolute left-3 top-3.5 w-4 h-4 text-slate-500 rtl:left-auto rtl:right-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder={t("searchPlaceholder")}
              className="w-full pl-10 pr-4 py-3 rtl:pl-4 rtl:pr-10 rounded-xl bg-brand-dark border border-white/10 text-white text-sm focus:border-brand-cyan/50 focus:outline-none transition-all"
            />
          </div>

          {/* Category Tabs */}
          <div className="md:col-span-6 flex flex-wrap gap-2 justify-start md:justify-end">
            {[
              { id: "all", label: t("categoryAll") },
              { id: "compressors", label: t("catCompressors") },
              { id: "controls", label: t("catControls") },
              { id: "refrigerants", label: t("catRefrigerants") },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleCategorySelect(tab.id)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all border ${
                  selectedCategory === tab.id
                    ? "bg-brand-cyan border-brand-cyan text-brand-dark"
                    : "bg-white/5 border-white/5 text-slate-300 hover:border-white/15"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

        </div>

        {/* Brand Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 border-t border-white/5 pt-4">
          <span className="text-xs text-slate-500 font-semibold flex items-center gap-1.5 mr-2 rtl:mr-0 rtl:ml-2">
            <Filter className="w-3.5 h-3.5" />
            <span>{isRtl ? "التصفية حسب الماركة:" : "Filter by Brand:"}</span>
          </span>

          {brands.map((brand) => (
            <button
              key={brand}
              onClick={() => handleBrandSelect(brand)}
              className={`px-3 py-1 rounded-md text-[10px] sm:text-xs font-semibold uppercase tracking-wider transition-all ${
                selectedBrand === brand
                  ? "bg-brand-gold border border-brand-gold text-brand-dark"
                  : "bg-white/5 border border-white/5 text-slate-400 hover:text-white"
              }`}
            >
              {brand === "all" ? t("productsFilterAll") : brand}
            </button>
          ))}
        </div>
      </div>

      {/* Grid listing */}
      {isPending ? (
        <div className="py-20 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-brand-cyan border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="py-20 text-center text-slate-500 text-sm">
          {isRtl ? "لم يتم العثور على قطع غيار تطابق بحثك." : "No spare parts match your filters."}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const waInquiryText = locale === "ar"
              ? `مرحباً إير بوينت، أرغب في الحصول على تسعيرة للقطعة التالية:\n- الموديل: ${resolve(product.name)} (العلامة التجارية: ${product.brand})`
              : `Hi AirPoint, I would like to get a price quotation for:\n- Model: ${resolve(product.name)} (Brand: ${product.brand})`;
            const waInquiryUrl = getWhatsAppHref(waInquiryText);

            const cartQuantity = getCartQuantity(product.id);

            return (
              <div
                key={product.id}
                className="glass-panel rounded-2xl overflow-hidden border-white/5 flex flex-col justify-between hover:border-brand-cyan/20 transition-all shadow-md group relative"
              >
                {/* Image / Icon container */}
                <div className="h-48 bg-brand-blue/15 border-b border-white/5 flex items-center justify-center p-0 relative overflow-hidden">
                  {product.imageUrl ? (
                    <>
                      <img
                        src={product.imageUrl}
                        alt={resolve(product.name)}
                        className="w-full h-full object-cover opacity-75 group-hover:opacity-90 transition-opacity"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/50 to-transparent" />
                    </>
                  ) : (
                    <ShoppingBag className="w-16 h-16 text-brand-cyan/35" />
                  )}
                  
                  {/* Category & Brand tags */}
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-center text-[9px] font-bold uppercase tracking-widest pointer-events-none">
                    <span className="px-2 py-0.5 rounded bg-brand-cyan/80 backdrop-blur-sm text-brand-dark">
                      {product.category}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-brand-dark/70 backdrop-blur-sm text-brand-gold border border-brand-gold/30">
                      {product.brand}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                  
                  {/* Title & Desc */}
                  <div className="space-y-3">
                    <h3 className="font-outfit font-black text-lg text-white group-hover:text-brand-cyan transition-colors">
                      {resolve(product.name)}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                      {resolve(product.description)}
                    </p>

                    {/* Features list */}
                    <div className="space-y-1.5 pt-2">
                      <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">
                        {t("specifications")}
                      </span>
                      {product.features.slice(0, 2).map((feat, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-300">
                          <div className="w-1 h-1 rounded-full bg-brand-cyan shrink-0"></div>
                          <span className="truncate">{resolve(feat)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-white/5 pt-4">
                    
                    {/* Add to Cart Quote */}
                    <button
                      onClick={() => handleAddToQuote(product)}
                      className="py-2.5 rounded-lg font-outfit font-bold text-xs flex items-center justify-center gap-1.5 transition-all bg-brand-blue/30 hover:bg-brand-blue/50 text-white border border-white/10 hover:border-brand-cyan cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>
                        {cartQuantity > 0
                          ? `${t("addToCart")} (${cartQuantity})`
                          : t("addToCart")}
                      </span>
                    </button>

                    {/* Direct WhatsApp Quote */}
                    <a
                      href={waInquiryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 rounded-lg bg-brand-green hover:bg-brand-green/90 text-white font-outfit font-bold text-xs flex items-center justify-center gap-1.5 transition-all wa-pulse-button"
                    >
                      <WhatsAppIcon className="w-3.5 h-3.5" />
                      <span>{isRtl ? "طلب سعر" : "Get Price"}</span>
                    </a>

                  </div>

                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
