import React from "react";
import { Card, Row, Col, Button, Typography } from "antd";
import "antd/dist/reset.css";
import { COURSE_TABLE } from "../../constants/Routes";
import { useNavigate } from "react-router-dom";
const { Title, Paragraph } = Typography;

const StudyMode = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(COURSE_TABLE);
  };

  return (
    <div
      style={{
        marginTop: 60,
        padding: "40px",
        background: "#f9f9f9",
        minHeight: "100vh",
      }}
    >
      <Row gutter={[24, 24]} justify="center">
        {/* Study Online Card */}
        <Col xs={24} sm={24} md={12} lg={8}>
          <Card
            hoverable
            style={{
              borderRadius: "16px",
              textAlign: "center",
              boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            }}
          >
            <Title level={3}>Study Online</Title>
            <Paragraph style={{ color: "#666", marginBottom: "30px" }}>
              Prepare anytime, anywhere with our expert-led online courses
            </Paragraph>
            <img
              src="https://www.careerpower.in/images/scroll-banner-1.svg"
              alt="Study Online"
              style={{ width: "80%", marginBottom: "20px" }}
            />
            <Button
              type="primary"
              size="large"
              style={{
                background: "#ff4d4f",
                borderColor: "#ff4d4f",
                borderRadius: "8px",
                padding: "0 24px",
              }}
            >
              Start Online Preparation
            </Button>
          </Card>
        </Col>

        {/* Study Offline Card */}
        <Col xs={24} sm={24} md={12} lg={8}>
          <Card
            hoverable
            style={{
              borderRadius: "16px",
              textAlign: "center",
              boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            }}
          >
            <Title level={3}>Study Offline</Title>
            <Paragraph style={{ color: "#666", marginBottom: "30px" }}>
              Join our physical centers for a classroom learning experience
            </Paragraph>
            <img
              src="https://www.careerpower.in/images/scroll-banner-1.svg"
              alt="Study Online"
              style={{ width: "80%", marginBottom: "20px" }}
            />
            <Button
              type="primary"
              size="large"
              style={{
                background: "#ff4d4f",
                borderColor: "#ff4d4f",
                borderRadius: "8px",
                padding: "0 24px",
              }}
              onClick={() => handleNavigate()}
            >
              Find a Centre Near You
            </Button>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={8}>
          <Card
            hoverable
            style={{
              borderRadius: "16px",
              textAlign: "center",
              boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            }}
          >
            <Title level={3}>Home Tution</Title>
            <Paragraph style={{ color: "#666", marginBottom: "30px" }}>
              Join Us to get benifit of home tutors
            </Paragraph>
            <img
              src="https://www.careerpower.in/images/scroll-banner-1.svg"
              alt="Home Tution"
              style={{ width: "80%", marginBottom: "20px" }}
            />
            <Button
              type="primary"
              size="large"
              style={{
                background: "#ff4d4f",
                borderColor: "#ff4d4f",
                borderRadius: "8px",
                padding: "0 24px",
              }}
            >
              Call us at home
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default StudyMode;
