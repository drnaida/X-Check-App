import React from 'react';

import { Layout } from 'antd';

import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';

const { Content } = Layout;

const CrossCheckSessions = () => {
  return (
    <Layout>
      <HeaderComponent pageName="Cross-check sessions" activeMenuItem="['4']" />
      <Content style={{ padding: '0 50px', marginTop: 64 }}>Cross check sessions</Content>
    </Layout>
  );
};

export default CrossCheckSessions;
