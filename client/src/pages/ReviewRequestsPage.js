import React from 'react';

import { Layout } from 'antd';

import HeaderComponent from '../components/HeaderComponent/HeaderComponent';
import FooterComponent from '../components/FooterComponent/FooterComponent';

const { Content } = Layout;

const ReviewRequestsPage = () => {
  return (
    <Layout>
      <HeaderComponent activeMenuItem="['2']" />
      <Content style={{ padding: '0 50px', marginTop: 64 }}>Review Requests page</Content>
      <FooterComponent />
    </Layout>
  );
};
