import { Col, Row } from 'reactstrap';
import WrapperComponent from '@/Components/Common/WrapperComponent';
import ImageLink from '@/Components/Themes/Common/ImageLink'
import SkeletonWrapper from '@/Components/Common/SkeletonWrapper';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { mainBannerSlider } from '../../../../../Data/SliderSettingsData';

const ParisBanner = ({ dataAPI }) => {
  return (
    <>
    <SkeletonWrapper classes={{ colProps: { xl: 12 }, colClass: 'ratio_65', divClass: 'home-contain h-100 skeleton-banner-xl' }}>
    <div className="slider-container">
  <Slider {...mainBannerSlider}>
    <div>
      <img src={dataAPI?.home_banner?.main_banner?.image_url}  className="slider-image"/>
    </div>
    <div>
      <img src={dataAPI?.home_banner?.sub_banner_1?.image_url} className="slider-image"/>
    </div>
    <div>
      <img src={dataAPI?.home_banner?.sub_banner_2?.image_url} className="slider-image"/>
    </div>
       </Slider>
</div>
</SkeletonWrapper>
</>
  );
};

export default ParisBanner;
