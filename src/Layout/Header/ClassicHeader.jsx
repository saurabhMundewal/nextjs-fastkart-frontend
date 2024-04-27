import ThemeOptionContext from '@/Helper/ThemeOptionsContext';
import { useHeaderScroll } from '@/Utils/HeaderScroll';
import { useContext } from 'react';
import { RiHeartLine } from 'react-icons/ri';
import { Col, Row } from 'reactstrap';
import ClassicHeaderMenu from './Common/ClassicHeaderMenu';
import HeaderLogo from './Common/HeaderLogo';
import HeaderTopBar from './Common/HeaderTopBar';
import RightSideHeader from './RightSideHeader';

const ClassicHeader = ({headerClass}) => {
  const { themeOption } = useContext(ThemeOptionContext);
  const UpScroll = useHeaderScroll(false);
  
  return (
    <header className={`${themeOption?.header?.sticky_header_enable && UpScroll ? 'active' : ''}  ${themeOption?.header?.sticky_header_enable && !UpScroll ? headerClass : ''}`}>
      {themeOption?.header?.page_top_bar_enable && <HeaderTopBar />}

      <div className='top-nav top-header sticky-header'>
        <div className='container-fluid'>
          <Row>
            <Col xs='12'>
              <div className='navbar-top'>
                <HeaderLogo />
                <ClassicHeaderMenu />
                <RightSideHeader ClassicHeader  noContactUs={true} wishListIcon={<RiHeartLine />} />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </header>
  );
};

export default ClassicHeader;
