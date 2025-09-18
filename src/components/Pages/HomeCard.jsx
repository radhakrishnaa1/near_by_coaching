
import React from 'react';
import { Card, Row, Col, Avatar ,Typography} from 'antd';

const { Title } = Typography;

const items = [
  {
    title: 'कार्यवाही दर्ज',
    icon: '', // Replace with your icon URL
    count:230
  },
  {
    title: 'दर्ज शिकायत',
    icon: '', // Replace with your icon URL
    count:2320
  },
  {
    title: 'निराकृत पत्र',
    icon: '', // Replace with your icon URL
    count:130
  },
   {
    title: 'उपयोगकर्ता',
    icon: '', // Replace with your icon URL
    count:2030

  },
];

const cardStyle = {
  width: 180,
  height: 220,
  borderRadius: 20,
  boxShadow: '0 10px 20px rgba(0,0,0,0.15)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(180deg, #ffe5b4 0%, #c1d8ff 100%)',
};
const containerStyle = {
  borderRadius: 20,
  padding: 20,
  background:"#fcf8e3ff",
  // background: 'linear-gradient(135deg, #fca311 40%, #3b82f6 90%)',
  width:"60%",
margin:20
};


export default function App() {
  return (
    
      <Row gutter={[24, 24]} justify="center" wrap>
        { items && items.map(({ title, icon,count }) => (
          <Col key={title}>
            <Card
              style={cardStyle}
              bodyStyle={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}
              bordered={false}
              hoverable
            >
              <Avatar src={icon} size={72} style={{ background: 'white' }} />
              <div style={{ textAlign: 'center', fontWeight: 500, fontSize: 16 }}>{count}</div>

              <div style={{ textAlign: 'center', fontWeight: 500, fontSize: 16 }}>{title}</div>
            </Card>
          </Col>
        ))}
      </Row>
    
  );
}
