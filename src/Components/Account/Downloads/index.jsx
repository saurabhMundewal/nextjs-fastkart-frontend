"use client";
import Breadcrumb from "@/Components/Common/Breadcrumb";
import WrapperComponent from "@/Components/Common/WrapperComponent";
import React from "react";
import AccountSidebar from "../Common/AccountSidebar";
import { Col, TabContent, TabPane } from "reactstrap";
import ResponsiveMenuOpen from "../Common/ResponsiveMenuOpen";
import AccountHeading from "@/Components/Common/AccountHeading";
import DownloadDetail from "./DownloadDetail";

const AccountDownloads = () => {
  return (
    <>
      <Breadcrumb title={"Downloads"} subNavigation={[{ name: "Downloads" }]}/>
      <WrapperComponent classes={{ sectionClass: 'user-dashboard-section section-b-space' }} customCol={true}>
      <AccountSidebar tabActive={'download'} /> 
      <Col xxl={9} lg={8}>
          <ResponsiveMenuOpen />
          <div className='dashboard-right-sidebar'>
            <TabContent>
              <TabPane className='show active'>
                <AccountHeading title='Downloads' />
                <DownloadDetail />
              </TabPane>
            </TabContent>
          </div>
        </Col>
      </WrapperComponent>

    </>
  );
};

export default AccountDownloads;
