/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React from 'react';
import { SearchOutlined, EditOutlined, CheckOutlined, DeleteOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { Button, Input, Space, Popover } from 'antd';

const createColumns = (handleActions, searchTextObj, searchedColumnObj) => {
  let searchInput;

  const { searchText, setSearchText } = searchTextObj;
  const { searchedColumn, setSearchedColumn } = searchedColumnObj;
  const { handleActionEdit, handleActionDelete, handleActionCheck } = handleActions;

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

  const renderActionButtons = record => {
    const reviewRequestStatus = record.state.toUpperCase();
    const index = Number(record.key) - 1;
    const classStyle = { fontSize: '20px', color: '#1890ff' };
    const editContent = <p>Edit this review request</p>;
    const deleteContent = <p>Delete this review request</p>;
    const CheckContent = <p>Check this review request</p>;

    if (reviewRequestStatus === 'DRAFT') {
      return (
        <Space>
          <Popover title="Edit" content={editContent}>
            <Button
              onClick={() => handleActionEdit(index)}
              type="text"
              icon={<EditOutlined style={classStyle} />}
            />
          </Popover>
          <Popover title="Delete" content={deleteContent}>
            <Button
              onClick={() => handleActionDelete(index)}
              type="text"
              icon={<DeleteOutlined style={classStyle} />}
            />
          </Popover>
        </Space>
      );
    }
    if (reviewRequestStatus === 'PUBLISHED') {
      return (
        <Popover title="Check" content={CheckContent}>
          <Button
            onClick={() => handleActionCheck(index)}
            type="text"
            icon={<CheckOutlined style={classStyle} />}
          />
        </Popover>
      );
    }
    return null;
  };

  return [
    {
      title: 'Task name',
      dataIndex: 'id',
      key: 'id',
      sortDirections: ['descend', 'ascend'],
      sorter: (a, b) => sortStrings(a, b, 'id'),
      ...getColumnSearchProps('id')
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
      render: (_text, record) => renderActionButtons(record)
    }
  ];
};

export default createColumns;
