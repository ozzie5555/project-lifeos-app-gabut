"use client";

import { useState, useEffect } from "react";
import { Lock, Delete } from "lucide-react";

export default function LockScreen({ children }: { children: React.ReactNode }) {
  const [isLocked, setIsLocked] = useState(true);
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cek apakah user sudah unlock sebelumnya agar tidak tanya PIN terus saat refresh
    const session = sessionStorage.getItem("lifeos_unlocked");
    if (session === "true") {
      setIsLocked(false);
    }
    setLoading(false);
  }, []);

  const handleNumClick = async (num: string) => {
    if (pin.length >= 6) return;
    
    const newPin = pin + num;
    setPin(newPin);
    setError(false);

    if (newPin.length === 6) {
      verifyPin(newPin);
    }
  };

  const verifyPin = async (inputPin: string) => {
    try {
      const res = await fetch("/api/check-pin", {
          method: "POST",
          body: JSON.stringify({ pin: inputPin }),
      });
      
      const data = await res.json();

      if (data.success) {
        sessionStorage.setItem("lifeos_unlocked", "true");
        setIsLocked(false);
      } else {
        setError(true);
        setTimeout(() => setPin(""), 500);
      }
    } catch (e) {
      setError(true);
    }
  };

  const handleDelete = () => {
    setPin(pin.slice(0, -1));
    setError(false);
  };

  if (loading) return null;

  if (isLocked) {
    return (
      <div className="fixed inset-0 z-[999] bg-black flex flex-col items-center justify-center p-6 text-white">
        
        <div className="mb-8 flex flex-col items-center animate-in fade-in zoom-in duration-300">
            <div className={`p-4 rounded-full bg-zinc-900 border border-zinc-800 mb-4 ${error ? 'border-red-500 text-red-500' : 'text-lime-400'}`}>
                <Lock size={32} />
            </div>
            <h1 className="text-xl font-bold tracking-widest uppercase">Security Check</h1>
            <p className="text-zinc-500 text-xs mt-1">Enter Passcode</p>
        </div>

        <div className="flex gap-4 mb-12">
            {[...Array(6)].map((_, i) => (
                <div 
                    key={i} 
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        i < pin.length 
                            ? (error ? "bg-red-500" : "bg-lime-400 scale-125") 
                            : "bg-zinc-800"
                    }`}
                ></div>
            ))}
        </div>

        <div className="grid grid-cols-3 gap-6 w-full max-w-[280px]">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <button 
                    key={num}
                    onClick={() => handleNumClick(num.toString())}
                    className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 text-xl font-bold hover:bg-zinc-800 active:scale-95 transition-all flex items-center justify-center mx-auto"
                >
                    {num}
                </button>
            ))}
            <div className="pointer-events-none"></div>
            <button 
                onClick={() => handleNumClick("0")}
                className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 text-xl font-bold hover:bg-zinc-800 active:scale-95 transition-all flex items-center justify-center mx-auto"
            >
                0
            </button>
            <button 
                onClick={handleDelete}
                className="w-16 h-16 rounded-full text-zinc-500 hover:text-white active:scale-95 transition-all flex items-center justify-center mx-auto"
            >
                <Delete size={24} />
            </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}