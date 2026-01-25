import { db } from "@/lib/db";
import { financeLogs } from "@/db/schema";
import { desc } from "drizzle-orm";
import { ArrowDownLeft, ArrowUpRight, Wallet, History } from "lucide-react";

// Helper Rupiah
const formatRupiah = (num: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);
}

export default async function FinancePage() {
  // 1. Ambil data transaksi (urutkan dari yang terbaru)
  const transactions = await db.select().from(financeLogs).orderBy(desc(financeLogs.createdAt));

  // 2. Hitung Total Saldo
  const totalBalance = transactions.reduce((acc, curr) => acc + curr.amount, 0);

  // 3. Hitung Pemasukan & Pengeluaran Bulan Ini (Simple Stats)
  const income = transactions.filter(t => t.amount > 0).reduce((acc, curr) => acc + curr.amount, 0);
  const expense = transactions.filter(t => t.amount < 0).reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="space-y-5 pb-24 pt-1 px-1">
      
      {/* HEADER */}
      <div className="flex items-center gap-2 mb-2">
        <div className="p-2 bg-zinc-900 rounded-full border border-zinc-800 text-lime-400">
           <Wallet size={18} />
        </div>
        <h1 className="text-lg font-bold text-white">My Wallet</h1>
      </div>

      {/* SALDO CARD UTAMA */}
      <div className="bg-lime-400 rounded-3xl p-6 text-black shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-black/60 text-xs font-bold uppercase mb-1">Total Balance</p>
            <h2 className="text-4xl font-bold tracking-tighter">
              {formatRupiah(totalBalance)}
            </h2>
          </div>
          
          {/* Mini Stats di dalam Card */}
          <div className="grid grid-cols-2 gap-4 mt-6 border-t border-black/10 pt-4">
             <div>
                <div className="flex items-center gap-1 text-black/60 mb-0.5">
                   <div className="p-1 bg-black/10 rounded-full"><ArrowDownLeft size={10}/></div>
                   <span className="text-[10px] font-bold uppercase">Income</span>
                </div>
                <p className="text-sm font-bold">{formatRupiah(income)}</p>
             </div>
             <div>
                <div className="flex items-center gap-1 text-black/60 mb-0.5">
                   <div className="p-1 bg-black/10 rounded-full"><ArrowUpRight size={10}/></div>
                   <span className="text-[10px] font-bold uppercase">Expense</span>
                </div>
                <p className="text-sm font-bold text-red-700">{formatRupiah(Math.abs(expense))}</p>
             </div>
          </div>
      </div>

      {/* HISTORY LIST */}
      <div>
        <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <History size={14} /> History
        </h3>
        
        <div className="space-y-2">
            {transactions.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/50 border border-zinc-800/50 hover:bg-zinc-900 transition-colors">
                    
                    {/* Ikon Kiri (Panah) */}
                    <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border border-zinc-800 ${item.amount > 0 ? 'bg-lime-900/20 text-lime-400' : 'bg-red-900/20 text-red-400'}`}>
                            {item.amount > 0 ? <ArrowDownLeft size={18}/> : <ArrowUpRight size={18}/>}
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-zinc-200">{item.title}</p>
                            <p className="text-[10px] text-zinc-500 capitalize">{item.category || 'General'}</p>
                        </div>
                    </div>

                    {/* Nominal Kanan */}
                    <div className="text-right">
                        <p className={`text-sm font-bold font-mono ${item.amount > 0 ? 'text-lime-400' : 'text-white'}`}>
                            {item.amount > 0 ? '+' : ''}{formatRupiah(item.amount)}
                        </p>
                        <p className="text-[10px] text-zinc-600">
                            {item.createdAt ? new Date(item.createdAt).toLocaleDateString('id-ID', {day: 'numeric', month: 'short'}) : '-'}
                        </p>
                    </div>

                </div>
            ))}

            {transactions.length === 0 && (
                <div className="text-center py-10 text-zinc-500 text-xs">
                    Belum ada transaksi.
                </div>
            )}
        </div>
      </div>

    </div>
  );
}