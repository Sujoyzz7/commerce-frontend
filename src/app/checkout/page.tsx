"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { StoreProvider, useStore } from "@/lib/store-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronRight,
  Check,
  CreditCard,
  Truck,
  Package,
  ShieldCheck,
  Minus,
  Plus,
  Trash2,
  Lock,
} from "lucide-react";

function CheckoutContent() {
  const { cart, cartTotal, updateQuantity, removeFromCart } = useStore();
  const [step, setStep] = useState(1);
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    country: "US",
    state: "",
    zip: "",
    phone: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
    cardName: "",
  });

  const shippingCost = shippingMethod === "express" ? 15 : cartTotal >= 200 ? 0 : 9.99;
  const tax = cartTotal * 0.08;
  const total = cartTotal + shippingCost + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
  };

  if (cart.length === 0 && !orderPlaced) {
    return (
      <main className="min-h-screen bg-[#0a0a0a] pt-20 flex items-center justify-center">
        <div className="text-center">
          <Package className="w-16 h-16 text-white/20 mx-auto mb-4" />
          <h1 className="text-2xl text-white font-light">Your bag is empty</h1>
          <p className="text-white/40 mt-2">Add some items to checkout</p>
          <Link href="/products">
            <Button className="mt-6 bg-amber-500 hover:bg-amber-600 text-black">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  if (orderPlaced) {
    return (
      <main className="min-h-screen bg-[#0a0a0a] pt-20 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md mx-auto px-4"
        >
          <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-400" />
          </div>
          <h1 className="text-3xl text-white font-light">Order Confirmed!</h1>
          <p className="text-white/50 mt-4">
            Thank you for your purchase. We&apos;ll send you a confirmation email with tracking details shortly.
          </p>
          <p className="text-amber-500 text-lg mt-4">Order #ATL-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/5">
                Continue Shopping
              </Button>
            </Link>
            <Link href="/account">
              <Button className="bg-amber-500 hover:bg-amber-600 text-black">
                View Orders
              </Button>
            </Link>
          </div>
        </motion.div>
      </main>
    );
  }

  const steps = [
    { num: 1, label: "Information" },
    { num: 2, label: "Shipping" },
    { num: 3, label: "Payment" },
    { num: 4, label: "Review" },
  ];

  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-2 text-sm text-white/40 mb-8">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-white">Checkout</span>
        </div>

        <div className="flex justify-center mb-12">
          <div className="flex items-center">
            {steps.map((s, i) => (
              <div key={s.num} className="flex items-center">
                <button
                  onClick={() => step > s.num && setStep(s.num)}
                  className={`flex items-center gap-2 ${step >= s.num ? "cursor-pointer" : "cursor-default"}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                      step > s.num
                        ? "bg-green-500 text-white"
                        : step === s.num
                        ? "bg-amber-500 text-black"
                        : "bg-white/10 text-white/40"
                    }`}
                  >
                    {step > s.num ? <Check className="w-4 h-4" /> : s.num}
                  </div>
                  <span
                    className={`hidden sm:block text-sm ${
                      step >= s.num ? "text-white" : "text-white/40"
                    }`}
                  >
                    {s.label}
                  </span>
                </button>
                {i < steps.length - 1 && (
                  <div
                    className={`w-8 sm:w-16 h-px mx-2 sm:mx-4 ${
                      step > s.num ? "bg-green-500" : "bg-white/10"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="p-6 rounded-lg bg-white/5 border border-white/5">
                  <h2 className="text-lg font-light text-white mb-6">Contact Information</h2>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="email" className="text-white/60 text-sm">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="you@example.com"
                        className="mt-1 bg-white/5 border-white/10 text-white placeholder:text-white/30"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-white/60 text-sm">Phone (optional)</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+1 (555) 000-0000"
                        className="mt-1 bg-white/5 border-white/10 text-white placeholder:text-white/30"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-lg bg-white/5 border border-white/5">
                  <h2 className="text-lg font-light text-white mb-6">Shipping Address</h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName" className="text-white/60 text-sm">First Name</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="mt-1 bg-white/5 border-white/10 text-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="text-white/60 text-sm">Last Name</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="mt-1 bg-white/5 border-white/10 text-white"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="address" className="text-white/60 text-sm">Address</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="mt-1 bg-white/5 border-white/10 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="apartment" className="text-white/60 text-sm">Apartment, suite, etc. (optional)</Label>
                      <Input
                        id="apartment"
                        name="apartment"
                        value={formData.apartment}
                        onChange={handleInputChange}
                        className="mt-1 bg-white/5 border-white/10 text-white"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city" className="text-white/60 text-sm">City</Label>
                        <Input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="mt-1 bg-white/5 border-white/10 text-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor="country" className="text-white/60 text-sm">Country</Label>
                        <Select
                          value={formData.country}
                          onValueChange={(value) => setFormData({ ...formData, country: value })}
                        >
                          <SelectTrigger className="mt-1 bg-white/5 border-white/10 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-[#1a1a1a] border-white/10">
                            <SelectItem value="US">United States</SelectItem>
                            <SelectItem value="CA">Canada</SelectItem>
                            <SelectItem value="UK">United Kingdom</SelectItem>
                            <SelectItem value="AU">Australia</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="state" className="text-white/60 text-sm">State</Label>
                        <Input
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          className="mt-1 bg-white/5 border-white/10 text-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor="zip" className="text-white/60 text-sm">ZIP Code</Label>
                        <Input
                          id="zip"
                          name="zip"
                          value={formData.zip}
                          onChange={handleInputChange}
                          className="mt-1 bg-white/5 border-white/10 text-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => setStep(2)}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-black h-12"
                >
                  Continue to Shipping
                </Button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="p-6 rounded-lg bg-white/5 border border-white/5">
                  <h2 className="text-lg font-light text-white mb-6">Shipping Method</h2>
                  <RadioGroup value={shippingMethod} onValueChange={setShippingMethod}>
                    <label className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-colors ${
                      shippingMethod === "standard" ? "border-amber-500 bg-amber-500/5" : "border-white/10 hover:border-white/20"
                    }`}>
                      <div className="flex items-center gap-4">
                        <RadioGroupItem value="standard" id="standard" className="border-white/30 text-amber-500" />
                        <div>
                          <p className="text-white font-light">Standard Shipping</p>
                          <p className="text-sm text-white/40">5-7 business days</p>
                        </div>
                      </div>
                      <span className="text-white">{cartTotal >= 200 ? "Free" : "$9.99"}</span>
                    </label>
                    <label className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-colors mt-3 ${
                      shippingMethod === "express" ? "border-amber-500 bg-amber-500/5" : "border-white/10 hover:border-white/20"
                    }`}>
                      <div className="flex items-center gap-4">
                        <RadioGroupItem value="express" id="express" className="border-white/30 text-amber-500" />
                        <div>
                          <p className="text-white font-light">Express Shipping</p>
                          <p className="text-sm text-white/40">2-3 business days</p>
                        </div>
                      </div>
                      <span className="text-white">$15.00</span>
                    </label>
                  </RadioGroup>
                </div>

                <div className="flex gap-4">
                  <Button
                    onClick={() => setStep(1)}
                    variant="outline"
                    className="flex-1 border-white/20 text-white hover:bg-white/5 h-12"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={() => setStep(3)}
                    className="flex-1 bg-amber-500 hover:bg-amber-600 text-black h-12"
                  >
                    Continue to Payment
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="p-6 rounded-lg bg-white/5 border border-white/5">
                  <h2 className="text-lg font-light text-white mb-6">Payment Method</h2>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <label className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-colors ${
                      paymentMethod === "card" ? "border-amber-500 bg-amber-500/5" : "border-white/10 hover:border-white/20"
                    }`}>
                      <RadioGroupItem value="card" id="card" className="border-white/30 text-amber-500" />
                      <CreditCard className="w-5 h-5 text-white/60" />
                      <span className="text-white font-light">Credit / Debit Card</span>
                    </label>
                  </RadioGroup>

                  {paymentMethod === "card" && (
                    <div className="mt-6 space-y-4">
                      <div>
                        <Label htmlFor="cardNumber" className="text-white/60 text-sm">Card Number</Label>
                        <Input
                          id="cardNumber"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          placeholder="1234 5678 9012 3456"
                          className="mt-1 bg-white/5 border-white/10 text-white placeholder:text-white/30"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cardName" className="text-white/60 text-sm">Name on Card</Label>
                        <Input
                          id="cardName"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleInputChange}
                          className="mt-1 bg-white/5 border-white/10 text-white"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="cardExpiry" className="text-white/60 text-sm">Expiry Date</Label>
                          <Input
                            id="cardExpiry"
                            name="cardExpiry"
                            value={formData.cardExpiry}
                            onChange={handleInputChange}
                            placeholder="MM/YY"
                            className="mt-1 bg-white/5 border-white/10 text-white placeholder:text-white/30"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cardCvc" className="text-white/60 text-sm">CVC</Label>
                          <Input
                            id="cardCvc"
                            name="cardCvc"
                            value={formData.cardCvc}
                            onChange={handleInputChange}
                            placeholder="123"
                            className="mt-1 bg-white/5 border-white/10 text-white placeholder:text-white/30"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 text-sm text-white/40">
                  <Lock className="w-4 h-4" />
                  <span>Your payment is secured with 256-bit SSL encryption</span>
                </div>

                <div className="flex gap-4">
                  <Button
                    onClick={() => setStep(2)}
                    variant="outline"
                    className="flex-1 border-white/20 text-white hover:bg-white/5 h-12"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={() => setStep(4)}
                    className="flex-1 bg-amber-500 hover:bg-amber-600 text-black h-12"
                  >
                    Review Order
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="p-6 rounded-lg bg-white/5 border border-white/5">
                  <h2 className="text-lg font-light text-white mb-6">Review Your Order</h2>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Contact</span>
                      <span className="text-white">{formData.email}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Ship to</span>
                      <span className="text-white text-right">
                        {formData.address}, {formData.city}, {formData.state} {formData.zip}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Shipping</span>
                      <span className="text-white">
                        {shippingMethod === "express" ? "Express (2-3 days)" : "Standard (5-7 days)"}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Payment</span>
                      <span className="text-white">
                        Card ending in {formData.cardNumber.slice(-4) || "****"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    onClick={() => setStep(3)}
                    variant="outline"
                    className="flex-1 border-white/20 text-white hover:bg-white/5 h-12"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handlePlaceOrder}
                    className="flex-1 bg-amber-500 hover:bg-amber-600 text-black h-12"
                  >
                    <ShieldCheck className="w-4 h-4 mr-2" />
                    Place Order - ${total.toFixed(2)}
                  </Button>
                </div>
              </motion.div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 p-6 rounded-lg bg-white/5 border border-white/5">
              <h2 className="text-lg font-light text-white mb-6">Order Summary</h2>
              <div className="space-y-4 max-h-64 overflow-auto mb-6">
                {cart.map((item) => (
                  <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-4">
                    <div className="w-16 h-20 rounded-md overflow-hidden bg-white/10 flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-light text-white truncate">{item.name}</h4>
                      <p className="text-xs text-white/40 mt-1">
                        {item.selectedSize && `Size: ${item.selectedSize}`}
                        {item.selectedColor && ` • ${item.selectedColor}`}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-5 h-5 rounded border border-white/20 flex items-center justify-center text-white/60 hover:text-white"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs text-white">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-5 h-5 rounded border border-white/20 flex items-center justify-center text-white/60 hover:text-white"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-white/40 hover:text-red-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <span className="text-sm text-amber-500">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-4 border-t border-white/10">
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Subtotal</span>
                  <span className="text-white">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Shipping</span>
                  <span className="text-white">
                    {shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Tax</span>
                  <span className="text-white">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-light pt-3 border-t border-white/10">
                  <span className="text-white">Total</span>
                  <span className="text-amber-500">${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6 p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <div className="flex items-center gap-2 text-sm">
                  <Truck className="w-4 h-4 text-amber-400" />
                  <span className="text-amber-400">
                    {cartTotal >= 200
                      ? "You qualify for free shipping!"
                      : `Add $${(200 - cartTotal).toFixed(2)} more for free shipping`}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <CheckoutContent />
    </div>
  );
}
