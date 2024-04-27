'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Col } from 'reactstrap';
import WrapperComponent from '@/Components/Common/WrapperComponent';
import AuthHeadings from '../Common/AuthHeadings';
import loginImage from '../../../../public/assets/images/inner-page/log-in.png';
import { useTranslation } from "react-i18next";
import LoginForm from './LoginForm';
import Breadcrumb from '@/Components/Common/Breadcrumb';
import SettingContext from '@/Helper/SettingContext';
import { useContext } from 'react';


const LoginContent = () => {
  const { t } = useTranslation( 'common');
  const { settingData } = useContext(SettingContext);
  return (
    <>
      <Breadcrumb title={'Login'} subNavigation={[{ name: 'Login' }]} />
      <WrapperComponent classes={{ sectionClass: 'log-in-section background-image-2 section-b-space', fluidClass: 'w-100' }} customCol={true}>
        <Col xxl={6} xl={5} lg={6} className='d-lg-block d-none ms-auto'>
          <div className='image-contain'>
         {loginImage &&   <Image src={loginImage} className='img-fluid' alt='loginImage' height={465} width={550} />}
          </div>
        </Col>

        <Col xxl={4} xl={5} lg={6} sm={8} className='mx-auto'>
          <div className='log-in-box'>
            <AuthHeadings heading1={`Welcome to ${settingData?.general?.site_name}`} heading2={'LogInYourAccount'} />

            <div className='input-box'>
              <LoginForm />
            </div>

            <div className='other-log-in'>
              <h6>{t('or')}</h6>
            </div>

            <div className='sign-up-box'>
              <h4>{t("Don'thaveanaccount")}?</h4>
              <Link href={`/auth/register`}>{t('SignUp')}</Link>
            </div>
          </div>
        </Col>
      </WrapperComponent>
    </>
  );
};

export default LoginContent;
