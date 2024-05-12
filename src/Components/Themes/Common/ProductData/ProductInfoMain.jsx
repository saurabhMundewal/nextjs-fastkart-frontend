import ProductImageView from "./ProductImageView";
import "./aboutProduct.scss";
import React, { useContext, useEffect, useState } from "react";

const ProductInfoMain = (dataAPI) => {
  const [firstProduct, setFirstProduct] = useState([]);
  const [secondProduct, setSecondProduct] = useState([]);

  async function getFirstProductProduct() {
    const product1Data = await fetch(
      `${process.env.API_PROD_URL}product?ids=${dataAPI?.dataAPI?.product1_id}`
    )
      .then((res) => res.json())
      .catch((err) => console.log("err", err));
    setFirstProduct(product1Data?.data);
  }

  async function getSecondProductProduct() {
    const product2Data = await fetch(
      `${process.env.API_PROD_URL}product?ids=${dataAPI?.dataAPI?.product2_id}`
    )
      .then((res) => res.json())
      .catch((err) => console.log("err", err));
    setSecondProduct(product2Data?.data);
  }

  const points = [
    {
      x: 300,
      y: 200,
      id:firstProduct,
      info: firstProduct[0]?.name,
      zoomedImage: firstProduct[0]?.product_galleries[0]?.original_url,
    },
    {
      x: 800,
      y: 200,
      id:secondProduct,
      info: secondProduct[0]?.name,
      zoomedImage: secondProduct[0]?.product_galleries[0]?.original_url,
    },
    // Add more points as needed
  ];

  useEffect(() => {
    if (dataAPI?.dataAPI?.product1_id) getFirstProductProduct();
    if (dataAPI?.dataAPI?.product2_id) getSecondProductProduct();
  }, []);
  return (
    <div>
    {/* <div className="hidden-on-mobile"> */}
      {/* <h1>Product Page</h1> */}
      <ProductImageView
        imagePath={dataAPI?.dataAPI?.main_image_url}
        points={points}
       
      />
    </div>
  );
};

export default ProductInfoMain;
