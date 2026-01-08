import { Table, Divider, Tag, Button } from "antd";
import LayoutHome from "../Layouts/LayoutHome";
import BranchInfo from "./BranchInformation";
import InstituteDetails from "./InstituteDetails";
import { INSTITUTE_DETAILS } from "../../constants/Routes";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import CourseCardOuter from "./CourseCardOuter";
import axios from "axios";
import React from "react";
const InstituteListForStudent = (props) => {
  const navigate = useNavigate();
  const [instituteList, setInstituteList] = React.useState([]);
  const [instituteId, setInstituteId] = React.useState("");
  React.useEffect(() => {
    getInstituteList();
  }, []);

  const getInstituteList = () => {
    props.handleSpinner(true);
    axios({
      method: "get",
      url: `http://localhost:3004/getInstituteList`,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        setInstituteList(response.data);
        Swal.close();
        console.log("notes data", response.data);
      })
      .catch(() => {});
  };

  const columns = [
    {
      title: "Institute Name",
      dataIndex: "institute_name",
      key: "institute_name",
      render: (text) => <a>{text}</a>,
    },

    {
      title: "Address",
      dataIndex: "address",
      key: "add",
    },
    {
      title: "Contact Details",
      dataIndex: "contact",
      key: "contact",
    },
    {
      title: "State/City",

      key: "status",
      render: (text, record) => (
        <div>
          {record.state} / {record.city}
        </div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button
          type="primary"
          onClick={() => handleClick(record.institute_id)}
          danger
        >
          View Courses
        </Button>
      ),
    },
  ];

  const handleClick = (institute_id) => {
    console.log("clicked", institute_id);
    setInstituteId(institute_id);
    // navigate(INSTITUTE_DETAILS + "/" + institute_id);
  };

  return (
    <>
      <div style={{ width: "90%", margin: "40px auto" }}>
        <Table columns={columns} dataSource={instituteList} />
      </div>
      {/* <InstituteDetails /> */}
      <CourseCardOuter
        handleSpinner={props.handleSpinner}
        instituteId={instituteId}
      />
    </>
  );
};
export default InstituteListForStudent;
