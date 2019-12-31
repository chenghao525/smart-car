import React from "react";
import NavBar from "./components/NavBar";
import AppRouter from "./router/AppRouter";
import "./App.css";
import { BrowserRouter } from "react-router-dom";

class App extends React.Component {
  // componentDidMount() {
  //   window.addEventListener("scroll", this.handleScroll);
  // }

  handleScroll = e => {
    var header = document.getElementById("header"); //定义一个dom节点为'header'的header变量
    if (window.pageYOffset >= 70) {
      //if语句判断window页面Y方向的位移是否大于或者等于导航栏的height像素值
      header.classList.add("header_bg"); //当Y方向位移大于80px时，定义的变量增加一个新的样式'header_bg'
    } else {
      header.classList.remove("header_bg"); //否则就移除'header_bg'样式
    }
  };
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <NavBar className="header" id="header"/>
          <AppRouter />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
