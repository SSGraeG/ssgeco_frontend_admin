// Logo.js
import React, { useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import animationData from './json/plant-sprout.json';
import Lottie from 'lottie-react';

const Logo = ({ onAnimationEnd }) => {
  const logoAnimation = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { mass: 16, tension: 10, friction: 10, duration: 3000 },
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onAnimationEnd();
    }, 3000);

    // 컴포넌트가 언마운트되면 타임아웃을 클리어
    return () => {
      clearTimeout(timeoutId);
    };
  }, [onAnimationEnd]);

  return (
    <animated.div style={logoAnimation} className="logo-container">
      {/* Your logo image goes here */}
      <div style={{ width: '400px', height: '400px' }}>
            <Lottie animationData={animationData} />
            </div>
    </animated.div>
  );
};

export default Logo;