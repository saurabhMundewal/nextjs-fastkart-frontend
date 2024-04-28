import React, { useState } from 'react';

const ClickablePoint = ({ point, onPointHover }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleMouseEnter = () => {
    onPointHover(point);
  };

  const handleMouseLeave = () => {
    if (!isClicked) {
      onPointHover(null); // Reset hover state only if not clicked
    }
  };

  const handleClick = () => {
    setIsClicked(true); // Set the clicked state to true when point is clicked
    // Additional logic or action on click can be added here
  };

  return (
    <div
      className="clickable-point"
      style={{ left: point.x, top: point.y }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    ></div>
  );
};

export default ClickablePoint;
