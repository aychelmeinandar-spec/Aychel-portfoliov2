import React from "react";
import { Sparkles } from "lucide-react";
import { PROJECTS } from "../data/portfolioData";
import { DecryptedText, BlurText, MorphSlider } from "./reactbits";

export function Projects({ projects = PROJECTS, light = false }) {
  return (
    <section id="work" className="work section wrap reveal">
      <div className="section-label">
        <span>
          <DecryptedText
            text="02 / SELECTED WORK"
            speed={30}
            maxIterations={10}
            animateOn="view"
          />
        </span>
        <span className="label-rule" />
        <span className="label-note">A FEW THINGS I’VE BUILT</span>
      </div>

      <div className="work-heading">
        <h2>
          <BlurText text="Ideas into" delay={60} />{" "}
          <span className="gradient-text">
            <BlurText text="reality." delay={60} />
          </span>
        </h2>

        <p>
          Tiga proyek website yang pernah aku kerjakan: toko online, toko obat,
          dan rental mobil. Demo dan source code akan ditautkan di sini setelah
          masing-masing proyek dipublikasikan.
        </p>
      </div>

      {/* WebGL Morph Slider dari ReactBits */}
      <MorphSlider
        projects={projects}
        transition="melt"
        duration={1.1}
        intensity={0.55}
        scale={2.4}
        aberration={0.25}
        drift={0.35}
        light={light}
      />
    </section>
  );
}

