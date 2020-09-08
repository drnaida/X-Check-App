import React from 'react';
import { Select } from 'antd';

const Option = Select.Option;

const RequirementScope = (category, changeHandleFunction) => {
  return (
    <div>
      <label htmlFor="scopeType" value={category}>Scope: </label>
      <Select id="scopeType" name="scopeType" onChange={changeHandleFunction}>
        <Option value="Basic Scope">Basic Scope</Option>
        <Option value="Advanced Scope">Advanced Scope</Option>
        <Option value="Extra Scope">Extra Scope</Option>
        <Option value="Fines">Fines</Option>
      </Select>
    </div>
  );
}

export default RequirementScope;
