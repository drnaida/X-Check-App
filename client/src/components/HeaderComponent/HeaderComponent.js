/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { Layout, Row, Col } from 'antd';

import { AuthContext } from '../../context/AuthContext';

import { MenuComponent } from '../MenuComponent';

import { Logo, User } from './components';

const { Header } = Layout;

export const HeaderComponent = props => {
  const { activeMenuItem } = props;
  const { roles, githubId } = useContext(AuthContext);

  return (
    <Header style={{ position: 'absolute', zIndex: 1, width: '100%' }}>
      <Row justify="space-between">
        <Col
          span={3}
          style={{ textAlign: 'center', color: '#fff', height: '64px', overflow: 'hidden' }}
        >
          <Logo />
        </Col>
        <Col span={18} style={{ height: '64px', overflow: 'hidden' }}>
          <MenuComponent activeMenuItem={activeMenuItem} roles={roles} />
        </Col>
        <Col
          span={3}
          style={{
            textAlign: 'right',
            color: '#fff',
            textTransform: 'capitalize',
            cursor: 'default',
            height: '64px',
            overflow: 'hidden'
          }}
        >
          <User roles={roles} githubId={githubId} />
        </Col>
      </Row>
    </Header>
  );
};
