// src/router/router.js
import React, {Component} from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import SmartTable from "../components/SmartTable";
import RecordPersonTable from "../components/RecordPersonTable"

export default class AppRouter extends Component {
  render() {
    return(
      <Switch>
        // 使用Redirect指定/index为默认首页
        <Route path="/" exact render={() => (<Redirect to="/RecordPersonTable" />)} />
        <Route path="/SmartTable" component={SmartTable} />
        <Route path="/RecordPersonTable" component={RecordPersonTable} />
      </Switch>
    )
  }
} 