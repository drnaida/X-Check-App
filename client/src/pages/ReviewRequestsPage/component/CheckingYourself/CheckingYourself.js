/* eslint-disable react/prop-types */
/* eslint-disable react/require-default-props */

import React, { useEffect } from 'react';
import { Form } from 'antd';

export const CheckingYourself = ({ getFormHendler }) => {
  const [form] = Form.useForm();
  useEffect(() => {
    getFormHendler(form);
  });

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        modifier: 'public'
      }}
    >
      Heello you on step two
    </Form>
  );
};
