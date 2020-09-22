/* eslint-disable no-restricted-syntax */
import React, { useState } from 'react';
import { Button, Table } from 'antd';

import { ModalWindow } from '../../../../components/ModalWindow';

import { SelectingTask } from '../SelectingTask';
import { CheckingYourself } from '../CheckingYourself';

import createColumns from '../../Data/dataColumns';
import { buttonsStepOne, buttonsStepTwo } from '../../Data/dataButtons';

export const ReviewRequestsList = () => {
  const [dataSource, setDataSource] = useState([
    {
      key: '1',
      id: 'Task #1',
      student: 'AMike',
      state: 'Draft',
      deployLink: '',
      pullRequestLink: ''
    },
    {
      key: '2',
      id: 'Task #2',
      student: 'DJohn',
      state: 'Published',
      deployLink: '',
      pullRequestLink: ''
    },
    {
      key: '3',
      id: 'Task #3',
      student: 'DJohn',
      state: 'Completed',
      deployLink: '',
      pullRequestLink: ''
    },
    {
      key: '4',
      id: 'Task #3',
      student: 'DJohn',
      state: 'Draft',
      deployLink: '',
      pullRequestLink: ''
    }
  ]);
  const [visebleModalWindow, setVisibleModalWindow] = useState(false);
  const [step, setStep] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [task, setTask] = useState([]);
  const [editingPR, setEditingPR] = useState(-1);

  const createFields = obj => {
    const res = [];
    for (const key in obj) {
      if ({}.hasOwnProperty.call(obj, key)) {
        res.push({ name: [key], value: obj[key] });
      }
    }
    return res;
  };

  const restructingFields = () => {
    const res = {};
    for (let index = 0; index < task.length; index += 1) {
      const elem = task[index];
      res[elem.name[0]] = elem.value;
    }
    return res;
  };

  const handleActionEdit = index => {
    setEditingPR(index);
    setTask(createFields({ ...dataSource[index] }));
    setVisibleModalWindow(true);
  };

  const handleActionDelete = index => {
    const state = [...dataSource];
    state.splice(index, 1);
    setDataSource(
      state.map((value, i) => {
        const elem = { ...value };
        elem.key = (i + 1).toString();
        return elem;
      })
    );
  };

  const handleActionCheck = index => {
    console.log(index);
  };

  const handleCancelButtonModalWindow = () => {
    setVisibleModalWindow(false);
    setStep(1);
    setTask([]);
    setEditingPR(-1);
  };

  const handleOnChange = fields => setTask(fields);

  const handleNextButtonModalWindow = () => setStep(step + 1);

  const handleSaveButtonModalWindow = published => {
    const taskState = restructingFields();
    taskState.state = published ? 'Published' : 'Draft';
    const state = [...dataSource];
    if (editingPR > -1) {
      const data = { ...state[editingPR] };
      data.state = taskState.state;
      data.deployLink = taskState.deployLink;
      data.pullRequestLink = taskState.pullRequestLink;
      state[editingPR] = data;
    } else {
      taskState.key = `${state.length + 1}`;
      state.push(taskState);
    }
    setDataSource(state);
    handleCancelButtonModalWindow();
  };

  const btnStepOne = buttonsStepOne(handleCancelButtonModalWindow, handleNextButtonModalWindow);
  const btnStepTwo = buttonsStepTwo(handleCancelButtonModalWindow, handleSaveButtonModalWindow);

  const columns = createColumns(
    { handleActionEdit, handleActionDelete, handleActionCheck },
    { searchText, setSearchText },
    { searchedColumn, setSearchedColumn }
  );

  return (
    <>
      <ModalWindow
        title="Creating new rewiew request"
        visible={visebleModalWindow}
        buttons={step === 1 ? btnStepOne : btnStepTwo}
        handlerCancelButton={handleCancelButtonModalWindow}
      >
        {step === 1 ? (
          <SelectingTask fields={task} onChange={handleOnChange} />
        ) : (
          <CheckingYourself />
        )}
      </ModalWindow>
      <Button
        type="primary"
        onClick={() => setVisibleModalWindow(true)}
        style={{ marginBottom: '20px' }}
      >
        Create request
      </Button>
      <Table dataSource={dataSource} columns={columns} />
    </>
  );
};
