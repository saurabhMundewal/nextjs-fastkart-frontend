import Btn from '@/Elements/Buttons/Btn';
import { OrderAPI } from '@/Utils/AxiosUtils/API';
import useCreate from '@/Utils/Hooks/useCreate';
import { useTranslation } from "react-i18next";
import { useRouter } from 'next/navigation';
import React, {  useContext, useState } from 'react';
import SettingContext from '@/Helper/SettingContext';
import Cookies from 'js-cookie';
import CartContext from '@/Helper/CartContext';


const PlaceOrder = ({ values }) => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { settingData } = useContext(SettingContext);
  const access_token = Cookies.get('uaf');
  const { cartProducts, setCartProducts } = useContext(CartContext);
  const [getOrderNumber, setGetOrderNumber] = useState('');
  const [errorOrder, setErrorOrder] = useState('');
 
  const { data, mutate, isLoading } = useCreate(OrderAPI, false, false, true, (resDta) => {
    if (resDta?.status == 200 || resDta?.status == 201) {
      resDta?.data?.order_number && setGetOrderNumber(resDta?.data?.order_number);
      if (values['payment_method'] == "cod" || values['payment_method'] == "bank_transfer" && !resDta?.data?.is_guest) {
        router.push(`/account/order/details/${resDta?.data?.order_number}`);
        setCartProducts([])
      } else if (values['payment_method'] == "cod" ||values['payment_method'] == "bank_transfer"  && resDta?.data?.is_guest) {
        const queryParams = new URLSearchParams({ order_number: resDta?.data?.order_number,email_or_phone: values?.email }).toString();
        router.push(`${'/order/details'}?${queryParams}`);
        setCartProducts([])
      } else {
        window.open(resDta?.data?.url, '_self');
      }
    }else{
      setErrorOrder(resDta?.data?.message);
    }
  });

  const handleClick = () => {
    if (settingData?.activation?.guest_checkout && !access_token) {
      values['products'] = cartProducts;
      values['products']?.length > 0 && mutate(values);
      // if (Object?.keys(errors).length == 0 && values['delivery_description'] && values['payment_method']) {
      //   values['products'] = cartProducts;
      //   values['products']?.length > 0 && mutate(values);
      // }
    } else {
      if (access_token &&   values['billing_address_id'] && values['shipping_address_id'] && values['delivery_description'] && values['payment_method']) {
        const targetObject = { 
          coupon:values['coupon'],
          billing_address_id: values['billing_address_id'],
          shipping_address_id: values['shipping_address_id'],
          delivery_description: values['delivery_description'],
          delivery_interval:values['delivery_interval'],
          points_amount:values['points_amount'],
          payment_method: values['payment_method'],
          products: values['products'] = cartProducts,
          wallet_balance:values['wallet_balance']
         };
        values['products']?.length > 0 && mutate(targetObject);
        if (isLoading) {
          setStoreCoupon('');
        }
      }
    }
  };
  return (
    <Btn className='btn-md fw-bold mt-4 text-white theme-bg-color w-100' loading={Number(isLoading)} onClick={handleClick}>
      {t('PlaceOrder')}
    </Btn>
  );
};

export default PlaceOrder;
