"use client";

import { motion } from "framer-motion";
import { 
  Search, 
  Filter, 
  Eye, 
  Download,
  MoreVertical,
  Calendar
} from "lucide-react";

const orders = [
  { id: "#ORD-7429", customer: "Alexander Knight", date: "Oct 24, 2024", status: "Processing", amount: "$845.00", items: 3 },
  { id: "#ORD-7428", customer: "Sophia Chen", date: "Oct 24, 2024", status: "Shipped", amount: "$320.00", items: 1 },
  { id: "#ORD-7427", customer: "Marcus Thorne", date: "Oct 23, 2024", status: "Delivered", amount: "$1,240.00", items: 5 },
  { id: "#ORD-7426", customer: "Isabella Vane", date: "Oct 23, 2024", status: "Cancelled", amount: "$215.00", items: 2 },
  { id: "#ORD-7425", customer: "Julian Reed", date: "Oct 22, 2024", status: "Delivered", amount: "$450.00", items: 2 },
];

export default function AdminOrders() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-light tracking-tight">Orders</h2>
          <p className="text-white/40 mt-1">Manage and track customer orders.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl font-medium hover:bg-white/10 transition-colors">
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
          <input
            type="text"
            placeholder="Search orders..."
            className="w-full bg-[#0a0a0a] border border-white/5 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-amber-500/50 transition-all"
          />
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-[#0a0a0a] border border-white/5 rounded-xl text-sm text-white/60 hover:text-white transition-colors">
            <Calendar className="w-4 h-4" />
            Last 30 Days
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-[#0a0a0a] border border-white/5 rounded-xl text-sm text-white/60 hover:text-white transition-colors">
            <Filter className="w-4 h-4" />
            Status
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 text-xs font-medium text-white/40 uppercase tracking-wider">
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Items</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.02]">
              {orders.map((order, index) => (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group hover:bg-white/[0.01] transition-colors"
                >
                  <td className="px-6 py-4 text-sm font-medium">{order.id}</td>
                  <td className="px-6 py-4 text-sm text-white/60">{order.customer}</td>
                  <td className="px-6 py-4 text-sm text-white/40">{order.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wider border ${
                      order.status === "Processing" ? "border-amber-500/20 text-amber-500 bg-amber-500/5" :
                      order.status === "Shipped" ? "border-blue-500/20 text-blue-400 bg-blue-500/5" :
                      order.status === "Cancelled" ? "border-red-500/20 text-red-400 bg-red-500/5" :
                      "border-green-500/20 text-green-400 bg-green-500/5"
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-white/40">{order.items} items</td>
                  <td className="px-6 py-4 text-sm font-medium">{order.amount}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 rounded-lg hover:bg-white/5 text-white/40 hover:text-white transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-white/5 text-white/40 hover:text-white transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
