/* eslint-disable react/prop-types */
/* eslint-disable react/require-default-props */
import React, { useEffect } from 'react';
import { Form, Input } from 'antd';

export const SelectingTask = ({ getFormHendler }) => {
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
      <Form.Item
        name="linkOnTheTaskSolution"
        label="Link on the task solution"
        rules={[
          {
            required: true,
            message: 'Please input link on the task solution!'
          }
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="linkOnThePullRequest"
        label="Link on the pull request"
        rules={[
          {
            required: true,
            message: 'Please input link on the pull request!'
          }
        ]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
};
