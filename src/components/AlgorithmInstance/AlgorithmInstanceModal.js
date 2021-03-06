import React, { Component } from 'react';
import { Modal, Form, Input, Icon, Button, Upload, Select, message } from 'antd';
import ParamListWidget from '../Common/ParamList';
import Cookie from '../../utils/cookie';
import styles from './index.less';


const FormItem = Form.Item;
const Option = Select.Option;
class AlgorithmInstanceEditModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      params: []
    };
  }

  showModelHandler = (e) => {
    // debugger;
    let params =[];
    if(this.props.record && this.props.record.attributes){
      params = JSON.parse(this.props.record.attributes);
    }
    if (e) e.stopPropagation();
    this.props.form.resetFields();
    this.setState({
      visible: true,
      params:params,
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
        onOk(values);
        this.hideModelHandler();
      }
    });
  };

  changeRecord = (params) => {
    this.setState(params);
    // console.log(params,'---parents')
  };

  handleUploadChange = (info) => {
    // console.log(info.file);
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
      if(info.file.response && info.file.response.data){
        // debugger;
        this.props.record.filePath = info.file.response.data;
        this.props.form.setFieldsValue({
          filePath: this.props.record.filePath
        });
      }
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  render() {
    const { children } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { moduleName, classPath, instanceName, saveType, attributes, pkId, version, filePath } = this.props.record;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    const uploadProps = {
      name: 'file',
      action: '/api/algorithm/moduleFile/upload?token='+Cookie.get('token'),
      data: {moduleName, instanceName, saveType},
      headers: {
        authorization: 'authorization-text',
      },
      onChange:this.handleUploadChange,
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
          width={1000}
        >
          <Form  layout="inline"  onSubmit={this.okHandler}>
            <FormItem
              {...formItemLayout}
              label="pkId"
              className={styles.flex2From}
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
              className={styles.flex2From}
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
              className={styles.flex2From}
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
              className={styles.flex2From}
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
              className={styles.flex2From}
            >
              {
                getFieldDecorator('classPath', {
                  rules: [{ required: true, message: '请输入实例名!' }],
                  initialValue: classPath,
                })(<Input />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="存储方式"
              className={styles.flex2From}
            >
              {
                getFieldDecorator('saveType', {
                  initialValue: saveType,
                })(<Select>
                  <Option value="OSS">OSS</Option>
                </Select>)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="模型文件"
              className={styles.flex2From}
            >
                <Upload {...uploadProps} >
                  <Button>
                    <Icon type="upload" /> 上传
                  </Button>
                </Upload>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="文件路径"
              className={styles.flex2From}
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

export default Form.create()(AlgorithmInstanceEditModal);
