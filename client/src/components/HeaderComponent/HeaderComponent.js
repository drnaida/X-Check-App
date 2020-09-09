import React from 'react';
import { Layout, Menu, Row, Col } from 'antd';
import './HeaderComponent.css';

const { Header } = Layout;

const HeaderComponent = props => {
  const { activeMenuItem, pageName } = props;
  return (
    <Header style={{ position: 'fixed', zIndex: 1, width: '100%', padding: '0 10px' }}>
      <Row justify="space-between">
        <Col span={2} style={{ textAlign: 'center', color: '#fff' }}>
          <div style={{ display: 'flex' }}>
            <div className="HeaderComponent-logo" />
            <div>X-Check app</div>
          </div>
        </Col>
        <Col span={7}>
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
        <Col span={7} style={{ textAlign: 'center', color: '#fff' }}>
          {pageName}
        </Col>
        <Col span={8} style={{ textAlign: 'center', color: '#fff' }}>
          Role
        </Col>
      </Row>
    </Header>
  );
};

export default HeaderComponent;
