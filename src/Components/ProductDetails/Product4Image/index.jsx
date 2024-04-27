import { Col } from 'reactstrap';
import WrapperComponent from '@/Components/Common/WrapperComponent';
import ProductDetailsTab from '../Common/ProductDetailsTab';
import FourImage from './FourImage';
import CustomerOrderCount from '../Common/CustomerOrderCount';
import ProductContent from '../Common/ProductContent';
import ProductStatus from '../Common/ProductStatus';
import ProductInformation from '../Common/ProductInformation';
import ProductDeliveryInformation from '../Common/ProductDeliveryInformation';
import PaymentOptions from '../Common/PaymentOptions';
import ProductSocial from '../Common/ProductSocial';
import ProductBundle from '../Common/ProductBundle';

const Product4Image = ({ productState, setProductState}) => {
  return (
    <WrapperComponent classes={{ sectionClass: 'product-section section-b-space', row: 'g-4' }} customCol={true}>
      <Col xl={6}>
        <FourImage productState={productState} />
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
    </WrapperComponent>
  );
};

export default Product4Image;