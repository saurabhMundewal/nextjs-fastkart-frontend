import Image from 'next/image';
import React, { useContext } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { placeHolderImage } from '../../../../Data/CommonPath';
import CategoryContext from '@/Helper/CategoryContext';
import { useCustomSearchParams } from '@/Utils/Hooks/useCustomSearchParams';
import { useTranslation } from "react-i18next";
import { usePathname, useRouter } from 'next/navigation';
import NoDataFound from '@/Components/Common/NoDataFound';
import ThemeOptionContext from '@/Helper/ThemeOptionsContext';

const LeftCategory = ({ filter, setFilter }) => {
  const { filterCategory } = useContext(CategoryContext);
  const categoryData = filterCategory('product');
  const { themeOption } = useContext(ThemeOptionContext);
  const [layout] = useCustomSearchParams(['layout']);
  const { t } = useTranslation( 'common');
  const router = useRouter();
  const pathname = usePathname();
  const redirectToCollection = (slug) => {
    let temp = [...filter?.category];
    if (!temp.includes(slug)) {
      temp.push(slug);
    } else {
      temp = temp.filter((elem) => elem !== slug);
    }
    setFilter((prev) => {
      return {
        ...prev,
        category: temp,
      };
    });
    if (temp.length > 0) {
      const queryParams = new URLSearchParams({ ...layout, category: temp }).toString();
      router.push(`${pathname}?${queryParams}`);
    } else {
      const queryParams = new URLSearchParams({ ...layout }).toString();
      router.push(`${pathname}?${queryParams}`);
    }
  };
  return (
    <div className='col-custome-3'>
      <div className='left-box'>
        <div className='shop-left-sidebar'>
          {categoryData?.length > 0 ? (
            <Nav className='nav-pills mb-3 custom-nav-tab'>
              {categoryData?.filter((data,i)=>themeOption?.collection?.collection_categories_ids?.includes(data?.id))?.map((category, i) => (
                <NavItem onClick={() => redirectToCollection(category?.slug)} key={i}>
                  <NavLink className={filter?.category?.includes(category?.slug) ? 'active' : ''}>
                    {category?.name}
                    {category?.category_icon?.original_url && <Image src={category?.category_icon?.original_url || placeHolderImage} alt={category?.name} height={80} width={80} />}
                  </NavLink>
                </NavItem>
              ))}
            </Nav>
          ) : (
            <NoDataFound data={{ customClass: 'bg-light no-data-added', title: 'No Category Found' }} />
          )}
        </div>
      </div>
    </div>
  );
};

export default LeftCategory;
