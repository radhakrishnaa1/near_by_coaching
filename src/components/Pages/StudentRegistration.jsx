import React from 'react';
import { Divider,Card, Form, Input,Row,Col,Select,Button} from 'antd';
import LayoutHome from '../Layouts/LayoutHome';

const StudentRegistration = () => (
  <LayoutHome>
    <Card title={<div style={{fontSize:20}}>Student Registration</div>} variant="borderless" style={{textAlign:"center"}}>
     <Form name="layout-multiple-vertical" layout="vertical">
     
 <Row gutter={16}>
      <Col span={12}>
       <Form.Item layout="vertical" label="Student Name" name="vertical" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      </Col>
      <Col span={12}> 
      <Form.Item layout="vertical" label="Class" name="vertical2" rules={[{ required: true }]}>
        <Input />
      </Form.Item></Col>
      
    </Row>

    <Row gutter={16}>
      <Col span={12}>
       <Form.Item layout="vertical" label="Contact Number" name="vertical" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      </Col>
      <Col span={12}> 
      <Form.Item layout="vertical" label="Address" name="vertical2" rules={[{ required: true }]}>
        <Input />
      </Form.Item></Col>
      
    </Row>

         
 
     
      
       <Row  gutter={16}>
      <Col span={12}> 
      <Form.Item layout="vertical" label="State" name="vertical2" rules={[{ required: true }]}>
         <Select
    mode="tags"
    style={{ width: '100%' }}
    // onChange={handleChange}
    // tokenSeparators={[',']}
    
  >
    <option value="apple">Assam</option>
     <option value="apple">Chhattisgarh</option>
     <option value="apple">Madhyapradesh</option>
      
  </Select>
      </Form.Item></Col>
      <Col span={12}> <Form.Item label="medium" name="vertical" rules={[{ required: true }]}>
        <Select
    mode="tags"
    style={{ width: '100%' }}
    // onChange={handleChange}
    // tokenSeparators={[',']}
    
  >
    <option value="apple">Hindi</option>
     <option value="apple">English</option>
     
      
  </Select>
        
      </Form.Item></Col>
      </Row>
    
    <Row gutter={16}>
      <Col span={12}>
       <Form.Item layout="vertical" label="District" name="vertical" rules={[{ required: true }]}>
         <Select
    mode="tags"
    style={{ width: '100%' }}
    // onChange={handleChange}
    // tokenSeparators={[',']}
    
  >
    <option value="apple">Raipur</option>
     <option value="apple">Durg</option>
     
      
  </Select>
        
      </Form.Item>
      </Col>
      <Col span={12}> 
      <Form.Item layout="vertical" label="City" name="vertical2" rules={[{ required: true }]}>
         <Select
    mode="tags"
    style={{ width: '100%' }}
    // onChange={handleChange}
    // tokenSeparators={[',']}
    
  >
    <option value="apple">Assam</option>
     <option value="apple">Chhattisgarh</option>
     <option value="apple">Madhyapradesh</option>
      
  </Select>
      </Form.Item></Col>
      <Col span={12}> <Form.Item label="" name="vertical" rules={[{ required: true }]}>
       
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
export default StudentRegistration;