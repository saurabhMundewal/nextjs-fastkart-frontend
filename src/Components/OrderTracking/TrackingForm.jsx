import { Form, Formik } from 'formik';
import { Col } from 'reactstrap';
import FormBtn from '@/Components/Common/FormBtn';
import SimpleInputField from '@/Components/Common/InputFields/SimpleInputField';
import useHandleLogin from '@/Utils/Hooks/Auth/useLogin';
import { useTranslation } from "react-i18next";
import { YupObject, emailSchema, nameSchema } from '@/Utils/Validation/ValidationSchemas';

const TrackingForm = () => {
  const { t } = useTranslation('common');
  const { mutate, isLoading } = useHandleLogin();
  return (
    <Formik
      initialValues={{
        order_number: 'john.customer@example.com',
        email_or_phone: '123456789',
      }}
      validationSchema={YupObject({
        email_or_phone: emailSchema,
        order_number: nameSchema,
      })}
      onSubmit={mutate}>
      {({ errors, touched, setFieldValue }) => (
        <Form className='row g-4'>
          <SimpleInputField
            nameList={[
              { name: 'order_number', placeholder: t('Order Number'), title: 'Order Number', label: 'Email Address' },
              { name: 'email_or_phone', placeholder: t('Enter Email or Phone'), title: 'Email or Phone', label: 'Email Address' },
            ]}
          />

          <Col>
            <FormBtn title={'Track'} classes={{ btnClass: 'btn btn-animation w-100' }} loading={isLoading} />
          </Col>
        </Form>
      )}
    </Formik>
  );
};

export default TrackingForm;
