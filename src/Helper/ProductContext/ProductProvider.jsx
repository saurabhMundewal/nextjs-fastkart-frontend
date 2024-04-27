import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import request from '@/Utils/AxiosUtils';
import { ProductAPI, ProductSearchAPI } from '@/Utils/AxiosUtils/API';
import ProductContext from '.';

const ProductProvider = (props) => {
  const [customProduct, setCustomProduct] = useState([]);
  const [searchWithCategory, setSearchWithCategory] = useState("");
  
  const [totalDealIds, setTotalDealIds] = useState('');
  const [productAPIData, setProductAPIData] = useState({ data: [], refetchProduct: '', params: { ...totalDealIds }, productIsLoading: false });
  const {
    data: productData,
    refetch: productRefetch,
    isLoading: productIsLoading,
  } = useQuery(
    [ProductAPI],
    () => request({ url: ProductAPI, params: { ...productAPIData.params, ids: totalDealIds, status: 1, paginate: Object.keys(totalDealIds).length > 5 ? Object.keys(totalDealIds).length : 5 } }),
    {
      enabled: false,
      refetchOnWindowFocus: false,
      select: (data) => data.data.data,
    },
  );  
  const { data: searchListData, isLoading: searchListIsLoading,refetch } = useQuery([ProductSearchAPI], () =>
    request({ url: ProductSearchAPI ,params:{category_id:searchWithCategory?searchWithCategory === "All Category" ? null :searchWithCategory:null,status:searchWithCategory?1:null} }),{enabled: true,refetchOnWindowFocus: false,select: (data) =>data.data.map((item) => ({original_url: item?.product_thumbnail?.original_url,title: item.name,slug: item.slug,categories:item?.categories})),}
  );

 
  useEffect(()=>{
    if (searchWithCategory !== "" && !searchListIsLoading ) {
      refetch()
    }
  },[searchWithCategory])

  useEffect(() => {
    if (productData) {
      setProductAPIData((prev) => ({ ...prev, data: productData, productIsLoading: productIsLoading }));
    }
  }, [productData]);
  return (
    <ProductContext.Provider value={{ ...props, searchWithCategory, setSearchWithCategory, productAPIData, setProductAPIData, customProduct, setCustomProduct, totalDealIds, setTotalDealIds, productRefetch ,searchList:searchListData }}>
      {props.children}
    </ProductContext.Provider>
  );
};
export default ProductProvider;
  