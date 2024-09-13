import React, { useContext, useEffect, useState, useMemo } from "react";
import { Row, Col } from "reactstrap";
import {
  categorySliderOption7,
  featureBlogSliderOption3,
  productSliderOptions6,
  productSliderOptions5,
} from "../../../../../../Data/SliderSettingsData";
import ProductIdsContext from "@/Helper/ProductIdsContext";
import NoDataFound from "@/Components/Common/NoDataFound";
import BannerData from "@/Components/Themes/Common/BannerData/index";
import ImageLink from "@/Components/Themes/Common/ImageLink";
import CustomHeading from "@/Components/Common/CustomHeading";
import { SportSVG } from "@/Components/Common/CommonSVG";
import BlogData from "@/Components/Themes/Common/BlogData/index";
import ProductData from "@/Components/Themes/Common/ProductData";
import ProductSection360 from "@/Components/Themes/Common/ProductData/ProductSection360";
import ProductInfoMain from "@/Components/Themes/Common/ProductData/ProductInfoMain";
import TopSeller from "@/Components/Themes/Common/TopSeller";
import CategoryStyle from "@/Components/Themes/Common/CategoryData/CategoryStyle";
import ThemeOptionContext from "@/Helper/ThemeOptionsContext";
import { useSearchParams } from "next/navigation";
import ProductBox from "@/Components/Common/ProductBox";
import HomePageYouTube from "@/Components/ProductDetails/Common/HomePageYouTube";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useMediaQuery } from "react-responsive";

const RightSection = ({ dataAPI }) => {
  const { filteredProduct } = useContext(ProductIdsContext);
  const [sliderOptions, setSliderOptions] = useState(productSliderOptions5);
  const [section13Product, setSection13Product] = useState([]);
  const { themeOption } = useContext(ThemeOptionContext);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isDesktop = useMediaQuery({ query: "(min-width: 769px)" });

  const topSellingProduct = useMemo(() => {
    return filteredProduct?.filter((el) =>
      dataAPI?.main_content?.section4_products?.product_ids?.includes(el.id)
    );
  }, [dataAPI?.main_content?.section4_products, filteredProduct]);

  const trendingProduct = useMemo(() => {
    return filteredProduct?.filter((el) =>
      dataAPI?.main_content?.section7_products?.product_ids?.includes(el.id)
    );
  }, [dataAPI?.main_content?.section4_products, filteredProduct]);

  const path = useSearchParams();
  const theme = path.get("theme");

  async function getSection13Product() {
    const product13Data = await fetch(
      `${process.env.API_PROD_URL}product?ids=${dataAPI?.main_content?.section13_360View?.product_id}`
    )
      .then((res) => res.json())
      .catch((err) => console.log("err", err));
    setSection13Product(product13Data?.data);
  }
  const sliderSetting = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1, // Adjust based on your layout needs
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    adaptiveHeight: true,
  };

  // Calling Product API when params is there
  useEffect(() => {
    if (dataAPI?.main_content?.section13_360View?.product_id)
      getSection13Product();
  }, []);

  useEffect(() => {
    if (
      (theme == "paris") == false &&
      themeOption?.product?.product_box_variant == "digital"
    ) {
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
  }, [themeOption?.product?.product_box_variant, theme]);

  return (
    <Col
      xxl={dataAPI?.main_content?.sidebar?.status ? 9 : 12}
      xl={dataAPI?.main_content?.sidebar?.status ? 8 : 12}
    >
      {/* Top Save Today Section   */}
      {dataAPI?.main_content?.section1_products?.status && (
        <>
          <CustomHeading
            title={dataAPI?.main_content?.section1_products?.title}
            svgUrl={<SportSVG className="icon-width" />}
            subTitle={dataAPI?.main_content?.section1_products?.description}
            noCustomClass={true}
          />
          <ProductData
            style="horizontal"
            slider={true}
            customSliderOption={sliderOptions}
            products={filteredProduct}
            dataAPI={dataAPI?.main_content?.section1_products}
            classObj={{ productStyle: "product-modern", productBoxClass: "" }}
          />
        </>
      )}
      {/* Categories Section   */}
      {console.log(dataAPI?.main_content?.section2_categories_list, 'dataAPI?.main_content?.section2_categories_list')}
      {dataAPI?.main_content?.section2_categories_list?.status && (
        <>
          <CustomHeading
            title={dataAPI?.main_content?.section2_categories_list?.title}
            svgUrl={<SportSVG className="icon-width" />}
            subTitle={
              dataAPI?.main_content?.section2_categories_list?.description
            }
            noCustomClass={true}
          />
          <CategoryStyle
            theme="'paris'"
            style="'horizontal'"
            categoryIds={
              dataAPI?.main_content?.section2_categories_list?.category_ids
            }
            classes={{ sliderOption: categorySliderOption7 }}
          />
        </>
      )}

      {/* Two Column Banner Section  */}
      {dataAPI?.main_content?.section3_two_column_banners?.status && (
        <div className="section-b-space section-t-space">
          <Row className="g-md-4 g-3 ratio_30">
            <Col md={6}>
              <ImageLink
                classes={{
                  customHoverClass: "banner-contain hover-effect b-left",
                }}
                imgUrl={
                  dataAPI?.main_content?.section3_two_column_banners?.banner_1
                    ?.image_url
                }
                ratioImage={false}
                link={
                  dataAPI?.main_content?.section3_two_column_banners?.banner_1
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
                  dataAPI?.main_content?.section3_two_column_banners?.banner_2
                    ?.image_url
                }
                ratioImage={false}
                link={
                  dataAPI?.main_content?.section3_two_column_banners?.banner_2
                }
                height={156}
                width={579}
              />
            </Col>
          </Row>
        </div>
      )}

      {/* Product Section   */}
      {dataAPI?.main_content?.section4_products?.status && (
        <>
          <CustomHeading
            title={dataAPI?.main_content?.section4_products?.title}
            svgUrl={<SportSVG className="icon-width" />}
            subTitle={dataAPI?.main_content?.section4_products?.description}
            noCustomClass={true}
          />
          <Row
            className={
              "g-sm-4 g-4 product-list-section row-cols-xl-5 row-cols-xxl-5"
            }
            xs={2}
            md={3}
          >
            {topSellingProduct?.slice(0, 10)?.map((product, i) => (
              <Col key={i}>
                <ProductBox
                  product={product}
                  className="boxClass"
                  style="'horizontal'"
                />
              </Col>
            ))}
          </Row>
          {/* <ProductData
            style="horizontal"
            slider={true}
            customSliderOption={sliderOptions}
            products={filteredProduct}
            dataAPI={dataAPI?.main_content?.section4_products}
            classObj={{ productStyle: "product-modern", productBoxClass: "" }}
          /> */}
        </>
      )}

      {/* Top Seller   */}
      {dataAPI?.main_content?.seller?.status && (
        <>
          {/* <CustomHeading title={dataAPI?.main_content?.seller?.title} svgUrl={<SportSVG className='icon-width' />} subTitle={dataAPI?.main_content?.seller?.description} noCustomClass={true} /> */}
          <TopSeller
            dataAPI={dataAPI?.main_content?.seller.store_ids}
            spaceClass="section-b-space"
          />
        </>
      )}

      {/* Coupons Banner Section  */}
      {dataAPI?.main_content?.section5_coupons?.status && (
        <div className="sale-banner">
          <div className="banner-contain section-b-space">
            <BannerData
              bannersData={dataAPI?.main_content?.section5_coupons}
              style="'full_width'"
              height={136}
              width={1183}
            />
          </div>
        </div>
      )}

      {/* this code is mobile menu slider and desktop slider*/}

      <div className="section-b-space" style={{ overflowX: "hidden" }}>
        <Row className="g-md-4 g-3" style={{ overflowX: "hidden" }}>
          {isDesktop && (
            <Col
              xxl={12}
              xl={12}
              md={7}
              style={{ overflowX: "hidden", overflowY: "hidden" }}
            >
              <Slider {...sliderSetting}>
                <div
                  className="slide"
                  tabIndex="-1"
                  style={{
                    width: "100%",
                    display: "inline-block",
                    overflow: "hidden",
                  }}
                >
                  <a
                    href="https://vector-x.com/product/vector-x-flexible-portable-water-bottle-with-flip-top-lid-for-travel-hiking-camping-500-ml-bottle-pack-of-1-blue-silicone"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="../assets/images/1-Water Bottle.jpg"
                      className="slider-image"
                      alt="Water Bottle"
                      style={{
                        width: "100%",
                        height: "auto",
                        display: "block",
                      }}
                    />
                  </a>
                </div>

                <div
                  className="slide"
                  tabIndex="-1"
                  style={{
                    width: "100%",
                    display: "inline-block",
                    overflow: "hidden",
                  }}
                >
                  <a
                    href="https://vector-x.com/product/trigger-3d-textured-football-shoes-for-men-white"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="../assets/images/2-TRIGGER SHOE.jpg"
                      className="slider-image"
                      alt="Trigger Shoe"
                      style={{
                        width: "100%",
                        height: "auto",
                        display: "block",
                      }}
                    />
                  </a>
                </div>

                <div
                  className="slide"
                  tabIndex="-1"
                  style={{
                    width: "100%",
                    display: "inline-block",
                    overflow: "hidden",
                  }}
                >
                  <a
                    href="https://vector-x.com/product/vector-x-stride-shoe-running-jogging-shoe-casual-gym-occasions-sports-running-shoes"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="../assets/images/3-SHOE POSTER.jpg"
                      className="slider-image"
                      alt="Stride Shoe"
                      style={{
                        width: "100%",
                        height: "auto",
                        display: "block",
                      }}
                    />
                  </a>
                </div>
              </Slider>
            </Col>
          )}

          {isMobile && (
            <Col
              xxl={12}
              xl={12}
              md={7}
              style={{ overflowX: "hidden", overflowY: "hidden" }}
            >
              <Slider {...sliderSetting}>
                <div
                  className="slide"
                  tabIndex="-1"
                  style={{
                    width: "100%",
                    display: "inline-block",
                    overflow: "hidden",
                  }}
                >
                  <a
                    href="https://vector-x.com/product/vector-x-stride-shoe-running-jogging-shoe-casual-gym-occasions-sports-running-shoes"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="../assets/images/4-SHOE POSTER.JPG"
                      className="slider-image"
                      alt="Mobile Banner 1"
                      style={{
                        width: "100%",
                        height: "auto",
                        display: "block",
                      }}
                    />
                  </a>
                </div>

                <div
                  className="slide"
                  tabIndex="-1"
                  style={{
                    width: "100%",
                    display: "inline-block",
                    overflow: "hidden",
                  }}
                >
                  <a
                    href="https://vector-x.com/product/vector-x-flexible-portable-water-bottle-with-flip-top-lid-for-travel-hiking-camping-500-ml-bottle-pack-of-1-blue-silicone"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="../assets/images/2-Water Bottle.jpg"
                      className="slider-image"
                      alt="Mobile Banner 2"
                      style={{
                        width: "100%",
                        height: "auto",
                        display: "block",
                      }}
                    />
                  </a>
                </div>

                <div
                  className="slide"
                  tabIndex="-1"
                  style={{
                    width: "100%",
                    display: "inline-block",
                    overflow: "hidden",
                  }}
                >
                  <a
                    href="https://vector-x.com/product/trigger-3d-textured-football-shoes-for-men-white"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="../assets/images/3-TRIGGER SHOE.jpg"
                      className="slider-image"
                      alt="Mobile Banner 3"
                      style={{
                        width: "100%",
                        height: "auto",
                        display: "block",
                      }}
                    />
                  </a>
                </div>
              </Slider>
            </Col>
          )}
        </Row>
      </div>

      {/* Our Best Seller Section  */}
      {dataAPI?.main_content?.section7_products?.status && (
        <>
          <div className="section-b-space">
            <CustomHeading
              title={dataAPI?.main_content?.section7_products?.title}
              svgUrl={<SportSVG className="icon-width" />}
              subTitle={dataAPI?.main_content?.section7_products?.description}
              noCustomClass={true}
            />
            <Row
              className={
                "g-sm-4 g-4 product-list-section row-cols-xl-5 row-cols-xxl-5"
              }
              xs={2}
              md={3}
            >
              {trendingProduct?.slice(0, 10)?.map((product, i) => (
                <Col key={i}>
                  <ProductBox
                    product={product}
                    className="boxClass"
                    style="'horizontal'"
                  />
                </Col>
              ))}
            </Row>

            {/* <ProductData
              style="horizontal"
              slider={true}
              customSliderOption={sliderOptions}
              products={filteredProduct}
              dataAPI={dataAPI?.main_content?.section7_products}
              classObj={{ productStyle: "product-modern", productBoxClass: "" }}
              spaceClass={false}
            /> */}
          </div>
        </>
      )}

      {dataAPI?.main_content?.section13_360View?.status && (
        <ProductSection360
          dataAPI={dataAPI?.main_content?.section13_360View}
          ProductData={section13Product}
          svgUrl={<SportSVG className="icon-width" />}
          noCustomClass={true}
        />
      )}

      {dataAPI?.main_content?.section12_youtube?.status && (
        <ProductInfoMain dataAPI={dataAPI?.main_content?.section12_youtube} />
      )}

      {dataAPI?.main_content?.section12_youtube?.status && (
        <HomePageYouTube
          dataAPI={dataAPI?.main_content?.section12_youtube}
          svgUrl={<SportSVG className="icon-width" />}
          noCustomClass={true}
        />
      )}

      {/* Full Width Banner Section */}
      {/* {dataAPI?.main_content?.section8_full_width_banner?.status &&
                <ImageLink classes={{ customHoverClass: 'banner-contain hover-effect b-left', customClass: 'section-b-space' }} imgUrl={dataAPI?.main_content?.section8_full_width_banner?.image_url} ratioImage={false} link={dataAPI?.main_content?.section8_full_width_banner?.redirect_link?.link_type} height={293} width={1183} />
            } */}

      {/* Blogs Section */}
      {dataAPI?.main_content?.section9_featured_blogs?.status && (
        <>
          <CustomHeading
            title={dataAPI?.main_content?.section9_featured_blogs?.title}
            subTitle={
              dataAPI?.main_content?.section9_featured_blogs?.description
            }
            svgUrl={<SportSVG className="icon-width" />}
          />

          {dataAPI?.main_content?.section9_featured_blogs?.blog_ids?.length >
          0 ? (
            <BlogData
              dataAPI={dataAPI?.main_content?.section9_featured_blogs}
              svgUrl={<SportSVG className="icon-width" />}
              classes={{
                sliderClass: "slider-3-blog ratio_65 no-arrow product-wrapper",
                sliderOption: featureBlogSliderOption3,
              }}
            />
          ) : (
            <NoDataFound
              data={{
                customClass: "bg-light no-data-added",
                title: "No Blog Found",
              }}
            />
          )}
        </>
      )}
    </Col>
  );
};

export default RightSection;
