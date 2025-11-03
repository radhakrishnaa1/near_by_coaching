import React from "react";
import { Row, Col, Card, Select, Typography } from "antd";
import {
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { Option } = Select;

const BranchInfo = () => {
  return (
    <div
      style={{
        backgroundColor: "#2B74B3",
        color: "#fff",
        padding: "40px 60px",
        minHeight: "300px",
      }}
    >
      <Row gutter={32} align="middle">
        {/* Left side info */}
        <Col xs={24} md={12}>
          <Text style={{ fontSize: 18 }}>Career Power centre at</Text>
          <Title level={2} style={{ color: "#fff", marginTop: 0 }}>
            Laxmi Nagar
          </Title>

          <p style={{ fontSize: 16, marginTop: 10 }}>
            <EnvironmentOutlined />{" "}
            Career Power Laxmi Nagar B/37, Gurunanak Pura, Laxmi Nagar Near ICICI
            Bank, Nirman Vihar Metro Station, Delhi - 110092
          </p>
          <p style={{ fontSize: 16 }}>
            <PhoneOutlined /> 8750505082, 8750606007
          </p>
          <p style={{ fontSize: 16 }}>
            <MailOutlined /> Ln@careerpower.in
          </p>
        </Col>

        {/* Right side selects */}
        <Col xs={24} md={12}>
          <Card
            style={{
              borderRadius: 10,
              width: "100%",
            }}
          >
            <div style={{ marginBottom: 16 }}>
              <Text strong>Course</Text>
              <Select
                defaultValue="PCM"
                style={{ width: "100%", marginTop: 8 }}
              >
                <Option value="PCM">PCM</Option>
                <Option value="PCB">PCB</Option>
                <Option value="Commerse">Commerce</Option>
              </Select>
            </div>
            <div style={{ marginBottom: 16 }}>
              <Text strong>Select City</Text>
              <Select
                defaultValue="Delhi"
                style={{ width: "100%", marginTop: 8 }}
              >
                <Option value="Delhi">Delhi</Option>
                <Option value="Mumbai">Mumbai</Option>
                <Option value="Lucknow">Lucknow</Option>
              </Select>
            </div>

            <div>
              <Text strong>Select Branch</Text>
              <Select
                defaultValue="Laxmi Nagar"
                style={{ width: "100%", marginTop: 8 }}
              >
                <Option value="Laxmi Nagar">Laxmi Nagar</Option>
                <Option value="Dwarka">Dwarka</Option>
                <Option value="Noida">Noida</Option>
              </Select>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default BranchInfo;
