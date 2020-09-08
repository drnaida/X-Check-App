import React from 'react';
import { Modal } from 'antd';
import './ModalWindow.scss';

const ModalWindow = (props) => {
  const {title, visible, handlerOkButton, handlerCancelButton, children} = props;
  return (
    <Modal
      title={title}
      visible={visible}
      centered
      okText="Save"
      onOk={handlerOkButton}
      onCancel={handlerCancelButton}
    >
      { children }
    </Modal>
  );
};

export default ModalWindow;
