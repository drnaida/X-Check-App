/* eslint-disable react/prop-types */
import React from 'react';

import { Typography, List, Row, Col, Button } from 'antd';
import { EditOutlined, DeleteOutlined, CheckOutlined } from '@ant-design/icons';

export const Requirement = ({
  requirement,
  setReqirement,
  deleteRequirement,
  toggleModalWindow,
  taskState
}) => {
  const { items } = requirement;

  const editRequirement = id => {
    setReqirement(id);
    toggleModalWindow(id);
  };

  return (
    requirement && (
      <>
        <Row align="bottom">
          <Col>
            <Typography.Title level={4} style={{ marginTop: '25px' }}>
              {requirement.title}
            </Typography.Title>
          </Col>
          {taskState !== 'PUBLISHED' && (
            <>
              <Col span={1} style={{ textAlign: 'center' }}>
                <Button
                  type="text"
                  size="large"
                  onClick={() => editRequirement(requirement.id)}
                  icon={<EditOutlined style={{ fontSize: '20px', color: '#595959' }} />}
                />
              </Col>
              <Col span={1}>
                <Button
                  type="text"
                  size="large"
                  onClick={() => deleteRequirement(requirement.id)}
                  icon={<DeleteOutlined style={{ fontSize: '20px', color: '#595959' }} />}
                />
              </Col>
            </>
          )}
        </Row>
        <List
          dataSource={items}
          renderItem={item => {
            const { description, score, onlyForMentors } = item;
            return (
              <List.Item>
                <Col span={16}>
                  <div style={{ paddingRight: '100px' }}>{description}</div>
                </Col>
                <Col span={4}>
                  <div>{score}</div>
                </Col>
                <Col span={4}>
                  <div>{onlyForMentors ? <CheckOutlined /> : '-'}</div>
                </Col>
              </List.Item>
            );
          }}
        />
      </>
    )
  );
};
