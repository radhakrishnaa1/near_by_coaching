import React, { useState } from "react";
import AuthLayout from "../Layouts/AuthLayout";
import HomeCard from "../Pages/HomeCard";
import { Divider } from "antd";
import CourseCard from "./CourseCard";
import TutorEnquiry from "./TutorEnquiry";
import axios from "axios";

const InstituteDashboard = () => {
  const [tutorData, setTutorData] = useState(""); // default is 'middle'
  const [tutorEnquiryList, setTutorEnquiryList] = useState([]);
  const [tutorCountData, setTutorCountData] = useState({});
  const [tutorprofileData, setTutorprofileData] = useState({});
  React.useEffect(() => {
    // getInstituteDetails();
    getTutorEnwuiry();
    getTutorProfile();
  }, []);

  const gettutorCount = (tutorData) => {
    const tutorid = tutorData?.tutor_id;
    axios
      .get(`http://localhost:3004/countTutorDashboard/${tutorid}`)
      .then((response) => {
        console.log("tutor details===>", response.data);
        if (response.data.length > 0) {
          const data = response.data[0];

          setTutorCountData(data);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the district data!", error);
      });
  };

  const getTutorProfile = () => {
    const email = sessionStorage.getItem("userId");
    console.log("email===>", email);
    axios
      .get(`http://localhost:3004/getTutorByEMail/0/${email}`)
      .then((response) => {
        console.log("tutor details===>", response.data);
        if (response.data.length > 0) {
          const data = response.data[0];
          sessionStorage.setItem("userName", data?.name);

          setTutorprofileData(data);

          // console.log("data===>", districtData, stateData);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the district data!", error);
      });
  };

  const getTutorEnwuiry = () => {
    const email = sessionStorage.getItem("userId");
    console.log("email===>", email);
    axios
      .get(`http://localhost:3004/tutorEnquirybyteacher/${email}`)
      .then((response) => {
        console.log("tutor details===>", response.data);
        if (response.data.length > 0) {
          const data = response.data[0];
          sessionStorage.setItem("userName", data?.name);
          setTutorEnquiryList(response.data);
          setTutorData(data);
          gettutorCount(data);
          // console.log("data===>", districtData, stateData);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the district data!", error);
      });
  };
  return (
    <AuthLayout instituteData={""} studentData="">
      <TutorEnquiry
        tutorEnquiryList={tutorEnquiryList}
        tutorData={tutorData ? tutorData : tutorprofileData}
        tutorCountData={tutorCountData}
      />
    </AuthLayout>
  );
};
export default InstituteDashboard;
