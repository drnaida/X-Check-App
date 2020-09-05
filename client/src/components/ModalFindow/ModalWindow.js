import React from 'react';
import { Modal } from 'antd';
import './ModalWindow.scss';

const ModalWindow = (props) => {
  const {visible, handlerOkButton, handlerCancelButton, children} = props;
  return (
    <Modal
      title="Adding requirement"
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
