import { Settings } from "lucide-react";
import { db } from "@/lib/db";
import { settings } from "@/db/schema";
import { eq } from "drizzle-orm";
import SettingsList from "@/components/SettingsList"; // Memanggil komponen yang baru dibuat

export default async function SettingsPage() {
  // Ambil data nama user dari Database
  const userSetting = await db.select().from(settings).where(eq(settings.key, "username"));
  const currentName = userSetting[0]?.value || "User";

  return (
    <div className="pb-24 pt-1 px-1">
      
      {/* HEADER */}
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 bg-zinc-900 rounded-full border border-zinc-800 text-zinc-400">
           <Settings size={18} />
        </div>
        <h1 className="text-lg font-bold text-white">System Settings</h1>
      </div>

      {/* Panggil Component Client yang ada Pop-up nya */}
      <SettingsList initialName={currentName} />

    </div>
  );
}