import React, { Component } from "react";
import { Table, Button, Popconfirm} from "antd";
import { httpGet, httpPost } from "../config/request";
import { API } from "../config/api";
import AddPersonformModal from "./AddPersonFormModal";
require("../customCSS/myStyle.css");

class RecordPersonTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: []
    };
  }
  onRef = (ref) => {
    this.child = ref
}
  handleClearPerson = e => {
    console.log("CC");
  };

  handleAddPerson = e=>{
    this.child.showModal();
    console.log("handleAddPerson")
  }

  handleDelete = record=>{
    console.log(record)
  }

  componentDidMount() {
    httpGet(API.MOCK, {}).then(res => {
      console.log(res);
      this.setState({ tableData: res.data });
    });
  }

  render() {
    let tableData = this.state.tableData;
    const columns = [
      {
        title: "姓名",
        dataIndex: "name",
        key:"name"
      },
      {
        title: "工号",
        dataIndex: "workerId",
        key:"workerId"
      },
      {
        title: "人员ID",
        dataIndex: "personId",
        key:"personId"
      },
      {
        title: "卡号",
        dataIndex: "cardId",
        key:"cardId"
      },
      {
        title: "添加时间",
        dataIndex: "addTime",
        key:"addTime"
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) =>
        this.state.tableData.length >= 1 ? (
          <Popconfirm title="确认删除？" onConfirm={() => this.handleDelete(record)}>
            <a>删除</a>
          </Popconfirm>
        ) : null,
      },
    ];

    return (
      <div>
        <div className="up-btn-container">
          <Button type="primary" onClick={this.handleAddPerson} style={{marginRight:"10px"}}>录入人员</Button>
          <Button type="primary" onClick={this.handleClearPerson}>清除在场人员</Button>
        </div>
        <div className="smart-table-container">
          <Table columns={columns} dataSource={tableData} size="large" />
        </div>
        <AddPersonformModal/>
      </div>
    );
  } 
}

export default RecordPersonTable;
