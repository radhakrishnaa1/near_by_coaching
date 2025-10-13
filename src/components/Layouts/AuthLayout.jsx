import React, { useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, Avatar, theme } from "antd";
import { Outlet } from "react-router-dom";
// import AuthHeader from './AuthHeader';
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem("Dashboard", "1", <PieChartOutlined />),
  getItem("My Courses", "2", <DesktopOutlined />),
  getItem("Offers", "9", <FileOutlined />),
  getItem("Faculties", "sub1", <TeamOutlined />, [
    getItem("Tom", "3"),
    getItem("Bill", "4"),
    getItem("Alex", "5"),
  ]),
  getItem("Reports", "sub2", <UserOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
];
const AuthLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <>
      {/* <AuthHeader /> */}
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="demo-logo-vertical">
            <div
              style={{
                marginTop: 10,
                borderBottom: "1px solid #ffffff45",
                paddingBottom: 20,
                textAlign: "center",
              }}
            >
              <Avatar
                style={{
                  margin: "auto",
                  display: "block",
                  width: 80,
                  height: 80,
                }}
                src={
                  <img
                    draggable={false}
                    src={require("../../ilogo.png")}
                    alt="avatar"
                  />
                }
              />

              <div
                className="main-title"
                style={{ color: "#fff", marginTop: 10 }}
              >
                {" "}
                जनदर्शन
              </div>
              <div className="sub-title" style={{ color: "#fff" }}>
                {" "}
                मुख्यमंत्री छत्तीसगढ़ शासन
              </div>
            </div>
          </div>
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={items}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }} />
          <Content style={{ margin: "0 16px" }}>
            <Outlet />
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};
export default AuthLayout;
