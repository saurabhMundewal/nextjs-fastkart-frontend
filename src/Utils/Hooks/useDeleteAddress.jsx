// utils/Hooks/useDeleteAddress.js
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import request from "../AxiosUtils";
import SuccessHandle from "../CustomFunctions/SuccessHandle";
import { AddressAPI } from "@/Utils/AxiosUtils/API";

const useDeleteAddress = (path, message, successHandler) => {
  const router = useRouter();
  return useMutation(
    (id) => request({ url: `${AddressAPI}/${id}`, method: "delete" }, router),
    {
      onSuccess: (resData) => {
        SuccessHandle(resData, router, path, message);
        successHandler && successHandler();
      },
      onError: (error) => {
        console.error('Error deleting address:', error);
      },
    }
  );
};

export default useDeleteAddress;
