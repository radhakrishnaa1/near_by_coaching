import React from "react";
import { Table, Avatar, Tag, Space, Typography, Tooltip ,Button} from "antd";
import { DeleteOutlined, PlusCircleOutlined, PlusOutlined, PlusSquareOutlined } from "@ant-design/icons";

const { Text } = Typography;

const statusColorMap = {
  Closed: "red",
  Pending: "orange",
  Open: "green",
};



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
const TicketTable = (props) => {
const columns = [
     {
    title: "Assigned To",
    dataIndex: "student_name",
    width: 250,
    render: (_, record) => (
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Avatar>{record.student_name.charAt(0).toUpperCase()}</Avatar>
        <div><div>{record.student_name}</div>
         <div>{record.student_email}  {record.contact}</div></div>
      </div>
    ),
  },
  
  {
    title: "Address",
    dataIndex: "address",
    width: 250,
    render: (_, record) => (
      <div>
        <Text strong>{record.student_add}</Text>
        <Text> {record.city_name} , {record.state_name} </Text>
      
      </div>
    ),
  },
 {
    title: "Number Of Students",
    dataIndex: "number_of_student",
    render: (_,record) => (
      <Text color={"orange"} style={{ borderRadius: 12 }}>
        {record.number_of_student}
      </Text>
    ),
  },
  
  {
    title: "Payment Details",
    dataIndex: "tutor_fee",
      render: (_, record) => (
      <div>
        <Text strong>{record.tutor_fee>0?record.tutor_fee:"Add Fee For This Enquiry"}</Text>
      
      </div>
    ),
  },
  {
    title: "Class Timing",
    dataIndex: "available_on",
    key: "available_on",

    
  },
  {
    title: "Status",
    dataIndex: "status",
    render: (status) => (
      <Tag color={"orange"} style={{ borderRadius: 12 }}>
        {status === "fee"?"Fee Details Sent":status}
      </Tag>
    ),
  },
  {
    title: "Action",
    align: "center",
    render: (_, record) => (
      <Tooltip title="Send Fee Details">
         <Button
                                    type="primary"
                                    key="reply"
                                    onClick={() => handleUpdate(record)}
                                  >
                                    <PlusOutlined style={{color:"#ffffff"}}/>
                                   Add Fee
                                  </Button>,
      </Tooltip>
    ),
  },
];

const handleUpdate = (item) => {
  if (props.handleUpdate) {
    props.handleUpdate(item);
  }
};
  return (
    <Table
      columns={columns}
      dataSource={props?.tutorEnquiryList}
      pagination={false}
      bordered={false}
      handleUpdate={props.handleUpdate}
    />
  );
};

export default TicketTable;


