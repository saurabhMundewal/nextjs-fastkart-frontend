import React, { useEffect, useState } from 'react';
import CurrencyContext from '.';
import { CurrencyAPI } from '@/Utils/AxiosUtils/API';
import { useQuery } from '@tanstack/react-query';
import request from '@/Utils/AxiosUtils';
import { useRouter } from 'next/navigation';

const CurrencyProvider = (props) => {
  const router = useRouter()
  const [currencyState, setCurrencyState] = useState([]);
  const { data, isLoading, refetch } = useQuery([CurrencyAPI], () => request({ url: CurrencyAPI },router), { enabled: true, refetchOnWindowFocus: false, select: (res) => res?.data?.data });
  useEffect(() => {
    if (data) {
      setCurrencyState(data);
    }
  }, [isLoading]);

  return <CurrencyContext.Provider value={{ ...props, currencyState }}>{props.children}</CurrencyContext.Provider>;
};

export default CurrencyProvider;
