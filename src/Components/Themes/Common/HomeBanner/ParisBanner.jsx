import { Col, Row } from 'reactstrap';
import { useContext } from 'react';
import WrapperComponent from '@/Components/Common/WrapperComponent';
import ImageLink from '@/Components/Themes/Common/ImageLink'
import SkeletonWrapper from '@/Components/Common/SkeletonWrapper';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { mainBannerSlider } from '../../../../../Data/SliderSettingsData';
import sliderImage from '../../../../../public/assets/images/sliderImage.jpg'
import ProductIdsContext from '@/Helper/ProductIdsContext';
import Link from 'next/link';
import Image from "next/image";


const ParisBanner = ({ dataAPI }) => {
  const { filteredProduct } = useContext(ProductIdsContext);
  const redirectToProduct = (productId) => {
    const product = filteredProduct.find((elem) => elem?.id == productId);
    return 'product/' + product?.slug;
  };

  const redirectSlider = (redirectType) =>{
    if(redirectType?.link_type === 'external_url'){
   return   <Link href={redirectType?.link || '/'} target='_blank'>
      <button className="slide-button">Shop Now</button>     
    </Link>
    }
    else if(redirectType?.link_type === 'collection'){
     return <Link href={`/collections?category=${redirectType?.link}` || '/'}>
     <button className="slide-button">Go to Collection</button> 
   </Link>
    }
    else if(redirectType?.link_type === 'product'){
    return  <Link href={`/${redirectToProduct(redirectType?.link)}` || '/'}>
          <button className="slide-button">Go to Collection</button>  
        </Link>
    }
     }

  return (
    <>
    <SkeletonWrapper classes={{ colProps: { xl: 12 }, colClass: 'ratio_65', divClass: 'home-contain h-100 skeleton-banner-xl' }}>
    <div className="slider-container">
  <Slider {...mainBannerSlider}>
    <div className="slide">
       <img src={dataAPI?.home_banner?.main_banner?.image_url}  className="slider-image"/>
      {redirectSlider(dataAPI?.home_banner?.main_banner?.redirect_link)}
    </div>
    <div className="slide">
      <img src={dataAPI?.home_banner?.sub_banner_1?.image_url} className="slider-image"/>
      { redirectSlider(dataAPI?.home_banner?.sub_banner_1?.redirect_link)}
    </div>
    <div className="slide">
      <img src={dataAPI?.home_banner?.sub_banner_2?.image_url} className="slider-image"/>
    {redirectSlider(dataAPI?.home_banner?.sub_banner_2?.redirect_link)}
    </div>
    <div className="slide">
      <img src='https://apis.vector-x.com//storage/20251/sliderImage.jpg' className="slider-image"/>
      { redirectSlider('/about-us')}
      {/* <Image src={sliderImage} alt="payment"  className="slider-image"/> */}
     </div>
       </Slider>
</div>
</SkeletonWrapper>
</>
  );
};

export default ParisBanner;
