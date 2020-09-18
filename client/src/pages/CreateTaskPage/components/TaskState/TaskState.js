import React from 'react';

import { Input } from 'antd';

import './TaskState.scss';

/* eslint-disable jsx-a11y/label-has-associated-control */
// eslint-disable-next-line react/prop-types
export const TaskState = ({ state }) => {
  return (
    <div>
      <label style={{ width: '100%', display: 'block' }}>State</label>
      <Input
        size="large"
        style={{ paddingLeft: 0, color: '#595959' }}
        value={state}
        bordered={false}
        disabled
      />
    </div>
  );
};
