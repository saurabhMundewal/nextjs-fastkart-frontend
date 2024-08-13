import { useContext, useEffect } from "react";
import { Form, Formik } from "formik";
import CustomModal from "@/Components/Common/CustomModal";
import { placeHolderImage } from "../../../../../Data/CommonPath";
import Avatar from "@/Components/Common/Avatar";
import SettingContext from "@/Helper/SettingContext";
import SimpleInputField from "@/Components/Common/InputFields/SimpleInputField";
import { useTranslation } from "react-i18next";
import { Label } from "reactstrap";
import Btn from "@/Elements/Buttons/Btn";
import { YupObject, nameSchema } from "@/Utils/Validation/ValidationSchemas";
import { ToastNotification } from "@/Utils/CustomFunctions/ToastNotification";
import request from "@/Utils/AxiosUtils";
import { useQuery } from "@tanstack/react-query";
import { PaymentAccountAPI } from "@/Utils/AxiosUtils/API";
import useCreate from "@/Utils/Hooks/useCreate";
import { RefundAPI } from "@/Utils/AxiosUtils/API";
import { useRouter } from "next/navigation";

const RefundModal = ({ modal, setModal, storeData, orderId }) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { convertCurrency } = useContext(SettingContext);
  const { mutate, isLoading } = useCreate(
    RefundAPI,
    false,
    false,
    false,
    (resDta) => {
      if (resDta.status == 200 || resDta.status == 201) {
        setModal(false);
        router.push("/account/order"); // Redirect to /account/order
      }
    }
  );

  const {
    data,
    refetch,
    isLoading: paymentLoader,
  } = useQuery(
    [PaymentAccountAPI],
    () => request({ url: PaymentAccountAPI }, router),
    {
      enabled: false,
      refetchOnWindowFocus: false,
      select: (res) => res?.data,
    }
  );

  useEffect(() => {
    refetch();
  }, []);

  return (
    <CustomModal
      modal={modal ? true : false}
      setModal={setModal}
      classes={{
        modalClass: "theme-modal view-modal",
        // modalHeaderClass: "p-0",
        title: "Refund",
      }}
    >
      <Formik
        initialValues={{
          reason: "",
          payment_type: "wallet",
          product_id: storeData?.id,
          order_id: orderId,
        }}
        validationSchema={""}
        onSubmit={(values) => {
          if (values?.reason && values?.payment_type) {
            if (values?.payment_type === "bank" && !data) {
              ToastNotification(
                "error",
                "Kindly create a payment account before claiming your refund"
              );
            } else {
              mutate(values);
            }
          } else {
            ToastNotification("error", "Please enter reason");
          }
        }}
      >
        {({ values, setFieldValue, errors }) => (
          <Form className="product-review-form">
            <div className="product-wrapper">
              <div className="product-image">
                <Avatar
                  data={
                    storeData?.product_thumbnail
                      ? storeData?.product_thumbnail
                      : placeHolderImage
                  }
                  customImageClass="img-fluid"
                  name={storeData?.name}
                />
              </div>
              <div className="product-content">
                <h5 className="name">{storeData?.name}</h5>
                <div className="product-review-rating">
                  <div className="product-rating">
                    <h6 className="price-number">
                      {convertCurrency(storeData.order_amount)}
                    </h6>
                  </div>
                </div>
              </div>
            </div>

            <div className="review-box">
              <SimpleInputField
                nameList={[
                  {
                    name: "reason",
                    placeholder: t("EnterReason"),
                    type: "textarea",
                    toplabel: "Reason",
                    require: "true",
                    rows: 3,
                  },
                ]}
              />
              <imput type="hidden" name="produt_id" value={storeData?.id} />
              <imput type="text" name="order_id" value={orderId} />
              <Label className="form-label" htmlFor="address1">
                {t("PaymentOption")}
              </Label>
              <select
                className="form-control"
                name="payment_type"
                onChange={(e) => setFieldValue("payment_type", e.target.value)}
              >
                <option disabled>{t("SelectPaymentOption")}</option>
                <option value="wallet">{t("Wallet")}</option>
                <option value="bank">{t("Bank Transfer")}</option>
              </select>
              {errors["payment_type"] && (
                <div className="invalid-feedback d-block">
                  {t("Paymenttypeisrequired")}
                </div>
              )}
            </div>
            <div
              style={{ display: "inline-flex", float: "right" }}
              className="pt-2"
            >
              <Btn
                className="btn-md btn-theme-outline fw-bold"
                title="Cancel"
                type="button"
                onClick={() => setModal("")}
              />
              &nbsp;
              <Btn
                className="btn-md fw-bold text-light theme-bg-color "
                title="Submit"
                type="submit"
                loading={Number(isLoading)}
              />
            </div>
          </Form>
        )}
      </Formik>
    </CustomModal>
  );
};

export default RefundModal;
