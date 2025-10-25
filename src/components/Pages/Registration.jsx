import React from 'react';
import { Divider,Card, Form, Input,Row,Col,Select,Button} from 'antd';
import LayoutHome from '../Layouts/LayoutHome';

const InstituteRegistration = () => (
  <LayoutHome>
    <Card title={<div style={{fontSize:20}}>Institute Registration</div>} variant="borderless" style={{textAlign:"center"}}>
     <Form name="layout-multiple-vertical" layout="vertical">
     
 <Row gutter={16}>
      <Col span={12}>
       <Form.Item layout="vertical" label="Institute Name" name="vertical" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      </Col>
      <Col span={12}> 
      <Form.Item layout="vertical" label="Contact Number" name="vertical2" rules={[{ required: true }]}>
        <Input />
      </Form.Item></Col>
     
    </Row>

         
 <Row gutter={16}>
      <Col span={12}>
       <Form.Item layout="vertical" label="Email id" name="vertical" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      </Col>
      <Col span={12}> 
      <Form.Item layout="vertical" label="Mode Of learning" name="vertical2" rules={[{ required: true }]}>
         <Select
    mode="tags"
    style={{ width: '100%' }}
    // onChange={handleChange}
    // tokenSeparators={[',']}
    
  >
    <option value="apple">Online</option>
     <option value="apple">Offline</option>
          <option value="apple">At Your door</option>

      
  </Select>
      </Form.Item></Col>
      <Col span={8}> <Form.Item label="medium" name="vertical" rules={[{ required: true }]}>
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
export default InstituteRegistration;