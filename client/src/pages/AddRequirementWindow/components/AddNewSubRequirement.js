import React from 'react';
import { Row, Col, Input, InputNumber } from 'antd';

const Textarea = Input.TextArea;

const AddNewSubRequirement = (description, maxScore, onlyForMentors, changeHandleFunction) => {
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Textarea placeholder="Super interesting task." name="description" value={description} onChange={changeHandleFunction}/>
        </Col>
        <Col span={6}>
            <InputNumber name="maxScore" placeholder="10" value={maxScore} onChange={changeHandleFunction}/>
        </Col>
        <Col span={6}>
          <Input type="checkbox" name="onlyForMentors" value={onlyForMentors} onChange={changeHandleFunction}/>
        </Col>
        <Col span={6}>Редактирование</Col>
      </Row>
    </div>
  );
}

export default AddNewSubRequirement;
