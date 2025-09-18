import React, { useState } from 'react';
import {UserOutlined,BankOutlined} from '@ant-design/icons';
import {Card, Button, Flex,Form ,Input} from 'antd';

const App = () => {
  const [size, setSize] = useState('large'); // default is 'middle'


const onFinish = values => {
  console.log('Success:', values);
  setSize(1)
};
const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
};

  return (
    <>
      <Card title={<div style={{display:"flex",justifyContent:"space-between"}}>
        <div>Login Form</div>
                <Flex gap="small" wrap>
          <Button type="primary" shape="round" icon={<UserOutlined />} size={size}>
            Student Login
          </Button>
          <Button type="primary" shape="round" icon={<BankOutlined />} size={size}>
            Institute Login
          </Button>
        </Flex>
        </div>} variant="borderless" style={{ width: "100%" }}>
        


         <Form
    name="basic"
    layout="horizontal"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="Username"
      name="username"
      layout="vertical"
      rules={[{ required: true, message: 'Please input your username!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      layout="vertical"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password />
    </Form.Item>

   

    <Form.Item label={null}>
      <Button type="primary" htmlType="submit">
        Login
      </Button>
    </Form.Item>
  </Form>
  </Card>
      
    </>
  );
};
export default App;