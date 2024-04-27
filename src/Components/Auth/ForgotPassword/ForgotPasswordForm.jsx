import { useContext } from 'react';
import { Form, Formik } from 'formik';
import FormBtn from '@/Components/Common/FormBtn';
import SimpleInputField from '@/Components/Common/InputFields/SimpleInputField';
import useHandleForgotPassword, { ForgotPasswordSchema } from '@/Utils/Hooks/Auth/useForgotPassword';
import { useTranslation } from "react-i18next";

const ForgotPasswordForm = () => {
  const { t } = useTranslation( 'common');
  const { mutate, isLoading } = useHandleForgotPassword();
  return (
    <>
      <Formik
        initialValues={{
          email: '',
        }}
        validationSchema={ForgotPasswordSchema}
        onSubmit={(values) => mutate(values)}>
        {() => (
          <Form className='row g-4'>
            <SimpleInputField nameList={[{ name: 'email', placeholder: t('EmailAddress'), title: 'Email', label: 'Email Address' }]} />
            <FormBtn title={'ForgotPassword'} classes={{ btnClass: 'btn-animation w-100 justify-content-center' }} loading={isLoading} />
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ForgotPasswordForm;
