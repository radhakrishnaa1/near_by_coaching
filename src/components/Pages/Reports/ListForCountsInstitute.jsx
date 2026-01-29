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
    // getAllList();
  }, []);

  const columnsForPurchase = [
    {
      title: "Course Name",
      dataIndex: "course_name",
      key: "course_name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Duration",
      key: "course_duraton",
      render: (text, record) => <div>{record.course_duraton}</div>,
    },
    {
      title: "Course Details",
      dataIndex: "course_details",
      key: "course_details",
    },
    {
      title: "Student Name",
      dataIndex: "student_name",
      key: "student_name",
    },
    {
      title: "Student Email",
      dataIndex: "email",
      key: "email",
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
      title: "Duration",
      key: "course_duraton",
      render: (text, record) => <div>{record.course_duraton}</div>,
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
      title: "Start and End Date",
      key: "status",
      render: (text, record) => (
        <div>
          <div>{record.start_date}</div>
          {record.end_date}
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
      title: "Email",
      dataIndex: "email",
      key: "email",
    },

    {
      title: "Contact",
      dataIndex: "contact",
      key: "contact",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "City/State",
      dataIndex: "state_name",
      key: "state_name",
      render: (text, record) => (
        <div>
          {record.city_name} / {record.state_name}
        </div>
      ),
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

  const handleClick = (data, id) => {
    console.log("clicked", data, id);

    // setInstituteId(institute_id);
    // navigate(INSTITUTE_DETAILS + "/" + institute_id);
  };
  console.log("props list data===>", props?.status);
  return (
    <>
      <Title level={3} style={{ margin: 30, textAlign: "center" }}>
        Count Result
      </Title>
      <div style={{ width: "90%", margin: "40px auto" }}>
        <Table
          columns={
            props?.status === 3
              ? columnsForStudent
              : props?.status === 4
              ? columnsForPurchase
              : columnsForCourse
          }
          dataSource={props?.listData}
        />
      </div>
    </>
  );
};
export default InstituteListForStudent;
