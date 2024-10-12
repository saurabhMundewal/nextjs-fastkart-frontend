import { Col, Row } from "reactstrap";
import { useContext, useEffect, useState } from "react";
import WrapperComponent from "@/Components/Common/WrapperComponent";
import ImageLink from "@/Components/Themes/Common/ImageLink";
import SkeletonWrapper from "@/Components/Common/SkeletonWrapper";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { mainBannerSlider } from "../../../../../Data/SliderSettingsData";
import ProductIdsContext from "@/Helper/ProductIdsContext";
import Link from "next/link";

const ParisBanner = ({ dataAPI }) => {
  const { filteredProduct } = useContext(ProductIdsContext);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Check the screen size on component mount
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const redirectToProduct = (productId) => {
    const product = filteredProduct.find((elem) => elem?.id == productId);
    return "product/" + product?.slug;
  };

  const redirectSlider = (redirectType, buttonClass) => {
    if (redirectType?.link_type === "external_url") {
      return (
        <Link href={redirectType?.link || "/"} target="_blank">
          <button className={`${buttonClass} bg-theme btn-md`}>Shop Now</button>
        </Link>
      );
    } else if (redirectType?.link_type === "collection") {
      return (
        <Link href={`/collections?category=${redirectType?.link}` || "/"}>
          <button className={`${buttonClass} bg-theme btn-md`}>Shop Now</button>
        </Link>
      );
    } else if (redirectType?.link_type === "product") {
      return (
        <Link href={`/${redirectToProduct(redirectType?.link)}` || "/"}>
          <button className={`${buttonClass} bg-theme btn-md`}>Shop Now</button>
        </Link>
      );
    }
  };

  const redirectSliderLink = (redirectType) => {
    if (redirectType?.link_type === "external_url") {
      return redirectType?.link || "/" ;
    } else if (redirectType?.link_type === "collection") {
      return `/collections?category=${redirectType?.link}` || "/";
    } else if (redirectType?.link_type === "product") {
      return `/${redirectToProduct(redirectType?.link)}` || "/"
    }
  };

  return (
    <>
      <SkeletonWrapper
        classes={{
          colProps: { xl: 12 },
          colClass: "ratio_65",
          divClass: "home-contain h-100 skeleton-banner-xl",
        }}
      >
        <div className="slider-container">
          <Slider {...mainBannerSlider}>
            <div className="slide">
              <Link href={redirectSliderLink(dataAPI?.home_banner?.sub_banner_1?.redirect_link)} target="_blank">
              <img
                src={
                  isMobile
                    ? dataAPI?.home_Mobile_banner?.main_banner?.image_url
                    : dataAPI?.home_banner?.main_banner?.image_url
                }
                className="slider-image"
              />
              </Link>
              {/* {!isMobile &&
                redirectSlider(
                  dataAPI?.home_banner?.main_banner?.redirect_link,
                  "slide-button-1"
                )} */}
            </div>
            <div className="slide">
            <Link href={redirectSliderLink(dataAPI?.home_banner?.sub_banner_1?.redirect_link)} target="_blank">
              <img
                src={
                  isMobile
                    ? dataAPI?.home_Mobile_banner?.sub_banner_1?.image_url
                    : dataAPI?.home_banner?.sub_banner_1?.image_url
                }
                className="slider-image"
              />
              {/* {!isMobile &&
                redirectSlider(
                  dataAPI?.home_banner?.sub_banner_1?.redirect_link,
                  "slide-button-2"
                )} */}
                </Link>
            </div>
            <div className="slide">
            <Link href={redirectSliderLink(dataAPI?.home_banner?.sub_banner_1?.redirect_link)} target="_blank">
                         <img
                src={
                  isMobile
                    ? dataAPI?.home_Mobile_banner?.sub_banner_2?.image_url
                    : dataAPI?.home_banner?.sub_banner_2?.image_url
                }
                className="slider-image"
              />
              </Link>
              {/* {!isMobile &&
                redirectSlider(
                  dataAPI?.home_banner?.sub_banner_2?.redirect_link,
                  "slide-button-3"
                )} */}
            </div>

            <div className="slide">
              <img
                src={
                  isMobile
                    ? dataAPI?.home_Mobile_banner?.sub_banner_1?.image_url
                    : "https://apis.vector-x.com/storage/20251/sliderImage.jpg"
                }
                className="slider-image"
              />
              {/* <Link href={'/about-us'}>
          <button className="bg-theme btn-md slide-button-4">Read More</button> 
        </Link> */}
            </div>
          </Slider>
        </div>
      </SkeletonWrapper>
    </>
  );
};

export default ParisBanner;
