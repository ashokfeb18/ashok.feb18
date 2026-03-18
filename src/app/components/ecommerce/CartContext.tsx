import React, { createContext, useContext, useState, useCallback } from "react";
import type { Product } from "./mockData";

export interface CartItem {
  productId: string;
  product: Product;
  quantity: number;
  packSize: string;
  shade?: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity: number, packSize: string, shade?: string) => void;
  updateQuantity: (productId: string, packSize: string, quantity: number) => void;
  removeItem: (productId: string, packSize: string) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  savedItems: CartItem[];
  saveForLater: (productId: string, packSize: string) => void;
  moveToCart: (productId: string, packSize: string) => void;
}

const CartContext = createContext<CartContextType | null>(null);

// Pre-populate with 3 demo items
import { PRODUCTS } from "./mockData";

const INITIAL_ITEMS: CartItem[] = [
  { productId: "p001", product: PRODUCTS[0], quantity: 3, packSize: "10L", shade: "Ivory White" },
  { productId: "p003", product: PRODUCTS[2], quantity: 5, packSize: "4L", shade: "Cream Bliss" },
  { productId: "p004", product: PRODUCTS[3], quantity: 2, packSize: "1L", shade: "Arctic White" },
];

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(INITIAL_ITEMS);
  const [savedItems, setSavedItems] = useState<CartItem[]>([]);

  const addToCart = useCallback((product: Product, quantity: number, packSize: string, shade?: string) => {
    setItems(prev => {
      const existing = prev.find(i => i.productId === product.id && i.packSize === packSize);
      if (existing) {
        return prev.map(i =>
          i.productId === product.id && i.packSize === packSize
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...prev, { productId: product.id, product, quantity, packSize, shade }];
    });
  }, []);

  const updateQuantity = useCallback((productId: string, packSize: string, quantity: number) => {
    if (quantity <= 0) {
      setItems(prev => prev.filter(i => !(i.productId === productId && i.packSize === packSize)));
    } else {
      setItems(prev =>
        prev.map(i =>
          i.productId === productId && i.packSize === packSize ? { ...i, quantity } : i
        )
      );
    }
  }, []);

  const removeItem = useCallback((productId: string, packSize: string) => {
    setItems(prev => prev.filter(i => !(i.productId === productId && i.packSize === packSize)));
  }, []);

  const saveForLater = useCallback((productId: string, packSize: string) => {
    const item = items.find(i => i.productId === productId && i.packSize === packSize);
    if (item) {
      setItems(prev => prev.filter(i => !(i.productId === productId && i.packSize === packSize)));
      setSavedItems(prev => [...prev, item]);
    }
  }, [items]);

  const moveToCart = useCallback((productId: string, packSize: string) => {
    const item = savedItems.find(i => i.productId === productId && i.packSize === packSize);
    if (item) {
      setSavedItems(prev => prev.filter(i => !(i.productId === productId && i.packSize === packSize)));
      addToCart(item.product, item.quantity, item.packSize, item.shade);
    }
  }, [savedItems, addToCart]);

  const clearCart = useCallback(() => setItems([]), []);

  const cartTotal = items.reduce((sum, item) => {
    const ps = item.product.packSizes.find(p => p.size === item.packSize);
    return sum + (ps ? ps.dealerPrice * item.quantity : 0);
  }, 0);

  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, updateQuantity, removeItem, clearCart, cartTotal, cartCount, savedItems, saveForLater, moveToCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
