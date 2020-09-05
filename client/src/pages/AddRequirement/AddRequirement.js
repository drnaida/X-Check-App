import React, { useState } from 'react';
import './AddRequirement.scss';
import '../../index.scss';
import ModalWindow from '../../components/ModalWindow/ModalWindow';

const AddRequirement = () => {
  const [requirement, setRequirement] = useState(
    { title: '',
      description: '',
      minScore: 0,
      maxScore: 0,
      onlyForMentors: false,
      scopeType: 'Basic Scope',
      visibleModalWindow: false,
    });

  const changeRequirement = event => {
    setRequirement({ ...requirement, [event.target.name]: event.target.value });
  };

  const changeRequirementCheckbox = event => {
    if (event.target.checked) {
      setRequirement({ ...requirement, [event.target.name]: true });
    } else {
      setRequirement({ ...requirement, [event.target.name]: false });
    }
  };

  const closeModalWindow = () => setRequirement({ ...requirement, visibleModalWindow: false });

  const saveRequirement = () => {
    closeModalWindow();
  }

  const addRequirementToList = event => {
    setRequirement({ ...requirement, visibleModalWindow: true })
  }

  return (
    <div className="AddRequirement">
      <h1 className="AddRequirement__heading">Create new requirement</h1>
      <div className="AddRequirement__container">
        <label htmlFor="title" className="AddRequirement__container--label">Title: </label>
        <input id="title" name="title" placeholder="X-Check app" className="AddRequirement__container--input" value={requirement.title} onChange={changeRequirement}/>
        <label htmlFor="description" className="AddRequirement__container--label">Description: </label>
        <textarea id="description" placeholder="Super interesting task." name="description" className="AddRequirement__container--textarea" value={requirement.description} onChange={changeRequirement}/>
        <label htmlFor="minScore" className="AddRequirement__container--label">Minimum Score: </label>
        <input type="number" id="minScore" placeholder="0" name="minScore" className="AddRequirement__container--input" value={requirement.minScore} onChange={changeRequirement}/>
        <label htmlFor="maxScore" className="AddRequirement__container--label">Maximum Score: </label>
        <input type="number" id="maxScore" name="maxScore" placeholder="10" className="AddRequirement__container--input" value={requirement.maxScore} onChange={changeRequirement}/>
        <label htmlFor="onlyForMentors" className="AddRequirement__container--label">Only for mentors: </label>
        <input type="checkbox" id="onlyForMentors" className="AddRequirement__container--input" name="onlyForMentors" value={requirement.onlyForMentors} onChange={changeRequirementCheckbox}/>
        <label htmlFor="scopeType" className="AddRequirement__container--label" value={requirement.scopeType}>Scope: </label>
        <select id="scopeType" name="scopeType" onChange={changeRequirement}>
          <option>Basic Scope</option>
          <option>Advanced Scope</option>
          <option>Extra Scope</option>
        </select>
      </div>
      <button className="AddRequirement__button" onClick={addRequirementToList}>Add requirement</button>
      <ModalWindow 
        visible={requirement.visibleModalWindow}
        handlerOkButton={saveRequirement}
        handlerCancelButton={closeModalWindow}
      >
        <p>Это children</p>
      </ModalWindow>
    </div>
  );
};

export default AddRequirement;
