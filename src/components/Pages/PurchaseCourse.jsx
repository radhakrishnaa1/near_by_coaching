import React, { useState } from "react";
import { Divider, Card, Form, Input, Row, Col, Select, Button } from "antd";
import LayoutHome from "../Layouts/LayoutHome";
import Title from "antd/es/typography/Title";

const Courseform = () => {
  return (
    <>
      <Card
        title={<div style={{ fontSize: 20 }}>Enter Student Details</div>}
        variant="borderless"
        style={{ textAlign: "center" }}
      >
        <Form name="layout-multiple-vertical" layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
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
            <Col span={12}>
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
            <Col span={12}>
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
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                layout="vertical"
                label="Select Class"
                rules={[{ required: true }]}
              >
                <Input name="class" />
              </Form.Item>
            </Col>
          </Row>
          <Divider />
          <Title level={4} style={{ textAlign: "center" }}>
            Payment Details
          </Title>
          <Row gutter={16}>
            <Col span={8}>
              <div>Course Fee</div>
            </Col>

            <Col span={8}>2000</Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <div> Discount</div>
            </Col>

            <Col span={8}>1000</Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <div> Pay Amount</div>
            </Col>

            <Col span={8}>1000</Col>
          </Row>
          <Divider />
          <Button type="primary" htmlType="submit">
            PAY NOW
          </Button>
        </Form>
      </Card>
    </>
  );
};
export default Courseform;
