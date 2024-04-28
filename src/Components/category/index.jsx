import { useCustomSearchParams } from "@/Utils/Hooks/useCustomSearchParams";
import { useEffect, useState } from "react";
import CollectionLeftSidebar from "../Collection/CollectionLeftSidebar";
import Breadcrumb from "../Common/Breadcrumb";

const CategoryMainPage = ({slug}) => {
    const [filter, setFilter] = useState({ category: [],brand: [], price: [], attribute: [], rating: [],page:1, sortBy: 'asc', field: 'created_at' });
    const [ brand, attribute, price, rating, sortBy, field, layout,page] = useCustomSearchParams(['brand', 'attribute', 'price', 'rating', 'sortBy', 'field', 'layout','page']);
    useEffect(() => {
        setFilter((prev) => {
          return {
            ...prev,
            page: page ? page?.page : 1 ,
            brand: brand ? brand?.brand?.split(',') : [],
            attribute: attribute ? attribute?.attribute?.split(',') : [],
            price: price ? price?.price?.split(',') : [],
            rating: rating ? rating?.rating?.split(',') : [],
            sortBy: sortBy ? sortBy?.sortBy : 'asc',
            field: field ? field?.field : 'created_at',
          };
        });
      }, [brand, attribute, price, rating, sortBy, field ,page]);
    
  return <>
      <Breadcrumb title={`Category: ${slug}`} subNavigation={[{ name: slug }]} />
      <CollectionLeftSidebar filter={filter} setFilter={setFilter} hideCategory categorySlug={slug}  />
  </>;
};

export default CategoryMainPage;
