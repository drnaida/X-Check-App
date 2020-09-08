import React from 'react';
import { Input } from 'antd';

const RequirementTitle = (title, changeHandleFunction) => {
  return (
    <div>
      <label htmlFor="title" className="AddRequirement__container--label">Title: </label>
      <Input id="title" name="title" placeholder="X-Check app" value={title} onChange={changeHandleFunction} allowClear/>
    </div>
  );
}

export default RequirementTitle;
