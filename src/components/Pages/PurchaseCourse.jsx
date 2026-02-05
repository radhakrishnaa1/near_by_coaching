import React, { useState } from "react";
import { Divider, Card, Form, Input, Row, Col, Select, Button } from "antd";
import axios from "axios";

import LayoutHome from "../Layouts/LayoutHome";
import Title from "antd/es/typography/Title";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const Courseform = (props) => {
  const navigate = useNavigate();

  const handleFinish = (values) => {
    console.log("Success:", props?.courseId);

    const purchaseData = {
      institute_id: props?.instituteId,
      course_id: props?.courseId,
      purchase_date: new Date().toISOString().split("T")[0],
      fee_paid: props?.courseFee,
      student_name: values.studentName,
      email: values.emailId,
      contact: values.phoneNumber,
      creation_date: new Date().toISOString().split("T")[0],
    };

    const result = props?.emailData.find(
      ({ login_id }) => login_id === values.emailId
    );

    if (!result) {
      if (values?.studentName && values?.emailId && values?.phoneNumber) {
        props?.handleSpinner(true);
        axios({
          method: "post",
          url: "http://localhost:3004/purchaseCourse",
          data: purchaseData,
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then(function (response) {
            console.log("response===>", response);
            Swal.fire({
              icon: "success",
              text: "You have successfully purchased the course Please Login with your registered email id and phone number",
              showConfirmButton: false,
              timer: 2000,
            }).then((result) => {
              navigate("/");
            });
          })
          .catch((error) => {
            console.log("error===>", error);
          });
      } else {
        // console.log("error===> Please fill all the details");
        Swal.fire({
          icon: "warning",
          text: "Please fill all the details",
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
      {props?.availableSeats > 0 ? (
        <Card
          title={<div style={{ fontSize: 20 }}>Enter Student Details</div>}
          variant="borderless"
          style={{ textAlign: "center" }}
        >
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
                  rules={[{ required: true }]}
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
                  name="emailId"
                  rules={[{ required: true }]}
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
                  rules={[{ required: true }]}
                >
                  <Input name="phoneNumber" />
                </Form.Item>
              </Col>
            </Row>

            <Divider />
            <Title
              level={4}
              style={{
                textAlign: "center",
                backgroundColor: "#fc7d15ff",
                padding: "10px",
              }}
            >
              Payment Details
            </Title>
            <Row gutter={16}>
              <Col span={8}>
                <Title level={5}>Course Fee</Title>
              </Col>

              <Col span={8}>{props?.courseFee}</Col>
            </Row>

            <Divider />
            <Row gutter={16}>
              <Col span={8}>
                <Title level={5}>Pay Amount</Title>
              </Col>

              <Col span={8}>1000</Col>
            </Row>

            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              PAY NOW
            </Button>
          </Form>
        </Card>
      ) : (
        <Card
          title={<div style={{ fontSize: 20 }}>Course Unavailable</div>}
          variant="borderless"
          style={{ textAlign: "center" }}
        >
          <Title level={4} style={{ color: "red" }}>
            Sorry, no seats are available for this course.
          </Title>
        </Card>
      )}
    </>
  );
};
export default Courseform;
