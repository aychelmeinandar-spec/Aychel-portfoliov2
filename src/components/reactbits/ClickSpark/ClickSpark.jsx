import React, { useRef, useEffect, useCallback } from 'react';
import './ClickSpark.css';

export const ClickSpark = ({
  sparkColor = '#b58b6a',
  sparkColors = ['#e9e0d4', '#b58b6a', '#ffffff', '#ffd700', '#d0b69a'],
  sparkSize = 10,
  sparkRadius = 20,
  sparkCount = 8,
  duration = 420,
  extraScale = 1.0
}) => {
  const canvasRef = useRef(null);
  const sparksRef = useRef([]);
  const animFrameIdRef = useRef(null);

  const easeOutQuad = (t) => t * (2 - t);

  const draw = useCallback((now) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    sparksRef.current = sparksRef.current.filter((spark) => {
      const elapsed = now - spark.startTime;
      if (elapsed >= duration) return false;

      const progress = elapsed / duration;
      const eased = easeOutQuad(progress);

      const distance = spark.maxDistance * eased * extraScale;
      const lineLen = sparkSize * (1 - progress);

      const x1 = spark.x + Math.cos(spark.angle) * distance;
      const y1 = spark.y + Math.sin(spark.angle) * distance;
      const x2 = spark.x + Math.cos(spark.angle) * (distance + lineLen);
      const y2 = spark.y + Math.sin(spark.angle) * (distance + lineLen);

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = spark.color;
      ctx.lineWidth = 2 * (1 - progress * 0.7);
      ctx.lineCap = 'round';
      ctx.globalAlpha = 1 - progress;
      ctx.shadowColor = spark.color;
      ctx.shadowBlur = 5;
      ctx.stroke();
      ctx.restore();

      return true;
    });

    if (sparksRef.current.length > 0) {
      animFrameIdRef.current = requestAnimationFrame(draw);
    } else {
      animFrameIdRef.current = null;
    }
  }, [duration, extraScale, sparkSize]);

  const handlePointerDown = useCallback((e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const x = e.clientX * dpr;
    const y = e.clientY * dpr;
    const now = performance.now();

    const colors = sparkColors && sparkColors.length ? sparkColors : [sparkColor];

    for (let i = 0; i < sparkCount; i++) {
      const baseAngle = (2 * Math.PI * i) / sparkCount;
      const jitter = (Math.random() - 0.5) * 0.35;
      const angle = baseAngle + jitter;
      const maxDistance = sparkRadius * dpr * (0.8 + Math.random() * 0.45);
      const color = colors[Math.floor(Math.random() * colors.length)];

      sparksRef.current.push({
        x,
        y,
        angle,
        startTime: now,
        maxDistance,
        color
      });
    }

    if (!animFrameIdRef.current) {
      animFrameIdRef.current = requestAnimationFrame(draw);
    }
  }, [draw, sparkColor, sparkColors, sparkCount, sparkRadius]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
    };

    updateSize();

    window.addEventListener('resize', updateSize);
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });

    return () => {
      window.removeEventListener('resize', updateSize);
      window.removeEventListener('pointerdown', handlePointerDown);
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [handlePointerDown]);

  return (
    <canvas
      ref={canvasRef}
      className="click-spark-canvas"
      aria-hidden="true"
    />
  );
};

export default ClickSpark;
