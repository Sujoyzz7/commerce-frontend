"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { StoreProvider, useStore, products } from "@/lib/store-context";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingBag, ChevronRight, Star } from "lucide-react";

function WishlistContent() {
  const { wishlist, toggleWishlist, addToCart } = useStore();
  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  if (wishlistProducts.length === 0) {
    return (
      <main className="min-h-screen bg-[#0a0a0a] pt-20 flex items-center justify-center">
        <div className="text-center">
          <Heart className="w-16 h-16 text-white/20 mx-auto mb-4" />
          <h1 className="text-2xl text-white font-light">Your wishlist is empty</h1>
          <p className="text-white/40 mt-2">Save items you love by clicking the heart icon</p>
          <Link href="/products">
            <Button className="mt-6 bg-amber-500 hover:bg-amber-600 text-black">
              Explore Products
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-2 text-sm text-white/40 mb-8">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-white">Wishlist</span>
        </div>

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-extralight text-white">
            My Wishlist ({wishlistProducts.length})
          </h1>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {wishlistProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <Link href={`/products/${product.id}`}>
                <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-white/5">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleWishlist(product.id);
                    }}
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-red-500 flex items-center justify-center transition-transform hover:scale-110"
                  >
                    <Heart className="w-4 h-4 text-white fill-current" />
                  </button>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="absolute bottom-4 left-4 right-4"
                  >
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        addToCart(product);
                      }}
                      className="w-full bg-white text-black hover:bg-white/90 h-10 text-sm font-medium"
                    >
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      Add to Bag
                    </Button>
                  </motion.div>
                </div>
              </Link>
              <div className="mt-4 space-y-1">
                <Link href={`/products/${product.id}`}>
                  <h3 className="text-sm font-light text-white group-hover:text-amber-400 transition-colors">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-xs text-white/40">{product.category}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-amber-500">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-xs text-white/30 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span className="text-xs text-white/50">{product.rating}</span>
                  </div>
                </div>
                <Button
                  onClick={() => addToCart(product)}
                  variant="outline"
                  className="w-full mt-2 border-white/20 text-white hover:bg-white/5 h-9 text-sm"
                >
                  Add to Bag
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default function WishlistPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <WishlistContent />
    </div>
  );
}
