"use client";
import { AlertTriangle, Info } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  isDanger?: boolean;
  isLoading?: boolean;
}

export default function Modal({ isOpen, onClose, onConfirm, title, message, isDanger, isLoading }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* 1. Backdrop (Layar Gelap) */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-[2px] transition-opacity" 
        onClick={isLoading ? undefined : onClose} 
      ></div>

      {/* 2. Kotak Pop-up (COMPACT VERSION) */}
      {/* max-w-[260px]: Lebar dibatasi agar mungil */}
      {/* p-5: Padding dikurangi dari 6 ke 5 */}
      <div className="relative bg-zinc-900 border border-zinc-800 rounded-2xl p-5 w-full max-w-[260px] shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
        <div className="flex flex-col items-center text-center gap-2">
            {/* Ikon: Lebih Kecil */}
            <div className={`p-3 rounded-full border ${isDanger ? 'bg-red-500/10 border-red-500/20 text-red-500' : 'bg-lime-500/10 border-lime-500/20 text-lime-400'}`}>
                {isDanger ? <AlertTriangle size={20}/> : <Info size={20}/>}
            </div>

            {/* Judul & Pesan: Font Dikecilkan */}
            <div>
                <h3 className="text-sm font-bold text-white tracking-tight">{title}</h3>
                <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">{message}</p>
            </div>

            {/* Tombol Aksi: Lebih Pendek & Ramping */}
            <div className="flex gap-2 w-full mt-4">
                <button
                    onClick={onClose}
                    disabled={isLoading}
                    className="flex-1 py-2 rounded-lg text-xs font-bold text-zinc-500 hover:bg-zinc-800 hover:text-white transition-colors disabled:opacity-50"
                >
                    Batal
                </button>
                <button
                    onClick={onConfirm}
                    disabled={isLoading}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold text-black transition-all shadow-md active:scale-95 ${
                        isDanger
                            ? 'bg-red-500 hover:bg-red-400 shadow-red-900/20'
                            : 'bg-lime-400 hover:bg-lime-300 shadow-lime-900/20'
                    } ${isLoading ? 'opacity-70 cursor-wait' : ''}`}
                >
                    {isLoading ? "..." : "Ya"}
                </button>
            </div>
        </div>

      </div>
    </div>
  );
}