import React, { useEffect, useRef, useState } from 'react';
import './BlurText.css';

export const BlurText = ({
  text = '',
  delay = 70,
  animateBy = 'words', // 'words' | 'letters'
  direction = 'top',   // 'top' | 'bottom'
  threshold = 0.1,
  rootMargin = '0px',
  className = '',
  style = {}
}) => {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      { threshold, rootMargin }
    );

    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [threshold, rootMargin]);

  const elements = animateBy === 'words' ? text.split(' ') : text.split('');

  return (
    <span ref={ref} className={`blur-text-root ${className}`.trim()} style={style}>
      {elements.map((segment, index) => {
        const offset = direction === 'top' ? -18 : 18;
        return (
          <span
            key={index}
            className={`blur-text-element ${inView ? 'is-visible' : ''}`}
            style={{
              transitionDelay: `${index * delay}ms`,
              '--offset-y': `${offset}px`
            }}
          >
            {segment}
            {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
          </span>
        );
      })}
    </span>
  );
};

export default BlurText;
