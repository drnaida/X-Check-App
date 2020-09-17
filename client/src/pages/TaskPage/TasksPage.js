import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Button, Table, notification } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import { getTaskList, deleteTask } from '../../store/actions';
import { useHttp } from '../../hooks';
import { AuthContext } from '../../context/AuthContext';

import createColomns from './Data/dataColomns';

export const TasksPage = () => {
  const { request } = useHttp();
  const { token } = useContext(AuthContext);
  const [taskList, setTaskList] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');

  const handleClickAction = () => {
    console.log('blablabla');
  };

  const columns = createColomns(
    handleClickAction,
    { searchText, setSearchText },
    { searchedColumn, setSearchedColumn }
  );

  const deleteTaskHandler = async id => {
    const res = await deleteTask(id, request, token);
    if (res) {
      setTaskList(await getTaskList(request, token));

      notification.info({
        message: 'Task has been deleted',
        description: '',
        placement: 'topRight',
        duration: 10
      });
    } else {
      notification.warning({
        message: 'Task has not been deleted',
        description: 'Something went wrong. Please try again',
        placement: 'topRight',
        duration: 10
      });
    }
  };
  console.log(taskList);
  useEffect(() => {
    async function fetchData() {
      setTaskList(await getTaskList(request, token));
    }
    fetchData();
  }, []);

  const key = 0;
  const { id, title } = taskList;

  return (
    <div>
      <div>Tasks page</div>
      <Table dataSource={taskList} columns={columns} />
      <ul>
        <li key={key}>
          <span>{title}</span>
          &nbsp;
          <Link to={`/create-task/${id}`}>
            <EditOutlined style={{ fontSize: '20px', color: '#595959' }} />
          </Link>
          <Button
            type="text"
            size="large"
            onClick={() => deleteTaskHandler(id)}
            icon={<DeleteOutlined style={{ fontSize: '20px', color: '#595959' }} />}
          />
        </li>
      </ul>
    </div>
  );
};
