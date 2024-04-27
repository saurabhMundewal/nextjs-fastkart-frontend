'use client';
import React, { useContext } from 'react';
import { AccordionBody, AccordionHeader, AccordionItem } from 'reactstrap';

import { useTranslation } from "react-i18next";
import CategoryContext from '@/Helper/CategoryContext';
import Link from 'next/link';
import NoDataFound from '@/Components/Common/NoDataFound';

const Category = () => {
  
  const { t } = useTranslation( 'common');
  const { filterCategory } = useContext(CategoryContext);
  const categoryData = filterCategory('post');
  return (
    <AccordionItem>
      <AccordionHeader targetId='2'>{t('Category')}</AccordionHeader>
      <AccordionBody accordionId='2' className='p-0'>
        <div className='category-list-box'>
          {categoryData?.length > 0 ? (
            <ul>
              {categoryData?.map((category, index) => (
                <li key={index}>
                  <Link href={{ pathname: `/blogs`, query: { category: category?.slug } }}>
                    <div className='category-name'>
                      <h5>{category.name}</h5>
                      <span>({category?.blogs_count})</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <NoDataFound data={{ customClass: 'bg-light no-data-added', title: 'No Category Found' }} />
          )}
        </div>
      </AccordionBody>
    </AccordionItem>
  );
};

export default Category;
