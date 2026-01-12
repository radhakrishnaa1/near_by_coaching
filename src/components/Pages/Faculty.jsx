// import React from "react";
// import { Table, Divider, Tag, Row, Col } from "antd";

// import AuthLayout from "../Layouts/AuthLayout";
// import BranchInfo from "./BranchInformation";
// import Teacherdetails from "./Teacherdetail";
// import { Avatar, List, Typography } from "antd";
// import axios from "axios";
// const { Title } = Typography;

// const App = (props) => {
//   return (
//     <>
//       <div style={{ padding: "20px" }}>
//         <Row gutter={16}>
//           <Col xs={24} sm={24} md={12}>
//             <Title
//               level={3}
//               style={{
//                 textAlign: "center",
//                 paddingTop: "50px",
//                 paddingBottom: "50px",
//               }}
//             >
//               List Of Teachers
//             </Title>
//             <List
//               itemLayout="horizontal"
//               dataSource={props.tutorList}
//               renderItem={(item, index) => (
//                 <List.Item>
//                   <List.Item.Meta
//                     avatar={
//                       <Avatar
//                         style={{
//                           backgroundColor: "#f56a00",
//                           color: "#ffffff",
//                         }}
//                       >
//                         {item?.name?.charAt(0).toUpperCase()}
//                       </Avatar>
//                     }
//                     title={<a href="https://ant.design">{item.name}</a>}
//                     description={item.discription}
//                   />{" "}
//                   <List.Item
//                     actions={[
//                       <a key="list-loadmore-edit">{item?.qualification}</a>,
//                       <a key="list-loadmore-more">{item?.contact}</a>,
//                     ]}
//                   ></List.Item>
//                 </List.Item>
//               )}
//             />
//           </Col>
//           <Col
//             xs={24}
//             sm={24}
//             md={12}
//             style={{ borderLeft: "1px solid #f5f5f5d3", paddingLeft: "20px" }}
//           >
//             {/* <Teacherdetails /> */}
//           </Col>
//         </Row>
//       </div>
//     </>
//   );
// };
// export default App;

import React, { useState } from "react";
import {
  ContactsFilled,
  LikeOutlined,
  MailOutlined,
  MediumCircleFilled,
  MessageOutlined,
  PhoneOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { Avatar, Col, Row, List, Space, Button } from "antd";
import EnqueryModal from "./EnqueryModal";
const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);
const App = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = (item) => {
    console.log(item);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 3,
        }}
        dataSource={props.tutorList}
        // footer={
        //   <div>
        //     <b>ant design</b> footer part
        //   </div>
        // }
        renderItem={(item) => (
          <List.Item
            key={item.title}
            actions={[
              <IconText
                icon={PhoneOutlined}
                text={<div>{item.contact}</div>}
                key="list-vertical-star-o"
              />,
              <IconText
                icon={MailOutlined}
                text={<div>{item.email}</div>}
                key="list-vertical-like-o"
              />,
              <IconText
                icon={MediumCircleFilled}
                text={<div>{item.medium}</div>}
                key="list-vertical-message"
              />,
            ]}
            extra={
              <Button type="primary" style={{}} onClick={() => showModal(item)}>
                Send Enquiry
              </Button>
            }
          >
            <List.Item.Meta
              avatar={
                <Avatar
                  style={{
                    backgroundColor: "#f56a00",
                    color: "#ffffff",
                  }}
                >
                  {item?.name?.charAt(0).toUpperCase()}
                </Avatar>
              }
              title={<a href={item.href}>{item.name}</a>}
              description={item.discription}
            />
            <Row gutter={16}>
              <Col span={6}>
                <b>Qualification : </b>
                {item.qualification}
              </Col>
              <Col span={12}>
                <b>Experience :</b>
                {item.experience}
              </Col>
              <Col span={6}>
                <b> teaching hour per subject : </b>
                {item.max_hours} hours
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <div style={{}}>
                  {" "}
                  <b>Address :</b> - {item.address} <b> State: </b>
                  {item.state_name} <b> City: </b> {item.city_name}
                </div>
              </Col>
              <Col span={6}>
                <b>Gender:</b> {item.gender}
              </Col>
              <Col span={6}>
                <b>Available On:</b> {item.available_on}
              </Col>
            </Row>
          </List.Item>
        )}
      />
      <EnqueryModal
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        showModal={showModal}
        handleOk={handleOk}
      />
    </>
  );
};
export default App;

//  {
//         "teacher_id": 1,
//         "name": "Anuradha ",
//         "qualification": null,
//         "email": "anu@gmail.com",
//         "contact": "7454323233",
//         "discription": "We provide male female tutor for NEET JEE Olympiads spoken English. ",
//         "address": " 18/602, Ashoka Ratana, Adarsh Nagar, LIC Colony, Shankar Nagar, Raipur, Chhattisgarh 492014",
//         "city": "387",
//         "city_name": "Raipur",
//         "state": "22",
//         "state_name": "Chhattisgarh",
//         "available_on": "Evening",
//         "photo": null,
//         "experience": "10 + year on teaching PCM and PCB",
//         "creation_date": "2026-01-12",
//         "institute_id": null,
//         "course_id": null,
//         "medium": "English",
//         "max_hours": "1",
//         "stream": "PCM",
//         "gender": "Female"
//     },
