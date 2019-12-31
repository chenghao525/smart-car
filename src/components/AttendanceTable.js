import React, { Component } from "react";
import { Table, message } from "antd";
import { httpPost } from "../config/request";
import { API } from "../config/api";
require("../customCSS/myStyle.css");

class AttendanceTable extends Component {
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

  getTableData(page) {
    let params = {
      currentPage: page
    };
    httpPost(API.GET_ACCESSRECORD, params).then(res => {
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
    }).catch(err => {
      message.error("Error",3);
    });
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

  componentDidMount() {
    this.getTableData(1);
  }

  render() {
    let tableData = this.state.tableData;
    const columns = [
      {
        title: "姓名",
        dataIndex: "a_name",
        key: "a_name"
      },
      {
        title: "工号",
        dataIndex: "a_workerId",
        key: "a_workerId"
      },
      {
        title: "工种",
        dataIndex: "a_jobtype",
        key: "a_jobtype"
      },
      {
        title: "方向",
        dataIndex: "a_direction",
        key: "a_direction"
      },
      {
        title: "设备ID",
        dataIndex: "a_deviceId",
        key: "a_deviceId"
      },
      {
        title: "时间",
        dataIndex: "a_occurrence_time",
        key: "a_occurrence_time"
      }
    ];

    return (
      <div>
        <div className="smart-table-container">
          <Table
            columns={columns}
            dataSource={tableData}
            size="large"
            style={{ marginTop: "6.7%" }}
            rowKey={record => record.a_workerId}
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
      </div>
    );
  }
}

export default AttendanceTable;
