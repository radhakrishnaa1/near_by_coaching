import React, { use, useState } from "react";
import AuthLayout from "../Layouts/AuthLayout";
import HomeCard from "../Pages/HomeCard";
import { Divider } from "antd";
import CourseCard from "./CourseCard";
import axios from "axios";
import Swal from "sweetalert2";
import PurchaseCard from "./PurchaseCard";
import CourseDetails from "./CourseDetails";

const StudentDashboard = (props) => {
  const [studentData, setStudentData] = useState([]); // default is 'middle'
  const [purchase, setPurchase] = useState([]); // default is 'middle'
  const [viewCourseDetails, setViewCourseDetails] = useState("");
  React.useEffect(() => {
    getStudentDetails();
    getCourseDetailsForStudent();
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
          setStudentData(data);
          Swal.close();
          // console.log("data===>", districtData, stateData);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the district data!", error);
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
      {purchase?.map((data, id) => {
        return (
          <CourseCard
            key={id}
            courseData={data}
            handleCardClick={handleCardClick}
            img="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        );
      })}

      <Divider />
      {viewCourseDetails === "" ? null : (
        <CourseDetails viewCourseDetails={viewCourseDetails}></CourseDetails>
      )}
    </AuthLayout>
  );
};
export default StudentDashboard;
