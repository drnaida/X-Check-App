/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector } from 'react-redux';

import { Row, Col, Typography, Input, Button } from 'antd';

import { reviewRequestSelector } from '../../../../store/selectors';

import './CheckReviewRequest.scss';

import { Requirement, ColunmHeaders } from './components';

export const CheckReviewRequest = ({
  githubId,
  isEditing,
  isChecking,
  addSelfMark,
  changeTaskSolutionLink,
  changePullRequestLink,
  addComment
}) => {
  const {
    taskTitle,
    requirements,
    categories,
    deployLink,
    pullRequestLink,
    examiner,
    student
  } = useSelector(reviewRequestSelector);
  const IsExaminer = examiner.find(item => item.id === githubId);
  const items = requirements.flatMap(requirement => {
    return requirement.items;
  });
  const totalScore = items.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.score;
  }, 0);
  let totalMark;

  if (isChecking) {
    totalMark = items.reduce((accumulator, currentValue) => {
      const { mark } = currentValue.marks.find(item => item.examinerId === IsExaminer.id);

      return accumulator + mark;
    }, 0);
  } else {
    totalMark = items.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.selfMark;
    }, 0);
  }

  return (
    <div className="check-review-request">
      <Row gutter={[0, 20]}>
        <Col sapn={24}>
          <Typography.Title level={3}>{taskTitle}</Typography.Title>
        </Col>
      </Row>
      {isChecking && (
        <Row gutter={[0, 20]}>
          <Col span={8}>
            Developer:&nbsp;
            <strong>{student}</strong>
          </Col>
        </Row>
      )}
      {isEditing && (
        <Row gutter={[60, 30]}>
          <Col span={12}>
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
          <Col span={12}>
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
      )}
      {isChecking && (
        <Row gutter={[0, 20]}>
          <Col span={8}>
            Deployed solution:
            <Button type="link" href={deployLink} target="_blank" style={{ fontStyle: 'italic' }}>
              {deployLink}
            </Button>
          </Col>
          <Col span={16}>
            Pull request:
            <Button
              type="link"
              href={pullRequestLink}
              target="_blank"
              style={{ fontStyle: 'italic' }}
            >
              {pullRequestLink}
            </Button>
          </Col>
        </Row>
      )}
      <Row gutter={[0, 0]}>
        <Col sapn={24}>{`Total score: ${totalMark} / ${totalScore}`}</Col>
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
                  <Typography.Title level={4} style={{ marginTop: '25px' }}>
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
                    addSelfMark={addSelfMark}
                    isChecking={isChecking}
                    IsExaminer={IsExaminer}
                    addComment={addComment}
                  />
                );
              })}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};
