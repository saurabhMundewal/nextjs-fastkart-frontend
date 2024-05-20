import React, { useEffect, useState } from 'react';
import TaxContext from '.';
import { TaxAPI } from '@/Utils/AxiosUtils/API';
import { useQuery } from '@tanstack/react-query';
import request from '@/Utils/AxiosUtils';
import { useRouter } from 'next/navigation';

const TaxProvider = (props) => {
  const router = useRouter()
  const [taxState, setTaxState] = useState([]);
  const { data, isLoading, refetch } = useQuery([TaxAPI], () => request({ url: TaxAPI },router), { enabled: true, refetchOnWindowFocus: false, select: (res) => res?.data?.data });
  useEffect(() => {
    if (data) {
      setTaxState(data);
    }
  }, [isLoading]);

  return <TaxContext.Provider value={{ ...props, taxState }}>{props.children}</TaxContext.Provider>;
};

export default TaxProvider;
