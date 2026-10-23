import React from "react";
import { Code2 } from "lucide-react";

export function HeroArt() {
  return (
    <div className="hero-art" aria-label="Ilustrasi abstrak teknologi">
      <div className="orbit orbit-one" />
      <div className="orbit orbit-two" />
      <div className="orbit orbit-three" />

      <div className="core">
        <Code2 size={58} strokeWidth={1.2} />
        <span>
          CREATIVE
          <br />
          DEVELOPER
        </span>
      </div>

      <div className="float-card card-top">
        <span className="mini-dot" />
        building something new
      </div>

      <div className="float-card card-bottom">
        <span className="mono">&lt;/&gt;</span>
        <div>
          <b>Curiosity first.</b>
          <small>Always learning</small>
        </div>
      </div>

      <span className="art-index">FIG. 001 — DIGITAL CRAFT</span>
    </div>
  );
}
