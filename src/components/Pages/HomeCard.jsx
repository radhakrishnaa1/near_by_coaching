
// import React from 'react';
// import { Card, Row, Col, Avatar ,Typography} from 'antd';

// const { Title } = Typography;

// const items = [
//   {
//     title: 'कार्यवाही दर्ज',
//     icon: '', // Replace with your icon URL
//     count:230
//   },
//   {
//     title: 'दर्ज शिकायत',
//     icon: '', // Replace with your icon URL
//     count:2320
//   },
//   {
//     title: 'निराकृत पत्र',
//     icon: '', // Replace with your icon URL
//     count:130
//   },
//    {
//     title: 'उपयोगकर्ता',
//     icon: '', // Replace with your icon URL
//     count:2030

//   },
// ];

// const cardStyle = {
//   width: 180,
//   height: 220,
//   borderRadius: 20,
//   boxShadow: '0 10px 20px rgba(0,0,0,0.15)',
//   display: 'flex',
//   flexDirection: 'column',
//   alignItems: 'center',
//   justifyContent: 'center',
//   background: 'linear-gradient(180deg, #ffe5b4 0%, #c1d8ff 100%)',
// };
// const containerStyle = {
//   borderRadius: 20,
//   padding: 20,
//   background:"#fcf8e3ff",
//   // background: 'linear-gradient(135deg, #fca311 40%, #3b82f6 90%)',
//   width:"60%",
// margin:20
// };


// export default function App() {
//   return (
    
//       <Row gutter={[24, 24]} justify="center" wrap>
//         { items && items.map(({ title, icon,count }) => (
//           <Col key={title}>
//             <Card
//               style={cardStyle}
//               bodyStyle={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}
//               bordered={false}
//               hoverable
//             >
//               <Avatar src={icon} size={72} style={{ background: 'white' }} />
//               <div style={{ textAlign: 'center', fontWeight: 500, fontSize: 16 }}>{count}</div>

//               <div style={{ textAlign: 'center', fontWeight: 500, fontSize: 16 }}>{title}</div>
//             </Card>
//           </Col>
//         ))}
//       </Row>
    
//   );
// }


import React from "react";
import { Card, Row, Col, Button, Typography } from "antd";
import {
  LaptopOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const StudyOptions = () => {
  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      {/* Top Heading */}
      <Title
        level={2}
        style={{
          marginBottom: 20,
          fontWeight: 600,
          color: "#333",
        }}
      >
        Learn from home or at a centre — your choice
      </Title>

      {/* Middle Image */}
      <img
        src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
        alt="Learning Illustration"
        style={{
          width: 150,
          marginBottom: 40,
        }}
      />

      <Row gutter={[32, 32]} justify="center">
        {/* Study Online Card */}
        <Col xs={24} sm={12} md={8} lg={8}>
          <Card
            hoverable
            style={{
              borderRadius: 12,
              textAlign: "center",
              padding: "20px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/3062/3062634.png"
              alt="Study Online"
              style={{ width: 120, marginBottom: 20 }}
            />
            <Title level={4}>Register As An Institute</Title>
            <Text type="secondary">
              Join us as an institute in this portal and explore your courses .
            </Text>
            <br />
            <Button
              type="primary"
              style={{
                marginTop: 20,
                backgroundColor: "#f44336",
                borderColor: "#f44336",
              }}
              size="large"
              icon={<LaptopOutlined />}
            >
              Join Us Now
            </Button>
          </Card>
        </Col>

        {/* Study Offline Card */}
        <Col xs={24} sm={12} md={8} lg={8}>
          <Card
            hoverable
            style={{
              borderRadius: 12,
              textAlign: "center",
              padding: "20px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/3558/3558860.png"
              alt="Study Offline"
              style={{ width: 120, marginBottom: 20 }}
            />
            <Title level={4}>Register as a student</Title>
            <Text type="secondary">
              Join our physical centers for a classroom learning experience and online classes.
            </Text>
            <br />
            <Button
              type="primary"
              style={{
                marginTop: 20,
                backgroundColor: "#f44336",
                borderColor: "#f44336",
              }}
              size="large"
              icon={<EnvironmentOutlined />}
            >
              Join Us Now
            </Button>
          </Card>
        </Col>
         <Col xs={24} sm={12} md={8} lg={8}>
          <Card
            hoverable
            style={{
              borderRadius: 12,
              textAlign: "center",
              padding: "20px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/3558/3558860.png"
              alt="Study Offline"
              style={{ width: 120, marginBottom: 20 }}
            />
            <Title level={4}> Institute Near you</Title>
            <Text type="secondary">
              Find Registered Institute and their courses near by you according to your need. 
            </Text>
            <br />
            <Button
              type="primary"
              style={{
                marginTop: 20,
                backgroundColor: "#f44336",
                borderColor: "#f44336",
              }}
              size="large"
              icon={<EnvironmentOutlined />}
            >
              Explore Courses
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default StudyOptions;
