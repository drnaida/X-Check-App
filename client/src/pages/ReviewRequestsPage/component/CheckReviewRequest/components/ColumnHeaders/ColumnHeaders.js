import React from 'react';

import { Row, Col } from 'antd';

import 'antd/dist/antd.css';

export const ColunmHeaders = () => {
  return (
    <Row gutter={[0, 25]} style={{ borderBottom: '1px dotted #595959' }}>
      <Col span={11}>
        <div>Description</div>
      </Col>
      <Col span={2}>
        <div>Min Score</div>
      </Col>
      <Col span={2}>
        <div>Max Score</div>
      </Col>
      <Col span={6}>
        <div>Evaluate options</div>
      </Col>
      <Col span={3}>
        <div>Mark</div>
      </Col>
    </Row>
  );
};
