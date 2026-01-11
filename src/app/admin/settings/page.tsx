"use client";

import { motion } from "framer-motion";
import { 
  Save, 
  Store, 
  Globe, 
  Bell, 
  Shield, 
  CreditCard
} from "lucide-react";

export default function AdminSettings() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-light tracking-tight">Settings</h2>
          <p className="text-white/40 mt-1">Configure your store preferences and system.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-black rounded-xl font-medium hover:bg-amber-400 transition-colors">
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* General Settings */}
          <section className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/5 space-y-6">
            <div className="flex items-center gap-2 text-amber-500">
              <Store className="w-5 h-5" />
              <h3 className="font-medium">Store Profile</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs text-white/40 uppercase tracking-wider">Store Name</label>
                <input type="text" defaultValue="ATELIER Premium Menswear" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-amber-500/50" />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-white/40 uppercase tracking-wider">Support Email</label>
                <input type="email" defaultValue="support@atelier.com" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-amber-500/50" />
              </div>
            </div>
          </section>

          {/* Regional Settings */}
          <section className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/5 space-y-6">
            <div className="flex items-center gap-2 text-amber-500">
              <Globe className="w-5 h-5" />
              <h3 className="font-medium">Regional & Currency</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs text-white/40 uppercase tracking-wider">Default Currency</label>
                <select className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-amber-500/50">
                  <option>USD ($)</option>
                  <option>EUR (€)</option>
                  <option>GBP (£)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs text-white/40 uppercase tracking-wider">Timezone</label>
                <select className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-amber-500/50">
                  <option>Eastern Time (US & Canada)</option>
                  <option>Pacific Time (US & Canada)</option>
                  <option>UTC</option>
                </select>
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/5 space-y-4">
            <h4 className="text-sm font-medium">System Status</h4>
            <div className="space-y-3">
              {[
                { label: "API", status: "Operational", color: "text-green-400" },
                { label: "Payments", status: "Operational", color: "text-green-400" },
                { label: "Inventory Sync", status: "Operational", color: "text-green-400" },
              ].map((s) => (
                <div key={s.label} className="flex items-center justify-between text-xs">
                  <span className="text-white/40">{s.label}</span>
                  <span className={s.color}>{s.status}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-amber-500/5 border border-amber-500/10 space-y-4">
            <h4 className="text-sm font-medium text-amber-500">Quick Help</h4>
            <p className="text-xs text-white/60 leading-relaxed">
              Need assistance with your store configuration? Check our documentation or contact technical support.
            </p>
            <button className="text-xs font-medium text-amber-500 hover:underline">View Documentation</button>
          </div>
        </div>
      </div>
    </div>
  );
}
