import React, { useContext, useEffect, useState } from "react";
import { Card, Col } from "reactstrap";
import SettingContext from "../../../Helper/SettingContext";
import { useTranslation } from "react-i18next";
import SidebarProduct from "./SidebarProduct";
import useCreate from "@/Utils/Hooks/useCreate";
import { CheckoutAPI } from "@/Utils/AxiosUtils/API";
import CartContext from "@/Helper/CartContext";
import Loader from "@/Layout/Loader";
import PointWallet from "./PointWallet";
import ApplyCoupon from "./ApplyCoupon";
import PlaceOrder from "./PlaceOrder";
import Cookies from "js-cookie";

const CheckoutSidebar = ({ values, setFieldValue, errors }) => {
  const [storeCoupon, setStoreCoupon] = useState("");
  const { convertCurrency } = useContext(SettingContext);
  const { cartProducts } = useContext(CartContext);
  const { t } = useTranslation("common");
  const [errorCoupon, setErrorCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const { settingData } = useContext(SettingContext);
  const access_token = Cookies.get("uaf");

  const { data, mutate, isLoading } = useCreate(
    CheckoutAPI,
    false,
    false,
    true,
    (resDta) => {
      if (resDta?.status == 200 || resDta?.status == 201) {
        setErrorCoupon("");
        storeCoupon !== "" && setAppliedCoupon("applied");
      } else {
        setErrorCoupon(resDta?.response?.data?.message);
      }
    },
    false
  );

  const shippingCalculation = () => {
    if (data?.data?.total?.sub_total <= 299) {
      if (values?.delivery_description === "Express Delivery | Schedule") {
        return convertCurrency("148");
      } else {
        return convertCurrency("49");
      }
    } else {
      if (values?.delivery_description === "Express Delivery | Schedule") {
        return convertCurrency("99");
      } else if (data?.data?.total?.shipping_total >= 0) {
        return convertCurrency(data?.data?.total?.shipping_total);
      } else {
        return t(`Notcalculatedyet`);
      }
    }
  };

  const totalShipping = () => {
    if (data?.data?.total?.sub_total <= 299) {
      if (values?.delivery_description === "Express Delivery | Schedule") {
        return 148;
      } else {
        return 49;
      }
    } else {
      if (values?.delivery_description === "Express Delivery | Schedule") {
        return 99;
      } else if (data?.data?.total?.shipping_total >= 0) {
        return data?.data?.total?.shipping_total;
      } else {
        return 0;
      }
    }
  };

  // Submitting data on Checkout
  useEffect(() => {
    if (settingData?.activation?.guest_checkout && !access_token) {
      if (
        Object.keys(errors).length == 0 &&
        values["delivery_description"] &&
        values["payment_method"]
      ) {
        values["products"] = cartProducts;
        values["products"]?.length > 0 && mutate(values);
      }
    } else {
      if (
        access_token &&
        values["billing_address_id"] &&
        values["shipping_address_id"] &&
        values["delivery_description"] &&
        values["payment_method"]
      ) {
        const targetObject = {
          coupon: values["coupon"],
          billing_address_id: values["billing_address_id"],
          shipping_address_id: values["shipping_address_id"],
          delivery_description: values["delivery_description"],
          delivery_interval: values["delivery_interval"],
          points_amount: values["points_amount"],
          payment_method: values["payment_method"],
          products: (values["products"] = cartProducts),
          wallet_balance: values["wallet_balance"],
        };
        values["products"]?.length > 0 && mutate(targetObject);
        if (isLoading) {
          setStoreCoupon("");
        }
      }
    }
  }, [
    values["billing_address_id"],
    values["shipping_address_id"],
    values["payment_method"],
    values["delivery_description"],
    values["points_amount"],
    values["wallet_balance"],
  ]);

  return (
    <Col xxl="4" xl="5">
      <Card className="pos-detail-card">
        <SidebarProduct values={values} setFieldValue={setFieldValue} />
        <div className="pos-loader">
          <ul className={`summary-total position-relative`}>
            {isLoading && <Loader />}
            <li>
              <h4>{t("Subtotal")}</h4>
              <h4 className="price">
                {data?.data?.total?.sub_total
                  ? convertCurrency(data?.data?.total?.sub_total)
                  : t(`Notcalculatedyet`)}
              </h4>
            </li>
            <li>
              <h4>{t("Shipping")}</h4>
              <h4 className="price">{shippingCalculation()}</h4>
            </li>
            {values?.delivery_description === "Express Delivery | Schedule" ? (
              <li className="warning-label">
                <h4>Note:</h4>
                <h4 className="price warning-label">
                  <span className="warning-label">
                    {
                      "If you want free delivery, then please choose Standard Delivery option"
                    }
                  </span>
                </h4>
              </li>
            ) : null}

            {/* <li>
              <h4>{t('Tax')}</h4>
              <h4 className='price'>{data?.data?.total?.tax_total ? convertCurrency(data?.data?.total?.tax_total) : t(`Notcalculatedyet`)}</h4>
            </li> */}

            <PointWallet
              values={values}
              setFieldValue={setFieldValue}
              data={data}
            />

            <ApplyCoupon
              values={values}
              setFieldValue={setFieldValue}
              data={data}
              storeCoupon={storeCoupon}
              setStoreCoupon={setStoreCoupon}
              errorCoupon={errorCoupon}
              appliedCoupon={appliedCoupon}
              setAppliedCoupon={setAppliedCoupon}
              mutate={mutate}
              isLoading={isLoading}
            />

            <li className="list-total">
              <h4>{t("Total")}</h4>
              <h4 className="price">
                {data?.data?.total?.total
                  ? convertCurrency(
                      data?.data?.total?.total +
                        totalShipping() -
                        data?.data?.total?.tax_total
                    )
                  : t(`Notcalculatedyet`)}
              </h4>
            </li>
          </ul>
        </div>
        <PlaceOrder values={values} />
      </Card>
    </Col>
  );
};

export default CheckoutSidebar;
