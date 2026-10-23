import React from "react";

export function Footer({ year }) {
  return (
    <footer className="footer wrap">
      <a className="brand" href="#home">
        <span className="brand-mark">
          A<span>.</span>
        </span>
        <span>
          AYCHEL<span className="brand-muted">/DEV</span>
        </span>
      </a>
      <span>DESIGNED &amp; BUILT WITH CURIOSITY © {year}</span>
      <a href="#home" className="back-top">
        BACK TO TOP ↑
      </a>
    </footer>
  );
}
