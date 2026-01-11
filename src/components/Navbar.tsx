"use client";

import { useState } from "react";
import Link from "next/link";
import { useStore } from "@/lib/store-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  Minus,
  Plus,
  Trash2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const store = useStore();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) return null;
  if (!store) return null;

  const { cart, cartTotal, cartCount, updateQuantity, removeFromCart, wishlist } = store;

  const navLinks = [
    { name: "New Arrivals", href: "/products?filter=new" },
    { name: "Collections", href: "/products" },
    { name: "Outerwear", href: "/products?category=Outerwear" },
    { name: "Tailoring", href: "/products?category=Blazers" },
    { name: "Sale", href: "/products?filter=sale" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/5">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <div className="flex items-center gap-8">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 -ml-2 text-white/70 hover:text-white transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <Link href="/" className="flex-shrink-0">
              <span className="text-xl font-light tracking-[0.3em] text-white">
                ATELIER
              </span>
            </Link>
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-light text-white/60 hover:text-white transition-colors tracking-wide"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <AnimatePresence>
              {isSearchOpen && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 200, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  className="hidden sm:block overflow-hidden"
                >
                  <Input
                    placeholder="Search..."
                    className="h-9 bg-white/5 border-white/10 text-white placeholder:text-white/40 text-sm"
                    autoFocus
                  />
                </motion.div>
              )}
            </AnimatePresence>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-white/70 hover:text-white hover:bg-white/5"
            >
              {isSearchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
            </Button>
            <Link href="/wishlist">
              <Button
                variant="ghost"
                size="icon"
                className="text-white/70 hover:text-white hover:bg-white/5 relative"
              >
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-[10px] font-medium text-black rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Button>
            </Link>
            <Link href="/account">
              <Button
                variant="ghost"
                size="icon"
                className="text-white/70 hover:text-white hover:bg-white/5 hidden sm:flex"
              >
                <User className="w-5 h-5" />
              </Button>
            </Link>

            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white/70 hover:text-white hover:bg-white/5 relative"
                >
                  <ShoppingBag className="w-5 h-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-[10px] font-medium text-black rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-[#0a0a0a] border-white/10 text-white w-full sm:max-w-md">
                <SheetHeader>
                  <SheetTitle className="text-white font-light tracking-wider">
                    Shopping Bag ({cartCount})
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-8 flex flex-col h-[calc(100vh-200px)]">
                  {cart.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-white/40">
                      <ShoppingBag className="w-16 h-16 mb-4" />
                      <p className="text-lg font-light">Your bag is empty</p>
                      <Link href="/products">
                        <Button variant="outline" className="mt-6 border-white/20 text-white hover:bg-white/5">
                          Continue Shopping
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <>
                      <div className="flex-1 overflow-auto space-y-4 pr-2">
                        {cart.map((item) => (
                          <div
                            key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                            className="flex gap-4 p-4 bg-white/5 rounded-lg"
                          >
                            <div className="w-20 h-24 rounded-md overflow-hidden bg-white/10 flex-shrink-0">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-light text-sm truncate">{item.name}</h4>
                              <p className="text-white/40 text-xs mt-1">
                                {item.selectedSize && `Size: ${item.selectedSize}`}
                                {item.selectedColor && ` • ${item.selectedColor}`}
                              </p>
                              <p className="text-amber-500 text-sm mt-2">${item.price}</p>
                              <div className="flex items-center justify-between mt-3">
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
                                  >
                                    <Minus className="w-3 h-3" />
                                  </button>
                                  <span className="text-sm w-6 text-center">{item.quantity}</span>
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
                                  >
                                    <Plus className="w-3 h-3" />
                                  </button>
                                </div>
                                <button
                                  onClick={() => removeFromCart(item.id)}
                                  className="text-white/40 hover:text-red-400 transition-colors"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="border-t border-white/10 pt-6 mt-6 space-y-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-white/60">Subtotal</span>
                          <span>${cartTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-white/60">Shipping</span>
                          <span className="text-white/60">Calculated at checkout</span>
                        </div>
                        <div className="flex justify-between text-lg font-light pt-2 border-t border-white/10">
                          <span>Total</span>
                          <span className="text-amber-500">${cartTotal.toFixed(2)}</span>
                        </div>
                        <Link href="/checkout" className="block">
                          <Button className="w-full bg-amber-500 hover:bg-amber-600 text-black font-medium">
                            Checkout
                          </Button>
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 left-0 bottom-0 w-72 bg-[#0a0a0a] z-50 lg:hidden"
            >
              <div className="p-6">
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="absolute top-4 right-4 p-2 text-white/70 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
                <span className="text-xl font-light tracking-[0.3em] text-white">
                  ATELIER
                </span>
                <div className="mt-12 space-y-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block text-lg font-light text-white/70 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                  <hr className="border-white/10" />
                  <Link
                    href="/account"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 text-white/70 hover:text-white transition-colors"
                  >
                    <User className="w-5 h-5" />
                    <span>Account</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
