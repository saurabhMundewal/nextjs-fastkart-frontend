import { useContext } from 'react';
import Link from 'next/link';
import ThemeOptionContext from '@/Helper/ThemeOptionsContext';
import NoDataFound from '@/Components/Common/NoDataFound';

const FooterLink = ({useFull_Link=true}) => {
    const { themeOption } = useContext(ThemeOptionContext);
    return (
        <>
      {useFull_Link ? ( <ul>
            {themeOption?.footer?.useful_link?.length > 0 && (
                themeOption?.footer?.useful_link?.map((elem, i) => (
                    <li key={i}>
                        <Link href={`/${elem.value}`} className='text-content-white text-capitalize'>
                            {elem.name}
                        </Link>
                    </li>
                ))                
            )} 
            <li key={'privacy'}>
                        <Link href={`/pages/privacy-policy`} className='text-content-white text-capitalize'>
                            {'Privacy Policy'}
                        </Link>
                    </li>
                    <li key={'Return'}>
                    <Link href={`/pages/return-and-refund-policy`} className='text-content-white text-capitalize'>
                        {'Return Policy'}
                    </Link>
                </li>
                  <li key={'Terms and Conditions'}>
                  <Link href={`/pages/terms-and-conditions`} className='text-content-white text-capitalize'>
                      {'Terms and Conditions'}
                  </Link>
              </li>             
        </ul>):
        <ul>
         {themeOption?.footer?.help_center?.length > 0 ? (
             themeOption?.footer?.help_center?.map((elem, i) => (
                 <li key={i}>
                     <Link href={`/${elem.value}`} className='text-content-white text-capitalize'>
                         {elem.name}
                     </Link>
                 </li>
             ))
         ) : (
             <NoDataFound
                 data={{
                     customClass: 'no-data-footer',
                     title: 'No Link Found',
                 }}
             />
         )}
     </ul>}
     </>
    );
};

export default FooterLink;
