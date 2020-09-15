/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Row, Col, Button } from 'antd';
import { EditOutlined, DeleteOutlined, CheckOutlined } from '@ant-design/icons';

import { ModalWindow } from '../../../../../components';

import { AddNewSubRequirement } from './AddNewSubRequirement';

export const SubRequirementList = ({
  itemList,
  deleteItem,
  editItem,
  setReqirementItem,
  category,
  description,
  score,
  onlyForMentors,
  changeDescription,
  changeScore,
  changeOnlyForMentors,
  saveRequirementItem,
  closeAddItemForm,
  clearRequirementItemForm
}) => {
  const [isModalWindowOpen, setIsModalWindowOpen] = useState(false);

  const toggleModalWindow = () => {
    setIsModalWindowOpen(!isModalWindowOpen);
    clearRequirementItemForm();
  };

  const openEditForm = id => {
    setReqirementItem(id);
    setIsModalWindowOpen(!isModalWindowOpen);
  };

  const saveItem = () => {
    if (editItem()) setIsModalWindowOpen(!isModalWindowOpen);
  };

  return (
    <div>
      {itemList.length ? (
        <Row gutter={[16, 30]} style={{ borderBottom: '1px solid #F0F0F0' }}>
          <Col span={12}>Description</Col>
          <Col span={4}>Score</Col>
          <Col span={4}>Only for mentors</Col>
          <Col span={2} style={{ textAlign: 'center' }}>
            Edit
          </Col>
          <Col span={2}>Delete</Col>
        </Row>
      ) : null}
      {itemList.map(item => {
        const { id, description: desc, score: scr, onlyForMentors: forMentors } = item;
        return (
          <Row gutter={[16, 16]} key={id}>
            <Col span={12}>{desc}</Col>
            <Col span={4}>{scr}</Col>
            <Col span={4}>{forMentors ? <CheckOutlined /> : '-'}</Col>
            <Col span={2} style={{ textAlign: 'center' }}>
              <Button
                type="text"
                size="large"
                onClick={() => openEditForm(id)}
                icon={<EditOutlined style={{ fontSize: '22px', color: '#595959' }} />}
              />
            </Col>
            <Col span={2}>
              <Button
                type="text"
                size="large"
                onClick={() => deleteItem(id)}
                icon={<DeleteOutlined style={{ fontSize: '22px', color: '#595959' }} />}
              />
            </Col>
          </Row>
        );
      })}
      <ModalWindow
        title="Edit item for check"
        visible={isModalWindowOpen}
        height="auto"
        handlerOkButton={saveItem}
        handlerCancelButton={toggleModalWindow}
      >
        <AddNewSubRequirement
          category={category}
          description={description}
          score={score}
          onlyForMentors={onlyForMentors}
          changeDescription={changeDescription}
          changeScore={changeScore}
          changeOnlyForMentors={changeOnlyForMentors}
          saveRequirementItem={saveRequirementItem}
          closeAddItemForm={closeAddItemForm}
          isEdit
        />
      </ModalWindow>
    </div>
  );
};
