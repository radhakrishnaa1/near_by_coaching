import React, { useState } from "react";
import { UserOutlined, BankOutlined } from "@ant-design/icons";
import { Card, Button, Flex, Form, Input, Row, Col } from "antd";

const App = () => {
  const [size, setSize] = useState("large"); // default is 'middle'

  const onFinish = (values) => {
    console.log("Success:", values);
    setSize(1);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Card
        title={
          <div style={{ fontSize: 20, textAlign: "center" }}>
            <div>Login Form</div>
            {/* <Flex gap="small" wrap>
              <Button
                type="primary"
                shape="round"
                icon={<UserOutlined />}
                size={size}
              ></Button>
              <Button
                type="primary"
                shape="round"
                icon={<BankOutlined />}
                size={size}
              ></Button>
            </Flex> */}
          </div>
        }
        variant="borderless"
        style={{ width: "100%", textAlign: "center" }}
      >
        <Form
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Row gutter={16} style={{ marginTop: 20 }}>
            <Col span={24}>
              <Flex gap="small" justify="space-around" wrap>
                <Button
                  type="primary"
                  shape="round"
                  icon={<UserOutlined />}
                  size={size}
                >
                  Student
                </Button>
                <Button
                  type="primary"
                  shape="round"
                  icon={<BankOutlined />}
                  size={size}
                >
                  Institute
                </Button>
              </Flex>
            </Col>
          </Row>
          <Row gutter={16} style={{ marginTop: 30 }}>
            <Col span={24}>
              <Form.Item
                label="Username"
                name="username"
                layout="vertical"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Password"
                name="password"
                layout="vertical"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password />
              </Form.Item>
            </Col>
          </Row>

          <Button
            type="primary"
            htmlType="submit"
            style={{ alignItems: "center" }}
          >
            Login
          </Button>
        </Form>
      </Card>
    </>
  );
};
export default App;
