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
        <label htmlFor="title" className="AddRequirement__container--label">Title: </label>
        <input id="title" name="title" placeholder="X-Check app" className="AddRequirement__container--input" onChange={changeRequirement}/>
        <label htmlFor="description" className="AddRequirement__container--label">Description: </label>
        <textarea id="description"placeholder="Super interesting task." name="description" className="AddRequirement__container--textarea" onChange={changeRequirement}/>
        <label htmlFor="minScore" className="AddRequirement__container--label">Minimum Score: </label>
        <input type="number" id="minScore" placeholder="0" name="minScore" className="AddRequirement__container--input" onChange={changeRequirement}/>
        <label htmlFor="maxScore" className="AddRequirement__container--label">Maximum Score: </label>
        <input id="maxScore" name="maxScore" placeholder="10" className="AddRequirement__container--input" onChange={changeRequirement}/>
        <label htmlFor="onlyForMentors" className="AddRequirement__container--label">Only for mentors: </label>
        <input type="checkbox" id="onlyForMentors" className="AddRequirement__container--input" name="onlyForMentors" onChange={changeRequirement}/>
      </div>
      <button className="button" onClick={addRequirementToList}>Add requirement</button>
    </div>
  );
};

export default AddRequirement;
