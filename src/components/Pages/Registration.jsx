import React from "react";
import { Divider, Card, Form, Input, Row, Col, Select, Button } from "antd";
import LayoutHome from "../Layouts/LayoutHome";
import axios from "axios";
import Swal from "sweetalert2";

const InstituteRegistration = (props) => {
  const [registrationData, setRegistrationData] = React.useState({
    institute_name: "",
    contact: "",
    email: "",
  });
  const [activeRegisterTab, setActiveRegisterTab] = React.useState("1");

  const handleSubmit = () => {
    const currentDateUTC = new Date().toISOString().split("T")[0];
    console.log("registrationData===>", registrationData);
    props?.handleSpinner(true);
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
      creation_date: null,
      entry_date: currentDateUTC,
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
          Swal.fire({
            icon: "success",
            text: "You have successfully registered your institute Please login with  your registered email id and contact number",
            showConfirmButton: true,
            timer: 6000,
          });
        })
        .catch((error) => {
          console.log("error===>", error);
        });
    } else {
      console.log("error===> Please fill all the details");
    }
  };

  const registerHometutor = () => {
    const registerData = {
      name: registrationData.teacher_name,
      contact: registrationData.contact,
      email: registrationData.email,
      entry_date: new Date().toISOString().split("T")[0],
    };
    props?.handleSpinner(true);
    if (registrationData) {
      axios({
        method: "post",
        url: "http://localhost:3004/registerTutor",
        data: registerData,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(function (response) {
          console.log("response===>", response);
          Swal.fire({
            icon: "success",
            text: "You have successfully registered as home tuter Please login with  your registered email id and contact number",
            showConfirmButton: true,
            timer: 6000,
          });
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
      title={
        <div
          style={{
            fontSize: 14,
            fontWeight: "bold",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <div
            onClick={() => setActiveRegisterTab("1")}
            style={{ color: activeRegisterTab === "1" ? "blue" : "gray" }}
          >
            Institute Registration{" "}
          </div>
          |
          <div
            onClick={() => setActiveRegisterTab("3")}
            style={{ color: activeRegisterTab === "3" ? "blue" : "gray" }}
          >
            {" "}
            Register As HomeTutor
          </div>
        </div>
      }
      variant="borderless"
      style={{ textAlign: "center", marginLeft: 20 }}
    >
      <Form name="layout-multiple-vertical" layout="vertical">
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              layout="vertical"
              label={
                activeRegisterTab === "1" ? "Institute Name" : "Teacher Name"
              }
              rules={[{ required: true , }]}
            >
              {activeRegisterTab === "1" ? (
                <Input name={"institute_name"} onChange={handleChange} />
              ) : (
                <Input name={"teacher_name"} onChange={handleChange} />
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              layout="vertical"
              label="Contact Number"
              name="Contact number"
              rules={[
                { required: true, message: "Mobile number is required" },
                 {
                pattern: /^[6-9]\d{9}$/,
                 message: "Enter valid mobile number",
               },
                 ]}
            >
              <Input name="contact" onChange={handleChange}  />
                 {/* <Input maxLength={10} placeholder="Enter mobile number" /> */}

            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              layout="vertical"
              label="Email id"
              rules={[
    { required: true, message: "Email is required" },
    {
      pattern: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
      message: "Please enter a valid Gmail address",
    },
  ]}
            >
              <Input name="email" onChange={handleChange} />
            </Form.Item>
          </Col>
        </Row>

        {activeRegisterTab === "1" ? (
          <Button type="primary" onClick={handleSubmit}>
            Submit
          </Button>
        ) : (
          <Button type="primary" onClick={registerHometutor}>
            Submit
          </Button>
        )}
      </Form>
    </Card>
    // </LayoutHome>
  );
};
export default InstituteRegistration;
