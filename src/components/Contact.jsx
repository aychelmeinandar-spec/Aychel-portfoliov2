import React from "react";
import { ArrowUpRight } from "lucide-react";
import {
  EMAIL_ADDRESS,
  GITHUB_URL,
  GMAIL_COMPOSE_URL,
  INSTAGRAM_URL,
} from "../data/portfolioData";
import { DecryptedText, BlurText, StarBorder, Magnet } from "./reactbits";

export function Contact() {
  return (
    <section id="contact" className="contact section wrap reveal">
      <div className="section-label">
        <span>
          <DecryptedText
            text="04 / CONTACT"
            speed={30}
            maxIterations={10}
            animateOn="view"
          />
        </span>
        <span className="label-rule" />
      </div>

      <div className="contact-panel">
        <div className="contact-orb" />
        <span className="eyebrow">HAVE A PROJECT IN MIND?</span>
        <h2>
          <BlurText text="Let’s make something" delay={60} />
          <br />
          <span className="gradient-text">
            <BlurText text="meaningful." delay={60} />
          </span>
        </h2>
        <p>
          Punya ide, kesempatan kolaborasi, atau sekadar ingin ngobrol soal
          teknologi? Kirim pesan, yuk.
        </p>

        <StarBorder
          as="a"
          href={GMAIL_COMPOSE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="contact-star-cta"
          color="#b58b6a"
          speed="3.5s"
        >
          <span className="contact-star-btn-inner">
            Say hello <ArrowUpRight size={17} />
          </span>
        </StarBorder>

        <span className="contact-deco mono">
          <DecryptedText
            text="0101 / LET’S BUILD"
            speed={35}
            maxIterations={12}
            animateOn="hover"
          />
        </span>
      </div>

      <div className="contact-links">
        <span>ELSEWHERE ON THE INTERNET</span>
        <Magnet padding={25} magnetStrength={2.5}>
          <a href={GITHUB_URL} target="_blank" rel="noreferrer">
            GitHub <ArrowUpRight size={15} />
          </a>
        </Magnet>
        <Magnet padding={25} magnetStrength={2.5}>
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
            Instagram <ArrowUpRight size={15} />
          </a>
        </Magnet>
        <Magnet padding={25} magnetStrength={2.5}>
          <a href={`mailto:${EMAIL_ADDRESS}`}>
            Email <ArrowUpRight size={15} />
          </a>
        </Magnet>
      </div>
    </section>
  );
}

