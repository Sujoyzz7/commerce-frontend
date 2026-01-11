"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Instagram, Twitter, Facebook, Youtube, Mail, MapPin, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <span className="text-xl font-light tracking-[0.3em] text-white">
              ATELIER
            </span>
            <p className="mt-6 text-sm text-white/50 leading-relaxed">
              Curated luxury menswear for the modern gentleman. Timeless pieces crafted with exceptional quality.
            </p>
            <div className="flex gap-4 mt-6">
              {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-white tracking-wider mb-6">SHOP</h4>
            <ul className="space-y-4">
              {["New Arrivals", "Best Sellers", "Outerwear", "Knitwear", "Tailoring", "Accessories", "Sale"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href="/products"
                      className="text-sm text-white/50 hover:text-white transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

            <div>
              <h4 className="text-sm font-medium text-white tracking-wider mb-6">HELP</h4>
              <ul className="space-y-4">
                {[
                  { name: "Contact Us", href: "/contact" },
                  { name: "Shipping & Returns", href: "/shipping-returns" },
                  { name: "Size Guide", href: "/size-guide" },
                  { name: "FAQs", href: "/faqs" },
                  { name: "Track Order", href: "/track-order" },
                  { name: "Gift Cards", href: "/gift-cards" },
                ].map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-white/50 hover:text-white transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          <div>
            <h4 className="text-sm font-medium text-white tracking-wider mb-6">CONTACT</h4>
            <ul className="space-y-4 text-sm text-white/50">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>123 Fashion Avenue<br />New York, NY 10001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>hello@atelier.com</span>
              </li>
            </ul>
            <div className="mt-8">
              <h5 className="text-xs font-medium text-white tracking-wider mb-3">NEWSLETTER</h5>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="h-10 bg-white/5 border-white/10 text-white placeholder:text-white/30 text-sm flex-1"
                />
                <Button className="h-10 bg-amber-500 hover:bg-amber-600 text-black px-4">
                  <Mail className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            © 2024 Atelier. All rights reserved.
          </p>
            <div className="flex items-center gap-6 text-xs text-white/30">
              <Link href="/admin" className="hover:text-white transition-colors">
                Admin Panel
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
