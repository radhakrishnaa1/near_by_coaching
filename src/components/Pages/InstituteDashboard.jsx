import React, { useState } from "react";
import AuthLayout from "../Layouts/AuthLayout";
import HomeCard from "../Pages/CardCountInstitute";
import { Divider } from "antd";
import CourseCard from "./CourseCard";
import axios from "axios";
import Swal from "sweetalert2";
import ListForCountsInstitute from "./Reports/ListForCountsInstitute";
const InstituteDashboard = (props) => {
  const [instituteData, setInstituteData] = useState(""); // default is 'middle'
  const [countData, setCountData] = useState([]); // default is 'middle'
  const [listData, setlistData] = useState([]);
  const [statusCount, setStatus] = useState(1);

  React.useEffect(() => {
    getInstituteDetails();
  }, []);

  const getDashboardCount = (institute_id) => {
    axios
      .get(`http://localhost:3004/countInstituteData/${institute_id}`)
      .then((response) => {
        console.log("institute count===>", response.data);
        if (response.data.length > 0) {
          const data = response.data[0];
          setCountData(data);
          // console.log("data===>", districtData, stateData);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the district data!", error);
      });
  };

  const getInstituteDetails = () => {
    const email = sessionStorage.getItem("userId");
    console.log("email===>", email);
    axios
      .get(`http://localhost:3004/getInstituteDetails/0/${email}`)
      .then((response) => {
        console.log("institute details===>", response.data);
        if (response.data.length > 0) {
          const data = response.data[0];
          sessionStorage.setItem("userName", data?.institute_name);
          setInstituteData(data);
          getDashboardCount(data.institute_id);
          // console.log("data===>", districtData, stateData);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the district data!", error);
      });
  };

  const getAllList = (data) => {
    props.handleSpinner(true);
    // console.log("status", data);
    axios({
      method: "get",
      url: `http://localhost:3004/listForDashboardCount/${instituteData?.institute_id}/${data.status}`,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        setlistData(response.data);
        Swal.close();
        setStatus(data.status);
        console.log("notes data", response.data);
      })
      .catch(() => {});
  };

  return (
    <AuthLayout instituteData={instituteData} studentData="">
      <HomeCard countData={countData} getAllList={getAllList} />
      <ListForCountsInstitute
        handleSpinner={props?.handleSpinner}
        listData={listData}
        status={statusCount}
      />
      {/* <Divider />
      <CourseCard /> */}
    </AuthLayout>
  );
};
export default InstituteDashboard;
