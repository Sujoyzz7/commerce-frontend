"use client";

import { useState, use } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { StoreProvider, useStore, products, Product } from "@/lib/store-context";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Heart,
  ShoppingBag,
  Star,
  ChevronRight,
  ChevronLeft,
  Minus,
  Plus,
  Truck,
  RefreshCw,
  Shield,
  Check,
  ZoomIn,
} from "lucide-react";

function ProductDetailContent({ productId }: { productId: string }) {
  const product = products.find((p) => p.id === productId);
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const [selectedSize, setSelectedSize] = useState<string | undefined>();
  const [selectedColor, setSelectedColor] = useState<string | undefined>();
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  if (!product) {
    return (
      <main className="min-h-screen bg-[#0a0a0a] pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-white font-light">Product not found</h1>
          <Link href="/products">
            <Button variant="outline" className="mt-4 border-white/20 text-white hover:bg-white/5">
              Back to Products
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  const isWishlisted = wishlist.includes(product.id);
  const relatedProducts = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const productImages = [
    product.image,
    product.image.replace("w=600", "w=601"),
    product.image.replace("w=600", "w=602"),
  ];

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
  };

  const reviews = [
    {
      id: 1,
      name: "Michael S.",
      rating: 5,
      date: "2 weeks ago",
      comment: "Exceptional quality. The fit is perfect and the material feels premium. Highly recommend!",
      verified: true,
    },
    {
      id: 2,
      name: "James R.",
      rating: 4,
      date: "1 month ago",
      comment: "Great product overall. Slight delay in shipping but the quality makes up for it.",
      verified: true,
    },
    {
      id: 3,
      name: "David L.",
      rating: 5,
      date: "1 month ago",
      comment: "This is now my go-to piece. Classic style with modern comfort.",
      verified: false,
    },
  ];

  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-2 text-sm text-white/40 mb-8">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/products" className="hover:text-white transition-colors">Products</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href={`/products?category=${product.category}`} className="hover:text-white transition-colors">
            {product.category}
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-white">{product.name}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="space-y-4">
            <div
              className="relative aspect-[3/4] overflow-hidden rounded-lg bg-white/5 cursor-zoom-in"
              onClick={() => setIsZoomed(true)}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={productImages[currentImageIndex]}
                  alt={product.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
              {product.tags && product.tags.length > 0 && (
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <Badge key={tag} className="bg-amber-500/90 text-black text-xs font-medium px-3 py-1">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
              {product.originalPrice && (
                <Badge className="absolute top-4 right-4 bg-red-500/90 text-white text-xs font-medium px-3 py-1">
                  -{Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                </Badge>
              )}
              <button className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white/70 hover:text-white transition-colors">
                <ZoomIn className="w-5 h-5" />
              </button>
              {productImages.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex((i) => (i === 0 ? productImages.length - 1 : i - 1));
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white/70 hover:text-white transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex((i) => (i === productImages.length - 1 ? 0 : i + 1));
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white/70 hover:text-white transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
            <div className="flex gap-3">
              {productImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImageIndex(i)}
                  className={`w-20 h-24 rounded-lg overflow-hidden border-2 transition-colors ${
                    i === currentImageIndex ? "border-amber-500" : "border-transparent"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-sm text-amber-500 font-medium tracking-wide">{product.category}</p>
              <h1 className="text-3xl font-light text-white mt-2">{product.name}</h1>
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? "fill-amber-400 text-amber-400"
                          : "text-white/20"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-white/50">{product.rating}</span>
                <span className="text-sm text-white/30">({product.reviews} reviews)</span>
              </div>
            </div>

            <div className="flex items-baseline gap-4">
              <span className="text-3xl text-amber-500">${product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-white/30 line-through">${product.originalPrice}</span>
                  <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                    Save ${product.originalPrice - product.price}
                  </Badge>
                </>
              )}
            </div>

            <p className="text-white/60 leading-relaxed">{product.description}</p>

            {product.colors && product.colors.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-white mb-3">
                  Color: <span className="text-white/60 font-normal">{selectedColor || "Select"}</span>
                </h3>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${
                        selectedColor === color.name
                          ? "border-amber-500 scale-110"
                          : "border-transparent"
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    >
                      {selectedColor === color.name && (
                        <Check className={`w-4 h-4 mx-auto ${
                          color.hex === "#000000" || color.hex === "#191970" ? "text-white" : "text-black"
                        }`} />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.sizes && product.sizes.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-white">
                    Size: <span className="text-white/60 font-normal">{selectedSize || "Select"}</span>
                  </h3>
                  <button className="text-xs text-amber-400 hover:text-amber-300">Size Guide</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[3rem] h-10 px-4 rounded-lg border text-sm font-medium transition-all ${
                        selectedSize === size
                          ? "border-amber-500 bg-amber-500/10 text-amber-400"
                          : "border-white/10 text-white/60 hover:border-white/30"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h3 className="text-sm font-medium text-white mb-3">Quantity</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-white/10 rounded-lg">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center text-white">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-sm text-white/40">In Stock</span>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleAddToCart}
                className="flex-1 bg-amber-500 hover:bg-amber-600 text-black h-12 text-sm font-medium"
              >
                <ShoppingBag className="w-4 h-4 mr-2" />
                Add to Bag - ${(product.price * quantity).toFixed(2)}
              </Button>
              <Button
                onClick={() => toggleWishlist(product.id)}
                variant="outline"
                size="icon"
                className={`h-12 w-12 border-white/20 ${
                  isWishlisted
                    ? "bg-red-500 border-red-500 text-white hover:bg-red-600"
                    : "text-white hover:bg-white/5"
                }`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-white/5">
                <Truck className="w-5 h-5 text-amber-400 mb-2" />
                <span className="text-xs text-white/60">Free Shipping</span>
                <span className="text-xs text-white/40">Over $200</span>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-white/5">
                <RefreshCw className="w-5 h-5 text-amber-400 mb-2" />
                <span className="text-xs text-white/60">Easy Returns</span>
                <span className="text-xs text-white/40">30 Days</span>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-white/5">
                <Shield className="w-5 h-5 text-amber-400 mb-2" />
                <span className="text-xs text-white/60">Secure</span>
                <span className="text-xs text-white/40">Payment</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="bg-transparent border-b border-white/10 rounded-none w-full justify-start gap-8 h-auto pb-0">
              <TabsTrigger
                value="details"
                className="bg-transparent data-[state=active]:bg-transparent data-[state=active]:text-amber-400 text-white/60 rounded-none border-b-2 border-transparent data-[state=active]:border-amber-400 pb-4 px-0"
              >
                Details
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="bg-transparent data-[state=active]:bg-transparent data-[state=active]:text-amber-400 text-white/60 rounded-none border-b-2 border-transparent data-[state=active]:border-amber-400 pb-4 px-0"
              >
                Reviews ({product.reviews})
              </TabsTrigger>
              <TabsTrigger
                value="shipping"
                className="bg-transparent data-[state=active]:bg-transparent data-[state=active]:text-amber-400 text-white/60 rounded-none border-b-2 border-transparent data-[state=active]:border-amber-400 pb-4 px-0"
              >
                Shipping & Returns
              </TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="mt-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-light text-white mb-4">Product Details</h3>
                  <ul className="space-y-3 text-sm text-white/60">
                    <li className="flex justify-between py-2 border-b border-white/5">
                      <span>Material</span>
                      <span className="text-white">Premium Blend</span>
                    </li>
                    <li className="flex justify-between py-2 border-b border-white/5">
                      <span>Fit</span>
                      <span className="text-white">Regular</span>
                    </li>
                    <li className="flex justify-between py-2 border-b border-white/5">
                      <span>Care</span>
                      <span className="text-white">Dry Clean Only</span>
                    </li>
                    <li className="flex justify-between py-2 border-b border-white/5">
                      <span>Origin</span>
                      <span className="text-white">Made in Italy</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-light text-white mb-4">Features</h3>
                  <ul className="space-y-2 text-sm text-white/60">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-amber-400" />
                      <span>Premium quality materials</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-amber-400" />
                      <span>Expert craftsmanship</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-amber-400" />
                      <span>Timeless design</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-amber-400" />
                      <span>Versatile styling options</span>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="mt-8">
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="p-6 rounded-lg bg-white/5 border border-white/5">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="font-medium text-white">{review.name}</span>
                          {review.verified && (
                            <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                              Verified Purchase
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${
                                  i < review.rating ? "fill-amber-400 text-amber-400" : "text-white/20"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-white/40">{review.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className="mt-4 text-sm text-white/60">{review.comment}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="shipping" className="mt-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-light text-white mb-4">Shipping</h3>
                  <ul className="space-y-3 text-sm text-white/60">
                    <li>Free standard shipping on orders over $200</li>
                    <li>Express shipping available (2-3 business days)</li>
                    <li>International shipping to select countries</li>
                    <li>Order tracking provided via email</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-light text-white mb-4">Returns</h3>
                  <ul className="space-y-3 text-sm text-white/60">
                    <li>30-day return policy</li>
                    <li>Items must be unworn with tags attached</li>
                    <li>Free returns for store credit</li>
                    <li>Refunds processed within 5-7 business days</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-light text-white mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {relatedProducts.map((p) => (
                <Link key={p.id} href={`/products/${p.id}`} className="group">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-white/5">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-4 space-y-1">
                    <h3 className="text-sm font-light text-white group-hover:text-amber-400 transition-colors">
                      {p.name}
                    </h3>
                    <p className="text-sm text-amber-500">${p.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsZoomed(false)}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center cursor-zoom-out"
          >
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={productImages[currentImageIndex]}
              alt={product.name}
              className="max-w-[90vw] max-h-[90vh] object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  
  return (
    <StoreProvider>
      <div className="min-h-screen bg-[#0a0a0a]">
        <ProductDetailContent productId={resolvedParams.id} />
      </div>
    </StoreProvider>
  );
}
