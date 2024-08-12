import { useContext, useState } from "react";
import Link from "next/link";
import { RiDownload2Fill, RiRefreshLine } from "react-icons/ri";
import { useTranslation } from "react-i18next";
import PaynowModal from "./PaynowModal";
import { OrderInvoiceAPI, CancelOrder } from "@/Utils/AxiosUtils/API";
import { useQuery } from "@tanstack/react-query";
import useCreate from "@/Utils/Hooks/useCreate";
import request from "@/Utils/AxiosUtils";
import { useRouter } from "next/navigation";
import { ToastNotification } from "@/Utils/CustomFunctions/ToastNotification";
import ConfirmationModal from "@/Components/Common/ConfirmationModal";

const DetailTitle = ({ params, data }) => {
  const [modal, setModal] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState("");
  const [isLoadingCancel, setIsLoadingCancel] = useState(false);
  const router = useRouter();
  const { t } = useTranslation("common");

  const handleShowModal = () => {
    setConfirmationModal(true); // Show the modal
  };

  const { mutate: InvoiceMutate, isLoading } = useCreate(
    OrderInvoiceAPI,
    false,
    false,
    "Downloaded Successfully",
    (resDta) => {
      if (resDta?.status == 200 || resDta?.status == 201) {
        const blob = new Blob([resDta?.data], {
          type: `invoice-${data?.order_number}.pdf`,
        });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `invoice-${data?.order_number}.pdf`;
        link.click();
        window.URL.revokeObjectURL(url);
      }
    },
    false,
    "blob"
  );

  const handleCancelOrder = async () => {
    try {
      const cancelOrderResponse = await request({
        url: CancelOrder,
        data,
        method: "post",
      });
      ToastNotification("success", "Order Cancel Succesfully");
      setTimeout(() => {
        router.push(`/account/order`);
      }, 500);
    } catch (error) {
      ToastNotification("error", "Order is not Cancle");
      //console.error('Error cancelling order:', error.message);
      // Handle error as needed
    }
  };

  return (
    <>
      <div className="title-header">
        <div className="d-flex align-items-center flex-wrap gap-2">
          <h5>{`${t("OrderNumber")}: #${params}`}</h5>
          <div className="right-option">
            {(data?.payment_status === "FAILED" ||
              data?.payment_status === "PENDING") &&
              data?.order_status &&
              data?.order_status?.slug != "cancelled" &&
              data?.payment_method != "cod" && (
                <a
                  className="btn btn-md fw-bold text-light theme-bg-color"
                  onClick={() => setModal(true)}
                >
                  {t("PayNow")}
                  <RiRefreshLine className="ms-2" />
                </a>
              )}
            {data?.invoice_url &&
              data?.payment_status &&
              data?.payment_status === "COMPLETED" && (
                <Link
                  href={data?.invoice_url?.replace(
                    "https://apis.vector-x.com/",
                    "https://apis.vector-x.com/api/"
                  )}
                  className="btn btn-md fw-bold text-light theme-bg-color ms-auto"
                >
                  {t("Invoice")} <RiDownload2Fill className="ms-2" />
                </Link>
              )}
          </div>
          <div className="left-option">
            {data?.order_status?.slug === "pending" ||
            data?.order_status?.slug === "processing" ? (
              <button
                className="btn btn-md fw-bold text-light theme-bg-color btn-sm d-inline-block"
                href="javascript:void(0)"
                onClick={() => handleShowModal()}
              >
                {t("Cancel")}
              </button>
            ) : null}
          </div>
        </div>
      </div>
      <PaynowModal modal={modal} setModal={setModal} params={params} />
      <ConfirmationModal
        modal={confirmationModal}
        setModal={setConfirmationModal}
        isLoading={isLoadingCancel}
        confirmFunction={handleCancelOrder}
      />
    </>
  );
};

export default DetailTitle;
