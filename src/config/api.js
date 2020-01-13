const BASE_URL = 'http://localhost:3000'
// const BASE_URL = 'http://180.169.194.140:26397'
// const BASE_URL = 'http://192.168.2.101:8004'
// const BASE_URL = document.location.origin

 export const API = {
  BASE_URL: BASE_URL,

  MOCK:'/mock.json',
  GET_PORTLIST:'/getPortList',//获取串口列表
  SET_PROT: '/setPort',//选择串口
  ADD_PERSONNEL_INFO:'/addPersonnelInfo',//录入人员
  DELETE_PERSONNEL_INFO:'/deletePersonnelInfo',//删除人员
  GET_ACCESSRECORD:'/getAccessRecord',//获取考勤记录
  GET_PERSON_INFO:'/getPersonInfo',//获取已录入人员
  CLEAR_COUNT:'/clearCount',//手动清除在场人员
  ALARM:'/alarm'//手动报警
};

