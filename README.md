# Aychel Gusti M. — Creative Developer Portfolio

Portofolio web modern, interaktif, dan berperforma tinggi yang dibangun menggunakan **React**, **Vite**, dan **Lenis Smooth Scroll**. Dirancang dengan estetika *dark theme* elegan, aksen *warm sand*, layout responsif, animasi 120 FPS bebas hambatan, serta efek visual interaktif (WebGL morphing slider, kartu 3D, physics lanyard, dan canvas particles).

---

## ✨ Fitur Utama

- **Floating Frosted Glass Navbar**:
  - Tampilan floating pill dengan efek kaca buram modern (`backdrop-filter: blur(20px) saturate(180%)`).
  - **Dynamic Auto-Condense on Scroll**: Navbar menyusut halus saat halaman di-scroll ke bawah untuk memaksimalkan area baca.
  - **Spring-Physics Gliding Pill**: Indikator navigasi meluncur dengan fisika pegas mulus (`cubic-bezier(0.22, 1, 0.36, 1)`) menggunakan akselerasi hardware GPU.
  - **Real-Time ScrollSpy**: Indikator otomatis berpindah aktif mengikuti section yang sedang dilihat pengguna (`#home`, `#about`, `#work`, `#contact`).
  - **Responsive Mobile Drawer**: Tampilan mobile menu dropdown yang adaptif dan estetik.
- **120 FPS Buttery Smooth Scroll**:
  - Ditenagai oleh **Lenis** dengan kurva interpolasi eksponensial (`duration: 1.15s`).
  - Sinkronisasi scroll bebas konflik dengan browser engine untuk menjamin frame rate tinggi di layar 120Hz/ProMotion.
  - Navigasi anchor klik di seluruh halaman meluncur secara sinematik tanpa patah-patah.
- **WebGL Image Morph Slider**:
  - Slider showcase proyek berbasis WebGL shader (OGL + GSAP) dengan transisi distorsi cairan (*melt/wave effect*).
  - Dilengkapi *intersection observer* cerdas untuk mem-pause render loop saat off-screen guna menghemat daya dan GPU.
- **Interactive 3D Lanyard ID Badge**:
  - Kartu identitas 3D interaktif dengan simulasi fisika tali pegas (*spring physics* & pendulum).
  - Dapat di-drag, dilempar dengan momentum, atau diklik untuk membalik kartu (3D flip effect).
- **Interactive Canvas Particles Background**:
  - Partikel melayang di Hero section yang saling terhubung dengan garis jaring dan bereaksi menjauh saat didekati kursor mouse.
- **3D Perspective Tilt**:
  - Kartu showcase dan hero art bereaksi terhadap gerakan kursor menggunakan interpolasi lerp `requestAnimationFrame` bebas lag.
- **Dual Theme Support (Dark & Warm Light Mode)**:
  - Mode gelap bertema obsidian-gold dan mode terang bernuansa *warm sand/paper* yang nyaman di mata.
- **Arsitektur Komponen Modular**:
  - Pemisahan kode yang bersih antara komponen UI, data statis, hooks kustom, dan modul efek grafis (`reactbits`).

---

## 🛠️ Tech Stack

| Kategori | Teknologi | Deskripsi |
| :--- | :--- | :--- |
| **Framework** | [React](https://react.dev/) | Library antarmuka komponen deklaratif |
| **Build Tool** | [Vite](https://vitejs.dev/) | Bundler modern super cepat dengan HMR instan |
| **Smooth Scroll** | [Lenis](https://lenis.darkroom.engineering/) | Library smooth scroll performa tinggi 120 FPS |
| **WebGL & 3D** | [OGL](https://github.com/oframe/ogl) & [GSAP](https://gsap.com/) | Minimal WebGL library & animation engine untuk shader |
| **Icons** | [Lucide React](https://lucide.dev/) | Kumpulan ikon SVG modern dan ringan |
| **Styling** | Vanilla CSS (CSS Variables) | Sistem desain berbasis custom properties & tokens |

---

## 📁 Struktur Direktori

```text
aychel-portfolio/
├── public/                 # Aset statis publik (foto profil, gambar proyek)
├── src/
│   ├── components/         # Komponen UI utama
│   │   ├── About.jsx       # Section Tentang Saya & Core Interests
│   │   ├── Contact.jsx     # Section Kontak & Tautan Sosial
│   │   ├── Footer.jsx      # Footer & Tombol Back to Top
│   │   ├── Hero.jsx        # Hero Section dengan Particles & Lanyard
│   │   ├── HeroArt.jsx     # Visual 3D Orbit Ilustrasi
│   │   ├── Navbar.jsx      # Floating Glass Navbar dengan ScrollSpy
│   │   ├── Navbar.css      # Styling khusus untuk Floating Navbar
│   │   ├── ProfileModal.jsx# Modal detail profil & riwayat
│   │   ├── Projects.jsx    # Section Showcase Proyek & WebGL Slider
│   │   ├── Toolkit.jsx     # Section Tech Stack & Infinite Logo Loop
│   │   ├── index.js        # Barrel export untuk komponen utama
│   │   └── reactbits/      # Modul animasi & efek interaktif reusable
│   │       ├── BlurText/
│   │       ├── ClickSpark/
│   │       ├── DecryptedText/
│   │       ├── Lanyard/
│   │       ├── LogoLoop/
│   │       ├── Magnet/
│   │       ├── MorphSlider/
│   │       ├── Particles/
│   │       ├── PillNav/
│   │       ├── ShinyText/
│   │       ├── SpotlightCard/
│   │       └── StarBorder/
│   ├── data/               # Data statis portofolio
│   │   └── portfolioData.js
│   ├── hooks/              # Custom React Hooks
│   │   ├── useHeroTilt.js
│   │   ├── useProjectTilt.js
│   │   ├── useScrollReveal.js
│   │   └── index.js
│   ├── App.jsx             # Root layout & inisialisasi Lenis
│   ├── main.jsx            # Entry point aplikasi React
│   └── style.css           # Design tokens, reset, & utility styles
├── index.html              # HTML template
├── package.json            # Daftar dependensi & script proyek
├── vite.config.js          # Konfigurasi build Vite
└── README.md               # Dokumentasi proyek
```

---

## 🚀 Menjalankan Secara Lokal

1. **Clone repository ini:**
   ```bash
   git clone https://github.com/lipp13/Aychel-Portfolio.git
   cd Aychel-Portfolio
   ```

2. **Install semua dependensi:**
   ```bash
   npm install
   ```

3. **Jalankan development server:**
   ```bash
   npm run dev
   ```
   Buka browser di `http://localhost:5173`.

4. **Build untuk production:**
   ```bash
   npm run build
   ```
   Hasil build siap deploy akan berada di folder `dist/`.

---

## 🌐 Panduan Deploy

### Deploy ke Vercel:
1. Hubungkan repository GitHub Anda ke [Vercel](https://vercel.com).
2. Pilih framework preset: **Vite**.
3. Pastikan konfigurasi:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
4. Klik **Deploy**.

---

## 📬 Kontak & Tautan

- **Nama**: Aychel Gusti M.
- **Peran**: Creative Developer & Frontend Engineer
- **Email**: [aychelmeinandar@gmail.com](mailto:aychelmeinandar@gmail.com)
- **GitHub**: [github.com/lipp13](https://github.com/lipp13) · [github.com/AychelMeinandar](https://github.com/AychelMeinandar)
- **Instagram**: [@aychelgm1](https://www.instagram.com/aychelgm1/)
- **Repository**: [https://github.com/lipp13/Aychel-Portfolio](https://github.com/lipp13/Aychel-Portfolio)

---

Didesain dan dikembangkan dengan dedikasi penuh untuk estetika dan performa visual yang presisi.
