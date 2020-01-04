import React from "react";
import { Button, Modal, message } from "antd";
import ImgUpload from "./ImgUpload";
import { httpPost } from "../config/request";
import { API } from "../config/api";
import { Form, Input } from "antd";

require("../customCSS/myStyle.css");

class AddPersonFormModal extends React.Component {
  state = {
    imgFile: [],
    visible: false,
    workerId: ""
  };

  showModal = () => {
    const uuidv1 = require("uuid/v1");
    let myUU = uuidv1();
    console.log("UUID:",myUU)
    this.setState({ visible: true, workerId: myUU });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        let params = {
          siteId: "2b772bca0b024b12b39d849422ac7e2f",
          entranceGuardId: 0,
          workerId: values.workerId,
          partition: ["-1", "0", "1", "2"],
          direction: "2",
          name: values.name,
          phone: values.phone,
          sex: "男",
          nation: "汉族",
          birthday: "1989-12-22",
          idNumber: values.idNumber,
          cardId: values.cardId,
          regionalizationHouseholdRegistration: "上海市",
          idFront: "xxxxxxxxxxxxxxxxx",
          idBack: " xxxxxxxxxxxxxxxxx",
          vaildPhoto: this.state.imgFile,
          companytype: "xxxx",
          jobtype: values.jobType,
          groupLeaderName: "李四",
          projectName: "XXX 建筑施工项目",
          workingTeam: "XXX 班组",
          isTeamLeader: 0
        };

        httpPost(API.ADD_PERSONNEL_INFO, params)
          .then(res => {
            if (res.code === "1") {
              message.success("人员录入成功", 3);
              this.handleCancel();
            }
          })
          .catch(err => {
            message.error("人员录入失败", 3);
          });
      }
    });
    console.log("List", this.state.imgFile);
  };

  handleCancel = () => {
    this.props.form.resetFields();
    this.setState({ visible: false });
  };

  getPhoto = fileList => {
    var reader = new FileReader();
    let that = this;
    reader.readAsDataURL(fileList[0]);
    reader.onload = function() {
      let base64 = this.result
      let newBase64 = base64.replace(/\r|\n/g, '').replace('data:image/jgp;base64,', '').replace('data:image/png;base64,', '').replace('data:image/jpeg;base64,','');
//      console.log("base64",newBase64);
      that.setState({ imgFile: newBase64 });
    };
  };

  componentDidMount() {
    this.props.onRef(this);
  }

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
          </Button>
        ]}
      >
        <Form
          className="smart-form-container"
          {...formItemLayout}
          labelAlign="right"
        >
          <Form.Item label="姓名">
            {getFieldDecorator("name", {
              rules: [
                {
                  required: true,
                  message: "请输入姓名"
                }
              ]
            })(<Input placeholder="请输入姓名" />)}
          </Form.Item>
          <Form.Item label="工号">
            {getFieldDecorator("workerId", {
              initialValue: this.state.workerId,
              rules: [
                {
                  required:true
                }
              ]
            })(<Input disabled/>)}
          </Form.Item>
          <Form.Item label="工种">
            {getFieldDecorator("jobType", {
              initialValue:"普工",
              rules: [
                {
                  required: true,
                  message: "请输入工种"
                }
              ]
            })(<Input placeholder="请输入工种" />)}
          </Form.Item>
          <Form.Item label="电话">
            {getFieldDecorator("phone", {
              rules: [
                {
                  required: false,
                  message: "请输入电话"
                }
              ]
            })(<Input placeholder="请输入电话" />)}
          </Form.Item>
          <Form.Item label="身份证号">
            {getFieldDecorator("idNumber", {
              rules: [
                {
                  required: false,
                  message: "请输入身份证号"
                }
              ]
            })(<Input placeholder="请输入身份证号" />)}
          </Form.Item>
          <Form.Item label="卡号">
            {getFieldDecorator("cardId", {
              rules: [
                {
                  required: false,
                  message: "请输入卡号"
                }
              ]
            })(<Input placeholder="请输入卡号" />)}
          </Form.Item>
          <Form.Item label="图片">
            {getFieldDecorator("validPhoto", {
              rules: [
                {
                  message: "请上传图片"
                }
              ]
            })(<ImgUpload getPhoto={this.getPhoto}></ImgUpload>)}
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

export default Form.create()(AddPersonFormModal);
