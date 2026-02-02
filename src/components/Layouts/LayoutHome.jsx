// import React from 'react';
// import logo from "../../logo.svg"
// import { Breadcrumb, Layout, Menu, theme, Statistic } from 'antd';
// import CarouselTop from './CarouselTop';
// // import registration from '../Pages/Registration';
// const { Header, Content, Footer } = Layout;
// // const items = Array.from({ length: 5 }).map((_, index) => ({
// //   key: index + 1,
// //   label: `sagar ${index + 1}`,
// // }));

// const itemsNav = [
//   {
//   key:1,
//   label:"Home",
// },
// {
//   key:2,
//   label:"Contact Us"
// },

// {
//   key :3,
//   label:"Gallery"
// }

// ]

// const LayoutHome = (props) => {
//   const {
//     token: { colorBgContainer, borderRadiusLG },
//   } = theme.useToken();
//   return (
//     <Layout>
//     <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//   {/* Left side: Logo + Title */}
//   <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
//     <img src={logo} alt="Logo" width={60} />
//     <div style={{ color: '#ffffff', fontSize: '18px', fontWeight: 'bold' }}>My Coaching App</div>
//   </div>

//   <Menu
//     theme="dark"
//     mode="horizontal"
//     defaultSelectedKeys={['1']}
//     items={itemsNav}
//     style={{ flex: 1, justifyContent: 'flex-end', display: 'flex' }}
//   />
// </Header>
// <CarouselTop/>
//       <Content style={{ padding: '48px' }}>

//         <div

//         >
//           {props?.children}
//         </div>
//       </Content>
//       <Footer style={{ textAlign: 'center' }}>
//         Ant Design ©{new Date().getFullYear()} Created by Ant UED
//       </Footer>
//     </Layout>
//   );
// };
// export default LayoutHome;

import React, { Children } from "react";
import { Layout, Button, Typography, Space, Badge } from "antd";
import { BellOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import CarouselTop from "./CarouselTop";

const { Header, Footer, Content } = Layout;
const { Title } = Typography;

const FloatingAppBar = (props) => {
  return (
    <Layout>
      {/* Floating Header */}
      <Header
        style={{
          position: "fixed",
          top: 20,
          left: "50%",
          transform: "translateX(-50%)",
          width: "90%",
          maxWidth: 1200,
          background: "#fff",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          borderRadius: 12,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 20px",
          zIndex: 1000,
        }}
      >
        {/* Left Section: Logo or Title */}
        <Title level={4} style={{ margin: 0, color: "#333", fontWeight: 600 }}>
          {/* NEAR BY COACHING */}
        </Title>

        {/* Right Section: Action Buttons */}
        <Space size="large">
          <Badge count={5} size="small">
            <Button
              type="text"
              icon={<BellOutlined style={{ fontSize: 18 }} />}
            />
          </Badge>
          <Button
            type="text"
            icon={<SettingOutlined style={{ fontSize: 18 }} />}
          />
          <Button
            type="primary"
            shape="circle"
            icon={<UserOutlined />}
            style={{ backgroundColor: "#f44336", borderColor: "#f44336" }}
          />
        </Space>
      </Header>
      <div style={{ paddingTop: 100, backgroundColor: "#fff" }}></div>
      {/* {props?.flagForSlider ? <CarouselTop /> : null} */}

      {/* Dummy content to test scrolling */}
      <Content style={{ background: "#fff", padding: 20 }}>
        {props?.children}
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Near by Coaching ©{new Date().getFullYear()} Created by Sagar Sahu Bca
        3rd
      </Footer>
    </Layout>
  );
};

export default FloatingAppBar;
