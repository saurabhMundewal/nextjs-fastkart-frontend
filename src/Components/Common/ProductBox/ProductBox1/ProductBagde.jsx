
import { useTranslation } from "react-i18next";
import { useContext } from "react";

const ProductBagde = ({ productDetail }) => {
  
  const { t } = useTranslation( 'common');
  return (
    <>
      {productDetail?.is_sale_enable ? (
        <div className='label-tag sale-tag'>
          <span>{t("SALE")}</span>
        </div>
      ) : productDetail?.is_featured ? (
        <div className='label-tag'>
          <span>{t("Featured")}</span>
        </div>
      ) : null}
    </>
  );
};

export default ProductBagde;
