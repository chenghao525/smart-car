import React, { Component } from "react";
import { Table } from "antd";
// import {httpGet, httpPost} from '../config/request' 
// import {API} from '../config/api'
require("../customCSS/myStyle.css");

class SmartTable extends Component {
  constructor(props){
    super(props);
    this.state = {
      tableData : []
    }
  }

  componentDidMount(){
    // httpGet(API.MOCK, {}).then(res=>{
    //     console.log(res)
    //     this.setState({tableData: res.data})
    // })
  }

  render() {
    let tableData = this.state.tableData;
    const columns = [
      {
        title: "Name",
        dataIndex: "name"
      },
      {
        title: "Age",
        dataIndex: "age"
      },
      {
        title: "Address",
        dataIndex: "address"
      }
    ];


    return (
      <div className="smart-table-container">
        <Table columns={columns} dataSource={tableData} size="large" style={{ marginTop: "6.7%" }} />
      </div>
    );
  }
}

export default SmartTable;
