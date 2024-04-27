import Image from 'next/image';
import { Col, Row } from 'reactstrap';
import ProductDetailsTab from '../Common/ProductDetailsTab';
import ProductDetailSidebar from '../Common/ProductDetailSidebar';
import WrapperComponent from '@/Components/Common/WrapperComponent';
import CustomerOrderCount from '../Common/CustomerOrderCount';
import ProductContent from '../Common/ProductContent';
import ProductStatus from '../Common/ProductStatus';
import ProductInformation from '../Common/ProductInformation';
import ProductDeliveryInformation from '../Common/ProductDeliveryInformation';
import PaymentOptions from '../Common/PaymentOptions';
import ProductSocial from '../Common/ProductSocial';
import ProductBundle from '../Common/ProductBundle';
import StickImage from './SticktImage';

const ProductSticky = ({ productState, setProductState }) => {
  return (
    <WrapperComponent classes={{ sectionClass: 'product-section section-b-space' }} customCol={true}>
      <Col xxl={9} xl={8} lg={7}>
        <Row className='g-4'>
          <Col xl={6} lg={12}>
            <StickImage productState={productState} setProductState={setProductState} />
          </Col>

          <Col xl={6} lg={5}>
              <div className="right-box-contain">
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
            <ProductDetailsTab productState={productState} setProductState={setProductState} />
        </Row>
      </Col>
      <ProductDetailSidebar productState={productState} />
    </WrapperComponent>
  );
};

export default ProductSticky;
