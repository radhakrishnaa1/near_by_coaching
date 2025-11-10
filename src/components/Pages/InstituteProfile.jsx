import React, { useRef, useState } from "react";
import {
  Card,
  Typography,
  Form,
  Input,
  DatePicker,
  Button,
  Row,
  Col,
  Space,
} from "antd";
import ImageUpload from "./ImageUpload";
const { Title, Text } = Typography;
const { TextArea } = Input;

const InstituteProfile = () => {
  const [form] = Form.useForm();

  // 🧠 State to store form values
  const [letterData, setLetterData] = useState({
    name: "",
    qualification: "",
    address: "",
    number: "",
    contactNumber: "",
    emailId: "",
  });

  // Handle form submission
  const handleFinish = (values) => {
    setLetterData({
      ...values,
    });
  };

  return (
    <>
      <Title level={5} style={{ textAlign: "center" }}>
        Add Faculty Details
      </Title>

      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <ImageUpload />
        </div>
        <Form.Item
          label="Name of Institute"
          name="name"
          rules={[{ required: true }]}
        >
          <Input placeholder="Enter Institute name" />
        </Form.Item>

        <Form.Item
          label="Contact number"
          name="contactNumber"
          rules={[{ required: true }]}
        >
          <Input placeholder="Enter your number" />
        </Form.Item>
        <Form.Item label="Email ID" name="emailId" rules={[{ required: true }]}>
          <Input placeholder="Enter your Emial Id" />
        </Form.Item>
        <Form.Item
          label="Institute Objective (Slogun)"
          name="objective"
          rules={[{ required: true }]}
        >
          <Input placeholder="Enter Learning" />
        </Form.Item>

        <Form.Item
          label="Institute Details"
          name="instituteDetails"
          rules={[{ required: true }]}
        >
          <TextArea rows={6} placeholder="Enter Institute Details" />
        </Form.Item>
        <Form.Item
          label="Institute Address"
          name="instituteAddress"
          rules={[{ required: true }]}
        >
          <TextArea rows={6} placeholder="Enter Institute Address" />
        </Form.Item>

        <Space style={{ width: "100%", justifyContent: "space-between" }}>
          <Button
            type="primary"
            htmlType="submit"
            onClick={console.log("Letter Data:", letterData)}
          >
            Preview Letter
          </Button>
          <Button type="default">Print Letter</Button>
        </Space>
      </Form>
    </>
  );
};

export default InstituteProfile;
