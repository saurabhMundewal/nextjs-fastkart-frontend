import { Col } from 'reactstrap';
import { useContext } from 'react';
import ProductIdsContext from '@/Helper/ProductIdsContext';
import ImageLink from '@/Components/Themes/Common/ImageLink'
import ProductData from '@/Components/Themes/Common/ProductData';
import CategoryStyle from '@/Components/Themes/Common/CategoryData/CategoryStyle';

const LeftSection = ({ dataAPI }) => {
  const bannerOne = dataAPI?.main_content?.sidebar?.left_side_banners?.banner_1?.image_url;
  const bannerTwo = dataAPI?.main_content?.sidebar?.left_side_banners?.banner_2?.image_url;
  const { filteredProduct } = useContext(ProductIdsContext);

  return (
    <>
      {dataAPI?.main_content?.sidebar?.status && (
        <Col xxl={3} xl={4} className='d-none d-xl-block'>
          <div className='p-sticky'>
            {/* Vertical Category  Section*/}
            <CategoryStyle style="'vertical'" categoryIds={dataAPI?.main_content?.sidebar?.categories_icon_list?.category_ids} classes={{ sliderClass: "feature-panel-slider" }}
            />

            {/* Vertical Banner  Section*/}
            {dataAPI?.main_content?.sidebar?.left_side_banners?.status && (
              <>
                <ImageLink classes={{ customClass: 'ratio_156 section-t-space' }} imgUrl={bannerOne} ratioImage={true} link={dataAPI?.main_content?.sidebar?.left_side_banners?.banner_1} height={245} width={378} />
                <ImageLink classes={{ customClass: 'ratio_medium section-t-space' }} imgUrl={bannerTwo} link={dataAPI?.main_content?.sidebar?.left_side_banners?.banner_2} height={245} width={378} />
              </>
            )}

            {/* Vertical Product  Section*/}
            {dataAPI?.main_content?.section1_products?.status && (
              <div className="section-t-space">
                <div className="category-menu">
                  <h3>{dataAPI?.main_content?.sidebar?.sidebar_products?.title}</h3>
                  <ProductData style='vertical' products={filteredProduct} dataAPI={dataAPI?.main_content?.sidebar?.sidebar_products} />
                </div>
              </div>
            )}
          </div>
        </Col >
      )}
    </>
  );
};

export default LeftSection;
