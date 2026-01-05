import React, { useState } from "react";
import {
  Divider,
  Card,
  Form,
  Input,
  Row,
  Col,
  Select,
  Button,
  DatePicker,
  Space,
} from "antd";
import axios from "axios";

import LayoutHome from "../Layouts/LayoutHome";
// import dayjs from "dayjs";
const Courseform = (props) => {
  const [courseData, setCourseData] = useState({
    course_name: "",
    course_duraton: "",
    course_fee: "",
    status: "upcoming",
    mode: "",
    timing: "",
    course_medium: "",
    start_date: "",
    end_date: "",
    discount: "0",
    creation_date: new Date().toISOString().split("T")[0],
    course_details: "",
    max_student: "",
  });

  const handleMedium = (e) => {
    setCourseData({
      ...courseData,
      course_medium: e,
    });
  };
  const handlemode = (e) => {
    setCourseData({
      ...courseData,
      mode: e,
    });
  };

  const dateFormatList = "YYYY-MM-DD";

  const handleChange = (e) => {
    setCourseData({
      ...courseData,
      [e.target.name]: e.target.value,
    });
  };
  const handleDateChange = (date, dateString, name) => {
    setCourseData({
      ...courseData,
      [name]: dateString,
    });
  };
  const handleSubmit = () => {
    // console.log("course data", courseData);
    // const currentDateUTC = new Date().toISOString().split("T")[0];

    if (courseData) {
      axios({
        method: "post",
        url: "http://localhost:3004/saveCourseData",
        data: courseData,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(function (response) {
          console.log("response===>", response);
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
      <Card
        title={<div style={{ fontSize: 20 }}>Course Detail Form</div>}
        variant="borderless"
        style={{ textAlign: "center" }}
      >
        <Form name="layout-multiple-vertical" layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                layout="vertical"
                label="Course Name"
                name="courseName"
                rules={[{ required: true }]}
              >
                <Input onChange={(e) => handleChange(e)} name="course_name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                layout="vertical"
                label="Medium"
                name="medium"
                rules={[{ required: true }]}
              >
                <Select
                  style={{ width: "100%" }}
                  onChange={handleMedium}
                  name="course_medium"
                >
                  <option value="1">Hindi</option>
                  <option value="2">English</option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                layout="vertical"
                label="Course Duration"
                name="courseDuration"
                rules={[{ required: true }]}
              >
                <Input
                  name="course_duraton"
                  onChange={(e) => handleChange(e)}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                layout="vertical"
                label="Course Fee"
                name="courseFee"
                rules={[{ required: true }]}
              >
                <Input name="course_fee" onChange={(e) => handleChange(e)} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                layout="vertical"
                label="Course Discription"
                rules={[{ required: true }]}
              >
                <Input
                  name="course_details"
                  onChange={(e) => handleChange(e)}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                layout="vertical"
                label="MaxLimit"
                rules={[{ required: true }]}
              >
                <Input name="max_student" onChange={(e) => handleChange(e)} />
              </Form.Item>
            </Col>
          </Row>
          {/* <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                layout="vertical"
                label="Subject name"
                rules={[{ required: true }]}
              >
                <Input name="subject" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                layout="vertical"
                label="Upload File"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row> */}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                layout="vertical"
                label="Mode Of Class"
                rules={[{ required: true }]}
              >
                <Select
                  style={{ width: "100%" }}
                  onChange={handlemode}
                  name="course_medium"
                >
                  <option value="1">Online</option>
                  <option value="2">Offline</option>
                  <option value="3">At Your Door</option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                layout="vertical"
                label="Timing"
                rules={[{ required: true }]}
              >
                <Input name="timing" onChange={(e) => handleChange(e)} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                layout="vertical"
                label="Start Date"
                rules={[{ required: true }]}
              >
                <DatePicker
                  // defaultValue={dayjs("01/01/2015", dateFormatList)}
                  format={dateFormatList}
                  name="start_date"
                  onChange={(date, dateString) =>
                    handleDateChange(date, dateString, "start_date")
                  }
                />
                {/* <Input  /> */}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                layout="vertical"
                label="End Date"
                rules={[{ required: true }]}
              >
                <DatePicker
                  // defaultValue={dayjs("01/01/2015", dateFormatList)}
                  format={dateFormatList}
                  name="end_date"
                  onChange={(date, dateString) =>
                    handleDateChange(date, dateString, "end_date")
                  }
                />
              </Form.Item>
            </Col>
          </Row>

          <Divider />
          <Button
            type="primary"
            onClick={() => handleSubmit()}
            style={{ marginRight: 20 }}
          >
            Submit
          </Button>
          <Button type="primary" onClick={() => props?.cancel()}>
            Cancel
          </Button>
        </Form>
      </Card>
    </>
  );
};
export default Courseform;
