"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Activity, Database, ShieldCheck, TrendingUp } from "lucide-react";
import { SupplyChart } from "@/components/SupplyChart";
import { fetchSupplyData } from "@/lib/api";

export default function Dashboard() {
  const [supplyData, setSupplyData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const data = await fetchSupplyData();
      setSupplyData(data);
      setLoading(false);
    }
    loadData();
  }, []);

  return (
    <main className="min-h-screen bg-[#09090b] text-white p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
              <Activity className="text-black" size={28} />
            </div>
            <h1 className="text-2xl font-black tracking-tighter uppercase italic">BTC Supply Intel</h1>
          </div>
          <div className="px-4 py-2 bg-zinc-900 border border-emerald-500/20 text-emerald-500 text-[10px] font-bold rounded-lg flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${loading ? 'bg-orange-500 animate-pulse' : 'bg-emerald-500'}`} />
            {loading ? 'SYNCING_NODES...' : 'NETWORK_ONLINE'}
          </div>
        </header>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: "Total Circulating", value: supplyData.length > 0 ? `${supplyData[supplyData.length-1].circulating_supply.toLocaleString()}` : "19,701,452", icon: Database, color: "text-orange-500" },
            { label: "Real-time Price", value: supplyData.length > 0 ? `$${supplyData[supplyData.length-1].price_usd.toLocaleString()}` : "$64,210", icon: TrendingUp, color: "text-emerald-500" },
            { label: "Security Budget", value: "99.9%", icon: ShieldCheck, color: "text-purple-500" },
            { label: "Global Health", value: "Optimal", icon: Activity, color: "text-blue-500" }
          ].map((item, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl"
            >
              <item.icon className={`${item.color} mb-4`} size={20} />
              <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest">{item.label}</p>
              <h2 className="text-2xl font-bold font-mono">{item.value}</h2>
            </motion.div>
          ))}
        </div>

        {/* Chart Section */}
        <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-3xl">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold">Historical Issuance</h2>
            <span className="text-[10px] text-zinc-600 font-mono italic">DATA_POINTS: {supplyData.length}</span>
          </div>
          <div className="h-[400px]">
            <SupplyChart data={supplyData} />
          </div>
        </div>
      </div>
    </main>
  );
}