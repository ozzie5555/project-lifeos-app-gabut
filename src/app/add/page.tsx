"use client";

import { useState } from "react";
import { addTransaction, addActivity, addTarget } from "../actions";
import { Wallet, Activity, Target, Save, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AddPage() {
  const [activeTab, setActiveTab] = useState<"finance" | "activity" | "target">("finance");

  return (
    <div className="space-y-4 pb-24 pt-1 px-1"> {/* Padding container dikurangi */}
      
      {/* HEADER + BACK BUTTON */}
      <div className="flex items-center gap-3 mb-2">
        <Link href="/" className="p-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors">
            <ArrowLeft size={18} />
        </Link>
        <h1 className="text-lg font-bold text-white">Quick Input</h1>
      </div>

      {/* TABS (Pilihan Menu) - Lebih Ramping */}
      <div className="flex p-1 bg-zinc-900 rounded-xl border border-zinc-800">
        {[
          { id: "finance", icon: <Wallet size={14}/>, label: "Money" },
          { id: "activity", icon: <Activity size={14}/>, label: "Log" },
          { id: "target", icon: <Target size={14}/>, label: "Goal" },
        ].map((tab) => (
            <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`
                    flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wide transition-all
                    ${activeTab === tab.id ? 'bg-lime-400 text-black shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}
                `}
            >
                {tab.icon} {tab.label}
            </button>
        ))}
      </div>

      {/* FORM AREA - Padding & Input Dikecilkan */}
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4">
        
        {/* === FORM KEUANGAN === */}
        {activeTab === "finance" && (
          <form action={addTransaction} className="space-y-3">
            <div>
                <label className="text-[10px] font-bold text-zinc-500 uppercase ml-1">Title</label>
                <input name="title" type="text" placeholder="Beli Kopi / Gaji" required 
                       className="w-full bg-black border border-zinc-800 rounded-lg p-2.5 text-sm text-white mt-1 focus:border-lime-500 focus:outline-none placeholder:text-zinc-700" />
            </div>
            <div>
                <label className="text-[10px] font-bold text-zinc-500 uppercase ml-1">Amount (Rp)</label>
                <input name="amount" type="number" placeholder="0" required 
                       className="w-full bg-black border border-zinc-800 rounded-lg p-2.5 text-sm text-white mt-1 focus:border-lime-500 focus:outline-none placeholder:text-zinc-700" />
            </div>
            <div>
                <label className="text-[10px] font-bold text-zinc-500 uppercase ml-1">Type</label>
                <div className="grid grid-cols-2 gap-2 mt-1">
                    <label className="cursor-pointer">
                        <input type="radio" name="type" value="expense" defaultChecked className="peer sr-only" />
                        <div className="bg-black border border-zinc-800 text-zinc-500 peer-checked:bg-red-500/10 peer-checked:border-red-500/50 peer-checked:text-red-500 rounded-lg p-2.5 text-center text-xs font-bold transition-all">
                            Expense
                        </div>
                    </label>
                    <label className="cursor-pointer">
                        <input type="radio" name="type" value="income" className="peer sr-only" />
                        <div className="bg-black border border-zinc-800 text-zinc-500 peer-checked:bg-lime-500/10 peer-checked:border-lime-500/50 peer-checked:text-lime-500 rounded-lg p-2.5 text-center text-xs font-bold transition-all">
                            Income
                        </div>
                    </label>
                </div>
            </div>
            <button type="submit" className="w-full bg-lime-400 text-black font-bold py-3 rounded-xl mt-2 hover:bg-lime-300 flex items-center justify-center gap-2 text-sm shadow-lg shadow-lime-900/20 active:scale-95 transition-transform">
                <Save size={16} /> Save
            </button>
          </form>
        )}

        {/* === FORM AKTIVITAS === */}
        {activeTab === "activity" && (
          <form action={addActivity} className="space-y-3">
             <div>
                <label className="text-[10px] font-bold text-zinc-500 uppercase ml-1">Activity Name</label>
                <input name="action" type="text" placeholder="Ngoding..." required 
                       className="w-full bg-black border border-zinc-800 rounded-lg p-2.5 text-sm text-white mt-1 focus:border-lime-500 focus:outline-none placeholder:text-zinc-700" />
            </div>
            <div>
                <label className="text-[10px] font-bold text-zinc-500 uppercase ml-1">Tag</label>
                <select name="tag" className="w-full bg-black border border-zinc-800 rounded-lg p-2.5 text-sm text-white mt-1 focus:border-lime-500 focus:outline-none">
                    <option value="Dev">Dev</option>
                    <option value="School">School</option>
                    <option value="Personal">Personal</option>
                    <option value="System">System</option>
                </select>
            </div>
            <button type="submit" className="w-full bg-white text-black font-bold py-3 rounded-xl mt-2 hover:bg-zinc-200 flex items-center justify-center gap-2 text-sm active:scale-95 transition-transform">
                <Save size={16} /> Log
            </button>
          </form>
        )}

        {/* === FORM TARGET === */}
        {activeTab === "target" && (
          <form action={addTarget} className="space-y-3">
             <div>
                <label className="text-[10px] font-bold text-zinc-500 uppercase ml-1">New Goal</label>
                <input name="title" type="text" placeholder="Target..." required 
                       className="w-full bg-black border border-zinc-800 rounded-lg p-2.5 text-sm text-white mt-1 focus:border-lime-500 focus:outline-none placeholder:text-zinc-700" />
            </div>
            <div>
                <label className="text-[10px] font-bold text-zinc-500 uppercase ml-1">Due Date</label>
                <input name="dueDate" type="date" required 
                       className="w-full bg-black border border-zinc-800 rounded-lg p-2.5 text-sm text-white mt-1 focus:border-lime-500 focus:outline-none" />
            </div>
            <button type="submit" className="w-full bg-purple-500 text-white font-bold py-3 rounded-xl mt-2 hover:bg-purple-400 flex items-center justify-center gap-2 text-sm shadow-lg shadow-purple-900/20 active:scale-95 transition-transform">
                <Save size={16} /> Set Target
            </button>
          </form>
        )}

      </div>
    </div>
  );
}