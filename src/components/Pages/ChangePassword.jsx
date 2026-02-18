import React, { useState } from "react";
import { Divider, Card, Form, Input, Row, Col, Select, Button } from "antd";
import LayoutHome from "../Layouts/LayoutHome";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../Layouts/AuthLayout";
import Title from "antd/es/typography/Title";
import Password from "antd/es/input/Password";

const ChangePassword = (props) => {
  const [passward, setpassword] = useState("");
    const [Error, setError] = useState("");
      const [value, setvalue] = useState("");

      

  const navigate = useNavigate();

  const handleSubmit = () => {
    const email = sessionStorage.getItem("userId");
    console.log(passward);

    if (passward.newpassword === passward.confirmpassword) {
      props?.handleSpinner(true);
      axios({
        method: "post",
        url: `http://localhost:3004/updatePassword/${email}`,
        data: passward,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(function (response) {
          console.log("response===>", response);
          Swal.fire({
            icon: "success",
            text: "You have successfully updated your Password",
            showConfirmButton: true,
            timer: 6000,
          }).then((result) => {
            window.location.reload();
          });
        })
        .catch((error) => {
          console.log("error===>", error);
        });
    } else {
      Swal.fire({
        icon: "error",
        text: "Confirm Password Missmatch",
        showConfirmButton: true,

        timer: 2000,
      });
    }
  };
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
  const handleChange = (e) => {
    console.log(e.target.name);
    setpassword({ ...passward, [e.target.name]: e.target.value });
    if (!passwordRegex.test(value)) {
      setError(
        "Password must be 8+ characters with uppercase, lowercase, number & special character."
      );
    } else {
      setError("");
    }
  
  };

  return (
    <AuthLayout>
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
            Change Your Password
          </div>
        }
        variant="borderless"
        style={{ textAlign: "center", marginLeft: 20 }}
      >
        <Form name="layout-multiple-vertical" layout="vertical">
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item layout="vertical" label={"New Password"}
             rules={[
  { required: true, message: "Password is required" },
  {
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
    message:
      "Password must contain minimum 8 characters, including uppercase, lowercase, number and special character",
  },
]}
>
                 
 
                <Input name={"newpassword"} onChange={handleChange} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item layout="vertical" label={"Confirm Password"}
              rules={[
  { required: true, message: "Password is required" },
  {
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
    message:
      "Password must contain minimum 8 characters, including uppercase, lowercase, number and special character",
  },
]}

                >
                
 
                <Input name={"confirmpassword"} onChange={handleChange} />
              </Form.Item>
            </Col>
          </Row>
          <Button type="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Form>
      </Card>

      <Title
        level={3}
        style={{ margin: 10, color: "red", textAlign: "center" }}
      >
        Password Policy
      </Title>
      <div style={{ margin: 10, color: "blue", textAlign: "center" }}>1. Password must be at least 8 characters long.</div>
          <div style={{ margin: 10, color: "blue", textAlign: "center" }}> 2. Must include uppercase, lowercase, number, and special character.</div>
          <div style={{ margin: 10, color: "blue", textAlign: "center" }}> 3. Should not contain username, email, or common passwords.</div>
           
    </AuthLayout>
  );
};
export default ChangePassword;
