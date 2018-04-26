import React, { Component } from 'react';
import { Modal, Form, Input, Icon, Button, Upload, Select } from 'antd';
import ParamListWidget from '../Common/ParamList';

const FormItem = Form.Item;
const Option = Select.Option;
class AlgorithmInstanceEditModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      params: [],
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
    // debugger;
    const params = [...this.state.params];
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.attributes = JSON.stringify(params);
        console.log(values);
        onOk(values);
        this.hideModelHandler();
      }
    });
  };

  changeRecord = (params) => {
    this.setState(params);
    console.log(params,'---parents')
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
                })(<Input  />)
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
                })(<Input />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="版本号"
            >
              {
                getFieldDecorator('version', {
                  initialValue: version,
                })(<Input disabled="true" />)
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
            <FormItem
              {...formItemLayout}
              label="存储方式"
            >
              {
                getFieldDecorator('saveType', {
                  initialValue: saveType,
                })(<Select>
                  <Option value="1">OSS</Option>
                </Select>)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="模型文件"
            >
              {getFieldDecorator('upload', {
                valuePropName: 'fileList',
                getValueFromEvent: this.normFile,
              })(
                <Upload name="logo" action="/upload.do" listType="picture">
                  <Button>
                    <Icon type="upload" /> 上传
                  </Button>
                </Upload>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="文件路径"
            >
              {
                getFieldDecorator('filePath', {
                  initialValue: filePath,
                })(<Input disabled="true" />)
              }
            </FormItem>
            <ParamListWidget  handleChangeRecord={(params) => this.changeRecord(params)}/>
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(AlgorithmInstanceEditModal);
