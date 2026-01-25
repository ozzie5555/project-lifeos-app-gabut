# 📱 LifeOS - Personal Mobile Dashboard

<div align="center">

![LifeOS Banner](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![Turso](https://img.shields.io/badge/Turso-Database-cyan?style=for-the-badge&logo=sqlite)
![Drizzle](https://img.shields.io/badge/Drizzle-ORM-yellow?style=for-the-badge&logo=drizzle)

<br/>

**LifeOS** adalah dashboard personal berbasis web (PWA) yang didesain khusus untuk tampilan Mobile. Aplikasi ini berfungsi sebagai "Sistem Operasi" pribadi untuk mencatat keuangan, target hidup (goals), dan log aktivitas harian dengan keamanan PIN.

[Report Bug](https://github.com/ozzie5555/project-lifeos-app-gabut/issues) · [Request Feature](https://github.com/ozzie5555/project-lifeos-app-gabut/issues)

</div>

---

## 🧐 Latar Belakang Masalah

Aplikasi ini lahir dari kebutuhan pribadi untuk mengatasi kekacauan dalam manajemen data personal. Seringkali, kita kesulitan mengontrol dan memantau aktivitas penting karena:

* **Platform Tidak Terpusat:** Data keuangan, aktivitas harian, dan target hidup tersebar di berbagai aplikasi atau catatan yang berbeda.
* **Data Tercecer:** Sulit untuk melacak riwayat karena pencatatan yang tidak konsisten.
* **Minim Insight:** Sulit melihat progres nyata (goals/keuangan) karena data tidak divisualisasikan dengan rapi.
* **Aksesibilitas:** Membutuhkan satu platform yang ringan, konsisten, dan mudah diakses layaknya sebuah OS di genggaman.

**LifeOS** hadir sebagai solusi terpusat (Centralized Platform) untuk menyatukan semua kepingan data tersebut menjadi insight yang jelas.

---

## ✨ Fitur Utama

| Kategori | Fitur & Deskripsi |
| :--- | :--- |
| ![Security](https://img.shields.io/badge/Security-Lock_Screen-red?style=flat-square&logo=authenticator&logoColor=white) | **Secure Lock Screen**<br>Dilengkapi proteksi PIN 6-digit aman sebelum masuk dashboard. |
| ![Finance](https://img.shields.io/badge/Finance-Tracker-2ea44f?style=flat-square&logo=cashapp&logoColor=white) | **Finance Tracker**<br>Mencatat pemasukan & pengeluaran simpel dengan kalkulasi otomatis. |
| ![Goals](https://img.shields.io/badge/Focus-Goal_System-blue?style=flat-square&logo=target&logoColor=white) | **Goal System**<br>Pantau progress target hidup yang sedang kamu kejar. |
| ![Logs](https://img.shields.io/badge/System-Activity_Logs-orange?style=flat-square&logo=activity&logoColor=white) | **Activity Logs**<br>Riwayat aktivitas sistem tercatat otomatis (Audit Trail). |
| ![PWA](https://img.shields.io/badge/Mobile-PWA_Support-purple?style=flat-square&logo=pwa&logoColor=white) | **PWA Support**<br>Installable di Android & iOS (Fullscreen tanpa browser bar). |
| ![Settings](https://img.shields.io/badge/Config-Dynamic_Settings-gray?style=flat-square&logo=settings&logoColor=white) | **Dynamic Settings**<br>Ganti Nama, PIN, dan Reset Data langsung dari aplikasi. |

---

## 🛠️ Teknologi (Tech Stack)

Aplikasi ini dibangun menggunakan teknologi modern untuk performa maksimal dan database yang ringan.

| Komponen | Teknologi yang Digunakan |
| :--- | :--- |
| **Framework** | ![Next.js](https://img.shields.io/badge/Next.js_15-App_Router-black?style=flat-square&logo=next.js) |
| **Database** | ![Turso](https://img.shields.io/badge/Turso-LibSQL-cyan?style=flat-square&logo=sqlite) |
| **ORM** | ![Drizzle](https://img.shields.io/badge/Drizzle-ORM-C5F74F?style=flat-square&logo=drizzle&logoColor=black) |
| **Styling** | ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-Styling-38B2AC?style=flat-square&logo=tailwind-css) |
| **Icons** | ![Lucide](https://img.shields.io/badge/Lucide-React_Icons-orange?style=flat-square&logo=lucid) |
| **Deploy** | ![Vercel](https://img.shields.io/badge/Vercel-Cloud_Hosting-black?style=flat-square&logo=vercel) |

---

## 🚀 Cara Install & Menjalankan (Local)

Ikuti langkah ini jika ingin menjalankan LifeOS di laptop kamu sendiri.

### 1. Clone Repository
```bash
git clone [https://github.com/ozzie5555/project-lifeos-app-gabut.git](https://github.com/ozzie5555/project-lifeos-app-gabut.git)
cd project-lifeos-app-gabut

2. Install Dependencies
npm install
# atau
pnpm install
# atau
yarn install

3. Setup Environment Variables
Buat file .env di root project dan sesuaikan dengan konfigurasi database Turso kamu:
TURSO_DATABASE_URL=your_database_url
TURSO_AUTH_TOKEN=your_auth_token

4. Jalankan Server
npm run dev

Buka http://localhost:3000 di browser kamu.
