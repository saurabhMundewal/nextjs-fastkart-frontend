'use client';
import Breadcrumb from '@/Components/Common/Breadcrumb';
import WrapperComponent from '@/Components/Common/WrapperComponent';
import { Col, TabContent, TabPane } from 'reactstrap';
import TrackOrderDetails from './TrackOrderDetails';
import { useSearchParams } from 'next/navigation';

const OrderDetailsTracking= () => {
  const search = useSearchParams();
  let orderNumber = search.get("order_number");
  let emailPhone = search.get("email_or_phone");
  return (
    <>
      <Breadcrumb title={'Orders Details'} subNavigation={[{ name: 'Orders Details' }]} />
      <WrapperComponent classes={{ sectionClass: 'user-dashboard-section section-b-space' }} customCol={true}>
        <Col xxl={12} lg={8}>
          <div className='dashboard-right-sidebar'>
            <TabContent>
              <TabPane className='show active'>
                <TrackOrderDetails orderNumber={orderNumber} emailPhone={emailPhone}/>
              </TabPane>
            </TabContent>
          </div>
        </Col>
      </WrapperComponent>
    </>
  );
};

export default OrderDetailsTracking;
