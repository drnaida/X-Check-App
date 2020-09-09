import React from 'react';

import { Layout } from 'antd';

import HeaderComponent from '../components/HeaderComponent/HeaderComponent';

const { Content } = Layout;

const ReviewRequestsPage = () => {
  return (
    <Layout>
      <HeaderComponent />
      <Content style={{ padding: '0 50px', marginTop: 64 }}>Review Requests page</Content>
    </Layout>
  );
};

export default ReviewRequestsPage;
