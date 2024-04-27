"use client";
import { useContext, useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import { useQuery } from "@tanstack/react-query";
import { HomePageAPI } from "@/Utils/AxiosUtils/API";
import request from "@/Utils/AxiosUtils";
import { categorySliderOption7, productSliderOptions5 } from "../../../../Data/SliderSettingsData";
import StickyCart from "@/Layout/StickyCart";
import ThemeOptionContext from "@/Helper/ThemeOptionsContext";
import ProductIdsContext from "@/Helper/ProductIdsContext";
import { LeafSVG } from "@/Components/Common/CommonSVG";
import WrapperComponent from "@/Components/Common/WrapperComponent";
import CustomHeading from "@/Components/Common/CustomHeading";
import BerlinBanner from "@/Components/Themes/Common/HomeBanner/BerlinBanner";
import ProductData from "@/Components/Themes/Common/ProductData";
import BrandData from "@/Components/Themes/Common/BrandData";
import ImageLink from "@/Components/Themes/Common/ImageLink";
import NewsLetter from "@/Components/Themes/Common/Newsletter";
import TopSeller from "@/Components/Themes/Common/TopSeller";
import ServiceBanner from "@/Components/Themes/Common/ServiceBanner";
import CategoryStyle from "@/Components/Themes/Common/CategoryData/CategoryStyle";
import { useSearchParams } from "next/navigation";
import Loader from "@/Layout/Loader";
import BlogContext from '@/Helper/BlogContext';
import BrandContext from '@/Helper/BrandContext';
import SellerContext from '@/Helper/SellerContext';

const BerlinTheme = () => {
  const [sliderOptions, setSliderOptions] = useState(productSliderOptions5);
  const { themeOption } = useContext(ThemeOptionContext);
  const path = useSearchParams()
  const theme = path.get('theme')
  const { setGetProductIds, isLoading: productLoader, filteredProduct, } = useContext(ProductIdsContext);
  const { blogContextLoader } = useContext(BlogContext);
  const { brandContextLoader } = useContext(BrandContext);
  const {  isLoading:sellerContextLoader } = useContext(SellerContext);  
  const { data, isLoading, refetch } = useQuery(["berlin"], () => request({ url: HomePageAPI, params: { slug: "berlin" } }), {
    enabled: false,
    refetchOnWindowFocus: false,
    select: (res) => res?.data,
  }
  );
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
    if (theme == 'berlin' == false && themeOption?.product?.product_box_variant == 'digital') {
      if (sliderOptions && sliderOptions?.slidesToShow) {
        setSliderOptions({
          ...sliderOptions,
          slidesToShow: 3, // Update for digital products
        });

      }
    } else {
      if (sliderOptions && sliderOptions?.slidesToShow) {
        setSliderOptions({
          ...sliderOptions,
          slidesToShow: 5, // Update for digital products
        });
      }

    }

  }, [themeOption?.product?.product_box_variant,theme]);

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
    <>
      {/* Home Banner Section*/}
        <BerlinBanner dataAPI={data?.content?.home_banner} />

      {/* Service Banner Section*/}
      {data?.content?.services_banner?.status &&
        <ServiceBanner serviceData={data?.content.services_banner.services} />
      }

      {/* Left Section*/}
      {data?.content?.main_content?.status &&
        <WrapperComponent
          classes={{ sectionClass: "product-section", row: "g-sm-4 g-3" }}
          customCol={true}
        >
          <Col xxl={data?.content?.main_content?.section1_products?.status ? 9 : 12} xl={data?.content?.main_content?.section1_products?.status ? 8 : 12} >
            {/* Horizontal Product Section*/}
            {data?.content?.main_content.section1_products.status && (
              <>
                <CustomHeading
                  title={data?.content?.main_content?.section1_products?.title}
                  svgUrl={<LeafSVG className="icon-width" />}
                  subTitle={
                    data?.content?.main_content?.section1_products.description
                  }
                  noCustomClass={true}
                />
                <ProductData
                  style="horizontal"
                  slider={true}
                  customSliderOption={sliderOptions}
                  products={filteredProduct}
                  dataAPI={data?.content?.main_content?.section1_products}
                  classObj={{
                    productStyle: "product-classic",
                    productBoxClass: "product-box-bg",
                  }}
                  noCustomClass={true}

                />
              </>
            )}

            {/* Horizontal Category Section*/}
            {data?.content?.main_content?.section2_categories_icon_list
              ?.status && (
                <>
                  <CustomHeading title={data?.content?.main_content?.section2_categories_icon_list?.title} svgUrl={<LeafSVG className='icon-width' />} subTitle={data?.content?.main_content?.section2_categories_icon_list?.description} noCustomClass={true} />
                  <CategoryStyle theme="'paris'" style="'horizontal'" categoryIds={data?.content?.main_content?.section2_categories_icon_list?.category_ids} classes={{ sliderOption: categorySliderOption7 }} />
                </>

              )}

            {/* Two Banner Section*/}
            {data?.content?.main_content?.section3_two_column_banners?.status && (
              <div className="section-t-space section-b-space">
                <Row className="g-md-4 g-3 ratio_30">
                  <Col md={6}>
                    <ImageLink
                      classes={{
                        customHoverClass: "banner-contain hover-effect b-left",
                      }}
                      imgUrl={
                        data?.content?.main_content?.section3_two_column_banners
                          ?.banner_1?.image_url
                      }
                      ratioImage={false}
                      link={
                        data?.content?.main_content?.section3_two_column_banners
                          ?.banner_1
                      }
                      height={156}
                      width={579}
                    />
                  </Col>
                  <Col md={6}>
                    <ImageLink
                      classes={{
                        customHoverClass: "banner-contain hover-effect b-left",
                      }}
                      imgUrl={
                        data?.content?.main_content?.section3_two_column_banners
                          ?.banner_2?.image_url
                      }
                      ratioImage={false}
                      link={
                        data?.content?.main_content?.section3_two_column_banners
                          ?.banner_2
                      }
                      height={156}
                      width={579}
                    />
                  </Col>
                </Row>
              </div>
            )}

            {/* Horizontal Product Section*/}
            {data?.content?.main_content.section4_products.status && (
              <>
                <CustomHeading
                  title={data?.content?.main_content?.section4_products?.title}
                  svgUrl={<LeafSVG className="icon-width" />}
                  subTitle={
                    data?.content?.main_content?.section4_products.description
                  }
                  noCustomClass={true}
                />
                <ProductData
                  style="horizontal"
                  slider={true}
                  products={filteredProduct}
                  customSliderOption={sliderOptions}
                  dataAPI={data?.content?.main_content?.section4_products}
                  classObj={{
                    productStyle: "product-classic",
                    productBoxClass: "product-box-bg",
                  }}
                  noCustomClass={true}
                />
              </>
            )}

            {/* Seller Section*/}
            {data?.content?.main_content?.seller?.status && (
              <>
                <CustomHeading
                  title={data?.content?.main_content?.seller?.title}
                  svgUrl={<LeafSVG className="icon-width" />}
                  subTitle={data?.content?.main_content?.seller?.description}
                  noCustomClass={true}
                />
                  <TopSeller
                    dataAPI={data?.content?.main_content?.seller.store_ids}
                    paddingClass="p-0"
                  />
              </>
            )}
          </Col>

          {/* Vertical Banner Section*/}
          {data?.content?.main_content?.sidebar?.status && (
            <Col xxl={3} xl={4} className="d-none d-xl-block">
              <div className="p-sticky">
                {data?.content?.main_content?.sidebar?.categories_icon_list
                  ?.status && <CategoryStyle style="'vertical'" categoryIds={data?.content?.main_content?.sidebar?.categories_icon_list?.category_ids} classes={{ sliderClass: "feature-panel-slider" }}></CategoryStyle>}

                {data?.content?.main_content?.sidebar?.right_side_banners
                  ?.status && (
                    <ImageLink
                      classes={{
                        customClass: "ratio_156 section-t-space",
                        customHoverClass: "home-contain hover-effect",
                      }}
                      imgUrl={
                        data?.content?.main_content?.sidebar?.right_side_banners
                          ?.banner_1?.image_url
                      }
                      ratioImage={true}
                      link={
                        data?.content?.main_content?.sidebar?.right_side_banners
                          ?.banner_1
                      }
                      height={245}
                      width={378}
                    />
                  )}

                {/* Vertical Product Section*/}
                {data?.content?.main_content?.section1_products?.status && (
                  <div className="section-t-space">
                    <div className="category-menu">
                      <h3>
                        {
                          data?.content?.main_content?.sidebar?.sidebar_products
                            ?.title
                        }
                      </h3>
                      <ProductData
                        style="vertical"
                        products={filteredProduct}
                        dataAPI={
                          data?.content?.main_content?.sidebar?.sidebar_products
                        }
                      />
                    </div>
                  </div>
                )}
              </div>
            </Col>
          )}
        </WrapperComponent>
      }

      {/* Full Width Banner Section*/}
      {data?.content?.full_width_banner &&
        <WrapperComponent>
          <ImageLink
            classes={{ customHoverClass: "banner-contain hover-effect b-left" }}
            imgUrl={data?.content?.full_width_banner?.image_url}
            ratioImage={false}
            link={
              data?.content?.full_width_banner
            }
            height={343}
            width={1524}
          />
        </WrapperComponent>

      }

      {/* Classic Product Section*/}
      {data?.content?.product_list_1?.status && (
        <WrapperComponent>
          <CustomHeading
            title={data?.content?.product_list_1?.title}
            svgUrl={<LeafSVG className="icon-width" />}
            subTitle={data?.content?.product_list_1?.description}
            noCustomClass={true}
          />
          <ProductData
            style="classic"
            slider={true}
            customSliderOption={sliderOptions}
            products={filteredProduct}
            dataAPI={data?.content?.product_list_1}
            classObj={{ productStyle: "product-modern", productBoxClass: "" }}
            spaceClass={false}
          />
        </WrapperComponent>
      )}

      {/* Brand  Section*/}
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

      {/* News Letter  Section*/}
      {data?.content?.news_letter?.status && (
        <NewsLetter dataAPI={data?.content?.news_letter} />
      )}

      {/* Sticky Cart  Section*/}
      {themeOption?.general?.sticky_cart_enable &&
        themeOption?.general?.cart_style !== "cart_sidebar" && <StickyCart />}
    </>
  );
};

export default BerlinTheme;
