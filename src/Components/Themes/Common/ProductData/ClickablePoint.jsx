import React from 'react';

const ClickablePoint = ({ point, onPointClick }) => {
  const handleClick = () => {
    onPointClick(point);
  };

  return (
    <div
      className="clickable-point"
      style={{ left: point.x, top: point.y }}
      onClick={handleClick}
    ></div>
  );
};

export default ClickablePoint;
