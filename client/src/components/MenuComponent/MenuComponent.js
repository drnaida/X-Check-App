/* eslint-disable react/prop-types */
import React from 'react';
import { Menu } from 'antd';

import { Link } from 'react-router-dom';

import { menuItems } from '../../constants';

export const MenuComponent = ({ activeMenuItem, roles }) => {
  return (
    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={activeMenuItem}>
      {menuItems
        .filter(item =>
          roles && roles.every(role => role === 'student')
            ? item.url !== '/create-task' && item.url !== '/cross-check'
            : item
        )
        .map(item => {
          return (
            <Menu.Item key={item.title}>
              <Link to={item.url}>{item.title}</Link>
            </Menu.Item>
          );
        })}
    </Menu>
  );
};
