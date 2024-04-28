import request from "@/Utils/AxiosUtils";
import { BrandAPI } from "@/Utils/AxiosUtils/API";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import BrandContext from ".";

const BrandProvider = (props) => {
  const router = useRouter();
  const [brandState, setBrandState] = useState([]);
  const [brandParams, setBrandParams] = useState("");
  const { data: BrandData, isLoading, refetch } = useQuery([BrandAPI], () => request({ url: BrandAPI, params: { status: 1 } }, router), { enabled: false, refetchOnWindowFocus: false, select: (res) => res?.data?.data });

  useEffect(() => {
    isLoading && refetch();
  }, [isLoading]);

  useEffect(() => {
    BrandData && setBrandState(BrandData);
  }, [isLoading]);

  const handleSetQueryParams = (value) => {
    setBrandParams(value);
  };

  return (
    <>
      <BrandContext.Provider value={{ handleSetQueryParams, brandParams, brandState, setBrandParams, brandContextLoader: isLoading, ...props }}>{props.children}</BrandContext.Provider>
    </>
  );
};

export default BrandProvider;
