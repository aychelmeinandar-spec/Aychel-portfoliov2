import React from "react";
import { ArrowDownRight, ArrowUpRight, Github, Instagram, Mail } from "lucide-react";
import { EMAIL_ADDRESS, GITHUB_URL, INSTAGRAM_URL } from "../data/portfolioData";
import {
  ShinyText,
  Particles,
  Magnet,
  StarBorder,
  DecryptedText,
  Lanyard
} from "./reactbits";

export function Hero({ year, onOpenProfile }) {
  return (
    <section id="home" className="hero wrap">
      <div className="hero-particles-bg" aria-hidden="true">
        <Particles
          particleCount={50}
          speed={0.35}
          particleColors={["#b58b6a", "#e9e0d4", "#d0b69a"]}
          moveParticlesOnHover={true}
          connections={true}
          connectionDistance={100}
        />
      </div>

      <div className="hero-copy">
        <div className="eyebrow">
          <span className="status-dot" />
          <ShinyText
            text="AVAILABLE FOR OPPORTUNITIES"
            color="var(--text-muted, #95897c)"
            shineColor="var(--text, #e9e0d4)"
            speed={3.5}
            shineWidth={55}
          />
          <span className="eyebrow-line" />
        </div>

        <h1>
          Building digital
          <br />
          things with{" "}
          <ShinyText
            text="purpose."
            color="#c7b49b"
            shineColor="#ffffff"
            speed={2.6}
            glow={0.35}
            className="hero-shiny-purpose"
          />
        </h1>

        <p className="hero-intro">
          Halo, aku{" "}
          <strong className="hero-name-highlight">
            <DecryptedText
              text="Aychel Gusti M."
              speed={35}
              maxIterations={12}
              animateOn="both"
              className="hero-name-decrypted"
            />
          </strong>{" "}
          — developer yang suka mengubah ide menjadi pengalaman digital yang
          fungsional, menarik, dan mudah digunakan.
        </p>

        <div className="hero-buttons">
          <StarBorder
            as="a"
            href="#work"
            className="hero-star-cta"
            color="#b58b6a"
            speed="3.5s"
          >
            <span className="hero-star-btn-inner">
              Explore my work <ArrowDownRight size={17} />
            </span>
          </StarBorder>

          <a className="button secondary" href="#contact">
            Get in touch <ArrowUpRight size={17} />
          </a>
        </div>

        <div className="hero-social">
          <span>FIND ME ON</span>
          <Magnet padding={25} magnetStrength={2.5}>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <Github size={17} />
            </a>
          </Magnet>
          <Magnet padding={25} magnetStrength={2.5}>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <Instagram size={17} />
            </a>
          </Magnet>
          <Magnet padding={25} magnetStrength={2.5}>
            <a href={`mailto:${EMAIL_ADDRESS}`} aria-label="Email">
              <Mail size={17} />
            </a>
          </Magnet>
        </div>
      </div>

      <div className="hero-lanyard-col">
        <Lanyard
          photo="/profile-aychel.jpg"
          name="Aychel Gusti M."
          handle="@aychel"
          role="Creative Developer"
          onOpenModal={onOpenProfile}
        />
      </div>

      <div className="hero-bottom">
        <span>SCROLL TO EXPLORE</span>
        <div className="scroll-line" />
        <span className="mono">{String(year)}</span>
      </div>
    </section>
  );
}


