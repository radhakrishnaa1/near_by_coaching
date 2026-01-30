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

const DashboardCard = (props) => {
  const navigate = useNavigate();

  const stats = [
    {
      title: "Total Enquiries Received",
      value: props?.tutorCountData?.total || 0,
      status: "all",
      icon: <FileTextOutlined style={{ fontSize: "30px", color: "#2196f3" }} />,
    },

    {
      title: " Paid Enquiries ",
      value: props?.tutorCountData?.totalPaid || 0,
      status: "paid",
      icon: <FileDoneOutlined style={{ fontSize: "30px", color: "#4caf50" }} />,
    },
    {
      title: " Pending Payment Enquiries ",
      value: props?.tutorCountData?.feetopay || 0,
      status: "fee",
      icon: (
        <ExceptionOutlined style={{ fontSize: "30px", color: "#ff5722" }} />
      ),
    },
    {
      title: "Pending Enquiries At My End ",
      value: props?.tutorCountData?.totalenquiry || 0,
      status: "Enquiry",
      icon: (
        <HistoryOutlined
          style={{ fontSize: "30px", color: "rgba(244, 67, 54, 1)" }}
        />
      ),
    },
  ];

  return (
    <Row gutter={16} style={{ textAlign: "center", marginTop: "20px" }}>
      {stats.map((stat, index) => (
        <Col xs={24} sm={12} md={12} key={index}>
          <Card
            variant="borderless"
            style={{ boxShadow: "0 2px 8px #f0f1f2", margin: 10 }}
            onClick={() => props?.handleClick(stat)}
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

export default DashboardCard;
