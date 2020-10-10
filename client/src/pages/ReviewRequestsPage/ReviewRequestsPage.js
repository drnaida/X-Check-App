import React, { useState, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { v4 as uuidv4 } from 'uuid';

import { Button, Row, Col, Typography, Layout, Table, notification } from 'antd';

import { HeaderComponent, FooterComponent, ModalWindow } from '../../components';

import {
  taskListSelector,
  reviewRequestListSelector,
  reviewRequestSelector
} from '../../store/selectors';

import {
  getTaskList,
  getTaskListAction,
  getReviewRequestById,
  getReviewRequestList,
  getReviewRequestListAction,
  setReviewRequestAction,
  addTaskIdAction,
  addTaskTitleAction,
  addTaskSolutionLinkAction,
  addPullRequestLinkAction,
  addSelfMakrAction,
  addReviewRequest,
  editReviewRequest,
  deleteReviewRequest,
  addMakrAction,
  addCommentAction
} from '../../store/actions';

import { useHttp } from '../../hooks';

import { AuthContext } from '../../context/AuthContext';

import { CreateReviewRequest, CheckReviewRequest } from './component';
import { createColumns, buttonsStepOne, buttonsStepTwo } from './Data';

const reviewRequestInitialState = {
  id: '',
  student: '',
  pullRequestLink: '',
  deployLink: '',
  state: 'DRAFT',
  taskId: '',
  taskTitle: null,
  examiner: [],
  categories: ['Basic', 'Advanced', 'Extra', 'Fines'],
  requirements: []
};

export const ReviewRequestsPage = () => {
  const { Content } = Layout;
  const { request } = useHttp();
  const dispatch = useDispatch();
  const { token, githubId } = useContext(AuthContext);
  const taskList = useSelector(taskListSelector).filter(task => task.state === 'PUBLISHED');
  const reviewRequestList = useSelector(reviewRequestListSelector);
  const reviewRequest = useSelector(reviewRequestSelector);
  const { taskId, taskTitle, deployLink, pullRequestLink } = reviewRequest;
  const [isEditing, setIsEditing] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [isSelfCheck, setIsSelfCheck] = useState(false);
  const [visebleModalWindow, setVisibleModalWindow] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const fileredReviewRequestList = reviewRequestList.filter(
    listItem => listItem.state === 'PUBLISHED' || listItem.student === githubId
  );
  let modalWindowTitle = '';

  if (isSelfCheck && isEditing) {
    modalWindowTitle = 'Edit review request';
  } else if (isChecking) {
    modalWindowTitle = 'Check review request';
  } else if (isSelfCheck) {
    modalWindowTitle = 'Self-checking';
  } else {
    modalWindowTitle = 'Create review request';
  }

  const warning = (message, description) => {
    notification.warning({
      message,
      description,
      placement: 'topRight',
      duration: 10
    });
  };

  const handleCancelButtonModalWindow = () => {
    setIsEditing(false);
    setIsChecking(false);
    setIsSelfCheck(false);
    setVisibleModalWindow(false);

    dispatch(setReviewRequestAction(reviewRequestInitialState));
  };

  const handleNextButtonModalWindow = () => {
    if (!taskTitle || !deployLink.trim() || !pullRequestLink.trim()) {
      let message = '';
      let description = '';

      if (!taskTitle) {
        message = 'You have not chosen a task';
        description = 'Please choose a task to create the review request';
      } else if (!deployLink.trim()) {
        message = 'You have not entered the link to the task solution';
        description = 'Please enter the link';
      } else if (!pullRequestLink.trim()) {
        message = 'You have not entered the link to the pull request';
        description = 'Please enter the link';
      }

      warning(message, description);
    } else {
      const { requirements } = taskList.find(task => task.id === taskId);

      const newRequirements = requirements.map(requirement => {
        const { items } = requirement;
        const newItems = items.map(item => {
          const { id, description, score } = item;
          const newItem = {
            id,
            description,
            score,
            selfMark: 0,
            marks: []
          };

          return newItem;
        });

        return { ...requirement, items: newItems };
      });

      const newReviewRequest = {
        ...reviewRequest,
        id: uuidv4(),
        student: githubId,
        requirements: newRequirements
      };

      dispatch(setReviewRequestAction(newReviewRequest));
      setIsSelfCheck(true);
    }
  };

  const handleSaveButtonModalWindow = async publish => {
    if (!reviewRequest.deployLink.trim() || !reviewRequest.pullRequestLink.trim()) {
      let message = '';
      let description = '';

      if (!reviewRequest.deployLink.trim()) {
        message = 'You have not entered the link to the task solution';
        description = 'Please enter the link';
      } else if (!reviewRequest.pullRequestLink.trim()) {
        message = 'You have not entered the link to the pull request';
        description = 'Please enter the link';
      }

      warning(message, description);
    } else {
      let newReviewRequest = reviewRequest;

      if (publish) {
        newReviewRequest = { ...reviewRequest, state: 'PUBLISHED' };
      }

      let res;

      if (isEditing || isChecking) {
        res = await editReviewRequest(newReviewRequest.id, newReviewRequest, request, token);
      } else {
        res = await addReviewRequest(newReviewRequest, request, token);
      }

      if (res) {
        let message = '';
        const description = '';

        if (isEditing || isChecking) {
          message = 'Review request has been changed';
        } else {
          message = 'Review request has been added';
        }

        await dispatch(getReviewRequestListAction(await getReviewRequestList(request, token)));
        handleCancelButtonModalWindow();

        notification.info({
          message,
          description,
          placement: 'topRight',
          duration: 10
        });
      } else {
        const message = 'Review request has not been added';
        const description = 'Something is wrong. Please try again';

        warning(message, description);
      }
    }
  };

  const editReviewRequestHandler = async id => {
    dispatch(setReviewRequestAction(await getReviewRequestById(id, request, token)));

    setIsEditing(true);
    setIsSelfCheck(true);
    setVisibleModalWindow(true);
  };

  const deleteReviewRequestHandler = async id => {
    const res = await deleteReviewRequest(id, request, token);
    if (res) {
      await dispatch(getReviewRequestListAction(await getReviewRequestList(request, token)));

      notification.info({
        message: 'Review request has been deleted',
        description: '',
        placement: 'topRight',
        duration: 10
      });
    } else {
      notification.warning({
        message: 'Review request has not been deleted',
        description: 'Something went wrong. Please try again',
        placement: 'topRight',
        duration: 10
      });
    }
  };

  const checkReviewRequest = async id => {
    const reviewRequestById = await getReviewRequestById(id, request, token);
    const { examiner, requirements } = reviewRequestById;
    const IsExaminer = examiner.find(item => item.id === githubId);
    let newReviewRequest;

    if (!IsExaminer) {
      const newRequirements = requirements.map(requirement => {
        const { items } = requirement;
        const newItems = items.map(item => {
          const { marks } = item;
          const mark = {
            examinerId: githubId,
            mark: item.selfMark,
            comment: '',
            dispute: {
              id: uuidv4(),
              comment: '',
              state: null,
              suggestedScore: 0
            }
          };

          marks.push(mark);

          return { ...item, marks };
        });

        return { ...requirement, items: newItems };
      });

      examiner.push({ id: githubId, comment: '' });

      newReviewRequest = { ...reviewRequestById, examiner, requirements: newRequirements };
    } else {
      newReviewRequest = reviewRequestById;
    }

    dispatch(setReviewRequestAction(newReviewRequest));

    setIsChecking(true);
    setVisibleModalWindow(true);
  };

  const columns = createColumns(
    githubId,
    editReviewRequestHandler,
    deleteReviewRequestHandler,
    checkReviewRequest,
    { searchText, setSearchText },
    { searchedColumn, setSearchedColumn }
  );

  const changeTaskData = id => {
    const isReviewRequest = reviewRequestList.find(
      item => item.taskId === id && item.student === githubId
    );

    if (!isReviewRequest) {
      const { title } = taskList.find(task => task.id === id);
      dispatch(addTaskIdAction(id));
      dispatch(addTaskTitleAction(title));
    } else {
      dispatch(addTaskTitleAction(null));
      const message = 'Choose another task';
      const description = (
        <div>
          Review request for
          <strong style={{ margin: '0 5px' }}>{isReviewRequest.taskTitle}</strong>
          has already been created
        </div>
      );

      warning(message, description);
    }
  };

  const changeTaskSolutionLink = event => {
    dispatch(addTaskSolutionLinkAction(event.target.value));
  };

  const changePullRequestLink = event => {
    dispatch(addPullRequestLinkAction(event.target.value));
  };

  const addSelfMark = (value, requirementId, itemId) => {
    if (isChecking) {
      dispatch(addMakrAction({ value, requirementId, itemId, githubId }));
    } else {
      dispatch(addSelfMakrAction({ value, requirementId, itemId }));
    }
  };

  const addComment = (event, requirementId, itemId) => {
    const {
      target: { value }
    } = event;

    dispatch(addCommentAction({ value, requirementId, itemId, githubId }));
  };

  const btnStepOne = buttonsStepOne(handleCancelButtonModalWindow, handleNextButtonModalWindow);
  const btnStepTwo = buttonsStepTwo(
    handleCancelButtonModalWindow,
    handleSaveButtonModalWindow,
    isChecking
  );

  useEffect(() => {
    async function fetchData() {
      dispatch(getReviewRequestListAction(await getReviewRequestList(request, token)));
      dispatch(getTaskListAction(await getTaskList(request, token)));
    }
    fetchData();
  }, []);

  return (
    <Layout>
      <HeaderComponent activeMenuItem="['Review Requests']" />
      <Content style={{ minHeight: '90vh', padding: '0 36px', marginTop: 100 }}>
        <Row gutter={[0, 20]}>
          <Col span={24}>
            <Typography.Title level={3}>Review requests</Typography.Title>
          </Col>
        </Row>
        <Row gutter={[0, 40]}>
          <Col span={4}>
            <Button type="primary" size="large" onClick={() => setVisibleModalWindow(true)} block>
              Create review request
            </Button>
          </Col>
        </Row>
        <Table
          dataSource={fileredReviewRequestList}
          columns={columns}
          rowKey={record => record.id}
        />
        <ModalWindow
          width={!isSelfCheck && !isChecking ? 600 : '90%'}
          title={modalWindowTitle}
          visible={visebleModalWindow}
          buttons={!isSelfCheck && !isChecking ? btnStepOne : btnStepTwo}
        >
          {!isSelfCheck && !isChecking ? (
            <CreateReviewRequest
              taskList={taskList}
              changeTaskData={changeTaskData}
              changeTaskSolutionLink={changeTaskSolutionLink}
              changePullRequestLink={changePullRequestLink}
            />
          ) : (
            <CheckReviewRequest
              githubId={githubId}
              isEditing={isEditing}
              isChecking={isChecking}
              addSelfMark={addSelfMark}
              changeTaskSolutionLink={changeTaskSolutionLink}
              changePullRequestLink={changePullRequestLink}
              addComment={addComment}
            />
          )}
        </ModalWindow>
      </Content>
      <FooterComponent />
    </Layout>
  );
};
