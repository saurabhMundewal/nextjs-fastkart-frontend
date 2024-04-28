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
  const router = useRouter();

  // Automatically select the first product variation when component mounts
  useEffect(() => {
    if (ProductData[0]?.variations.length > 0) {
      setSelectedImage(ProductData[0]?.variations[0]);
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

  return (
    <>
      <div className="row justify-content-center">
        <div className="col-md-12 text-center">
         {productState?.product?.sale_starts_at ? <OfferTimer productState={productState} />: (<h3>Sale is over</h3>)}
          {/* Render the OfferTimer component */}
        </div>
      </div>

      <div className="note-box product-package">
        {selectedImage && (
          <div className="row mt-1 text-align-center">
            <div className="col">
              <h3 className="name">{selectedImage?.sku}</h3>
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
            {ProductData[0]?.variations?.map((image) => (
              <div
                key={image.id}
                className="col-md-2 col-xs-3 mb-2 cursor"
                onClick={() => handleImageClick(image)}
              >
                <span
                  className={
                    image.id === selectedImage?.id ? "activeClass" : ""
                  }
                >
                  <img
                    src={image?.variation_image?.original_url}
                    alt={`Image ${image?.id}`}
                    className="img-fluid image-border"
                  />
                </span>
              </div>
            ))}
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
