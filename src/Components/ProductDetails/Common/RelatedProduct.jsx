import { useContext, useMemo, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Row, Col } from "reactstrap";
import { useRouter, useSearchParams } from 'next/navigation';
import request from '@/Utils/AxiosUtils';
import { SportSVG } from '@/Components/Common/CommonSVG';
import WrapperComponent from '@/Components/Common/WrapperComponent';
import ProductIdsContext from '@/Helper/ProductIdsContext';
import CustomHeading from '@/Components/Common/CustomHeading';
import ProductBox from '@/Components/Common/ProductBox';
import ThemeOptionContext from '@/Helper/ThemeOptionsContext';
import { ProductAPI } from '@/Utils/AxiosUtils/API';

const RelatedProduct = ({ productState }) => {
  const router = useRouter();
  const { filteredProduct } = useContext(ProductIdsContext);
  const { themeOption } = useContext(ThemeOptionContext);
  const filterProduct = useMemo(() => {
    return filteredProduct?.filter((el) => productState?.product?.related_products?.includes(el.id));
  }, [filteredProduct, productState?.product?.related_products]);


  const {
    data: relatedProductData,
    isLoading,
    refetch,
  } = useQuery([productState], () => request({ url: `${ProductAPI}/id/${productState?.product?.id}` }, router), { enabled: false, refetchOnWindowFocus: false, select: (res) => res?.data });
  // Calling Product API when params is there

  useEffect(() => {
    console.log('i am inside')
    productState?.product?.id &&  refetch(); 
  
  }, [productState]);

console.log(relatedProductData, 'relatedProductData')
  return (
    <WrapperComponent classes={{ sectionClass: 'product-list-section section-b-space pt-0' }} noRowCol={true}>
    <CustomHeading title="YouMayAlsoLike" svgUrl={<SportSVG className='icon-width' />} />
          <div className={`${themeOption?.product?.full_border ? "full_border" : ''} ${themeOption?.product?.image_bg ? "product_img_bg" : ''} ${themeOption?.product?.product_box_bg ? "full_bg" : ''} ${themeOption?.product?.product_box_border ? "product_border" : ''} `}>
            {filterProduct?.length ?
            (<div className="row g-sm-3 g-2">
              {filterProduct?.map((product, i) => (
                <div key={i} className='col-xxl-2 col-lg-3 col-md-4 col-6 product-box-contain'>
                  <ProductBox product={product}  className="boxClass" style="'horizontal'" />
                </div>
              ))}
            </div>) : (
                <Row
                className={"g-sm-4 g-4 product-list-section row-cols-xl-5 row-cols-xxl-5"}
                xs={2}
                md={3}
              >
                {relatedProductData?.map((product, i) => (
                  <Col key={i}>
                   <ProductBox
                      product={product}
                      className="boxClass"
                      style="'horizontal'"
                    />
                  </Col>
                ))}
              </Row>
            )}
          </div>
    </WrapperComponent>
  );
};

export default RelatedProduct;
