import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';

import { footerMenuItems } from '../../../Data/FooterData';
import { usePathname } from 'next/navigation';

const MobileMenu = () => {
  
  const pathName = usePathname();
  const [active, setActive] = useState({});

  useEffect(() => {
    let newPath = pathName;
    if (pathName) {
      let found = false;
      footerMenuItems?.forEach((footerMenu) => {
        if (footerMenu?.path.toString() == newPath?.toString()) {
          setActive(footerMenu);
          found = true;
        }
      });
      if (!found) {
        setActive(''); // Set to an empty string if the path is not found
      }
    }
  }, [pathName,  footerMenuItems]);
  return (
    <div className='mobile-menu d-md-none d-block mobile-cart'>
      <ul>
        {footerMenuItems.map((data, index) => (
          <li className={`${active?.title == data?.title ? 'active' : ''} ${data.className ? data.className : ''}`} key={index} onClick={() => setActive(data)}>
            <Link href={`/${data.path}`}>
              {active?.title == data?.title ? data.fillIcon : data.lineIcon}
              <span>{data.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MobileMenu;
