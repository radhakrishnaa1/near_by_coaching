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
import dayjs from "dayjs";
import LayoutHome from "../Layouts/LayoutHome";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { INSTITUTE_DASHBOARD } from "../../constants/Routes";
// import dayjs from "dayjs";
const EditCourseData = (props) => {
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
  const navigator = useNavigate();
  React.useEffect(() => {
    if (props?.viewCourseDetails) {
      setInitialState(props?.viewCourseDetails);
    }
  }, [props?.viewCourseDetails]);

  const setInitialState = (data) => {
    setCourseData({
      course_id: data?.courseid,
      course_name: data?.course_name,
      course_duraton: data?.course_duraton,
      course_fee: data?.course_fee,
      status: data?.status,
      mode: data?.mode,
      timing: data?.timing,
      course_medium: data?.course_medium,
      start_date: data?.start_date,
      end_date: data?.end_date,
      discount: data?.discount,
      creation_date: data?.creation_date,
      course_details: data?.course_details,
      max_student: data?.max_student,
    });
  };
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
    console.log("course data", courseData);
    // const currentDateUTC = new Date().toISOString().split("T")[0];

    if (courseData) {
      axios({
        method: "post",
        url: `http://localhost:3004/updateCourseData/${courseData?.course_id}`,
        data: courseData,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(function (response) {
          if (response) {
            Swal.fire({
              icon: "success",
              title: "Course Data Updated Successfully",
              showConfirmButton: false,
              timer: 1500,
            }).then(() => {
              navigator(INSTITUTE_DASHBOARD);
            });
          }
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
              <Form.Item layout="vertical" label="Course Name">
                <Input
                  onChange={(e) => handleChange(e)}
                  name="course_name"
                  value={courseData?.course_name}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item layout="vertical" label="Medium">
                <Select
                  style={{ width: "100%" }}
                  onChange={handleMedium}
                  name="course_medium"
                  value={courseData?.course_medium}
                >
                  <option value="Hindi">Hindi</option>
                  <option value="English">English</option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item layout="vertical" label="Course Duration">
                <Input
                  name="course_duraton"
                  value={courseData?.course_duraton}
                  onChange={(e) => handleChange(e)}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item layout="vertical" label="Course Fee">
                <Input
                  value={courseData?.course_fee}
                  name="course_fee"
                  onChange={(e) => handleChange(e)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item layout="vertical">
                <Input
                  name="course_details"
                  value={courseData?.course_details}
                  onChange={(e) => handleChange(e)}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item layout="vertical" label="MaxLimit">
                <Input
                  value={courseData?.max_student}
                  name="max_student"
                  onChange={(e) => handleChange(e)}
                />
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
                  value={courseData?.mode}
                >
                  <option value="Online">Online</option>
                  <option value="Offline">Offline</option>
                  <option value="At_Your_Door">At Your Door</option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                layout="vertical"
                label="Timing"
                rules={[{ required: true }]}
              >
                <Input
                  value={courseData?.timing}
                  name="timing"
                  onChange={(e) => handleChange(e)}
                />
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
                  //   defaultValue={dayjs(courseData?.start_date, dateFormatList)}
                  value={dayjs(courseData?.start_date, dateFormatList)}
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
                  value={dayjs(courseData?.end_date, dateFormatList)}
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
export default EditCourseData;
