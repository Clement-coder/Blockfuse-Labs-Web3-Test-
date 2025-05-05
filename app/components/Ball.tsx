
// Ball.tsx
import React from 'react';

interface BallProps {
  x: number;
  y: number;
}

const Ball: React.FC<BallProps> = ({ x, y }) => {
  return (
    <div
      className="absolute "
      style={{
        top: `${y}%`,
        left: `${x}%`,
        width: '5px',
        height: '5px',
      }}
    >
      ⚽
    </div>
  );
};

export default Ball;
