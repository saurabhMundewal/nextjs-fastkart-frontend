import React, { useContext } from 'react';
import Btn from '@/Elements/Buttons/Btn';
import CategoryContext from '@/Helper/CategoryContext';

import { useTranslation } from "react-i18next";
import ProductContext from '@/Helper/ProductContext';

const CategoryDropdown = ({selectedValue,setSelectedValue,setPaginate}) => {
  const { setSearchWithCategory } = useContext(ProductContext);
  const { filterCategory } = useContext(CategoryContext);
  const categoryData = filterCategory('product');
  
  const { t } = useTranslation( 'common');
  return (
    <>
      <Btn className='location-button'>
        <select className='form-select locat-name' value={selectedValue} onChange={(e) => {setSelectedValue(e.target.value) ; setSearchWithCategory(e.target.value);   setPaginate(null)}}>
          <option>{t("AllCategory")}</option>
          {categoryData?.map((category, i) => (
            <option value={category?.id} key={i}>{category.name}</option>
          ))}
        </select>
      </Btn>
    </>
  );
};

export default CategoryDropdown;
