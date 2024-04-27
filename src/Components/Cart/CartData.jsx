import { useContext } from 'react';
import HandleQuantity from './HandleQuantity';
import CartContext from '@/Helper/CartContext';
import CartProductDetail from './CartProductDetail';
import { useTranslation } from "react-i18next";
import SettingContext from '@/Helper/SettingContext';
import useCreate from '@/Utils/Hooks/useCreate';
import { AddToCartAPI, WishlistAPI } from '@/Utils/AxiosUtils/API';
import { ToastNotification } from '@/Utils/CustomFunctions/ToastNotification';
import Cookies from 'js-cookie';
import useDelete from '@/Utils/Hooks/useDelete';

const CartData = ({ elem }) => {
  const { t } = useTranslation('common');
  const { cartProducts, setCartProducts, removeCart } = useContext(CartContext);
  const { convertCurrency } = useContext(SettingContext);
  const { mutate } = useCreate(WishlistAPI, false,);
  const isCookie = Cookies.get('uat');
  const { mutate: deleteCart } = useDelete(AddToCartAPI, false, true);

  const saveForLater = (product_id, id) => {
    const updatedCart = cartProducts?.filter((item) => item.product_id !== id);
    setCartProducts(updatedCart);

    if (isCookie && id) {
      deleteCart(id);
    }
  }
  return (
    <tr className='product-box-contain'>
      <CartProductDetail elem={elem} />

      <td className='price'>
        <h4 className='table-title text-content'>{t('Price')}</h4>
        <h5>
          {convertCurrency(elem?.product?.sale_price)}
          {
            elem?.product?.discount || elem?.product?.discount ? (
              <del className='text-content'>{convertCurrency(elem?.product?.price)}</del>
            ) : null
          }
        </h5>
      </td>

       <td className='quantity'>
        <h4 className='table-title text-content'>{t('Quantity')}</h4>
        <div className='quantity-price'>
          <HandleQuantity productObj={elem?.product} classes={{ customClass: 'quantity-price' }} elem={elem} />
        </div>
      </td>

      <td className='subtotal'>
        <h4 className='table-title text-content'>{t('Total')}</h4>
        <h5>{convertCurrency(elem?.sub_total)}</h5>
      </td>

      <td className='save-remove'>
        <h4 className='table-title text-content'>{t('Action')}</h4>
        <a className='save notifi-wishlist' onClick={() => saveForLater(elem.product_id, elem?.id)}>{t('Saveforlater')}</a>
        <a className='remove close_button' onClick={() => removeCart(elem.product_id, elem?.id)}>
          {t('Remove')}
        </a>
      </td>
    </tr>
  );
};

export default CartData;
