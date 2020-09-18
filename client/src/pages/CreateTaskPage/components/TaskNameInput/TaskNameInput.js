import React from 'react';
import { useDispatch } from 'react-redux';

import { Input } from 'antd';

import { addTaskNameAction } from '../../../../store/actions';

import './TaskNameInput.scss';

/* eslint-disable jsx-a11y/label-has-associated-control */
// eslint-disable-next-line react/prop-types
export const TaskNameInput = ({ title, isDisabled }) => {
  const dispatch = useDispatch();

  const addTaskName = event => {
    dispatch(addTaskNameAction(event.target.value));
  };

  return (
    <div>
      <label>Title</label>
      <Input
        id="taskName"
        type="text"
        size="large"
        value={title}
        onChange={addTaskName}
        disabled={isDisabled}
        allowClear
      />
    </div>
  );
};
