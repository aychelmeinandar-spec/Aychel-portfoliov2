import React from "react";
import { MonitorSmartphone, Sparkles } from "lucide-react";
import { TOOL_ITEMS } from "../data/portfolioData";
import { LogoLoop, DecryptedText, BlurText } from "./reactbits";

export function Toolkit({ tools = TOOL_ITEMS }) {
  const loopLogos = tools.map((tool) => ({
    src: tool.image,
    alt: tool.name,
    title: tool.name,
    hoverColor: "#b58b6a",
  }));

  return (
    <section className="stack section wrap reveal">
      <div className="section-label">
        <span>
          <DecryptedText
            text="03 / TOOLKIT"
            speed={30}
            maxIterations={10}
            animateOn="view"
          />
        </span>
        <span className="label-rule" />
      </div>

      <div className="stack-row stack-row-clean">
        <div className="stack-heading">
          <h2>
            <BlurText text="Tools & capabilities." delay={60} />
          </h2>

          <p>
            Teknologi dan tools yang kugunakan untuk membangun pengalaman
            web yang fungsional, terstruktur, dan responsif.
          </p>
        </div>
      </div>

      {/* Infinite LogoLoop dari ReactBits */}
      <div className="toolkit-loop-wrapper">
        <div className="toolkit-loop-header">
          <Sparkles size={14} className="toolkit-sparkle" />
          <span>ACTIVE TECH MARQUEE · DRAG &amp; HOVER TO PAUSE</span>
        </div>
        <div className="toolkit-loop-card">
          <LogoLoop
            logos={loopLogos}
            speed={45}
            logoHeight={38}
            gap={56}
            pauseOnHover={true}
            scaleOnHover={true}
            fadeOut={true}
            fadeOutWidth={0.16}
            labels="below"
            ariaLabel="Loop logo toolkit"
          />
        </div>
      </div>
    </section>
  );
}

