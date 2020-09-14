/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Input } from 'antd';

export const RequirementTitle = ({ title, changeTitle }) => {
  return (
    <div>
      <label htmlFor="title" className="Requirement__title--label">
        Title
      </label>
      <Input
        id="title"
        name="title"
        placeholder="Enter requirement title"
        size="large"
        value={title}
        onChange={changeTitle}
        allowClear
      />
    </div>
  );
};
