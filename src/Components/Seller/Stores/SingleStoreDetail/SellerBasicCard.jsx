import ProductRating from '@/Components/Common/ProductBox/Widgets/ProductRating';
import StoreImage from '../StoreImage';
import SellerSocialCard from './SellerSocialCard';
import Image from 'next/image';
import { useTranslation } from "react-i18next";

const SellerBasicCard = ({ StoreData }) => {
  const { t } = useTranslation('common');
  return (
    <div className='vendor-detail-box'>
      <Image src={"/assets/images/shop-roof.png"} alt="shop-roof"  className="shop-roof" height={92.05} width={376.66} />
      <div className='vendor-name vendor-bottom'>
        <div className='vendor-logo'>
          <StoreImage customClass={'img-fluid'} elem={StoreData} />
          <div>
            <h3>{StoreData?.store_name}</h3>
            <div className='product-rating vendor-rating'>
              <div className='product-rating'>
                 <ProductRating totalRating={StoreData?.rating_count || 0} />
                <h6 className='ms-2'>
                  ({StoreData?.reviews_count} {t('Reviews')})
                </h6>
              </div>
            </div>
          </div>
        </div>
        <p>{StoreData?.description}</p>
      </div>
      <SellerSocialCard StoreData={StoreData} />
    </div>
  );
};
export default SellerBasicCard;
