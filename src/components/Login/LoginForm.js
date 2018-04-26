import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Input } from 'antd';

import styles from './LoginForm.less';

const FormItem = Form.Item;

const Login = ({
  loading,
  onOk,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
  },
}) => {
  function handleOk(e) {
    e.preventDefault();
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return;
      }
      onOk(values);
    });
  }

  return (
    <div className={styles.form}>
      <form onSubmit={handleOk}>
        <FormItem hasFeedback key="1">
          {getFieldDecorator('username', {
            rules: [
              {
                required: true,
                message: '请填写用户名',
              },
            ],
          })(<Input size="large" placeholder="用户名" />)}
        </FormItem>
        <FormItem hasFeedback key="2">
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: '请填写密码',
              },
            ],
          })(<Input size="large" type="password" placeholder="密码" />)}
        </FormItem>
        <FormItem key="3">
          <Button type="primary" htmlType="submit" size="large" loading={loading}>
              登录
            </Button>
        </FormItem>
      </form>
    </div>
  );
};

Login.propTypes = {
  form: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
};

export default Form.create()(Login);
