import { Table, Divider, Tag, Button } from "antd";
import LayoutHome from "../Layouts/LayoutHome";
import BranchInfo from "./BranchInformation";
import InstituteDetails from "./InstituteDetails";
import { INSTITUTE_DETAILS } from "../../constants/Routes";
import { useNavigate } from "react-router-dom";
const CourseTable = (props) => {
  const navigate = useNavigate();

  const getCourseList = () => {
    axios({
      method: "get",
      url: `http://localhost:3004/getInstituteList`,
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

  const columns = [
    {
      title: "Institute Name",
      dataIndex: "instituteName",
      key: "name",
      render: (text) => <a>{text}</a>,
    },

    {
      title: "Address",
      dataIndex: "address",
      key: "add",
    },
    {
      title: "Contact Details",
      dataIndex: "dateTime",
      key: "dateTime",
    },
    {
      title: "Email ID",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button type="primary" onClick={(record) => handleClick(record)} danger>
          View Courses
        </Button>
      ),
    },
  ];

  const handleClick = (record) => {
    console.log("clicked", record);
    navigate(INSTITUTE_DETAILS);
  };

  return (
    <LayoutHome flagForSlider={false}>
      <BranchInfo />
      <div style={{ width: "90%", margin: "40px auto" }}>
        <Table columns={columns} dataSource={data} />
      </div>
      {/* <InstituteDetails /> */}
    </LayoutHome>
  );
};
export default CourseTable;
