"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save, Shield, Bell, Globe, Database, User, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface SettingsData {
  store_name: string;
  contact_email: string;
  currency: string;
  two_factor_auth: string;
  api_access: string;
  order_alerts: string;
  inventory_warnings: string;
}

export default function AdminSettings() {
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [settings, setSettings] = useState<SettingsData>({
    store_name: "",
    contact_email: "",
    currency: "",
    two_factor_auth: "",
    api_access: "",
    order_alerts: "",
    inventory_warnings: "",
  });

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch("/api/settings");
        if (!res.ok) throw new Error("Failed to fetch settings");
        const data = await res.json();
        setSettings(data);
      } catch (error) {
        toast.error("Error loading settings");
      } finally {
        setIsLoading(false);
      }
    }
    fetchSettings();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (!res.ok) throw new Error("Failed to save settings");

      toast.success("Settings updated successfully", {
        description: "Your store configuration has been saved.",
      });
    } catch (error) {
      toast.error("Failed to save settings");
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (key: keyof SettingsData, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
        <p className="text-white/40 animate-pulse uppercase tracking-[0.2em] text-xs">Loading Settings...</p>
      </div>
    );
  }

  const sections = [
    {
      title: "Store Information",
      icon: Globe,
      fields: [
        { label: "Store Name", key: "store_name", type: "text" },
        { label: "Contact Email", key: "contact_email", type: "email" },
        { label: "Currency", key: "currency", type: "text" },
      ],
    },
    {
      title: "Security",
      icon: Shield,
      fields: [
        { label: "Two-Factor Authentication", key: "two_factor_auth", type: "text" },
        { label: "API Access", key: "api_access", type: "text" },
      ],
    },
    {
      title: "Notifications",
      icon: Bell,
      fields: [
        { label: "Order Alerts", key: "order_alerts", type: "text" },
        { label: "Inventory Warnings", key: "inventory_warnings", type: "text" },
      ],
    },
  ];

  return (
    <div className="space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-light tracking-tight uppercase tracking-[0.1em]">Settings</h2>
          <p className="text-white/40 mt-1">Configure your store preferences and system.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed text-black rounded-xl text-sm font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-amber-500/20"
        >
          {isSaving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {isSaving ? "Saving Changes..." : "Save Changes"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {sections.map((section, idx) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 rounded-2xl bg-[#0a0a0a] border border-white/5 space-y-8 backdrop-blur-sm"
            >
              <div className="flex items-center gap-3 pb-6 border-b border-white/5">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500">
                  <section.icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-medium tracking-wide">{section.title}</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {section.fields.map((field) => (
                  <div key={field.label} className="space-y-2.5">
                    <label className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-medium ml-1">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      value={(settings as any)[field.key] || ""}
                      onChange={(e) => handleChange(field.key as keyof SettingsData, e.target.value)}
                      className="w-full p-4 bg-white/[0.03] border border-white/5 rounded-xl text-sm text-white/90 focus:outline-none focus:border-amber-500/50 focus:bg-white/[0.05] transition-all placeholder:text-white/10"
                      placeholder={`Enter ${field.label.toLowerCase()}...`}
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="p-8 rounded-2xl bg-[#0a0a0a] border border-white/5 space-y-6 backdrop-blur-sm">
            <h3 className="font-medium tracking-wide flex items-center gap-2">
              <Database className="w-4 h-4 text-amber-500" />
              System Status
            </h3>
            <div className="space-y-5">
              {[
                { label: "Database", status: "Operational", color: "text-emerald-400" },
                { label: "Payment Gateway", status: "Operational", color: "text-emerald-400" },
                { label: "File Storage", status: "Operational", color: "text-emerald-400" },
                { label: "API Edge", status: "Operational", color: "text-emerald-400" },
              ].map((item) => (
                <div key={item.label} className="flex justify-between items-center text-xs">
                  <span className="text-white/40 uppercase tracking-widest font-medium">{item.label}</span>
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${item.color.replace('text', 'bg')} animate-pulse`} />
                    <span className={`font-medium ${item.color}`}>{item.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-amber-500/5 border border-amber-500/10 space-y-5 backdrop-blur-sm">
            <div className="flex items-center gap-3 text-amber-500">
              <div className="p-2 rounded-lg bg-amber-500/10">
                <Shield className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-semibold tracking-wide">Backup Required</h4>
            </div>
            <p className="text-xs text-white/40 leading-relaxed font-light">
              Your last system backup was performed 14 days ago. We recommend scheduling a new backup to ensure data safety.
            </p>
            <button className="w-full py-3 bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 text-xs font-semibold rounded-xl transition-all border border-amber-500/20 uppercase tracking-widest">
              Backup Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
