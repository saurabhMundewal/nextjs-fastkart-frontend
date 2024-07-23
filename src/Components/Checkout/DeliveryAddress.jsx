import React, { useEffect, useState } from "react";
import { Row } from "reactstrap";
import {
  RiAddLine,
  RiMapPinLine,
  RiEdit2Line,
  RiDeleteBinLine,
} from "react-icons/ri";
import { useTranslation } from "react-i18next";
import CheckoutCard from "./common/CheckoutCard";
import CustomModal from "../Common/CustomModal";
import AddAddressForm from "./common/AddAddressForm";
import ShowAddress from "./ShowAddress";
import useDeleteAddress from "@/Utils/Hooks/useDeleteAddress";
import ConfirmDeleteModal from "../Common/ConfirmDeleteModal";

const DeliveryAddress = ({
  type,
  title,
  address,
  modal,
  mutate,
  isLoading,
  setModal,
  setFieldValue,
  setAddress,
}) => {
  const { t } = useTranslation("common");
  const [isEdit, setIsEdit] = useState(false);
  const [editAddress, setEditAddress] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [confirmModal, setConfirm] = useState("");
  const [isConfirmLoading, setIsConfirmLoading] = useState(false);

  useEffect(() => {
    address?.length > 0 && setFieldValue(`${type}_address_id`, address[0].id);
  }, [address]);

  const isEditAdd = (type, address) => {
    setIsEdit(true);
    setEditAddress(address);
    setModal(type);
  };

  const isNewAdd = (type) => {
    setIsEdit(false);
    setEditAddress("");
    setModal(type);
  };

  const handleSuccess = () => {
    window.location.reload();
  };

  const path = ""; // Define the appropriate path
  const message = "Address deleted successfully";

  const { mutate: deleteAddress } = useDeleteAddress(
    path,
    message,
    handleSuccess
  );

  const handleDelete = (id) => {
    setDeleteId(id);
    setConfirm("delete");
  };

  const confirmDelete = async () => {
    setIsConfirmLoading(true);
    try {
      if (typeof deleteAddress === "function") {
        await deleteAddress(deleteId);
      }
    } catch (error) {
      console.error("Error deleting address:", error);
    } finally {
      setIsConfirmLoading(false);
      setConfirm("");
    }
  };

  return (
    <>
      <CheckoutCard icon={<RiMapPinLine />}>
        <div className="checkout-title">
          <h4>
            {t(title)} {t("Address")}
          </h4>
          <a
            className="d-flex align-items-center fw-bold"
            onClick={() => isNewAdd(type)}
          >
            <RiAddLine className="me-1" />
            {t("AddNew")}
          </a>
        </div>
        <div className="checkout-detail">
          {address?.length > 0 ? (
            <Row className="g-4">
              {address.map((item, i) => (
                <div key={i}>
                  <ShowAddress item={item} type={type} index={i} />
                  <div className="p-top-left">
                    <a
                      className="d-flex align-items-center fw-bold mb-2 me-2"
                      onClick={() => isEditAdd(type, item)}
                    >
                      <RiEdit2Line className="me-1" />
                      {t("Edit")}
                    </a>
                    <a
                      className="d-flex align-items-center fw-bold mb-2 "
                      onClick={() => handleDelete(item?.id)}
                    >
                      <RiDeleteBinLine className="me-1" />
                      {t("Delete ")}
                    </a>
                  </div>
                </div>
              ))}
            </Row>
          ) : (
            <div className="empty-box">
              <h2>{t("NoaddressFound")}</h2>
            </div>
          )}
          <CustomModal
            modal={modal === type}
            setModal={setModal}
            classes={{
              modalClass: "theme-modal view-modal modal-lg",
              modalHeaderClass: "p-0",
            }}
          >
            <div className="right-sidebar-box">
              <AddAddressForm
                mutate={mutate}
                isLoading={isLoading}
                setModal={setModal}
                editAddress={isEdit && editAddress}
                isEdit={isEdit}
                type={type}
              />
            </div>
          </CustomModal>
          <ConfirmDeleteModal
            modal={confirmModal}
            setModal={setConfirm}
            loading={isConfirmLoading}
            confirmFunction={confirmDelete}
            setDeleteId={setDeleteId}
          />
        </div>
      </CheckoutCard>
    </>
  );
};

export default DeliveryAddress;
