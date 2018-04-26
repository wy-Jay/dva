import React, { Component } from 'react';
import { Modal, Form, Input } from 'antd';
import ParamListWidget from '../Common/ParamList';

const FormItem = Form.Item;
class AlgorithmModelEditModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  showModelHandler = (e) => {
    if (e) e.stopPropagation();
    this.setState({
      visible: true,
    });
  };

  hideModelHandler = () => {
    this.setState({
      visible: false,
    });
  };

  okHandler = () => {
    const { onOk } = this.props;
    debugger;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        onOk(values);
        this.hideModelHandler();
      }
    });
  };


  render() {
    const { children } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { moduleName, classPath, attributes, pkId } = this.props.record;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <span>
        <span onClick={this.showModelHandler}>
          { children }
        </span>
        <Modal
          title="模块信息"
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
        >
          <Form horizontal onSubmit={this.okHandler}>
            <FormItem
              {...formItemLayout}
              label="pkId"
            >
              {
                getFieldDecorator('pkId', {
                  initialValue: pkId,
                })(<Input disabled="true" />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="模块名"
            >
              {
                getFieldDecorator('moduleName', {
                  rules: [{ required: true, message: '请输入模块名!' }],
                  initialValue: moduleName,
                })(<Input />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="classPath"
            >
              {
                getFieldDecorator('classPath', {
                  initialValue: classPath,
                })(<Input />)
              }
            </FormItem>
          </Form>
          <ParamListWidget />
        </Modal>
      </span>
    );
  }
}

export default Form.create()(AlgorithmModelEditModal);
