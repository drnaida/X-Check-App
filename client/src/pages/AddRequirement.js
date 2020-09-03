import React, { useState } from 'react';
import './AddRequirement.scss';
import '../index.scss';
const AddRequirement = () => {
  const [requirement, setRequirement] = useState({ title: 'title', description: '', minScore: 0, maxScore: 0, onlyForMentors: true,  scopeType: ''});
  const [requirements, setRequirements] = useState({basicScope: [], advancedScope: [], extraScope: []});

  const changeRequirement = event => {
    console.log(requirement);
    setRequirement({ ...requirement, [event.target.name]: event.target.value });
  };

  return(
    <div className="AddRequirement">
      <h1>Create new requirement</h1>
      <label htmlFor="title">Title: </label>
      <input id="title" name="title" onChange={changeRequirement}/>
      <button>Add requirement</button>
    </div>
  );
};

export default AddRequirement;
