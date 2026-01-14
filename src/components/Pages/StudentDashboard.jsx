import React, { use, useState } from "react";
import AuthLayout from "../Layouts/AuthLayout";
import HomeCard from "../Pages/HomeCard";
import { Divider } from "antd";
import CourseCard from "./CourseCard";
import axios from "axios";
import Swal from "sweetalert2";
import PurchaseCard from "./PurchaseCard";
import CourseDetails from "./CourseDetails";
import Title from "antd/es/typography/Title";
import InstituteListForStudent from "./InstituteListForStudent";
import Faculty from "./Faculty";
import CourseCardOuter from "./CourseCardOuter";
import { InboxOutlined } from "@ant-design/icons";
const StudentDashboard = (props) => {
  const [studentData, setStudentData] = useState([]); // default is 'middle'
  const [purchase, setPurchase] = useState([]); // default is 'middle'
  const [viewCourseDetails, setViewCourseDetails] = useState("");
  const [tutorEnquery, setTutorEnquiry] = useState([]);
  React.useEffect(() => {
    getStudentDetails();
    getCourseDetailsForStudent();
    enquiryTutorByStudent();
  }, []);

  const getStudentDetails = () => {
    const email = sessionStorage.getItem("userId");
    console.log("email===>", email);

    props.handleSpinner(true);
    axios
      .get(`http://localhost:3004/getStudentByEMail/${email}`)
      .then((response) => {
        console.log("student details===>", response.data);
        if (response.data.length > 0) {
          const data = response.data[0];
          sessionStorage.setItem("userName", data?.student_name);

          setStudentData(data);
          Swal.close();
          // console.log("data===>", districtData, stateData);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the district data!", error);
      });
  };

  const enquiryTutorByStudent = () => {
    const email = sessionStorage.getItem("userId");
    console.log("email===>", email);

    props.handleSpinner(true);
    axios
      .get(`http://localhost:3004/enquiryTutorByStudent/${email}`)
      .then((response) => {
        console.log("student details===>", response.data);
        if (response.data.length > 0) {
          const data = response.data[0];
          setTutorEnquiry(response.data);
          Swal.close();
          // console.log("data===>", districtData, stateData);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the tutor data!", error);
      });
  };

  const getCourseDetailsForStudent = () => {
    const email = sessionStorage.getItem("userId");
    console.log("email===>", email);

    props.handleSpinner(true);
    axios
      .get(`http://localhost:3004/purchasecoursebystudent/${email}`)
      .then((response) => {
        console.log("student details===>", response.data);
        if (response.data.length > 0) {
          // const data = response.data[0];
          setPurchase(response.data);
          Swal.close();
          // console.log("data===>", districtData, stateData);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the district data!", error);
      });
  };

  const handleCardClick = (data) => {
    console.log("card clicked", data);
    setViewCourseDetails(data);
  };

  return (
    <AuthLayout instituteData="" studentData={studentData}>
      {/* <PurchaseCard purchase={purchase} /> */}
      <Title level={3} style={{ margin: 30, textAlign: "center" }}>
        My Purchased Courses
      </Title>
      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        {purchase.length > 0 ? (
          purchase?.map((data, id) => {
            return (
              <CourseCard
                key={id}
                courseData={data}
                handleCardClick={handleCardClick}
                img="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              />
            );
          })
        ) : (
          <div style={{ color: "gray", textAlign: "center" }}>
            <InboxOutlined style={{ fontSize: 80 }} />
            <div>No Data Added</div>
          </div>
        )}
      </div>
      <Divider />
      <Title level={3} style={{ margin: 30, textAlign: "center" }}>
        Tutor Enquiry
      </Title>
      {viewCourseDetails === "" ? null : (
        <CourseDetails viewCourseDetails={viewCourseDetails}></CourseDetails>
      )}
      <Faculty tutorList={tutorEnquery} />
      <Divider />
      {/* <Title level={3} style={{ margin: 30, textAlign: "center" }}>
        List Of Institutes For Online/Offline Courses
      </Title>
      <InstituteListForStudent handleSpinner={props?.handleSpinner} /> */}
    </AuthLayout>
  );
};
export default StudentDashboard;
