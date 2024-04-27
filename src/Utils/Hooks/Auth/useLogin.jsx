import { useMutation } from '@tanstack/react-query';
import request from '../../AxiosUtils';
import {  CompareAPI, LoginAPI, SyncCart } from '../../AxiosUtils/API';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import Cookies from 'js-cookie';
import AccountContext from '@/Helper/AccountContext';
import CompareContext from '@/Helper/CompareContext';
import { useSearchParams } from 'next/navigation'
import useCreate from '../useCreate';
import CartContext from '@/Helper/CartContext';
import WishlistContext from '@/Helper/WishlistContext';

const transformLocalStorageData = (localStorageData) => {
  const transformedData = localStorageData?.map(item => ({
    product_id: item?.product_id,
    variation_id: item?.variation_id || '', 
    quantity:item?.quantity
  }));

  return transformedData
    
};
const LoginHandle = (responseData, router, refetch,compareRefetch,search,mutate,cartRefetch ,addToWishlist ,compareCartMutate) => {
  if (responseData.status === 200 || responseData.status === 201) {
    Cookies.set('uat', responseData.data?.access_token, { path: '/', expires: new Date(Date.now() + 24 * 60 * 6000) });
    const ISSERVER = typeof window === 'undefined';
    if (typeof window !== 'undefined') {
      Cookies.set('account', JSON.stringify(responseData.data));
      localStorage.setItem('account', JSON.stringify(responseData.data));
    }

    const oldCartValue = JSON.parse(localStorage.getItem('cart')).items;
    mutate(transformLocalStorageData(oldCartValue))
    refetch();
    compareRefetch()
    cartRefetch()
    search ? router.push(search) :router.push(`/account/dashboard`)
    Cookies.remove("CallBackUrl")
    const wishListID = Cookies.get('wishListID')
    const CompareId = Cookies.get('compareId')
    CompareId ? compareCartMutate({ product_id: CompareId }) : null
    const productObj ={ id : wishListID }
    wishListID ? addToWishlist(productObj) : null
    Cookies.remove("wishListID")
    Cookies.remove("compareId")
    localStorage.removeItem('cart');
  }
};

const useHandleLogin = () => {
  const { mutate } = useCreate(SyncCart, false, false, 'No',);
  const searchParams = useSearchParams()
  const { addToWishlist} = useContext(WishlistContext);
  const { mutate:compareCartMutate } = useCreate(CompareAPI, false, false, 'Added to Compare List');

  const CallBackUrl = Cookies.get('CallBackUrl')
  
  const { refetch } = useContext(AccountContext);
  const { refetch:cartRefetch } = useContext(CartContext);
  const { refetch:compareRefetch } = useContext(CompareContext);
  const router = useRouter();
  return useMutation(
    (data) =>
      request({
        url: LoginAPI,
        method: 'post',
        data,
      }),
    {
      onSuccess: (responseData) => LoginHandle(responseData, router, refetch,compareRefetch,CallBackUrl,mutate,cartRefetch ,addToWishlist ,compareCartMutate),
    },
  );
};

export default useHandleLogin;
