"use client";
import { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Col, Row } from "reactstrap";
import Slider from "react-slick";
import request from "@/Utils/AxiosUtils";
import { HomePageAPI } from "@/Utils/AxiosUtils/API";
import StickyCart from "@/Layout/StickyCart";
import NoDataFound from "@/Components/Common/NoDataFound";
import { productSliderOptions6, romeBlogSliderOption, bestValueSliderOption, categorySliderOption8 } from "../../../../Data/SliderSettingsData";
import ThemeOptionContext from "@/Helper/ThemeOptionsContext";
import ProductIdsContext from "@/Helper/ProductIdsContext";
import WrapperComponent from "@/Components/Common/WrapperComponent";
import CustomHeading from "@/Components/Common/CustomHeading";
import RomeBanner from "@/Components/Themes/Common/HomeBanner/RomeBanner";
import ImageLink from "@/Components/Themes/Common/ImageLink";
import TopSeller from "@/Components/Themes/Common/TopSeller";
import FourColProduct from "@/Components/Themes/Common/FourColProduct";
import ProductData from "@/Components/Themes/Common/ProductData";
import BlogData from "@/Components/Themes/Common/BlogData";
import BrandData from "@/Components/Themes/Common/BrandData";
import NewsLetter from "@/Components/Themes/Common/Newsletter";
import CategoryProductFilter from "@/Components/Themes/Common/CategoryProductFilter";
import CategoryStyle from "@/Components/Themes/Common/CategoryData/CategoryStyle";
import { useSearchParams } from "next/navigation";
import Loader from "@/Layout/Loader";
import BlogContext from '@/Helper/BlogContext';
import BrandContext from '@/Helper/BrandContext';
import SellerContext from '@/Helper/SellerContext';


const RomeTheme = () => {
  const [sliderOptions, setSliderOptions] = useState(productSliderOptions6);
  const { themeOption } = useContext(ThemeOptionContext);
  const { setGetProductIds, isLoading: productLoader, filteredProduct, } = useContext(ProductIdsContext);
  const { blogContextLoader } = useContext(BlogContext);
  const { brandContextLoader } = useContext(BrandContext);
  const {  isLoading:sellerContextLoader } = useContext(SellerContext);  
  const path = useSearchParams()
  const theme = path.get('theme')
  let  showProductBox = 6;

  const { data, isLoading, refetch } = useQuery(
    ["rome"],
    () => request({ url: HomePageAPI, params: { slug: "rome" } }),
    { enabled: false, refetchOnWindowFocus: false, select: (res) => res?.data }
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
    if (theme == 'rome' == false && themeOption?.product?.product_box_variant == 'digital') {
      if (sliderOptions && sliderOptions?.slidesToShow) {
        setSliderOptions({
          ...sliderOptions,
          slidesToShow: 4, // Update for digital products
        });
        showProductBox = 4;
      }
    } else {
      if (sliderOptions && sliderOptions?.slidesToShow) {
        setSliderOptions({
          ...sliderOptions,
          slidesToShow: 6, // Update for digital products
        });
        showProductBox = 6;
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
      
        <RomeBanner dataAPI={data?.content?.home_banner} />
      

      {/* Category Section*/}
      {data?.content?.categories_image_list?.status && (
        <WrapperComponent className="category-section-2" noRowCol={true}>
          <CustomHeading title={data?.content?.categories_image_list?.title} />
          <CategoryStyle theme="'rome'" style="'horizontal'" categoryIds={data?.content?.categories_image_list?.category_ids} classes={{ sliderOption: categorySliderOption8 }} />
        </WrapperComponent>
      )}

      {/* Best Value Deal  Section*/}
  
      {data?.content?.value_banners?.status &&
        data?.content?.value_banners?.banners?.length > 0 && (
          <WrapperComponent noRowCol={true}>
            <CustomHeading title={data?.content?.value_banners?.title} />
            <Row>
              <Col xs={12}>
                {/* <BannerData style="'horizontal'" bannersData={data?.content?.value_banners?.banners} height={406} width={781} ratioImage={true} customRatioClass="h-100 w-100"/> */}
                  <div className="no-arrow">
                    <Slider {...bestValueSliderOption}>
                      {data?.content?.value_banners?.banners?.map((elem, i) => (
                        elem.status && 
                        <div className="three-slider arrow-slider ratio_58" key={i}>
                            <ImageLink classes={{ customHoverClass: "offer-banner hover-effect" }} customRatioClass="h-100  w-100" ratioImage={true} imgUrl={elem?.image_url} link={elem} height={406} width={781} />
                        </div>
                      ))}
                    </Slider>
                  </div>
              </Col>
            </Row>
          </WrapperComponent>
        )}

      {/* Category Product Filter*/}
      {data?.content?.categories_products?.status && <CategoryProductFilter dataAPI={data?.content?.categories_products} products={filteredProduct} grid={showProductBox}  />}

      {/*Top Seller Section*/}
      {data?.content?.seller?.status && (
        <WrapperComponent>
          <CustomHeading title={data?.content?.seller?.title} subTitle={data?.content?.seller?.description} noCustomClass={true} />
          <div>
            <TopSeller dataAPI={data?.content?.seller.store_ids} />
          </div>
        </WrapperComponent>
      )}

      {/*Two Column Banner Section*/}
      {data?.content?.two_column_banners?.status && (
        <WrapperComponent
          classes={{ sectionClass: "banner-section" }}
          noRowCol={true}
        >
          <Row className="gy-xl-0 gy-3">
            <Col xl={6}>
              <ImageLink
                classes={{ customHoverClass: "banner-contain hover-effect" }}
                imgUrl={data?.content?.two_column_banners?.banner_1?.image_url}
                link={data?.content?.two_column_banners?.banner_1}
                height={406}
                width={781}
              />
            </Col>
            <Col xl={6}>
              <ImageLink
                classes={{ customHoverClass: "banner-contain hover-effect" }}
                imgUrl={data?.content?.two_column_banners?.banner_2?.image_url}
                link={data?.content?.two_column_banners?.banner_2}
                height={406}
                width={781}
              />
            </Col>
          </Row>
        </WrapperComponent>
      )}

      {/*Four Column Product Section*/}
      {data?.content?.slider_products?.status && (
        <WrapperComponent>
          <FourColProduct dataAPI={data?.content?.slider_products} classes={{ colClass: { sm: 6, xl: 4, xxl: 3 } }} />
        </WrapperComponent>
      )}

      {/*Full Width Banner Section*/}
      {data?.content?.full_width_banner?.status && (
        <WrapperComponent>
          <ImageLink classes={{ customHoverClass: "banner-contain hover-effect b-left" }} imgUrl={data?.content?.full_width_banner?.image_url} ratioImage={false}
            link={data?.content?.main_content?.full_width_banner} height={427} width={1585} />
        </WrapperComponent>
      )}

      {/*Full Width Banner Section*/}
      {data?.content?.products_list_1?.status && (
        <WrapperComponent>
          <CustomHeading title={data?.content?.products_list_1?.title} subTitle={data?.content?.products_list_1?.description} noCustomClass={true} />
          <ProductData style="horizontal" slider={true} customSliderOption={sliderOptions} products={filteredProduct} dataAPI={data?.content?.products_list_1}
            classObj={{ productStyle: "product-standard", productBoxClass: "product-box-bg" }} spaceClass={false}/>
        </WrapperComponent>
      )}

      {/*Blog Section*/}
      {data?.content?.featured_blogs?.status && 
      <WrapperComponent classes={{ sectionClass: "" }}>
        <CustomHeading title={data?.content?.featured_blogs?.title} />
        {data?.content?.featured_blogs?.blog_ids?.length > 0 ? (
          <BlogData dataAPI={data?.content?.featured_blogs}
            classes={{
              sliderClass: "slider-3 arrow-slider",
              sliderOption: romeBlogSliderOption,
              ratioClass: "ratio_65",
            }} />
        ) : (
          <NoDataFound data={{ customClass: "bg-light no-data-added", title: "No Blog Found" }} />
        )}
      </WrapperComponent>
       }

      {/*Brand Section*/}
      {data?.content?.brands?.brand_ids && data?.content?.brands?.status && (
        <div className="brand-effect section-b-space">
          <div className="container-fluid-lg">
            <BrandData
              dataAPI={data?.content?.brands?.brand_ids}
              height={113}
              width={70}
            />
          </div>
        </div>
      )}

      {/*News Letter Section*/}
      {data?.content?.news_letter?.status && <NewsLetter dataAPI={data?.content?.news_letter} style="classic" />}

      {/*Sticky Cart Section*/}
      {themeOption?.general?.sticky_cart_enable &&
        themeOption?.general?.cart_style !== "cart_sidebar" && <StickyCart />}
    </div>
  );
};

export default RomeTheme;
