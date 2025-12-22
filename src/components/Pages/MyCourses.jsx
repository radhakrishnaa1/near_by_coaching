import React, { useState } from "react";
import AuthLayout from "../Layouts/AuthLayout";
import HomeCard from "../Pages/HomeCard";
import { Divider, Avatar, FloatButton, Card } from "antd";
import CourseForm from "./Courseform";
import CourseCard from "./CourseCard";
import CourseDetails from "./CourseDetails";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";

const MyCourses = () => {
  const [size, setSize] = useState("large");
  const [courseList, setCourseList] = useState("large"); // default is 'middle'
  // default is 'middle'

  React.useEffect(() => {
    getCourseList();
  }, []);
  const getCourseList = () => {
    axios({
      method: "get",
      url: `http://localhost:3004/getCourseDetails`,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        setCourseList(response.data);
        console.log("notes data", response.data);
      })
      .catch(() => {});
  };

  
  const courseData = [
    {
      key: 1,
      label: "PCM 12th",
      courseDescription: "This is the Course description",
      board: "CBSE",
      medium: "English",
      duration: "6 months",
      fee: "4000",
      timing: "6 AM",
      mode: "Online",
      active: true,
      status: "",
      maxlimit: 30,
      img: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
    },
    {
      key: 2,
      label: "10th Board",
      courseDescription: "This is the Course description",
      board: "CG Board",
      medium: "English",
      duration: "6 months",
      fee: "4000",
      timing: "6 AM",
      mode: "Offline",
      active: true,
      maxlimit: 45,
      img: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
    },
    {
      key: 3,
      label: "PCM 12th",
      courseDescription: "This is the Course description",
      board: "CBSE",
      medium: "English",
      duration: "6 months",
      fee: "4000",
      timing: "6 AM",
      mode: "Online",
      active: true,
      maxlimit: 60,
      img: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
    },
  ];

  return (
    <AuthLayout>
      <div
        style={{
          paddingTop: 30,
          paddingBottom: 30,
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        {courseData?.map((data, id) => {
          return <CourseCard courseData={data} />;
        })}

        <Card style={{ width: 300, textAlign: "center", paddingTop: 100 }}>
          <Avatar
            style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}
            size={64}
            icon={<PlusOutlined />}
          />
          <p style={{ paddingTop: 20, fontFamily: "poppins" }}>Add Courses</p>
        </Card>
      </div>
      <CourseForm />
      <CourseDetails></CourseDetails>
    </AuthLayout>
  );
};
export default MyCourses;
