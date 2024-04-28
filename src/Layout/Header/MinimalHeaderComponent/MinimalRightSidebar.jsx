import Link from 'next/link';
import { optionListMinimal } from '../../../../Data/CustomData';
import { Fragment, useContext, useMemo } from 'react';
import { useTranslation } from "react-i18next";
import CartContext from '@/Helper/CartContext';
import ThemeOptionContext from '@/Helper/ThemeOptionsContext';
import HeaderCartData from '../RightSideHeader/HeaderCartData';
import HeaderProfile from '../RightSideHeader/HeaderProfile';

const MinimalRightSidebar = ({setSearchBarOpen}) => {
  const { t } = useTranslation('common');
  const { cartProducts } = useContext(CartContext);
  const { themeOption, cartCanvas, setCartCanvas } = useContext(ThemeOptionContext);
  const cartStyle = useMemo(() => {
    return themeOption?.general?.cart_style ? themeOption?.general?.cart_style : 'cart_sidebar';
  });
  return (
    <div className='rightside-menu'>
      <ul className='option-list-2'>
        {optionListMinimal.map((elem, i) => (
          <Fragment key={i}>
            <li className='onhover-dropdown' onClick={() => {elem?.isBadge && cartStyle == 'cart_sidebar' && setCartCanvas(!cartCanvas); elem?.searchIcon ? setSearchBarOpen(prev=>!prev) :null }  }>
              {elem?.path ? (
                <Link href={`${elem?.path}`} className={`header-icon ${elem?.customClass ? elem?.customClass : ''}`}>
                  {elem.icon}
                </Link>
              ) : (
                <a className={`header-icon ${elem?.customClass ? elem?.customClass : ''}`}>
                  {elem?.isBadge && cartProducts?.length > 0 && <small className='badge-number badge-light'>{cartProducts?.length}</small>}
                  {elem.icon}
                </a>
              )}
              {elem.isBadge && <HeaderCartData cartStyle={cartStyle} />}
            </li>
          </Fragment>
        ))}
        <HeaderProfile extraClass="header-icon" />
      </ul>
    </div>
  );
};

export default MinimalRightSidebar;
