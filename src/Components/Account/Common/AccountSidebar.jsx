import NavTabTitles from '@/Components/Common/NavTabs';
import Btn from '@/Elements/Buttons/Btn';
import AccountContext from '@/Helper/AccountContext';
import request from '@/Utils/AxiosUtils';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { RiCloseLine } from 'react-icons/ri';
import { Col } from 'reactstrap';
import SidebarProfile from '.';
import { sidebarMenu } from '../../../../Data/AccountSidebarMenu';

const AccountSidebar = ({ tabActive }) => {
  const [activeTab, setActiveTab] = useState({ id: tabActive });
  const [notification, setNotification] = useState();

  const { mobileSideBar, setMobileSideBar } = useContext(AccountContext);
  const router = useRouter();
  const { data, isLoading, refetch } = useQuery(['NotificationsAPI'], () => request({ url: "/notifications" },router), { enabled: false, select: (res) => (res?.data?.data) });
  useEffect(() => {
    isLoading && refetch();
  }, [isLoading])

  
useEffect(() => {
    setNotification(data?.filter(item => !item.read_at)?.length)
  }, [data])

  const handelCallback = () => {
    setMobileSideBar(!mobileSideBar);
  };
  return (
    <Col xxl={3} lg={4}>
      <div className={`dashboard-left-sidebar ${mobileSideBar ? 'show' : ''}`}>
        <div className='close-button d-flex d-lg-none' onClick={() => setMobileSideBar(!mobileSideBar)}>
          <Btn className='close-sidebar'>
            <RiCloseLine />
          </Btn>
        </div>
        <SidebarProfile />
        <NavTabTitles notification={notification} classes={{ navClass: 'nav-pills user-nav-pills' }} setActiveTab={setActiveTab} activeTab={activeTab} titleList={sidebarMenu} isLogout callBackFun={handelCallback} />
      </div>
    </Col>
  );
};

export default AccountSidebar;
