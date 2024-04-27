import request from '@/Utils/AxiosUtils';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import MenuList from './MenuList';
import { MenuAPI } from '@/Utils/AxiosUtils/API';
import MenuSkeleton from '@/Components/Common/SkeletonLoader/MenuSkeleton';

const MainHeaderMenu = () => {
  const [isOpen, setIsOpen] = useState([]);
  const { data: menuData, refetch: productRefetch, isLoading: menuIsLoading, } = useQuery([MenuAPI],
    () => request({ url: MenuAPI }), { enabled: false, refetchOnWindowFocus: false, select: (data) => data.data.data, },
  );
  useEffect(() => {
    productRefetch()
  }, [])
  return (
    <>
      {menuIsLoading ? (
        <MenuSkeleton />
      ) : menuData?.length > 0 && (
        <ul className='navbar-nav'>
          {menuData?.map((menu, i) => (
            <MenuList menu={menu} key={i} customClass={`${!menu?.path ? "dropdown" : ""} nav-item `} level={0} isOpen={isOpen} setIsOpen={setIsOpen} />
          ))}
        </ul>
      )
      }

    </>
  );
};

export default MainHeaderMenu;
