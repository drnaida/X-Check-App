import React from 'react';

import { Input } from 'antd';

import './TaskState.scss';

/* eslint-disable jsx-a11y/label-has-associated-control */
// eslint-disable-next-line react/prop-types
export const TaskState = ({ state }) => {
  return (
    <div className="state">
      <label className="state-label">State</label>
      <Input
        className={state === 'PUBLISHED' ? 'state-text state-text__state-published' : 'state-text'}
        size="large"
        value={state}
        bordered={false}
        disabled
      />
    </div>
  );
};
