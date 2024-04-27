import React, { useContext, useState } from "react";
import SettingContext from '@/Helper/SettingContext';
import { Input, InputGroup } from "reactstrap";
import Btn from "@/Elements/Buttons/Btn";
import CartContext from "@/Helper/CartContext";
import { RiAddLine, RiSubtractLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
import AddToWishlist from "@/Components/Common/ProductBox/AddToWishlist";
import AddToCompare from "@/Components/Common/ProductBox/AddToCompare";
import AddToCartButton from "./AddToCartButton";

const ProductDetailAction360 = ({
  productState,
  setProductState,
  ProductData,
  extraOption,
}) => {
  const { handleIncDec, isLoading } = useContext(CartContext);
  const { convertCurrency } = useContext(SettingContext);
  const [selectedImage, setSelectedImage] = useState(ProductData[0]?.variations[0]);
  const router = useRouter();

  const addToCart = () => {
    handleIncDec(
      productState?.productQty,
      productState?.product,
      false,
      false,
      false,
      productState
    );
  };

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

  const handleImageClick = (imageId) => {
    setSelectedImage(ProductData[0]?.variations?.find(image => image.id === imageId));
  };

  const updateQty = (qty) => {
    if (1 > productState?.productQty + qty) return;
    setProductState((prev) => {
      return { ...prev, productQty: productState?.productQty + qty };
    });
    checkStockAvailable();
  };
  const checkStockAvailable = () => {
    if (productState?.selectedVariation) {
      setProductState((prevState) => {
        const tempSelectedVariation = { ...prevState.selectedVariation };
        tempSelectedVariation.stock_status =
          tempSelectedVariation.quantity < prevState.productQty
            ? "out_of_stock"
            : "in_stock";
        return {
          ...prevState,
          selectedVariation: tempSelectedVariation,
        };
      });
    } else {
      setProductState((prevState) => {
        const tempProduct = { ...prevState.product };
        tempProduct.stock_status =
          tempProduct.quantity < prevState.productQty
            ? "out_of_stock"
            : "in_stock";
        return {
          ...prevState,
          product: tempProduct,
        };
      });
    }
  };
  return (
    <>
      <div className="note-box product-package">
      {selectedImage && (
        <div className="row mt-1 text-align-center">
          <div className="col">
          <h3 className='name'>{selectedImage?.sku}</h3>
      <div className='price-rating'>
        <h3 className='theme-color price'>
          {`Price : ${selectedImage?.sale_price && convertCurrency(selectedImage?.sale_price)}`}
          {
            selectedImage?.discount || selectedImage?.discount ? (
              <del className='text-content'>{convertCurrency(selectedImage?.price)}</del>
            ) :null 
          }
            </h3>
      </div>

          </div>
        </div>
      )}
      <div className="container mt-4">
      <div className="row">
       {ProductData[0]?.variations?.map(image => (
          <div className="col-md-2 mb-2 cursor" key={image?.id} onClick={() => handleImageClick(image?.id)}>
            <span className={image?.id ===selectedImage?.id && 'activeClass'}>
            <img src={image?.variation_image?.original_url} alt={`Image ${image?.id}`} className="img-fluid image-border" />
            </span>
          </div>
        ))}
        </div>
           
        </div>
        {extraOption !== false ? (
          <div className="wishlist-btn-group">
            <AddToWishlist
              productObj={productState?.product}
              customClass={"wishlist-button btn"}
            />
            <AddToCompare
              productObj={productState?.product}
              customClass={"wishlist-button btn"}
            />
          </div>
        ) : null}
      </div>
      <AddToCartButton
        productState={productState}
        isLoading={isLoading}
        addToCart={addToCart}
        buyNow={buyNow}
        extraOption={true}
      />
    </>
  );
};

export default ProductDetailAction360;
