import React from "react";
import {
  MoneyCollectOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import IconArrowJS from "../../constants/Rupees";
import { Avatar, Card, Typography } from "antd";
const { Text } = Typography;
const { Meta } = Card;
const CourseCard = () => (
  <Card
    hoverable
    style={{ width: 300 }}
    cover={
      <img
        draggable={false}
        alt="example"
        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
      />
    }
    actions={[
      <div>
        <SettingOutlined key="setting"> </SettingOutlined> <Text>6 mon</Text>
      </div>,
      <div>
        <IconArrowJS size={20} fill="#3a3838ff" /> <Text key="setting"> </Text>
        6000
      </div>,
      //   <div>
      //     <EllipsisOutlined key="ellipsis" />
      //   </div>,
    ]}
  >
    <Meta
      avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
      title="Course Name"
      description="This is the Course description"
    />
  </Card>
);
export default CourseCard;
