import React, { useState, useRef, useEffect, useCallback } from 'react';
import './Lanyard.css';

export const Lanyard = ({
  photo = '/profile-aychel.jpg',
  name = 'Aychel Gusti M.',
  handle = '@aychel',
  role = 'Creative Developer',
  onOpenModal,
  className = ''
}) => {
  const containerRef = useRef(null);
  const cardRef = useRef(null);

  // Refs for zero-re-render 120fps DOM manipulation
  const badgeAnchorRef = useRef(null);
  const strapBandRef = useRef(null);
  const stitchLeftRef = useRef(null);
  const stitchRightRef = useRef(null);
  const glareRef = useRef(null);

  // Physics state
  const stateRef = useRef({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    angle: 0,
    vAngle: 0,
    isDragging: false,
    dragStartX: 0,
    dragStartY: 0,
    lastPointerX: 0,
    lastPointerY: 0,
    pointerVelX: 0,
    pointerVelY: 0,
    hasMoved: false
  });

  const [isFlipped, setIsFlipped] = useState(false);
  const isFlippedRef = useRef(false);
  isFlippedRef.current = isFlipped;

  const [isHovered, setIsHovered] = useState(false);
  const animFrameRef = useRef(null);
  const isVisibleRef = useRef(true);

  // Direct DOM updater for 120fps silky performance
  const updateDOM = useCallback((x, y, angle, tiltX, tiltY) => {
    if (badgeAnchorRef.current) {
      badgeAnchorRef.current.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) rotate(${angle.toFixed(2)}deg)`;
    }
    if (cardRef.current) {
      const flipDeg = isFlippedRef.current ? 180 : 0;
      cardRef.current.style.transform = `perspective(900px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${(tiltY + flipDeg).toFixed(2)}deg)`;
    }
    if (glareRef.current) {
      glareRef.current.style.transform = `translate3d(${(-tiltY * 3).toFixed(1)}px, ${(-tiltX * 3).toFixed(1)}px, 0)`;
    }

    const strapOriginX = 175;
    const strapOriginY = 0;
    const badgeAttachX = strapOriginX + x;
    const badgeAttachY = 120 + y;
    const controlPointX = (strapOriginX + badgeAttachX) / 2 + (x * 0.15);
    const controlPointY = (strapOriginY + badgeAttachY) / 2;

    if (strapBandRef.current) {
      strapBandRef.current.setAttribute(
        'd',
        `M ${strapOriginX - 11} 0 Q ${controlPointX - 11} ${controlPointY} ${badgeAttachX - 11} ${badgeAttachY} L ${badgeAttachX + 11} ${badgeAttachY} Q ${controlPointX + 11} ${controlPointY} ${strapOriginX + 11} 0 Z`
      );
    }
    if (stitchLeftRef.current) {
      stitchLeftRef.current.setAttribute(
        'd',
        `M ${strapOriginX - 7} 0 Q ${controlPointX - 7} ${controlPointY} ${badgeAttachX - 7} ${badgeAttachY}`
      );
    }
    if (stitchRightRef.current) {
      stitchRightRef.current.setAttribute(
        'd',
        `M ${strapOriginX + 7} 0 Q ${controlPointX + 7} ${controlPointY} ${badgeAttachX + 7} ${badgeAttachY}`
      );
    }
  }, []);

  // Physics animation loop
  useEffect(() => {
    let lastTime = performance.now();

    const loop = (currentTime) => {
      if (!isVisibleRef.current) {
        animFrameRef.current = requestAnimationFrame(loop);
        return;
      }

      const dt = Math.min((currentTime - lastTime) / 1000, 0.033);
      lastTime = currentTime;

      const s = stateRef.current;

      if (!s.isDragging) {
        const springK = 75;
        const damping = 7.5;

        const fx = -springK * s.x - damping * s.vx;
        const fy = -springK * s.y - damping * s.vy;

        s.vx += fx * dt;
        s.vy += fy * dt;
        s.x += s.vx * dt;
        s.y += s.vy * dt;

        const targetAngle = (s.x / 18) + (s.vx / 35);
        const fAngle = -60 * (s.angle - targetAngle) - 6 * s.vAngle;
        s.vAngle += fAngle * dt;
        s.angle += s.vAngle * dt;

        const tiltX = Math.max(-25, Math.min(25, -s.vy * 0.04 - (s.y * 0.06)));
        const tiltY = Math.max(-30, Math.min(30, s.vx * 0.05 + (s.x * 0.08)));

        updateDOM(s.x, s.y, s.angle, tiltX, tiltY);
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    // Pause physics calculations when scrolled out of view
    const observer = new IntersectionObserver(([entry]) => {
      isVisibleRef.current = entry.isIntersecting;
      if (entry.isIntersecting) {
        lastTime = performance.now();
      }
    }, { threshold: 0.05 });

    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      observer.disconnect();
    };
  }, [updateDOM]);

  // Pointer interactions
  const handlePointerDown = (e) => {
    e.preventDefault();
    const s = stateRef.current;
    s.isDragging = true;
    s.hasMoved = false;
    s.dragStartX = e.clientX;
    s.dragStartY = e.clientY;
    s.lastPointerX = e.clientX;
    s.lastPointerY = e.clientY;
    s.vx = 0;
    s.vy = 0;
    s.vAngle = 0;

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);
  };

  const handlePointerMove = useCallback((e) => {
    const s = stateRef.current;
    if (!s.isDragging) return;

    const dx = e.clientX - s.dragStartX;
    const dy = e.clientY - s.dragStartY;

    if (Math.hypot(dx, dy) > 6) {
      s.hasMoved = true;
    }

    s.pointerVelX = (e.clientX - s.lastPointerX) * 25;
    s.pointerVelY = (e.clientY - s.lastPointerY) * 25;
    s.lastPointerX = e.clientX;
    s.lastPointerY = e.clientY;

    const maxDragX = 180;
    const maxDragY = 140;
    const clampedX = Math.max(-maxDragX, Math.min(maxDragX, dx));
    const clampedY = Math.max(-60, Math.min(maxDragY, dy));

    s.x = clampedX;
    s.y = clampedY;
    s.angle = (clampedX / 14);

    const tiltX = Math.max(-28, Math.min(28, -clampedY * 0.2));
    const tiltY = Math.max(-35, Math.min(35, clampedX * 0.22));

    updateDOM(s.x, s.y, s.angle, tiltX, tiltY);
  }, [updateDOM]);

  const handlePointerUp = useCallback(() => {
    const s = stateRef.current;
    s.isDragging = false;

    s.vx = Math.max(-600, Math.min(600, s.pointerVelX || 0));
    s.vy = Math.max(-500, Math.min(500, s.pointerVelY || 0));
    s.vAngle = s.vx / 40;

    if (!s.hasMoved) {
      setIsFlipped((prev) => !prev);
    }

    window.removeEventListener('pointermove', handlePointerMove);
    window.removeEventListener('pointerup', handlePointerUp);
    window.removeEventListener('pointercancel', handlePointerUp);
  }, [handlePointerMove]);

  // Initial gentle swing nudge on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      stateRef.current.vx = 140;
      stateRef.current.vAngle = 8;
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`lanyard-wrapper ${className}`.trim()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Dynamic Lanyard Strap */}
      <svg className="lanyard-strap-svg" aria-hidden="true">
        <defs>
          <linearGradient id="lanyardStrapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1a1816" />
            <stop offset="50%" stopColor="#2e2722" />
            <stop offset="100%" stopColor="#1a1816" />
          </linearGradient>
          <filter id="strapShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#000" floodOpacity="0.35" />
          </filter>
        </defs>

        {/* Strap Band */}
        <path
          ref={strapBandRef}
          d="M 164 0 Q 164 60 164 120 L 186 120 Q 186 60 186 0 Z"
          fill="url(#lanyardStrapGrad)"
          filter="url(#strapShadow)"
        />

        {/* Inner stitch lines */}
        <path
          ref={stitchLeftRef}
          d="M 168 0 Q 168 60 168 120"
          stroke="#b58b6a"
          strokeWidth="1.2"
          strokeDasharray="4 3"
          fill="none"
          opacity="0.8"
        />
        <path
          ref={stitchRightRef}
          d="M 182 0 Q 182 60 182 120"
          stroke="#b58b6a"
          strokeWidth="1.2"
          strokeDasharray="4 3"
          fill="none"
          opacity="0.8"
        />
      </svg>

      {/* 3D Badge Node */}
      <div
        ref={badgeAnchorRef}
        className="lanyard-badge-anchor"
        style={{ willChange: 'transform' }}
      >
        {/* Metal Clamp / Buckle */}
        <div className="lanyard-clamp">
          <div className="lanyard-buckle">
            <span className="lanyard-buckle-icon">⚛</span>
          </div>
          <div className="lanyard-clip-metal">
            <div className="lanyard-clip-ring" />
            <div className="lanyard-clip-hook" />
          </div>
        </div>

        {/* 3D Flippable Card */}
        <div
          ref={cardRef}
          className={`lanyard-card-container ${isFlipped ? 'is-flipped' : ''}`}
          onPointerDown={handlePointerDown}
          style={{ willChange: 'transform' }}
        >
          {/* FRONT FACE */}
          <div className="lanyard-card-face lanyard-card-front">
            {/* Gloss reflection overlay */}
            <div
              ref={glareRef}
              className="lanyard-card-glare"
            />

            {/* Top Punch Hole */}
            <div className="lanyard-hole-wrap">
              <div className="lanyard-hole" />
            </div>

            {/* Header info */}
            <div className="lanyard-card-header">
              <div className="lanyard-brand-badge">
                <span className="lanyard-atom-icon">⚛</span>
                <span>AYCHEL.DEV</span>
              </div>
              <span className="lanyard-id-number">{handle}</span>
            </div>

            {/* Portrait Photo */}
            <div className="lanyard-photo-frame">
              <img
                src={photo}
                alt="Foto Profil Aychel"
                className="lanyard-photo-img"
                draggable={false}
              />
              <div className="lanyard-photo-scanline" />
            </div>

            {/* Profile Info */}
            <div className="lanyard-info">
              <h3 className="lanyard-name">
                {name}
                <span className="lanyard-verified" title="Verified Developer">✓</span>
              </h3>
              <p className="lanyard-role">{role}</p>
            </div>

            {/* Footer Barcode & Micro Text */}
            <div className="lanyard-card-footer">
              <div className="lanyard-barcode">
                <span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span />
              </div>
              <span className="lanyard-chip-code">ID-2026-DEV</span>
            </div>

            {/* Interactive hint */}
            <div className="lanyard-drag-hint">
              <span>Try dragging or click to flip</span>
            </div>
          </div>

          {/* BACK FACE */}
          <div className="lanyard-card-face lanyard-card-back">
            <div className="lanyard-hole-wrap">
              <div className="lanyard-hole" />
            </div>

            <div className="lanyard-back-header">
              <span className="lanyard-back-title">ACCESS PASS</span>
              <span className="lanyard-back-status">ACTIVE</span>
            </div>

            <div className="lanyard-back-chip">
              <div className="lanyard-gold-chip" />
              <span className="lanyard-chip-text">NFC / CREATIVE TECH</span>
            </div>

            <div className="lanyard-back-details">
              <p className="lanyard-back-quote">
                “Building digital experiences with craft &amp; purpose.”
              </p>
              <div className="lanyard-back-tags">
                <span>Frontend</span>
                <span>UI / UX</span>
                <span>Creative Code</span>
              </div>
            </div>

            <div className="lanyard-back-actions">
              {onOpenModal && (
                <button
                  type="button"
                  className="lanyard-modal-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenModal();
                  }}
                >
                  View Full Profile ↗
                </button>
              )}
            </div>

            <div className="lanyard-drag-hint">
              <span>Click to flip back</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lanyard;
