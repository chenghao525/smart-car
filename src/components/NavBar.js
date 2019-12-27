import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Menu, Icon } from "antd";
require('../customCSS/myStyle.css');

class NavBar extends Component {
  state = {
    current: "mail"
  };

  handleClick = e => {
    console.log("click ", e);
    this.setState({
      current: e.key
    });
  };

  render() {
    return (
      <Menu
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="horizontal"
        theme="dark"
      >
        <Menu.Item key="cc" className="nav-2">
          <Link to='/SmartTable'>车辆进出记录</Link >
        </Menu.Item>
        <Menu.Item key="RecordPersonTable" className="RecordPersonTable">
          <Link to='/RecordPersonTable'>已录入人员</Link >
        </Menu.Item>
      </Menu>
    );
  }
}

export default NavBar;
