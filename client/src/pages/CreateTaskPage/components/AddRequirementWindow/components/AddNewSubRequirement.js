/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Row, Col, Input, InputNumber, Checkbox, Button } from 'antd';

const Textarea = Input.TextArea;

export const AddNewSubRequirement = ({
  category,
  description,
  score,
  onlyForMentors,
  changeDescription,
  changeScore,
  changeOnlyForMentors,
  saveRequirementItem,
  closeAddItemForm,
  isEdit = false
}) => {
  const saveItem = () => {
    if (saveRequirementItem()) closeAddItemForm();
  };

  return (
    <Row gutter={[50, 40]}>
      <Col span={12}>
        <label htmlFor="description">Description</label>
        <Textarea
          id="description"
          placeholder="Enter item description"
          name="description"
          autoSize={{ minRows: 4, maxRows: 8 }}
          allowClear
          value={description}
          onChange={changeDescription}
        />
      </Col>
      <Col span={4}>
        <label htmlFor="score">Score</label>
        <InputNumber
          id="score"
          name="score"
          size="large"
          style={{ width: '100%' }}
          value={score}
          min={category === 'Fines' ? Number.MIN_SAFE_INTEGER : 0}
          max={category === 'Fines' ? 0 : Number.MAX_SAFE_INTEGER}
          onChange={changeScore}
        />
      </Col>
      <Col span={4}>
        <label htmlFor="onlyForMentors">Only For Mentors</label>
        <Checkbox
          htmlFor="onlyForMentors"
          style={{ width: '100%' }}
          checked={onlyForMentors}
          onChange={changeOnlyForMentors}
        />
      </Col>
      {!isEdit ? (
        <>
          <Col span={2}>
            <label style={{ display: 'block', width: '100%' }}>&nbsp;</label>
            <Button type="primary" size="large" onClick={saveItem} block>
              Save
            </Button>
          </Col>
          <Col span={2}>
            <label style={{ display: 'block', width: '100%' }}>&nbsp;</label>
            <Button size="large" onClick={closeAddItemForm} block>
              Cancel
            </Button>
          </Col>
        </>
      ) : null}
    </Row>
  );
};
