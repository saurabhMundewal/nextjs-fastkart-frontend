import CategoryContext from "@/Helper/CategoryContext";
import request from '@/Utils/AxiosUtils';
import { ProductAPI } from '@/Utils/AxiosUtils/API';
import { useQuery } from '@tanstack/react-query';
import { useContext, useMemo, useState } from "react";
import { Col, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap';
import CustomHeading from "@/Components/Common/CustomHeading";
import WrapperComponent from "@/Components/Common/WrapperComponent";
import ThemeOptionContext from "@/Helper/ThemeOptionsContext";
import ProductBox from "@/Components/Common/ProductBox";

const CategoryProductFilter = ({ dataAPI, grid }) => {
  const [activeTab, setActiveTab] = useState("All");
  const { filterCategory } = useContext(CategoryContext);
  const categoryData = filterCategory('product');
  const { themeOption } = useContext(ThemeOptionContext);
  const FilterCategory = useMemo(() => {
    return categoryData?.filter((el) => dataAPI?.category_ids?.includes(el.id));
  }, [categoryData, dataAPI]);
  const { data: ProductData, refetch } = useQuery([activeTab], () => request({ url: ProductAPI, params: { category_ids: activeTab == "All" ? dataAPI?.category_ids.join(",") : activeTab } }), { enabled: true, refetchOnWindowFocus: false, select: (res) => res?.data?.data, });
  let products = ProductData?.map(product => product).slice(0, grid * 2);
  const onNavClick = (data) => {
    setActiveTab(data?.id)
  }

  return (
    <WrapperComponent noRowCol classes={{ row: "g-3", sectionClass: "product-section", }}>
      <CustomHeading title={dataAPI?.title} customClass={'title-flex-2 title'}>
        {dataAPI?.category_ids?.length > 0 && <Nav className='nav-tabs tab-style-2'>
          {[{ id:"All", categoryName: "All" }, ...FilterCategory].map((elem, i) => <NavItem key={i}>
            <NavLink key={i} className={` ${activeTab === elem.id ? "active" : ""}  `} onClick={() => onNavClick(elem)}>
              {elem?.name || elem?.categoryName}
            </NavLink>
          </NavItem>)}
        </Nav> }
      </CustomHeading>
      <TabContent>
        <TabPane>
          {
            <div className={`${themeOption?.product?.full_border ? "full_border" : ''} ${themeOption?.product?.image_bg ? "product_img_bg" : ''} ${themeOption?.product?.product_box_bg ? "full_bg" : ''} ${themeOption?.product?.product_box_border ? "product_border" : ''} `}>
              <div className={`row g-sm-4 g-3 ${grid === 4 ? 'row-cols-xl-4 row-cols-md-3 row-cols-sm-2 row-cols-1' : ''} ${grid === 5 ? 'row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-2' : ''}
                      ${grid === 6 ? 'row-cols-xxl-6 row-cols-lg-4 row-cols-md-3 row-cols-2' : ''}`}>
                {products?.map((data, index) => (
                  <div>
                    <ProductBox product={data} className="boxClass" style="'horizontal'" />
                  </div>
                ))}
              </div>
            </div>
          }
        </TabPane>
      </TabContent>
    </WrapperComponent>
  );
};

export default CategoryProductFilter;
