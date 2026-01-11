"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useStore, products, Product } from "@/lib/store-context";
import { Heart, ShoppingBag, Star, ArrowRight, Sparkles, Truck, Shield, RefreshCw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

function ProductCard({ product, index }: { product: Product; index: number }) {
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const isWishlisted = wishlist.includes(product.id);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-white/5">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          {product.tags && product.tags.length > 0 && (
            <div className="absolute top-3 left-3 flex flex-wrap gap-1">
              {product.tags.map((tag) => (
                <Badge
                  key={tag}
                  className="bg-amber-500/90 text-black text-[10px] font-medium px-2 py-0.5"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
          {product.originalPrice && (
            <Badge className="absolute top-3 right-3 bg-red-500/90 text-white text-[10px] font-medium px-2 py-0.5">
              -{Math.round((1 - product.price / product.originalPrice) * 100)}%
            </Badge>
          )}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            className="absolute bottom-4 left-4 right-4 flex gap-2"
          >
            <Button
              onClick={(e) => {
                e.preventDefault();
                addToCart(product);
              }}
              className="flex-1 bg-white text-black hover:bg-white/90 h-10 text-sm font-medium"
            >
              <ShoppingBag className="w-4 h-4 mr-2" />
              Add to Bag
            </Button>
            <Button
              onClick={(e) => {
                e.preventDefault();
                toggleWishlist(product.id);
              }}
              variant="outline"
              size="icon"
              className={`h-10 w-10 border-white/20 ${
                isWishlisted
                  ? "bg-red-500 border-red-500 text-white hover:bg-red-600"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`} />
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
      </div>
    </motion.div>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&q=80"
          alt="Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-[#0a0a0a]" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20 mb-6 px-4 py-1 text-[10px] tracking-[0.2em] uppercase">
              Winter Collection 2024
            </Badge>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl sm:text-7xl lg:text-8xl font-light text-white leading-[1.1] tracking-tighter"
          >
            THE ART OF
            <br />
            <span className="italic font-serif text-amber-500">Modern Tailoring</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-8 text-white/50 font-light text-lg max-w-xl mx-auto leading-relaxed"
          >
            Experience the pinnacle of sartorial excellence with our latest collection of hand-crafted garments.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-12 flex items-center justify-center gap-6"
          >
            <Link href="/products">
              <Button className="bg-white text-black hover:bg-white/90 rounded-full h-14 px-10 text-sm font-medium tracking-wide transition-all hover:scale-105">
                Explore Collection
              </Button>
            </Link>
            <Link href="/products?filter=new" className="text-white/60 hover:text-white transition-colors text-sm font-light tracking-widest border-b border-white/20 pb-1">
              NEW ARRIVALS
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function CategoriesSection() {
  const categories = [
    {
      name: "Outerwear",
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80",
      count: 24,
    },
    {
      name: "Tailoring",
      image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80",
      count: 18,
    },
    {
      name: "Knitwear",
      image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80",
      count: 32,
    },
    {
      name: "Footwear",
      image: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=600&q=80",
      count: 15,
    },
  ];

  return (
    <section className="py-32 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-20">
          <Badge variant="outline" className="border-white/10 text-white/40 mb-4 px-3 py-0.5 text-[10px] tracking-[0.2em] uppercase">
            Curated Categories
          </Badge>
          <h2 className="text-4xl font-light text-white tracking-tight">
            Elevate Your <span className="italic font-serif">Wardrobe</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, i) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Link href={`/products?category=${category.name}`} className="group relative block aspect-[3/4] overflow-hidden rounded-2xl bg-white/5">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <h3 className="text-2xl font-light text-white tracking-widest uppercase">
                    {category.name}
                  </h3>
                  <div className="mt-4 h-px w-0 group-hover:w-12 bg-amber-500 transition-all duration-500" />
                  <p className="text-xs text-white/40 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 tracking-[0.2em]">
                    {category.count} PIECES
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedProducts() {
  const featured = products.slice(0, 4);

  return (
    <section className="py-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl font-extralight text-white tracking-tight">
              Featured Collection
            </h2>
            <p className="mt-2 text-white/40 font-light">
              Handpicked essentials for your wardrobe
            </p>
          </div>
          <Link
            href="/products"
            className="hidden sm:flex items-center gap-2 text-sm text-amber-400 hover:text-amber-300 transition-colors"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {featured.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PromoBanner() {
  return (
    <section className="py-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-900/30 to-amber-800/20 border border-amber-500/10">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(251,191,36,0.3),transparent_50%)]" />
          </div>
          <div className="relative grid lg:grid-cols-2 gap-8 lg:gap-0">
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <Badge className="w-fit bg-amber-500/20 text-amber-400 border-amber-500/30 mb-4">
                Limited Time
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-extralight text-white tracking-tight">
                Winter Sale
                <br />
                <span className="text-amber-400">Up to 40% Off</span>
              </h2>
              <p className="mt-4 text-white/50 font-light max-w-md">
                Discover exceptional savings on our finest winter collection. Limited stock available.
              </p>
              <Link href="/products?filter=sale" className="mt-8 w-fit">
                <Button className="bg-amber-500 hover:bg-amber-600 text-black h-12 px-8 text-sm font-medium">
                  Shop the Sale
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
            <div className="relative h-64 lg:h-auto">
              <img
                src="https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&q=80"
                alt="Winter Sale"
                className="absolute inset-0 w-full h-full object-cover lg:rounded-r-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-amber-900/50 to-transparent lg:hidden" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BestSellers() {
  const bestSellers = products.slice(4, 8);

  return (
    <section className="py-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl font-extralight text-white tracking-tight">
              Best Sellers
            </h2>
            <p className="mt-2 text-white/40 font-light">
              Most loved by our customers
            </p>
          </div>
          <Link
            href="/products"
            className="hidden sm:flex items-center gap-2 text-sm text-amber-400 hover:text-amber-300 transition-colors"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {bestSellers.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    {
      icon: Truck,
      title: "Free Shipping",
      description: "On orders over $200",
    },
    {
      icon: RefreshCw,
      title: "Easy Returns",
      description: "30-day return policy",
    },
    {
      icon: Shield,
      title: "Secure Payment",
      description: "256-bit SSL encryption",
    },
    {
      icon: Sparkles,
      title: "Premium Quality",
      description: "Finest materials",
    },
  ];

  return (
    <section className="py-16 bg-[#0a0a0a] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center mb-4">
                <feature.icon className="w-5 h-5 text-amber-400" />
              </div>
              <h3 className="text-sm font-medium text-white">{feature.title}</h3>
              <p className="text-xs text-white/40 mt-1">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <section className="py-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-3xl font-extralight text-white tracking-tight">
            Join the Club
          </h2>
          <p className="mt-4 text-white/50 font-light">
            Subscribe to receive exclusive offers, early access to new arrivals, and style inspiration.
          </p>
          {subscribed ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8 p-6 rounded-lg bg-amber-500/10 border border-amber-500/20"
            >
              <Sparkles className="w-8 h-8 text-amber-400 mx-auto mb-3" />
              <p className="text-white font-light">Welcome to the club!</p>
              <p className="text-white/50 text-sm mt-1">Check your inbox for a special welcome offer.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 bg-white/5 border-white/10 text-white placeholder:text-white/30 text-sm flex-1"
                required
              />
              <Button
                type="submit"
                className="h-12 bg-amber-500 hover:bg-amber-600 text-black px-8 text-sm font-medium"
              >
                Subscribe
              </Button>
            </form>
          )}
          <p className="mt-4 text-xs text-white/30">
            By subscribing, you agree to our Privacy Policy and consent to receive updates.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export function HomePage() {
  return (
    <main className="bg-[#0a0a0a]">
      <HeroSection />
      <Features />
      <CategoriesSection />
      <FeaturedProducts />
      <PromoBanner />
      <BestSellers />
      <Newsletter />
    </main>
  );
}
