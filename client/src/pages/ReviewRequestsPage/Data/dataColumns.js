/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React from 'react';

import Highlighter from 'react-highlight-words';

import { Button, Input, Space } from 'antd';
import { SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

export const createColomns = (
  githubId,
  editReviewRequestHandler,
  deleteReviewRequestHandler,
  searchTextObj,
  searchedColumnObj
) => {
  let searchInput;

  const { searchText, setSearchText } = searchTextObj;
  const { searchedColumn, setSearchedColumn } = searchedColumnObj;

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('');
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

  return [
    {
      title: 'Task name',
      dataIndex: 'taskTitle',
      key: 'taskTitle',
      sortDirections: ['descend', 'ascend'],
      sorter: (a, b) => sortStrings(a, b, 'taskTitle'),
      ...getColumnSearchProps('taskTitle')
    },
    {
      title: 'Student',
      dataIndex: 'student',
      key: 'student',
      sortDirections: ['descend', 'ascend'],
      sorter: (a, b) => sortStrings(a, b, 'student'),
      ...getColumnSearchProps('student')
    },
    {
      title: 'State',
      dataIndex: 'state',
      key: 'state',
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
      onFilter: (value, record) => record.state.toUpperCase().indexOf(value) === 0
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_text, record) =>
        record.student === githubId && record.state === 'DRAFT' ? (
          <>
            <Button
              type="text"
              size="large"
              onClick={() => editReviewRequestHandler(record.id)}
              icon={<EditOutlined style={{ fontSize: '20px', color: '#595959' }} />}
            />
            <Button
              type="text"
              size="large"
              onClick={() => deleteReviewRequestHandler(record.id)}
              icon={<DeleteOutlined style={{ fontSize: '20px', color: '#595959' }} />}
            />
          </>
        ) : (
          record.student !== githubId && (
            <Button
              type="default"
              size="midle"
              onClick={() => null}
              style={{ color: '#40A9FF', borderColor: '#40A9FF' }}
            >
              Check
            </Button>
          )
        )
    }
  ];
};
