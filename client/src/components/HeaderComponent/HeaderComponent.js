import React from 'react';
import { Layout, Menu, Row, Col } from 'antd';

import './HeaderComponent.css';
import logo from '../../assets/imgs/rsschool-logo.svg';

const { Header } = Layout;

const HeaderComponent = props => {
  const { activeMenuItem } = props;
  return (
    <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
      <Row justify="space-between">
        <Col span={3} style={{ textAlign: 'center', color: '#fff' }}>
          <div style={{ display: 'flex' }}>
            <img
              alt="RSSchool"
              src={logo}
              style={{ marginRight: '12px', width: '90px', height: '64px' }}
            />
            X-Check
          </div>
        </Col>
        <Col span={18}>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={activeMenuItem}>
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
              <a href="/cross-check-sessions">Cross-check</a>
            </Menu.Item>
          </Menu>
        </Col>
        <Col span={3} style={{ textAlign: 'right', color: '#fff' }}>
          Role
        </Col>
      </Row>
    </Header>
  );
};

export default HeaderComponent;
