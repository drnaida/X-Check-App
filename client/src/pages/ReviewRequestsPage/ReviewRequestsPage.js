/* eslint-disable react/display-name */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { Button, Table } from 'antd';

import { ModalWindow } from '../../components/ModalWindow';

import { SelectingTask } from './component/SelectingTask';
import { CheckingYourself } from './component/CheckingYourself';

export const ReviewRequestsPage = () => {
  let formHandlerLink;

  const [dataSource, setActionType] = useState([
    {
      key: '1',
      taskName: 'Mike',
      developer: 'AMike',
      status: 'Draft',
      actionType: 'Check'
    },
    {
      key: '2',
      taskName: 'John',
      developer: 'DJohn',
      status: 'Published',
      actionType: 'Edit'
    },
    {
      key: '3',
      taskName: 'John',
      developer: 'BTom',
      status: 'Completed',
      actionType: 'Edit'
    },
    {
      key: '4',
      taskName: 'John',
      developer: 'CNick',
      status: 'Draft',
      actionType: 'Check'
    }
  ]);
  const [visebleModalWindow, setVisibleModalWindow] = useState(false);
  const [step, setStep] = useState(1);

  const handlerClickAction = index => {
    const state = [...dataSource];
    const { actionType } = state[index];
    state[index].actionType = actionType === 'Edit' ? 'Check' : 'Edit';
    setActionType(state);
  };

  const handlerCancelButtonModalWindow = () => {
    setVisibleModalWindow(false);
    setStep(1);
  };

  const handlerNextButtonModalWindow = () => {
    formHandlerLink
      .validateFields()
      .then(values => {
        console.log(values);
        setStep(step + 1);
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  const handlerSaveNotPublishedButtonModalWindow = () => {
    handlerCancelButtonModalWindow();
  };

  const handlerSavePublishedButtonModalWindow = () => {
    handlerCancelButtonModalWindow();
  };

  const sortStrings = (a, b, field) => {
    if (a[field] > b[field]) {
      return 1;
    }
    if (a[field] < b[field]) {
      return -1;
    }
    return 0;
  };

  const columns = [
    {
      title: 'Task name',
      dataIndex: 'taskName',
      key: 'taskName',
      sortDirections: ['descend', 'ascend'],
      sorter: (a, b) => sortStrings(a, b, 'taskName')
    },
    {
      title: 'Developer',
      dataIndex: 'developer',
      key: 'developer',
      sortDirections: ['descend', 'ascend'],
      sorter: (a, b) => sortStrings(a, b, 'developer')
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filters: [
        {
          text: 'Draft',
          value: 'DRAFT'
        },
        {
          text: 'Published',
          value: 'PUBLISHED'
        },
        {
          text: 'Completed',
          value: 'COMPLETED'
        }
      ],
      onFilter: (value, record) => record.status.toUpperCase().indexOf(value) === 0
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_text, record, index) => (
        <a
          tabIndex={index}
          role="button"
          onKeyPress={() => handlerClickAction(index)}
          onClick={() => handlerClickAction(index)}
        >
          {record.actionType}
        </a>
      )
    }
  ];

  const buttonsStepOne = [
    <Button key="1" onClick={handlerCancelButtonModalWindow}>
      Cancel
    </Button>,
    <Button key="2" type="primary" onClick={handlerNextButtonModalWindow}>
      Next
    </Button>
  ];

  const buttonsStepTwo = [
    <Button key="1" onClick={handlerCancelButtonModalWindow}>
      Cancel
    </Button>,
    <Button key="2" type="primary" onClick={handlerSaveNotPublishedButtonModalWindow}>
      Save and not published
    </Button>,
    <Button key="3" type="primary" onClick={handlerSavePublishedButtonModalWindow}>
      Save and published
    </Button>
  ];

  const getFormHendler = formHandler => {
    formHandlerLink = formHandler;
  };

  return (
    <>
      <ModalWindow
        title="Creating new rewiew request"
        visible={visebleModalWindow}
        buttons={step === 1 ? buttonsStepOne : buttonsStepTwo}
        handlerCancelButton={handlerCancelButtonModalWindow}
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
