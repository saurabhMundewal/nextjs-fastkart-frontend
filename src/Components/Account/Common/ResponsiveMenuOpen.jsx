import Btn from '@/Elements/Buttons/Btn';
import AccountContext from '@/Helper/AccountContext';

import { useTranslation } from "react-i18next";
import { useContext } from 'react';

const ResponsiveMenuOpen = () => {
  const { mobileSideBar, setMobileSideBar } = useContext(AccountContext);
  
  const { t } = useTranslation( 'common');
  return <Btn className='btn left-dashboard-show btn-animation btn-md fw-bold d-block mb-4 d-lg-none' onClick={()=>setMobileSideBar(!mobileSideBar)}>{t('ShowMenu')}</Btn>;
};

export default ResponsiveMenuOpen;
