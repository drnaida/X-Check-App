import React, { useState } from 'react';
import './AddRequirementWindow.scss';
import '../../index.scss';
import ModalWindow from '../../components/ModalWindow/ModalWindow';
import RequirementTitle from './components/RequirementTitle';
import RequirementScope from './components/RequirementScope';

const AddRequirementWindow = () => {
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
    console.log('Saved');
    closeModalWindow();
  }

  const openWindow = event => {
    setRequirement({ ...requirement, visibleModalWindow: true })
  }

  return (
    <div className="AddRequirementWindow">
      <button onClick={openWindow}>Открыть модальное окно</button>
      <ModalWindow
      title={'Добавить требование'}
        visible={requirement.visibleModalWindow}
        handlerOkButton={saveRequirement}
        handlerCancelButton={closeModalWindow}
      >
        <div className="AddRequirement__container">
          <RequirementTitle title={requirement.title} changeHandleFunction={changeRequirement} />
          <RequirementScope title={requirement.scopeType} changeHandleFunction={changeRequirement} />
          <label htmlFor="description" className="AddRequirement__container--label">Description: </label>
          <textarea id="description" placeholder="Super interesting task." name="description" className="AddRequirement__container--textarea" value={requirement.description} onChange={changeRequirement}/>
          <label htmlFor="minScore" className="AddRequirement__container--label">Minimum Score: </label>
          <input type="number" id="minScore" placeholder="0" name="minScore" className="AddRequirement__container--input" value={requirement.minScore} onChange={changeRequirement}/>
          <label htmlFor="maxScore" className="AddRequirement__container--label">Maximum Score: </label>
          <input type="number" id="maxScore" name="maxScore" placeholder="10" className="AddRequirement__container--input" value={requirement.maxScore} onChange={changeRequirement}/>
          <label htmlFor="onlyForMentors" className="AddRequirement__container--label">Only for mentors: </label>
          <input type="checkbox" id="onlyForMentors" className="AddRequirement__container--input" name="onlyForMentors" value={requirement.onlyForMentors} onChange={changeRequirementCheckbox}/>
        </div>
        </ModalWindow>
    </div>
  );
};

export default AddRequirementWindow;
