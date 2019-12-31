// src/router/router.js
import React, {Component} from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import SmartTable from "../components/SmartTable";
import RecordPersonTable from "../components/RecordPersonTable"
import AttendanceTable from "../components/AttendanceTable"

export default class AppRouter extends Component {
  render() {
    return(
      <Switch>
        <Route path="/" exact render={() => (<Redirect to="/RecordPersonTable" />)} />
        <Route path="/SmartTable" component={SmartTable} />
        <Route path="/RecordPersonTable" component={RecordPersonTable} />
        <Route path="/AttendanceTable" component={AttendanceTable} />
      </Switch>
    )
  }
} 