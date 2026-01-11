"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Truck, Package, CheckCircle2, Clock, MapPin } from "lucide-react";

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "found" | "error">("idle");

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    // Simulate API call
    setTimeout(() => {
      if (orderId === "12345") {
        setStatus("found");
      } else {
        setStatus("error");
      }
    }, 1500);
  };

  const trackingSteps = [
    { status: "Order Placed", date: "Oct 24, 2024 - 10:30 AM", icon: Clock, completed: true },
    { status: "Processing", date: "Oct 24, 2024 - 02:15 PM", icon: Package, completed: true },
    { status: "Shipped", date: "Oct 25, 2024 - 09:00 AM", icon: Truck, completed: true },
    { status: "Out for Delivery", date: "Oct 26, 2024 - 08:30 AM", icon: MapPin, completed: false },
    { status: "Delivered", date: "Pending", icon: CheckCircle2, completed: false },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl font-light tracking-tight text-white mb-6">
            Track Your Order
          </h1>
          <p className="text-white/60 font-light">
            Enter your order number and email address to view the current status of your shipment.
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 p-8 rounded-3xl max-w-2xl mx-auto">
          <form onSubmit={handleTrack} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm text-white/60 font-light">Order Number</label>
                <Input
                  required
                  placeholder="e.g. 12345"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-white/60 font-light">Email Address</label>
                <Input
                  required
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
            </div>
            <Button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-amber-500 hover:bg-amber-600 text-black py-6"
            >
              {status === "loading" ? "Tracking..." : "Track Order"}
            </Button>
          </form>

          {status === "error" && (
            <p className="text-red-400 text-sm mt-6 text-center">
              Order not found. Please check your details and try again.
            </p>
          )}
        </div>

        {status === "found" && (
          <div className="mt-16 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left border-b border-white/10 pb-12">
              <div>
                <p className="text-white/40 text-sm mb-1">Tracking Number</p>
                <p className="text-white font-medium">ATL-9823475102</p>
              </div>
              <div>
                <p className="text-white/40 text-sm mb-1">Carrier</p>
                <p className="text-white font-medium">DHL Express</p>
              </div>
              <div>
                <p className="text-white/40 text-sm mb-1">Estimated Delivery</p>
                <p className="text-amber-500 font-medium">Oct 26, 2024</p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-px bg-white/10 hidden sm:block" />
              <div className="space-y-12">
                {trackingSteps.map((step, idx) => {
                  const Icon = step.icon;
                  return (
                    <div key={idx} className="flex flex-col sm:flex-row gap-6 relative">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${
                        step.completed ? 'bg-amber-500 text-black' : 'bg-white/5 text-white/20 border border-white/10'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className={`font-medium ${step.completed ? 'text-white' : 'text-white/30'}`}>
                            {step.status}
                          </h3>
                          <span className="text-xs text-white/40">{step.date}</span>
                        </div>
                        <p className="text-sm text-white/40 font-light">
                          {step.completed ? "Your package has completed this step." : "This step is currently in progress or pending."}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
