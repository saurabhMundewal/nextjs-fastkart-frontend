"use client";
import { useContext, useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import { useQuery } from "@tanstack/react-query";
import request from "@/Utils/AxiosUtils";
import { HomePageAPI } from "@/Utils/AxiosUtils/API";
import StickyCart from "@/Layout/StickyCart";
import ThemeOptionContext from "@/Helper/ThemeOptionsContext";
import ProductIdsContext from "@/Helper/ProductIdsContext";
import { categorySliderOption8,madridFullSlider, madridFeatureBlog} from "../../../../Data/SliderSettingsData";
import WrapperComponent from "@/Components/Common/WrapperComponent";
import MadridBanner from "@/Components/Themes/Common/HomeBanner/MadridBanner";
import SliderBanner from "@/Components/Themes/Common/SliderBanner";
import CustomHeading from "@/Components/Common/CustomHeading";
import ProductData from "@/Components/Themes/Common/ProductData";
import BrandData from "@/Components/Themes/Common/BrandData";
import TopSeller from "@/Components/Themes/Common/TopSeller";
import BannerData from "@/Components/Themes/Common/BannerData";
import BlogData from "@/Components/Themes/Common/BlogData";
import NoDataFound from "@/Components/Common/NoDataFound";
import ImageLink from "@/Components/Themes/Common/ImageLink";
import CategoryStyle from "@/Components/Themes/Common/CategoryData/CategoryStyle";
import BankOfferData from "@/Components/Themes/Common/BankOfferData";
import SpecialOffer from "./Common/SpecialOffer";
import { useSearchParams } from "next/navigation";
import Loader from "@/Layout/Loader";
import BlogContext from '@/Helper/BlogContext';
import BrandContext from '@/Helper/BrandContext';
import SellerContext from '@/Helper/SellerContext';


const MadridTheme = () => {
  const [sliderOptions, setSliderOptions] = useState(madridFullSlider);
  const [enableDeal, setEnableDeal] = useState(true)
  const { themeOption } = useContext(ThemeOptionContext);
  const { setGetProductIds, isLoading: productLoader, filteredProduct, } = useContext(ProductIdsContext);
  const { blogContextLoader } = useContext(BlogContext);
  const { brandContextLoader } = useContext(BrandContext);
  const {  isLoading:sellerContextLoader } = useContext(SellerContext);  
  const path = useSearchParams()
  const theme = path.get('theme')
  let grid= 4

  const { data, isLoading, refetch } = useQuery(["madrid"], () => request({ url: HomePageAPI, params: { slug: "madrid" } }), { enabled: false, refetchOnWindowFocus: false, select: (res) => res?.data });
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
    if (theme == 'madrid' == false  && themeOption?.product?.product_box_variant == 'digital') {
      if (sliderOptions && sliderOptions?.slidesToShow) {
        setSliderOptions({
          ...sliderOptions,
          slidesToShow: 4, // Update for digital products
        });

      }
    } else {
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
    <>
      {/* Home Banner Section*/}      
        <MadridBanner dataAPI={data?.content?.home_banner?.main_banner} />

      {/* Solder Banner Section*/}
      {data?.content?.featured_banners?.status &&
        data?.content?.featured_banners?.banners?.length > 0 && (
          <SliderBanner bannersData={data?.content?.featured_banners?.banners} />
        )}

      {/* Horizontal Category Section*/}
      {data?.content?.categories_image_list?.status && (
        <WrapperComponent classes={{ sectionClass: "category-section-3" }}>
          <CustomHeading title={data?.content?.categories_image_list?.title} subTitle={data?.content?.categories_image_list?.description} />
          <CategoryStyle theme="'madrid'" style="'horizontal'" categoryIds={data?.content?.categories_image_list?.category_ids} classes={{ sliderOption: categorySliderOption8 }} />
        </WrapperComponent>

      )}

      {/* Horizontal Product Section*/}
      {data?.content?.products_list_1?.status && (
        <WrapperComponent classes={{ sectionClass: "product-section-3" }}>
          <CustomHeading title={data?.content?.products_list_1?.title} subTitle={data?.content?.products_list_1?.description} noCustomClass={true} />
          <ProductData
            style="horizontal" slider={true} customSliderOption={sliderOptions} products={filteredProduct} dataAPI={data?.content?.products_list_1}
            classObj={{ productStyle: "product-standard ", productBoxClass: "product-box-bg", }} spaceClass={false}/>
        </WrapperComponent>
      )}

      {/* Bank Offer Section*/}
      {data?.content?.bank_wallet_offers?.status && <BankOfferData dataAPI={data?.content?.bank_wallet_offers} />}

      {/* Top Selling Section*/}
      {data?.content?.product_with_deals?.status && data?.content?.product_with_deals?.deal_of_days?.deals?.length &&
        <WrapperComponent classes={{ sectionClass: 'product-section product-section-3' }} noRowCol={true}>
          <CustomHeading title={data?.content?.product_with_deals.title} />
          <Row className='g-sm-4 g-3'>
            {data?.content?.product_with_deals?.deal_of_days?.status && enableDeal && (
              <Col xxl={4} lg={5} className='order-lg-2 d-xxl-block d-none'>
                <SpecialOffer dataAPI={data?.content?.product_with_deals} ProductData={filteredProduct} />
              </Col>)}

            <Col
              xxl={data?.content?.product_with_deals?.deal_of_days?.status && enableDeal ? 8 : 12}
              lg={data?.content?.product_with_deals?.deal_of_days?.status && enableDeal ? 8 : 12}
              className='col-xxl-8 col-lg-12 order-lg-1'>
                <ProductData style="horizontal"  slider={false}  products={filteredProduct?.map(product => product).slice(0, grid * 2)} dataAPI={data?.content.product_with_deals.products_list}
                  classObj={{
                    productStyle: "product-standard theme-plus",
                    productBoxClass: "product-box-bg",
                  }}
                  showItem={4}
                  spaceClass={false}
                />
            </Col>
          </Row>
        </WrapperComponent>
      }

      {/* Seller Section*/}
      {data?.content?.seller?.status && (
        <WrapperComponent>
          <CustomHeading title={data?.content?.seller?.title} subTitle={data?.content?.seller?.description} noCustomClass={true} />
          <div>
            <TopSeller dataAPI={data?.content?.seller.store_ids} />
          </div>
        </WrapperComponent>
      )}

      {/* Full Width Banner Section*/}
      {data?.content?.full_width_banner?.status && (
        <WrapperComponent classes={{ fluidClass: "sale-banner" }}>
          <BannerData bannersData={data?.content?.full_width_banner} style="'full_width'" height={136} width={1585} />
        </WrapperComponent>
      )}

      {/* Horizontal Product Section*/}
      {data?.content?.products_list_2?.status && (
        <WrapperComponent classes={{ sectionClass: "product-section-3" }}>
          <CustomHeading title={data?.content?.products_list_2?.title} subTitle={data?.content?.products_list_2?.description} noCustomClass={true}
          />
          <ProductData style="horizontal" slider={true} customSliderOption={sliderOptions} products={filteredProduct} dataAPI={data?.content?.products_list_2}
            classObj={{ productStyle: "product-standard theme-plus", productBoxClass: "product-box-bg", }} spaceClass={false} />
        </WrapperComponent>
      )}

      {/* Horizontal Product Section*/}
      {data?.content?.products_list_3?.status && (
        <WrapperComponent classes={{ sectionClass: "product-section-3" }}>
          <CustomHeading
            title={data?.content?.products_list_3?.title}
            subTitle={data?.content?.products_list_3?.description}
            noCustomClass={true}
          />
          <ProductData style="horizontal" slider={true} customSliderOption={sliderOptions} products={filteredProduct} dataAPI={data?.content?.products_list_3}
            classObj={{ productStyle: "product-standard theme-plus", productBoxClass: "product-box-bg" }} spaceClass={false}
          />
        </WrapperComponent>
      )}

      {/* Two Column Banner Section*/}
      <WrapperComponent classes={{ sectionClass: "banner-section" }} noRowCol={true} >
        <Row className="g-sm-4 g-3">
          <Col lg={6}>
            <ImageLink
              classes={{ customHoverClass: "banner-contain  hover-effect" }}
              imgUrl={data?.content?.two_column_banners?.banner_1?.image_url}
              ratioImage={false}
              link={data?.content?.two_column_banners?.banner_1}
              height={406}
              width={781}
            />
          </Col>
          <Col lg={6}>
            <ImageLink
              classes={{ customHoverClass: "banner-contain  hover-effect" }}
              imgUrl={data?.content?.two_column_banners?.banner_2?.image_url}
              ratioImage={false}
              link={data?.content?.two_column_banners?.banner_1}
              height={406}
              width={781}
            />
          </Col>
        </Row>
      </WrapperComponent>

      {/* Horizontal Product Section*/}
      {data?.content?.products_list_4?.status && (
        <WrapperComponent classes={{ sectionClass: "product-section-3" }}>
          <CustomHeading
            title={data?.content?.products_list_4?.title}
            subTitle={data?.content?.products_list_4?.description}
            noCustomClass={true}
          />
          <ProductData style="horizontal" slider={true} customSliderOption={sliderOptions} products={filteredProduct} dataAPI={data?.content?.products_list_4}
            classObj={{ productStyle: "product-standard theme-plus", productBoxClass: "product-box-bg" }} spaceClass={false} />
        </WrapperComponent>
      )}

      {/* Horizontal Product Section*/}
      {data?.content?.products_list_5?.status && (
        <WrapperComponent classes={{ sectionClass: "product-section-3" }}>
          <CustomHeading
            title={data?.content?.products_list_5?.title}
            subTitle={data?.content?.products_list_5?.description}
            noCustomClass={true}
          />
          <ProductData style="horizontal" slider={true} customSliderOption={sliderOptions} products={filteredProduct} dataAPI={data?.content?.products_list_5}
            classObj={{
              productStyle: "product-standard theme-plus",
              productBoxClass: "product-box-bg",
            }}
            spaceClass={false}
          />
        </WrapperComponent>
      )}

      {/* Delivery Banner Section*/}
      <WrapperComponent classes={{ sectionClass: "banner-section" }} noRowCol={true} >
        <Row className="g-sm-4 g-3">
          <Col lg={8}>
            <ImageLink imgUrl={data?.content?.delivery_banners?.banner_1?.image_url} ratioImage={false} link={data?.content?.delivery_banners?.banner_1} height={326} width={1049}
              classes={{ customHoverClass: "banner-contain h-100 hover-effect" }}
            />
          </Col>
          <Col lg={4}>
            <ImageLink imgUrl={data?.content?.delivery_banners?.banner_2?.image_url} ratioImage={false} link={data?.content?.delivery_banners?.banner_1} height={326} width={512}
              classes={{ customHoverClass: "banner-contain h-100 hover-effect" }}
            />
          </Col>
        </Row>
      </WrapperComponent>

      {/* Horizontal Product Section*/}
      {data?.content?.products_list_6?.status && (
        <WrapperComponent classes={{ sectionClass: "product-section-3" }}>
          <CustomHeading
            title={data?.content?.products_list_6?.title}
            subTitle={data?.content?.products_list_6?.description}
            noCustomClass={true}
          />
          <ProductData style="horizontal" slider={true} customSliderOption={sliderOptions} products={filteredProduct} dataAPI={data?.content?.products_list_6}
            classObj={{
              productStyle: "product-standard theme-plus",
              productBoxClass: "product-box-bg",
            }}
            spaceClass={false}
          />
        </WrapperComponent>
      )}

      {/* Horizontal Product Section*/}
      {data?.content?.products_list_7?.status && (
        <WrapperComponent classes={{ sectionClass: "product-section-3" }}>
          <CustomHeading
            title={data?.content?.products_list_7?.title}
            subTitle={data?.content?.products_list_7?.description}
            noCustomClass={true}
          />
          <ProductData style="horizontal" slider={true} customSliderOption={sliderOptions} products={filteredProduct} dataAPI={data?.content?.products_list_7}
            classObj={{
              productStyle: "product-standard theme-plus",
              productBoxClass: "product-box-bg",
            }}
            spaceClass={false}
          />
        </WrapperComponent>
      )}

      {/* Blog Section*/}
      {data?.content?.featured_blogs?.status && (
        <WrapperComponent classes={{ sectionClass: "blog-section section-b-space" }} noRowCol={true}>
          <CustomHeading title={data?.content?.featured_blogs?.title} />
          {data?.content?.featured_blogs?.blog_ids?.length > 0 ? (
            <BlogData dataAPI={data?.content?.featured_blogs}
              classes={{
                sliderClass: "slider-3-blog arrow-slider slick-height",
                sliderOption: madridFeatureBlog,
                ratioClass: "ratio_65",
              }}
            />
          ) : (
            <NoDataFound data={{ customClass: "bg-light no-data-added", title: "No Blog Found", }} />
          )}
        </WrapperComponent>
      )}

      {/* Brand Section*/}
      {data?.content?.brands?.brand_ids && data?.content?.brands?.status && (
        <div className="brand-effect ">
          <div className="container-fluid-lg">
            <BrandData dataAPI={data?.content?.brands?.brand_ids} height={113} width={70} />
          </div>
        </div>
      )}

      {/* Sticky Cart Section*/}
      {themeOption?.general?.sticky_cart_enable &&
        themeOption?.general?.cart_style !== "cart_sidebar" && <StickyCart />}
    </>
  );
};

export default MadridTheme;
