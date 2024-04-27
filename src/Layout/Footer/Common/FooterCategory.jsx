import { useContext } from 'react';
import Link from 'next/link';
import ThemeOptionContext from '@/Helper/ThemeOptionsContext';
import CategoryContext from '@/Helper/CategoryContext';
import NoDataFound from '@/Components/Common/NoDataFound';

const FooterCategory = () => {
  const { themeOption } = useContext(ThemeOptionContext);
  const { filterCategory } = useContext(CategoryContext);
  const categoryData = filterCategory('product');
  return (
        <ul>
          {themeOption?.footer?.footer_categories?.length > 0 ? (
            categoryData
              ?.filter((elem) => themeOption?.footer?.footer_categories.includes(elem.id))
              .map((result, i) => (
                <li key={i}>
                  <Link href={`/collections?category=${result?.slug}`} className='text-content-white'>
                    {result?.name}
                  </Link>
                </li>
              ))
          ) : (
            <NoDataFound
              data={{
                customClass: 'no-data-footer',
                title: 'No Category Found',
              }}
            />
          )}
        </ul>
  );
};

export default FooterCategory;
