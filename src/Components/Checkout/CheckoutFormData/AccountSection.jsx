import SearchableSelectInput from '@/Components/Common/InputFields/SearchableSelectInput';
import SimpleInputField from '@/Components/Common/InputFields/SimpleInputField';
import { Col, Input, Label, Row } from 'reactstrap';
import { AllCountryCode } from '../../../../Data/AllCountryCode';
import { useTranslation } from "react-i18next";
import React from 'react';

const AccountSection = ({ values, setFieldValue, }) => {
    const { t } = useTranslation( 'common');
    return (
        <div className="checkbox-main-box">
            <div className="checkout-title1">
                <h2>{'Account Details'}</h2>
            </div>
            <Row>
                <Col md={4}>
                    <div className='mb-3 form-box'>
                        <SimpleInputField
                            nameList={[
                                { name: 'name', placeholder: t('EnterName'), toplabel: 'Name' , require:'true'}]} />
                    </div>
                </Col>
                <Col md={4}>
                    <div className='mb-3 form-box'>
                        <SimpleInputField
                            nameList={[
                                { name: 'email', placeholder: t('EnterEmail'), toplabel: 'Email', require:'true' }]} />
                    </div>
                </Col>
                <Col md={4} className='phone-field'>
                    <div className='form-box position-relative'>
                        <div className='country-input'>
                            <SimpleInputField
                                nameList={[{ name: 'phone', type: 'number', placeholder: t('EnterPhoneNumber'), require: 'true', toplabel: 'Phone', colprops: { xs: 12 }, colclass: 'country-input-box' }]}
                            />
                            <SearchableSelectInput
                                nameList={[
                                    {
                                        name: 'country_code',
                                        notitle: 'true',
                                        inputprops: {
                                            name: 'country_code',
                                            id: 'country_code',
                                            options: AllCountryCode
                                            ,
                                        },
                                    },
                                ]}
                            />
                        </div>
                    </div>
                </Col>

                <Col md={12}>
                    <div className='mb-3 form-box form-checkbox'> 
                        <Input className='checkbox_animated check-box' type='checkbox' name='create_account' onChange={(e) => {setFieldValue('create_account', e.target.checked);  }} checked={values.create_account} />
                        <Label className='form-check-label' htmlFor='flexCheckDefault'>
                            {t('Create an account ?')}
                        </Label>
                    </div>
                </Col>

                {values.create_account &&
                    <Col md={6}>
                        <div className='mb-3 form-box'>
                            <SimpleInputField
                                nameList={[
                                    { name: 'password', placeholder: t('EnterPassword'), type: 'password', title: 'Password', toplabel: 'Password', require: 'true' },
                                ]}
                            />
                        </div>
                    </Col>
                }
            </Row>
        </div>
    );
};

export default AccountSection;
