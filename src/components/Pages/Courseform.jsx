import React from 'react';
import { Divider,Card, Form, Input,Row,Col,Select,Button} from 'antd';
import LayoutHome from '../Layouts/LayoutHome';

const Courseform = () => (
  <LayoutHome>
    <Card title={<div style={{fontSize:20}}>Course Details</div>} variant="borderless" style={{textAlign:"center"}}>
     <Form name="layout-multiple-vertical" layout="vertical">
     
 <Row gutter={16}>
      <Col span={12}>
       <Form.Item layout="vertical" label="Course Name" name="vertical" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      </Col>
      <Col span={12}> 
      <Form.Item layout="vertical" label="Medium" name="vertical2" rules={[{ required: true }]}>
        <Input />
      </Form.Item></Col>
      
    </Row>

    <Row gutter={16}>
      <Col span={12}>
       <Form.Item layout="vertical" label="Course Duration" name="vertical" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      </Col>
      <Col span={12}> 
      <Form.Item layout="vertical" label="Course Fee" name="vertical2" rules={[{ required: true }]}>
        <Input />
      </Form.Item></Col>
      
    </Row>

     <Row gutter={16}>
      <Col span={12}>
       <Form.Item layout="vertical" label="Course Duration" name="vertical" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      </Col>
      <Col span={12}> 
      <Form.Item layout="vertical" label="Upload File" name="vertical2" rules={[{ required: true }]}>
        <Input />
      </Form.Item></Col>
      
    </Row>

     <Divider />
     <Button type="primary" htmlType="submit">
        Submit
      </Button>
  
</Form>
    </Card>
  </LayoutHome>
);
export default <Courseform></Courseform>;