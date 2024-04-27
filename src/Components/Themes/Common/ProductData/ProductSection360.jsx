import { useMemo, useState, useEffect } from "react";
// import { ReactImageTurntable } from "react-image-turntable";
import { ReactImageTurntable } from "react-image-turntable";
import CustomHeading from "@/Components/Common/CustomHeading";
import ProductDetailAction360 from "@/Components/ProductDetails/Common/ProductDetailAction360";

const ProductSection360 = ({
  dataAPI,
  ProductData,
  svgUrl,
  noCustomClass,
  customClass,
}) => {
  const [rotationDisabled, setRotationDisabled] = useState(false);
  const [productState, setProductState] = useState({
    product: ProductData,
    attributeValues: [],
    productQty: 1,
    selectedVariation: "",
    variantIds: [],
  });

  const images = [
    dataAPI?.image1_url,
    dataAPI?.image2_url,
    dataAPI?.image3_url,
    dataAPI?.image4_url,
    dataAPI?.image5_url,
    dataAPI?.image6_url,
    dataAPI?.image7_url,
    dataAPI?.image8_url,
  ];

  const uniqueImagesSet = new Set(images); // Use a Set to automatically remove duplicates
  const uniqueImagesArray = Array.from(uniqueImagesSet); // Convert the Set back to an array

  const handleKeyDown = (ev) => {
    if (rotationDisabled) return;

    if (ev.key === "ArrowLeft" || ev.key === "ArrowRight") {
      setRotationDisabled(true);
    }
  };
 
  useEffect(() => {
    setProductState({
      product: ProductData[0],
      attributeValues: [],
      productQty: 1,
      selectedVariation: "",
      variantIds: [],
    });
  }, [ProductData]);

  return (
    <>
      <div className="best-selling-slider product-wrapper  pt-4 mt-4">
        <CustomHeading
          title={dataAPI?.title}
          svgUrl={svgUrl}
          subTitle={dataAPI?.description}
          customClass={
            customClass
              ? customClass
              : noCustomClass
              ? ""
              : "section-t-space title"
          }
        />
        <div className="position-relative">
          <span className="border-effect"></span>

          <div className="container-fluid">
            <div className="row ">
              <div className="col-sm-6">
                <div className="p-3 border text-section">
                  <div className="title-360">
                    {ProductData[0]?.name?.substring(0, 16)}
                  </div>
                  <ProductDetailAction360
                    productState={productState}
                    setProductState={setProductState}
                    ProductData={ProductData}
                    extraOption={false}
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="p-3 border bg-light mt-2">
                  <ReactImageTurntable
                    images={uniqueImagesArray}
                    autoRotate={{ disabled: rotationDisabled, interval: 500 }}
                    onPointerDown={() => setRotationDisabled(true)}
                    onPointerUp={() => setRotationDisabled(false)}
                    onKeyDown={handleKeyDown}
                    onKeyUp={() => setRotationDisabled(false)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductSection360;
