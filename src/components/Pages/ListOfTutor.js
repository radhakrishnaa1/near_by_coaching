import React from "react";
import { Col, Row, Typography, theme } from "antd";
import LayoutHome from "../Layouts/LayoutHome";
import Login from "./Login";
import HomeCard from "./HomeCard";
import StudyModeCard from "./StudyModeCard";
import axios from "axios";
import Registration from "./Registration";
import Faculty from "./Faculty";
import Swal from "sweetalert2";
const { Title } = Typography;

const App = (props) => {
 const [tutorList, setTutorList] = React.useState([]);


  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  React.useEffect(() => {
    getTutorList();
    // postNotesData()
    // delNoteData();
  }, []);
  // notedata get api
  const getTutorList = () => {
    props?.handleSpinner(true);
    axios({
      method: "get",
      url: `http://localhost:3004/getTutorData`,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        setTutorList(response.data);
        Swal.close();
        
      })
      .catch(() => {});
  };

  return (
    <LayoutHome flagForSlider={true}>
      
      <div
        style={{
          background: colorBgContainer,
          minHeight: 280,
          padding: 24,
          borderRadius: borderRadiusLG,
        }}
      >
<Title level={3} style={{textAlign:"center",color:"#f76b0eff"}}> List Of Home Tutor Available Here</Title>

       <Faculty tutorList ={tutorList} />
      </div>
    </LayoutHome>
  );
};
export default App;
