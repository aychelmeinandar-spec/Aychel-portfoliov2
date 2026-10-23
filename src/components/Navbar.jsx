import React, { useState, useEffect, useLayoutEffect, useRef, useCallback } from "react";
import { ArrowUpRight, Moon, Sun } from "lucide-react";
import { useLenis } from "lenis/react";
import { Magnet, StarBorder } from "./reactbits";
import "./Navbar.css";

const NAV_ITEMS = [
  { id: "home", label: "Home", href: "#home" },
  { id: "about", label: "About", href: "#about" },
  { id: "work", label: "Projects", href: "#work" },
  { id: "contact", label: "Contact", href: "#contact" },
];

export function Navbar({ light, setLight }) {
  const [activeId, setActiveId] = useState("home");
  const [hoverId, setHoverId] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const [pillStyle, setPillStyle] = useState({
    transform: "translate3d(0, 0, 0)",
    width: "0px",
    opacity: 0,
  });

  const [hoverStyle, setHoverStyle] = useState({
    transform: "translate3d(0, 0, 0)",
    width: "0px",
    opacity: 0,
  });

  const trackRef = useRef(null);
  const itemRefs = useRef({});

  // 120fps Smooth scrolling integration via Lenis
  const lenis = useLenis(({ scroll }) => {
    const shouldCondense = scroll > 32;
    if (shouldCondense !== isScrolled) {
      setIsScrolled(shouldCondense);
    }
  });

  // Fallback scroll listener if Lenis is initializing
  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY > 32;
      setIsScrolled(scrolled);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ScrollSpy: Track active section smoothly via IntersectionObserver
  useEffect(() => {
    const sectionIds = ["home", "about", "work", "contact"];
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -55% 0px",
      threshold: [0, 0.2, 0.5],
    };

    const sectionEntries = new Map();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        sectionEntries.set(entry.target.id, entry.isIntersecting);
      });

      // Find the first intersecting section in order
      for (const id of sectionIds) {
        if (sectionEntries.get(id)) {
          setActiveId(id);
          break;
        }
      }
    }, observerOptions);

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Update spring glide pill geometry based on active element
  const updatePillGeometry = useCallback(() => {
    const activeEl = itemRefs.current[activeId];
    const trackEl = trackRef.current;
    if (activeEl && trackEl) {
      const activeRect = activeEl.getBoundingClientRect();
      const trackRect = trackEl.getBoundingClientRect();
      setPillStyle({
        transform: `translate3d(${(activeRect.left - trackRect.left).toFixed(1)}px, 0, 0)`,
        width: `${activeRect.width.toFixed(1)}px`,
        opacity: 1,
      });
    }
  }, [activeId]);

  useLayoutEffect(() => {
    updatePillGeometry();
    const handleResize = () => updatePillGeometry();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [updatePillGeometry]);

  // Update hover preview pill
  useEffect(() => {
    if (hoverId && hoverId !== activeId) {
      const hoverEl = itemRefs.current[hoverId];
      const trackEl = trackRef.current;
      if (hoverEl && trackEl) {
        const hoverRect = hoverEl.getBoundingClientRect();
        const trackRect = trackEl.getBoundingClientRect();
        setHoverStyle({
          transform: `translate3d(${(hoverRect.left - trackRect.left).toFixed(1)}px, 0, 0)`,
          width: `${hoverRect.width.toFixed(1)}px`,
          opacity: 1,
        });
      }
    } else {
      setHoverStyle((prev) => ({ ...prev, opacity: 0 }));
    }
  }, [hoverId, activeId]);

  // Butter-smooth anchor navigation via Lenis
  const handleNavClick = (e, href, id) => {
    e.preventDefault();
    setActiveId(id);
    setMobileOpen(false);

    if (lenis) {
      lenis.scrollTo(href, {
        offset: -40,
        duration: 1.15,
        easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
      });
    } else {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className="aychel-nav-wrapper">
      <nav
        className={`aychel-nav-bar ${isScrolled ? "scrolled" : ""}`}
        aria-label="Main Navigation"
      >
        {/* Brand Monogram & Name */}
        <Magnet padding={18} magnetStrength={2.2}>
          <a
            href="#home"
            className="nav-brand-link"
            onClick={(e) => handleNavClick(e, "#home", "home")}
            aria-label="Aychel Portfolio Home"
          >
            <span className="nav-brand-mark">
              A<span>.</span>
            </span>
            <span className="nav-brand-text">
              AYCHEL<span className="nav-brand-muted">/DEV</span>
            </span>
          </a>
        </Magnet>

        {/* Center Desktop Navigation Track with Spring Glide Pill */}
        <div ref={trackRef} className="nav-center-track">
          {/* Spring-physics active pill */}
          <span
            className="nav-glide-pill"
            style={{
              transform: pillStyle.transform,
              width: pillStyle.width,
              opacity: pillStyle.opacity,
            }}
            aria-hidden="true"
          />

          {/* Hover preview pill */}
          <span
            className="nav-hover-pill"
            style={{
              transform: hoverStyle.transform,
              width: hoverStyle.width,
              opacity: hoverStyle.opacity,
            }}
            aria-hidden="true"
          />

          <ul className="nav-links-list">
            {NAV_ITEMS.map((item) => {
              const isActive = activeId === item.id;
              return (
                <li key={item.id}>
                  <a
                    ref={(el) => (itemRefs.current[item.id] = el)}
                    href={item.href}
                    className={`nav-link-item ${isActive ? "active" : ""}`}
                    onClick={(e) => handleNavClick(e, item.href, item.id)}
                    onMouseEnter={() => setHoverId(item.id)}
                    onMouseLeave={() => setHoverId(null)}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Right Actions: Tactile Theme Switcher & Star CTA */}
        <div className="nav-right-actions">
          <Magnet padding={20} magnetStrength={2.5}>
            <button
              type="button"
              className="nav-theme-toggle"
              aria-label="Ganti tema mode terang/gelap"
              onClick={() => setLight(!light)}
            >
              <span
                className="nav-theme-icon"
                style={{
                  transform: light ? "rotate(180deg)" : "rotate(0deg)",
                }}
              >
                {light ? <Moon size={16} /> : <Sun size={16} />}
              </span>
            </button>
          </Magnet>

          <StarBorder
            as="a"
            href="#contact"
            className="nav-cta-btn"
            color={light ? "#8e582d" : "#b58b6a"}
            speed="3.6s"
            onClick={(e) => handleNavClick(e, "#contact", "contact")}
          >
            <span className="nav-cta-inner">
              Let’s talk <ArrowUpRight size={14} />
            </span>
          </StarBorder>

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            className="nav-mobile-toggle"
            aria-label={mobileOpen ? "Tutup menu" : "Buka menu navigasi"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <span className={`nav-burger-box ${mobileOpen ? "open" : ""}`}>
              <span className="nav-burger-line top" />
              <span className="nav-burger-line bottom" />
            </span>
          </button>
        </div>

        {/* Mobile Dropdown Panel */}
        {mobileOpen && (
          <div className="nav-mobile-dropdown">
            <ul className="nav-mobile-list">
              {NAV_ITEMS.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      className={`nav-mobile-link ${isActive ? "active" : ""}`}
                      onClick={(e) => handleNavClick(e, item.href, item.id)}
                    >
                      <span>{item.label}</span>
                      {isActive && <span className="nav-mobile-link-dot" />}
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="nav-mobile-cta-wrap">
              <a
                href="#contact"
                className="nav-mobile-cta"
                onClick={(e) => handleNavClick(e, "#contact", "contact")}
              >
                Let’s talk <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

