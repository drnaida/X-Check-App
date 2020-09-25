import React, { useContext, useState } from 'react';

import { Form, Input, Select, Button, notification } from 'antd';

import { useHttp } from '../../hooks';
import httpCodes from '../../constants/http-codes';
import { AuthContext } from '../../context/AuthContext';

import '../../index.scss';
import './AuthPage.scss';
import 'antd/dist/antd.css';

const { Option } = Select;

export const AuthPage = () => {
  const { request } = useHttp();
  const auth = useContext(AuthContext);
  const [isRegistrationPage, setIsRegistrationPage] = useState(false);

  const login = async formValues => {
    const data = await request('/auth/login', 'POST', { ...formValues });
    auth.login(data.token, data.refreshToken, data.githubId, data.roles);
  };

  const register = async formValues => {
    const registeredUSer = await request('/auth/register', 'POST', { ...formValues });
    if (registeredUSer.githubId) {
      await login(formValues);
    }
  };

  const authHandler = async formValues => {
    try {
      if (isRegistrationPage) {
        await register(formValues);
      } else {
        await login(formValues);
      }
    } catch (e) {
      notification.error({
        message: 'Error',
        description:
          e.message === httpCodes.FORBIDDEN
            ? 'Wrong githubId or password'
            : 'This githubId already exists',
        placement: 'bottomRight'
      });
    }
  };

  return (
    <>
      <Form
        name="complex-form"
        onFinish={authHandler}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item label="GithubId" style={{ marginTop: '20px' }}>
          <Form.Item
            name="githubId"
            noStyle
            rules={[{ required: true, message: 'GithubId is required' }]}
          >
            <Input style={{ width: '50%' }} placeholder="Please input githubId" />
          </Form.Item>
        </Form.Item>
        <Form.Item label="Password">
          <Form.Item
            name="password"
            noStyle
            rules={[
              { required: true, message: 'Password is required' },
              { min: 6, message: 'The password must be at least 6 characters long' }
            ]}
          >
            <Input style={{ width: '50%' }} type="password" placeholder="Please input password" />
          </Form.Item>
        </Form.Item>
        {isRegistrationPage && (
          <Form.Item label="Roles" style={{ marginBottom: 0 }}>
            <Form.Item name="roles" rules={[{ required: true }]} style={{ width: '50%' }}>
              <Select placeholder="Select role" mode="multiple">
                <Option value="author">Author</Option>
                <Option value="student">Student</Option>
                <Option value="supervisor">Supervisor</Option>
                <Option value="course_manager">Course manager</Option>
              </Select>
            </Form.Item>
          </Form.Item>
        )}
        <Form.Item label=" " colon={false}>
          <Button type="primary" htmlType="submit">
            {isRegistrationPage ? 'Sign Up' : 'Sign In'}
          </Button>
          <span
            role="button"
            tabIndex={0}
            style={{ paddingLeft: '30px' }}
            onClick={() => setIsRegistrationPage(!isRegistrationPage)}
            onKeyPress={() => null}
          >
            {isRegistrationPage ? 'Sign In' : 'Sign Up'}
          </span>
        </Form.Item>
      </Form>
    </>
  );
};
