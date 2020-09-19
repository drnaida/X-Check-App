/* eslint-disable react/prop-types */
import React from 'react';

import { Tooltip } from 'antd';

export const User = ({ auth }) => {
  return (
    <div>
      <Tooltip title={auth.roles ? auth.roles.join(', ') : ''}>{auth.githubId}</Tooltip>
    </div>
  );
};
