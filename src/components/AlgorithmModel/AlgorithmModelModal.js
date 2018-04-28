import React, { Component } from 'react';
import { Modal, Form, Input } from 'antd';
import ParamListWidget from '../Common/ParamList';

const FormItem = Form.Item;
class AlgorithmModelEditModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      params: [],
    };
  }

  showModelHandler = (e) => {
    // debugger;
    let params =[];
    if(this.props.record && this.props.record.attributes){
      params = JSON.parse(this.props.record.attributes);
    }
    // console.log(params);
    this.props.form.resetFields();
    if (e) e.stopPropagation();
    this.setState({
      visible: true,
      params:params
    });
  };

  hideModelHandler = () => {
    this.setState({
      visible: false,
      params: [],
    });
  };

  okHandler = () => {
    const { onOk } = this.props;
    // debugger;
    const params = [...this.state.params];
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.attributes = JSON.stringify(params);
        // console.log(values);
        const cb = () => {
          this.hideModelHandler();
        }
        onOk(values, cb);
      }
    });
  };

  changeRecord = (params) => {
    this.setState(params);
    // console.log(params,'---parents')
  }


  render() {
    const { children } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { moduleName, classPath, pkId, atttibutes } = this.props.record;
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
          <Form layout="horizontal" onSubmit={this.okHandler}>
            <FormItem
              {...formItemLayout}
              label="pkId"
            >
              {
                getFieldDecorator('pkId', {
                  initialValue: pkId,
                })(<Input disabled={true} />)
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
          <ParamListWidget params={this.state.params}  handleChangeRecord={(params) => this.changeRecord(params)}/>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(AlgorithmModelEditModal);
