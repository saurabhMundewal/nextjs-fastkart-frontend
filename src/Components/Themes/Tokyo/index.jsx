'use client';
import { useContext, useEffect, useState } from 'react';
import { Col } from 'reactstrap';
import { useQuery } from '@tanstack/react-query';
import request from '@/Utils/AxiosUtils';
import { HomePageAPI } from '@/Utils/AxiosUtils/API';
import StickyCart from '@/Layout/StickyCart';
import ProductIdsContext from '@/Helper/ProductIdsContext';
import ThemeOptionContext from '@/Helper/ThemeOptionsContext';
import { categorySliderOption9, productSliderOptions6 } from '../../../../Data/SliderSettingsData';
import { CakeSVG } from '@/Components/Common/CommonSVG';
import WrapperComponent from '@/Components/Common/WrapperComponent';
import CustomHeading from '@/Components/Common/CustomHeading';
import ImageLink from '@/Components/Themes/Common/ImageLink'
import TokyoBanner from "@/Components/Themes/Common/HomeBanner/TokyoBanner"
import SliderBanner from '@/Components/Themes/Common/SliderBanner/index';
import FourColProduct from "@/Components/Themes/Common/FourColProduct/index"
import BannerData from '@/Components/Themes/Common/BannerData/index';
import BrandData from '@/Components/Themes/Common/BrandData';
import NewsLetter from '@/Components/Themes/Common/Newsletter';
import ProductData from '@/Components/Themes/Common/ProductData';
import CategoryStyle from '@/Components/Themes/Common/CategoryData/CategoryStyle';
import { useSearchParams } from 'next/navigation';
import Loader from '@/Layout/Loader';
import BlogContext from '@/Helper/BlogContext';
import BrandContext from '@/Helper/BrandContext';
import SellerContext from '@/Helper/SellerContext';

const TokyoTheme = () => {
    const [sliderOptions, setSliderOptions] = useState(productSliderOptions6);
    const { themeOption } = useContext(ThemeOptionContext);
    const { blogContextLoader } = useContext(BlogContext);
    const { brandContextLoader } = useContext(BrandContext);
    const {  isLoading:sellerContextLoader } = useContext(SellerContext);  
    const { setGetProductIds, isLoading: productLoader, filteredProduct } = useContext(ProductIdsContext);
    const path = useSearchParams()
    const theme = path.get('theme')
    const { data, isLoading, refetch } = useQuery(['tokyo'], () => request({ url: HomePageAPI, params: { slug: 'tokyo' } }), { enabled: false, refetchOnWindowFocus: false, select: (res) => res?.data });
    useEffect(() => {
        const headerTops = document.getElementsByClassName('header-top');

        // document.documentElement.style.setProperty('--theme-color', '#d99f46');
        let timer = setTimeout(() => {
            for (const headerTop of headerTops) {
                headerTop.classList.add('bg-dark');
            }
        }, 0);

        return () => {
            // document.documentElement.style.removeProperty('--theme-color');
            for (const headerTop of headerTops) {
                headerTop.classList.remove('bg-dark');
            }
            clearTimeout(timer);
        };
    }, []);

    useEffect(() => {
        if (data?.content?.products_ids?.length > 0) {
            setGetProductIds({ ids: Array.from(new Set(data?.content?.products_ids))?.join(',') });
        }
    }, [isLoading]);

    useEffect(() => {
        if (theme == 'tokyo' == false && themeOption?.product?.product_box_variant == 'digital') {
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

    useEffect(() => {
      isLoading && refetch()
    }, [isLoading]);

  useEffect(()=>{
    if (!isLoading) {       
       if (productLoader || blogContextLoader || brandContextLoader ) {
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
             <TokyoBanner dataAPI={data?.content?.home_banner} />

            {/* Categories Section*/}
            {data?.content?.categories_icon_list?.status &&
                <WrapperComponent>
                    <CategoryStyle theme="'paris'" style="'horizontal'" categoryIds={data?.content.categories_icon_list.category_ids} classes={{ sliderOption: categorySliderOption9 }} />
                </WrapperComponent>
            }

            {/* Coupon Banner Section*/}
            {data?.content?.coupons.status &&
                <WrapperComponent  customCol={true} >
                    <BannerData bannersData={data?.content?.coupons} style="'full_width'" height={138} width={1585} bannerClass="sale-banner" />
                </WrapperComponent>
            }

            {/* Slider Banner Section*/}
            {data?.content?.featured_banners?.status && data?.content?.featured_banners?.banners?.length > 0 &&
                <SliderBanner bannersData={data?.content?.featured_banners?.banners} />}

            {/* Product Card Section*/}
            {data?.content?.main_content?.sidebar?.status &&
                <WrapperComponent classes={{ row: 'g-3' }} customCol={true}>
                    <Col xxl={data?.content?.main_content?.sidebar?.status ? 9 : 12} xl={data?.content?.main_content?.sidebar?.status ? 8 : 12}>
                        {/* Horizontal Product  Section*/}
                        {data?.content?.main_content?.section1_products?.status && (
                            <>
                                <CustomHeading title={data?.content?.main_content?.section1_products?.title} svgUrl={<CakeSVG className='icon-width' />} subTitle={data?.content?.main_content?.section1_products?.description} noCustomClass={true} />
                                <ProductData style='horizontal' slider={true} customSliderOption={sliderOptions} products={filteredProduct} dataAPI={data?.content?.main_content?.section1_products} classObj={{ productStyle: 'product-standard', productBoxClass: 'product-box-bg' }} />
                            </>
                        )}
                        {/* Classic Product Section*/}
                        {data?.content?.main_content?.section2_slider_products?.status && (
                            <>
                                <CustomHeading title={data?.content?.main_content?.section2_slider_products?.title} svgUrl={<CakeSVG className='icon-width' />} subTitle={data?.content?.main_content?.section2_slider_products?.description} noCustomClass={true} />
                                <div className='section-b-space'>
                                    <ProductData style='classic' slider={true} customSliderOption={sliderOptions} products={filteredProduct} dataAPI={data?.content?.main_content?.section2_slider_products} classObj={{ productStyle: 'product-standard', productBoxClass: 'product-box-bg' }} />
                                </div>
                            </>
                        )}

                        {/* Horizontal Product Section*/}
                        {data?.content?.main_content?.section3_products?.status && (
                            <>
                                <CustomHeading title={data?.content?.main_content?.section3_products?.title} svgUrl={<CakeSVG className='icon-width' />} subTitle={data?.content?.main_content?.section3_products?.description} noCustomClass={true} />
                                <ProductData style='horizontal' slider={true} customSliderOption={sliderOptions} products={filteredProduct} dataAPI={data?.content?.main_content?.section3_products} classObj={{ productStyle: 'product-standard', productBoxClass: 'product-box-bg' }} />

                            </>
                        )}
                        {/* Horizontal Product Section*/}
                        {data?.content?.main_content?.section4_products?.status && (
                            <>
                                <CustomHeading title={data?.content?.main_content?.section4_products?.title} svgUrl={<CakeSVG className='icon-width' />} subTitle={data?.content?.main_content?.section4_products?.description} noCustomClass={true} />
                                <ProductData style='horizontal' slider={true} customSliderOption={sliderOptions} products={filteredProduct} dataAPI={data?.content?.main_content?.section4_products} classObj={{ productStyle: 'product-standard', productBoxClass: 'product-box-bg' }} paddingClass="p-0" />
                            </>
                        )}
                    </Col>
                    {/* Vertical Banner Section*/}
                    {data?.content?.main_content?.sidebar?.status && (
                        <Col xxl={3} xl={4} className='d-none d-xl-block'>
                            <div className='position-sticky top-0'>
                                <ImageLink classes={{ customClass: 'ratio_209 rounded', customHoverClass: 'banner-contain rounded hover-effect' }} imgUrl={data?.content?.main_content?.sidebar?.right_side_banners.banner_1?.image_url} ratioImage={true} link={data?.content?.main_content?.sidebar?.right_side_banners?.banner_1} height={245} width={378} />
                                <ImageLink classes={{ customClass: 'ratio_125 section-t-space', customHoverClass: 'banner-contain rounded hover-effect' }} imgUrl={data?.content?.main_content?.sidebar?.right_side_banners.banner_1?.image_url} link={data?.content?.main_content?.sidebar?.right_side_banners?.banner_2} height={245} width={378} />
                            </div>
                        </Col>
                    )}
                </WrapperComponent>
            }
            { /* Full Width Banner Section*/}
            {data?.content?.full_width_banner?.status &&
                <WrapperComponent>
                    <ImageLink classes={{ customHoverClass: 'banner-contain hover-effect b-left' }} imgUrl={data?.content?.full_width_banner?.image_url} ratioImage={false} link={data?.content?.full_width_banner} height={343} width={1524} />
                </WrapperComponent>
            }
            { /* Four Colum Product Section*/}
            {data?.content?.slider_products?.status &&
                <WrapperComponent>
                    <FourColProduct dataAPI={data?.content?.slider_products} classes={{ colClass: { sm: 6, xl: 4, xxl: 3 } }} />
                </WrapperComponent>
            }

            { /* Brand Section*/}
            {data?.content?.brands?.brand_ids && data?.content?.brands?.status &&
                <div className="brand-effect ">
                    <div className="container-fluid-lg">
                        <BrandData dataAPI={data?.content?.brands?.brand_ids} height={113} width={70} />
                    </div>
                </div>
            }

            { /* NewsLetter Section*/}
            {data?.content?.news_letter?.status && <NewsLetter dataAPI={data?.content?.news_letter} />}

            { /* Sticky Cart Section*/}
            {themeOption?.general?.sticky_cart_enable && themeOption?.general?.cart_style !== 'cart_sidebar' && <StickyCart />}
        </>
    );
};

export default TokyoTheme;