import React, { useEffect, useRef } from 'react';
import './Magnet.css';

export const Magnet = ({
  children,
  padding = 50,
  magnetStrength = 3,
  wrapperClassName = '',
  innerClassName = '',
  disabled = false,
  ...props
}) => {
  const magnetRef = useRef(null);
  const innerRef = useRef(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const rafIdRef = useRef(null);
  const isHoveredRef = useRef(false);

  useEffect(() => {
    if (disabled) return;

    const animate = () => {
      const cur = currentRef.current;
      const target = targetRef.current;

      const dx = target.x - cur.x;
      const dy = target.y - cur.y;

      // Smooth lerp damping for 120fps butter-smooth tracking
      cur.x += dx * 0.18;
      cur.y += dy * 0.18;

      if (innerRef.current) {
        innerRef.current.style.transform = `translate3d(${cur.x.toFixed(2)}px, ${cur.y.toFixed(2)}px, 0)`;
      }

      // Keep running if not yet settled or still hovered
      if (Math.abs(dx) > 0.05 || Math.abs(dy) > 0.05 || isHoveredRef.current) {
        rafIdRef.current = requestAnimationFrame(animate);
      } else {
        cur.x = 0;
        cur.y = 0;
        if (innerRef.current) {
          innerRef.current.style.transform = 'translate3d(0px, 0px, 0)';
        }
        rafIdRef.current = null;
      }
    };

    const startAnimation = () => {
      if (!rafIdRef.current) {
        rafIdRef.current = requestAnimationFrame(animate);
      }
    };

    const handlePointerMove = (e) => {
      const el = magnetRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const distance = Math.hypot(distX, distY);

      const maxDistance = Math.max(rect.width, rect.height) / 2 + padding;

      if (distance < maxDistance) {
        isHoveredRef.current = true;
        targetRef.current = {
          x: distX / magnetStrength,
          y: distY / magnetStrength
        };
        startAnimation();
      } else if (isHoveredRef.current) {
        isHoveredRef.current = false;
        targetRef.current = { x: 0, y: 0 };
        startAnimation();
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [disabled, magnetStrength, padding]);

  const handlePointerLeave = () => {
    isHoveredRef.current = false;
    targetRef.current = { x: 0, y: 0 };
  };

  return (
    <div
      ref={magnetRef}
      className={`magnet-wrapper ${wrapperClassName}`.trim()}
      onPointerLeave={handlePointerLeave}
      {...props}
    >
      <div
        ref={innerRef}
        className={`magnet-inner ${innerClassName}`.trim()}
        style={{ willChange: 'transform' }}
      >
        {children}
      </div>
    </div>
  );
};

export default Magnet;

