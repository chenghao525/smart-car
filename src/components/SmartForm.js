import React, { Component } from "react";
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

const residences = [
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

class SmartForm extends React.Component {
  state = {
    imgFile:""
  };

  getSelectedOptions(optionArray){
    const children =optionArray.map(it => {
        return (
            <Option value={it.value} key={it.value}>{it.label}</Option>
        );
    });
    return children;
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
      <Form
        className="smart-form-container"
        {...formItemLayout}
        onSubmit={this.handleSubmit}
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
          })(<Select>{this.getSelectedOptions(residences)}</Select>)}
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
    );
  }
}

// const WrappedRegistrationForm = Form.create({ name: "register" })(
//   RegistrationForm
// );

// ReactDOM.render(<WrappedRegistrationForm />, mountNode);

export default Form.create()(SmartForm);
