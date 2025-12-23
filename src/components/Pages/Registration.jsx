import React from "react";
import { Divider, Card, Form, Input, Row, Col, Select, Button } from "antd";
import LayoutHome from "../Layouts/LayoutHome";
import axios from "axios";

const InstituteRegistration = () => {
  const [registrationData, setRegistrationData] = React.useState({
    institute_name: "",
    contact: "",
    email: "",
  });

  const handleSubmit = () => {
    const currentDateUTC = new Date().toISOString().split("T")[0];

    const registerData = {
      institute_id: 7,
      institute_name: registrationData.institute_name,
      institute_discription: null,
      institute_logo: null,
      email: registrationData.email,
      contact: registrationData.contact,
      address: null,
      state: null,
      city: null,
      pincode: null,
      vision: null,
      creation_date: currentDateUTC,
    };

    if (registrationData) {
      axios({
        method: "post",
        url: "http://localhost:3004/registerInstitute",
        data: registerData,
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
  const handleChange = (e) => {
    setRegistrationData({
      ...registrationData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Card
      title={<div style={{ fontSize: 20 }}>Institute Registration</div>}
      variant="borderless"
      style={{ textAlign: "center", marginLeft: 20 }}
    >
      <Form name="layout-multiple-vertical" layout="vertical">
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              layout="vertical"
              label="Institute Name"
              rules={[{ required: true }]}
            >
              <Input name="institute_name" onChange={handleChange} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              layout="vertical"
              label="Contact Number"
              name="vertical2"
              rules={[{ required: true }]}
            >
              <Input name="contact" onChange={handleChange} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              layout="vertical"
              label="Email id"
              rules={[{ required: true }]}
            >
              <Input name="email" onChange={handleChange} />
            </Form.Item>
          </Col>
        </Row>

        <Button type="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </Card>
    // </LayoutHome>
  );
};
export default InstituteRegistration;
