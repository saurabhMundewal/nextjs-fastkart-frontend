import { useEffect, useState } from 'react';
import BrandContext from '.';
import { useQuery } from '@tanstack/react-query';
import { BrandAPI } from '@/Utils/AxiosUtils/API';
import request from '@/Utils/AxiosUtils';

const BrandProvider = (props) => {
  const [brandState, setBrandState] = useState([]);
  const [brandParams, setBrandParams] = useState('');
  const { data: BrandData, isLoading, refetch } = useQuery([BrandAPI], () => request({ url: BrandAPI }), { enabled: true, refetchOnWindowFocus: false, select: (res) => res?.data?.data });

  useEffect(() => {
    refetch()
  }, []);

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
