/* eslint-disable react/prop-types */
/* eslint-disable react/require-default-props */

import React from 'react';
import { Form } from 'antd';

export const CheckingYourself = () => {
  const [form] = Form.useForm();

  return (
    <Form form={form} layout="vertical">
      Hello you on step two
    </Form>
  );
};
