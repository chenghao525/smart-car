import React, { Component } from "react";
import {Button, Modal} from "antd";
import ImgUpload from './ImgUpload'
import {
  Form,
  Input,
  Select,
  AutoComplete
} from "antd";

require("../customCSS/myStyle.css");

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

const portList = [
  {
    value: "COM1",
    label: "COM1",
  },
  {
    value: "COM2",
    label: "COM2",
  },{
    value: "COM3",
    label: "COM3",
  },
];


class AddPersonFormModal extends React.Component {
  state = {
    imgFile:"",
    visible:false
  };

  getSelectedOptions(optionArray){
    const children = optionArray.map(it => {
        return (
            <Option value={it.value} key={it.value}>{it.label}</Option>
        );
    });
    return children;
};

  showModel = () =>{
    this.setState({visible:true});
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };


  render() {
    const { getFieldDecorator } = this.props.form;
    const { visible } = this.state;
    

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };

    return (
      <Modal
          visible={visible}
          title="录入人员"
          onOk={this.handleSubmit}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              取消
            </Button>,
            <Button key="submit" type="primary" onClick={this.handleSubmit}>
              添加
            </Button>,
          ]}
        >
      <Form
        className="smart-form-container"
        {...formItemLayout}
        style={{ margin: "100px 500px" }}
        labelAlign="left"
      >
        <Form.Item label="选择串口">
          {getFieldDecorator("portName", {
            rules: [
              {
                required: true,
                message: "请选择串口"
              }
            ]
          })(<Select>{this.getSelectedOptions(portList)}</Select>)}
        </Form.Item>
        <Form.Item label="姓名">
          {getFieldDecorator("name", {
            rules: [
              {
                required: true,
                message: "请输入姓名"
              }
            ]
          })(<Input placeholder="请输入姓名"/>)}
        </Form.Item>
        <Form.Item label="电话">
          {getFieldDecorator("phone", {
            rules: [
              {
                required: true,
                message: "请输入电话"
              }
            ]
          })(<Input placeholder="请输入电话"/>)}
        </Form.Item>
        <Form.Item label="身份证号">
          {getFieldDecorator("idNumber", {
            rules: [
              {
                required: true,
                message: "请输入身份证号"
              }
            ]
          })(<Input placeholder="请输入身份证号"/>)}
        </Form.Item>
        <Form.Item label="卡号">
          {getFieldDecorator("cardId", {
            rules: [
              {
                required: true,
                message: "请输入卡号"
              }
            ]
          })(<Input placeholder="请输入卡号"/>)}
        </Form.Item>
        <Form.Item label="工种">
          {getFieldDecorator("jobtype", {
            rules: [
              {
                required: true,
                message: "请输入工种"
              }
            ]
          })(<Input placeholder="请输入工种"/>)}
        </Form.Item>
        <Form.Item label="施工单位">
          {getFieldDecorator("companytype", {
            rules: [
              {
                required: true,
                message: "请输入施工单位"
              }
            ]
          })(<Input placeholder="请输入施工单位"/>)}
        </Form.Item>
        <Form.Item label="图片">
          {getFieldDecorator("validPhoto", {
            rules: [
              {
                required: true,
                message: "请上传图片"
              }
            ]
          })(<ImgUpload></ImgUpload>)}
          
        </Form.Item>
      </Form>
      </Modal>
    );
  }
}

// const WrappedRegistrationForm = Form.create({ name: "register" })(
//   RegistrationForm
// );

// ReactDOM.render(<WrappedRegistrationForm />, mountNode);


export default AddPersonFormModal;
