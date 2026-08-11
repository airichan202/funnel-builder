========================================
TUTORIAL LENGKAP: PUSH KE GITHUB → DEPLOY KE VERCEL
Project: Funnel Builder (Landing Page & Sales Funnel)
========================================

========================================
📁 PERSIAPAN AWAL
========================================

1. Buka terminal (PowerShell / CMD).

2. Masuk ke folder project:
   cd C:\laragon\www\opencode\funnel\funnel

3. Pastikan file .gitignore ada di folder ini.
   Isi .gitignore harus seperti ini:
   .env.local
   node_modules/
   .next/
   data/

   Jika belum ada, buat file .gitignore dengan isi di atas.


========================================
🚀 BAGIAN 1: PUSH PROJECT KE GITHUB
========================================

Langkah 1 — Inisialisasi Git:
   git init

Langkah 2 — Tambahkan semua file:
   git add .

Langkah 3 — Commit perubahan:
   git commit -m "Initial project setup for Vercel deploy"

Langkah 4 — Buat repo baru di GitHub:
   - Buka browser ke https://github.com/new
   - Login ke akun GitHub kamu
   - Nama repo: funnel-builder
   - JANGAN centang "Add a README file"
   - JANGAN centang "Add .gitignore"
   - Klik tombol hijau "Create repository"
   - Setelah dibuat, akan muncul halaman dengan URL repo.
     Copy URL-nya, formatnya seperti ini:
     https://github.com/NAMA_USER_KAMU/funnel-builder.git

Langkah 5 — Hubungkan ke GitHub dan push:
   git remote add origin https://github.com/NAMA_USER_KAMU/funnel-builder.git
   git branch -M main
   git push -u origin main

   🟢 SELESAI BAGIAN 1 — Project sudah di GitHub.


========================================
☁️ BAGIAN 2: DEPLOY KE VERCEL
========================================

Langkah 1 — Login ke Vercel:
   - Buka browser ke https://vercel.com
   - Klik "Continue with GitHub" atau "Log In" pakai akun GitHub

Langkah 2 — Import project dari GitHub:
   - Setelah login, klik tombol "Add New" → "Project"
   - Di halaman "Import Git Repository", cari dan pilih repo "funnel-builder"
   - Vercel akan otomatis mendeteksi Next.js (Framework Preset: Next.js)
   - Jangan ubah apa-apa dulu, langsung scroll ke bawah

Langkah 3 — Tambahkan Environment Variables:
   - Sebelum klik "Deploy", cari bagian "Environment Variables"
   - Klik tombol "+" atau "Add"
   - Tambahkan 3 variabel berikut SATU PER SATU:

     Variable 1:
       NAME:  DATABASE_URL
       VALUE: better-sqlite3:./data/funnel.db

     Variable 2:
       NAME:  AUTH_SECRET
       VALUE: (isi dengan hasil generate dari Langkah 4 di bawah)

     Variable 3:
       NAME:  NEXT_PUBLIC_BASE_URL
       VALUE: https://funnel-builder.vercel.app

Langkah 4 — Generate AUTH_SECRET:
   - Buka terminal/CMD baru (jangan tutup yang lama)
   - Ketik perintah:
     openssl rand -base64 32
   - Akan muncul hasil seperti: "x7Gk9pLm2Qr4Z8vN1J6yB3E5wA0cDfHg=="
   - Copy hasil tersebut
   - Paste ke VALUE dari AUTH_SECRET di Vercel

Langkah 5 — Deploy:
   - Setelah semua environment variables terisi
   - Klik tombol "Deploy" (warna hitam/ungu)
   - Tunggu sekitar 1-2 menit
   - Jika berhasil, akan muncul halaman "Congratulations!"
   - URL project kamu akan seperti: https://funnel-builder.vercel.app
   - Klik "Continue to Dashboard" untuk melihat project

   🟢 SELESAI BAGIAN 2 — Project sudah live di Vercel!


========================================
🔍 BAGIAN 3: VERIFIKASI APLIKASI
========================================

1. Buka URL Vercel:
   https://funnel-builder.vercel.app

2. Coba fitur-fitur berikut:
   - Register akun baru
   - Login dengan akun yang sudah didaftarkan
   - Dashboard akan muncul
   - Klik "Create Funnel" untuk membuat funnel baru
   - Coba edit funnel (drag-drop editor)
   - Publish funnel
   - Cek halaman publik funnel (buka di tab incognito)
   - Cek analytics dashboard

3. Jika ada error:
   - Buka Vercel Dashboard
   - Klik project → "Logs" → lihat error apa yang muncul
   - Perbaiki dan push ulang ke GitHub (Vercel akan auto-deploy)


========================================
⚠️ CATATAN PENTING
========================================

- Ganti NAMA_USER_KAMU dengan username GitHub kamu yang asli
- SQLite di Vercel bersifat sementara (data akan hilang saat redeploy)
  Untuk production, ganti pakai database online seperti Turso/Neon/PlanetScale
- Jika ada error build, cek "Function Logs" di Vercel Dashboard
- Setiap kali push ke GitHub, Vercel akan auto-deploy ulang


========================================
📦 PERINTAH CEPAT (copy-paste ke terminal)
========================================

----- Mulai dari sini -----
cd C:\laragon\www\opencode\funnel\funnel
git init
git add .
git commit -m "Initial project setup for Vercel deploy"
git remote add origin https://github.com/NAMA_USER_KAMU/funnel-builder.git
git branch -M main
git push -u origin main
----- Selesai -----

========================================
SELAMAT MENCOBA! 🚀
========================================