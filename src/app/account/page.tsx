"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { StoreProvider, useStore, products } from "@/lib/store-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Package,
  Heart,
  MapPin,
  CreditCard,
  Settings,
  LogOut,
  ChevronRight,
  Edit,
  Plus,
  Truck,
  CheckCircle,
  Clock,
} from "lucide-react";

function AccountContent() {
  const { wishlist, toggleWishlist, addToCart } = useStore();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  const orders = [
    {
      id: "ATL-XK7J9M2P",
      date: "Dec 15, 2024",
      status: "Delivered",
      total: 634.0,
      items: [
        { name: "Merino Wool Overcoat", size: "M", color: "Charcoal", price: 389, image: products[0].image },
        { name: "Cashmere Turtleneck", size: "L", color: "Cream", price: 245, image: products[1].image },
      ],
    },
    {
      id: "ATL-NM3K8R5T",
      date: "Nov 28, 2024",
      status: "In Transit",
      total: 345.0,
      items: [
        { name: "Leather Chelsea Boots", size: "10", color: "Black", price: 345, image: products[5].image },
      ],
    },
  ];

  if (!isLoggedIn) {
    return (
      <main className="min-h-screen bg-[#0a0a0a] pt-20 flex items-center justify-center">
        <div className="w-full max-w-md px-4">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="w-full bg-white/5 border border-white/10 rounded-lg p-1">
              <TabsTrigger
                value="login"
                className="flex-1 data-[state=active]:bg-amber-500 data-[state=active]:text-black text-white/60"
              >
                Sign In
              </TabsTrigger>
              <TabsTrigger
                value="register"
                className="flex-1 data-[state=active]:bg-amber-500 data-[state=active]:text-black text-white/60"
              >
                Register
              </TabsTrigger>
            </TabsList>
            <TabsContent value="login" className="mt-6">
              {showForgotPassword ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6 p-6 rounded-lg bg-white/5 border border-white/5"
                >
                  <div className="text-center">
                    <h1 className="text-2xl font-light text-white">Reset Password</h1>
                    <p className="text-white/40 text-sm mt-2">
                      {resetSent 
                        ? "Check your email for reset instructions" 
                        : "Enter your email to receive a reset link"}
                    </p>
                  </div>
                  
                  {!resetSent ? (
                    <>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="resetEmail" className="text-white/60 text-sm">Email</Label>
                          <Input
                            id="resetEmail"
                            type="email"
                            placeholder="you@example.com"
                            className="mt-1 bg-white/5 border-white/10 text-white placeholder:text-white/30"
                          />
                        </div>
                      </div>
                      <Button
                        onClick={() => setResetSent(true)}
                        className="w-full bg-amber-500 hover:bg-amber-600 text-black h-12"
                      >
                        Send Reset Link
                      </Button>
                    </>
                  ) : (
                    <Button
                      onClick={() => {
                        setShowForgotPassword(false);
                        setResetSent(false);
                      }}
                      variant="outline"
                      className="w-full border-white/20 text-white hover:bg-white/5 h-12"
                    >
                      Back to Sign In
                    </Button>
                  )}
                  
                  {!resetSent && (
                    <button
                      onClick={() => setShowForgotPassword(false)}
                      className="w-full text-sm text-white/40 hover:text-white transition-colors"
                    >
                      Back to Sign In
                    </button>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6 p-6 rounded-lg bg-white/5 border border-white/5"
                >
                  <div className="text-center">
                    <h1 className="text-2xl font-light text-white">Welcome Back</h1>
                    <p className="text-white/40 text-sm mt-2">Sign in to your account</p>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="email" className="text-white/60 text-sm">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        className="mt-1 bg-white/5 border-white/10 text-white placeholder:text-white/30"
                      />
                    </div>
                    <div>
                      <Label htmlFor="password" className="text-white/60 text-sm">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        className="mt-1 bg-white/5 border-white/10 text-white"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2 text-sm text-white/60">
                        <input type="checkbox" className="rounded border-white/20" />
                        Remember me
                      </label>
                      <button 
                        onClick={() => setShowForgotPassword(true)}
                        className="text-sm text-amber-400 hover:text-amber-300"
                      >
                        Forgot password?
                      </button>
                    </div>
                  </div>
                  <Button
                    onClick={() => setIsLoggedIn(true)}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-black h-12"
                  >
                    Sign In
                  </Button>
                </motion.div>
              )}
            </TabsContent>
            <TabsContent value="register" className="mt-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6 p-6 rounded-lg bg-white/5 border border-white/5"
              >
                <div className="text-center">
                  <h1 className="text-2xl font-light text-white">Create Account</h1>
                  <p className="text-white/40 text-sm mt-2">Join the Atelier family</p>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-white/60 text-sm">First Name</Label>
                      <Input
                        id="firstName"
                        className="mt-1 bg-white/5 border-white/10 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-white/60 text-sm">Last Name</Label>
                      <Input
                        id="lastName"
                        className="mt-1 bg-white/5 border-white/10 text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="regEmail" className="text-white/60 text-sm">Email</Label>
                    <Input
                      id="regEmail"
                      type="email"
                      placeholder="you@example.com"
                      className="mt-1 bg-white/5 border-white/10 text-white placeholder:text-white/30"
                    />
                  </div>
                  <div>
                    <Label htmlFor="regPassword" className="text-white/60 text-sm">Password</Label>
                    <Input
                      id="regPassword"
                      type="password"
                      className="mt-1 bg-white/5 border-white/10 text-white"
                    />
                  </div>
                </div>
                <Button
                  onClick={() => setIsLoggedIn(true)}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-black h-12"
                >
                  Create Account
                </Button>
                <p className="text-xs text-white/30 text-center">
                  By creating an account, you agree to our Terms of Service and Privacy Policy.
                </p>
              </motion.div>
            </TabsContent>
          </Tabs>
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
          <span className="text-white">Account</span>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <div className="p-6 rounded-lg bg-white/5 border border-white/5">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <User className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h2 className="text-white font-light">John Doe</h2>
                  <p className="text-sm text-white/40">john@example.com</p>
                </div>
              </div>
              <nav className="space-y-1">
                {[
                  { id: "profile", label: "Profile", icon: User },
                  { id: "orders", label: "Orders", icon: Package },
                  { id: "wishlist", label: "Wishlist", icon: Heart },
                  { id: "addresses", label: "Addresses", icon: MapPin },
                  { id: "payment", label: "Payment", icon: CreditCard },
                  { id: "settings", label: "Settings", icon: Settings },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
                      activeTab === item.id
                        ? "bg-amber-500/10 text-amber-400"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </button>
                ))}
                <button
                  onClick={() => setIsLoggedIn(false)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </nav>
            </div>
          </aside>

          <div className="lg:col-span-3">
            {activeTab === "profile" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="p-6 rounded-lg bg-white/5 border border-white/5">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-light text-white">Personal Information</h2>
                    <Button variant="ghost" size="sm" className="text-amber-400 hover:text-amber-300 hover:bg-amber-500/10">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-white/40 text-sm">First Name</Label>
                      <p className="text-white mt-1">John</p>
                    </div>
                    <div>
                      <Label className="text-white/40 text-sm">Last Name</Label>
                      <p className="text-white mt-1">Doe</p>
                    </div>
                    <div>
                      <Label className="text-white/40 text-sm">Email</Label>
                      <p className="text-white mt-1">john@example.com</p>
                    </div>
                    <div>
                      <Label className="text-white/40 text-sm">Phone</Label>
                      <p className="text-white mt-1">+1 (555) 123-4567</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-lg bg-white/5 border border-white/5">
                  <h2 className="text-lg font-light text-white mb-6">Recent Orders</h2>
                  {orders.slice(0, 2).map((order) => (
                    <div key={order.id} className="flex items-center justify-between py-4 border-b border-white/5 last:border-0">
                      <div className="flex items-center gap-4">
                        <div className="flex -space-x-2">
                          {order.items.slice(0, 2).map((item, i) => (
                            <div key={i} className="w-12 h-12 rounded-md overflow-hidden border-2 border-[#0a0a0a]">
                              <img src={item.image} alt="" className="w-full h-full object-cover" />
                            </div>
                          ))}
                        </div>
                        <div>
                          <p className="text-sm text-white">Order #{order.id}</p>
                          <p className="text-xs text-white/40">{order.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge
                          className={
                            order.status === "Delivered"
                              ? "bg-green-500/20 text-green-400 border-green-500/30"
                              : "bg-amber-500/20 text-amber-400 border-amber-500/30"
                          }
                        >
                          {order.status}
                        </Badge>
                        <p className="text-sm text-white/60 mt-1">${order.total.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                  <Button
                    variant="ghost"
                    className="w-full mt-4 text-amber-400 hover:text-amber-300 hover:bg-amber-500/10"
                    onClick={() => setActiveTab("orders")}
                  >
                    View All Orders
                  </Button>
                </div>
              </motion.div>
            )}

            {activeTab === "orders" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-light text-white">Order History</h2>
                {orders.map((order) => (
                  <div key={order.id} className="p-6 rounded-lg bg-white/5 border border-white/5">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-white font-light">Order #{order.id}</p>
                        <p className="text-sm text-white/40">{order.date}</p>
                      </div>
                      <Badge
                        className={
                          order.status === "Delivered"
                            ? "bg-green-500/20 text-green-400 border-green-500/30"
                            : "bg-amber-500/20 text-amber-400 border-amber-500/30"
                        }
                      >
                        {order.status === "Delivered" ? (
                          <CheckCircle className="w-3 h-3 mr-1" />
                        ) : (
                          <Truck className="w-3 h-3 mr-1" />
                        )}
                        {order.status}
                      </Badge>
                    </div>
                    <div className="space-y-4">
                      {order.items.map((item, i) => (
                        <div key={i} className="flex gap-4">
                          <div className="w-16 h-20 rounded-md overflow-hidden bg-white/10">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-white">{item.name}</p>
                            <p className="text-xs text-white/40 mt-1">
                              Size: {item.size} • {item.color}
                            </p>
                            <p className="text-sm text-amber-500 mt-2">${item.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                      <span className="text-sm text-white/60">Total</span>
                      <span className="text-white">${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === "wishlist" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-light text-white">Wishlist ({wishlistProducts.length})</h2>
                {wishlistProducts.length === 0 ? (
                  <div className="p-12 rounded-lg bg-white/5 border border-white/5 text-center">
                    <Heart className="w-12 h-12 text-white/20 mx-auto mb-4" />
                    <p className="text-white/40">Your wishlist is empty</p>
                    <Link href="/products">
                      <Button className="mt-4 bg-amber-500 hover:bg-amber-600 text-black">
                        Browse Products
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                    {wishlistProducts.map((product) => (
                      <div key={product.id} className="group">
                        <Link href={`/products/${product.id}`}>
                          <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-white/5">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                toggleWishlist(product.id);
                              }}
                              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-red-500 flex items-center justify-center"
                            >
                              <Heart className="w-4 h-4 text-white fill-current" />
                            </button>
                          </div>
                        </Link>
                        <div className="mt-4 space-y-2">
                          <Link href={`/products/${product.id}`}>
                            <h3 className="text-sm font-light text-white group-hover:text-amber-400 transition-colors">
                              {product.name}
                            </h3>
                          </Link>
                          <p className="text-sm text-amber-500">${product.price}</p>
                          <Button
                            onClick={() => addToCart(product)}
                            variant="outline"
                            className="w-full border-white/20 text-white hover:bg-white/5 h-9 text-sm"
                          >
                            Add to Bag
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === "addresses" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-light text-white">Saved Addresses</h2>
                  <Button className="bg-amber-500 hover:bg-amber-600 text-black">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Address
                  </Button>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-6 rounded-lg bg-white/5 border border-white/5">
                    <div className="flex items-center justify-between mb-4">
                      <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">Default</Badge>
                      <Button variant="ghost" size="sm" className="text-white/40 hover:text-white">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-white font-light">John Doe</p>
                    <p className="text-sm text-white/60 mt-2">
                      123 Fashion Avenue<br />
                      Apt 4B<br />
                      New York, NY 10001<br />
                      United States
                    </p>
                    <p className="text-sm text-white/40 mt-2">+1 (555) 123-4567</p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "payment" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-light text-white">Payment Methods</h2>
                  <Button className="bg-amber-500 hover:bg-amber-600 text-black">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Card
                  </Button>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-6 rounded-lg bg-white/5 border border-white/5">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <CreditCard className="w-5 h-5 text-white/60" />
                        <span className="text-white">•••• 4242</span>
                      </div>
                      <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">Default</Badge>
                    </div>
                    <p className="text-sm text-white/40">Expires 12/25</p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "settings" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-light text-white">Settings</h2>
                <div className="p-6 rounded-lg bg-white/5 border border-white/5 space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white">Email Notifications</p>
                      <p className="text-sm text-white/40">Receive updates about orders and promotions</p>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white">SMS Notifications</p>
                      <p className="text-sm text-white/40">Receive order status via text</p>
                    </div>
                    <input type="checkbox" className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white">Marketing Communications</p>
                      <p className="text-sm text-white/40">Receive exclusive offers and new arrivals</p>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                </div>
                <div className="p-6 rounded-lg bg-red-500/10 border border-red-500/20">
                  <h3 className="text-red-400 font-medium">Danger Zone</h3>
                  <p className="text-sm text-white/40 mt-2">Permanently delete your account and all data</p>
                  <Button variant="outline" className="mt-4 border-red-500/30 text-red-400 hover:bg-red-500/10">
                    Delete Account
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default function AccountPage() {
  return (
    <StoreProvider>
      <div className="min-h-screen bg-[#0a0a0a]">
        <AccountContent />
      </div>
    </StoreProvider>
  );
}
