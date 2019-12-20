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
        <Menu.Item key="mail" className="nav-1">
          <Link to='/'>Navigation One</Link >
        </Menu.Item>
        <Menu.Item key="cc" className="nav-2">
          <Link to='/SmartTable'>Navigation two</Link >
        </Menu.Item>
      </Menu>
    );
  }
}

export default NavBar;
