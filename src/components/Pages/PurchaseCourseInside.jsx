import React, { useState } from "react";
import { Divider, Card, Form, Input, Row, Col, Select, Button } from "antd";
import axios from "axios";

import LayoutHome from "../Layouts/LayoutHome";
import Title from "antd/es/typography/Title";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { STUDENTDASHBOARD } from "../../constants/Routes";

const { Option } = Select;

const Courseform = (props) => {
  const navigate = useNavigate();
  const [studentData, setStudentData] = React.useState("");

  React.useEffect(() => {
    getStudentDetails();
  }, []);

  const getStudentDetails = () => {
    const email = sessionStorage.getItem("userId");
    console.log("email===>", email);

    props.handleSpinner(true);
    axios
      .get(`http://localhost:3004/getStudentByEMail/${email}`)
      .then((response) => {
        if (response.data.length > 0) {
          const data = response.data[0];
          setStudentData(data);

          Swal.close();
          // console.log("data===>", districtData, stateData);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the district data!", error);
      });
  };

  const handleFinish = (values) => {
    console.log("Success:", props?.courseId);

    const purchaseData = {
      institute_id: props?.instituteId,
      course_id: props?.courseId,
      student_id: studentData?.student_id,
      purchase_date: new Date().toISOString().split("T")[0],
      fee_paid: props?.courseFee,
      student_name: studentData.student_name,
      email: studentData.email,
      contact: studentData.contact,
      creation_date: new Date().toISOString().split("T")[0],
    };
    props?.handleSpinner(true);
    if (
      purchaseData.student_name &&
      purchaseData.email &&
      purchaseData.contact
    ) {
      axios({
        method: "post",
        url: "http://localhost:3004/purchaseCourseInside",
        data: purchaseData,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(function (response) {
          console.log("response===>", response);
          Swal.fire({
            icon: "success",
            text: "You have successfully purchased the course ",
            showConfirmButton: false,
            timer: 2000,
          }).then((result) => {
            navigate(STUDENTDASHBOARD);
          });
        })
        .catch((error) => {
          console.log("error===>", error);
        });
    } else {
      console.log("error===> Please fill all the details");
    }
  };

  return (
    <>
      <Card variant="borderless" style={{ textAlign: "center" }}>
        <Title
          level={4}
          style={{
            textAlign: "center",
            backgroundColor: "#fc7d15ff",
            padding: "10px",
          }}
        >
          Course Fee Details
        </Title>
        <Row gutter={16}>
          <Col span={8}>
            <Title level={5}>Course Fee</Title>
          </Col>

          <Col span={8}>{props?.courseFee}</Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <Title level={5}> Discount</Title>
          </Col>

          <Col span={8}>{props.discount ? props?.discount : 0}</Col>
        </Row>
        <Divider />
        <Row gutter={16}>
          <Col span={8}>
            <Title level={5}>Pay Amount</Title>
          </Col>

          <Col span={8}>{props?.courseFee}</Col>
        </Row>

        <Button
          type="primary"
          onClick={() => handleFinish()}
          style={{ width: "100%" }}
        >
          PAY NOW
        </Button>
      </Card>
    </>
  );
};
export default Courseform;
