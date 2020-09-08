import React from 'react';
import { Row, Col } from 'antd';

const SubRequirementList = (scopeType, changeHandleFunction) => {
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={6}>Описание</Col>
        <Col span={6}>Максимальное оценка</Col>
        <Col span={6}>Проверяется ментором</Col>
        <Col span={6}>Редактирование</Col>
      </Row>
    </div>
  );
}

export default SubRequirementList;
