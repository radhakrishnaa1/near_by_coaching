import React from "react";
import { Row, Col, Card, Select, Typography, Avatar } from "antd";
import {
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined,
} from "@ant-design/icons";
// import offline from "../../modern-education-Skillstork.jpg";
import CourseCardOuter from "./CourseCardOuter";
import PurchaseCourse from "./PurchaseCourse";
import CourseDetails from "./CourseDetails";
import axios from "axios";
import LayoutHome from "../Layouts/LayoutHome";
import { useParams } from "react-router-dom";
import moment from "moment";
import Swal from "sweetalert2";

const { Title, Text } = Typography;
const { Option } = Select;

const InstituteDetails = (props) => {
  const [instituteDetails, setInstituteDetails] = React.useState({});

  const params = useParams();

  React.useEffect(() => {
    getInstituteDetails();
  }, [params]);
  const getInstituteDetails = () => {
    props.handleSpinner(true);
    axios({
      method: "get",
      url: `http://localhost:3004/getInstituteDetails/${params.id}/0`,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        if (response.data && response.data.length > 0) {
          Swal.close();
          setInstituteDetails(response.data[0]);
        }
      })
      .catch(() => {});
  };
  const offline = "http://localhost:3004/" + instituteDetails?.institute_image;

  return (
    <LayoutHome flagForSlider={false}>
      <div
        style={{
          backgroundColor: "rgb(14 41 64)", // semi-transparent blue overlay
          color: "#fff",
          padding: "30px 40px",
          minHeight: "300px",
          backgroundImage: `url(${offline})`, // background image
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundBlendMode: "overlay", // blends image with blue
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
        }}
      >
        <Row gutter={32} align="middle">
          {/* Left side info */}
          <Col xs={24} md={4} style={{ textAlign: "center" }}>
            <Avatar
              size={120}
              src={
                <img
                  draggable={false}
                  src={require("../../ilogo.png")}
                  alt="avatar"
                />
              }
            />
            <div style={{ paddingTop: 10, fontFamily: "poppins" }}>
              {instituteDetails.vision}
            </div>
          </Col>
          <Col xs={24} md={16}>
            {/* <Text style={{ fontSize: 18 }}>Career Power centre at</Text> */}
            <Title level={1} style={{ color: "#fff", marginTop: 0 }}>
              {instituteDetails.institute_name}
            </Title>

            <p
              style={{
                fontSize: 20,
                marginTop: 10,
                lineHeight: "1.8rem",
                fontFamily: "poppins",
              }}
            >
              {instituteDetails.institute_discription}
            </p>

            <p
              style={{
                fontSize: 16,
                marginTop: 10,
                lineHeight: "1.8rem",
                fontFamily: "poppins",
                color: "#fce304ff",
              }}
            >
              {/* {instituteDetails.creation_date} */}
              Since{" "}
              {moment(instituteDetails.creation_date).format("DD-MM-YYYY")}
            </p>
          </Col>
          <Col xs={24} md={4}>
            <p
              style={{
                fontSize: 16,
                marginTop: 10,
                lineHeight: "1.8rem",
                fontFamily: "poppins",
              }}
            >
              <EnvironmentOutlined /> {instituteDetails.address},{" "}
              {instituteDetails.city} - {instituteDetails.pincode}
            </p>
            <p
              style={{
                fontSize: 16,
                lineHeight: "1.8rem",
                fontFamily: "poppins",
              }}
            >
              <PhoneOutlined /> {instituteDetails.contact}
            </p>
            <p
              style={{
                fontSize: 16,
                lineHeight: "1.8rem",
                fontFamily: "poppins",
              }}
            >
              <MailOutlined /> {instituteDetails.email}
            </p>
          </Col>

          {/* Right side selects */}
        </Row>
      </div>
      <div>
        <CourseCardOuter
          handleSpinner={props.handleSpinner}
          instituteId={instituteDetails?.institute_id}
        />
      </div>
      {/* <div style={{ margin: "auto", width: "95%" }}>
        <Row gutter={16}>
          <Col span={12}>
            <CourseDetails />
          </Col>

          <Col span={12}>
            <PurchaseCourse />
          </Col>
        </Row>
      </div> */}
    </LayoutHome>
  );
};

export default InstituteDetails;
