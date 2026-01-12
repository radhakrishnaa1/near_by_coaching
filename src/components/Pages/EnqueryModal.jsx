import React, { useState } from "react";
import { Button, Modal, Input, Form, Col, Row } from "antd";
const App = (props) => {
  const [postData, setPostData] = React.useState("");
  const handleFinish = (values) => {
    console.log(values);
  };
  return (
    <>
      {/* <Button type="primary" onClick={showModal}>
        Open Modal
      </Button> */}
      <Modal
        title="Basic Modal"
        closable={{ "aria-label": "Custom Close Button" }}
        open={props?.isModalOpen}
        onCancel={props?.handleCancel}
        footer={null}
      >
        {" "}
        <Form
          name="layout-multiple-vertical"
          layout="vertical"
          onFinish={handleFinish}
        >
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                layout="vertical"
                label="Student Name"
                name="studentName"
                rules={[
                  { required: true },
                  {
                    pattern: /^[a-zA-Z0-9 ]+$/,
                    message: "Only alphanumeric characters allowed.",
                  },
                ]}
              >
                <Input name="studentName" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                layout="vertical"
                label="Email Id"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your E-mail!",
                  },
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                ]}
              >
                <Input name="emailId" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                layout="vertical"
                label="Enter Phone Number"
                name="phoneNumber"
                rules={[
                  { required: true, message: "Mobile number is required" },
                  {
                    pattern: /^[6-9]\d{9}$/,
                    message: "Enter valid mobile number",
                  },
                ]}
              >
                <Input name="phoneNumber" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                layout="vertical"
                label="Password"
                name="passWord"
                rules={[{ required: true }]}
              >
                <Input name="password" />
              </Form.Item>
            </Col>
          </Row>

          <div style={{ display: "flex", justifyContent: "space-around" }}>
            {" "}
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button type="primary" danger onClick={props?.handleCancel}>
              Cancel
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
};
export default App;
