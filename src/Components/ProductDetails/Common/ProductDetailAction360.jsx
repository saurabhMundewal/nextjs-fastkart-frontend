import React, { useContext, useState, useEffect } from "react";
import SettingContext from "@/Helper/SettingContext";
import { Input, InputGroup } from "reactstrap";
import Btn from "@/Elements/Buttons/Btn";
import CartContext from "@/Helper/CartContext";
import { RiAddLine, RiSubtractLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
import AddToWishlist from "@/Components/Common/ProductBox/AddToWishlist";
import AddToCompare from "@/Components/Common/ProductBox/AddToCompare";
import OfferTimer from "@/Components/ProductDetails/Common/OfferTimer"; // Import the OfferTimer component

const ProductDetailAction360 = ({
  productState,
  setProductState,
  ProductData,
  extraOption,
}) => {
  const { handleIncDec, isLoading } = useContext(CartContext);
  const { convertCurrency } = useContext(SettingContext);
  const [selectedImage, setSelectedImage] = useState(null); // Initialize selectedImage state
  const [allVariationImage, setAllVariationImage] = useState(null); // Initialize selectedImage state
  const router = useRouter();


  const groupedValues = () => {
    const groupedVariations = ProductData[0]?.variations.reduce((acc, item) => {
      const firstAttributeValue = item.attribute_values[0];
      const { slug } = firstAttributeValue;
    
      if (!acc[slug]) {
        acc[slug] = [];
      }
    
      acc[slug].push(item);
      return acc;
    }, {});
  
    // Set the state outside the reduce function
    setAllVariationImage(groupedVariations);
  };


  // Automatically select the first product variation when component mounts
  useEffect(() => {
    if (ProductData[0]?.variations.length > 0) {
      setSelectedImage(ProductData[0]?.variations[0]);
      groupedValues()
    }
  }, [ProductData]);

  const buyNow = () => {
    handleIncDec(
      productState?.productQty,
      productState?.product,
      false,
      false,
      false,
      productState
    );
    router.push(`/checkout`);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const updateQty = (qty) => {
    if (1 > productState?.productQty + qty) return;
    setProductState((prev) => {
      return { ...prev, productQty: productState?.productQty + qty };
    });
    checkStockAvailable();
  };

  const checkStockAvailable = () => {
    const selected = productState?.selectedVariation || productState?.product;
    const stockQuantity = selected?.quantity || 0;
    const isOutOfStock = stockQuantity < productState?.productQty;
    selected.stock_status = isOutOfStock ? "out_of_stock" : "in_stock";
    setProductState((prevState) => ({
      ...prevState,
      selectedVariation: productState?.selectedVariation
        ? { ...selected }
        : null,
      product: productState?.selectedVariation
        ? { ...prevState.product }
        : { ...selected },
    }));
  };

 


// const length = Object.keys(groupedValues).length;
// console.log("Length of the object:", length);

// // Getting the values of the object
// Object.keys(groupedValues).forEach(key => {
//   const value = groupedValues[key];
//   console.log("Values for", key, ":", value);
// });

// console.log(groupedValues?.length, "????????????");


  return (
    <>
      <div className="row justify-content-center">
        <div className="col-md-12 text-center mt-1">
         {productState?.product?.sale_starts_at ? <OfferTimer productState={productState} />: (null)}
          {/* Render the OfferTimer component */}
        </div>
      </div>

      <div className="note-box product-package">
        {selectedImage && (
          <div className="row mt-1 text-align-center">
            <div className="col">
              <h3 className="name">{selectedImage?.sku?.replace(/\(COPY\)/g, "").trim()}</h3>
              <div className="price-rating">
                <h3 className="theme-color price">
                  {`Price : ${
                    selectedImage?.sale_price &&
                    convertCurrency(selectedImage?.sale_price)
                  }`}
                  {selectedImage?.discount || selectedImage?.discount ? (
                    <del className="text-content">
                      {convertCurrency(selectedImage?.price)}
                    </del>
                  ) : null}
                </h3>
              </div>
            </div>
          </div>
        )}
        <div className="container mt-4">
          <div className="row justify-content-center mt-2">
            {allVariationImage &&
                  Object.keys(allVariationImage).map(key => {
                    const value = allVariationImage[key];
                    return (
                      <div
                        key={key}
                        className="col-md-2 col-xs-3 col-3 mb-2 cursor"
                        onClick={() => handleImageClick(value[0])}
                      >
                        <span className={value[0].id === selectedImage?.id ? "activeClass" : ""}>
                          <img
                            src={value[0]?.variation_image?.original_url}
                            alt={`Image ${value[0]?.id}`}
                            className="img-fluid image-border"
                          />
                        </span>
                      </div>
                    );
                  })
                }          
          </div>
        </div>
      </div>

      <div className="text-center mt-2">
        <center>
          <div className="dynamic-checkout">
            <Btn
              className="bg-theme btn-md scroll-button btn btn-secondary"
              onClick={buyNow}
              disabled={isLoading}
            >
              Buy Now
            </Btn>
          </div>
        </center>
      </div>
    </>
  );
};

export default ProductDetailAction360;
