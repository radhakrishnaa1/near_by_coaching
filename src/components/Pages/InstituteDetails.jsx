import React from "react";
import { Row, Col, Card, Select, Typography, Avatar } from "antd";
import {
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined,
} from "@ant-design/icons";
import offline from "../../modern-education-Skillstork.jpg";
import CourseCardOuter from "./CourseCardOuter";
import PurchaseCourse from "./PurchaseCourse";
import CourseDetails from "./CourseDetails";
const { Title, Text } = Typography;
const { Option } = Select;

const BranchInfo = () => {
  const url = offline;
  return (
    <>
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
        borderTopLeftRadius:50,
        borderTopRightRadius:50
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
            Making Learning better
          </div>
        </Col>
        <Col xs={24} md={16}>
          {/* <Text style={{ fontSize: 18 }}>Career Power centre at</Text> */}
          <Title level={1} style={{ color: "#fff", marginTop: 0 }}>
            Ansh Classes
          </Title>

          <p style={{ fontSize: 20, marginTop: 10,lineHeight:"1.8rem",fontFamily:"poppins" }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
        </Col>
        <Col xs={24} md={4}>
          <p style={{ fontSize: 16, marginTop: 10,lineHeight:"1.8rem",fontFamily:"poppins" }}>
            <EnvironmentOutlined /> Career Power Laxmi Nagar B/37, Gurunanak
            Pura, Laxmi Nagar Near ICICI Bank, Nirman Vihar Metro Station, Delhi
            - 110092
          </p>
          <p style={{ fontSize: 16,lineHeight:"1.8rem",fontFamily:"poppins" }}>
            <PhoneOutlined /> 8750505082, 8750606007
          </p>
          <p style={{ fontSize: 16,lineHeight:"1.8rem",fontFamily:"poppins" }}>
            <MailOutlined /> Ln@careerpower.in
          </p>
        </Col>

          {/* Right side selects */}
        </Row>
      </div>
      <div>
        <CourseCardOuter />
      </div>
      <Row gutter={16}>
        <Col span={12}>
          <CourseDetails />
        </Col>

        <Col span={12}>
          <PurchaseCourse />
        </Col>
      </Row>
    </>
  );
};

export default BranchInfo;
