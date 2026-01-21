import { Table, Divider, Tag, Button } from "antd";

import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import React from "react";
import Title from "antd/es/typography/Title";
import LayoutHome from "../../Layouts/LayoutHome";
const InstituteListForStudent = (props) => {
  const navigate = useNavigate();
  const [listData, setlistData] = React.useState([]);
  const { status } = useParams();

  React.useEffect(() => {
    getAllList();
  }, []);

  const getAllList = () => {
    props.handleSpinner(true);
    console.log(status);
    axios({
      method: "get",
      url: `http://localhost:3004/reporthome/${status}`,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        setlistData(response.data);
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

  const columnsForCourse = [
    {
      title: "Course Name",
      dataIndex: "course_name",
      key: "course_name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Institute Name",
      key: "institute_name",
      render: (text, record) => <div>{record.institute_name}</div>,
    },
    {
      title: "Course Details",
      dataIndex: "course_details",
      key: "course_details",
    },
    {
      title: "Course Medium",
      dataIndex: "course_medium",
      key: "course_medium",
    },

    {
      title: "mode and Medium",
      key: "status",
      render: (text, record) => (
        <div>
          <div>{record.mode}</div>
          {record.course_medium}
        </div>
      ),
    },
    {
      title: "Fee and timing",
      key: "status",
      render: (text, record) => (
        <div>
          <div>
            {record.course_fee}/{record?.timing}
          </div>
          {record.course_duraton}
        </div>
      ),
    },
  ];

  const columnsForStudent = [
    {
      title: "Student Name",
      dataIndex: "student_name",
      key: "student_name",
      render: (text) => <a>{text}</a>,
    },

    {
      title: "City",
      dataIndex: "city_name",
      key: "city_name",
    },
    {
      title: "State",
      dataIndex: "state_name",
      key: "state_name",
    },
  ];

  const columnsForTutor = [
    {
      title: "Tutor Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },

    {
      title: "Description",
      dataIndex: "discription",
      key: "discription",
    },
    {
      title: "Contact Details",
      dataIndex: "contact",
      key: "contact",
      render: (text, record) => (
        <div>
          {record.contact} / {record.email}
        </div>
      ),
    },
    {
      title: "Address",
      key: "status",
      render: (text, record) => (
        <div>
          <div>{record.address}</div>
          {record.state} / {record.city}
        </div>
      ),
    },
    {
      title: "Qualification and Experience",
      key: "status",
      render: (text, record) => (
        <div>
          <div>{record.address}</div>
          {record.qualification} / {record.experience}
        </div>
      ),
    },
  ];

  const handleClick = (institute_id) => {
    console.log("clicked", institute_id);
    // setInstituteId(institute_id);
    // navigate(INSTITUTE_DETAILS + "/" + institute_id);
  };

  return (
    <LayoutHome>
      <Title level={3} style={{ margin: 30, textAlign: "center" }}>
        List Of Institutes For Online/Offline Courses
      </Title>
      <div style={{ width: "90%", margin: "40px auto" }}>
        <Table
          columns={
            status === "2"
              ? columns
              : status === "1"
              ? columnsForTutor
              : status === "3"
              ? columnsForStudent
              : columnsForCourse
          }
          dataSource={listData}
        />
      </div>
    </LayoutHome>
  );
};
export default InstituteListForStudent;
