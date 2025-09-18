import React from 'react';
import logo from "../../logo.svg"
import { Breadcrumb, Layout, Menu, theme, Statistic } from 'antd';
import CarouselTop from './CarouselTop';
// import registration from '../Pages/Registration';
const { Header, Content, Footer } = Layout;
// const items = Array.from({ length: 5 }).map((_, index) => ({
//   key: index + 1,
//   label: `sagar ${index + 1}`,
// }));

const itemsNav = [
  {
  key:1,
  label:"Home",
},
{
  key:2,
  label:"Contact Us"
},

{
  key :3,
  label:"Gallery"
}

]


const LayoutHome = (props) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
    <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
  {/* Left side: Logo + Title */}
  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
    <img src={logo} alt="Logo" width={60} />
    <div style={{ color: '#ffffff', fontSize: '18px', fontWeight: 'bold' }}>My Coaching App</div>
  </div>

  {/* Right side: Menu */}
  <Menu
    theme="dark"
    mode="horizontal"
    defaultSelectedKeys={['1']}
    items={itemsNav}
    style={{ flex: 1, justifyContent: 'flex-end', display: 'flex' }}
  />
</Header>
<CarouselTop/>
      <Content style={{ padding: '48px' }}>
        {/* <Breadcrumb
          style={{ margin: '16px 0' }}
          items={[{ title: 'Home' }, { title: 'List' }, { title: 'App' }]}
        /> */}
        <div
          
        >
          {props?.children}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};
export default LayoutHome;