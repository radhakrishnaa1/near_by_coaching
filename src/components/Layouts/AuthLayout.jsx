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
  COURSE_PURCHASE,
  MYCOURSES,
  TUTOR_DASHBOARD,
  STUDENT_PROFILE,
  CHANGE_PASSWORD,
  STUDENTDASHBOARD,
  INSTITUTE_DASHBOARD,
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
    routes: STUDENTDASHBOARD,
  },
  {
    key: "2",
    label: "Profile",
    icon: <AppstoreOutlined />,
    routes: STUDENT_PROFILE,
  },
  {
    key: "4",
    label: "Buy Course",
    icon: <AppstoreOutlined />,
    routes: COURSE_PURCHASE,
  },
  {
    key: "5",
    label: "Change Password",
    icon: <TeamOutlined />,
    routes: CHANGE_PASSWORD,
  },
];

const itemsForTutor = [
  {
    key: "1",
    label: "Dashboard",
    icon: <AppstoreOutlined />,
    routes: TUTOR_DASHBOARD,
  },
  {
    key: "2",
    label: "Profile",
    icon: <AppstoreOutlined />,
    routes: FACULTY_DETAILS,
  },
  {
    key: "4",
    label: "Change Password",
    icon: <TeamOutlined />,
    routes: CHANGE_PASSWORD,
  },
];

const items = [
  {
    key: "1",
    label: "Dashboard",
    icon: <AppstoreOutlined />,
    routes: INSTITUTE_DASHBOARD,
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
    label: "Change Password",
    icon: <TeamOutlined />,
    routes: CHANGE_PASSWORD,
  },
  // {
  //   key: "5",
  //   label: "Reports",
  //   icon: <PieChartOutlined />,
  //   children: [
  //     {
  //       key: "51",
  //       label: "Report1",
  //       routes: "",
  //     },
  //   ],
  // },
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

  // console.log("roleId===>", props?.instituteData);
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
                    {sessionStorage.getItem("userName")}
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
                    {sessionStorage.getItem("userName")}
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
                <Text>
                  {" "}
                  {sessionStorage.getItem("roleId") === "1"
                    ? "Institute"
                    : sessionStorage.getItem("roleId") === "2"
                    ? "Student"
                    : "Tutor"}
                </Text>
              </Col>
            </Row>
          </Header>
          <Content style={{ margin: "16px", backgroundColor: "#ffffff" }}>
            {props?.children}
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Near By Coaching ©{new Date().getFullYear()} Created by Sagar sahu
            BCA 3rd Year
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};
export default AuthLayout;
