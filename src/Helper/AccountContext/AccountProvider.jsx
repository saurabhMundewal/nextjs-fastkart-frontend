import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import AccountContext from '.';
import request from '../../Utils/AxiosUtils';
import { SelfAPI } from '@/Utils/AxiosUtils/API';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const AccountProvider = (props) => {
  const router = useRouter()
  const cookies = Cookies.get('uaf');
  const [mobileSideBar, setMobileSideBar] = useState(false);
  const [accountData, setAccountData] = useState();
  const { data, refetch, fetchStatus } = useQuery([SelfAPI], () => request({ url: SelfAPI },router), {
    enabled: false,
    select: (res) => {
      return res?.data;
    },
  });

  useEffect(() => {
    cookies && refetch();
  }, [cookies]);

  useEffect(() => {
    if (data) {
      setAccountData(data);
    }
  }, [fetchStatus == 'fetching', data]);

  return <AccountContext.Provider value={{ ...props, accountData, setAccountData, refetch, mobileSideBar, setMobileSideBar }}>{props.children}</AccountContext.Provider>;
};

export default AccountProvider;
