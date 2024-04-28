import { useContext } from 'react';
import { Form, Formik } from 'formik';
import SimpleInputField from '@/Components/Common/InputFields/SimpleInputField';

import useUpdatePassword, { UpdatePasswordSchema } from '@/Utils/Hooks/Auth/useUpdatePassword';
import { useTranslation } from "react-i18next";
import FormBtn from '@/Components/Common/FormBtn';

const UpdatePasswordForm = () => {
  
  const { t } = useTranslation( 'common');
  const { mutate, isLoading } = useUpdatePassword();
  return (
    <Formik
      initialValues={{
        password: '',
        password_confirmation: '',
      }}
      validationSchema={UpdatePasswordSchema}
      onSubmit={mutate}>
      {() => (
        <Form className='row g-2'>
          <SimpleInputField
            nameList={[
              { name: 'password', placeholder: t('EmailAddress'), title: 'Password',type: 'password', label: 'Password' },
              { name: 'password_confirmation', placeholder: t('EnterConfirmPassword'),type: 'password', title: 'ConfirmPassword', label: 'Confirm Password' },
            ]}
          />
          <FormBtn title={'ForgotPassword'} classes={{ btnClass: 'btn-animation w-100 justify-content-center' }} loading={isLoading} />
        </Form>
      )}
    </Formik>
  );
};

export default UpdatePasswordForm;
