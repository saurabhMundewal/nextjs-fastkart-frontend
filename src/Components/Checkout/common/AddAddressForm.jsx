import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import SelectForm from "./SelectForm";
import useUpdateAddress from "@/Utils/Hooks/useUpdateAddress";
import { CountryAPI } from "@/Utils/AxiosUtils/API";
import { useQuery } from "@tanstack/react-query";
import request from "@/Utils/AxiosUtils";
import {
  YupObject,
  nameSchema,
  phoneSchema,
} from "@/Utils/Validation/ValidationSchemas";

const AddAddressForm = ({
  mutate,
  isLoading,
  type,
  editAddress,
  setEditAddress,
  modal,
  setModal,
  isFooterDisplay,
  method,
  isEdit = false,
}) => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const { data } = useQuery(
    [CountryAPI],
    () => request({ url: CountryAPI }, router),
    {
      refetchOnWindowFocus: false,
      select: (res) =>
        res.data.map((country) => ({
          id: country.id,
          name: country.name,
          state: country.state,
        })),
    }
  );

  useEffect(() => {
    if (modal !== "edit" && setEditAddress) {
      setEditAddress({});
    }
  }, [modal]);

  const handleSuccess = () => {
    setModal(false);
    window.location.reload();
  };

  const path = ""; // Define the appropriate path
  const message = "Address updated successfully"; // Define the success message

  const { mutate: updateAddress } = useUpdateAddress(
    path,
    message,
    handleSuccess
  );

  return (
    <Formik
      initialValues={{
        title: editAddress ? editAddress?.title : "",
        street: editAddress ? editAddress?.street : "",
        country_id: editAddress ? editAddress?.country_id : "",
        state_id: editAddress ? editAddress?.state_id : "",
        city: editAddress ? editAddress?.city : "",
        pincode: editAddress ? editAddress?.pincode : "",
        phone: editAddress ? editAddress?.phone : "",
        type: type ? type : null,
        country_code: editAddress ? editAddress?.country_code : "91",
      }}
      validationSchema={YupObject({
        title: nameSchema,
        street: nameSchema,
        city: nameSchema,
        country_id: nameSchema,
        state_id: nameSchema,
        pincode: nameSchema,
        phone: phoneSchema,
      })}
      onSubmit={(values) => {
        if (isEdit) {
          updateAddress({ id: editAddress.id, values });
        } else {
          if (editAddress) {
            values["_method"] = method ? method : "PUT";
          }
          values["pincode"] = values["pincode"].toString();
          mutate(values);
        }
      }}
    >
      {({ values, setFieldValue }) => (
        <SelectForm
          values={values}
          setFieldValue={setFieldValue}
          setModal={setModal}
          isLoading={isLoading}
          data={data}
          isFooterDisplay={isFooterDisplay}
        />
      )}
    </Formik>
  );
};

export default AddAddressForm;
