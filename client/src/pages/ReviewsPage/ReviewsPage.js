import React from 'react';

import { Layout } from 'antd';

import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';

const { Content } = Layout;

const ReviewsPage = () => {
  return (
    <Layout>
      <HeaderComponent pageName="Reviews" activeMenuItem="['3']" />
      <Content style={{ padding: '0 50px', marginTop: 64 }}>Reviews page</Content>
    </Layout>
  );
};

export default ReviewsPage;
