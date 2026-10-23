import { useEffect } from "react";

/**
 * Hook for smooth 120fps 3D tilt effect and cursor spotlight on project cards.
 */
export function useProjectTilt() {
  useEffect(() => {
    const cards = document.querySelectorAll(".project-card");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    if (reduceMotion || !finePointer || !cards.length) return;

    const cleanups = [];

    cards.forEach((card) => {
      let targetTiltX = 0;
      let targetTiltY = 0;
      let currentTiltX = 0;
      let currentTiltY = 0;
      let targetSpotX = 50;
      let targetSpotY = 50;
      let currentSpotX = 50;
      let currentSpotY = 50;
      let rafId = null;
      let isHovering = false;

      const animate = () => {
        const dtx = targetTiltX - currentTiltX;
        const dty = targetTiltY - currentTiltY;
        const dsx = targetSpotX - currentSpotX;
        const dsy = targetSpotY - currentSpotY;

        currentTiltX += dtx * 0.14;
        currentTiltY += dty * 0.14;
        currentSpotX += dsx * 0.14;
        currentSpotY += dsy * 0.14;

        card.style.setProperty("--tilt-x", `${currentTiltX.toFixed(2)}deg`);
        card.style.setProperty("--tilt-y", `${currentTiltY.toFixed(2)}deg`);
        card.style.setProperty("--spot-x", `${currentSpotX.toFixed(1)}%`);
        card.style.setProperty("--spot-y", `${currentSpotY.toFixed(1)}%`);

        if (
          Math.abs(dtx) > 0.02 ||
          Math.abs(dty) > 0.02 ||
          Math.abs(dsx) > 0.1 ||
          Math.abs(dsy) > 0.1 ||
          isHovering
        ) {
          rafId = requestAnimationFrame(animate);
        } else {
          currentTiltX = targetTiltX;
          currentTiltY = targetTiltY;
          currentSpotX = targetSpotX;
          currentSpotY = targetSpotY;
          card.style.setProperty("--tilt-x", `${currentTiltX.toFixed(2)}deg`);
          card.style.setProperty("--tilt-y", `${currentTiltY.toFixed(2)}deg`);
          card.style.setProperty("--spot-x", `${currentSpotX.toFixed(1)}%`);
          card.style.setProperty("--spot-y", `${currentSpotY.toFixed(1)}%`);
          rafId = null;
        }
      };

      const startAnimation = () => {
        if (!rafId) {
          rafId = requestAnimationFrame(animate);
        }
      };

      const handleMove = (event) => {
        isHovering = true;
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;

        targetTiltY = (x - 0.5) * 12;
        targetTiltX = (0.5 - y) * 10;
        targetSpotX = x * 100;
        targetSpotY = y * 100;

        startAnimation();
      };

      const reset = () => {
        isHovering = false;
        targetTiltX = 0;
        targetTiltY = 0;
        targetSpotX = 50;
        targetSpotY = 50;
        startAnimation();
      };

      card.addEventListener("pointermove", handleMove, { passive: true });
      card.addEventListener("pointerleave", reset);

      cleanups.push(() => {
        card.removeEventListener("pointermove", handleMove);
        card.removeEventListener("pointerleave", reset);
        if (rafId) cancelAnimationFrame(rafId);
      });
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);
}

