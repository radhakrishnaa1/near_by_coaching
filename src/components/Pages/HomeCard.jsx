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
      title: "Total Institute Registered",
      value: props?.countData?.instituteTotal || 0,
      route: REPORT_OUTSIDE + "/2",
      icon: <FileTextOutlined style={{ fontSize: "30px", color: "#2196f3" }} />,
    },

    {
      title: " Total Tutor Registerd ",
      value: props?.countData?.tutorCount || 0,
      route: REPORT_OUTSIDE + "/1",
      icon: <FileDoneOutlined style={{ fontSize: "30px", color: "#4caf50" }} />,
    },
    {
      title: "Total Students Registered",
      value: props?.countData?.studentTotal || 0,
      route: REPORT_OUTSIDE + "/3",
      icon: (
        <ExceptionOutlined style={{ fontSize: "30px", color: "#ff5722" }} />
      ),
    },
    {
      title: "Total Courses ",
      value: props?.countData?.courseTotal || 0,
      route: REPORT_OUTSIDE + "/4",
      icon: (
        <HistoryOutlined
          style={{ fontSize: "30px", color: "rgba(244, 67, 54, 1)" }}
        />
      ),
    },
  ];

  const handleClick = (data) => {
    console.log(data);
    navigate(data.route);
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

export default DashboardCard;
// import React from 'react';
// import { Col, Row, Statistic } from 'antd';
// import CountUp from 'react-countup';
// const formatter = value => <CountUp end={value} separator="," />;
// const App = () => (
//   <Row gutter={16}>
//     <Col span={12}>
//       <Statistic title="Active Users" value={112893} formatter={formatter} />
//     </Col>
//     <Col span={12}>
//       <Statistic title="Account Balance (CNY)" value={112893} precision={2} formatter={formatter} />
//     </Col>
//   </Row>
// );
// export default App;
