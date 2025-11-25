import { Table, Divider, Tag, Button } from "antd";
import LayoutHome from "../Layouts/LayoutHome";
import BranchInfo from "./BranchInformation";
import InstituteDetails from "./InstituteDetails";

const columns = [
  {
    title: "Institute Name",
    dataIndex: "instituteName",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Course Details",
    dataIndex: "courseDetails",
    key: "courseDetails",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "add",
  },
  {
    title: "Date & Time",
    dataIndex: "dateTime",
    key: "dateTime",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <Button type="primary" onClick={() => handleClick()} danger>
        Join Now
      </Button>
    ),
  },
];

const handleClick = () => {
  // INSTITUTE_DETAILS
};
const data = [
  {
    key: "1",
    instituteName: "Nurdi Academy Classes",
    courseDetails: "PCM - 6 Months",
    address: "New sahu para khamtarai",
    dateTime: "12th June, 10:00 AM",
    status: "Running",
  },
  {
    key: "2",
    instituteName: "Bench Preb",
    courseDetails: "PCB - 6 Months",
    address: "New sahu para khamtarai",
    dateTime: "12th June, 10:00 AM",
    status: "Running",
  },
  {
    key: "3",
    instituteName: "Ansh Classes",
    courseDetails: "PCM - 6 Months",
    address: "New sahu para khamtarai",
    dateTime: "12th June, 10:00 AM",
    status: "Active",
  },
  {
    key: "4",
    instituteName: "Paramount ",
    courseDetails: "Banking - 3 Months",
    address: "Near shyam square pandari raipur",
    dateTime: "10th August 25, 10:00 AM",
    status: "Upcomming",
  },
  {
    key: "5",
    instituteName: "Ansh Classes",
    courseDetails: "PCB - 6 Months",
    address: "New sahu para khamtarai",
    dateTime: "12th June, 10:00 AM",
    status: "Running",
  },
  {
    key: "6",
    instituteName: "Ansh Classes",
    courseDetails: "PCM - 6 Months",
    address: "New sahu para khamtarai",
    dateTime: "12th June, 10:00 AM",
    status: "Upcoming",
  },
];

const CourseTable = (props) => {
  return (
    <LayoutHome flagForSlider={false}>
      <BranchInfo />
      <div style={{ width: "90%", margin: "40px auto" }}>
        <Table columns={columns} dataSource={data} />
      </div>
      <InstituteDetails />
    </LayoutHome>
  );
};
export default CourseTable;
