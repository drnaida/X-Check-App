import React from 'react';
import { Layout } from 'antd';

import { HeaderComponent } from '../../components/HeaderComponent';
import { FooterComponent } from '../../components/FooterComponent';

import { ReviewRequests } from './component/ReviewRequests';

export const ReviewRequestsPage = () => {
  const { Content } = Layout;

  return (
    <Layout>
      <HeaderComponent activeMenuItem="['3']" />
      <Content style={{ padding: '0 50px', marginTop: 90 }}>
        <ReviewRequests />
      </Content>
      <FooterComponent />
    </Layout>
  );
};
