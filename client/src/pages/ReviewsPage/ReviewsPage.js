import React from 'react';

import { Layout } from 'antd';

import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import FooterComponent from '../../components/FooterComponent/FooterComponent';

const { Content } = Layout;

const ReviewsPage = () => {
  return (
    <Layout>
      <HeaderComponent activeMenuItem="['3']" />
      <Content style={{ padding: '0 50px', marginTop: 64 }}>Reviews page</Content>
      <FooterComponent />
    </Layout>
  );
};

export default ReviewsPage;
