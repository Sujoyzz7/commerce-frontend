"use client";

import { useState, useEffect } from "react";
import { Plus, Search, MoreVertical, Edit2, Trash2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

// Define the Product type
interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  inStock: boolean;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be a fetch from Supabase
    // For now, we'll mock it or use the context products
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        // Mocking a delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Importing from the store context for demo purposes
        // In a real scenario, use the Supabase client
        const { products: initialProducts } = await import("@/lib/store-context");
        setProducts(initialProducts || []);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        toast.error("Failed to load products");
        setProducts([]); // Ensure it's always an array
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // CRITICAL: Ensure products is an array before filtering
  const filteredProducts = Array.isArray(products) 
    ? products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-light tracking-tight uppercase tracking-[0.1em]">Products</h2>
          <p className="text-white/40 mt-1">Manage your product catalog.</p>
        </div>
        <Button className="bg-amber-500 hover:bg-amber-600 text-black font-medium">
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>

      <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-black/50 border-white/10 text-white"
          />
        </div>
        <div className="text-sm text-white/40">
          Showing {filteredProducts.length} products
        </div>
      </div>

      <div className="rounded-xl border border-white/10 overflow-hidden bg-white/5">
        <Table>
          <TableHeader className="bg-white/5">
            <TableRow className="border-white/10 hover:bg-transparent">
              <TableHead className="text-white/60 font-light py-4">Product</TableHead>
              <TableHead className="text-white/60 font-light">Category</TableHead>
              <TableHead className="text-white/60 font-light">Price</TableHead>
              <TableHead className="text-white/60 font-light">Status</TableHead>
              <TableHead className="text-white/60 font-light text-right pr-6">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="h-48 text-center text-white/20">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
                    Loading products...
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-48 text-center text-white/20">
                  No products found.
                </TableCell>
              </TableRow>
            ) : (
              filteredProducts.map((product) => (
                <TableRow key={product.id} className="border-white/5 hover:bg-white/5 group transition-colors">
                  <TableCell className="py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded bg-white/10 overflow-hidden flex-shrink-0">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="font-light">{product.name}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-white/60 font-light">{product.category}</TableCell>
                  <TableCell className="font-light">${product.price}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={product.inStock ? "border-emerald-500/50 text-emerald-400 bg-emerald-500/5" : "border-red-500/50 text-red-400 bg-red-500/5"}>
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-white/40 hover:text-white">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-[#1a1a1a] border-white/10 text-white">
                        <DropdownMenuItem className="hover:bg-white/5 cursor-pointer">
                          <Edit2 className="w-4 h-4 mr-2" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-white/5 cursor-pointer">
                          <ExternalLink className="w-4 h-4 mr-2" /> View
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-400 hover:bg-red-500/10 cursor-pointer">
                          <Trash2 className="w-4 h-4 mr-2" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
