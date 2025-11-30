import React, { useState } from "react";
import { Divider, Card, Form, Input, Row, Col, Select, Button } from "antd";

import LayoutHome from "../Layouts/LayoutHome";
import Title from "antd/es/typography/Title";
const { Option } = Select;

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
            <Col span={24}>
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
            <Col span={24}>
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
            <Col span={24}>
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
            <Col span={24}>
              <Form.Item
                layout="vertical"
                label="Select Class"
                rules={[{ required: true }]}
              >
                <Select>
                  <Option value={"Class 1"}>Class 1</Option>

                  <Option value={"Class 2"}>Class 2</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Divider />
          <Title
            level={4}
            style={{
              textAlign: "center",
              backgroundColor: "#fc7d15ff",
              padding: "10px",
            }}
          >
            Payment Details
          </Title>
          <Row gutter={16}>
            <Col span={8}>
              <Title level={5}>Course Fee</Title>
            </Col>

            <Col span={8}>2000</Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Title level={5}> Discount</Title>
            </Col>

            <Col span={8}>1000</Col>
          </Row>
          <Divider />
          <Row gutter={16}>
            <Col span={8}>
              <Title level={5}>Pay Amount</Title>
            </Col>

            <Col span={8}>1000</Col>
          </Row>

          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            PAY NOW
          </Button>
        </Form>
      </Card>
    </>
  );
};
export default Courseform;
