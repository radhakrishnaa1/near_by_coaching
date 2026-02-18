import React from "react";
import { Row, Col, Card, Select, Typography } from "antd";
import {
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined,
} from "@ant-design/icons";
import LayoutHome from "../Layouts/LayoutHome";
import CourseTable from "./TableWithSearch";
import axios from "axios";
import Swal from "sweetalert2";

const { Title, Text } = Typography;
const { Option } = Select;

const BranchInfo = (props) => {
  const [stateList, setStateList] = React.useState([]);
  const [cityList, setCityList] = React.useState([]);
  const [instituteList, setInstituteList] = React.useState([]);

  React.useEffect(() => {
    getDistrictList();
    getStateList();
    getInstituteList();
  }, []);
  const getStateList = () => {
    //api call
    axios({
      method: "get",
      url: `http://localhost:3004/getStateData`,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        setStateList(response.data);
      })
      .catch(() => {});
  };
  const getDistrictList = () => {
    //api call
    axios({
      method: "get",
      url: `http://localhost:3004/getDistrictsData`,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        setCityList(response.data);
      })
      .catch(() => {});
  };

  const getInstituteList = () => {
    props.handleSpinner(true);
    axios({
      method: "get",
      url: `http://localhost:3004/getInstituteList`,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        setInstituteList(response.data);
        Swal.close();
        console.log("notes data", response.data);
      })
      .catch(() => {});
  };

  const handleChagecity = (value) => {
    console.log(`selected ${value}`);
    const filteredData = instituteList.filter(
      (item) => item.city === value + ""
    );
    setInstituteList(filteredData);
  };

  const handleChageState = (value) => {
    console.log(`selected ${value}`);
    const filteredData = instituteList.filter(
      (item) => item.state === value + ""
    );
    setInstituteList(filteredData);
  };

  return (
    <LayoutHome flagForSlider={false}>
      <div
        style={{
          backgroundColor: "#2B74B3",
          color: "#fff",
          padding: "40px 60px",
          minHeight: "300px",
        }}
      >
        <Row gutter={32} align="middle">
          {/* Left side info */}
          <Col xs={24} md={12}>
            <Text style={{ fontSize: 18 }}>Near By Coaching </Text>
            <Title level={2} style={{ color: "#fff", marginTop: 0 }}>
              Institute List
            </Title>

            <p style={{ fontSize: 16, marginTop: 10 }}>
               Here you can see all the list of institute registered in Nearby Coaching application
              student can search institute by city and address nearby.
            </p>
            <p style={{ fontSize: 16 }}>
              <PhoneOutlined /> 8817468184
            </p>
            <p style={{ fontSize: 16 }}>
              <MailOutlined /> sagarsahu4198@gmail.com
            </p>
          </Col>

          {/* Right side selects */}
          <Col xs={24} md={12}>
            <Card
              style={{
                borderRadius: 10,
                width: "100%",
              }}
            >
              <div style={{ marginBottom: 16 }}>
                <Text strong>Select State</Text>
                <Select
                  style={{ width: "100%", marginTop: 8 }}
                  onChange={(value) => handleChageState(value)}
                >
                  {stateList?.map((data, id) => {
                    return (
                      <Option key={id} value={data.state_code}>
                        {data.name}
                      </Option>
                    );
                  })}
                </Select>
              </div>
              <div style={{ marginBottom: 16 }}>
                <Text strong>Select City</Text>
                <Select
                  style={{ width: "100%", marginTop: 8 }}
                  onChange={(value) => handleChagecity(value)}
                >
                  {cityList?.map((data, id) => {
                    return (
                      <Option key={id} value={data.city_code}>
                        {data.name}
                      </Option>
                    );
                  })}
                </Select>
              </div>
              {/* <div>
                <Text strong>Select Branch</Text>
                <Select
                  defaultValue="Laxmi Nagar"
                  style={{ width: "100%", marginTop: 8 }}
                >
                  {instituteList?.map((data, id) => {
                    return (
                      <Option key={id} value={data.city_code}>
                        {data.name}
                      </Option>
                    );
                  })}
                </Select>
              </div> */}
            </Card>
          </Col>
        </Row>
      </div>

      <CourseTable
        instituteList={instituteList}
        handleSpinner={props.handleSpinner}
      />
    </LayoutHome>
  );
};

export default BranchInfo;
