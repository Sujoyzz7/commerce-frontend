"use client";

import { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { StoreProvider, useStore, products, Product } from "@/lib/store-context";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Heart,
  ShoppingBag,
  Star,
  Grid3X3,
  LayoutList,
  SlidersHorizontal,
  X,
  Search,
  ChevronRight,
} from "lucide-react";

function ProductCard({ product, view }: { product: Product; view: "grid" | "list" }) {
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const isWishlisted = wishlist.includes(product.id);
  const [isHovered, setIsHovered] = useState(false);

  if (view === "list") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex gap-6 p-4 rounded-lg bg-white/5 border border-white/5 hover:border-white/10 transition-colors"
      >
        <Link href={`/products/${product.id}`} className="w-40 h-48 flex-shrink-0">
          <div className="relative w-full h-full overflow-hidden rounded-lg bg-white/5">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.tags && product.tags.length > 0 && (
              <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                {product.tags.slice(0, 1).map((tag) => (
                  <Badge
                    key={tag}
                    className="bg-amber-500/90 text-black text-[10px] font-medium px-2 py-0.5"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </Link>
        <div className="flex-1 flex flex-col justify-between py-2">
          <div>
            <Link href={`/products/${product.id}`}>
              <h3 className="text-lg font-light text-white hover:text-amber-400 transition-colors">
                {product.name}
              </h3>
            </Link>
            <p className="text-sm text-white/40 mt-1">{product.category}</p>
            <p className="text-sm text-white/60 mt-3 line-clamp-2">{product.description}</p>
            <div className="flex items-center gap-2 mt-3">
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span className="text-xs text-white/50">{product.rating}</span>
              </div>
              <span className="text-xs text-white/30">({product.reviews} reviews)</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-lg text-amber-500">${product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-white/30 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => addToCart(product)}
                className="bg-amber-500 hover:bg-amber-600 text-black h-9 px-4 text-sm"
              >
                <ShoppingBag className="w-4 h-4 mr-2" />
                Add to Bag
              </Button>
              <Button
                onClick={() => toggleWishlist(product.id)}
                variant="outline"
                size="icon"
                className={`h-9 w-9 border-white/20 ${
                  isWishlisted
                    ? "bg-red-500 border-red-500 text-white hover:bg-red-600"
                    : "bg-white/5 text-white hover:bg-white/10"
                }`}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`} />
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
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

function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const filterParam = searchParams.get("filter");

  const [view, setView] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState([0, 600]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryParam ? [categoryParam] : []
  );

  const categories = [...new Set(products.map((p) => p.category))];

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (searchQuery) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) => selectedCategories.includes(p.category));
    }

    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    if (filterParam === "sale") {
      filtered = filtered.filter((p) => p.originalPrice);
    }

    if (filterParam === "new") {
      filtered = filtered.filter((p) => p.tags?.includes("New Arrival"));
    }

    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        filtered.reverse();
        break;
    }

    return filtered;
  }, [searchQuery, selectedCategories, priceRange, sortBy, filterParam]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setPriceRange([0, 600]);
    setSortBy("featured");
  };

  const activeFiltersCount =
    selectedCategories.length +
    (priceRange[0] > 0 || priceRange[1] < 600 ? 1 : 0) +
    (searchQuery ? 1 : 0);

  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-2 text-sm text-white/40 mb-8">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-white">Products</span>
          {categoryParam && (
            <>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white">{categoryParam}</span>
            </>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-8">
              <div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <Input
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-10 bg-white/5 border-white/10 text-white placeholder:text-white/30 text-sm"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-white mb-4">Categories</h3>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center gap-3">
                      <Checkbox
                        id={category}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => toggleCategory(category)}
                        className="border-white/20 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
                      />
                      <label
                        htmlFor={category}
                        className="text-sm text-white/60 cursor-pointer hover:text-white transition-colors"
                      >
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-white mb-4">Price Range</h3>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  min={0}
                  max={600}
                  step={10}
                  className="mb-4"
                />
                <div className="flex items-center justify-between text-sm text-white/60">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>

              {activeFiltersCount > 0 && (
                <Button
                  variant="ghost"
                  onClick={clearFilters}
                  className="w-full text-white/60 hover:text-white hover:bg-white/5"
                >
                  <X className="w-4 h-4 mr-2" />
                  Clear Filters ({activeFiltersCount})
                </Button>
              )}
            </div>
          </aside>

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-2xl font-extralight text-white tracking-tight">
                  {categoryParam || filterParam === "sale"
                    ? filterParam === "sale"
                      ? "Sale"
                      : categoryParam
                    : filterParam === "new"
                    ? "New Arrivals"
                    : "All Products"}
                </h1>
                <p className="text-sm text-white/40 mt-1">
                  {filteredProducts.length} products
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button
                      variant="outline"
                      className="lg:hidden border-white/20 text-white hover:bg-white/5"
                    >
                      <SlidersHorizontal className="w-4 h-4 mr-2" />
                      Filters
                      {activeFiltersCount > 0 && (
                        <Badge className="ml-2 bg-amber-500 text-black text-xs">
                          {activeFiltersCount}
                        </Badge>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent
                    side="left"
                    className="bg-[#0a0a0a] border-white/10 text-white w-80"
                  >
                    <SheetHeader>
                      <SheetTitle className="text-white font-light">Filters</SheetTitle>
                    </SheetHeader>
                    <div className="mt-8 space-y-8">
                      <div>
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                          <Input
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 h-10 bg-white/5 border-white/10 text-white placeholder:text-white/30 text-sm"
                          />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-white mb-4">Categories</h3>
                        <div className="space-y-3">
                          {categories.map((category) => (
                            <div key={category} className="flex items-center gap-3">
                              <Checkbox
                                id={`mobile-${category}`}
                                checked={selectedCategories.includes(category)}
                                onCheckedChange={() => toggleCategory(category)}
                                className="border-white/20 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
                              />
                              <label
                                htmlFor={`mobile-${category}`}
                                className="text-sm text-white/60 cursor-pointer"
                              >
                                {category}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-white mb-4">Price Range</h3>
                        <Slider
                          value={priceRange}
                          onValueChange={setPriceRange}
                          min={0}
                          max={600}
                          step={10}
                          className="mb-4"
                        />
                        <div className="flex items-center justify-between text-sm text-white/60">
                          <span>${priceRange[0]}</span>
                          <span>${priceRange[1]}</span>
                        </div>
                      </div>
                      {activeFiltersCount > 0 && (
                        <Button
                          variant="ghost"
                          onClick={clearFilters}
                          className="w-full text-white/60 hover:text-white hover:bg-white/5"
                        >
                          <X className="w-4 h-4 mr-2" />
                          Clear Filters
                        </Button>
                      )}
                    </div>
                  </SheetContent>
                </Sheet>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40 h-10 bg-white/5 border-white/10 text-white text-sm">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a1a] border-white/10">
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>

                <div className="hidden sm:flex items-center gap-1 border border-white/10 rounded-lg p-1">
                  <button
                    onClick={() => setView("grid")}
                    className={`p-2 rounded ${
                      view === "grid" ? "bg-white/10 text-white" : "text-white/40"
                    }`}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setView("list")}
                    className={`p-2 rounded ${
                      view === "list" ? "bg-white/10 text-white" : "text-white/40"
                    }`}
                  >
                    <LayoutList className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-white/40 text-lg">No products found</p>
                <Button
                  onClick={clearFilters}
                  variant="outline"
                  className="mt-4 border-white/20 text-white hover:bg-white/5"
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div
                className={
                  view === "grid"
                    ? "grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6"
                    : "space-y-4"
                }
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} view={view} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default function ProductsPage() {
  return (
    <StoreProvider>
      <div className="min-h-screen bg-[#0a0a0a]">
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
            </div>
          }
        >
          <ProductsContent />
        </Suspense>
      </div>
    </StoreProvider>
  );
}
