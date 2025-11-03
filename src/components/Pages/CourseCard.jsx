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

 const courseData =[{
    key:1,
    label:"PCM 12th",
    courseDiscription:"This is the Course description",
    board:"CBSE",
    medium:"English",
    duration:"6 months",
    fee:"4000",
    timing:"6 AM",
    mode:"online",
    img:"https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
  }]

console.log(props)

return(  <Card
    hoverable
    style={{ width: 300 }}
    cover={
      <img
        draggable={false}
        alt="example"
        src={props?.courseData?.img}
      />
    }
    actions={[
      <div>
        <ClockCircleOutlined key="setting"> </ClockCircleOutlined> <Text>   {props?.courseData?.duration}</Text>
      </div>,
      <div>
        <IconArrowJS size={20} fill="#3a3838ff" /> <Text key="setting"> </Text>
       {props?.courseData?.fee}
      </div>,
        <div>
       {props?.courseData?.mode}
         
        </div>,
    ]}
  >
    <Meta
      avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
      title={props?.courseData?.label +" "+ props?.courseData?.board}
      description={props?.courseData?.courseDescription}
    />
  </Card>)
}
export default CourseCard;
