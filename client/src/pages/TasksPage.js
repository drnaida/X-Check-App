import React from 'react';

// IMPORT FILES TO WORK WITH REDUX //
//----------------------------------
// import { useSelector, useDispatch } from "react-redux";
// import { getAllTasks } from "../store/selectors/tasks";
// import { deleteTask } from "../store/actions/tasks";
import { Layout } from 'antd';

import HeaderComponent from '../components/HeaderComponent/HeaderComponent';

const { Content } = Layout;

const TasksPage = () => {
  // USING TASKS WITH REDUX //
  //------------------------
  // const dispatch = useDispatch();
  // const tasks = useSelector((state) => getAllTasks(state));

  // const handleDelete = (id) => {
  //   dispatch(deleteTask(id));
  // };

  return (
    <Layout>
      <HeaderComponent activeMenuItem="['1']" />
      <Content style={{ padding: '0 50px', marginTop: 64 }}>Tasks page</Content>
    </Layout>
  );
};

export default TasksPage;
