import React, { useState } from 'react';
import './AddRequirement.scss';
import '../../index.scss';
const AddRequirement = () => {
  const [requirement, setRequirement] = useState({ title: '', description: '', minScore: 0, maxScore: 0, onlyForMentors: false,  scopeType: ''});
  const [requirements, setRequirements] = useState([]);

  const changeRequirement = event => {
    setRequirement({ ...requirement, [event.target.name]: event.target.value });
    console.log(requirement);
  };
  const addRequirementToList = event => {
    setRequirements({...requirements, requirement});
    console.log(requirements);
  }
  return(
    <div className="AddRequirement">
      <h1 className="AddRequirement__heading">Create new requirement</h1>
      <div className="AddRequirement__container">
        <label htmlFor="title">Title: </label>
        <input id="title" name="title" onChange={changeRequirement}/>
        <label htmlFor="description">Description: </label>
        <textarea id="description" name="description" onChange={changeRequirement}/>
        <label htmlFor="minScore">Minimum Score: </label>
        <input id="minScore" name="minScore" onChange={changeRequirement}/>
        <label htmlFor="maxScore">Maximum Score: </label>
        <input id="maxScore" name="maxScore" onChange={changeRequirement}/>
        <label htmlFor="onlyForMentors">Only for mentors: </label>
        <input type="checkbox" id="onlyForMentors" name="onlyForMentors" onChange={changeRequirement}/>
      </div>
      <button className="button" onClick={addRequirementToList}>Add requirement</button>
    </div>
  );
};

export default AddRequirement;
