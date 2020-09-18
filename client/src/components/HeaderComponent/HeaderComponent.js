/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { Layout, Row, Col } from 'antd';

import { AuthContext } from '../../context/AuthContext';

import { MenuComponent } from '../MenuComponent';

import { Logo, User } from './components';

const { Header } = Layout;

export const HeaderComponent = props => {
  const { activeMenuItem } = props;
  const auth = useContext(AuthContext);
  return (
    <Header style={{ position: 'absolute', zIndex: 1, width: '100%' }}>
      <Row justify="space-between">
        <Col span={3} style={{ textAlign: 'center', color: '#fff' }}>
          <Logo />
        </Col>
        <Col span={18}>
          <MenuComponent activeMenuItem={activeMenuItem} />
        </Col>
        <Col
          span={3}
          style={{
            textAlign: 'right',
            color: '#fff',
            textTransform: 'capitalize',
            cursor: 'default'
          }}
        >
          <User auth={auth} />
        </Col>
      </Row>
    </Header>
  );
};
