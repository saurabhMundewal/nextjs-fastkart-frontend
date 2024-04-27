import React, { useContext, useEffect, useRef } from 'react';
import { Col, Row } from 'reactstrap';
import TopbarLeft from './TopbarLeft';
import TopbarSlider from './TopbarSlider';
import TopLanguage from './TopLanguage';
import HeaderCurrency from './HeaderCurrency';
import ThemeOptionContext from '@/Helper/ThemeOptionsContext';
import { usePathname, useSearchParams } from 'next/navigation';


const HeaderTopBar = () => {
  const { themeOption } = useContext(ThemeOptionContext);
  const addClass = useRef(null);
  const pathName = useSearchParams();
  const theme =pathName.get("theme")
  useEffect(() => {
    if (theme == `tokyo`) {
      addClass.current?.classList.add('bg-dark');
    }

    return () => {
      addClass.current?.classList.remove('bg-dark');
    };
  }, [ theme]);
  return (
    <div className={`header-top  ${themeOption?.header?.page_top_bar_dark ? ' bg-dark' : ''}`} ref={addClass}>
      <div className='container-fluid-lg'>
        <Row>
          <TopbarLeft themeOption={themeOption}/>
          <TopbarSlider />
          <Col lg={3}>
            <ul className='about-list right-nav-about'>
              <li className='right-nav-list'>
                <TopLanguage />
              </li>
              <li className='right-nav-list'>
                <HeaderCurrency />
              </li>
            </ul>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default HeaderTopBar;
