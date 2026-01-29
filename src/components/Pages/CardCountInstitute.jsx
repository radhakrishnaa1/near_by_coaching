import React from "react";
import { Card, Row, Col, Statistic } from "antd";
import {
  MessageOutlined,
  DollarCircleOutlined,
  UserOutlined,
  CustomerServiceOutlined,
  ExceptionOutlined,
  FileDoneOutlined,
  HistoryOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import CountUp from "react-countup";
import { useNavigate } from "react-router-dom";
import { Route } from "react-router-dom";
import { REPORT_OUTSIDE } from "../../constants/Routes";

const formatter = (value) => <CountUp end={value} separator="," />;

const CardCountInstitute = (props) => {
  const navigate = useNavigate();

  const stats = [
    {
      title: " Online Courses ",
      value: props?.countData?.courseTotalOnline || 0,
      status: 1,
      icon: <FileDoneOutlined style={{ fontSize: "30px", color: "#4caf50" }} />,
    },
    {
      title: "Offline Courses",
      value: props?.countData?.courseTotalOffline || 0,
      status: 2,
      icon: (
        <ExceptionOutlined style={{ fontSize: "30px", color: "#ff5722" }} />
      ),
    },

    {
      title: "Total Students Enrolled ",
      value: props?.countData?.studentEnrolled || 0,
      status: 3,
      icon: (
        <HistoryOutlined
          style={{ fontSize: "30px", color: "rgba(244, 67, 54, 1)" }}
        />
      ),
    },
    {
      title: "Total Course Purchsed By Students",
      value: props?.countData?.purchaseTotal || 0,
      status: 4,
      icon: <FileTextOutlined style={{ fontSize: "30px", color: "#2196f3" }} />,
    },
  ];

  const handleClick = (data) => {
    console.log(data);
    props?.getAllList(data);
    // navigate(data.route);
  };

  return (
    <Row gutter={16} style={{ textAlign: "center", marginTop: "20px" }}>
      {stats.map((stat, index) => (
        <Col xs={24} sm={12} md={6} key={index}>
          <Card
            variant="borderless"
            style={{ boxShadow: "0 2px 8px #f0f1f2" }}
            onClick={() => handleClick(stat)}
          >
            <div style={{ marginBottom: "10px" }}>{stat.icon}</div>
            <Statistic
              style={{ fontSize: "22px", fontWeight: "bold" }}
              value={stat.value}
              formatter={formatter}
            />
            <div style={{ fontSize: "12px", color: "gray", marginTop: "5px" }}>
              {stat.title}
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default CardCountInstitute;
