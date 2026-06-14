"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { ProductItem } from "@/config/siteData";

interface CartItem {
  product: ProductItem;
  quantity: number;
}

interface QuoteCartContextType {
  cartItems: CartItem[];
  addToCart: (product: ProductItem, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const QuoteCartContext = createContext<QuoteCartContextType | undefined>(undefined);

const getStoredCartItems = (): CartItem[] => {
  if (typeof window === "undefined") return [];

  const stored = window.localStorage.getItem("airpoint_quote_cart");
  if (!stored) return [];

  try {
    return JSON.parse(stored) as CartItem[];
  } catch (error) {
    console.error("Failed to parse cart", error);
    return [];
  }
};

export function QuoteCartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setCartItems(getStoredCartItems());
  }, []);

  useEffect(() => {
    window.localStorage.setItem("airpoint_quote_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: ProductItem, quantity = 1) => {
    const safeQuantity = Math.max(1, Math.floor(quantity));

    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + safeQuantity }
            : item
        );
      }
      return [...prev, { product, quantity: safeQuantity }];
    });
    setIsOpen(true);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    const safeQuantity = Math.floor(quantity);

    if (safeQuantity <= 0) {
      setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
      return;
    }

    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity: safeQuantity } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <QuoteCartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </QuoteCartContext.Provider>
  );
}

export function useQuoteCart() {
  const context = useContext(QuoteCartContext);
  if (!context) {
    throw new Error("useQuoteCart must be used within a QuoteCartProvider");
  }
  return context;
}
