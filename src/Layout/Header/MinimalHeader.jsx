import { Col, Row } from 'reactstrap';
import HeaderLogo from './Common/HeaderLogo';
import ResponsiveSearch from './Common/ResponsiveSearch';
import MinimalNavMenu from './MinimalHeaderComponent/MinimalNavMenu';
import SearchBox from './MinimalHeaderComponent/SearchBox';
import SupportBox from './MinimalHeaderComponent/SupportBox';
import ThemeOptionContext from '@/Helper/ThemeOptionsContext';
import { useContext, useState } from 'react';
import { useHeaderScroll } from '@/Utils/HeaderScroll';
import HeaderSearchBar from './Common/HeaderSearchBar';

const MinimalHeader = ({headerClass}) => {
  const { themeOption } = useContext(ThemeOptionContext);
  const [ searchBarOpen ,setSearchBarOpen] =useState(false)
  const UpScroll = useHeaderScroll(false);
  return (
    <header className={`header-3 ${themeOption?.header?.sticky_header_enable && UpScroll ? 'active' : ''} ${themeOption?.header?.sticky_header_enable && !UpScroll ? headerClass : ''}`}>
      <div className='top-nav sticky-header sticky-header-2'>
        <div className='container-fluid-lg'>
          <Row>
            <Col xs={12}>
              <div className='navbar-top'>
                <HeaderLogo extraClass="nav-logo" />
                <HeaderSearchBar searchBarOpen={searchBarOpen} setSearchBarOpen={setSearchBarOpen} ResponsiveSearch />
                <HeaderSearchBar style={"minimal"} />
                <SupportBox />
              </div>
            </Col>
          </Row>
        </div>
      </div>

      <div className='container-fluid-lg'>
        <Row>
          <Col xs={12} className='position-relative'>
            <MinimalNavMenu setSearchBarOpen={setSearchBarOpen} />
          </Col>
        </Row>
      </div>
    </header>
  );
};

export default MinimalHeader;
