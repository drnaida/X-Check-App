/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector } from 'react-redux';

import { Row, Col, Input, Select } from 'antd';

import { reviewRequestSelector } from '../../../../store/selectors';

export const CreateReviewRequest = ({
  taskList,
  changeTaskData,
  changeTaskSolutionLink,
  changePullRequestLink
}) => {
  const { Option } = Select;
  const { taskTitle, deployLink, pullRequestLink } = useSelector(reviewRequestSelector);

  return (
    <>
      <Row gutter={[0, 20]}>
        <Col span={24}>
          <label>
            Task name
            <sup style={{ color: '#FF4D4F' }}>*</sup>
          </label>
          <Select
            placeholder="Select task"
            size="large"
            style={{ width: '100%' }}
            value={taskTitle}
            onChange={changeTaskData}
          >
            {taskList.map(task => {
              const { id, title } = task;
              return (
                <Option key={`${id}`} value={id}>
                  {title}
                </Option>
              );
            })}
          </Select>
        </Col>
      </Row>
      <Row gutter={[0, 20]}>
        <Col span={24}>
          <label>
            Link to the task solution
            <sup style={{ color: '#FF4D4F' }}>*</sup>
          </label>
          <Input
            type="text"
            size="large"
            value={deployLink}
            onChange={changeTaskSolutionLink}
            allowClear
          />
        </Col>
      </Row>
      <Row gutter={[0, 20]}>
        <Col span={24}>
          <label>
            Link to the pull request
            <sup style={{ color: '#FF4D4F' }}>*</sup>
          </label>
          <Input
            type="text"
            size="large"
            value={pullRequestLink}
            onChange={changePullRequestLink}
            allowClear
          />
        </Col>
      </Row>
    </>
  );
};
