import React, { useContext } from 'react';
import { RiTimeLine } from 'react-icons/ri';
import TopbarSlider from '../Common/TopbarSlider';
import Btn from '@/Elements/Buttons/Btn';

import { useTranslation } from "react-i18next";

const StandardTopbar = () => {
  
  const { t } = useTranslation( 'common');
  return (
    <div className='header-notification theme-bg-color overflow-hidden py-2'>
      <TopbarSlider customClassName='text-center' />
      <Btn className='btn close-notification'>
        <span>{t('Close')}</span> <RiTimeLine />
      </Btn>
    </div>
  );
};

export default StandardTopbar;
