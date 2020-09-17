import React, { useContext, useEffect, useState } from 'react';

import { Table, notification, Layout } from 'antd';

import { getTaskList, deleteTask } from '../../store/actions';
import { useHttp } from '../../hooks';
import { AuthContext } from '../../context/AuthContext';
import { HeaderComponent, FooterComponent } from '../../components';

import createColomns from './Data/dataColomns';

const { Content } = Layout;

export const TasksPage = () => {
  const { request } = useHttp();
  const { token } = useContext(AuthContext);
  const [taskList, setTaskList] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');

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
  const columns = createColomns(
    deleteTaskHandler,
    { searchText, setSearchText },
    { searchedColumn, setSearchedColumn }
  );
  console.log(taskList);
  useEffect(() => {
    async function fetchData() {
      setTaskList(await getTaskList(request, token));
    }
    fetchData();
  }, []);

  return (
    <Layout>
      <HeaderComponent activeMenuItem="['1']" />
      <Content style={{ padding: '0 50px', marginTop: 64 }}>
        <Table dataSource={taskList} columns={columns} />
      </Content>
      <FooterComponent />
    </Layout>
  );
};
