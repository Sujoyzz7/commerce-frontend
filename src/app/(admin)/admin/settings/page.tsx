"use client";

import { useState, useEffect } from "react";
import { Save, Loader2, Globe, Mail, DollarSign, Shield, Bell, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

interface Settings {
  store_name: string;
  contact_email: string;
  currency: string;
  two_factor_auth: string;
  api_access: string;
  order_alerts: string;
  inventory_warnings: string;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    store_name: "",
    contact_email: "",
    currency: "USD ($)",
    two_factor_auth: "Disabled",
    api_access: "Restricted",
    order_alerts: "Email Only",
    inventory_warnings: "Email Only",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const response = await fetch("/api/settings");
        if (response.ok) {
          const data = await response.json();
          if (data) setSettings(data);
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchSettings();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (response.ok) {
        toast.success("Settings saved successfully");
      } else {
        throw new Error("Failed to save settings");
      }
    } catch (error) {
      toast.error("Failed to save settings");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-light tracking-tight uppercase tracking-[0.1em]">Settings</h2>
          <p className="text-white/40 mt-1">Manage your store configuration and preferences.</p>
        </div>
        <Button 
          onClick={handleSave} 
          disabled={isSaving}
          className="bg-amber-500 hover:bg-amber-600 text-black font-medium min-w-[140px]"
        >
          {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* General Store Information */}
        <Card className="bg-white/5 border-white/10 text-white shadow-2xl">
          <CardHeader>
            <CardTitle className="text-lg font-light flex items-center gap-2 uppercase tracking-wider">
              <Globe className="w-4 h-4 text-amber-500" /> General Info
            </CardTitle>
            <CardDescription className="text-white/40">Public information about your brand.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="store_name" className="text-white/60 text-xs uppercase tracking-widest">Store Name</Label>
              <Input
                id="store_name"
                value={settings.store_name}
                onChange={(e) => setSettings({ ...settings, store_name: e.target.value })}
                className="bg-black/50 border-white/10 text-white focus:ring-amber-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact_email" className="text-white/60 text-xs uppercase tracking-widest">Contact Email</Label>
              <Input
                id="contact_email"
                type="email"
                value={settings.contact_email}
                onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
                className="bg-black/50 border-white/10 text-white focus:ring-amber-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency" className="text-white/60 text-xs uppercase tracking-widest">Default Currency</Label>
              <Input
                id="currency"
                value={settings.currency}
                onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                className="bg-black/50 border-white/10 text-white focus:ring-amber-500"
              />
            </div>
          </CardContent>
        </Card>

        {/* Security & Access */}
        <Card className="bg-white/5 border-white/10 text-white shadow-2xl">
          <CardHeader>
            <CardTitle className="text-lg font-light flex items-center gap-2 uppercase tracking-wider">
              <Shield className="w-4 h-4 text-emerald-500" /> Security
            </CardTitle>
            <CardDescription className="text-white/40">Protect your admin workspace.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-white/60 text-xs uppercase tracking-widest">Two-Factor Auth</Label>
              <Input
                value={settings.two_factor_auth}
                onChange={(e) => setSettings({ ...settings, two_factor_auth: e.target.value })}
                className="bg-black/50 border-white/10 text-white focus:ring-amber-500"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white/60 text-xs uppercase tracking-widest">API Access</Label>
              <Input
                value={settings.api_access}
                onChange={(e) => setSettings({ ...settings, api_access: e.target.value })}
                className="bg-black/50 border-white/10 text-white focus:ring-amber-500"
              />
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="bg-white/5 border-white/10 text-white shadow-2xl md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-light flex items-center gap-2 uppercase tracking-wider">
              <Bell className="w-4 h-4 text-blue-500" /> Notifications
            </CardTitle>
            <CardDescription className="text-white/40">Configure how you receive alerts.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-white/60 text-xs uppercase tracking-widest flex items-center gap-2">
                Order Alerts <Mail className="w-3 h-3" />
              </Label>
              <Input
                value={settings.order_alerts}
                onChange={(e) => setSettings({ ...settings, order_alerts: e.target.value })}
                className="bg-black/50 border-white/10 text-white focus:ring-amber-500"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white/60 text-xs uppercase tracking-widest flex items-center gap-2">
                Inventory Warnings <AlertTriangle className="w-3 h-3" />
              </Label>
              <Input
                value={settings.inventory_warnings}
                onChange={(e) => setSettings({ ...settings, inventory_warnings: e.target.value })}
                className="bg-black/50 border-white/10 text-white focus:ring-amber-500"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
