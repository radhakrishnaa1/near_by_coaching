import React, { useState } from "react";
import { UserOutlined, BankOutlined } from "@ant-design/icons";
import { Card, Button, Flex, Form, Input, Row, Col } from "antd";
import axios from "axios";

const App = () => {
  const [size, setSize] = useState("large"); // default is 'middle'
  const [roleId, setRoleId] = React.useState(1);

  const onFinish = (values) => {
    console.log("Success:", values);
    // const logindata = {
    //   login_id: values.login_id,
    //   password: values.password,
    //   roll_id: roleId,
    //   logindate: new Date().toISOString().split("T")[0],
    // };
    setSize(1);

    if (values) {
      axios({
        method: "get",
        url: `http://localhost:3004/userlogin/${values.login_id}/${values.password}/${roleId}`,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(function (response) {
          console.log("response===>", response);
        })
        .catch((error) => {
          console.log("error===>", error);
        });
    } else {
      console.log("error===> Please fill all the details");
    }
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
                  onClick={() => setRoleId(2)}
                >
                  Student
                </Button>
                <Button
                  type="primary"
                  shape="round"
                  icon={<BankOutlined />}
                  size={size}
                  onClick={() => setRoleId(1)}
                >
                  Institute
                </Button>
              </Flex>
            </Col>
          </Row>
          <Row gutter={16} style={{ marginTop: 30 }}>
            <Col span={24}>
              <Form.Item
                label="Email Id"
                name="login_id"
                layout="vertical"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input name="login_id" />
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
                <Input.Password name="password" />
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
