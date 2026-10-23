import React, { useState, useEffect, useRef, useCallback } from 'react';
import './DecryptedText.css';

const DEFAULT_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+0123456789';

export const DecryptedText = ({
  text = '',
  speed = 45,
  maxIterations = 12,
  sequential = true,
  revealDirection = 'start',
  characters = DEFAULT_CHARS,
  animateOn = 'both', // 'hover' | 'view' | 'both'
  className = '',
  parentClassName = '',
  encryptedClassName = 'decrypted-scramble-char'
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isHovered, setIsHovered] = useState(false);
  const [hasAnimatedView, setHasAnimatedView] = useState(false);
  const containerRef = useRef(null);
  const intervalRef = useRef(null);

  const getRandomChar = useCallback(() => {
    return characters[Math.floor(Math.random() * characters.length)];
  }, [characters]);

  const triggerAnimation = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    let iteration = 0;
    const len = text.length;

    intervalRef.current = setInterval(() => {
      setDisplayText(() => {
        let result = '';

        for (let i = 0; i < len; i++) {
          if (text[i] === ' ') {
            result += ' ';
            continue;
          }

          let shouldResolve = false;

          if (sequential) {
            let thresholdIndex = 0;
            if (revealDirection === 'start') {
              thresholdIndex = Math.floor((iteration / maxIterations) * len);
              shouldResolve = i <= thresholdIndex;
            } else if (revealDirection === 'end') {
              thresholdIndex = len - Math.floor((iteration / maxIterations) * len);
              shouldResolve = i >= thresholdIndex;
            } else {
              const mid = len / 2;
              const range = (iteration / maxIterations) * mid;
              shouldResolve = Math.abs(i - mid) <= range;
            }
          } else {
            shouldResolve = iteration >= maxIterations;
          }

          if (shouldResolve) {
            result += text[i];
          } else {
            result += getRandomChar();
          }
        }

        return result;
      });

      iteration++;

      if (iteration > maxIterations + (sequential ? len : 0)) {
        clearInterval(intervalRef.current);
        setDisplayText(text);
      }
    }, speed);
  }, [getRandomChar, maxIterations, revealDirection, sequential, speed, text]);

  // View animation trigger
  useEffect(() => {
    if (animateOn === 'hover') return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimatedView) {
          setHasAnimatedView(true);
          triggerAnimation();
        }
      },
      { threshold: 0.15 }
    );

    const el = containerRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [animateOn, hasAnimatedView, triggerAnimation]);

  const handleMouseEnter = () => {
    if (animateOn === 'hover' || animateOn === 'both') {
      setIsHovered(true);
      triggerAnimation();
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <span
      ref={containerRef}
      className={`decrypted-text-root ${parentClassName}`.trim()}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className={`decrypted-text-content ${className}`.trim()}>
        {displayText.split('').map((char, index) => {
          const isDecrypted = char === text[index];
          return (
            <span
              key={index}
              className={isDecrypted ? 'decrypted-char' : encryptedClassName}
            >
              {char}
            </span>
          );
        })}
      </span>
    </span>
  );
};

export default DecryptedText;
