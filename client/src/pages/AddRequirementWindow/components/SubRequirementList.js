import React from 'react';
import { Row, Col } from 'antd';

const SubRequirementList = (scopeType, changeHandleFunction) => {
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={8}>Описание</Col>
        <Col span={8}>Максимальное оценка</Col>
        <Col span={8}>Проверяется ментором</Col>
      </Row>
    </div>
  );
}

export default SubRequirementList;
