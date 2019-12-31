import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { API } from "../config/api";
import { httpGet, httpPost } from "../config/request";
import { Menu, Button, Select, message } from "antd";
require("../customCSS/myStyle.css");

const { Option } = Select;
// const portList = [
//   {
//     value: "COM1",
//     label: "COM1"
//   },
//   {
//     value: "COM2",
//     label: "COM2"
//   },
//   {
//     value: "COM3",
//     label: "COM3"
//   }
// ];

class NavBar extends Component {
  state = {
    current: "AttendanceTable",
    port: "",
    portList:[]
  };

  getSelectedOptions(optionArray) {
    const children = optionArray.map(it => {
      return (
        <Option value={it.value} key={it.value}>
          {it.label}
        </Option>
      );
    });
    return children;
  }

  handleClick = path => {
    return e => {
      console.log(path);
      this.setState({
        current: e.key
      });
    };
  };

  handleClearPerson = () => {
    httpPost(API.CLEAR_COUNT, {zzz:'zzz'})
    .then(res => {
      if (res.code === "1") {
        message.success("清除在场人员成功",3)
      }
    })
    .catch(err => {
      message.error("清除在场人员失败",3);
    });
  };

  handleAlarm = ()=>{
    httpPost(API.ALARM, {zzz:'zzz'})
    .then(res => {
      if (res.code === "1") {
        message.success("报警成功",3)
      }
    })
    .catch(err => {
      message.error("报警失败",3);
    });
  }

  handleSelect = value => {
    console.log("select", value);
    localStorage.setItem("port", value);
    message.success("成功设置串口：" + value, 3);
  };

  getCurrentPort = () => {
    if (localStorage.getItem("port")) {
      let port = localStorage.getItem("port");
      this.setState({
        port: port
      });
    }
  };

  getPortOptions = ()=>{
    httpGet(API.GET_PORTLIST, {})
    .then(res => {
      if (res.code === "1") {
        this.setState({
          portList:res.data.portList
        });
      }
    })
    .catch(err => {
      message.error(err);
    });
  }

  componentWillMount() {
    this.getCurrentPort();
  }
  render() {
    const path = this.props.location.pathname;
    return (
      <div>
        <Menu
          onClick={this.handleClick(path)}
          selectedKeys={[path]}
          mode="horizontal"
          theme="dark"
        >
          <Menu.Item className="select-chuankou">
            选择串口：
            <Select
              className="nav-select"
              defaultValue={this.state.port}
              onChange={this.handleSelect}
            >
              {this.getSelectedOptions(this.state.portList)}
            </Select>
          </Menu.Item>
          <Menu.Item key="/SmartTable" className="nav-2">
            <Link to="/SmartTable">车辆进出记录</Link>
          </Menu.Item>
          <Menu.Item key="/RecordPersonTable" className="RecordPersonTable">
            <Link to="/RecordPersonTable">已录入人员</Link>
          </Menu.Item>
          <Menu.Item key="/AttendanceTable" className="AttendanceTable">
            <Link to="/AttendanceTable">考勤记录</Link>
          </Menu.Item>
          <div className="top-btn-container">
            <Button
              className="top-btn"
              type="primary"
              onClick={this.handleClearPerson}
            >
              清除在场人员
            </Button>
            <Button
              className="top-btn"
              type="primary"
              onClick={this.handleAlarm}
            >
              手动报警
            </Button>
          </div>
        </Menu>
      </div>
    );
  }
}

export default withRouter(NavBar);
