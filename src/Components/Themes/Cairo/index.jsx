"use client";
import ProductIdsContext from "@/Helper/ProductIdsContext";
import request from "@/Utils/AxiosUtils";
import { HomePageAPI } from "@/Utils/AxiosUtils/API";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import WrapperComponent from "@/Components/Common/WrapperComponent";
import {
    categorySliderOption9,
    featurePanelSlider,
    featureBlogSliderOption3,
    featureBlogSliderOption4,
} from "../../../../Data/SliderSettingsData";
import CustomHeading from "../../Common/CustomHeading";
import ThemeOptionContext from "@/Helper/ThemeOptionsContext";
import CairoBanner from "../Common/HomeBanner/CairoBanner";
import BrandData from "../Common/BrandData";
import CategoryProductFilter from "../Common/CategoryProductFilter";
import BlogData from "../Common/BlogData";
import CategoryStyle from "../Common/CategoryData/CategoryStyle";
import ProductData from "../Common/ProductData";
import { Col } from "reactstrap";
import Btn from "@/Elements/Buttons/Btn";
import { FiArrowRight } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import TopSeller from "../Common/TopSeller";
import { useSearchParams } from "next/navigation";
import StickyCart from "@/Layout/StickyCart";
import Loader from "@/Layout/Loader";
import BlogContext from '@/Helper/BlogContext';
import BrandContext from '@/Helper/BrandContext';
import SellerContext from '@/Helper/SellerContext';
import CairoSkelton from "@/Components/Common/SkeletonLoader/CairoSkelton";

const CairoTheme = ({ activeTheme }) => {
    const { t } = useTranslation("common");
    const [sliderOptions, setSliderOptions] = useState(featureBlogSliderOption3);
    const path = useSearchParams()
    const theme = path.get('theme')
    let showProductBox = 4;
    const { blogContextLoader } = useContext(BlogContext);
    const { brandContextLoader } = useContext(BrandContext);
    const { isLoading: sellerContextLoader } = useContext(SellerContext);
    const { setGetProductIds, filteredProduct, isLoading: productLoader, } = useContext(ProductIdsContext);
    const { data, isLoading, refetch } = useQuery(["cairo"], () => request({ url: HomePageAPI, params: { slug: "cairo" } }), { enabled: false, refetchOnWindowFocus: false, select: (res) => res?.data });
    useEffect(() => {
        isLoading && refetch();
    }, [isLoading]);
    const { themeOption } = useContext(ThemeOptionContext);
    useEffect(() => {
        document.documentElement.style.setProperty("--theme-color2", "#dc2430");
        return () => {
            document.documentElement.style.removeProperty("--theme-color2");
        };
    }, []);
    useEffect(() => {
        if (data?.content?.products_ids?.length > 0) {
            setGetProductIds({ ids: Array.from(new Set(data?.content?.products_ids))?.join(","), });
        }
    }, [isLoading]);

    useEffect(() => {
        if (theme == 'cairo' == false && themeOption?.product?.product_box_variant == 'digital') {
            if (sliderOptions && sliderOptions?.slidesToShow) {
                setSliderOptions({
                    ...sliderOptions,
                    slidesToShow: 3, // Update for digital products
                });
                showProductBox = 4;
            }
        } else {
            if (sliderOptions && sliderOptions?.slidesToShow) {
                setSliderOptions({
                    ...sliderOptions,
                    slidesToShow: 3, // Update for digital products
                });
                showProductBox = 6;
            }

        }

    }, [themeOption?.product?.product_box_variant, theme]);

    useEffect(() => {
        if (!isLoading) {
            if (productLoader || blogContextLoader || brandContextLoader) {
                document.body.classList.add("skeleton-body");
            } else {
                document.body.classList.remove("skeleton-body");
            }
        }
    }, [isLoading, productLoader, blogContextLoader, brandContextLoader])
    if (isLoading) return <Loader />;
    return (
        <>
            {/* Home Banner Section*/}
            <CairoBanner dataAPI={data?.content?.home_banner} />

            {/* Tab Category Section*/}
            {data?.content?.categories_icon_list?.status && (
                <WrapperComponent
                    colProps={{ sm: 9 }}
                    classes={{
                        col: "position-relative",
                        row: "justify-content-center",
                        sectionClass: "feature-category-panel pt-0",
                    }}
                >
                    <CairoSkelton />
                    <CategoryStyle
                        // style="'horizontal'"
                        theme="'cairo'"
                        sliderOptions={featurePanelSlider}
                        categoryIds={data?.content?.categories_icon_list?.category_ids}
                        classes={{ sliderClass: "feature-panel-slider no-arrow" }}
                    />
                </WrapperComponent>
            )}

            {/* Horizontal Product Section*/}
            {data?.content?.products_list_1?.status && (
                <WrapperComponent classes={{ sectionClass: "product-section", row: "g-sm-4 g-3" }}
                    noRowCol={true} >
                    <CustomHeading
                        title={data?.content?.products_list_1?.title}
                        noCustomClass={true}
                    />
                    <ProductData
                        style="horizontal"
                        showItem={4}
                        slider={false}
                        products={filteredProduct?.filter((el) => data?.content?.products_list_1?.product_ids?.includes(el?.id))}
                        dataAPI={data?.content?.products_list_1}
                        classObj={{
                            productStyle: "product-classic",
                            productBoxClass: "product-box-bg",
                        }}
                        spaceClass={false}
                    />
                </WrapperComponent>
            )}

            {/* Vertical Category Section*/}
            {data?.content?.categories_icon_list_2?.status && (
                <WrapperComponent
                    classes={{ sectionClass: "category-panel section-b-space m-0" }}
                    noRowCol={true}
                >
                    <CustomHeading
                        title={data?.content?.categories_icon_list_2?.title}
                        noCustomClass={true}
                    />
                    <CategoryStyle
                        style="'cairo_classic'"
                        image="true"
                        sliderOptions={categorySliderOption9}
                        classes={{ sliderClass: "feature-panel-slider" }}
                        categoryIds={data?.content?.categories_icon_list_2?.category_ids}
                    />
                </WrapperComponent>
            )}

            {/* Slider Product Section*/}
            <WrapperComponent
                style={{
                    backgroundImage: `url(${data?.content?.slider_product?.image_url})`,
                }}
                customCol
                classes={{
                    row: "g-sm-4 g-3",
                    sectionClass: "featured-sec section-b-space",
                }}
            >
                <Col xxl={3} lg={4}>
                    <div className="feature-title">
                        <div>
                            <h2>{data?.content?.slider_product?.title}</h2>
                            <p>{data?.content?.slider_product?.description}</p>
                            <Btn className="btn theme-bg-color text-light mt-sm-4 mt-3">
                                {t("ViewAll")}
                                <FiArrowRight />
                            </Btn>
                        </div>
                    </div>
                </Col>
                <Col xxl={9} lg={8}>
                    <ProductData
                        style="horizontal"
                        slider={true}
                        customSliderOption={sliderOptions}
                        products={filteredProduct}
                        dataAPI={data?.content?.slider_product}
                        classObj={{
                            productStyle: "product-classic",
                            productBoxClass: "product-box-bg",
                        }}
                        spaceClass={false}
                    />
                </Col>
            </WrapperComponent>

            {/* Seller Section*/}
            {data?.content?.seller?.status && (
                <WrapperComponent>
                    <CustomHeading
                        title={data?.content?.seller?.title}
                        noCustomClass={true}
                    />
                    <div className="section-b-space">
                        <TopSeller dataAPI={data?.content?.seller.store_ids} />
                    </div>
                </WrapperComponent>
            )}

            {/* Product Filter Section*/}
            {data?.content?.categories_products?.status && (
                <CategoryProductFilter
                    dataAPI={data?.content?.categories_products}
                    products={filteredProduct}
                    grid={showProductBox}

                />
            )}

            {/*Blog Section*/}
            {data?.content?.featured_blogs?.status && (
                <WrapperComponent
                    noRowCol
                    classes={{ sectionClass: "category-panel section-b-space m-0" }}
                >
                    <CustomHeading title={data?.content?.featured_blogs?.title} />
                    <BlogData
                        dataAPI={data?.content?.featured_blogs}
                        description={true}
                        classes={{
                            sliderClass: "slider-4-blog ratio_65 no-arrow",
                            sliderOption: featureBlogSliderOption4,
                            height: 238,
                            width: 417,
                        }}
                    />
                </WrapperComponent>
            )}

            {/*Brand Section*/}
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

            { /* Sticky Cart Section*/}
            {themeOption?.general?.sticky_cart_enable && themeOption?.general?.cart_style !== 'cart_sidebar' && <StickyCart />}
        </>
    );
};

export default CairoTheme;
