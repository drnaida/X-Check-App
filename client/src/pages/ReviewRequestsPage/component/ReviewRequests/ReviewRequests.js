import React, { useState } from 'react';
import { Button, Table } from 'antd';

import { ModalWindow } from '../../../../components/ModalWindow';

import { SelectingTask } from '../SelectingTask';
import { CheckingYourself } from '../CheckingYourself';

import createColumns from '../../Data/dataColumns';
import { buttonsStepOne, buttonsStepTwo } from '../../Data/dataButtons';

export const ReviewRequests = () => {
  let formHandlerLink;
  const [dataSource, setDataSource] = useState([
    {
      key: '1',
      task: 'qMike1',
      developer: 'AMike',
      status: 'Draft',
      linkOnTheTaskSolution: '',
      linkOnThePullRequest: '',
      actionType: 'Check'
    },
    {
      key: '2',
      task: 'bNick2',
      developer: 'DJohn',
      status: 'Published',
      linkOnTheTaskSolution: '',
      linkOnThePullRequest: '',
      actionType: 'Edit'
    },
    {
      key: '3',
      task: 'zNick3',
      developer: 'DJohn',
      status: 'Completed',
      linkOnTheTaskSolution: '',
      linkOnThePullRequest: '',
      actionType: 'Edit'
    },
    {
      key: '4',
      task: 'wNick2',
      developer: 'DJohn',
      status: 'Draft',
      linkOnTheTaskSolution: '',
      linkOnThePullRequest: '',
      actionType: 'Edit'
    }
  ]);
  const [visebleModalWindow, setVisibleModalWindow] = useState(false);
  const [step, setStep] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [task, setTask] = useState({});

  const handleActionEdit = index => {
    const state = [...dataSource];
    const { actionType } = state[index];
    state[index].actionType = actionType === 'Edit' ? 'Check' : 'Edit';
    setDataSource(state);
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
    setTask({});
  };

  const handleNextButtonModalWindow = () => {
    formHandlerLink
      .validateFields()
      .then(values => {
        setTask({ ...values });
        setStep(step + 1);
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  const handleSaveButtonModalWindow = published => {
    const taskState = { ...task };
    taskState.actionType = published ? 'Check' : 'Edit';
    taskState.status = published ? 'Published' : 'Draft';
    const state = [...dataSource];
    taskState.key = `${state.length + 1}`;
    state.push(taskState);
    setDataSource(state);
    setTask({});
    handleCancelButtonModalWindow();
  };

  const btnStepOne = buttonsStepOne(handleCancelButtonModalWindow, handleNextButtonModalWindow);
  const btnStepTwo = buttonsStepTwo(handleCancelButtonModalWindow, handleSaveButtonModalWindow);

  const getFormHendler = formHandler => {
    formHandlerLink = formHandler;
  };

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
          <SelectingTask getFormHendler={getFormHendler} />
        ) : (
          <CheckingYourself getFormHendler={getFormHendler} />
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
