import React, { useState } from "react";
import { UserOutlined, BankOutlined } from "@ant-design/icons";
import { Card, Button, Flex, Form, Input, Row, Col  } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const App = (props) => {
  const [size, setSize] = useState("large"); // default is 'middle'
  const [roleId, setRoleId] = React.useState("1");
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Success:", values);

    props?.handleSpinner(true);
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
          if (response.data.length > 0) {
            sessionStorage.setItem("userId", response.data[0].login_id);
            sessionStorage.setItem("roleId", roleId);
            sessionStorage.setItem("active", "true");

            if (roleId === "1") {
              Swal.fire({
                icon: "success",
                text: "You have successfully Login as Institute",
                showConfirmButton: false,
                timer: 2000,
              }).then((result) => {
                navigate("/institute-dashboard");
              });
            } else if (roleId === "3") {
              Swal.fire({
                icon: "success",
                text: "You have successfully Login as Tutor",
                showConfirmButton: false,
                timer: 2000,
              }).then((result) => {
                navigate("/tutor-dashboard");
              });
            } else {
              Swal.fire({
                icon: "success",
                text: "You have successfully Login as Institute",
                showConfirmButton: false,
                timer: 2000,
              }).then((result) => {
                navigate("/student-dashboard");
              });
            }
          } else {
            Swal.close();
            console.log("error===> Invalid Credentials");
          }
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
                  shape="round"
                  icon={<BankOutlined />}
                  size={size}
                  style={{
                    backgroundColor: roleId === "1" ? "#1890ff" : "",
                    color: roleId === "1" ? "#fff" : "",
                  }}
                  onClick={() => setRoleId("1")}
                >
                  Institute
                </Button>
                <Button
                  shape="round"
                  icon={<UserOutlined />}
                  size={size}
                  onClick={() => setRoleId("3")}
                  style={{
                    backgroundColor: roleId === "3" ? "#1890ff" : "",
                    color: roleId === "3" ? "#fff" : "",
                  }}
                >
                  Tutor
                </Button>
                <Button
                  shape="round"
                  icon={<UserOutlined />}
                  size={size}
                  onClick={() => setRoleId("2")}
                  style={{
                    backgroundColor: roleId === "2" ? "#1890ff" : "",
                    color: roleId === "2" ? "#fff" : "",
                  }}
                >
                  Student
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
                  { required: true, message: "Please input your email!" },
                  { type : "email", message: "Please enter a valid email address"}
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
