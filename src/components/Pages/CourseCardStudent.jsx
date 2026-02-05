import React from "react";
import {
  ClockCircleOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import IconArrowJS from "../../constants/Rupees";
import { Avatar, Card, Typography } from "antd";
const { Text } = Typography;
const { Meta } = Card;
const CourseCard = (props) => {
  // console.log(props);

  //  {
  //         "courseid": 2,
  //         "course_name": "PCB Class 12 Hindi Medium",
  //         "course_duraton": "8 mon",
  //         "course_fee": "3000",
  //         "status": "New",
  //         "mode": "offline",
  //         "timing": "6am",
  //         "course_medium": "Hindi",
  //         "start_date": "2025-12-14T18:30:00.000Z",
  //         "end_date": "2026-07-14T18:30:00.000Z",
  //         "discount": "nii",
  //         "creation_date": "2025-12-07T18:30:00.000Z",
  //         "course_details": null,
  //         "max_student": null,
  //         "institute_id": "2"
  //     },
  // console.log(props?.countPurchased);
  return (
    <Card
      hoverable
      style={{ width: 300, margin: 10 }}
      cover={<img draggable={false} alt="example" src={props?.img} />}
      actions={[
        <div onClick={() => props?.handleCardClick(props?.courseData)}>
          <ClockCircleOutlined key="setting"> </ClockCircleOutlined>{" "}
          <Text> {props?.courseData?.course_duraton}</Text>
        </div>,
        <div>
          <IconArrowJS size={20} fill="#3a3838ff" />{" "}
          <Text key="setting"> </Text>
          {props?.courseData?.course_fee}
        </div>,
        <div>{props?.courseData?.mode}</div>,
      ]}
    >
      <Meta
        avatar={[]}
        title={
          props?.courseData?.course_name +
          " " +
          props?.courseData?.course_medium
        }
        description={props?.courseData?.course_details}
      />
    </Card>
  );
};
export default CourseCard;

//  <Avatar style={{ backgroundColor: "#f56a00" }}>
//             {props?.courseData?.max_student}{" "}
//             {props?.countPurchased[0]?.totalpurchase}
//           </Avatar>
