"use client";

import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Clock
} from "lucide-react";

const stats = [
  { label: "Total Revenue", value: "$42,580.00", icon: DollarSign, trend: "+12.5%", positive: true },
  { label: "Active Orders", value: "156", icon: ShoppingBag, trend: "+5.2%", positive: true },
  { label: "Total Customers", value: "2,845", icon: Users, trend: "+8.1%", positive: true },
  { label: "Conversion Rate", value: "3.2%", icon: TrendingUp, trend: "-1.4%", positive: false },
];

const recentOrders = [
  { id: "#ORD-7429", customer: "Alexander Knight", status: "Processing", amount: "$845.00", time: "2 mins ago" },
  { id: "#ORD-7428", customer: "Sophia Chen", status: "Shipped", amount: "$320.00", time: "15 mins ago" },
  { id: "#ORD-7427", customer: "Marcus Thorne", status: "Delivered", amount: "$1,240.00", time: "1 hour ago" },
  { id: "#ORD-7426", customer: "Isabella Vane", status: "Processing", amount: "$215.00", time: "3 hours ago" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-light tracking-tight">Dashboard</h2>
        <p className="text-white/40 mt-1">Welcome back. Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-stats gap-4 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/5"
          >
            <div className="flex items-start justify-between">
              <div className="p-2 rounded-lg bg-white/5 border border-white/5">
                <stat.icon className="w-5 h-5 text-amber-500" />
              </div>
              <div className={`flex items-center gap-1 text-xs font-medium ${stat.positive ? "text-green-400" : "text-red-400"}`}>
                {stat.trend}
                {stat.positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-white/40">{stat.label}</p>
              <h3 className="text-2xl font-medium mt-1">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-light">Recent Orders</h3>
            <button className="text-xs text-amber-500 hover:text-amber-400 transition-colors">View all</button>
          </div>
          <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/5 text-xs font-medium text-white/40 uppercase tracking-wider">
                    <th className="px-6 py-4">Order ID</th>
                    <th className="px-6 py-4">Customer</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4 text-right">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.02]">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-white/[0.01] transition-colors">
                      <td className="px-6 py-4 text-sm font-medium">{order.id}</td>
                      <td className="px-6 py-4 text-sm text-white/60">{order.customer}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wider border ${
                          order.status === "Processing" ? "border-amber-500/20 text-amber-500 bg-amber-500/5" :
                          order.status === "Shipped" ? "border-blue-500/20 text-blue-400 bg-blue-500/5" :
                          "border-green-500/20 text-green-400 bg-green-500/5"
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium">{order.amount}</td>
                      <td className="px-6 py-4 text-right text-xs text-white/40">
                        <div className="flex items-center justify-end gap-1.5">
                          <Clock className="w-3 h-3" />
                          {order.time}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Quick Actions / Activity */}
        <div className="space-y-4">
          <h3 className="text-xl font-light">Inventory Alerts</h3>
          <div className="space-y-3">
            {[
              { item: "Merino Wool Overcoat", stock: "Low Stock: 2 left", urgent: true },
              { item: "Cashmere Turtleneck", stock: "Out of Stock", urgent: true },
              { item: "Leather Chelsea Boots", stock: "Low Stock: 5 left", urgent: false },
            ].map((alert, i) => (
              <div key={i} className="p-4 rounded-xl bg-[#0a0a0a] border border-white/5 flex items-center justify-between group hover:border-white/10 transition-colors">
                <div>
                  <p className="text-sm font-medium">{alert.item}</p>
                  <p className={`text-xs mt-0.5 ${alert.urgent ? "text-red-400" : "text-amber-500"}`}>{alert.stock}</p>
                </div>
                <button className="p-2 rounded-lg bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
