import React, { useContext, useEffect, useState } from 'react';

import { Table, notification, Layout, Row, Col, Typography } from 'antd';

import { getTaskList, deleteTask } from '../../store/actions';
import { useHttp } from '../../hooks';
import { AuthContext } from '../../context/AuthContext';
import { HeaderComponent, FooterComponent } from '../../components';

import createColomns from './Data/dataColomns';

export const TasksPage = () => {
  const { Content } = Layout;
  const { request } = useHttp();
  const { token, githubId } = useContext(AuthContext);
  const [taskList, setTaskList] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const fileredtaskList = taskList.filter(
    listItem => listItem.state === 'PUBLISHED' || listItem.author === githubId
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

  const columns = createColomns(
    deleteTaskHandler,
    { searchText, setSearchText },
    { searchedColumn, setSearchedColumn }
  );

  useEffect(() => {
    async function fetchData() {
      setTaskList(await getTaskList(request, token));
    }
    fetchData();
  }, []);

  return (
    <Layout>
      <HeaderComponent activeMenuItem="['Tasks']" />
      <Content style={{ minHeight: '90vh', padding: '0 36px', marginTop: 100 }}>
        <Row gutter={[0, 20]}>
          <Col span={24}>
            <Typography.Title level={3}>Task list</Typography.Title>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Table dataSource={fileredtaskList} columns={columns} rowKey={record => record.id} />
          </Col>
        </Row>
      </Content>
      <FooterComponent />
    </Layout>
  );
};
