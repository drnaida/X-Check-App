/* eslint-disable react/prop-types */
import React from 'react';

import { Typography, List, Row, Col, InputNumber } from 'antd';

import { EvaluateOptions } from './components';

export const Requirement = ({ requirement, addSelfMark }) => {
  const { items } = requirement;

  const onChangeHandler = (event, itemId) => {
    addSelfMark(event, requirement.id, itemId);
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
            const { description, score, selfMark, category } = item;
            return (
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
                    value={selfMark}
                    min={category === 'Fines' ? score : 0}
                    max={category === 'Fines' ? 0 : score}
                    onChange={e => onChangeHandler(e, item.id)}
                  />
                </Col>
              </List.Item>
            );
          }}
        />
      </>
    )
  );
};
