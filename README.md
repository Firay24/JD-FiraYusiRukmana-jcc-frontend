# Junior Championship Center (JCC)

Sistem manajemen event perlombaan olimpiade akademik jenjang TK, SD hingga SMP.

Proyek ini sudah **dideploy** dan bisa langsung dicoba melalui:  
👉 [jrchampionship.id](https://jrchampionship.id)

## 📌 Fitur

### 👤 Peserta

- **Pendaftaran Akun** → Membuat akun untuk ikut serta dalam lomba.
- **Registrasi Lomba/Event** → Memilih dan mendaftar ke lomba yang tersedia.
- **Pendaftaran Akun Kolektif** → Upload file Excel untuk membuat banyak akun peserta sekaligus.
- **Tracking Pembayaran** → Memantau status pembayaran.
- **Leaderboard** → Melihat peringkat peserta secara langsung.
- **Riwayat Lomba** → Akses hasil nilai dan scan LJK dari lomba yang sudah diikuti.
- **Sertifikat Digital** → Otomatis menghasilkan sertifikat peserta.

### 🛠️ Admin

- **Statistik Peserta** → Melihat data statistik jumlah peserta.
- **Manajemen Peserta** → Mengelola daftar peserta, termasuk update status.
- **Leaderboard Admin** → Menampilkan peringkat resmi peserta.
- **Download Sertifikat Juara** → Mengunduh sertifikat untuk pemenang lomba.

## 🚀 Teknologi yang Digunakan

- [Next.js](https://nextjs.org/) – React Framework
- [Tailwind CSS](https://tailwindcss.com/) – Styling
- [NestJS](https://nestjs.com/) – Backend Framework
- [PostgreSQL](https://www.postgresql.org/) – Database
- [Niagahoster VPS](https://www.niagahoster.co.id/) – Deployment Server

## 📦 Instalasi & Menjalankan di Localhost

1. **Clone repository**
   ```bash
   git clone https://github.com/username/jrchampionship.git
   cd jrchampionship
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Buat file .env di root project, lalu isi dengan:**
   ```env
   NEXT_PUBLIC_API_URL=https://api.jrchampionship.id/v1
   ```
4. **Jalankan development server**
   ```bash
   npm run dev
   Buka http://localhost:3000 untuk melihat hasilnya.
   ```

## 🌐 Opsi Penggunaan

- Localhost → Jalankan sesuai instruksi instalasi di atas.
- Production (Deploy) → Akses langsung di [jrchampionship.id](https://jrchampionship.id)

## 🔑 Akun Demo

Berikut adalah daftar akun demo yang bisa digunakan untuk mencoba aplikasi:

| Role     | Username   | Password   |
| -------- | ---------- | ---------- |
| Peserta  | kezia24    | Junior123$ |
| Admin    | admin_demo | Junior123$ |
| Kolektif | adminbatch | Junior123$ |
