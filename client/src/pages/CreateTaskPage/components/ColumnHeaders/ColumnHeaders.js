import React from 'react';

import { Row, Col } from 'antd';

import 'antd/dist/antd.css';

export const ColunmHeaders = () => {
  return (
    <Row gutter={[0, 25]} style={{ borderBottom: '1px solid #F0F0F0' }}>
      <Col span={16}>
        <div>Description</div>
      </Col>
      <Col span={4}>
        <div>Score</div>
      </Col>
      <Col span={4}>
        <div>Only For Mentors</div>
      </Col>
    </Row>
  );
};
