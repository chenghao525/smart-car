import React, { Component } from "react";
import Axios from 'axios';
import { Table } from "antd";
require("../customCSS/myStyle.css");

class SmartTable extends Component {
  constructor(props){
    super(props);
    this.state = {
      tableData : []
    }
  }

  componentWillMount(){
    Axios.get('http://localhost:3000/mock.json', {}).then(res=>{
      if(res.data.code === 200){
        this.setState({tableData: res.data.data})
      }
    })
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
    const data = [
      {
        key: "1",
        name: "John Brown",
        age: 32,
        address: "New York No. 1 Lake Park"
      },
      {
        key: "2",
        name: "Jim Green",
        age: 42,
        address: "London No. 1 Lake Park"
      },
      {
        key: "3",
        name: "Joe Black",
        age: 32,
        address: "Sidney No. 1 Lake Park"
      }
    ];

    return (
      <div className="smart-table-container">
        <Table columns={columns} dataSource={tableData} size="large" />
      </div>
    );
  }
}

export default SmartTable;
