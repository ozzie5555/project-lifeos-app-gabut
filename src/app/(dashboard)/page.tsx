import Widget from "@/components/ui/Widget";
import { Activity, Wallet, Zap, CheckCircle, ChevronRight, Plus } from "lucide-react";
import { db } from "@/lib/db";
import { activityLogs, financeLogs, dailyMetrics, targets, settings } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import Link from "next/link";

const formatRupiah = (num: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);
}

export default async function Dashboard() {
  const [activities, financeData, metricData, targetData, settingsData] = await Promise.all([
    db.select().from(activityLogs).orderBy(desc(activityLogs.createdAt)).limit(5),
    db.select().from(financeLogs),
    db.select().from(dailyMetrics).limit(1), 
    db.select().from(targets).where(eq(targets.isCompleted, false)).limit(1),
    db.select().from(settings).where(eq(settings.key, "username")),
  ]);

  const totalBalance = financeData.reduce((acc, curr) => acc + curr.amount, 0);
  const metrics = metricData[0] || { focusScore: 0, tasksCompleted: 0, tasksTotal: 0 };
  const nextTarget = targetData[0];
  const userName = settingsData[0]?.value || "Restu Galih Pratama";

  return (
    <div className="space-y-6 pb-24"> {/* Space antar elemen diperbesar jadi space-y-6 */}
      
      {/* HEADER */}
      <div className="flex items-center justify-between pt-2 px-1">
        <div>
           <h1 className="text-xl font-bold text-white tracking-tight">LifeOS<span className="text-lime-400">.</span></h1>
           <p className="text-xs text-zinc-500 font-medium">{userName}</p>
        </div>
        <div className="w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold text-white border border-zinc-700">
          {userName.charAt(0).toUpperCase()}
        </div>
      </div>

      {/* SALDO CARD (UPDATED - LEBIH BESAR & SAMA DENGAN DOMPET) */}
      <div className="bg-lime-400 rounded-[32px] p-6 text-black shadow-lg relative overflow-hidden group">
          <div className="absolute right-[-10px] top-[-10px] p-0 opacity-10 group-hover:opacity-20 transition-opacity rotate-12">
            <Wallet size={120} /> {/* Ukuran icon background diperbesar */}
          </div>
          
          <div className="flex justify-between items-start mb-8 relative z-10"> {/* Margin bottom diperbesar */}
            <div className="p-2 bg-black/10 rounded-full backdrop-blur-sm">
               <Wallet size={20} className="text-black"/>
            </div>
            <span className="bg-black/10 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm">
              Main Wallet
            </span>
          </div>
          <div className="relative z-10">
            <p className="text-black/60 text-xs font-bold uppercase mb-1 tracking-wide">Total Balance</p>
            <h2 className="text-4xl font-extrabold tracking-tighter"> {/* Font diperbesar jadi text-4xl */}
              {formatRupiah(totalBalance)}
            </h2>
          </div>
      </div>

      {/* STATS ROW */}
      <div className="grid grid-cols-2 gap-4">
        <Widget title="Focus" icon={<Zap size={16}/>} className="h-28 justify-center">
            <div className="mt-2">
              <div className="text-3xl font-bold text-white mb-2">{metrics.focusScore}%</div>
              <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-lime-400 h-full rounded-full" style={{ width: `${metrics.focusScore}%` }}></div>
              </div>
            </div>
        </Widget>

        <Widget title="Tasks" icon={<CheckCircle size={16}/>} className="h-28 justify-center">
            <div className="mt-2 flex items-baseline gap-1">
               <span className="text-3xl font-bold text-white">{metrics.tasksCompleted}</span>
               <span className="text-sm text-zinc-600">/{metrics.tasksTotal}</span>
            </div>
            <p className="text-zinc-500 text-xs font-medium">Daily goals completed</p>
        </Widget>
      </div>

      {/* ACTIVE TARGET */}
      <Widget title="Next Goal">
         {nextTarget ? (
             <div className="flex items-center gap-4 mt-2">
                <div className="w-1.5 bg-lime-400 h-10 rounded-full shrink-0"></div>
                <div className="flex-1 min-w-0">
                    <h4 className="text-base font-bold text-white truncate">
                    {nextTarget.title}
                    </h4>
                    <p className="text-xs text-zinc-500 truncate mt-0.5 font-medium">Due: {nextTarget.dueDate || "-"}</p>
                </div>
                <ChevronRight size={20} className="text-zinc-600" />
            </div>
         ) : (
            <Link href="/add" className="flex items-center gap-3 mt-2 text-zinc-500 hover:text-lime-400 transition-colors group">
                 <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center border border-zinc-700 border-dashed group-hover:border-lime-400 transition-colors">
                    <Plus size={18} />
                 </div>
                 <span className="text-sm font-medium">Set new goal...</span>
            </Link>
         )}
      </Widget>

      {/* ACTIVITY LIST */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
            <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Recent Activity</h3>
            <button className="text-xs text-lime-400 hover:text-lime-300 font-medium">View All</button>
        </div>
        
        <div className="space-y-2.5">
            {activities.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-3.5 rounded-2xl bg-zinc-900/50 border border-zinc-800/50 hover:bg-zinc-900 transition-colors">
                    <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center border border-zinc-800 shrink-0 text-zinc-400">
                        <Activity size={16}/>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-zinc-200 truncate">{item.action}</p>
                        <p className="text-[11px] text-zinc-500">{item.tag || 'System'}</p>
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