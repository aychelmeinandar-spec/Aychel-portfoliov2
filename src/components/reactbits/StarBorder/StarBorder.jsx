import React from 'react';
import './StarBorder.css';

export const StarBorder = ({
  as: Component = 'button',
  className = '',
  color = '#b58b6a',
  speed = '4s',
  thickness = 1.5,
  children,
  style = {},
  ...rest
}) => {
  return (
    <Component
      className={`star-border-container ${className}`.trim()}
      style={{
        '--star-color': color,
        '--star-speed': speed,
        '--border-thickness': `${thickness}px`,
        ...style
      }}
      {...rest}
    >
      <div className="star-border-glow-1" aria-hidden="true" />
      <div className="star-border-glow-2" aria-hidden="true" />
      <div className="star-border-content">
        {children}
      </div>
    </Component>
  );
};

export default StarBorder;
