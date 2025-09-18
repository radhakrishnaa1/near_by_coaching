
import React from 'react';
import { Button, Col, Row, Statistic } from 'antd';
import LayoutHome from '../Layouts/LayoutHome';


const Registration = () => (
  <LayoutHome>
  <Row gutter={16}>
    <Col span={12}>
      <Statistic title="Active Users" value={112893} />
    </Col>
    <Col span={12}>
      <Statistic title="Account Balance (CNY)" value={112893} precision={2} />
      
    </Col>
    
  </Row>
  </LayoutHome>
);
export default Registration;