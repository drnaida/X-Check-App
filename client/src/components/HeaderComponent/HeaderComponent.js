import React from 'react';
import { Layout, Menu } from 'antd';

const { Header } = Layout;

const HeaderComponent = () => {
  return (
    <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item key="1">
          <a href="/tasks">Tasks</a>
        </Menu.Item>
        <Menu.Item key="2">
          <a href="/review-requests">Review Requests</a>
        </Menu.Item>
        <Menu.Item key="3">
          <a href="/reviews">Reviews</a>
        </Menu.Item>
        <Menu.Item key="4">
          <a href="/cross-check-sessions">Cross-check sessions</a>
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default HeaderComponent;
