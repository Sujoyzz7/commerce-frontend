"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SizeGuidePage() {
  const categories = [
    {
      id: "shirts",
      name: "Shirts & Knitwear",
      sizes: [
        { label: "XS", chest: "34-36", waist: "28-30", neck: "14.5" },
        { label: "S", chest: "36-38", waist: "30-32", neck: "15" },
        { label: "M", chest: "38-40", waist: "32-34", neck: "15.5" },
        { label: "L", chest: "40-42", waist: "34-36", neck: "16.5" },
        { label: "XL", chest: "42-44", waist: "36-38", neck: "17.5" },
        { label: "XXL", chest: "44-46", waist: "38-40", neck: "18.5" }
      ]
    },
    {
      id: "trousers",
      name: "Trousers & Denim",
      sizes: [
        { label: "28", waist: "28", hip: "34", insideLeg: "32" },
        { label: "30", waist: "30", hip: "36", insideLeg: "32" },
        { label: "32", waist: "32", hip: "38", insideLeg: "32" },
        { label: "34", waist: "34", hip: "40", insideLeg: "32" },
        { label: "36", waist: "36", hip: "42", insideLeg: "32" },
        { label: "38", waist: "38", hip: "44", insideLeg: "32" }
      ]
    },
    {
      id: "outerwear",
      name: "Outerwear",
      sizes: [
        { label: "46", chest: "36", shoulder: "17.5", sleeve: "25.5" },
        { label: "48", chest: "38", shoulder: "18", sleeve: "26" },
        { label: "50", chest: "40", shoulder: "18.5", sleeve: "26.5" },
        { label: "52", chest: "42", shoulder: "19", sleeve: "27" },
        { label: "54", chest: "44", shoulder: "19.5", sleeve: "27.5" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-4xl font-light tracking-tight text-white mb-6 text-center">
          Size Guide
        </h1>
        <p className="text-white/60 font-light text-center mb-12 max-w-2xl mx-auto">
          Our garments are designed for a contemporary tailored fit. Use our detailed measurement charts below to find your perfect size. All measurements are in inches.
        </p>

        <Tabs defaultValue="shirts" className="w-full">
          <TabsList className="w-full bg-white/5 border border-white/10 h-14 p-1 mb-8">
            {categories.map((cat) => (
              <TabsTrigger
                key={cat.id}
                value={cat.id}
                className="flex-1 text-white/60 data-[state=active]:bg-amber-500 data-[state=active]:text-black font-light transition-all"
              >
                {cat.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((cat) => (
            <TabsContent key={cat.id} value={cat.id} className="mt-0">
              <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/5">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="p-4 text-amber-500 font-medium text-sm">Size</th>
                      {Object.keys(cat.sizes[0]).filter(k => k !== 'label').map(key => (
                        <th key={key} className="p-4 text-white font-medium text-sm capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {cat.sizes.map((size, idx) => (
                      <tr key={idx} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                        <td className="p-4 text-white font-medium">{size.label}</td>
                        {Object.entries(size).filter(([k]) => k !== 'label').map(([k, v]) => (
                          <td key={k} className="p-4 text-white/60 font-light">{v}"</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Measuring Tips */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-light text-white mb-6">How to Measure</h2>
            <div className="space-y-6 text-white/60 font-light">
              <div>
                <h3 className="text-white font-medium mb-2">1. Chest</h3>
                <p>Measure around the fullest part of your chest, keeping the tape horizontal under your arms.</p>
              </div>
              <div>
                <h3 className="text-white font-medium mb-2">2. Waist</h3>
                <p>Measure around your natural waistline, which is the narrowest part of your waist.</p>
              </div>
              <div>
                <h3 className="text-white font-medium mb-2">3. Hips</h3>
                <p>Measure around the fullest part of your hips, approximately 8 inches below your waist.</p>
              </div>
            </div>
          </div>
          <div className="bg-white/5 p-8 rounded-2xl border border-white/10 flex flex-col justify-center">
            <h3 className="text-xl font-light text-white mb-4">Still unsure about your size?</h3>
            <p className="text-white/60 font-light mb-6">
              Our styling experts are available to provide personalized sizing advice based on your measurements and preferred fit.
            </p>
            <a href="/contact" className="text-amber-500 hover:text-amber-400 transition-colors font-medium flex items-center gap-2">
              Speak with a stylist →
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
