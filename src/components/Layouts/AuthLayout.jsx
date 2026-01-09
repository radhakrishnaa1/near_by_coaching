import React, { useState } from "react";
import {
  AppstoreAddOutlined,
  AppstoreOutlined,
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  LogoutOutlined,
  UserOutlined,
  LaptopOutlined,
} from "@ant-design/icons";
import {
  Breadcrumb,
  Typography,
  Layout,
  Menu,
  Avatar,
  theme,
  Col,
  Row,
  Divider,
} from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import {
  FACULTY_DETAILS,
  INSTITUTE_PROFILE,
  MYCOURSES,
} from "../../constants/Routes";

const { Text } = Typography;
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

const itemsForStudent = [
  {
    key: "1",
    label: "Dashboard",
    icon: <AppstoreOutlined />,
    routes: "/",
  },
  {
    key: "2",
    label: "Profile",
    icon: <AppstoreOutlined />,
    routes: "/",
  },
  {
    key: "3",
    label: "Payment Receipt",
    icon: <AppstoreOutlined />,
    routes: "/",
  },
];

const itemsForTutor = [
  {
    key: "1",
    label: "Dashboard",
    icon: <AppstoreOutlined />,
    routes: "/",
  },
  {
    key: "2",
    label: "Profile",
    icon: <AppstoreOutlined />,
    routes: FACULTY_DETAILS,
  },
];

const items = [
  {
    key: "1",
    label: "Dashboard",
    icon: <AppstoreOutlined />,
    routes: "/",
  },
  {
    key: "6",
    label: "Institute Profile",
    icon: <AppstoreOutlined />,
    routes: INSTITUTE_PROFILE,
  },
  {
    key: "2",
    label: "My Courses",
    icon: <DesktopOutlined />,
    routes: MYCOURSES,
  },
  { key: "3", label: "Offers", icon: <FileOutlined /> },
  {
    key: "4",
    label: "Faculties",
    icon: <TeamOutlined />,
    routes: FACULTY_DETAILS,
  },
  {
    key: "5",
    label: "Reports",
    icon: <PieChartOutlined />,
    children: [
      {
        key: "51",
        label: "Report1",
        routes: "",
      },
    ],
  },
];

const AuthLayout = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const [roleId, setRoleId] = useState(sessionStorage.getItem("roleId"));
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleMenuClick = (e) => {
    navigate(e.item.props.routes);
  };

  console.log("roleId===>", props?.instituteData);
  const handlelogOut = () => {
    sessionStorage.clear();
    navigate("/");
  };
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
              {roleId === "1" ? (
                <>
                  <div
                    className="main-title"
                    style={{ color: "#fff", marginTop: 10 }}
                  >
                    {props?.instituteData?.institute_name}
                  </div>
                  <div
                    style={{
                      borderTop: "0.1px solid #80808073",
                      width: "80%",
                      margin: "auto",
                    }}
                  ></div>
                  <div className="sub-title" style={{ color: "#fff" }}>
                    {props?.instituteData?.vision}
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="main-title"
                    style={{ color: "#fff", marginTop: 10 }}
                  >
                    {props?.studentData?.student_name}
                  </div>
                </>
              )}
            </div>
          </div>
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={
              roleId === "1"
                ? items
                : roleId === "3"
                ? itemsForTutor
                : itemsForStudent
            }
            onClick={handleMenuClick}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <Row>
              <Col span={8}></Col>
              <Col span={12}></Col>
              <Col span={4} onClick={() => handlelogOut()}>
                {/* <Avatar
                  src={
                    <img
                      draggable={false}
                      src={require("../../ilogo.png")}
                      alt="avatar"
                    />
                  }
                /> */}
                <LogoutOutlined
                  style={{ fontSize: "30px", color: "rgba(244, 67, 54, 1)" }}
                />{" "}
                <Text> Admin</Text>
              </Col>
            </Row>
          </Header>
          <Content style={{ margin: "16px", backgroundColor: "#ffffff" }}>
            {props?.children}
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
