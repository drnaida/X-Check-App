/* eslint-disable react/prop-types */
import React from 'react';
import { Modal } from 'antd';
import './ModalWindow.scss';

export const ModalWindow = props => {
  const {
    title,
    visible,
    handlerOkButton,
    handlerCancelButton,
    children,
    width = '90%',
    height = '90vh',
    buttons = []
  } = props;
  if (buttons.length > 0) {
    return (
      <Modal
        title={title}
        visible={visible}
        centered
        width={width}
        style={{ height }}
        onCancel={handlerCancelButton}
        footer={buttons}
      >
        {children}
      </Modal>
    );
  }
  return (
    <Modal
      title={title}
      visible={visible}
      centered
      width={width}
      style={{ height }}
      okText="Save"
      onOk={handlerOkButton}
      onCancel={handlerCancelButton}
    >
      {children}
    </Modal>
  );
};
