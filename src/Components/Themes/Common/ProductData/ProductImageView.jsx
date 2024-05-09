import React, { useState, useContext } from 'react';
import ClickablePoint from './ClickablePoint';
import CartContext from '@/Helper/CartContext';
import Btn from "@/Elements/Buttons/Btn";

const ProductImageView = ({ imagePath, points }) => {
  const { handleIncDec, isLoading } = useContext(CartContext);
  const [hoveredPoint, setHoveredPoint] = useState(null);

  const handlePointHover = (pointInfo) => {
    setHoveredPoint(pointInfo);
  };

  const handlePointLeave = () => {
    setHoveredPoint(null);
  };

  const buyNow = () => {
    if (hoveredPoint) {
      handleIncDec(1, hoveredPoint?.id[0], false, false, false, hoveredPoint);
    }
  };

  return (
    <div className="product-image-container">
      <img src={imagePath} alt="Product" className="product-image" />
    
      {/* {points.map((point, index) => (
        <ClickablePoint
          key={index}
          point={point}
          onPointHover={handlePointHover}
          onPointLeave={handlePointLeave}
        />
      ))} */}
      {hoveredPoint && (
        <div className="zoomed-image-container">
          <img src={hoveredPoint.zoomedImage} alt="Zoomed" className="img-fluid drs-img" />
          <div className="product-info">
            <h2>{hoveredPoint.name}</h2>
            <p>{hoveredPoint.info}</p>
            <div className='dynamic-checkout'>
            <Btn
              className="bg-theme btn-md scroll-button btn btn-secondary"
              onClick={buyNow}
              disabled={isLoading}
            >
              Buy Now
            </Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductImageView;
