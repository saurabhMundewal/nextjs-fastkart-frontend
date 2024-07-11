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
  const [selectedImage, setSelectedImage] = useState(null);
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
      <div className="best-selling-slider product-wrapper  pt-4 mt-4 ">
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
                <div className="p-3  bg-white mt-2">
                  <ReactImageTurntable
                    images={selectedImage ? [selectedImage.variation_image.original_url] : uniqueImagesArray}
                    autoRotate={{ disabled: rotationDisabled, interval: 800 }}
                    onPointerDown={() => setRotationDisabled(true)}
                    onPointerUp={() => setRotationDisabled(true)}
                    onKeyDown={handleKeyDown}
                    onKeyUp={() => setRotationDisabled(true)}
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="p-3  text-section">
                  <div className="title-360">
                    {/* {ProductData[0]?.name?.substring(0, 16)} */}
                    {ProductData[0]?.name}
                  </div>
                  <ProductDetailAction360
                    productState={productState}
                    setProductState={setProductState}
                    ProductData={ProductData}
                    selectedImage={selectedImage}
                    extraOption={false}
                    setSelectedImage={setSelectedImage}
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
