import request from "@/Utils/AxiosUtils";
import { CompareAPI } from "@/Utils/AxiosUtils/API";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CompareContext from ".";

const CompareProvider = (props) => {
  const cookieUAT = Cookies.get("uaf");
  const router = useRouter();
  const [compareState, setCompareState] = useState([]);
  const { data: CompareData, isLoading: getCompareLoading, refetch } = useQuery([CompareAPI], () => request({ url: CompareAPI }, router), { enabled: false, refetchOnWindowFocus: false, select: (res) => res?.data?.data });
  useEffect(() => {
    if (cookieUAT) {
      refetch();
    }
  }, [cookieUAT]);
  useEffect(() => {
    if (CompareData) {
      setCompareState([...compareState, ...CompareData]);
    }
  }, [getCompareLoading]);
  return <CompareContext.Provider value={{ ...props, compareState, setCompareState, refetch }}>{props.children}</CompareContext.Provider>;
};

export default CompareProvider;
