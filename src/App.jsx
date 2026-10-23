import React, { useState, useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import {
  Navbar,
  Hero,
  About,
  Projects,
  Toolkit,
  Contact,
  ProfileModal,
  Footer,
} from "./components";
import { ClickSpark } from "./components/reactbits";
import { useScrollReveal, useHeroTilt, useProjectTilt } from "./hooks";

function SmoothScrollHandler() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href === "#" || href.startsWith("#!")) return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        lenis.scrollTo(target, {
          offset: -35,
          duration: 1.15,
          easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
        });
      }
    };

    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, [lenis]);

  return null;
}

export default function App() {
  const [light, setLight] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [year] = useState(new Date().getFullYear());

  // Inisialisasi efek animasi dan interaksi 3D
  useScrollReveal();
  useHeroTilt();
  useProjectTilt();

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08,
        duration: 1.15,
        smoothWheel: true,
        wheelMultiplier: 0.95,
        touchMultiplier: 1.5,
        syncTouch: false,
      }}
    >
      <SmoothScrollHandler />
      <div className={light ? "site light" : "site"}>
        <ClickSpark
          sparkColors={
            light
              ? ["#8c6747", "#b58b6a", "#333333", "#d0b69a"]
              : ["#e9e0d4", "#b58b6a", "#ffffff", "#ffd700", "#d0b69a"]
          }
          sparkCount={8}
          sparkRadius={22}
          duration={420}
        />

        <div className="grain" aria-hidden="true" />

        <Navbar light={light} setLight={setLight} />

        <main>
          <Hero year={year} onOpenProfile={() => setProfileOpen(true)} />
          <About />
          <Projects light={light} />
          <Toolkit />
          <Contact />
        </main>

        <ProfileModal
          isOpen={profileOpen}
          onClose={() => setProfileOpen(false)}
        />

        <Footer year={year} />
      </div>
    </ReactLenis>
  );
}



