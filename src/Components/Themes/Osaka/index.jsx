"use client";
import { useContext, useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import { useQuery } from "@tanstack/react-query";
import request from "@/Utils/AxiosUtils";
import { HomePageAPI } from "@/Utils/AxiosUtils/API";
import ThemeOptionContext from "@/Helper/ThemeOptionsContext";
import ProductIdsContext from "@/Helper/ProductIdsContext";
import {
  categorySliderOption9,
  featureBlogSliderOptions4,
  osakaProductSliderOptions6,
} from "../../../../Data/SliderSettingsData";
import { LeafSVG } from "@/Components/Common/CommonSVG";
import WrapperComponent from "@/Components/Common/WrapperComponent";
import CustomHeading from "@/Components/Common/CustomHeading";
import StickyCart from "@/Layout/StickyCart";
import OsakaBanner from "@/Components/Themes/Common/HomeBanner/OsakaBanner";
import BannerData from "@/Components/Themes/Common/BannerData";
import FourColProduct from "@/Components/Themes/Common/FourColProduct";
import NewsLetter from "@/Components/Themes/Common/Newsletter";
import BrandData from "@/Components/Themes/Common/BrandData";
import ProductData from "@/Components/Themes/Common/ProductData";
import ImageLink from "@/Components/Themes/Common/ImageLink";
import TopSeller from "@/Components/Themes/Common/TopSeller";
import DetailedBanner from "@/Components/Themes/Common/DetailedBanner";
import BlogData from "@/Components/Themes/Common/BlogData";
import CategoryStyle from "@/Components/Themes/Common/CategoryData/CategoryStyle";
import { useSearchParams } from "next/navigation";
import Loader from "@/Layout/Loader";
import BlogContext from '@/Helper/BlogContext';
import BrandContext from '@/Helper/BrandContext';
import SellerContext from '@/Helper/SellerContext';

const OsakaTheme = () => {
  const { filteredProduct  } = useContext(ProductIdsContext);
  const [sliderOptions, setSliderOptions] = useState(osakaProductSliderOptions6); 
  const { themeOption } = useContext(ThemeOptionContext);
  const { setGetProductIds, isLoading: productLoader } =useContext(ProductIdsContext);
  const { blogContextLoader } = useContext(BlogContext);
  const { brandContextLoader } = useContext(BrandContext);
  const {  isLoading:sellerContextLoader } = useContext(SellerContext);  
  const path = useSearchParams()
  const theme = path.get('theme')

  const { data, isLoading, refetch } = useQuery(["osaka"],() => request({ url: HomePageAPI, params: { slug: "osaka" } }),{ enabled: false, refetchOnWindowFocus: false, select: (res) => res?.data });
  useEffect(() => {
    isLoading && refetch();
  }, [isLoading]);

  useEffect(() => {
    if (data?.content?.products_ids?.length > 0) {
      setGetProductIds({
        ids: Array.from(new Set(data?.content?.products_ids))?.join(","),
      });
    }
  }, [isLoading]);

  useEffect(() => {
    if (theme == 'osaka' == false && themeOption?.product?.product_box_variant == 'digital') {
        if (sliderOptions && sliderOptions?.slidesToShow) {
            setSliderOptions({
                ...sliderOptions,
                slidesToShow: 4, // Update for digital products
              });
              
        }
    }else {
        if (sliderOptions && sliderOptions?.slidesToShow) {
            setSliderOptions({
                ...sliderOptions,
                slidesToShow: 6, // Update for digital products
              });
        }

    }

}, [themeOption?.product?.product_box_variant, theme]);

useEffect(()=>{
  if (!isLoading) { 
    if (productLoader || blogContextLoader || brandContextLoader || sellerContextLoader ) {
      document.body.classList.add("skeleton-body");
    }else {
      document.body.classList.remove("skeleton-body");
    }       
  }
},[isLoading ,productLoader ,blogContextLoader,brandContextLoader ,sellerContextLoader ])

if (isLoading) return <Loader />;
  return (
    <div className="bg-effect">
      {/* Home Banner Section*/}
      
        <OsakaBanner dataAPI={data?.content?.home_banner} />
      

      {/* Horizontal Category  Section*/}
      {data?.content?.categories_icon_list?.status && (
        <WrapperComponent>
          <CustomHeading
            title={data?.content?.categories_icon_list?.title}
            svgUrl={<LeafSVG className="icon-width" />}
            subTitle={data?.content?.categories_icon_list?.description}
            noCustomClass={true}/>
          <CategoryStyle theme="'paris'" style="'horizontal'" categoryIds={data?.content?.categories_icon_list?.category_ids} classes={{ sliderOption: categorySliderOption9 }} />
        </WrapperComponent>
      )}

      {/* Coupon Section*/}
      {data?.content?.coupons.status &&
        <WrapperComponent classes={{ fluidClass: "sale-banner" }}>
          <BannerData
            bannersData={data?.content?.coupons}
            style="'full_width'"
            height={138}
            width={1585}
          />
        </WrapperComponent>
      }

      {/* Product Section*/}
      {data?.content?.products_list_1.status && (
        <WrapperComponent noRowCol={true}>
          <CustomHeading title={data?.content?.products_list_1?.title} svgUrl={<LeafSVG className="icon-width" />}
            subTitle={data?.content?.main_content?.section1_products?.description} noCustomClass={true}/>
          <ProductData
            style="horizontal"
            slider={true}
            customSliderOption={sliderOptions}
            products={filteredProduct}
            dataAPI={data?.content?.products_list_1}
            classObj={{
              productStyle: "product-standard",
              productBoxClass: "product-box-bg",
            }}
            spaceClass={false}
          />
        </WrapperComponent>
      )}

      {/* Offer Banner Section*/}
      {data?.content?.offer_banner.status &&
        <WrapperComponent>
          <ImageLink classes={{ customHoverClass: "banner-contain b-left" }} imgUrl={data?.content?.offer_banner?.image_url} ratioImage={false}
            link={data?.content?.offer_banner} height={393} width={1585}/>
        </WrapperComponent>
      }

      {/* Top Seller Section*/}
      {data?.content?.seller?.status && (
        <WrapperComponent>
          <CustomHeading
            title={data?.content?.seller?.title}
            svgUrl={<LeafSVG className="icon-width" />}
            subTitle={data?.content?.seller?.description} 
          />
          <div>
            <TopSeller dataAPI={data?.content?.seller.store_ids} />
          </div>
        </WrapperComponent>
      )}

      {/* Horizontal Product Section*/}
      {data?.content?.products_list_2.status && (
        <WrapperComponent noRowCol={true}>
          <CustomHeading
            title={data?.content?.products_list_2?.title}
            svgUrl={<LeafSVG className="icon-width" />}
            subTitle={data?.content?.products_list_2?.description}
            noCustomClass={true}
          />
          <ProductData
            style="horizontal"
            slider={true}
            products={filteredProduct}
            customSliderOption={sliderOptions}
            dataAPI={data?.content?.products_list_2}
            classObj={{
              productStyle: "product-standard",
              productBoxClass: "product-box-bg",
            }}
            spaceClass={false}
          />
        </WrapperComponent>
      )}

      {/* Details Slider Banner Section*/}
      {data?.content?.product_bundles?.status && (
        <WrapperComponent noRowCol={true}>
          <DetailedBanner dataAPI={data?.content?.product_bundles?.bundles} />
        </WrapperComponent>
      )}

      {/* Four Colum Products Section*/}
      {data?.content?.slider_products?.status && (
        <WrapperComponent classes={{ sectionClass: "top-selling-section border-box" }} >
          <FourColProduct
            dataAPI={data?.content?.slider_products}
            classes={{
              boxClass: "category-menu",
              colClass: { sm: 6, xl: 4, xxl: 3 },
            }}
          />
        </WrapperComponent>
      )}

      {/* Blog Section*/}
      {data?.content?.featured_blogs?.status && (
        <WrapperComponent noRowCol={true}>
          <CustomHeading
            title={data?.content?.featured_blogs?.title}
            subTitle={data?.content?.featured_blogs?.description}
            svgUrl={<LeafSVG className="icon-width" />}
          />
          {data?.content?.featured_blogs?.blog_ids?.length > 0 ? (
            <Row>
              <Col xs={12}>
                <BlogData
                  dataAPI={data?.content?.featured_blogs}
                  classes={{
                    sliderClass: "slider-5 ratio_65",
                    sliderOption: featureBlogSliderOptions4,
                    height: 150,
                    width: 317,
                  }}
                />
              </Col>
            </Row>
          ) : (
            <NoDataFound
              data={{
                customClass: "bg-light no-data-added",
                title: "No Blog Found",
              }}
            />
          )}
        </WrapperComponent>
      )}

      {/* Brand Section*/}
      {data?.content?.brands?.brand_ids && data?.content?.brands?.status && (
        <div className="brand-effect ">
          <div className="container-fluid-lg">
            <BrandData
              dataAPI={data?.content?.brands?.brand_ids}
              height={113}
              width={70}
            />
          </div>
        </div>
      )}

      {/* NewsLetter Section*/}
      {data?.content?.news_letter?.status && (
        <NewsLetter dataAPI={data?.content?.news_letter} />
      )}

      {/* Sticky Cart Section*/}
      {themeOption?.general?.sticky_cart_enable &&
        themeOption?.general?.cart_style !== "cart_sidebar" && <StickyCart />}
    </div>
  );
};

export default OsakaTheme;
