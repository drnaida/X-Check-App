/* eslint-disable react/prop-types */
import React from 'react';

import { Tooltip } from 'antd';

export const User = ({ roles, githubId }) => {
  return (
    <div>
      <Tooltip title={roles ? roles.join(', ') : ''}>{githubId}</Tooltip>
    </div>
  );
};
