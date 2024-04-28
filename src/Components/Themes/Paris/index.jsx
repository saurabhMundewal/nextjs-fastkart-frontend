"use client";
import React, { useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import request from "@/Utils/AxiosUtils";
import { HomePageAPI } from "@/Utils/AxiosUtils/API";
import ThemeOptionContext from "@/Helper/ThemeOptionsContext";
import ProductIdsContext from "@/Helper/ProductIdsContext";
import ParisBanner from "@/Components/Themes/Common/HomeBanner/ParisBanner";
import SliderBanner from "@/Components/Themes/Common/SliderBanner/index";
import BrandData from "@/Components/Themes/Common/BrandData/index";
import NewsLetter from "@/Components/Themes/Common/Newsletter";
import LeftSection from "./Common/LeftSection";
import RightSection from "./Common/RightSection";
import WrapperComponent from "@/Components/Common/WrapperComponent";
import StickyCart from "@/Layout/StickyCart";
import Loader from "@/Layout/Loader";
import BlogContext from "@/Helper/BlogContext";
import SellerContext from "@/Helper/SellerContext";
import BrandContext from "@/Helper/BrandContext";

const ParisTheme = () => {
  const { setGetProductIds, isLoading: productLoader } = useContext(ProductIdsContext);
  const { blogContextLoader } = useContext(BlogContext);
  const { brandContextLoader } = useContext(BrandContext);
  const { isLoading: sellerContextLoader } = useContext(SellerContext);

  const { themeOption } = useContext(ThemeOptionContext);

  const { data, isLoading, refetch } = useQuery(["paris"], () => request({ url: HomePageAPI, params: { slug: "paris" } }), { enabled: false, refetchOnWindowFocus: false, select: (res) => res?.data, });
  useEffect(() => {
    isLoading && refetch()
  }, [isLoading]);

  useEffect(() => {
    if (data?.content?.products_ids?.length > 0) {
      setGetProductIds({ ids: Array.from(new Set(data?.content?.products_ids))?.join(","), });
    }
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading) {
      if (productLoader || blogContextLoader || brandContextLoader || sellerContextLoader) {
        document.body.classList.add("skeleton-body");
      } else {
        document.body.classList.remove("skeleton-body");
      }
    }
  }, [isLoading, productLoader, blogContextLoader, brandContextLoader, sellerContextLoader])

  if (isLoading) return <Loader />;
  return (
    <div className="bg-effect">
      {/* Home Banner Section*/}
      {<ParisBanner dataAPI={data?.content} />}

      {/* Slider Banner Section*/}
      {/* {data?.content?.featured_banners?.status && (
        <SliderBanner bannersData={data?.content?.featured_banners?.banners} />
      )} */}

      <WrapperComponent classes={{ sectionClass: "product-section", row: "g-sm-4 g-3" }} customCol={true}>
        {/* Left Section*/}
        <LeftSection dataAPI={data?.content} />

        {/* Right Section*/}
        <RightSection dataAPI={data?.content} />
      </WrapperComponent>

      {/* Brand Section*/}
      {data?.content?.brands?.status && (
        data?.content?.brands?.brand_ids.length > 0 && (
          <div className="brand-effect">
            <div className="container-fluid">
              <BrandData
                dataAPI={data?.content?.brands?.brand_ids}
                height={113}
                width={70}
              />
            </div>
          </div>
        ))}

      {/*  Newsletter Section */}
      {data?.content?.news_letter?.status && (
        <NewsLetter dataAPI={data?.content?.news_letter} />
      )}

      {/*  Sticky Cart Section */}
      {themeOption?.general?.sticky_cart_enable &&
        themeOption?.general?.cart_style !== "cart_sidebar" && <StickyCart />}
    </div>
  );
};

export default ParisTheme;
