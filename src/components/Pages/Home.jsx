import React from "react";
import { Col, Row, Typography, theme } from "antd";
import LayoutHome from "../Layouts/LayoutHome";
import Login from "./Login";
import HomeCard from "./HomeCard";
import StudyModeCard from "./StudyModeCard";
import axios from "axios";
import Registration from "./Registration";
import Faculty from "./Faculty";
const { Title } = Typography;

const App = (props) => {
  const [countData, setCountData] = React.useState([]);
  const [notesDataPost, setNotesDataPost] = React.useState({
    id: "",
    title: "",
    Contents: "",
    ctreated: "",
  });

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  React.useEffect(() => {
    getCountHome();
    // postNotesData()
    // delNoteData();
  }, []);
  // notedata get api
  const getCountHome = () => {
    axios({
      method: "get",
      url: `http://localhost:3004/countHomepage`,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        setCountData(response.data[0]);
        console.log("notes data", response.data);
      })
      .catch(() => {});
  };

  return (
    <LayoutHome flagForSlider={true}>
      <div
        style={{
          background: "#faad1417",
          minHeight: 280,
          padding: 24,
          borderRadius: borderRadiusLG,
        }}
      >
        <Row>
          <Col span={8}>
            <div style={{ padding: "0px 40px" }}>
              <Title level={2} style={{ fontFamily: "Poppins" }}>
                Near By Coaching
              </Title>
              <div
                style={{
                  lineHeight: "2rem",
                  fontFamily: "Poppins",
                  fontSize: "1.2rem",
                  textAlign: "justify",
                }}
              >
                The Nearby Coaching Institute project is designed to address
                this challenge by creating a web-based platform that connects
                students with coaching centers around their location. It enables
                students to search, compare, and review institutes based on
                criteria like location, subjects offered, faculty experience,
                fee structure, and student feedback.
              </div>
            </div>
          </Col>

          <Col span={8}>
            <Login handleSpinner={props?.handleSpinner}></Login>
          </Col>
          <Col span={8}>
            <Registration handleSpinner={props?.handleSpinner} />
          </Col>
        </Row>
      </div>
      <div
        style={{
          background: colorBgContainer,
          minHeight: 280,
          padding: 24,
          borderRadius: borderRadiusLG,
        }}
      >
        <HomeCard countData={countData} />
        <StudyModeCard />
      </div>
    </LayoutHome>
  );
};
export default App;
