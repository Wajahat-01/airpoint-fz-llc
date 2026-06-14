"use client";

import React, { useState } from "react";
import { X, Trash2, Send, ShoppingBag, Minus, Plus } from "lucide-react";
import WhatsAppIcon from "@/components/layout/WhatsAppIcon";
import { useQuoteCart } from "@/context/QuoteCartContext";
import { useTranslation } from "@/hooks/useTranslation";
import { LocaleType } from "@/config/translations";
import { layout } from "@/config/layout";
import { companyInfo, getWhatsAppHref } from "@/config/siteData";

export default function QuoteDrawer({ locale }: { locale: LocaleType }) {
  const { cartItems, isOpen, setIsOpen, updateQuantity, removeFromCart, clearCart } = useQuoteCart();
  const { t, resolve, isRtl } = useTranslation(locale);
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const generateQuoteText = () => {
    const itemList = cartItems
      .map((item) => `- ${resolve(item.product.name)} (x${item.quantity}) [Brand: ${item.product.brand}]`)
      .join("\n");
      
    return locale === "ar"
      ? `طلب تسعير قطع غيار - إير بوينت\n\nالاسم: ${formData.name}\nالهاتف: ${formData.phone}\nالبريد الإلكتروني: ${formData.email}\n\nالقطع المطلوبة:\n${itemList}`
      : `Spare Parts Quote Request - AirPoint\n\nName: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\n\nRequested Parts:\n${itemList}`;
  };

  const submitToWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert(locale === "ar" ? "يرجى ملء الاسم ورقم الهاتف" : "Please fill in Name and Phone number");
      return;
    }
    const text = generateQuoteText();
    const url = getWhatsAppHref(text);
    window.open(url, "_blank");
    clearCart();
    setIsOpen(false);
  };

  const submitToEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert(locale === "ar" ? "يرجى ملء الاسم ورقم الهاتف" : "Please fill in Name and Phone number");
      return;
    }
    const body = generateQuoteText();
    const subject = locale === "ar" ? "طلب تسعير قطع غيار - إير بوينت" : "Spare Parts Quote Request - AirPoint";
    const mailto = `mailto:${companyInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    clearCart();
    setIsOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-brand-dark/80 backdrop-blur-sm transition-opacity"
        onClick={() => setIsOpen(false)}
      />

      <div
        className={`absolute inset-y-0 ${layout.drawerPanel} bg-brand-card border-white/5 shadow-2xl flex flex-col safe-area-bottom ${
          isRtl ? "left-0 border-r" : "right-0 border-l"
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-brand-cyan" />
            <h2 className="font-outfit font-bold text-lg text-white">
              {t("quoteCart")}
            </h2>
            <span className="px-2 py-0.5 rounded-full bg-brand-cyan/15 text-brand-cyan text-xs font-semibold">
              {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
            </span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-10">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center border border-white/5">
                <ShoppingBag className="w-8 h-8 text-slate-500" />
              </div>
              <p className="text-sm text-slate-400 max-w-[250px] leading-relaxed">
                {t("quoteCartEmpty")}
              </p>
            </div>
          ) : (
            <>
              {/* Item List */}
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.product.id}
                    className="quote-cart-item p-3.5 rounded-lg bg-brand-blue/30 border border-white/5 flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0 flex-1 basis-full sm:basis-auto">
                      <h4 className="font-outfit font-semibold text-sm text-white truncate">
                        {resolve(item.product.name)}
                      </h4>
                      <p className="text-xs text-brand-gold mt-0.5">
                        {item.product.brand}
                      </p>
                    </div>

                    <div className="quote-cart-item-actions flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-md border border-white/10 bg-white/5 hover:border-brand-cyan/40 text-white flex items-center justify-center transition-all"
                        aria-label={isRtl ? "تقليل الكمية" : "Decrease quantity"}
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center text-sm font-outfit font-bold text-white">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-md border border-white/10 bg-white/5 hover:border-brand-cyan/40 text-white flex items-center justify-center transition-all"
                        aria-label={isRtl ? "زيادة الكمية" : "Increase quantity"}
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-1.5 rounded-md hover:bg-white/5 text-slate-400 hover:text-rose-400 transition-all shrink-0"
                      title={t("removeFromCart")}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Inquiry Form */}
              <form className="space-y-4 border-t border-white/5 pt-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    {t("fieldName")} *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-brand-dark border border-white/10 text-white text-sm focus:border-brand-cyan/50 focus:outline-none transition-all"
                    placeholder={locale === "ar" ? "مثال: مؤسسة النور للتجارة" : "e.g. Al Noor Logistics"}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    {t("fieldPhone")} *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-brand-dark border border-white/10 text-white text-sm focus:border-brand-cyan/50 focus:outline-none transition-all"
                    placeholder="+971 5X XXX XXXX"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    {t("fieldEmail")}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-brand-dark border border-white/10 text-white text-sm focus:border-brand-cyan/50 focus:outline-none transition-all"
                    placeholder="name@company.com"
                  />
                </div>

                {/* Submissions */}
                <div className="space-y-3 pt-2">
                  <button
                    onClick={submitToWhatsApp}
                    type="submit"
                    className="w-full py-3 rounded-lg bg-brand-green hover:bg-brand-green/90 text-white font-outfit font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md wa-pulse-button"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                    <span>{t("sendCartWhatsApp")}</span>
                  </button>

                  <button
                    onClick={submitToEmail}
                    type="submit"
                    className="w-full py-3 rounded-lg bg-brand-cyan hover:bg-brand-cyan/90 text-brand-dark font-outfit font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md"
                  >
                    <Send className="w-4 h-4" />
                    <span>{t("sendCartEmail")}</span>
                  </button>
                  
                  <button
                    type="button"
                    onClick={clearCart}
                    className="w-full py-2 text-center text-xs text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {t("clearCart")}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
