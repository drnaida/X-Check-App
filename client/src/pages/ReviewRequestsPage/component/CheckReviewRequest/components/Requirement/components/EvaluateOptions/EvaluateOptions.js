/* eslint-disable react/prop-types */
import React from 'react';

import { Radio } from 'antd';

export const EvaluateOptions = ({ requirementId, item, addSelfMark }) => {
  const { id, score } = item;

  const onChangeRadioHandler = (event, itemId) => {
    addSelfMark(event.target.value, requirementId, itemId);
  };

  return (
    <Radio.Group onChange={e => onChangeRadioHandler(e, id)} value={null}>
      <Radio.Button value={0}>isn&apos;t done</Radio.Button>
      <Radio.Button value={score / 2}>partly done</Radio.Button>
      <Radio.Button value={score}>done</Radio.Button>
    </Radio.Group>
  );
};
