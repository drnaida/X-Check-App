import React, { useState } from 'react';
import './AddRequirementWindow.scss';
import '../../index.scss';
import ModalWindow from '../../components/ModalWindow/ModalWindow';
import RequirementTitle from './components/RequirementTitle';
import RequirementScope from './components/RequirementScope';
import SubRequirementList from './components/SubRequirementList';
import AddNewSubRequirement from './components/AddNewSubRequirement';

const AddRequirementWindow = () => {
  const [requirement, setRequirement] = useState(
    { visibleModalWindow: false,
      id: '',
      title: '',
      category: 'Basic Scope',
      items: [
        {
          description: '',
          maxScore: 0,
          onlyForMentors: false,
        }
      ]
    });

  const changeRequirement = event => {
    console.log('Change');
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
        <RequirementTitle title={requirement.title} changeHandleFunction={changeRequirement} />
        <RequirementScope category={requirement.category} changeHandleFunction={changeRequirement} />
        <h1>Подтребование</h1>
        <SubRequirementList />
        <AddNewSubRequirement description={requirement.desciption} maxScore={requirement.maxScore} onlyForMentors={requirement.onlyForMentors} />
      </ModalWindow>
    </div>
  );
};

export default AddRequirementWindow;
