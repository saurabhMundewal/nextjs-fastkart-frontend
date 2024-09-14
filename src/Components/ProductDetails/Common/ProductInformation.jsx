import { ModifyString } from "@/Utils/CustomFunctions/ModifyString";
import { useTranslation } from "react-i18next";

const ProductInformation = ({ productState }) => {
  const { t } = useTranslation("common");
  return (
    <div className="pickup-box">
      <div className="product-title">
        <h4>{t("ProductInformation")}</h4>
      </div>
      <div className="product-info">
        <div>
          {productState?.selectedVariation?.short_description ??
            productState?.product?.short_description}
        </div>
        <ul className="product-info-list">
          <li>
            {t("SKU")} :{" "}
            {productState?.selectedVariation?.sku ?? productState?.product?.sku}
          </li>
          <li>
            {t("Unit")} :{" "}
            {productState?.selectedVariation?.unit ??
              productState?.product?.unit}
          </li>
          <li>
            {t("Weight")} : {productState?.product?.weight}{" "}
            {ModifyString("gms")}
          </li>
          <li>
            {t("StockStatus")} :
            {productState?.selectedVariation?.stock_status
              ? ModifyString(
                  productState?.selectedVariation?.stock_status,
                  false,
                  "_"
                )
              : ModifyString(productState?.product?.stock_status, false, "_")}
          </li>
          <li>
            {t("Quantity")} :{" "}
            {productState?.selectedVariation?.quantity ??
              productState?.product?.quantity}{" "}
            Items Left
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductInformation;
