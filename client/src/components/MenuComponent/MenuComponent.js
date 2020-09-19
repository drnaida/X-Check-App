/* eslint-disable react/prop-types */
import React from 'react';
import { Menu } from 'antd';

import { menuItems } from '../../constants';

export const MenuComponent = props => {
  const { activeMenuItem } = props;

  return (
    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={activeMenuItem}>
      {menuItems.map(item => {
        return (
          <Menu.Item key={item.title}>
            <a href={item.url}>{item.title}</a>
          </Menu.Item>
        );
      })}
    </Menu>
  );
};
