"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ShoppingBag, Settings, LogOut, Package } from "lucide-react";

const sidebarLinks = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Products", href: "/admin/products", icon: ShoppingBag },
  { name: "Orders", href: "/admin/orders", icon: Package },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-[#0a0a0a] text-white">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 flex flex-col fixed inset-y-0">
        <div className="p-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-light tracking-[0.3em]">ATELIER</span>
            <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-white/40 uppercase tracking-widest font-medium">Admin</span>
          </Link>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                  isActive
                    ? "bg-amber-500 text-black font-medium"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className="w-4 h-4" />
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm text-white/40 hover:text-white hover:bg-white/5 transition-all">
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
