"use client";

import { Truck, RotateCcw, ShieldCheck, Globe } from "lucide-react";

export default function ShippingReturnsPage() {
  const shippingMethods = [
    {
      name: "Standard Delivery",
      time: "3-5 business days",
      price: "$10.00",
      description: "Free for orders over $250"
    },
    {
      name: "Express Delivery",
      time: "1-2 business days",
      price: "$25.00",
      description: "Fastest option for urgent orders"
    },
    {
      name: "International Shipping",
      time: "7-14 business days",
      price: "$45.00",
      description: "Available to over 50 countries"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-4xl font-light tracking-tight text-white mb-12 text-center">
          Shipping & Returns
        </h1>

        <div className="space-y-16">
          {/* Shipping Section */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Truck className="w-6 h-6 text-amber-500" />
              <h2 className="text-2xl font-light text-white">Shipping Policy</h2>
            </div>
            <p className="text-white/60 font-light mb-8 leading-relaxed">
              We strive to deliver your Atelier pieces as quickly and safely as possible. All orders are processed within 24-48 hours of being placed, Monday through Friday.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {shippingMethods.map((method) => (
                <div key={method.name} className="p-6 bg-white/5 border border-white/10 rounded-xl">
                  <h3 className="text-white font-medium mb-1">{method.name}</h3>
                  <p className="text-amber-500 text-sm mb-3">{method.time}</p>
                  <p className="text-white text-lg mb-2">{method.price}</p>
                  <p className="text-white/40 text-xs">{method.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Returns Section */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <RotateCcw className="w-6 h-6 text-amber-500" />
              <h2 className="text-2xl font-light text-white">Returns & Exchanges</h2>
            </div>
            <div className="prose prose-invert max-w-none text-white/60 font-light space-y-4">
              <p>
                If you are not completely satisfied with your purchase, we offer a 14-day return window from the date of delivery.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Items must be returned in their original condition, unworn, unwashed, and with all tags attached.</li>
                <li>Footwear must include the original shoe box in its original condition.</li>
                <li>Made-to-measure and personalized items are final sale and cannot be returned.</li>
                <li>Return shipping costs are the responsibility of the customer, unless the item is faulty.</li>
              </ul>
            </div>
          </section>

          {/* How to Return */}
          <section className="bg-white/5 p-8 rounded-2xl border border-white/10">
            <h3 className="text-xl font-light text-white mb-4">How to initiate a return</h3>
            <ol className="list-decimal pl-5 text-white/60 font-light space-y-3">
              <li>Log in to your Atelier account and navigate to "Order History".</li>
              <li>Select the order you wish to return and follow the prompts to generate a return request.</li>
              <li>Pack your items securely and include the original invoice.</li>
              <li>Affix the shipping label and drop it off at your nearest courier location.</li>
              <li>Once received and inspected, your refund will be processed within 5-7 business days.</li>
            </ol>
          </section>

          {/* Additional Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-white/10">
            <div className="flex gap-4">
              <ShieldCheck className="w-5 h-5 text-amber-500 flex-shrink-0" />
              <div>
                <h4 className="text-white font-medium mb-1">Secure Packaging</h4>
                <p className="text-white/50 text-sm">Every order is hand-packed in our signature dust bags and premium boxes.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Globe className="w-5 h-5 text-amber-500 flex-shrink-0" />
              <div>
                <h4 className="text-white font-medium mb-1">Customs & Duties</h4>
                <p className="text-white/50 text-sm">For international orders, customs duties and taxes are calculated at checkout.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
