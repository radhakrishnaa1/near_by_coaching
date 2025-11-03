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
  <>
    <Card title={<div style={{fontSize:20}}>Course Detail Form</div>} variant="borderless" style={{textAlign:"center"}}>
     <Form name="layout-multiple-vertical" layout="vertical">
     
 <Row gutter={16}>
      <Col span={8}>
       <Form.Item layout="vertical" label="Course Name" name="courseName" rules={[{ required: false }]}>
        
        <div style={{textAlign:"left",color:"blue"}}>{"PCM 12th"}</div>
      </Form.Item>
      </Col>
      <Col span={8}> 
      <Form.Item layout="vertical" label="Medium" name="medium" rules={[{ required: false }]}>
                 
          <div style={{textAlign:"left",color:"blue"}}>{"online"}</div>
      </Form.Item></Col>
      <Col span={8}>
       <Form.Item layout="vertical" label="Course Duration" name="courseDuration" rules={[{ required: false }]}>
          <div style={{textAlign:"left",color:"blue"}}>{"online"}</div>
       
      </Form.Item>
      </Col>
    </Row>

    <Row gutter={16}>
      
      <Col span={8}> 
      <Form.Item layout="vertical" label="Course Fee" name="courseFee" rules={[{ required: false }]}>
                  <div style={{textAlign:"left",color:"blue"}}>{"online"}</div>

      </Form.Item></Col>
      

      <Col span={8}>
       <Form.Item layout="vertical" label="Course Discription" name="vertical" rules={[{ required: false }]}>
                <div style={{textAlign:"left",color:"blue"}}>{"online"}</div>

      </Form.Item>
      </Col>
      <Col span={8}> 
      <Form.Item layout="vertical" label="MaxLimit" name="vertical2" rules={[{ required: false }]}>
                  <div style={{textAlign:"left",color:"blue"}}>{"online"}</div>

      </Form.Item></Col>
      
    </Row>
     <Row gutter={16}>
      <Col span={8}>
       <Form.Item layout="vertical" label="Subject name" name="vertical" rules={[{ required: false }]}>
                 <div style={{textAlign:"left",color:"blue"}}>{"online"}</div>

      </Form.Item>
      </Col>
      <Col span={8}> 
      <Form.Item layout="vertical" label="Upload File" name="vertical2" rules={[{ required: false }]}>
                  <div style={{textAlign:"left",color:"blue"}}>{"online"}</div>

      </Form.Item></Col>
      <Col span={8}>
       <Form.Item layout="vertical" label="Mode Of Class" name="vertical" rules={[{ required: false }]}>
                <div style={{textAlign:"left",color:"blue"}}>{"online"}</div>

      </Form.Item>
      </Col>
    </Row>
 <Row gutter={16}>
      
      <Col span={8}> 
      <Form.Item layout="vertical" label="Timing" name="vertical2" rules={[{ required: false }]}>
                 <div style={{textAlign:"left",color:"blue"}}>{"online"}</div>

      </Form.Item></Col>
      
    </Row>
     <Divider />
    
  
</Form>
    </Card>
  </>)
}
export default Courseform;