import Image from 'next/image';
import { useContext, useMemo } from 'react';
import Link from 'next/link';
import { Col, Row } from 'reactstrap';
import { placeHolderImage } from '../../../../Data/CommonPath';
import { dateFormate } from '@/Utils/CustomFunctions/DateFormate';
import ProductIdsContext from '@/Helper/ProductIdsContext';
import BlogContext from '@/Helper/BlogContext';
import SideBanner from '../../../../public/assets/images/menu_banner.jpg'
import BottomBanner from '../../../../public/assets/images/menu_banner_2.jpg'
import NoDataFound from '@/Components/Common/NoDataFound';
import ProductBox from '@/Components/Common/ProductBox';
import ThemeOptionContext from '@/Helper/ThemeOptionsContext';


const MenuSlider = ({ menu }) => {
  const { themeOption } = useContext(ThemeOptionContext);
  const { filteredProduct } = useContext(ProductIdsContext);
  const { blogState } = useContext(BlogContext);
  
  const filterProduct = useMemo(() => {
    return filteredProduct?.filter((el) => menu?.product_ids?.includes(el?.id));
  }, [menu?.product_ids, filteredProduct]);

  const filterBlog = useMemo(() => {
    return blogState?.filter((el) => menu?.blog_ids.includes(el.id));
  }, [menu?.blog_ids, blogState]);
  
  return (
    <>
      {menu?.mega_menu_type === 'product_box' && (
        <Col xl={6} className='dropdown-column d-xl-block d-none'>
          {filterProduct?.length > 0 ? (
            <div className='menu-product-slider'>
              <div className={` ${themeOption?.product?.full_border ? "full_border" : ''} ${themeOption?.product?.image_bg ? "product_img_bg" : ''} ${themeOption?.product?.product_box_bg ? "full_bg" : ''} ${themeOption?.product?.product_box_border ? "product_border" : ''} `}>
               <Row>
                {filterProduct?.slice(0, 2)?.map((product, i) => (
                  <Col xs={6} key={i}>
                     <ProductBox product={product} className="boxClass" style="'horizontal'" />
                  </Col>
                ))}
              </Row>
              </div>
            </div>
          ) : (
            <NoDataFound data={{ customClass: 'menu-no-data', title: 'No Product Found' }} />
          )}
        </Col>
      )}
      {menu.mega_menu_type === 'side_banner' && (
        <Col xl={3} className='dropdown-column d-xl-block d-none'>
          <div className='menu-img-banner'>
            <Link href={`/product/deliciously-sweet-watermelon`} className='text-title'>
              {menu?.banner_image &&<Image src={menu?.banner_image ? menu?.banner_image?.original_url : SideBanner} alt='banner' className='img-fluid' height={511} width={270} />}
            </Link>
          </div>
        </Col>
      )}
      {menu.mega_menu_type === 'bottom_banner' && (
        <Col xl={12} className='dropdown-column d-xl-block d-none'>
          <div className='menu-img-banner rounded overflow-hidden mx-0 mt-3 mb-0'>
           {menu?.banner_image && <Image src={menu?.banner_image ? menu?.banner_image?.original_url : BottomBanner} alt='banner_landscape' className='img-fluid' height={190} width={954} />}
          </div>
        </Col>
      )}
      {menu?.mega_menu_type === 'blog_box' && (
        <Col xl={9} className='dropdown-column d-xl-block d-none'>
          {filterBlog?.length > 0 ? (
            <Row>
              {filterBlog?.slice(0, 2)?.map((blog, i) => (
                <Col xs={6} key={i}>
                  <div className='blog-box sticky-blog'>
                    <div className='blog-box-image'>
                      <Link href={`/blogs/${blog?.slug}`} className='blog-image'>
                      {blog?.blog_thumbnail  &&  <Image src={blog?.blog_thumbnail ? blog?.blog_thumbnail?.original_url : placeHolderImage} className='img-fluid' alt={blog.title} height={299} width={398} />}
                      </Link>
                    </div>
                    <Link href={`/blogs/${blog?.slug}`} className='blog-detail'>
                      <h6>{dateFormate(blog.created_at)}</h6>
                      <h5>{blog?.title}</h5>
                    </Link>
                  </div>
                </Col>
              ))}
            </Row>
          ) : (
            <NoDataFound data={{ customClass: 'menu-no-data', title: 'No Blog Found' }} />
          )}
        </Col>
      )}
    </>
  );
};

export default MenuSlider;
