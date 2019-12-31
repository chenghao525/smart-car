import React, { Component } from "react";
import { Table, Button, Popconfirm, message } from "antd";
import { httpPost } from "../config/request";
import { API } from "../config/api";
import AddPersonformModal from "./AddPersonFormModal";
require("../customCSS/myStyle.css");

class RecordPersonTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0
      }
    };
  }

  handleTableChange = pagination => {
    console.log("Change!", pagination);
    this.getTableData(pagination.current);
    this.setState({
      pagination: {
        current: pagination.current
      }
    });
  };

  handleAddPerson = e => {
    this.child.showModal();
    console.log("handleAddPerson");
  };

  handleDelete = record => {
    console.log(record);
  };

  // handlePageChange = (page, pageSize) => {
  //   this.setState({
  //     pagination:{
  //       currentPage:page
  //     }
  //   })
  // };

  getTableData = page => {
    let params = {
      currentPage: page
    };
    httpPost(API.GET_PERSON_INFO, params)
      .then(res => {
        if (res.code === "1") {
          this.setState({
            tableData: res.data.accessRecordList,
            pagination: {
              total: res.data.total,
              currentPage: res.data.currentPage,
              pageSize: res.data.numOfSinglePages
            }
          });
        }
      })
      .catch(err => {
        message.error("Error",3);
      });
  };

  componentDidMount() {
    this.getTableData(1);
  }

  render() {
    let tableData = this.state.tableData;
    const columns = [
      {
        title: "姓名",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "工号",
        dataIndex: "workerId",
        key: "workerId"
      },
      {
        title: "人员ID",
        dataIndex: "personId",
        key: "personId"
      },
      {
        title: "卡号",
        dataIndex: "cardId",
        key: "cardId"
      },
      {
        title: "添加时间",
        dataIndex: "addTime",
        key: "addTime"
      },
      {
        title: "操作",
        key: "action",
        render: (text, record) =>
          this.state.tableData.length >= 1 ? (
            <Popconfirm
              title="确认删除？"
              onConfirm={() => this.handleDelete(record)}
            >
              <a href="#">删除</a>
            </Popconfirm>
          ) : null
      }
    ];

    return (
      <div>
        <div className="up-btn-container">
          <Button
            type="primary"
            onClick={this.handleAddPerson}
            style={{ marginRight: "10px" }}
          >
            录入人员
          </Button>
        </div>
        <div className="smart-table-container">
          <Table
            columns={columns}
            dataSource={tableData}
            size="large"
            rowKey={record => record.workerId}
            pagination={{
              total: this.state.pagination.total,
              current: this.state.pagination.current,
              pageSize: this.state.pagination.pageSize,
              onChange: (page, pageSize) => {
                this.setState(
                  {
                    pagination: { current: page }
                  },
                  () => {
                    window.location.hash = `#${page}`;
                  }
                );
              }
            }}
            onChange={this.handleTableChange}
          />
        </div>
        <AddPersonformModal onRef={ref => (this.child = ref)} />
      </div>
    );
  }
}

export default RecordPersonTable;

/* /* <Pagination
            current={this.state.pagination.current}
            pageSize={this.state.pagination.pagesize}
            total={this.state.pagination.total}
            onChange={this.handlePageChange}
          ></Pagination> */
