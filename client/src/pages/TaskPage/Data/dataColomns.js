/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React from 'react';
import { SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { Button, Input, Space } from 'antd';
import { Link } from 'react-router-dom';

const createColomns = (deleteTaskHandler, searchTextObj, searchedColumnObj) => {
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
      dataIndex: 'title',
      key: 'title',
      sortDirections: ['descend', 'ascend'],
      sorter: (a, b) => sortStrings(a, b, 'title'),
      ...getColumnSearchProps('title')
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
      sortDirections: ['descend', 'ascend'],
      sorter: (a, b) => sortStrings(a, b, 'author'),
      ...getColumnSearchProps('author')
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
      dataIndex: 'id',
      key: 'id',
      render: (_text, record, index) => (
        <>
          <Link to="/create-task/1">
            <EditOutlined style={{ fontSize: '20px', color: '#595959' }} />
          </Link>
          <Button
            type="text"
            size="large"
            onClick={() => deleteTaskHandler(1)}
            icon={<DeleteOutlined style={{ fontSize: '20px', color: '#595959' }} />}
          />
        </>
      )
    }
  ];
};

export default createColomns;
