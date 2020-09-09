import React from 'react';
import { Layout, Menu } from 'antd';

const { Header } = Layout;

const HeaderComponent = () => {
  return (
    <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item key="1">Tasks</Menu.Item>
        <Menu.Item key="2">Review Requests</Menu.Item>
        <Menu.Item key="3">Reviews</Menu.Item>
        <Menu.Item key="4">Cross-check sessions</Menu.Item>
      </Menu>
    </Header>
  );
};

export default HeaderComponent;
