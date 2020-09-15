import React from 'react';

// IMPORT FILES TO WORK WITH REDUX //
//----------------------------------
// import { useSelector, useDispatch } from "react-redux";
// import { getAllTasks } from "../store/selectors/tasks";
// import { deleteTask } from "../store/actions/tasks";
import { Layout } from 'antd';

import HeaderComponent from '../components/HeaderComponent/HeaderComponent';
import FooterComponent from '../components/FooterComponent/FooterComponent';

const { Content } = Layout;

export const TasksPage = () => {
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
      <FooterComponent />
    </Layout>
  );
};
