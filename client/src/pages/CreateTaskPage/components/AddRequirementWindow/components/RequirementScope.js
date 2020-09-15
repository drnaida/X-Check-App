/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

export const RequirementScope = ({ category, categoryList, changeCategory }) => {
  return (
    <div>
      <label htmlFor="scopeType">Scope</label>
      <Select
        id="scopeType"
        name="scopeType"
        size="large"
        style={{ width: '100%' }}
        value={category}
        onChange={changeCategory}
      >
        {categoryList.map(item => (
          <Option key={`${item}`} value={item}>
            {item !== 'Fines' ? `${item} scope` : `${item}`}
          </Option>
        ))}
      </Select>
    </div>
  );
};
