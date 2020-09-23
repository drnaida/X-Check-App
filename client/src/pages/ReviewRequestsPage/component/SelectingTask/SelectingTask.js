/* eslint-disable react/jsx-curly-newline */
/* eslint-disable react/prop-types */
/* eslint-disable react/require-default-props */
import React from 'react';
import { Form, Input, Select } from 'antd';

export const SelectingTask = ({ fields, onChange }) => {
  const [form] = Form.useForm();
  const { Option } = Select;

  return (
    <Form
      form={form}
      layout="vertical"
      fields={fields}
      onFieldsChange={(_changedFields, allFields) => onChange(allFields)}
      onFinish={form.resetFields}
    >
      <Form.Item
        name="id"
        label="Task id"
        rules={[
          {
            required: true,
            message: 'Please select task!'
          }
        ]}
      >
        <Select
          showSearch
          placeholder="Select a task"
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          <Option value="Task #1">Task #1</Option>
          <Option value="Task #2">Task #2</Option>
          <Option value="Task #3">Task #3</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="pullRequestLink"
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
      <Form.Item
        name="deployLink"
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
    </Form>
  );
};
