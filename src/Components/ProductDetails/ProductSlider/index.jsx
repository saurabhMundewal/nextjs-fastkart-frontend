import { useContext } from 'react';
import { Col, Row } from 'reactstrap';
import ProductInformation from '../Common/ProductInformation';
import ProductDetailsTab from '../Common/ProductDetailsTab';
import ProductDetailSidebar from '../Common/ProductDetailSidebar';
import WrapperComponent from '@/Components/Common/WrapperComponent';
import ThemeOptionContext from '@/Helper/ThemeOptionsContext';
import ProductSocial from '../Common/ProductSocial';
import ProductBundle from '../Common/ProductBundle';
import ProductDeliveryInformation from '../Common/ProductDeliveryInformation';
import SliderImage from './SliderImage';
import CustomerOrderCount from '../Common/CustomerOrderCount';
import ProductContent from '../Common/ProductContent';
import ProductStatus from '../Common/ProductStatus';
import PaymentOptions from '../Common/PaymentOptions';

const ProductSlider = ({ productState, setProductState }) => {
  const { themeOption } = useContext(ThemeOptionContext);
  return (
    <>
      <SliderImage productState={productState} setProductState={setProductState}/>
      <WrapperComponent classes={{ sectionClass: 'product-section section-b-space' }} customCol={true}>
        <Col xxl={9} xl={8} lg={7}>
          <Row className='g-4'>
            <Col xs={12}>
              <div className='right-box-contain full-width-right-box'>
                <CustomerOrderCount productState={productState} />
                <ProductContent productState={productState} setProductState={setProductState} />
                <ProductStatus productState={productState} />
                <ProductInformation productState={productState} />
                <ProductDeliveryInformation productState={productState} />
                <PaymentOptions productState={productState} />
                <ProductSocial productState={productState} />
              </div>
            </Col>
            {productState?.product?.cross_sell_products?.length > 0 && (
              <Col xs={12} className='related-product-2'>
                <ProductBundle productState={productState} />
              </Col>
            )}
            <ProductDetailsTab productState={productState} />
          </Row>
        </Col>
        <ProductDetailSidebar productState={productState} />
      </WrapperComponent>
    </>
  );
};

export default ProductSlider;
