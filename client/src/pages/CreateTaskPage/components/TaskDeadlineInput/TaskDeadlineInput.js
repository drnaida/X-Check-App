import React from 'react';
import { useDispatch } from 'react-redux';

import moment from 'moment';

import { DatePicker } from 'antd';

import { addDeadlineAction } from '../../../../store/actions';

import './TaskDeadlineInput.scss';

/* eslint-disable jsx-a11y/label-has-associated-control */
// eslint-disable-next-line react/prop-types
export const TaskDeadlineInput = ({ deadline, isDisabled }) => {
  const dispatch = useDispatch();

  const addDeadline = event => {
    dispatch(addDeadlineAction(event));
  };

  return (
    <div>
      <label style={{ width: '100%', display: 'block' }}>Deadline</label>
      <DatePicker
        size="large"
        value={deadline ? moment(deadline) : null}
        onChange={addDeadline}
        disabledDate={date => date < moment()}
        disabled={isDisabled}
        showToday={false}
        allowClear={false}
      />
    </div>
  );
};
