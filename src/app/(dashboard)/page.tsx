import Widget from "@/components/ui/Widget";
import { Activity, Wallet, Zap, TrendingUp, CheckCircle, ChevronRight } from "lucide-react";
import { db } from "@/lib/db";
import { activityLogs, financeLogs, dailyMetrics, targets, settings } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

const formatRupiah = (num: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);
}

export default async function Dashboard() {
  // Fetch semua data secara paralel agar cepat
  const [activities, financeData, metricData, targetData, settingsData] = await Promise.all([
    db.select().from(activityLogs).orderBy(desc(activityLogs.createdAt)).limit(5),
    db.select().from(financeLogs),
    db.select().from(dailyMetrics).limit(1), 
    db.select().from(targets).where(eq(targets.isCompleted, false)).limit(1),
    db.select().from(settings).where(eq(settings.key, "username")), // Ambil nama dari setting
  ]);

  // Olah datanya
  const totalBalance = financeData.reduce((acc, curr) => acc + curr.amount, 0);
  const metrics = metricData[0] || { focusScore: 0, tasksCompleted: 0, tasksTotal: 0 };
  const nextTarget = targetData[0];
  
  // PERBAIKAN DI SINI:
  // Ambil nama dari database. Jika belum di-set, defaultnya "User".
  const userName = settingsData[0]?.value || "Restu Galih Pratama"; 

  return (
    <div className="space-y-4 pb-24">
      
      {/* HEADER YANG SUDAH DIPERBAIKI */}
      <div className="flex items-center justify-between pt-1 px-1">
        <div>
           {/* Judul Besar Tetap LifeOS */}
           <h1 className="text-xl font-bold text-white tracking-tight">LifeOS<span className="text-lime-400">.</span></h1>
           
           {/* Nama Kecil di Bawahnya Sekarang Dinamis (Berubah sesuai Settings) */}
           <p className="text-xs text-zinc-500 font-medium">{userName}</p>
        </div>
        
        {/* Avatar Inisial */}
        <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold text-white border border-zinc-700">
          {userName.charAt(0).toUpperCase()} {/* Ambil huruf depan nama */}
        </div>
      </div>

      {/* SALDO CARD */}
      <div className="bg-lime-400 rounded-3xl p-5 text-black shadow-lg relative overflow-hidden group">
          <div className="absolute right-0 top-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
            <Wallet size={80} />
          </div>
          
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className="p-1.5 bg-black/10 rounded-full">
               <Wallet size={18} className="text-black"/>
            </div>
            <span className="bg-black/10 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide">
              Active
            </span>
          </div>
          <div className="relative z-10">
            <p className="text-black/60 text-xs font-bold uppercase mb-0.5">Total Balance</p>
            <h2 className="text-3xl font-bold tracking-tighter">
              {formatRupiah(totalBalance)}
            </h2>
          </div>
      </div>

      {/* STATS ROW */}
      <div className="grid grid-cols-2 gap-3">
        <Widget title="Focus" icon={<Zap size={14}/>} className="h-24 justify-center">
            <div className="mt-1">
              <div className="text-2xl font-bold text-white mb-1.5">{metrics.focusScore}%</div>
              <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-lime-400 h-full rounded-full" style={{ width: `${metrics.focusScore}%` }}></div>
              </div>
            </div>
        </Widget>

        <Widget title="Tasks" icon={<CheckCircle size={14}/>} className="h-24 justify-center">
            <div className="mt-1 flex items-baseline gap-1">
               <span className="text-2xl font-bold text-white">{metrics.tasksCompleted}</span>
               <span className="text-sm text-zinc-600">/{metrics.tasksTotal}</span>
            </div>
            <p className="text-zinc-500 text-[10px]">Daily goals</p>
        </Widget>
      </div>

      {/* ACTIVE TARGET */}
      <div className="bg-zinc-900 rounded-2xl p-4 border border-zinc-800 flex items-center gap-4">
         <div className="w-1 bg-lime-400 h-8 rounded-full shrink-0"></div>
         <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-white truncate">
              {nextTarget?.title || "No active goals"}
            </h4>
            <p className="text-xs text-zinc-500 truncate">Due: {nextTarget?.dueDate || "-"}</p>
         </div>
         <ChevronRight size={16} className="text-zinc-600" />
      </div>

      {/* ACTIVITY LIST */}
      <div>
        <div className="flex items-center justify-between mb-2 px-1">
            <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Activity</h3>
            <button className="text-xs text-lime-400 hover:text-lime-300">View All</button>
        </div>
        
        <div className="space-y-2">
            {activities.map((item) => (
                <div key={item.id} className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900/50 border border-zinc-800/50 hover:bg-zinc-900 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center border border-zinc-800 shrink-0">
                        <Activity size={14} className="text-zinc-400"/>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-zinc-200 truncate">{item.action}</p>
                        <p className="text-[10px] text-zinc-500">{item.tag || 'System'}</p>
                    </div>
                    <span className="text-[10px] text-zinc-600 font-mono shrink-0">
                        {item.createdAt ? new Date(item.createdAt).toLocaleTimeString('id-ID', {hour: '2-digit', minute:'2-digit'}) : ''}
                    </span>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}