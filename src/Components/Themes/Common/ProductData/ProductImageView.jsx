import React, { useState, useContext } from 'react';
import ClickablePoint from './ClickablePoint';
import AddToCartButton from './../../../ProductDetails/Common/AddToCartButton';
import CartContext from '@/Helper/CartContext';

const ProductImageView = ({ imagePath, points}) => {
  const { handleIncDec, isLoading } = useContext(CartContext);
  const [selectedPoint, setSelectedPoint] = useState(null);

  const handlePointClick = (pointInfo) => {  
    setSelectedPoint(pointInfo);
  };

   const addToCart = () => {
    handleIncDec(1, productDetails?.product, false, false, false, productDetails);
  };

  return (
    <div className="product-image-container">
      <img src={imagePath} alt="Product" className="product-image" />
      {points.map((point, index) => (
        <ClickablePoint
          key={index}
          point={point}
          onPointClick={handlePointClick}
        />
      ))}
      {selectedPoint && (
        <div className="zoomed-image-container">
          <img src={selectedPoint.zoomedImage} alt="Zoomed" className="zoomed-image" />
          <div className="product-info">
            {/* <h2>{selectedPoint.info}</h2> */}
            <p>{selectedPoint.info}</p>
            <AddToCartButton productDetails={selectedPoint?.id} isLoading={isLoading} addToCart={addToCart} yy extraOption={true} />
    
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductImageView;
