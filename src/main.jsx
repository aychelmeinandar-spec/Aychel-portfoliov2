import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowDownRight, ArrowUpRight, Github, Instagram, Mail, Moon, Sun, Code2, Sparkles, Menu, X, MonitorSmartphone } from 'lucide-react';
import './style.css';

const githubUrl = 'https://github.com/AychelMeinandar';
const instagramUrl = 'https://www.instagram.com/aychelgm1/';

const projects = [
  {
    no: '01',
    name: 'Website Toko Online',
    type: 'E-COMMERCE',
    description: 'Website toko online untuk menampilkan produk dan membantu pengunjung menjelajahi katalog belanja. Tambahkan fitur dan teknologi spesifik sesuai implementasi proyekmu.',
    tags: ['E-commerce', 'Product Catalog', 'Web Development'],
    accent: 'violet',
    link: githubUrl,
    previewUrl: '',
    sourceUrl: '',
  },
  {
    no: '02',
    name: 'Website Toko Obat',
    type: 'BUSINESS WEBSITE',
    description: 'Website toko obat untuk menyajikan informasi toko dan katalog produk dengan struktur yang mudah dijelajahi.',
    tags: ['Business Website', 'Catalog', 'Responsive UI'],
    accent: 'blue',
    link: githubUrl,
    previewUrl: "https://penjualanobatberbasisweb.kesug.com/Project-Tugas-Akhir/",
    sourceUrl: '',
  },
  {
    no: '03',
    name: 'Website Rental Mobil',
    type: 'RENTAL SERVICE',
    description: 'Website layanan rental mobil untuk menampilkan pilihan kendaraan dan informasi layanan bagi calon pelanggan.',
    tags: ['Vehicle Catalog', 'Rental Service', 'Web Development'],
    accent: 'orange',
    link: githubUrl,
    previewUrl: '',
    sourceUrl: '',
  },
];

function App() {
  const [light, setLight] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [year] = useState(new Date().getFullYear());
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); }), { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  const closeMenu = () => setMenuOpen(false);
  return <div className={light ? 'site light' : 'site'}>
    <div className="grain" aria-hidden="true" />
    <header className="nav wrap">
      <a className="brand" href="#home" onClick={closeMenu}><span className="brand-mark">A<span>.</span></span><span>AYCHEL<span className="brand-muted">/DEV</span></span></a>
      <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
        <a href="#about" onClick={closeMenu}>About</a><a href="#work" onClick={closeMenu}>Projects</a><a href="#contact" onClick={closeMenu}>Contact</a>
      </nav>
      <div className="nav-actions"><button className="icon-button theme-toggle" aria-label="Ganti tema" onClick={() => setLight(!light)}>{light ? <Moon size={18}/> : <Sun size={18}/>}</button><a className="nav-cta" href="#contact">Let’s talk <ArrowUpRight size={15}/></a><button className="icon-button menu-toggle" aria-label="Buka menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button></div>
    </header>
    <main>
      <section id="home" className="hero wrap">
        <div className="hero-copy">
          <div className="eyebrow"><span className="status-dot"/> AVAILABLE FOR OPPORTUNITIES <span className="eyebrow-line"/></div>
          <h1>Building digital<br/>things with <span className="gradient-text">purpose.</span></h1>
          <p className="hero-intro">Halo, aku <strong>Aychel Gusti M.</strong> — developer yang suka mengubah ide menjadi pengalaman digital yang fungsional, menarik, dan mudah digunakan.</p>
          <div className="hero-buttons"><a className="button primary" href="#work">Explore my work <ArrowDownRight size={17}/></a><a className="button secondary" href="#contact">Get in touch <ArrowUpRight size={17}/></a></div>
          <div className="hero-social"><span>FIND ME ON</span><a href={githubUrl} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={17}/></a><a href={instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={17}/></a><a href="mailto:aychelmeinandar@gmail.com" aria-label="Email"><Mail size={17}/></a></div>
        </div>
        <div className="hero-art" aria-label="Ilustrasi abstrak teknologi"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="orbit orbit-three"/><div className="core"><Code2 size={58} strokeWidth={1.2}/><span>CREATIVE<br/>DEVELOPER</span></div><div className="float-card card-top"><span className="mini-dot"/> building something new</div><div className="float-card card-bottom"><span className="mono">&lt;/&gt;</span><div><b>Curiosity first.</b><small>Always learning</small></div></div><span className="art-index">FIG. 001 — DIGITAL CRAFT</span></div>
        <div className="hero-bottom"><span>SCROLL TO EXPLORE</span><div className="scroll-line"/><span className="mono">{String(year)}</span></div>
      </section>
      <section id="about" className="about section wrap reveal"><div className="section-label"><span>01 / ABOUT ME</span><span className="label-rule"/></div><div className="about-grid"><h2>Curious mind.<br/><span className="muted-heading">Builder’s mindset.</span></h2><div className="about-content"><p className="large-copy">Aku membangun website yang berfokus pada kebutuhan pengguna—mulai dari toko online hingga website layanan bisnis seperti toko obat dan rental mobil.</p><p>Pengalamanku mencakup pengerjaan website toko online, website toko obat, dan website rental mobil. Aku terus mengasah kemampuan web development dan memperhatikan struktur informasi, kemudahan penggunaan, serta tampilan yang responsif.</p><div className="skill-list"><span>CORE INTERESTS</span><div className="pills"><b>Frontend Development</b><b>UI / UX</b><b>Creative Coding</b><b>Problem Solving</b></div></div></div></div></section>
      <section id="work" className="work section wrap reveal"><div className="section-label"><span>02 / SELECTED WORK</span><span className="label-rule"/><span className="label-note">A FEW THINGS I’VE BUILT</span></div><div className="work-heading"><h2>Ideas into <span className="gradient-text">reality.</span></h2><p>Tiga proyek website yang pernah aku kerjakan: toko online, toko obat, dan rental mobil. Demo dan source code akan ditautkan di sini setelah masing-masing proyek dipublikasikan.</p></div><div className="project-grid">{projects.map(project => <article className={`project-card ${project.accent}`} key={project.no}><div className="project-top"><span>{project.no} / {project.type}</span><a href={project.previewUrl || project.sourceUrl || project.link} target="_blank" rel="noopener noreferrer" aria-label={`Buka ${project.name}`}><ArrowUpRight size={19}/></a></div><div className="project-visual"><div className="mock-window"><div className="window-bar"><i/><i/><i/><span>{project.name.toLowerCase()}.app</span></div><div className="mock-content"><div className="mock-sidebar"><b>A.</b><i/><i/><i/></div><div className="mock-main"><div className="mock-title"/><div className="mock-subtitle"/><div className="mock-blocks"><i/><i/><i/></div><div className="mock-line"/><div className="mock-line short"/></div></div></div><div className="visual-glow"/></div><div className="project-info"><h3>{project.name}</h3><p>{project.description}</p><div className="tag-row">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div><div className="project-actions">{project.previewUrl ? <a className="project-btn project-btn-primary" href={project.previewUrl} target="_blank" rel="noreferrer">Live Preview <ArrowUpRight size={15}/></a> : <span className="project-btn project-btn-disabled" aria-disabled="true">Live Preview · Segera hadir</span>}{project.sourceUrl ? <a className="project-btn project-btn-secondary" href={project.sourceUrl} target="_blank" rel="noreferrer"><Github size={15}/> Source Code</a> : <span className="project-btn project-btn-disabled" aria-disabled="true">Source Code · Segera hadir</span>}</div></div></article>)}</div><p className="project-note"><Sparkles size={15}/> Tautan demo dan source code tersedia sesuai proyek yang sudah dipublikasikan.</p></section>
      <section className="stack section wrap reveal"><div className="section-label"><span>03 / TOOLKIT</span><span className="label-rule"/></div><div className="stack-row"><div className="stack-heading"><h2>Tools & capabilities.</h2><p>Teknologi dan tools yang kugunakan untuk membangun pengalaman web yang fungsional.</p></div><div className="stack-items"><div className="stack-item"><span className="stack-logo html-logo"><img src="https://cdn.simpleicons.org/html5/E34F26" alt="" loading="lazy"/></span><span className="stack-item-name">HTML5</span><small>Markup</small></div><div className="stack-item"><span className="stack-logo css-logo"><img src="https://cdn.simpleicons.org/css3/1572B6" alt="" loading="lazy"/></span><span className="stack-item-name">CSS3</span><small>Styling</small></div><div className="stack-item"><span className="stack-logo js-logo"><img src="https://cdn.simpleicons.org/javascript/F7DF1E" alt="" loading="lazy"/></span><span className="stack-item-name">JavaScript</span><small>Programming</small></div><div className="stack-item"><span className="stack-logo react-logo"><img src="https://cdn.simpleicons.org/react/61DAFB" alt="" loading="lazy"/></span><span className="stack-item-name">React</span><small>UI Library</small></div><div className="stack-item"><span className="stack-logo git-logo"><img src="https://cdn.simpleicons.org/git/F05032" alt="" loading="lazy"/></span><span className="stack-item-name">Git</span><small>Version Control</small></div><div className="stack-item"><span className="stack-logo github-logo"><img src="https://cdn.simpleicons.org/github/F0F0F0" alt="" loading="lazy"/></span><span className="stack-item-name">GitHub</span><small>Repositories</small></div><div className="stack-item"><span className="stack-logo responsive-logo"><MonitorSmartphone size={28} strokeWidth={1.8}/></span><span className="stack-item-name">Responsive UI</span><small>All screens</small></div></div></div></section>
      <section id="contact" className="contact section wrap reveal"><div className="section-label"><span>04 / CONTACT</span><span className="label-rule"/></div><div className="contact-panel"><div className="contact-orb"/><span className="eyebrow">HAVE A PROJECT IN MIND?</span><h2>Let’s make something<br/><span className="gradient-text">meaningful.</span></h2><p>Punya ide, kesempatan kolaborasi, atau sekadar ingin ngobrol soal teknologi? Kirim pesan, yuk.</p><a className="button primary" href="mailto:aychelmeinandar@gmail.com">Say hello <ArrowUpRight size={17}/></a><span className="contact-deco mono">0101 / LET’S BUILD</span></div><div className="contact-links"><span>ELSEWHERE ON THE INTERNET</span><a href={githubUrl} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={15}/></a><a href={instagramUrl} target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={15}/></a><a href="mailto:aychelmeinandar@gmail.com">Email <ArrowUpRight size={15}/></a></div></section>
    </main>
    <footer className="footer wrap"><a className="brand" href="#home"><span className="brand-mark">A<span>.</span></span><span>AYCHEL<span className="brand-muted">/DEV</span></span></a><span>DESIGNED & BUILT WITH CURIOSITY © {year}</span><a href="#home" className="back-top">BACK TO TOP ↑</a></footer>
  </div>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);
