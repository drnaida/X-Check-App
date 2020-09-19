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

export const buttonsStepTwo = (handleCancelButtonModalWindow, handleSaveButtonModalWindow) => {
  return [
    <Button key="1" onClick={handleCancelButtonModalWindow}>
      Cancel
    </Button>,
    <Button key="2" type="primary" onClick={() => handleSaveButtonModalWindow(false)}>
      Save and not published
    </Button>,
    <Button key="3" type="primary" onClick={() => handleSaveButtonModalWindow(true)}>
      Save and published
    </Button>
  ];
};
