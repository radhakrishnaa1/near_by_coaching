import React, { useState } from "react";
import AuthLayout from "../Layouts/AuthLayout";
import HomeCard from "../Pages/HomeCard";
import { Divider } from "antd";
import CourseCard from "./CourseCard";
import axios from "axios";

const InstituteDashboard = () => {
  const [instituteData, setInstituteData] = useState(""); // default is 'middle'

  React.useEffect(() => {
    getInstituteDetails();
  }, []);
  const getInstituteDetails = () => {
    const email = sessionStorage.getItem("userId");
    console.log("email===>", email);
    axios
      .get(`http://localhost:3004/getInstituteDetails/0/${email}`)
      .then((response) => {
        console.log("institute details===>", response.data);
        if (response.data.length > 0) {
          const data = response.data[0];

          setInstituteData(data);
          // console.log("data===>", districtData, stateData);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the district data!", error);
      });
  };

  return (
    <AuthLayout instituteData={instituteData} studentData="">
      <HomeCard />
      <Divider />
      <CourseCard />
    </AuthLayout>
  );
};
export default InstituteDashboard;
