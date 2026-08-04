"use client";
import { motion } from "framer-motion";
import { TrendingUp, Database, ShieldCheck, Activity } from "lucide-react";
import { SupplyChart } from "@/components/SupplyChart";

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-[#09090b] text-white p-6 lg:p-12">
      {/* Header */}
      <header className="flex justify-between items-center mb-12">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 bg-[#f7931a] rounded-full flex items-center justify-center">
            <Activity className="text-black" size={24} />
          </div>
          <h1 className="text-2xl font-bold tracking-tighter">BITCOIN SUPPLY INTELLIGENCE</h1>
        </motion.div>
        <div className="flex gap-4">
          <div className="px-4 py-2 glass-card text-sm font-medium">Network: Mainnet</div>
          <button className="px-4 py-2 bg-[#f7931a] text-black rounded-lg font-bold text-sm hover:bg-[#e88a18] transition-colors">
            Connect Wallet
          </button>
        </div>
      </header>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: "Circulating Supply", value: "19,701,452", icon: Database, color: "text-blue-400" },
          { label: "Market Price", value: "$67,432.10", icon: TrendingUp, color: "text-emerald-400" },
          { label: "Liquid Supply", value: "15,200,411", icon: Activity, color: "text-orange-400" },
          { label: "Security Budget", value: "98.4%", icon: ShieldCheck, color: "text-purple-400" },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <item.icon className={item.color} size={20} />
              <span className="text-emerald-500 text-xs font-bold">+2.4%</span>
            </div>
            <p className="text-zinc-400 text-xs uppercase tracking-wider font-semibold">{item.label}</p>
            <h3 className="text-2xl font-bold mt-1">{item.value}</h3>
          </motion.div>
        ))}
      </div>

      {/* Main Chart Section */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-8"
      >
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-xl font-bold">Supply Issuance Curve</h2>
            <p className="text-zinc-500 text-sm">Real-time visualization of Bitcoin total supply growth</p>
          </div>
          <div className="flex bg-zinc-900 p-1 rounded-md">
            {['1D', '1W', '1M', '1Y', 'ALL'].map((t) => (
              <button key={t} className="px-3 py-1 text-xs font-bold hover:bg-zinc-800 rounded transition-all">{t}</button>
            ))}
          </div>
        </div>
        <SupplyChart />
      </motion.div>
    </main>
  );
}