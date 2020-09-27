/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Input } from 'antd';

export const RequirementTitle = ({ title, changeTitle }) => {
  return (
    <div>
      <label className="Requirement__title--label">
        Title
        <sup style={{ color: '#FF4D4F' }}>*</sup>
      </label>
      <Input
        placeholder="Enter requirement title"
        size="large"
        value={title}
        onChange={changeTitle}
        allowClear
      />
    </div>
  );
};
