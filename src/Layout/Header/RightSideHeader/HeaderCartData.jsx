import React, { useContext, useEffect, useState } from 'react';
import { RiCloseLine } from 'react-icons/ri';
import CartContext from '@/Helper/CartContext';
import { useTranslation } from "react-i18next";
import ThemeOptionContext from '@/Helper/ThemeOptionsContext';
import SettingContext from '@/Helper/SettingContext';
import HeaderCartBottom from './HeaderCartBottom';

const HeaderCartData = ({ cartStyle }) => {
  const { themeOption, setCartCanvas, cartCanvas } = useContext(ThemeOptionContext);
  const { settingData } = useContext(SettingContext);
  const { cartProducts, getTotal } = useContext(CartContext);
  const { t } = useTranslation('common');

  const [shippingCal, setShippingCal] = useState(0);
  const [shippingFreeAmt, setShippingFreeAmt] = useState(0);
  const [confetti, setConfetti] = useState(0);
  const confettiItems = Array.from({ length: 150 }, (_, index) => index);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    setShippingFreeAmt(settingData?.general?.min_order_free_shipping);
    cartProducts?.forEach(elem => {
      if (elem?.variation) {
        elem.variation.selected_variation = elem?.variation?.attribute_values?.map(values => values.value).join('/');
      }
    });
  }, [cartProducts, settingData]);

  useEffect(() => {
    const tempCal = (getTotal(cartProducts) * 100) / (settingData?.general?.min_order_free_shipping || shippingFreeAmt);
    let tempConfetti = confetti;
    let timer;
    if (tempCal > 100) {
      setConfetti(1);
      timer = setTimeout(() => {
        setConfetti(2);
      }, 4500);
    } else {
      // tempConfetti = 0;
      setConfetti(0);
    }
    setShippingCal(tempCal);
    return () => clearTimeout(timer);
  }, [getTotal(cartProducts), shippingFreeAmt, cartProducts, settingData]);

  return (
    <>
      <div className={`onhover-div ${cartStyle === 'cart_sidebar' ? 'fixed-cart' : ''} ${cartCanvas ? 'show' : ''}`}>
        <div className='cart-title'>
          <h4>{t('ShoppingCart')}</h4>
          <a onClick={() => setCartCanvas(prev => !prev)}>
            <RiCloseLine />
          </a>
        </div>
        <HeaderCartBottom modal={modal} setModal={setModal} shippingCal={shippingCal} shippingFreeAmt={shippingFreeAmt} />
      </div>
      {themeOption?.general?.celebration_effect && confetti === 1 && cartCanvas && (
        <div className="confetti-wrapper show">
          {confettiItems.map((elem, i) => (
            <div className={`confetti-${elem}`} key={i}></div>
          ))}
        </div>
      )}
    </>
  );
};

export default HeaderCartData;
