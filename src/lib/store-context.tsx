"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  description: string;
  sizes?: string[];
  colors?: { name: string; hex: string }[];
  inStock: boolean;
  tags?: string[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

interface StoreContextType {
  cart: CartItem[];
  wishlist: string[];
  addToCart: (product: Product, quantity?: number, size?: string, color?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  toggleWishlist: (productId: string) => void;
  cartTotal: number;
  cartCount: number;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const products: Product[] = [
  {
    id: "1",
    name: "Merino Wool Overcoat",
    price: 389,
    originalPrice: 520,
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&q=80",
    category: "Outerwear",
    rating: 4.9,
    reviews: 124,
    description: "Luxurious Italian merino wool overcoat with satin lining. Perfect for cold weather elegance.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Charcoal", hex: "#36454F" },
      { name: "Camel", hex: "#C19A6B" },
      { name: "Navy", hex: "#000080" },
    ],
    inStock: true,
    tags: ["New Arrival", "Best Seller"],
  },
  {
    id: "2",
    name: "Cashmere Turtleneck",
    price: 245,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80",
    category: "Knitwear",
    rating: 4.8,
    reviews: 89,
    description: "Ultra-soft 100% cashmere turtleneck sweater. Timeless design meets exceptional comfort.",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Cream", hex: "#FFFDD0" },
      { name: "Black", hex: "#000000" },
      { name: "Burgundy", hex: "#800020" },
    ],
    inStock: true,
    tags: ["Premium"],
  },
  {
    id: "3",
    name: "Tailored Wool Trousers",
    price: 195,
    originalPrice: 260,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80",
    category: "Bottoms",
    rating: 4.7,
    reviews: 156,
    description: "Impeccably tailored wool blend trousers with a modern slim fit.",
    sizes: ["28", "30", "32", "34", "36"],
    colors: [
      { name: "Charcoal", hex: "#36454F" },
      { name: "Navy", hex: "#000080" },
      { name: "Sand", hex: "#C2B280" },
    ],
    inStock: true,
  },
  {
    id: "4",
    name: "Silk Blend Blazer",
    price: 425,
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80",
    category: "Blazers",
    rating: 4.9,
    reviews: 67,
    description: "Refined silk-wool blend blazer with hand-stitched lapels.",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Midnight", hex: "#191970" },
      { name: "Forest", hex: "#228B22" },
    ],
    inStock: true,
    tags: ["Exclusive"],
  },
  {
    id: "5",
    name: "Cotton Poplin Shirt",
    price: 125,
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80",
    category: "Shirts",
    rating: 4.6,
    reviews: 203,
    description: "Crisp Egyptian cotton poplin shirt with mother-of-pearl buttons.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Light Blue", hex: "#ADD8E6" },
      { name: "Pink", hex: "#FFC0CB" },
    ],
    inStock: true,
  },
  {
    id: "6",
    name: "Leather Chelsea Boots",
    price: 345,
    originalPrice: 420,
    image: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=600&q=80",
    category: "Footwear",
    rating: 4.8,
    reviews: 178,
    description: "Hand-crafted Italian leather Chelsea boots with Goodyear welt construction.",
    sizes: ["7", "8", "9", "10", "11", "12"],
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "Cognac", hex: "#834333" },
    ],
    inStock: true,
    tags: ["Handcrafted"],
  },
  {
    id: "7",
    name: "Linen Summer Suit",
    price: 495,
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&q=80",
    category: "Suits",
    rating: 4.7,
    reviews: 45,
    description: "Breathable pure linen suit perfect for summer occasions.",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Natural", hex: "#FAF0E6" },
      { name: "Sky Blue", hex: "#87CEEB" },
    ],
    inStock: true,
    tags: ["Seasonal"],
  },
  {
    id: "8",
    name: "Leather Belt",
    price: 85,
    image: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=600&q=80",
    category: "Accessories",
    rating: 4.5,
    reviews: 312,
    description: "Full-grain leather belt with brushed silver buckle.",
    sizes: ["30", "32", "34", "36", "38"],
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "Brown", hex: "#8B4513" },
    ],
    inStock: true,
  },
];

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (product: Product, quantity = 1, size?: string, color?: string) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) =>
          item.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor === color
      );
      if (existing) {
        return prev.map((item) =>
          item.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor === color
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity, selectedSize: size, selectedColor: color }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <StoreContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleWishlist,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  return context;
}
