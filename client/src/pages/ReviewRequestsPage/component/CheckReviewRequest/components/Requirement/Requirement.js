/* eslint-disable react/prop-types */
import React from 'react';

import { Typography, List, Row, Col, InputNumber } from 'antd';

import { EvaluateOptions } from './components';

export const Requirement = ({ requirement, addSelfMark, isChecking, IsExaminer, addComment }) => {
  const { items } = requirement;

  const onChangeMarkHandler = (event, itemId) => {
    addSelfMark(event, requirement.id, itemId);
  };

  const onChangeCommentHandler = (event, itemId) => {
    addComment(event, requirement.id, itemId);
  };

  return (
    requirement && (
      <>
        <Row align="bottom">
          <Col>
            <Typography.Title level={5} style={{ marginTop: '25px' }}>
              {requirement.title}
            </Typography.Title>
          </Col>
        </Row>
        <List
          dataSource={items}
          renderItem={item => {
            const { description, score, selfMark, category, marks } = item;
            let mark = 0;
            let comment = '';

            if (isChecking) {
              if (IsExaminer) {
                const examiner = marks.find(markItem => markItem.examinerId === IsExaminer.id);
                mark = examiner.mark;
                comment = examiner.comment;
              } else {
                mark = selfMark;
              }
            } else {
              mark = selfMark;
            }

            return (
              <>
                <List.Item>
                  <Col span={11}>
                    <div style={{ paddingRight: '100px' }}>{description}</div>
                  </Col>
                  <Col span={2}>
                    <div>{category === 'Fines' ? score : 0}</div>
                  </Col>
                  <Col span={2}>
                    <div>{category === 'Fines' ? 0 : score}</div>
                  </Col>
                  <Col span={6}>
                    <EvaluateOptions
                      requirementId={requirement.id}
                      item={item}
                      addSelfMark={addSelfMark}
                    />
                  </Col>
                  <Col span={3}>
                    <InputNumber
                      size="large"
                      style={{ width: '70%' }}
                      value={mark}
                      min={category === 'Fines' ? score : 0}
                      max={category === 'Fines' ? 0 : score}
                      onChange={e => onChangeMarkHandler(e, item.id)}
                    />
                  </Col>
                </List.Item>
                {mark < selfMark && (
                  <Row>
                    <Col span={15} />
                    <Col span={9}>
                      <textarea
                        value={comment}
                        style={{ width: '100%', padding: '5px 10px' }}
                        rows={2}
                        placeholder="Your mark is lower than developer's self-mark. You must leave the comment why you have estimated the task like that."
                        onChange={e => onChangeCommentHandler(e, item.id)}
                      />
                    </Col>
                  </Row>
                )}
              </>
            );
          }}
        />
      </>
    )
  );
};
