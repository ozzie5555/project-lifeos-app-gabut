import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/layout/BottomNav";
import LockScreen from "@/components/auth/LockScreen";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 1. Konfigurasi Tampilan Mobile (PENTING UNTUK PWA)
// userScalable: false -> Biar user gak bisa zoom-in/out pake dua jari (rasa aplikasi native)
export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

// 2. Metadata Aplikasi & Link Manifest
export const metadata: Metadata = {
  title: "LifeOS",
  description: "Personal Operating System Dashboard",
  manifest: "/manifest.json", // Link ke file konfigurasi install
  icons: {
    icon: "/icon-192.png",    // Ikon di tab browser
    apple: "/icon-192.png",   // Ikon di home screen iPhone
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent", // Bar sinyal/baterai jadi transparan menyatu dengan app
    title: "LifeOS",
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black`}
      >
        <main className="max-w-md mx-auto min-h-screen bg-black relative border-x border-zinc-900 pb-24">
            
            {/* LockScreen membungkus semua konten untuk keamanan */}
            <LockScreen>
              <div className="p-4">
                {children}
              </div>
              <BottomNav />
            </LockScreen>
            
        </main>
      </body>
    </html>
  );
}