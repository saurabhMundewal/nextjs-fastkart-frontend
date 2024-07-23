// utils/Hooks/useUpdateAddress.js
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import request from "../AxiosUtils";
import SuccessHandle from "../CustomFunctions/SuccessHandle";
import { AddressAPI } from '@/Utils/AxiosUtils/API';

const useUpdateAddress = (path, message, successHandler) => {
  const router = useRouter();
  return useMutation(
    ({ id, values }) => request({ url: `${AddressAPI}/${id}`, method: "put", data: values }, router),
    {
      onSuccess: (resData) => {
        SuccessHandle(resData, router, path, message);
        successHandler && successHandler();
      },
    }
  );
};

export default useUpdateAddress;
