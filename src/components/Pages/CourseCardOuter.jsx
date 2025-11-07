import React from "react";
import { Row, Col, Card, Typography, Select, Button } from "antd";
import { HeartOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;
const { Option } = Select;

const courses = [
  {
    id: 1,
    title:
      "Bihar B.Ed. 4-year Integrated Course 2025 Common Entrance Exam (CET-BED)",
    language: "Hinglish",
    type: "Video Course",
    videos: "219 Videos",
    price: "₹3996",
    offer: "Offers Available",
    image: "https://via.placeholder.com/300x180?text=Bihar+B.Ed.", // replace with real image
  },
  {
    id: 2,
    title: "अयाची - Ayachi All Bihar State Govt Exams | Complete Course",
    language: "Hinglish",
    type: "Video Course",
    videos: "289 Videos",
    price: "₹1996",
    offer: "Offers Available",
    image: "https://via.placeholder.com/300x180?text=Ayachi+Bihar+Govt",
  },
  {
    id: 3,
    title: "All-in-One Computer Knowledge | Video Course",
    language: "Hinglish",
    type: "Video Course",
    videos: "29 Videos",
    price: "₹1596",
    offer: "Offers Available",
    image: "https://via.placeholder.com/300x180?text=Computer+Knowledge",
  },
  {
    id: 4,
    title: "Spoken English Booster: Speak English Confidently",
    language: "Hinglish",
    type: "Video Course",
    videos: "52 Videos | 10 E-books",
    price: "₹2996",
    offer: "Offers Available",
    image: "https://via.placeholder.com/300x180?text=Spoken+English+Booster",
  },
];

const Courses = () => {
  return (
    <div style={{ padding: "40px" }}>
      <Row justify="space-between" align="middle" style={{ marginBottom: 20 }}>
        <Title level={3}>Videos For Banking, SSC And Others Govt Jobs</Title>
        <Select defaultValue="Relevance" style={{ width: 150 }}>
          <Option value="Relevance">Relevance</Option>
          <Option value="PriceLow">Price: Low to High</Option>
          <Option value="PriceHigh">Price: High to Low</Option>
        </Select>
      </Row>

      <Row gutter={[24, 24]}>
        {courses.map((course) => (
          <Col xs={24} sm={12} md={12} lg={6} key={course.id}>
            <Card
              hoverable
              cover={
                <img
                  alt={course.title}
                  src={course.image}
                  style={{
                    height: 180,
                    objectFit: "cover",
                    borderRadius: "8px 8px 0 0",
                  }}
                />
              }
              actions={[<HeartOutlined key="like" />]}
            >
              <div style={{ marginBottom: 8 }}>
                <Text type="secondary">{course.language}</Text>
                <Text style={{ marginLeft: 10 }} type="secondary">
                  {course.type}
                </Text>
              </div>
              <Title level={5} ellipsis={{ rows: 2 }}>
                {course.title}
              </Title>
              <Text type="secondary">{course.videos}</Text>
              <div style={{ marginTop: 10 }}>
                <Title level={4} style={{ margin: 0 }}>
                  {course.price}
                </Title>
                <Text type="success">{course.offer}</Text>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Courses;
