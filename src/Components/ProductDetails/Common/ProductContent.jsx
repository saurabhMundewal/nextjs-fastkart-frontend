import { useContext } from 'react';
import { useTranslation } from "react-i18next";
import SettingContext from '@/Helper/SettingContext';
import ProductAttribute from './ProductAttribute/ProductAttribute';
import OfferTimer from './OfferTimer';
import ProductDetailAction from './ProductDetailAction';
import Link from 'next/link';
import ProductRating from '@/Components/Common/ProductBox/Widgets/ProductRating';

const ProductContent = ({ productState, setProductState }) => {
    const { t } = useTranslation('common');
    const { convertCurrency } = useContext(SettingContext);
    return (
        <>
            <h2 className='name'>{productState?.selectedVariation?.name ?? productState?.product?.name}</h2>
            {productState?.product?.brand && <div className='brand-box-suggection'>
                <h5>{'Brand'} : <span><Link href={`/brand/${productState?.product?.brand?.name}`}>{productState?.product?.brand.name}</Link></span></h5>
            </div>}
            <div className='price-rating'>
                <h3 className='theme-color price'>
                    {productState?.selectedVariation?.sale_price ? convertCurrency(productState?.selectedVariation?.sale_price) : convertCurrency(productState?.product?.sale_price)}

                    {productState?.selectedVariation?.discount || productState?.product?.discount ? (
                        <del className='text-content'>{productState?.selectedVariation ? convertCurrency(productState?.selectedVariation?.price) : convertCurrency(productState?.product?.price)}</del>
                    ) : null}

                    {productState?.selectedVariation?.discount || productState?.product?.discount ? (
                        <span className='offer-top'>
                            {productState?.selectedVariation ? productState?.selectedVariation?.discount : productState?.product?.discount}% {t('Off')}
                        </span>
                    ) : null}
                </h3>
                {!productState?.product?.is_external && <div className='product-rating custom-rate'>
                   <ProductRating totalRating={productState?.selectedVariation?.rating_count ?? productState?.product?.rating_count} />
                    <span className='review'>
                        {productState?.selectedVariation?.reviews_count || productState?.product?.reviews_count || 0} {t('Review')}
                    </span>
                </div>}
            </div>
            {productState?.selectedVariation?.short_description && <div className='product-contain'>
                <p>{productState?.selectedVariation?.short_description ?? productState?.product?.short_description}</p>
            </div>
}
            {productState?.product.status &&
                <>
                    {productState?.product?.type == 'classified' && <ProductAttribute productState={productState} setProductState={setProductState} />}
                    {productState?.product?.sale_starts_at && productState?.product?.sale_expired_at && <OfferTimer productState={productState} />}
                    <ProductDetailAction productState={productState} setProductState={setProductState} />
                </>
            }
        </>
    );
};

export default ProductContent;
