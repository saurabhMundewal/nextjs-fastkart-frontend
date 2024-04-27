import { Form, Formik } from 'formik';
import { Col, Input, Label } from 'reactstrap';
import { useTranslation } from "react-i18next";
import { RegisterAPI } from '@/Utils/AxiosUtils/API';
import useCreate from '@/Utils/Hooks/useCreate';
import { YupObject, emailSchema, nameSchema, passwordConfirmationSchema, passwordSchema, phoneSchema, requiredSchema } from '@/Utils/Validation/ValidationSchemas';
import FormBtn from '@/Components/Common/FormBtn';
import SimpleInputField from '@/Components/Common/InputFields/SimpleInputField';
import { AllCountryCode } from '../../../../Data/AllCountryCode';
import SearchableSelectInput from '@/Components/Common/InputFields/SearchableSelectInput';

const RegisterForm = () => {
  const { t } = useTranslation('common');
  const { mutate, isLoading } = useCreate(RegisterAPI, false, `/account/dashboard`, 'Register Successfully');
 
  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        country_code: '91',
        phone: '',
      }}
      validationSchema={YupObject({
        name: nameSchema,
        email: emailSchema,
        password: passwordSchema,
        password_confirmation: passwordConfirmationSchema,
        phone: nameSchema,
      })}
      onSubmit={mutate}>
      {({ values, errors, touched, setFieldValue }) => (
        <Form className='row g-md-4 g-3'>
          
          <SimpleInputField
            nameList={[
              { name: 'name', placeholder: t('EmailAddress'), title: 'Name', label: 'FullName' },
              { name: 'email', placeholder: t('EmailAddress'), title: 'Email', label: 'EmailAddress' },
            ]}
          />
          <Col xs='12'>
            <div className='country-input'>
              <SearchableSelectInput
                nameList={[
                  {
                    name: 'country_code',
                    notitle: 'true',
                    inputprops: {
                      name: 'country_code',
                      id: 'country_code',
                      options: AllCountryCode,
                    },
                  },
                ]}
              />
              <SimpleInputField
                nameList={[
                  {
                    name: 'phone',
                    type: 'number',
                    placeholder: t('EnterPhoneNumber'),
                    colclass: 'country-input-box',
                    title: 'Phone',
                    label: 'Phone',
                  },
                ]}
              />
            </div>
          </Col>

          <SimpleInputField
            nameList={[
              { name: 'password', placeholder: t('Password'), type: 'password', title: 'Password', label: 'Password' },
              { name: 'password_confirmation', type: 'password', placeholder: t('ConfirmPassword'), title: 'ConfirmPassword', label: 'ConfirmPassword' },
            ]}
          />

          <Col xs={12}>
            <div className='forgot-box'>
              <div className='form-check remember-box'>
                <Input className='checkbox_animated check-box' type='checkbox' id='flexCheckDefault' name='termsCondition' value={!values?.termsCondition} required ={true} />
                <Label className='form-check-label'name='termsCondition' htmlFor='flexCheckDefault'>
                  {t('Iagreewith')}
                  <span>{t('Terms')}</span> {t('and')} <span>{t('Privacy')}</span>
                </Label>
              </div>
            </div>
          </Col>
          <FormBtn title={'SignUp'} classes={{ btnClass: 'btn btn-animation w-100' }} loading={isLoading} />
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
