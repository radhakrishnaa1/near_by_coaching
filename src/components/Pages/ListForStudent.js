import React from "react";
import { Table, Avatar, Tag, Space, Typography, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const { Text } = Typography;

const statusColorMap = {
  Closed: "red",
  Pending: "orange",
  Open: "green",
};

const dataSource = [
  {
    key: "1",
    id: 1,
    title: "Sed ut perspiciatis unde omnis iste",
    description: "ab illo inventore veritatis et quasi...",
    assignee: { name: "Liam", avatar: "https://i.pravatar.cc/40?img=1" },
    status: "Closed",
    date: "Fri, Dec 5",
  },
  {
    key: "2",
    id: 2,
    title: "Consequuntur magni dolores eos qui ratione",
    description: "ab illo inventore veritatis et quasi...",
    assignee: { name: "Steve", avatar: "https://i.pravatar.cc/40?img=2" },
    status: "Pending",
    date: "Fri, Oct 6",
  },
  {
    key: "3",
    id: 3,
    title: "Exercitationem ullam corporis",
    description: "ab illo inventore veritatis et quasi...",
    assignee: { name: "Jack", avatar: "https://i.pravatar.cc/40?img=3" },
    status: "Open",
    date: "Mon, Mar 22",
  },
];

// address
// : 
// " 18/602, Ashoka Ratana, Adarsh Nagar, LIC Colony, Shankar Nagar, Raipur, Chhattisgarh 492014"
// available_on
// : 
// "Evening"
// city
// : 
// "387"
// city_name
// : 
// "Raipur"
// contact
// : 
// "7454323233"
// course_id
// : 
// null
// creation_date
// : 
// "2026-01-12"
// discription
// : 
// "We provide male female tutor for NEET JEE Olympiads spoken English. "
// email
// : 
// "anu@gmail.com"
// enquiry_id
// : 
// 1
// experience
// : 
// "10 + year on teaching PCM and PCB"
// fee
// : 
// null
// gender
// : 
// "Female"
// institute_id
// : 
// null
// max_hours
// : 
// "1"
// medium
// : 
// "English"
// name
// : 
// "Anuradha "
// number_of_student
// : 
// 5
// qualification
// : 
// "Msc Mathematics"
// state
// : 
// "22"
// state_name
// : 
// "Chhattisgarh"
// status
// : 
// "paid"
// stream
// : 
// "PCM"
// student_add
// : 
// "gjghjghj hgjgh"
// student_city
// : 
// "380"
// student_class
// : 
// "12 pcm"
// student_contact
// : 
// "7876767676"
// student_email
// : 
// "ada@gmail.com"
// student_name
// : 
// "ada sharma"
// student_state
// : 
// "22"
// teacher_id
// : 
// 1
// tutor_fee
// : 
// 5000
// tutor_id
// : 
// 1

const columns = [
     {
    title: "Assigned To",
    dataIndex: "student_name",
    render: (_, record) => (
      <Space>
        <Avatar>{record.student_name.charAt(0).toUpperCase()}</Avatar>
        <Text>{record.student_name}</Text>
         <div>{record.student_email}</div>
      </Space>
    ),
  },
  {
    title: "Email id",
    dataIndex: "student_email",
    width: 60,
  },
  {
    title: "Contact",
    dataIndex: "contact",
    render: (_, record) => (
      <div>
        <Text strong>{record.student_add}</Text>
        <br />
        <Text type="secondary" style={{ fontSize: 12 }}>
          {record.student_contact}
        </Text>
      </div>
    ),
  },
 
  {
    title: "Status",
    dataIndex: "status",
    render: (status) => (
      <Tag color={"orange"} style={{ borderRadius: 12 }}>
        {status}
      </Tag>
    ),
  },
  {
    title: "Date",
    dataIndex: "creation_date",
  },
  {
    title: "Action",
    align: "center",
    render: () => (
      <Tooltip title="Delete">
        <DeleteOutlined style={{ color: "#8c8c8c", cursor: "pointer" }} />
      </Tooltip>
    ),
  },
];

const TicketTable = (props) => {
  return (
    <Table
      columns={columns}
      dataSource={props?.tutorEnquiryList}
      pagination={false}
      bordered={false}
    />
  );
};

export default TicketTable;
