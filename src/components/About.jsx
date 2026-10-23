import React from "react";
import { DecryptedText, BlurText } from "./reactbits";

export function About() {
  return (
    <section id="about" className="about section wrap reveal">
      <div className="section-label">
        <span>
          <DecryptedText
            text="01 / ABOUT ME"
            speed={30}
            maxIterations={10}
            animateOn="view"
          />
        </span>
        <span className="label-rule" />
      </div>

      <div className="about-grid">
        <h2>
          <BlurText text="Curious mind." delay={65} animateBy="words" />
          <br />
          <span className="muted-heading">
            <BlurText text="Builder’s mindset." delay={65} animateBy="words" />
          </span>
        </h2>


        <div className="about-content">
          <p className="large-copy">
            Aku membangun website yang berfokus pada kebutuhan pengguna—
            mulai dari toko online hingga website layanan bisnis seperti
            toko obat dan rental mobil.
          </p>

          <p>
            Pengalamanku mencakup pengerjaan website toko online, website
            toko obat, dan website rental mobil. Aku terus mengasah
            kemampuan web development dan memperhatikan struktur informasi,
            kemudahan penggunaan, serta tampilan yang responsif.
          </p>

          <div className="skill-list">
            <span>CORE INTERESTS</span>
            <div className="pills">
              <b>Frontend Development</b>
              <b>UI / UX</b>
              <b>Creative Coding</b>
              <b>Problem Solving</b>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
