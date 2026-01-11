"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Gift, CreditCard, Send, Mail } from "lucide-react";
import { useStore } from "@/lib/store-context";

export default function GiftCardsPage() {
  const [amount, setAmount] = useState("100");
  const { addToCart } = useStore();

  const amounts = ["25", "50", "100", "250", "500"];

  const handleAddToCart = () => {
    addToCart({
      id: `gift-card-${amount}`,
      name: `Atelier Gift Card - $${amount}`,
      price: parseFloat(amount),
      image: "https://images.unsplash.com/photo-1549465220-1d8c9d9c4703?q=80&w=2070&auto=format&fit=crop",
      quantity: 1,
      category: "Gift Cards"
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Gift Card Visual */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-amber-700 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative bg-zinc-900 border border-white/10 rounded-3xl overflow-hidden aspect-[1.6/1] p-8 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <span className="text-2xl font-light tracking-[0.3em] text-white">ATELIER</span>
                <Gift className="w-8 h-8 text-amber-500" />
              </div>
              <div>
                <p className="text-white/40 text-xs tracking-widest uppercase mb-1">Gift Card Amount</p>
                <p className="text-4xl font-light text-white">${amount}</p>
              </div>
              <div className="flex justify-between items-end">
                <p className="text-white/20 text-[10px] tracking-widest">VALID FOR 12 MONTHS</p>
                <div className="w-12 h-8 bg-white/5 rounded border border-white/10 flex items-center justify-center">
                  <div className="w-8 h-4 bg-amber-500/20 rounded-sm" />
                </div>
              </div>
            </div>
          </div>

          {/* Right: Selection */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-light tracking-tight text-white mb-4">
                Give the Gift of Luxury
              </h1>
              <p className="text-lg text-white/60 font-light">
                Perfect for any occasion, our digital gift cards are delivered instantly and can be used across our entire collection.
              </p>
            </div>

            <div className="space-y-4">
              <label className="text-sm text-white/60 font-light">Select Amount</label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                {amounts.map((a) => (
                  <button
                    key={a}
                    onClick={() => setAmount(a)}
                    className={`h-12 rounded-lg border flex items-center justify-center transition-all ${
                      amount === a
                        ? "bg-amber-500 border-amber-500 text-black"
                        : "bg-white/5 border-white/10 text-white hover:border-white/30"
                    }`}
                  >
                    ${a}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <label className="text-sm text-white/60 font-light">Custom Amount</label>
                <span className="text-[10px] text-white/20 uppercase tracking-widest">(Min $10)</span>
              </div>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">$</span>
                <Input
                  type="number"
                  placeholder="Enter amount"
                  className="bg-white/5 border-white/10 text-white pl-8 h-12"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>

            <Button
              onClick={handleAddToCart}
              className="w-full bg-amber-500 hover:bg-amber-600 text-black py-7 text-lg font-medium"
            >
              Add to Bag
            </Button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8 border-t border-white/10">
              <div className="flex gap-4">
                <Send className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <div>
                  <h4 className="text-white font-medium text-sm mb-1">Instant Delivery</h4>
                  <p className="text-white/40 text-xs">Delivered via email immediately after purchase.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <CreditCard className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <div>
                  <h4 className="text-white font-medium text-sm mb-1">Easy Redemption</h4>
                  <p className="text-white/40 text-xs">Redeem at checkout using your unique code.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/10 pt-24">
          <div className="text-center">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="w-6 h-6 text-amber-500" />
            </div>
            <h3 className="text-white font-light text-xl mb-4">Email Delivery</h3>
            <p className="text-white/40 font-light text-sm leading-relaxed">
              We'll send the digital gift card directly to your inbox or the recipient's email with instructions on how to redeem.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <Gift className="w-6 h-6 text-amber-500" />
            </div>
            <h3 className="text-white font-light text-xl mb-4">No Expiry</h3>
            <p className="text-white/40 font-light text-sm leading-relaxed">
              Our gift cards never expire and carry no additional processing fees, ensuring your gift maintains its full value.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <CreditCard className="w-6 h-6 text-amber-500" />
            </div>
            <h3 className="text-white font-light text-xl mb-4">Balance Check</h3>
            <p className="text-white/40 font-light text-sm leading-relaxed">
              Easily check your gift card balance anytime through your account dashboard or by contacting support.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
