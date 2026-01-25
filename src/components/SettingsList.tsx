"use client";

import { User, Lock, Save, Trash2, Target } from "lucide-react";
import { updateName, updatePin, clearGoals, clearActivityLogs, resetFinance } from "@/app/actions";
import { useState } from "react";
import Modal from "./ui/Modal"; // Import Modal Keren Tadi

interface SettingsListProps {
  initialName: string;
}

export default function SettingsList({ initialName }: SettingsListProps) {
  const [loading, setLoading] = useState(false);
  
  // State untuk mengontrol Pop-up
  const [modal, setModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    isDanger: false,
    action: async () => {}, // Tempat menyimpan fungsi yang akan dijalankan
  });

  // Fungsi menutup modal
  const closeModal = () => setModal({ ...modal, isOpen: false });

  // Fungsi saat tombol "Ya, Lanjutkan" ditekan
  const handleConfirm = async () => {
    setLoading(true);
    try {
      await modal.action(); // Jalankan fungsi yang disimpan tadi
      closeModal();
      // Opsional: Bisa tambah Toast/Notifikasi sukses di sini
    } catch (error) {
      alert("Gagal memproses.");
    } finally {
      setLoading(false);
    }
  };

  // Helper 1: Menyiapkan Modal untuk Form (Ganti Nama/PIN)
  const initiateSubmit = (e: React.FormEvent<HTMLFormElement>, action: (formData: FormData) => Promise<void>, title: string, msg: string) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget); // Simpan data form sebelum modal muncul

    setModal({
      isOpen: true,
      title: title,
      message: msg,
      isDanger: false,
      action: async () => await action(formData), // Bungkus aksi server dalam fungsi
    });
  };

  // Helper 2: Menyiapkan Modal untuk Tombol Hapus (Clear Data)
  const initiateClear = (action: () => Promise<void>, title: string, msg: string) => {
    setModal({
      isOpen: true,
      title: title,
      message: msg,
      isDanger: true, // Warna Merah
      action: async () => await action(),
    });
  };

  return (
    <>
      {/* KOMPONEN MODAL (Tersembunyi sampai dipanggil) */}
      <Modal 
        isOpen={modal.isOpen}
        onClose={closeModal}
        onConfirm={handleConfirm}
        title={modal.title}
        message={modal.message}
        isDanger={modal.isDanger}
        isLoading={loading}
      />

      <div className="space-y-6">
        
        {/* 1. GANTI NAMA */}
        <div className="space-y-2">
          <h2 className="text-xs font-bold text-zinc-500 uppercase ml-2">Personalization</h2>
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4">
              <form onSubmit={(e) => initiateSubmit(e, updateName, "Ganti Nama?", "Nama tampilan di dashboard akan berubah.")} className="flex gap-2">
                  <div className="flex-1">
                      <label className="text-[10px] text-zinc-500 font-bold uppercase block mb-1">Display Name</label>
                      <div className="flex items-center gap-2 bg-black border border-zinc-800 rounded-xl px-3 py-2">
                          <User size={14} className="text-zinc-500"/>
                          <input 
                              name="name" 
                              type="text" 
                              defaultValue={initialName}
                              placeholder="Your Name" 
                              className="bg-transparent text-sm text-white focus:outline-none w-full placeholder:text-zinc-700"
                          />
                      </div>
                  </div>
                  <button disabled={loading} type="submit" className="self-end bg-lime-400 text-black p-2.5 rounded-xl hover:bg-lime-300 transition-colors">
                      <Save size={18} />
                  </button>
              </form>
          </div>
        </div>

        {/* 2. GANTI PIN */}
        <div className="space-y-2">
          <h2 className="text-xs font-bold text-zinc-500 uppercase ml-2">Security</h2>
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4">
              <form onSubmit={(e) => initiateSubmit(e, updatePin, "Update PIN Keamanan?", "PIN baru akan digunakan saat Anda login berikutnya. Pastikan Anda mengingatnya.")} className="flex gap-2">
                  <div className="flex-1">
                      <label className="text-[10px] text-zinc-500 font-bold uppercase block mb-1">Update PIN (6 Digits)</label>
                      <div className="flex items-center gap-2 bg-black border border-zinc-800 rounded-xl px-3 py-2">
                          <Lock size={14} className="text-zinc-500"/>
                          <input 
                              name="pin" 
                              type="text" 
                              maxLength={6}
                              placeholder="******" 
                              className="bg-transparent text-sm text-white focus:outline-none w-full placeholder:text-zinc-700 font-mono"
                          />
                      </div>
                  </div>
                  <button disabled={loading} type="submit" className="self-end bg-zinc-700 text-white p-2.5 rounded-xl hover:bg-zinc-600 transition-colors">
                      <Save size={18} />
                  </button>
              </form>
          </div>
        </div>

        {/* 3. DANGER ZONE */}
        <div className="space-y-2">
          <h2 className="text-xs font-bold text-red-500 uppercase ml-2">Danger Zone</h2>
          <div className="bg-red-900/10 border border-red-900/30 rounded-2xl overflow-hidden p-1">
              
              {/* Clear Goals */}
              <button 
                  onClick={() => initiateClear(clearGoals, "Hapus Semua Target?", "Tindakan ini akan menghapus seluruh daftar 'Goals' yang sedang aktif. Anda tidak bisa mengembalikannya.")}
                  className="w-full flex items-center justify-between p-3 hover:bg-red-900/20 rounded-xl transition-colors text-left group"
              >
                  <div className="flex items-center gap-3">
                      <Target size={16} className="text-red-400 group-hover:text-red-300"/>
                      <div>
                          <span className="text-sm text-red-200 group-hover:text-white block font-medium">Clear All Goals</span>
                          <span className="text-[10px] text-red-400/60 block">Hapus target aktif</span>
                      </div>
                  </div>
              </button>
              
              <div className="h-px bg-red-900/20 mx-3 my-1"></div>

              {/* Clear Logs */}
              <button 
                  onClick={() => initiateClear(clearActivityLogs, "Bersihkan Log?", "Riwayat aktivitas sistem akan dihapus permanen.")}
                  className="w-full flex items-center justify-between p-3 hover:bg-red-900/20 rounded-xl transition-colors text-left group"
              >
                  <div className="flex items-center gap-3">
                      <Trash2 size={16} className="text-red-400 group-hover:text-red-300"/>
                      <div>
                          <span className="text-sm text-red-200 group-hover:text-white block font-medium">Clear Activity Logs</span>
                          <span className="text-[10px] text-red-400/60 block">Hapus riwayat aktivitas</span>
                      </div>
                  </div>
              </button>

              <div className="h-px bg-red-900/20 mx-3 my-1"></div>

              {/* Reset Finance */}
              <button 
                  onClick={() => initiateClear(resetFinance, "Reset Total Keuangan?", "PERINGATAN: Semua data pemasukan dan pengeluaran akan dihapus. Saldo akan kembali menjadi Rp 0.")}
                  className="w-full flex items-center justify-between p-3 hover:bg-red-900/20 rounded-xl transition-colors text-left group"
              >
                  <div className="flex items-center gap-3">
                      <Trash2 size={16} className="text-red-400 group-hover:text-red-300"/>
                      <div>
                          <span className="text-sm text-red-200 group-hover:text-white block font-medium">Reset Finance Data</span>
                          <span className="text-[10px] text-red-400/60 block">Format data uang</span>
                      </div>
                  </div>
              </button>

          </div>
        </div>
      </div>
    </>
  );
}