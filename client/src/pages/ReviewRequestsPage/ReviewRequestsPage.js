/* eslint-disable react/display-name */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState } from 'react';
import { Button, Table } from 'antd';

import { ModalWindow } from '../../components/ModalWindow';

export const ReviewRequestsPage = () => {
  const [dataSource, setActionType] = useState([
    {
      key: '1',
      taskName: 'Mike',
      developer: 'Mike',
      status: 'Draft',
      actionType: 'Check'
    },
    {
      key: '2',
      taskName: 'John',
      developer: 42,
      status: 'Published',
      actionType: 'Edit'
    },
    {
      key: '3',
      taskName: 'John',
      developer: 42,
      status: 'Completed',
      actionType: 'Edit'
    },
    {
      key: '4',
      taskName: 'John',
      developer: 42,
      status: 'Draft',
      actionType: 'Check'
    }
  ]);
  const [visebleModalWindow, setVisibleModalWindow] = useState(false);

  const handlerClickAction = index => {
    const state = [...dataSource];
    const { actionType } = state[index];
    state[index].actionType = actionType === 'Edit' ? 'Check' : 'Edit';
    setActionType(state);
  };

  const handlerOkButtonModalWindow = () => {
    setVisibleModalWindow(false);
  };
  const handlerCancelButtonModalWindow = () => {
    setVisibleModalWindow(false);
  };

  const columns = [
    {
      title: 'Task name',
      dataIndex: 'taskName',
      key: 'taskName'
    },
    {
      title: 'Developer',
      dataIndex: 'developer',
      key: 'developer'
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

  return (
    <>
      <ModalWindow
        title="Creating new rewiew request"
        visible={visebleModalWindow}
        handlerOkButton={handlerOkButtonModalWindow}
        handlerCancelButton={handlerCancelButtonModalWindow}
      />
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
