/* eslint-disable no-restricted-globals */
/* eslint-disable react/prop-types */
import React from 'react';

import { Tooltip, Button } from 'antd';

import { useAuth } from '../../../../hooks';

export const User = ({ roles, githubId }) => {
  const { logout } = useAuth();

  const logoutHandler = () => {
    logout();
    location.reload();
  };

  return (
    <div>
      <Tooltip title={roles ? roles.join(', ') : ''}>{githubId}</Tooltip>
      <Button type="link" style={{ color: '#FFFFFF' }} onClick={logoutHandler}>
        Logout
      </Button>
    </div>
  );
};
