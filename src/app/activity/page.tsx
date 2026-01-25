import { db } from "@/lib/db";
import { activityLogs } from "@/db/schema";
import { desc } from "drizzle-orm";
import { Activity, Clock, Terminal, BookOpen, Code, Zap } from "lucide-react";

// Helper: Pilih Ikon berdasarkan Tag
const getIcon = (tag: string | null) => {
  const t = tag?.toLowerCase() || "";
  if (t.includes("dev")) return <Code size={16} />;
  if (t.includes("school")) return <BookOpen size={16} />;
  if (t.includes("finance")) return <Zap size={16} />; // Ikon petir untuk uang
  return <Terminal size={16} />;
};

// Helper: Warna Ikon berdasarkan Tag
const getColor = (tag: string | null) => {
    const t = tag?.toLowerCase() || "";
    if (t.includes("dev")) return "text-blue-400 bg-blue-900/20 border-blue-800";
    if (t.includes("school")) return "text-orange-400 bg-orange-900/20 border-orange-800";
    if (t.includes("finance")) return "text-lime-400 bg-lime-900/20 border-lime-800";
    return "text-zinc-400 bg-zinc-800 border-zinc-700";
}

export default async function ActivityPage() {
  // Ambil semua log, urutkan dari yang paling baru
  const logs = await db.select().from(activityLogs).orderBy(desc(activityLogs.createdAt));

  return (
    <div className="space-y-5 pb-24 pt-1 px-1">
      
      {/* HEADER */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
            <div className="p-2 bg-zinc-900 rounded-full border border-zinc-800 text-cyan-400">
            <Activity size={18} />
            </div>
            <h1 className="text-lg font-bold text-white">System Logs</h1>
        </div>
        <div className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-500 font-mono">
            {logs.length} RECORDS
        </div>
      </div>

      {/* TIMELINE LIST */}
      <div className="relative border-l border-zinc-800 ml-3 space-y-6 pb-5">
        
        {logs.map((item) => (
            <div key={item.id} className="relative pl-6 group">
                {/* Garis & Titik Timeline */}
                <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 flex items-center justify-center bg-black ${getColor(item.tag).split(" ")[2]}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${getColor(item.tag).split(" ")[0]}`}></div>
                </div>

                {/* Konten Log */}
                <div className="bg-zinc-900/40 border border-zinc-800/50 p-3 rounded-xl hover:bg-zinc-900 transition-colors">
                    <div className="flex justify-between items-start mb-1">
                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wide border ${getColor(item.tag)}`}>
                            {item.tag || 'System'}
                        </span>
                        <span className="text-[10px] text-zinc-600 font-mono flex items-center gap-1">
                            <Clock size={10} />
                            {item.createdAt ? new Date(item.createdAt).toLocaleDateString('id-ID', {day: 'numeric', month: 'short', hour: '2-digit', minute:'2-digit'}) : '-'}
                        </span>
                    </div>
                    
                    <p className="text-sm font-medium text-zinc-200 mt-1 leading-snug">
                        {item.action}
                    </p>
                </div>
            </div>
        ))}

        {logs.length === 0 && (
             <div className="pl-6 text-zinc-500 text-xs italic">
                Belum ada catatan aktivitas.
             </div>
        )}

      </div>

    </div>
  );
}