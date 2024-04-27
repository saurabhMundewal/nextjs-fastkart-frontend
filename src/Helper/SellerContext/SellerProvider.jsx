import { useEffect, useState } from 'react';
import SellerContext from '.';
import { useQuery } from '@tanstack/react-query';
import { StoreAPI } from '@/Utils/AxiosUtils/API';
import request from '@/Utils/AxiosUtils';

const SellerProvider = (props) => {
  const [getSellerIds, setGetSellerIds] = useState({});
  const [filterStore, setFilteredStore] = useState([]);
  const { data, isLoading, refetch } = useQuery([StoreAPI,getSellerIds.ids], () => request({ url: StoreAPI, params: { ...getSellerIds, status: 1 }}), { enabled: false, refetchOnWindowFocus: false, select: (res) => res?.data?.data });

  useEffect(() => {
    Object.keys(getSellerIds).length > 0  &&  refetch()
  }, [getSellerIds?.ids]);

  useEffect(() => {
    if (data) {
      setFilteredStore((prev) => data);
    }
  }, [isLoading, getSellerIds]);

  return (
      <SellerContext.Provider value={{ ...props, filterStore, setGetSellerIds, isLoading}}>{props.children}</SellerContext.Provider> 
  );
};

export default SellerProvider;
