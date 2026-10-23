import { useEffect } from "react";

/**
 * Hook for smooth 120fps 3D perspective rotation on the hero art with lerp damping.
 */
export function useHeroTilt() {
  useEffect(() => {
    const art = document.querySelector(".hero-art");
    if (!art) return;

    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let targetRotX = 0;
    let targetRotY = 0;
    let currentRotX = 0;
    let currentRotY = 0;
    let rafId = null;
    let isHovering = false;

    const animate = () => {
      const dx = targetRotX - currentRotX;
      const dy = targetRotY - currentRotY;

      currentRotX += dx * 0.1;
      currentRotY += dy * 0.1;

      art.style.transform = `perspective(1000px) rotateX(${currentRotX.toFixed(2)}deg) rotateY(${currentRotY.toFixed(2)}deg)`;

      if (Math.abs(dx) > 0.02 || Math.abs(dy) > 0.02 || isHovering) {
        rafId = requestAnimationFrame(animate);
      } else {
        currentRotX = targetRotX;
        currentRotY = targetRotY;
        art.style.transform = `perspective(1000px) rotateX(${currentRotX.toFixed(2)}deg) rotateY(${currentRotY.toFixed(2)}deg)`;
        rafId = null;
      }
    };

    const startAnimation = () => {
      if (!rafId) {
        rafId = requestAnimationFrame(animate);
      }
    };

    const handleMouseMove = (event) => {
      isHovering = true;
      const rect = art.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;

      targetRotY = (x - 0.5) * 16;
      targetRotX = (0.5 - y) * 12;

      startAnimation();
    };

    const resetRotation = () => {
      isHovering = false;
      targetRotX = 0;
      targetRotY = 0;
      startAnimation();
    };

    art.addEventListener("pointermove", handleMouseMove, { passive: true });
    art.addEventListener("pointerleave", resetRotation);

    return () => {
      art.removeEventListener("pointermove", handleMouseMove);
      art.removeEventListener("pointerleave", resetRotation);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);
}

