import React from 'react';
import { Col, Row,Typography ,theme} from 'antd';
import LayoutHome from '../Layouts/LayoutHome';
import Login from './Login';
import HomeCard from "./HomeCard"
// import registration from './Registration';
const { Title } = Typography;


const App = () => {

  
 const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return(<LayoutHome>
<div
style={{
            background: "#faad1417",
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
>
    <Row>
      <Col span={12}>
      <div style={{padding:"0px 40px"}}>
       <Title level={2} style={{fontFamily:"Poppins"}}>Near By Coaching</Title>
       <div style={{lineHeight:"2rem",fontFamily:"Poppins",fontSize:"1.2rem",textAlign:"justify"}}>The Nearby Coaching Institute project is designed to address this challenge by creating a web-based platform that connects students with coaching centers around their location. It enables students to search, compare, and review institutes based on criteria like location, subjects offered, faculty experience, fee structure, and student feedback.</div>
      </div>
      </Col>

      <Col span={12}>
      <Login></Login>
      
      </Col>
    </Row>
</div>
<div style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}>
<HomeCard/>
</div>

  </LayoutHome>)
}
export default App;