"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import request from "../AxiosUtils";
import SuccessHandle from "../CustomFunctions/SuccessHandle";

const useDelete = (url, refetch, deleteMessageNotShow) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation((deleteId) => request({ url: `${url}/${deleteId}`, method: "delete" }, router), {
    onSuccess: (resData) => {
      SuccessHandle(resData, false, false, !deleteMessageNotShow ? "Deleted Successfully" : "");
      refetch && queryClient.invalidateQueries({ queryKey: [refetch] });
    },
  });
};

export default useDelete;
