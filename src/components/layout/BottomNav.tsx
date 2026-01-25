"use client";
import { LayoutDashboard, Wallet, Activity, Settings, Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { icon: <LayoutDashboard size={20} />, href: "/" },
    { icon: <Wallet size={20} />, href: "/finance" },
    { icon: <Plus size={24} />, href: "/add", isFab: true }, // FAB Button
    { icon: <Activity size={20} />, href: "/activity" },
    { icon: <Settings size={20} />, href: "/settings" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-t border-zinc-800 pb-5 pt-2 px-6 max-w-md mx-auto">
      <div className="flex justify-between items-center">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          
          // PERBAIKAN DI SINI:
          // Gunakan <Link> bukannya <button> agar bisa pindah halaman
          if (item.isFab) {
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className="bg-lime-400 text-black p-3 rounded-2xl hover:bg-lime-300 transition-colors shadow-lg shadow-lime-900/20 -mt-6 border-4 border-black flex items-center justify-center"
              >
                {item.icon}
              </Link>
            );
          }

          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`p-2 transition-colors ${isActive ? 'text-lime-400' : 'text-zinc-600'}`}
            >
              {item.icon}
            </Link>
          );
        })}
      </div>
    </div>
  );
}