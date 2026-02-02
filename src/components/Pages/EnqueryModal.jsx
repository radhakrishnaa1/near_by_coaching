import React, { useState } from "react";
import { Button, Modal, Input, Form, Col, Row } from "antd";
import axios from "axios";
import Swal from "sweetalert2";
const App = (props) => {
  const handleFinish = (values) => {
    const result = props?.emailData.find(
      ({ login_id }) => login_id === values.email
    );

    console.log(result);
    const postData = {
      name: values.studentName,
      email: values.email,
      contact: values?.phoneNumber,
      password: values.passWord,
      tutor_id: props?.selectedTutor?.teacher_id,
      status: "Enquiry",
      creation_date: new Date().toISOString().split("T")[0],
      noOfStudents: values?.noOfstudents,
    };

    if (!result) {
      if (
        values?.studentName &&
        values?.email &&
        values?.phoneNumber &&
        values?.passWord &&
        values?.noOfstudents
      ) {
        axios({
          method: "post",
          url: `http://localhost:3004/studentEnquery`,
          data: postData,
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then(function (response) {
            Swal.fire({
              icon: "success",
              text: "You have successfully registered ",
              showConfirmButton: true,
              timer: 6000,
            }).then((result) => {
              props?.handleCancel();
            });
          })
          .catch((error) => {
            console.log("error===>", error);
          });
      } else {
        Swal.fire({
          icon: "warning",
          text: "Please fill all the details correctly",
          showConfirmButton: true,
        });
      }
    } else {
      Swal.fire({
        icon: "warning",
        text: "Email Id already registered, Please use another email id",
        showConfirmButton: true,
      });
    }
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
            <Col span={12}>
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
            <Col span={12}>
              <Form.Item
                layout="vertical"
                label=" Number Of students Who study"
                name="noOfstudents"
                rules={[
                  { required: true, message: "Number of students is required" },
                  {
                    pattern: /^[1-9]\d{0}$/,
                    message: "Enter valid  number",
                  },
                ]}
              >
                <Input name="noOfstudent" />
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
