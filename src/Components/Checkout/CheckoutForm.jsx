import { Form } from 'formik';
import { useContext, useEffect, useState } from 'react';
import AccountContext from '@/Helper/AccountContext';
import { useTranslation } from 'react-i18next';
import AccountSection from './CheckoutFormData/AccountSection';
import DeliverySection from './CheckoutFormData/DeliverySection';
import PaymentSection from './CheckoutFormData/PaymentSection';
import { useQuery } from '@tanstack/react-query';
import { CountryAPI } from '@/Utils/AxiosUtils/API';
import request from '@/Utils/AxiosUtils';
import ShippingAddressForm from './CheckoutFormData/ShippingAddressForm';
import BillingAddressForm from './CheckoutFormData/BillingAddressForm';


const CheckoutForm = ({ values, setFieldValue ,errors }) => {
  const { accountData, refetch } = useContext(AccountContext);
  const { t } = useTranslation( 'common');
  const [address, setAddress] = useState([]);

  useEffect(() => {
    accountData?.address.length > 0 && setAddress((prev) => [...accountData?.address]);
  }, [accountData]);

  const { data } = useQuery([CountryAPI], () => request({ url: CountryAPI }), {
    refetchOnWindowFocus: false,
    select: (res) => res.data.map((country) => ({ id: country.id, name: country.name, state: country.state })),
  });

  return (
    <>
           {/* <Form className='checkout-form row'> */}
           <AccountSection setFieldValue={setFieldValue}  values={values} />
           <ShippingAddressForm setFieldValue={setFieldValue}  errors={errors} data={data} values={values} />
           <BillingAddressForm setFieldValue={setFieldValue}   errors={errors} data={data} values={values} />
           <DeliverySection values={values} setFieldValue={setFieldValue} />
           <PaymentSection values={values} setFieldValue={setFieldValue} />
          {/* </Form> */}
    </>
  );
};

export default CheckoutForm;
