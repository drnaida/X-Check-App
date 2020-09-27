/* eslint-disable react/jsx-indent */
import React from 'react';
import { Button } from 'antd';

export const buttonsStepOne = (handleCancelButtonModalWindow, handleNextButtonModalWindow) => {
  return [
    <Button key="1" onClick={handleCancelButtonModalWindow}>
      Cancel
    </Button>,
    <Button key="2" type="primary" onClick={handleNextButtonModalWindow}>
      Next
    </Button>
  ];
};

export const buttonsStepTwo = (
  handleCancelButtonModalWindow,
  handleSaveButtonModalWindow,
  isChecking
) => {
  return !isChecking
    ? [
        <Button key="1" onClick={handleCancelButtonModalWindow}>
          Cancel
        </Button>,
        <Button key="2" type="primary" onClick={() => handleSaveButtonModalWindow(false)}>
          Save and not publish
        </Button>,
        <Button key="3" type="primary" onClick={() => handleSaveButtonModalWindow(true)}>
          Finish and publish
        </Button>
      ]
    : [
        <Button key="1" onClick={handleCancelButtonModalWindow}>
          Cancel
        </Button>,
        <Button key="2" type="primary" onClick={() => handleSaveButtonModalWindow(false)}>
          Save
        </Button>
      ];
};
