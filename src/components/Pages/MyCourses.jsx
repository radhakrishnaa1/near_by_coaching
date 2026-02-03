import React, { useState } from "react";
import AuthLayout from "../Layouts/AuthLayout";
import HomeCard from "../Pages/HomeCard";
import { Divider, Avatar, FloatButton, Card } from "antd";
import CourseForm from "./Courseform";
import CourseCard from "./CourseCard";
import CourseDetails from "./CourseDetails";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import EditCourseData from "./EditCourseData";

const MyCourses = () => {
  const [size, setSize] = useState("large");
  const [courseList, setCourseList] = useState([]); // default is 'middle'
  const [showCourseForm, setShowForm] = useState(false); // default is 'middle'
  const [viewCourseDetails, setViewCourseDetails] = useState(""); // default is 'middle'
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
        // console.log("notes data", response.data);
      })
      .catch(() => {});
  };

  const addCourseFormShow = () => {
    setShowForm(!showCourseForm);
    setViewCourseDetails("");
  };

  const handleCardClick = (data) => {
    setViewCourseDetails(data);
  };

  return (
    <AuthLayout>
      <div
        style={{
          paddingTop: 30,
          paddingBottom: 30,
          display: "flex",
          flexWrap: "wrap",
          gap: 20,
          justifyContent: "space-around",
          marginBottom: 10,
        }}
      >
        {courseList?.map((data, id) => {
          return (
            <CourseCard
              key={id}
              courseData={data}
              handleCardClick={handleCardClick}
              img="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
          );
        })}

        <Card
          style={{ width: 300, textAlign: "center", paddingTop: 100 }}
          onClick={() => addCourseFormShow()}
        >
          <Avatar
            style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}
            size={64}
            icon={<PlusOutlined />}
          ></Avatar>
          <p style={{ paddingTop: 20, fontFamily: "poppins" }}>Add Courses</p>
        </Card>
      </div>
      {showCourseForm ? (
        <CourseForm
          cancel={addCourseFormShow}
          viewCourseDetails={viewCourseDetails}
        />
      ) : null}

      {viewCourseDetails == "" ? null : (
        <>
          <CourseDetails viewCourseDetails={viewCourseDetails}></CourseDetails>
          <EditCourseData
            viewCourseDetails={viewCourseDetails}
          ></EditCourseData>
        </>
      )}
    </AuthLayout>
  );
};
export default MyCourses;
