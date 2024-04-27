import WrapperComponent from '@/Components/Common/WrapperComponent';
import BannerData from '@/Components/Themes/Common/BannerData';

const SliderBanner = ({ bannersData }) => {
  const banners = bannersData.filter((elem) => (elem.status == true ? true : false));
  return (
    <WrapperComponent classes={{ sectionClass: 'banner-section ratio_60' }} noRowCol={true}>
        <BannerData bannersData={bannersData} style="'horizontal'" height={245} width={378}/>
    </WrapperComponent>
  );
};

export default SliderBanner;
