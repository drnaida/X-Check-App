import React, { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { Button, Row, Col, Typography, notification, Layout } from 'antd';

import { v4 as uuidv4 } from 'uuid';

import { HeaderComponent, FooterComponent, ModalWindow } from '../../components';

import {
  addTask,
  editTask,
  setTaskAction,
  addRequirementAction,
  editRequirementAction,
  deleteRequirementAction,
  getTaskById
} from '../../store/actions';
import { taskInitialState } from '../../store/reducers';
import { getTaskSelector } from '../../store/selectors';
import { useHttp } from '../../hooks';

import { AuthContext } from '../../context/AuthContext';

import {
  TaskNameInput,
  TaskDeadlineInput,
  TaskState,
  Requirement,
  AddRequirementWindow,
  ColunmHeaders
} from './components';

import '../../index.scss';
import 'antd/dist/antd.css';

export const CreateTaskPage = () => {
  const { Content } = Layout;
  const { id: taskId } = useParams();
  const { request } = useHttp();
  const { token, githubId } = useContext(AuthContext);
  const dispatch = useDispatch();
  const task = useSelector(getTaskSelector);
  const { title, categories, requirements, deadline, state } = task;
  const [isModalWindowOpen, setIsModalWindowOpen] = useState(false);
  const [requirementId, setRequirementId] = useState('');
  const [requirementTitle, setRequirementTitle] = useState('');
  const [requirementCategoty, setRequirementCategoty] = useState(categories[0]);
  const [subRequirementId, setSubRequirementId] = useState('');
  const [requirementItemDescription, setRequirementItemDescription] = useState('');
  const [requirementItemScore, setRequirementItemScore] = useState(0);
  const [isOnlyForMentors, setIsOnlyForMentors] = useState(false);
  const [requirementItems, setRequirementItems] = useState([]);

  const warning = (message, description) => {
    notification.warning({
      message,
      description,
      placement: 'topRight',
      duration: 10
    });
  };

  const clearRequirement = () => {
    setRequirementId('');
    setRequirementTitle('');
    setRequirementCategoty(categories[0]);
    setRequirementItems([]);
  };

  const clearRequirementItemForm = () => {
    setSubRequirementId('');
    setRequirementItemDescription('');
    setRequirementItemScore(0);
    setIsOnlyForMentors(false);
  };

  const toggleModalWindow = (reqId = null) => {
    if (!reqId) {
      clearRequirement();
      clearRequirementItemForm();
    }
    setIsModalWindowOpen(!isModalWindowOpen);
  };

  const setReqirement = reqirementId => {
    const requirement = requirements.find(item => item.id === reqirementId);
    const { id, title: reqTitle, category, items } = requirement;
    setRequirementId(id);
    setRequirementTitle(reqTitle);
    setRequirementCategoty(category);
    setRequirementItems([...items]);
  };

  const setReqirementItem = id => {
    const requirementItem = requirementItems.find(item => item.id === id);
    const { description, score, onlyForMentors } = requirementItem;
    setSubRequirementId(id);
    setRequirementItemDescription(description);
    setRequirementItemScore(score);
    setIsOnlyForMentors(onlyForMentors);
  };

  const changeRequirementTitle = event => {
    setRequirementTitle(event.target.value);
  };

  const changeRequirementCategoty = event => {
    const prevRequirementCategoty = requirementCategoty;
    const isChangeToFines =
      requirementItems.length && prevRequirementCategoty !== 'Fines' && event === 'Fines';
    const isChangeFromFines =
      requirementItems.length && prevRequirementCategoty === 'Fines' && event !== 'Fines';

    if (isChangeToFines || isChangeFromFines) {
      const changedRequirementItems = requirementItems.map(item => {
        return { ...item, score: 0 };
      });
      setRequirementItems(changedRequirementItems);
    }
    setRequirementCategoty(event);
  };

  const changeRequirementItemDescription = event => {
    setRequirementItemDescription(event.target.value);
  };

  const changeRequirementItemScore = value => {
    const score = Number.isNaN(+value) ? 0 : value;
    setRequirementItemScore(score);
  };

  const changeIsOnlyForMentors = () => {
    setIsOnlyForMentors(!isOnlyForMentors);
  };

  const deleteRequirement = id => {
    dispatch(deleteRequirementAction(id));
  };

  const deleteItem = id => {
    const filteredRequirementItems = requirementItems.filter(item => item.id !== id);
    setRequirementItems(filteredRequirementItems);
  };

  const editItem = () => {
    if (requirementItemDescription) {
      const changedRequirementItems = requirementItems.map(item => {
        return item.id === subRequirementId
          ? {
              ...item,
              description: requirementItemDescription,
              score: requirementItemScore,
              onlyForMentors: isOnlyForMentors
            }
          : item;
      });
      setRequirementItems(changedRequirementItems);
      clearRequirementItemForm();
      return true;
    }
    const message = 'Description is empty';
    const description = 'You should discribe the item for check';
    warning(message, description);
    return false;
  };

  const changeRequirementItems = () => {
    if (requirementItemDescription) {
      const requirementItem = {
        id: uuidv4(),
        description: requirementItemDescription,
        score: requirementItemScore,
        onlyForMentors: isOnlyForMentors
      };
      setRequirementItems([...requirementItems, requirementItem]);
      clearRequirementItemForm();
      return true;
    }
    const message = 'Description is empty';
    const description = 'You should discribe the item for check';
    warning(message, description);
    return false;
  };

  const addRequirement = () => {
    if (requirementTitle && requirementItems.length && !requirementItemDescription.trim()) {
      if (requirementId) {
        const changedRequirements = requirements.map(item => {
          return item.id === requirementId
            ? {
                ...item,
                title: requirementTitle,
                category: requirementCategoty,
                items: requirementItems
              }
            : item;
        });
        dispatch(editRequirementAction(changedRequirements));
      } else {
        dispatch(
          addRequirementAction({
            id: uuidv4(),
            title: requirementTitle,
            category: requirementCategoty,
            items: requirementItems
          })
        );
      }
      clearRequirement();
      clearRequirementItemForm();
      toggleModalWindow();
    } else {
      let message = '';
      let description = '';
      if (requirementItemDescription.trim()) {
        message = 'Item for check has not been saved';
        description = 'You should save item for check before to save the task';
      } else if (!requirementTitle) {
        message = 'Title of the requirement is empty';
        description = 'You have to enter the name of the requirement';
      } else if (!requirementItems.length) {
        message = 'There are no items for check';
        description = 'You have to add at least one item';
      }
      warning(message, description);
    }
  };

  const saveTask = async () => {
    if (!title) {
      const message = 'Title of the task is empty';
      const description = 'You have to enter the name of the task';
      warning(message, description);
    } else {
      let res;

      if (taskId) {
        res = await editTask(taskId, task, request, token);
      } else {
        console.log(task);
        task.id = uuidv4();
        task.author = githubId;
        res = await addTask(task, request, token);
      }

      if (res) {
        let message = '';
        let description = '';

        if (taskId) {
          message = 'Task has been changed';
        } else {
          message = 'Task has been added';
          description = `You have created the ${task.title}`;
          dispatch(setTaskAction(taskInitialState));
        }

        clearRequirement();
        clearRequirementItemForm();

        notification.info({
          message,
          description,
          placement: 'topRight',
          duration: 10
        });
      } else {
        const message = 'Task has not been added';
        const description = 'Something is wrong. Please try again';

        warning(message, description);
      }
    }
  };

  const publishTask = () => {
    task.state = 'PUBLISHED';
    saveTask();
  };

  useEffect(() => {
    async function fetchData() {
      const taskById = await getTaskById(taskId, request, token);

      dispatch(setTaskAction(taskById));
    }

    if (taskId) {
      fetchData();
    } else {
      dispatch(setTaskAction(taskInitialState));
    }
  }, []);

  return (
    <Layout>
      <HeaderComponent activeMenuItem="['Create Task']" />
      <Content style={{ minHeight: '90vh', padding: '0 36px', marginTop: 100 }}>
        <Row gutter={[0, 20]}>
          <Col span={24}>
            <Typography.Title level={3}>{taskId ? 'Edit task' : 'Create task'}</Typography.Title>
          </Col>
        </Row>
        <Row gutter={[0, 30]} align="bottom" justify="space-between">
          <Col span={6}>
            <TaskNameInput title={title} isDisabled={task.state === 'PUBLISHED'} />
          </Col>
          <Col span={4}>
            <TaskDeadlineInput deadline={deadline} isDisabled={task.state === 'PUBLISHED'} />
          </Col>
          <Col span={2}>
            <TaskState state={state} />
          </Col>
          <Col span={4}>
            <Button
              type="ghost"
              size="large"
              onClick={saveTask}
              disabled={task.state === 'PUBLISHED'}
              block
            >
              Save and not publish
            </Button>
          </Col>
          <Col span={4}>
            <Button
              type="primary"
              size="large"
              onClick={publishTask}
              disabled={task.state === 'PUBLISHED'}
              block
            >
              Finish and publish
            </Button>
          </Col>
        </Row>
        <Row gutter={[0, 50]}>
          <Col span={6}>
            <Button
              type="primary"
              size="large"
              onClick={() => toggleModalWindow(null)}
              disabled={task.state === 'PUBLISHED'}
              block
            >
              Add requirement
            </Button>
          </Col>
        </Row>
        {categories.map(category => {
          const basicRequirements = requirements.filter(
            requirement => requirement.category === category
          );
          if (basicRequirements.length) {
            return (
              <div key={`${category}`}>
                <Row gutter={[0, 15]}>
                  <Col span={6}>
                    <Typography.Title level={3} style={{ marginTop: '25px' }}>
                      {category !== 'Fines' ? `${category} scope` : `${category}`}
                    </Typography.Title>
                  </Col>
                </Row>
                <ColunmHeaders />
                {basicRequirements.map((basicRequirement, index) => {
                  const key = index;
                  return (
                    <Requirement
                      key={`${basicRequirement.title}${key}`}
                      requirement={basicRequirement}
                      setReqirement={setReqirement}
                      deleteRequirement={deleteRequirement}
                      toggleModalWindow={toggleModalWindow}
                      taskState={state}
                    />
                  );
                })}
              </div>
            );
          }
          return null;
        })}
        <ModalWindow
          title={!requirementId ? 'Add requirement' : 'Edit requirement'}
          visible={isModalWindowOpen}
          handlerOkButton={addRequirement}
          handlerCancelButton={toggleModalWindow}
        >
          <AddRequirementWindow
            title={requirementTitle}
            category={requirementCategoty}
            itemDescription={requirementItemDescription}
            itemScore={requirementItemScore}
            onlyForMentors={isOnlyForMentors}
            requirementItemList={requirementItems}
            categoryList={categories}
            changeTitle={changeRequirementTitle}
            changeCategory={changeRequirementCategoty}
            changeItemDescription={changeRequirementItemDescription}
            changeItemScore={changeRequirementItemScore}
            changeOnlyForMentors={changeIsOnlyForMentors}
            saveRequirementItem={changeRequirementItems}
            deleteItem={deleteItem}
            editItem={editItem}
            setReqirementItem={setReqirementItem}
            clearRequirementItemForm={clearRequirementItemForm}
          />
        </ModalWindow>
      </Content>
      <FooterComponent />
    </Layout>
  );
};
