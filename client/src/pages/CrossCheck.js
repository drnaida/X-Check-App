import React from 'react';

import { Layout } from 'antd';

import { HeaderComponent, FooterComponent } from '../components';

const { Content } = Layout;

export const CrossCheck = () => {
  return (
    <Layout>
      <HeaderComponent activeMenuItem="['5']" />
      <Content style={{ padding: '0 50px', marginTop: 64 }}>Cross Check</Content>
      <FooterComponent />
    </Layout>
  );
};
