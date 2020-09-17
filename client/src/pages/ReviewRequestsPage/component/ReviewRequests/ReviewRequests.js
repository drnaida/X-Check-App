import React, { useState } from 'react';
import { Button, Table } from 'antd';

import { ModalWindow } from '../../../../components/ModalWindow';

import { SelectingTask } from '../SelectingTask';
import { CheckingYourself } from '../CheckingYourself';

import createColomns from '../../Data/dataColomns';
import { buttonsStepOne, buttonsStepTwo } from '../../Data/dataButtons';

export const ReviewRequests = () => {
  let formHandlerLink;
  const [dataSource, setActionType] = useState([
    {
      key: '1',
      task: 'qMike',
      developer: 'AMike',
      status: 'Draft',
      linkOnTheTaskSolution: '',
      linkOnThePullRequest: '',
      actionType: 'Check'
    },
    {
      key: '2',
      task: 'Nick',
      developer: 'DJohn',
      status: 'Published',
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

  const handleClickAction = index => {
    const state = [...dataSource];
    const { actionType } = state[index];
    state[index].actionType = actionType === 'Edit' ? 'Check' : 'Edit';
    setActionType(state);
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
    setActionType(state);
    setTask({});
    handleCancelButtonModalWindow();
  };

  const btnStepOne = buttonsStepOne(handleCancelButtonModalWindow, handleNextButtonModalWindow);
  const btnStepTwo = buttonsStepTwo(handleCancelButtonModalWindow, handleSaveButtonModalWindow);

  const getFormHendler = formHandler => {
    formHandlerLink = formHandler;
  };

  const columns = createColomns(
    handleClickAction,
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
