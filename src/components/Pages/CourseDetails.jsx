import React, { useState } from "react";
import { Divider, Card, Form, Input, Row, Col, Select, Button } from "antd";
import LayoutHome from "../Layouts/LayoutHome";

const Courseform = (props) => {
  const [courseName, setCourseName] = useState("");
  const [medium, setMedium] = useState("");
  const [courseDuration, setCourseDuration] = useState("");
  const [courseFee, setCourseFee] = useState("");

  const handleCourseName = (e) => {
    // console.log(e.target.value)
    setCourseName(e.target.value);
  };

  const handleMedium = (e) => {
    // console.log(e)
    setMedium(e);
  };

  return (
    <>
      <Card
        title={<div style={{ fontSize: 20 }}>Course Detail Form</div>}
        variant="borderless"
        style={{ textAlign: "center" }}
      >
        <Form name="layout-multiple-vertical" layout="vertical">
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                layout="vertical"
                label="Course Name"
                name="courseName"
                rules={[{ required: false }]}
              >
                <div style={{ textAlign: "left", color: "blue" }}>
                  {props?.viewCourseDetails?.course_name}
                </div>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                layout="vertical"
                label="Medium"
                name="medium"
                rules={[{ required: false }]}
              >
                <div style={{ textAlign: "left", color: "blue" }}>
                  {props?.viewCourseDetails?.mode}
                </div>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                layout="vertical"
                label="Course Duration"
                name="courseDuration"
                rules={[{ required: false }]}
              >
                <div style={{ textAlign: "left", color: "blue" }}>
                  {props?.viewCourseDetails?.course_duraton}
                </div>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                layout="vertical"
                label="Course Fee"
                name="courseFee"
                rules={[{ required: false }]}
              >
                <div style={{ textAlign: "left", color: "blue" }}>
                  {props?.viewCourseDetails?.course_fee}
                </div>
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                layout="vertical"
                label="Course Discription"
                rules={[{ required: false }]}
              >
                <div style={{ textAlign: "left", color: "blue" }}>
                  {props?.viewCourseDetails?.course_details}
                </div>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                layout="vertical"
                label="MaxLimit"
                rules={[{ required: false }]}
              >
                <div style={{ textAlign: "left", color: "blue" }}>
                  {props?.viewCourseDetails?.max_student}
                </div>
              </Form.Item>
            </Col>
          </Row>
          {/* <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                layout="vertical"
                label="Subject name"
                rules={[{ required: false }]}
              >
                <div style={{ textAlign: "left", color: "blue" }}>
                  {props?.viewCourseDetails?.max_student}
                </div>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                layout="vertical"
                label="Upload File"
                rules={[{ required: false }]}
              >
                <div style={{ textAlign: "left", color: "blue" }}>
                  {props?.viewCourseDetails?.max_student}
                </div>
              </Form.Item>
            </Col>
          </Row> */}
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                layout="vertical"
                label="Mode Of Class"
                rules={[{ required: false }]}
              >
                <div style={{ textAlign: "left", color: "blue" }}>
                  {props?.viewCourseDetails?.max_student}
                </div>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                layout="vertical"
                label="Timing"
                rules={[{ required: false }]}
              >
                <div style={{ textAlign: "left", color: "blue" }}>
                  {props?.viewCourseDetails?.timing}
                </div>
              </Form.Item>
            </Col>
          </Row>
          <Divider />
        </Form>
      </Card>
    </>
  );
};
export default Courseform;
