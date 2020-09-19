/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react';

import { Row, Col, Button } from 'antd';

import {
  RequirementTitle,
  RequirementScope,
  SubRequirementList,
  AddNewSubRequirement
} from './components';

import '../../../../index.scss';
import './AddRequirementWindow.scss';

export const AddRequirementWindow = ({
  title,
  category,
  itemDescription,
  itemScore,
  onlyForMentors,
  requirementItemList,
  categoryList,
  changeTitle,
  changeCategory,
  changeItemDescription,
  changeItemScore,
  changeOnlyForMentors,
  saveRequirementItem,
  deleteItem,
  editItem,
  setReqirementItem,
  clearRequirementItemForm
}) => {
  const [isAddItemForCheck, setIsAddItemForCheck] = useState(false);

  const toggleAddItemForm = () => {
    setIsAddItemForCheck(!isAddItemForCheck);
  };

  return (
    <div className="add-requirement-window">
      <Row gutter={[50, 30]}>
        <Col span={12}>
          <RequirementTitle title={title} changeTitle={changeTitle} />
        </Col>
        <Col span={4}>
          <RequirementScope
            category={category}
            categoryList={categoryList}
            changeCategory={changeCategory}
          />
        </Col>
      </Row>
      <Row gutter={[0, 40]} style={{ borderBottom: '1px solid #F0F0F0' }}>
        <Col span={24}>
          <h3>Items for check</h3>
        </Col>
      </Row>
      {isAddItemForCheck ? (
        <AddNewSubRequirement
          category={category}
          description={itemDescription}
          score={itemScore}
          onlyForMentors={onlyForMentors}
          changeDescription={changeItemDescription}
          changeScore={changeItemScore}
          changeOnlyForMentors={changeOnlyForMentors}
          saveRequirementItem={saveRequirementItem}
          closeAddItemForm={toggleAddItemForm}
        />
      ) : (
        <Row gutter={[50, 40]}>
          <Col>
            <Button type="primary" size="large" onClick={toggleAddItemForm}>
              Add item for check
            </Button>
          </Col>
        </Row>
      )}
      <SubRequirementList
        itemList={requirementItemList}
        deleteItem={deleteItem}
        editItem={editItem}
        setReqirementItem={setReqirementItem}
        category={category}
        description={itemDescription}
        score={itemScore}
        onlyForMentors={onlyForMentors}
        changeDescription={changeItemDescription}
        changeScore={changeItemScore}
        changeOnlyForMentors={changeOnlyForMentors}
        saveRequirementItem={saveRequirementItem}
        closeAddItemForm={toggleAddItemForm}
        clearRequirementItemForm={clearRequirementItemForm}
      />
    </div>
  );
};
