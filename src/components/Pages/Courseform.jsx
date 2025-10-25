import React, { useState } from 'react';
import { Divider,Card, Form, Input,Row,Col,Select,Button} from 'antd';
import LayoutHome from '../Layouts/LayoutHome';

const Courseform = () => {

  const [courseName,setCourseName] = useState("");
  const [medium,setMedium] = useState("");
  const [courseDuration,setCourseDuration] = useState("");
const [courseFee,setCourseFee]  = useState("")

const handleCourseName =(e)=>{
  // console.log(e.target.value)
setCourseName(e.target.value)
}

const handleMedium =(e)=>{
// console.log(e)
setMedium(e)
}
  return(
  <LayoutHome>
    <Card title={<div style={{fontSize:20}}>Course Details</div>} variant="borderless" style={{textAlign:"center"}}>
     <Form name="layout-multiple-vertical" layout="vertical">
     
 <Row gutter={16}>
      <Col span={12}>
       <Form.Item layout="vertical" label="Course Name" name="courseName" rules={[{ required: true }]}>
        <Input onChange={(e)=>handleCourseName(e)} />
        <div>{courseName}</div>
      </Form.Item>
      </Col>
      <Col span={12}> 
      <Form.Item layout="vertical" label="Medium" name="medium" rules={[{ required: true }]}>
                 <Select
            
            style={{ width: '100%' }}
            onChange={handleMedium}
            // tokenSeparators={[',']}
            
          >
            <option value="H">Hindi</option>
             <option value="E">English</option>
             
              
          </Select>
          <div>{medium}</div>
      </Form.Item></Col>
      
    </Row>

    <Row gutter={16}>
      <Col span={12}>
       <Form.Item layout="vertical" label="Course Duration" name="courseDuration" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      </Col>
      <Col span={12}> 
      <Form.Item layout="vertical" label="Course Fee" name="courseFee" rules={[{ required: true }]}>
        <Input />
      </Form.Item></Col>
      
    </Row>

     <Row gutter={16}>
      <Col span={12}>
       <Form.Item layout="vertical" label="Subject name" name="vertical" rules={[{ required: true }]}>
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
  </LayoutHome>)
}
export default Courseform;