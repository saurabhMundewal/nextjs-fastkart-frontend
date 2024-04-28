import { Form, Formik } from 'formik';
import { Col } from 'reactstrap';
import FormBtn from '@/Components/Common/FormBtn';
import SimpleInputField from '@/Components/Common/InputFields/SimpleInputField';
import { useTranslation } from "react-i18next";
import { useRouter } from 'next/navigation';
import { YupObject, emailSchema, nameSchema } from '@/Utils/Validation/ValidationSchemas';



const TrackingForm = () => {
  const { t } = useTranslation('common');
  const router = useRouter();

  const onSubmit = (values) => {
    const queryParams = new URLSearchParams({
      order_number: values?.order_number,
      email_or_phone: values?.email_or_phone,
    });
    router.push(`${'/order/details'}?${queryParams}`);
  };

  return (
    <Formik
      initialValues={{
        order_number: '',
        email_or_phone: '',
      }}
      validationSchema={YupObject({
        email_or_phone: nameSchema,
        order_number: nameSchema,
      })}
      onSubmit={onSubmit}>
      {({ errors, touched, setFieldValue }) => (
        <Form className='row g-4'>
          <SimpleInputField
            nameList={[
              { name: 'order_number', placeholder: t('Order Number'), title: 'Order Number', label: 'Order Number' },
              { name: 'email_or_phone', placeholder: t('Enter Email or Phone'), title: 'Email or Phone', label: 'Enter Email or Phone' },
            ]}
          />

          <Col>
            <FormBtn title={'Track'} classes={{ btnClass: 'btn btn-animation w-100' }} loading="" />
          </Col>
        </Form>
      )}
    </Formik>
  );
};

export default TrackingForm;
