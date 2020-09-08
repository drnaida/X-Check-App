import React from 'react';
import { Modal } from 'antd';
import './ModalWindow.scss';

const ModalWindow = (props) => {
  const {title, visible, handlerOkButton, handlerCancelButton, children} = props;
  const modalWindowSize = {
    maxWidth: '1728px',
  };
  return (
    <Modal
      title={title}
      visible={visible}
      centered
      okText="Save"
      onOk={handlerOkButton}
      onCancel={handlerCancelButton}
      style={modalWindowSize}
      width='90%'
    >
      { children }
    </Modal>
  );
};

export default ModalWindow;
