"use client";

import { motion } from "framer-motion";
import { 
  Search, 
  Filter, 
  Mail,
  MoreVertical,
  UserPlus
} from "lucide-react";

const customers = [
  { id: "C-1001", name: "Alexander Knight", email: "alex.knight@example.com", orders: 12, spent: "$4,250.00", status: "VIP" },
  { id: "C-1002", name: "Sophia Chen", email: "s.chen@example.com", orders: 4, spent: "$1,120.00", status: "Active" },
  { id: "C-1003", name: "Marcus Thorne", email: "m.thorne@example.com", orders: 28, spent: "$12,400.00", status: "VIP" },
  { id: "C-1004", name: "Isabella Vane", email: "ivane@example.com", orders: 2, spent: "$450.00", status: "New" },
  { id: "C-1005", name: "Julian Reed", email: "jreed@example.com", orders: 8, spent: "$2,100.00", status: "Active" },
];

export default function AdminCustomers() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-light tracking-tight">Customers</h2>
          <p className="text-white/40 mt-1">Manage your customer relationships and data.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-black rounded-xl font-medium hover:bg-amber-400 transition-colors">
          <UserPlus className="w-4 h-4" />
          Add Customer
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
          <input
            type="text"
            placeholder="Search customers..."
            className="w-full bg-[#0a0a0a] border border-white/5 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-amber-500/50 transition-all"
          />
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-[#0a0a0a] border border-white/5 rounded-xl text-sm text-white/60 hover:text-white transition-colors">
            <Filter className="w-4 h-4" />
            Status
          </button>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 text-xs font-medium text-white/40 uppercase tracking-wider">
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Orders</th>
                <th className="px-6 py-4">Total Spent</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.02]">
              {customers.map((customer, index) => (
                <motion.tr
                  key={customer.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group hover:bg-white/[0.01] transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{customer.name}</span>
                      <span className="text-xs text-white/40">{customer.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wider border ${
                      customer.status === "VIP" ? "border-amber-500/20 text-amber-500 bg-amber-500/5" :
                      customer.status === "New" ? "border-blue-500/20 text-blue-400 bg-blue-500/5" :
                      "border-white/10 text-white/60 bg-white/5"
                    }`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-white/60">{customer.orders} orders</td>
                  <td className="px-6 py-4 text-sm font-medium text-amber-500">{customer.spent}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 rounded-lg hover:bg-white/5 text-white/40 hover:text-white transition-colors">
                        <Mail className="w-4 h-4" />
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
