import React, { Component } from 'react';
import { Modal, Form, Input, Icon, Button, Upload, Select, message } from 'antd';
import ParamListWidget from '../Common/ParamList';

const FormItem = Form.Item;
const Option = Select.Option;
class AlgorithmInstanceHistoryEditModal extends Component {

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
    // console.log(this.props);
    if(this.props.record && this.props.record.attributes){
      params = JSON.parse(this.props.record.attributes);
    }
    // console.log(params);
    if (e) e.stopPropagation();
    this.setState({
      visible: true,
      params:params
    });
  };

  hideModelHandler = () => {
    this.setState({
      visible: false,
    });
  };


  changeRecord = (params) => {
    this.setState(params);
    // console.log(params,'---parents')
  }

  render() {
    const { children } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { moduleName, classPath, instanceName, saveType, attributes, pkId, version, filePath } = this.props.record;
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
          title="实例信息"
          visible={this.state.visible}
          onOk={this.hideModelHandler}
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
                })(<Input  disabled={true}/>)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="实例名"
            >
              {
                getFieldDecorator('instanceName', {
                  rules: [{ required: true, message: '请输入实例名!' }],
                  initialValue: instanceName,
                })(<Input disabled={true}/>)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="版本号"
            >
              {
                getFieldDecorator('version', {
                  initialValue: version,
                })(<Input disabled={true} />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="classPath"
            >
              {
                getFieldDecorator('classPath', {
                  rules: [{ required: true, message: '请输入实例名!' }],
                  initialValue: classPath,
                })(<Input disabled={true}/>)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="存储方式"
            >
              <Select defaultValue="1">
                  <Option value="1">OSS</Option>
              </Select>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="文件路径"
            >
              {
                getFieldDecorator('filePath', {
                  initialValue: filePath,
                })(<Input disabled={true} />)
              }
            </FormItem>
          </Form>
          <ParamListWidget  params={this.state.params}  handleChangeRecord={(params) => this.changeRecord(params)}/>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(AlgorithmInstanceHistoryEditModal);
