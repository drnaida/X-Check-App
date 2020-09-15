/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { Button, Table, Input, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

import { ModalWindow } from '../../components/ModalWindow';

import { SelectingTask } from './component/SelectingTask';
import { CheckingYourself } from './component/CheckingYourself';

export const ReviewRequestsPage = () => {
  let formHandlerLink;
  let searchInput;

  const [dataSource, setActionType] = useState([
    {
      key: '1',
      task: 'qMike',
      developer: 'AMike',
      status: 'Draft',
      actionType: 'Check'
    },
    {
      key: '2',
      task: 'Nick',
      developer: 'DJohn',
      status: 'Published',
      actionType: 'Edit'
    },
    {
      key: '3',
      task: 'Jeremy',
      developer: 'BTom',
      status: 'Completed',
      actionType: 'Edit'
    },
    {
      key: '4',
      task: 'Neo',
      developer: 'CNick',
      status: 'Draft',
      actionType: 'Check'
    }
  ]);
  const [visebleModalWindow, setVisibleModalWindow] = useState(false);
  const [step, setStep] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');

  const handleClickAction = index => {
    const state = [...dataSource];
    const { actionType } = state[index];
    state[index].actionType = actionType === 'Edit' ? 'Check' : 'Edit';
    setActionType(state);
  };

  const handleCancelButtonModalWindow = () => {
    setVisibleModalWindow(false);
    setStep(1);
  };

  const handleNextButtonModalWindow = () => {
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

  const handleSaveNotPublishedButtonModalWindow = () => {
    handleCancelButtonModalWindow();
  };

  const handleSavePublishedButtonModalWindow = () => {
    handleCancelButtonModalWindow();
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

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.select(), 100);
      }
    },
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      )
  });

  const columns = [
    {
      title: 'Task name',
      dataIndex: 'task',
      key: 'task',
      sortDirections: ['descend', 'ascend'],
      sorter: (a, b) => sortStrings(a, b, 'task'),
      ...getColumnSearchProps('task')
    },
    {
      title: 'Developer',
      dataIndex: 'developer',
      key: 'developer',
      sortDirections: ['descend', 'ascend'],
      sorter: (a, b) => sortStrings(a, b, 'developer'),
      ...getColumnSearchProps('developer')
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
          onKeyPress={() => handleClickAction(index)}
          onClick={() => handleClickAction(index)}
        >
          {record.actionType}
        </a>
      )
    }
  ];

  const buttonsStepOne = [
    <Button key="1" onClick={handleCancelButtonModalWindow}>
      Cancel
    </Button>,
    <Button key="2" type="primary" onClick={handleNextButtonModalWindow}>
      Next
    </Button>
  ];

  const buttonsStepTwo = [
    <Button key="1" onClick={handleCancelButtonModalWindow}>
      Cancel
    </Button>,
    <Button key="2" type="primary" onClick={handleSaveNotPublishedButtonModalWindow}>
      Save and not published
    </Button>,
    <Button key="3" type="primary" onClick={handleSavePublishedButtonModalWindow}>
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
