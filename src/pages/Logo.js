// Logo.js
import React from 'react';
import { useSpring, animated } from 'react-spring';

const Logo = ({ onAnimationEnd }) => {
  const logoAnimation = useSpring({
    opacity: 0,         // Start with opacity 0
    transform: 'scale(1.5)', // Start with a scale of 1.5 (you can adjust this value)
    from: { opacity: 1, transform: 'scale(1)' }, // Animate to opacity 1 and scale 1
    config: { duration: 2000 },
    onRest: onAnimationEnd,
  });

  return (
    <animated.div style={logoAnimation} className="logo-container">
      {/* Your logo image goes here */}
      <img src="/static/homeimg.jpg" alt="Logo" />
    </animated.div>
  );
};

export default Logo;
