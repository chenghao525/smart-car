// src/router/router.js
import React, {Component} from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import SmartForm from "../components/SmartForm";
import SmartTable from "../components/SmartTable";

export default class AppRouter extends Component {
  render() {
    return(
      <Switch>
        // 使用Redirect指定/index为默认首页
        <Route path="/" exact render={() => (<Redirect to="/SmartForm" />)} />
        <Route path="/SmartForm" component={SmartForm} />
        <Route path="/SmartTable" component={SmartTable} />
      </Switch>
    )
  }
} 