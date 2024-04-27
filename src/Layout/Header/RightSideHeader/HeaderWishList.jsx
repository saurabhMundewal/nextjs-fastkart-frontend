
import Link from 'next/link';
import { useContext } from 'react';
import { RiHeartLine } from 'react-icons/ri';

const HeaderWishList = ({ wishListIcon }) => {
  
  return (
    <li className='right-side'>
      <Link href={`/wishlist`} className='btn p-0 position-relative header-wishlist'>
        {wishListIcon ? wishListIcon : <RiHeartLine />}
      </Link>
    </li>
  );
};

export default HeaderWishList;
